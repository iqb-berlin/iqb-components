[![npm](https://img.shields.io/npm/v/iqb-components.svg)](https://www.npmjs.com/package/iqb-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Travis (.com)](https://scm.cms.hu-berlin.de/iqb/iqb-components/badges/master/pipeline.svg)](https://scm.cms.hu-berlin.de/iqb/iqb-components)



# IqbComponents

This is a library of recurrent components in Angular-Projects of the IQB. 

## How to use

### Install
```
npm install iqb-components
```
### Components
This library is developed and maintained with a show case application. Every component is used, 
so in order to get an idea of what these components are for and how they are to be used, have a 
look at the source code!


## Information for developers

### Show Case App for Development

This contains a showcase App for developers to try out each component and also for the automated tests. 

#### Installation and Deployment

```
git clone https://github.com/iqb-berlin/iqb-components.git
npm install
ng serve
```

#### Testing

##### E2E-Tests with Protractor
```
ng e2e
```

###### Troubleshooting
* e2e test fails because version of chrome mismatches chrome driver version 
```
npx webdriver-manager clean
npx webdriver-manager update --versions.chrome=`chromium --product-version` # replace "chrome" with "google-chrome" if you use that
ng e2e --webdriver-update=false
```

##### Unit Tests with Karma
```
ng test  
```

###### Troubleshooting
* If no browser could be caught run
```
export CHROME_BIN=/bin/chromium #this is an example. you have to fill CHROME_BIN
```

#### Default Ports

* deployment: 4207
* e2e-tests: 4208

#### Minimum Requirements

* node v8
* chrome (tests are set up for testing with Chrome but could be done with firefox as well)

### How to include a new component

#### new component check list

* clone repository and install showcase up (see above)
* place component under `src/app/components`
* include component in module in `src/app/components/iqb-components.module.ts`
* export component from barrel file: `src/app/components/public_api.ts` 
* make a testing card in the showcase app for your component in `src/app/showcase.component.*`
* write unit test in same folder like component. You can use ... to auto-generate a skeleton for the unit test
* write a e2e-test for your component in e2e/src

#### publish a new version of components lib

run `make tag-minor` (or patch or major)

or:

* change version tag both in `src/app/components/package.json` and `package.json` to new {version}
* `npm run build:lib`
* `cp README.md dist/`
* `npm login`
* `npm publish dist`
* `git tag {version}`
* `git push` # or pull request
* `git push origin {version}`
