# Install all packages and transpile TypeScript into JavaScript
FROM node:16-alpine AS builder

ENV NODE_ENV=production

WORKDIR /server

COPY .yarn .yarn
COPY src src
COPY .yarnrc.yml package.json tsconfig.json webpack.config.js yarn.lock ./

RUN yarn && yarn build

# Install only dependency packages
FROM node:16-alpine AS runner

ENV NODE_ENV=production

WORKDIR /server

COPY --from=builder /server/dist dist

EXPOSE 3000

ENTRYPOINT ["node", "dist/index.js"]
