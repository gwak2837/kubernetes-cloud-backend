# node-template-2021

## Requires

- macOS 11.5
- [Git](https://git-scm.com/downloads) 2.32
- [Node](https://hub.docker.com/_/node) 16 Alpine
- [Yarn](https://yarnpkg.com/getting-started/install#about-global-installs) berry
- [PostgreSQL](https://hub.docker.com/_/postgres) 14 Alpine
- [Visual Studio Code](https://code.visualstudio.com/Download) 1.58
- [Docker](https://www.docker.com/get-started) 20.10

## Installation

### Yarn berry

```shell
$ yarn set version berry
```

> https://yarnpkg.com/getting-started/install#per-project-install

```shell
$ yarn init
```

> https://yarnpkg.com/getting-started/usage#starting-a-new-project

### TypeScript

```shell
$ yarn add --dev typescript nodemon ts-node @types/node
$ yarn tsc --init
```

### Prettier, ESLint

```shell
$ yarn add --dev prettier eslint eslint-config-prettier
$ yarn eslint --init
$ yarn add --dev ESLint-권장설치항목
```

### Husky

```shell
$ yarn dlx husky-init --yarn2 && yarn
```

> https://typicode.github.io/husky/#/?id=automatic-recommended

### Yarn berry integration

```shell
$ yarn dlx @yarnpkg/sdks vscode
```

> https://yarnpkg.com/getting-started/editor-sdks#vscode

### Environment variables

```shell
$ yarn add dotenv
```

> https://github.com/motdotla/dotenv#readme

### Database Client

```shell
$ yarn add pg
$ yarn add --dev pg
```

### Sample server (Optional)

```shell
$ yarn add koa koa-router
$ yarn add --dev @types/koa @types/koa-router
```

> https://koajs.com/#application

## Quick start

### Install dependencies

```shell
$ yarn
```

### Create environment variables

```
PORT=4000
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

- 웹팩 설정 중

  - ts 외 파일을 dist 폴더로 어떻게 옮길지 고민 중: loader 사용
