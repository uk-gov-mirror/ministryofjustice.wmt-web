# Workload Measurement Tool - Web application
This is the webserver application that will present the information stored in the WMT database to the end user.

It is a node.js application using the express web framework.

## Prerequisites
- Node v12 (managed using [nvm](https://github.com/creationix/nvm))
- Yarn

On OSX (using [homebrew](https://brew.sh/)):

- `brew install nvm`
- Follow the instructions in the brew installer output

Install Node version 12
- `nvm install 12`

Install Yarn
- `npm install -g yarn`

## Getting Started
```
yarn install
yarn start
```

Navigate to `http://localhost:3000` to see the running application

## Testing

### Accessibility Tests

WCAG 2.0 AA audit tests can be run using [pa11y](https://github.com/pa11y/pa11y)

```
npm install -g pa11y
# requires existing workload data in local running environment so screens load correctly
# will generate a number of HTML reports with WCAG 2AA accessibility issues for pages
#
# usage: ./run-pa11y regionId lduId teamId omId
./run-pa11y.sh 1 1 1 1
```

## E2E Tests

E2E Tests are run using [Sauce Labs]().

You need to globally install the webdriver io module:

`npm install -g wdio`

Run tests using the following commands:

- `yarn test-e2e-ie11` # Internet Explorer 11
- `yarn test-e2e-firefox` # Firefox 17
