# node-template-2021

## Requires

- macOS 11.5
- [Git](https://git-scm.com/downloads) 2.32
- [Node](https://hub.docker.com/_/node) 16 Alpine
- [Yarn](https://yarnpkg.com/getting-started/install#about-global-installs) berry
- [PostgreSQL](https://hub.docker.com/_/postgres) 14 Alpine
- [Visual Studio Code](https://code.visualstudio.com/Download) 1.58
- [Docker](https://www.docker.com/get-started) 20.10

## Quick start

### Install dependencies

```shell
$ yarn
```

### Create environment variables

```
PORT=4000

POSTGRES_HOST=
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
```

`.env`, `.env.development`, `.env.test`

### Start Node.js server

```shell
$ yarn dev
```

or

```shell
$ yarn build && yarn start
```

or

```shell
$ docker-compose up --detach --build --force-recreate
```

## Scripts

### `yarn generate`

```
$ export $(grep -v '^#' .env.development | xargs)
$ yarn generate
```

PostgreSQL 데이터베이스 구조를 바탕으로 TypeScript 기반 자료형이 담긴 파일을 생성한다.
