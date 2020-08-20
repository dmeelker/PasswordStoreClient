FROM node:current-alpine as builder
WORKDIR /webapp
COPY . .

ENV REACT_APP_ENVIRONMENT production

RUN npm install
RUN npm run build

FROM httpd:alpine
COPY --from=builder /webapp/build /usr/local/apache2/htdocs/