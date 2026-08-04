docker-compose up -d
# Workload Measurement Tool - Web application

[![CircleCI](https://circleci.com/gh/ministryofjustice/wmt-web/tree/main.svg?style=svg)](https://circleci.com/gh/ministryofjustice/wmt-web/tree/main)

This is the webserver application that will present the information stored in the WMT database to the end user.

It is a node.js application using the express web framework.

## Prerequisites
- Node v22 (managed using [nvm](https://github.com/creationix/nvm))
- Docker

On OSX (using [homebrew](https://brew.sh/)):

- `brew install nvm`
- Follow the instructions in the brew installer output

- Go to [Docker get started](https://www.docker.com/get-started) to install Docker

Install Node version 22.14.0
- `nvm install 22.14.0`
- `nvm use 22.14.0`

This project enforces npm 10 via `engines` and `.npmrc` (`engine-strict=true`).
If your global npm is newer, run project commands with npm 10 via `npx`:
- `npx -y npm@10 install`

## Run application locally against Dev environment
- It is possible to get the web application running locally to:
  - authenticate against the dev environment
  - make network calls to the dev environment APIs
  - integrate with the dev databases
- The below sections describe how to achieve all of the above...

#### Create a .env file
- Duplicate the `.env.template` file and rename the duplicated file to `.env`
- You will notice that in your new `.env` file you have the properties that the application requires
- You will also notice that the secret values (that are intentionally left out of `values.dev.yml` for deployments) are also intentionally not included `.env.template`
- The placeholder values of the properties in `.env.template` will need to be swapped out for the real secrets
- these secrets are stored in `Kubernetes` and can be accessed in the `hmpps-workload-dev` namespace in the following secrets:
  - `hmpps-workload`
  - `rds-history-instance-output`
  - `rds-live-instance-output`
- here is a guide for [connecting to the Kubernetes Cluster](https://user-guide.cloud-platform.service.justice.gov.uk/documentation/getting-started/kubectl-config.html#connecting-to-the-cloud-platform-39-s-kubernetes-cluster) to access the namespace/secrets

#### Connect to DEV DBs
* If you have just done the previous section, you may have noticed that in your resulting `.env` file you have secrets for two databases
* To connect to the DEV databases, we will need to port forward to both of them
* Here is the wiki on how to port forward to DBs in general [Access the DEV RDS Database](https://user-guide.cloud-platform.service.justice.gov.uk/documentation/other-topics/rds-external-access.html#accessing-your-rds-database)
* This wiki explains how to do a single port forward to a single DB, in our case we will need to do it twice (once for each database):
* Use this command from the wiki:
```
kubectl \
  -n [your namespace] \
  run [your pod name] \
  --image=ministryofjustice/port-forward \
  --port=5432 \
  --env="REMOTE_HOST=[your database hostname]" \
  --env="LOCAL_PORT=5432" \
  --env="REMOTE_PORT=5432"
```
- We need to run this twice (once for each database) and make the `[your pod name]` unique for each one 
- I normally set them to:
  - `port-forward-pod` for the `live` database 
  - `port-forward-history-pod` for the `history` database
- Then when you follow the `Forward local traffic to the port-forward-pod` section in the wiki you will need to do that twice also 
- And `IMPORTANTLY`: for the `port-forward-history-pod` forward from local port `5433`. So this:
```
kubectl \
-n [your namespace] \
port-forward \
port-forward-pod 5432:5432

kubectl \
-n [your namespace] \
port-forward \
port-forward-history-pod 5433:5432
```
- Notice this in your `.env` file:
```
WMT_HISTORY_DB_PORT=5433
```
- So, in the locally deployed application, this property we forward traffic for the history DB to 5433 (hence the second port forward being set up on that port)

#### Run localstack, manage-users-api and redis docker services locally
- we can run `redis` locally as a docker container so that we do not need to integrate with the dev environment's redis datasource
- we can run `localstack` locally to simulate the AWS resources we need locally
- run this command from this repo's root directory: 
```
docker-compose up -d redis localstack hmpps-manage-users-api
```
- with the above command you will have noticed that we are specifically running the `redis localstack` containers only. If we were to run the usual `docker-compose up -d` command then we would run the auth service and other downstream services as local containers which is not our intention here
- just running these containers is good because we limit the amount of mocking and interact with dev services as much as possible
- jump into localstack container and run shell script (to create the localstack AWS infra)
```
docker exec -it wmt-web-localstack bash
cd /docker-entrypoint-initaws.d
./setup-s3.sh
exit
```

#### Start the web application
- In Intellij create a new Configuration by clicking `Edit Configuration` in the dropdown next to the `Run` and `Debug` buttons
- Click the `Add new configuration` button (the button with the `+` sign in the top left)
- In the resulting list find `npm` in the list and click on it
- In the resulting form take the defaults and set the following values:
    - `Command` = `run`
    - `Scripts` = `start-local`
- Hit `Apply` button
- Hit `OK` button
- Now you should see a new `start-local` run configuration in the dropdown next to the `Run` and `Debug` buttons
- You should now be in a position to run (as well as debug) the application and it will use the properties set in your new `.env` file to fire the networks calls at the dev environment
- Navigate to `http://localhost:3000` to see the running application.

## Testing

### Unit Tests
- To run Unit Tests run the following command:
```
npm test
npm test
```
- if you want to generate an html report so that you can view any failures vid=sually run this command:
```
npm run test-generate-report

### Integration Tests
To run Integration Tests
- run docker containers
```bash
docker compose up -d
```

- jump into localstack container and run shell script (to create the localstack AWS infra)
```
docker exec -it wmt-web-localstack bash
cd /docker-entrypoint-initaws.d
./setup-s3.sh
exit
  - run the following command:
```
npm run integration-test
```
- if you want to generate an html report so that you can view any failures visually run this command instead:
```
npm run integration-test-generate-report

## E2E Tests

E2E Tests are run using Selenium and webdriver

Run tests using the following commands:
- run docker containers
```
docker compose up -d
```

- jump into localstack container and run shell script (to create the localstack AWS infra)
```
docker exec -it wmt-web-localstack bash
cd /docker-entrypoint-initaws.d
./setup-s3.sh
exit
```
- post mappings to wiremock
```
npm run post-wiremock-mappings
- run the following command to start the application and run the e2e tests:
```
npm run start-dev
npm run test-e2e
