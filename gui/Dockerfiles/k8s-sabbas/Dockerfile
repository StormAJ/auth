# Dockerfile used w/ K8S hosted on www.sabbas.de

FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .

# environment variables must be set at build time (cannot be accessed in react at run-time)
ENV REACT_APP_apiUrl=http://www.sabbas.de/api

RUN npm run build

FROM nginx
EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
