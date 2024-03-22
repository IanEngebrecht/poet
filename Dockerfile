FROM node:20.11.1-alpine3.18 as build

# Install Chromium (for unit tests)
ENV CHROME_BIN=/usr/bin/chromium-browser
# RUN echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
#     echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
#     apk add --no-cache \
#       chromium@edge \
#       nss@edge
RUN apk update && apk upgrade && \
  apk add --no-cache \
  chromium

# Prepare working directory
WORKDIR /app

# Install node modules (dev included)
ENV NODE_ENV=development
COPY package*.json ./
RUN npm ci && npm cache clean --force
# RUN npm ci --production && npm cache clean --force

# RUN npm install -g @angular/cli

COPY . .
# RUN npm run build

# FROM node:20.11.1-alpine3.18 as production

EXPOSE 4200

CMD [ "npm", "run", "start"]



# COPY . .
# RUN npm ci --production &