const path = require('path');
const crypto = require('crypto');
const express = require('express');
const app = express();
const api = express.Router();
const port = 3000;
const front = path.join(__dirname, '../dist/isard/browser');

// https://oauth.iracing.com/oauth2/book/token_endpoint.html
// Le secret et le mot de passe sont envoyés masqués : base64(sha256(valeur + identifiant normalisé))
const mask = (value, id) => crypto.createHash('sha256').update(value + id.trim().toLowerCase()).digest('base64');

let token;
let pendingToken;
// Les échecs répétés verrouillent le compte côté iRacing : on attend avant de réessayer
let retryAt = 0;

const requestToken = async (params) => {
    const response = await fetch('https://oauth.iracing.com/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
            client_id: process.env.CLIENT_ID,
            client_secret: mask(process.env.CLIENT_SECRET, process.env.CLIENT_ID),
            ...params,
        }),
    });
    if (!response.ok) {
        token = null;
        retryAt = Date.now() + (Number(response.headers.get('retry-after')) || 60) * 1000;
        throw new Error(`OAuth ${response.status} : ${await response.text()}`);
    }
    const data = await response.json();
    const now = Date.now();
    token = {
        access: data.access_token,
        expiresAt: now + data.expires_in * 1000,
        refresh: data.refresh_token,
        refreshExpiresAt: now + (data.refresh_token_expires_in ?? 0) * 1000,
    };
    console.log(`Token OAuth obtenu (${params.grant_type}), valable ${data.expires_in}s`);
};

// password_limited une seule fois (rate limit strict), puis refresh_token tant qu'il est valide
const getToken = async () => {
    const soon = Date.now() + 60000;
    if (token && soon < token.expiresAt) {
        return token.access;
    }
    if (Date.now() < retryAt) {
        throw new Error("Authentification iRacing en pause après un échec");
    }
    pendingToken ??= (token?.refresh && soon < token.refreshExpiresAt
        ? requestToken({grant_type: 'refresh_token', refresh_token: token.refresh})
        : requestToken({
            grant_type: 'password_limited',
            username: process.env.EMAIL,
            password: process.env.ENCODED_PASSWORD,
            scope: 'iracing.auth',
        })
    ).finally(() => pendingToken = null);
    await pendingToken;
    return token.access;
};

const chunkRoutes = ["search_series_results"]
app.use('/api', api);
app.use(express.static(front));
app.get('/{*splat}', (req, res) => res.sendFile(path.join(front, 'index.html')));

api.get('/', (req, res) => {
    getToken().then((accessToken) => fetch('https://members-ng.iracing.com/data/doc', {
        method: 'get', headers: {'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`}, cache: "no-store"
    }))
        .then((response) => response.json())
        .then((data) => {
            for (let first in data) {
                for (let second in data[first]) {
                    data[first][second]['link'] = data[first][second]['link'].replace('https://members-ng.iracing.com/data/', process.env.CURRENT_URL);
                }
            }
            res.status(200).json({
                message: "Welcome !",
                documentation: data,
            });
        }).catch(error => {
        res.status(500).json(error);
    })
})

api.get('/:first/:second', (req, res) => {
    console.log(req.url + " => " + "https://members-ng.iracing.com/data" + req.url);
    getToken().then((accessToken) => fetch("https://members-ng.iracing.com/data" + req.url, {
        method: 'get',
        headers: {'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`},
        cache: "no-store",
        body: req.body
    }))
        .then((response) => {
            if (response.status >= 400) {
                throw response.statusText;
            }
            return response.json().then(data => {
                if (data.link || data.data_url) {
                    return fetch(data.link ?? data.data_url).then((response) => {
                        return response.json().then((data) => {
                            res.status(200).json(data);
                        })
                    }).catch(error => {
                        res.status(500).json(error);
                    })
                }
                else if (chunkRoutes.includes(data.type)) {
                    const fetches = data.data.chunk_info.chunk_file_names.map((fileName) => {
                        return fetch(data.data.chunk_info.base_download_url + fileName)
                            .then((response) => response.json());
                    });
                    return Promise.all(fetches).then((allRows) => {
                        res.status(200).json(allRows.flat());
                    });
                }
                else {
                    res.status(200).json(data);
                }
            })
        }).catch(error => {
        res.status(500).json(error);
    })
});

const server = app.listen(port, () => console.log("Application démmarée sur le port : " + port));
// Authentification au démarrage pour voir tout de suite dans les logs si les identifiants sont bons
getToken().catch(error => console.error("Authentification iRacing impossible :", error.message));

module.exports = {mask, server};