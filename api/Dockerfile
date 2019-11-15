FROM node:alpine as builder
WORKDIR '/app'
COPY package.json .
# python required for bcryptjs
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install

# Environment variables to be set by secret:
# ENV auth_APIKey=
# ENV auth_jwtPrivateKey=
# ENV auth_WebPW=
# ENV auth_pgPw=


ENV auth_pgHost=postgres
ENV auth_pgPort=5432
ENV auth_apiHost=localhost:80
COPY . .
CMD ["npm", "start"] 

# FROM nginx
# COPY --from=builder /app /usr/share/nginx/html
