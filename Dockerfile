# --- STAGE 1: Build ---
FROM node:20.11.1-alpine3.18 as build
WORKDIR /app

# Install node modules (production only)
ENV NODE_ENV=production
COPY --chown=node:node package*.json ./
RUN npm ci && npm cache clean --force

# Build the webapp
COPY . .
RUN npm run build

# --- STAGE 2: Run ---
FROM node:20.11.1-alpine3.18

# Globally install package for serving the app
RUN npm install -g angular-http-server

# Prepare working directory
WORKDIR /app
RUN mkdir -p /app && chown node:node /app
USER node

# Copy over compiled webapp code
COPY --from=build --chown=node:node /app/dist/ ./dist/
COPY --from=build --chown=node:node /app/node_modules/ ./node_modules/

# Run webapp
EXPOSE 4200
WORKDIR /app/dist/poet/browser
CMD [ "angular-http-server", "-p", "4200"]
