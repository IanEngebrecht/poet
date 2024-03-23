# Poet

A web-based graphical user interface (GUI) wrapping the PoetryDB API (https://poetrydb.org/).

Uses Angular version 17.3.1.

# Prerequisites

It is assumed that you have the following:
* Docker Engine
* Docker Compose
* Internet access

# Building

To build the webapp:

```bash
docker compose build webapp
```

# Running

To run the webapp:

```bash
docker compose up
```

Both building and running can be run together by running:

```bash
docker compose up --build
```

# Development Mode

In order to development utilities, the webapp service needs to be brought up differently:

```bash
docker compose -f docker-compose.develop.yml run --rm -it --build webapp sh
```

With the container running, set it up:

```bash
# Inside the container...

npm install {some_new_package}   # install new package
npm run start                    # manually start the webapp
npm run test                     # run unit tests
npm run prettier                 # run formatter
npm run lint                     # run linter
```
