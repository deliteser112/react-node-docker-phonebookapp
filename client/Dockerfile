FROM node:alpine as builder
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]