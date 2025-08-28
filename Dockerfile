FROM node:20-alpine AS builder
LABEL maintainer="Simone Locci <simonelocci88@gmail.com>"

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app
COPY . .
RUN yarn install --immutable \
    && yarn build \
    && chown -R appuser:appgroup /app/docs

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
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group

EXPOSE 3000

USER appuser
CMD ["node", "dist/main"]
