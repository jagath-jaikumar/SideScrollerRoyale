FROM node:14

WORKDIR /usr/src/app

# https://www.npmjs.com/package/canvas
RUN apt-get update -y && apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

COPY package*.json ./
COPY webpack.config.js ./
COPY src/ src/

RUN npm install && npm run build

EXPOSE 5000

CMD [ "npm", "run", "docker:start"   ]
