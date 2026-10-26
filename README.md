# Isard
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.8.

## Usefull commands

To start the project you need to install `node_modules` by doing : 
```bash
npm install
```

Then you can run the project with :
```bash
npm run dev
```

To add a component to the project you can :
```bash
ng g c ComponentName
```

To add a service to the project you can :
```bash
ng g s ServiceName
```

To detect bad behaviour you can run :
```bash
npm run lint:all
```

And if you want to try to correct them automaticaly :
```bash
npm run lint:all:fix
```

## API (server/)

The Express server proxies the iRacing API under `/api` and serves the Angular build.
It needs a `.env` with `EMAIL`, `ENCODED_PASSWORD` and `CURRENT_URL` (e.g. `http://localhost:3000/api/`).

```bash
npm run server   # API on http://localhost:3000, `npm run dev` proxies /api to it
```
