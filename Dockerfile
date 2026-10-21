
FROM node:22.23-bookworm-slim AS base

ARG BUILD_NUMBER=1_0_0
ARG GIT_REF=not-available

WORKDIR /app

LABEL maintainer="HMPPS Digital Studio <info@digital.justice.gov.uk>"

ENV TZ=Europe/London
RUN ln -snf "/usr/share/zoneinfo/$TZ" /etc/localtime && echo "$TZ" > /etc/timezone

# Grab AWS RDS Root cert
RUN apt-get update && apt-get install -y curl

RUN addgroup --gid 2000 --system appgroup && \
    adduser --uid 2000 --system appuser --gid 2000

# Install AWS RDS Root cert into Java truststore
RUN mkdir -p /home/appuser/.postgresql \
  && curl https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem \
    --output /home/appuser/.postgresql/root.crt \
  && chown appuser:appgroup /home/appuser/.postgresql/root.crt \
  && chmod 644 /home/appuser/.postgresql/root.crt
# Cache breaking
ENV BUILD_NUMBER ${BUILD_NUMBER:-1_0_0}

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

RUN npm i -g npm@10

# Stage: build assets
FROM base as build

ARG BUILD_NUMBER=1_0_0
ARG GIT_REF=not-available

RUN apt-get update && \
    apt-get install -y make python3 g++ git

COPY package*.json ./
RUN CYPRESS_INSTALL_BINARY=0 npm ci --no-audit

COPY . .
RUN npm run build

RUN export BUILD_NUMBER=${BUILD_NUMBER} && \
        export GIT_REF=${GIT_REF} && \
        npm run record-build-info

RUN npm prune --omit=dev

# Stage: copy production assets and dependencies
FROM base

RUN apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

COPY --from=build --chown=appuser:appgroup \
        /app/package.json \
        /app/knex.js \
        /app/knexfile.js \
        /app/config.js \
        ./

COPY --from=build --chown=appuser:appgroup \
        /app/build-info.json ./dist/build-info.json

COPY --from=build --chown=appuser:appgroup \
        /app/app ./app

COPY --from=build --chown=appuser:appgroup \
        /app/node_modules ./node_modules

EXPOSE 3000
ENV NODE_ENV='production'
USER 2000

CMD [ "npm", "start" ]