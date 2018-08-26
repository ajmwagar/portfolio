FROM node:carbon

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
ADD . /usr/src/app
RUN npm install

ENV NODE_ENV=production

RUN npm run build

# Port to expose
EXPOSE 8080
EXPOSE 8081
CMD [ "npm", "start" ]
