FROM node:10-alpine as builder

ENV HOME=/home/app
ENV APP_PATH=$HOME/learningpath-frontend

# Copy necessary files for installing dependencies
COPY yarn.lock package.json $APP_PATH/

# Run yarn before src copy to enable better layer caching
WORKDIR $APP_PATH
RUN yarn --production

# Copy necessary source files for server and client build
COPY .babelrc razzle.config.js postcss.config.js $APP_PATH/

COPY src $APP_PATH/src
COPY public $APP_PATH/public

# Build client code
RUN yarn copy-svg-polyfill
RUN yarn run build

### Run stage
FROM node:10-alpine

RUN apk add py2-pip jq && pip install awscli
COPY run-learningpath-frontend.sh /

RUN npm install pm2 -g
WORKDIR /home/app/learningpath-frontend
COPY --from=builder /home/app/learningpath-frontend/build build

ENV NODE_ENV=production

CMD ["/run-learningpath-frontend.sh", "pm2-runtime -i max build/server.js '|' bunyan"]
