FROM node:16.17-alpine as builder

ENV HOME=/home/app
ENV APP_PATH=$HOME/learningpath-frontend

# Copy necessary files for installing dependencies
COPY yarn.lock package.json $APP_PATH/

# Run yarn before src copy to enable better layer caching
WORKDIR $APP_PATH
RUN yarn

# Copy necessary source files for server and client build
COPY .babelrc .eslintrc razzle.config.js razzle-add-entry-plugin.js postcss.config.js $APP_PATH/

COPY src $APP_PATH/src
COPY public $APP_PATH/public

# Build client code
RUN yarn run build

# Move robots.txt to build folder
RUN mv $APP_PATH/src/server/robots.txt $APP_PATH/build/robots.txt

### Run stage
FROM node:16.17-alpine

RUN apk add py-pip jq && pip install awscli
COPY run-learningpath-frontend.sh /

RUN npm install pm2 -g
WORKDIR /home/app/learningpath-frontend
COPY --from=builder /home/app/learningpath-frontend/build build

ENV NODE_ENV=production

CMD ["/run-learningpath-frontend.sh", "pm2-runtime -i max build/server.js '|' bunyan"]
