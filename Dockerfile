FROM node:12 AS build

WORKDIR /app

COPY . .

RUN npm install --registry=https://registry.npm.taobao.org

RUN npm run build

FROM node:12-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY --from=build /app/bootstrap.js ./

COPY --from=build /app/package.json ./

RUN apk add --no-cache tzdata

RUN npm install --production

EXPOSE 7002

CMD ["npm", "run", "start"]
# 还没有mysql容器