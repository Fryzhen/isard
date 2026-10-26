// node --test server/ : simule iRacing en remplaçant fetch, puis interroge le vrai serveur Express
const test = require('node:test');
const assert = require('node:assert');

const realFetch = global.fetch;
const oauthCalls = [];
const dataCalls = [];
const oauthResponses = [
    {status: 200, body: {access_token: 'A1', expires_in: 30, refresh_token: 'R1', refresh_token_expires_in: 604800}},
    {status: 200, body: {access_token: 'A2', expires_in: 600, refresh_token: 'R2', refresh_token_expires_in: 604800}},
    {status: 400, body: {error: 'unauthorized_client'}, headers: {'retry-after': '120'}},
];
global.fetch = async (url, options) => {
    if (url.startsWith('http://localhost')) {
        return realFetch(url, options);
    }
    if (url === 'https://oauth.iracing.com/oauth2/token') {
        oauthCalls.push(Object.fromEntries(options.body));
        const {status, body, headers} = oauthResponses.shift();
        return new Response(JSON.stringify(body), {status, headers});
    }
    dataCalls.push(options.headers.Authorization);
    return Response.json({ok: true});
};

process.env.CLIENT_ID = 'isard-client';
process.env.CLIENT_SECRET = 'secret';
process.env.EMAIL = 'me@example.com';
process.env.ENCODED_PASSWORD = 'encoded=';
const {mask, server} = require('./app');
const get = (path) => realFetch('http://localhost:3000' + path).then((r) => r.status);

test.after(() => server.close());

test('masque comme la doc iRacing', () => {
    assert.strictEqual(
        mask('Anagram-tactics-FOOTING-OPACITY-SHONE-keenly', ' John.West@iracing.com '),
        'KIhAi2ynNPWvJsebdluGaBaPTRaUACqTPDCfyUuv46Y=');
});

test('password_limited au démarrage, puis un seul refresh partagé, puis pause après échec', async () => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    assert.deepStrictEqual(oauthCalls[0], {
        client_id: 'isard-client',
        client_secret: mask('secret', 'isard-client'),
        grant_type: 'password_limited',
        username: 'me@example.com',
        password: 'encoded=',
        scope: 'iracing.auth',
    });

    // A1 expire dans 30s (< marge de 60s) : deux requêtes simultanées partagent un seul refresh
    assert.deepStrictEqual(await Promise.all([get('/api/member/info'), get('/api/member/info')]), [200, 200]);
    assert.strictEqual(oauthCalls.length, 2);
    assert.strictEqual(oauthCalls[1].grant_type, 'refresh_token');
    assert.strictEqual(oauthCalls[1].refresh_token, 'R1');
    assert.deepStrictEqual(dataCalls, ['Bearer A2', 'Bearer A2']);

    // 10 min plus tard A2 a expiré, le refresh échoue : 500, et plus aucun appel OAuth pendant le Retry-After
    const now = Date.now;
    Date.now = () => now() + 600000;
    assert.strictEqual(await get('/api/member/info'), 500);
    assert.strictEqual(await get('/api/member/info'), 500);
    assert.strictEqual(oauthCalls.length, 3);
});
