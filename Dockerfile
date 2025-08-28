FROM node:20-alpine AS builder
LABEL maintainer="Simone Locci <simonelocci88@gmail.com>"

WORKDIR /app
COPY . .
RUN yarn install --immutable \
    && yarn build

FROM node:20-alpine
LABEL maintainer="Simone Locci <simonelocci88@gmail.com>"

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/docs ./docs
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/yarn.lock ./yarn.lock

EXPOSE 3000

CMD ["node", "dist/main"]
