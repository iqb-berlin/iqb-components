[![npm](https://img.shields.io/npm/v/iqb-components.svg?style=flat-square)](https://www.npmjs.com/package/iqb-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![Travis (.com)](https://img.shields.io/travis/com/iqb-berlin/iqb-components?style=flat-square)](https://travis-ci.com/iqb-berlin/iqb-components)

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

#### Custom Text
This service enables the replacement of text in components and dialog boxes etc. during runtime. 
Typical use cases are the naming of the application, the wording of login prompts or any salutation.

After filling up the dictionary via function `addCustomTexts(newTexts: {[key: string]: string})`, there are two ways to use the service:
* function to get the text `getCustomText(key, defaultvalue)`
* pipe to be used in templates like
 `<li>Text 1: {{'Text 1 default'| customtext:'ctv1':cts.updateCount}}</li>` 

If you like to use this service in the application and in **lazy loaded modules**, a special way to 
declare this module is needed (otherwise, the service will not be singleton):
* In the application module import `IqbComponentsModule.forRoot()`
* In the sub (lazy loaded) module import `IqbComponentsModule.forChild()`

#### Bytes pipe
This is a simple way to present a number of bytes nicely. 
Use in templates `{{value | bytes}}`, you'll get (as examples):
* for value 1536 > '1.5 KB'
* for value 11000000000000 > '10.0 TB'

#### Dialogs
These dialogs provide typical modal boxes to be presented to the user. They are angular material based
so take care to import the modules `MatDialogModule, MatIconModule, MatButtonModule` in your application.
Otherwise for example the positioning on page will fail. Please have a look at the parameters to
understand these components:

##### ConfirmDialogComponent
```
export interface ConfirmDialogData {
  title: string;
  content: string;
  confirmbuttonlabel: string;
  showcancel: boolean;
}
```
##### MessageDialogComponent
```
export enum MessageType {
  error,
  warning,
  info
}

export interface MessageDialogData {
  type: MessageType;
  title: string;
  content: string;
  closebuttonlabel: string;
}
```

### BugReport
A set of services to easily create BugReports on GitHub (or, maybe in the future other targets). 

#### Prerequisites:
The BugReport-Component relies on some globally provided data:

You shoudl store this data in your `environment.ts` and provide in `main.ts`: 
```
  {
    provide: "APP_VERSION",
    useValue: # program version of your app
  },
  {
    provide: "APP_NAME",
    useValue: # name of your app
  },
  {
    provide: "GITHUB_DATA",
    useValue: {
      token: # gitHub-Authtoken 
      user: # gitHub-Username,
      repositoryUrls: {
        'default': # url of your repository. Example: "https://github.com/iqb-berlin/non-existing-repo"
      },
    }
  }
```

The **GitHub-Token** needs the following rights:
- repo/public_repo
- write:discussion

You can create it here: https://github.com/settings.

It's possible to provide more than the default-repository. The use case is if you have one repository for the frontend
to report JS-bugs to and one for the backend to report Server-Errors to.

#### Ho to use

We recommend using this component on the error-page of your app. 

##### a) Report a bug with the BugReportDialog
You can let the user insert some stuff and confirm report before reporting.

```lang-ts
import {BugReportDialogComponent, GitHubService} from 'iqb-components';

...

const dialogRef = this.dialog.open(BugReportDialogComponent, {
  data: {
    report: BugReport,
    targetService: this.gitHubService,
    targetKey: String,
    config: BugReportDialogConfig
  },
});

dialogRef.afterClosed().subscribe(bugReportResult => {

  ...
});
```

As `MAT_DIALOG_DATA` you have to provide an object containing up to four elements. 
It has to contain at least: 
- the `BugReportTargetService` - only the `GitHubService` is available at the moment.

You can also provide:
 - a `BugReportDialogConfig` to change some parts of the dialog's appearance,
 - a `BugReport` as basis,
 - a string called `BugReportTargetKey`.
 
With **BugReportConfig** you can hide some fields in the Dialog. An example use case is: In your app, you have a login
and by this you allready have a username and email for your BugReport. So you provide both in the initial BugReport hide 
those fields from the dialog and hide the corresponding fields with the config.

The **BugReportTargetKey** must be the key of one of the repositories in `GITHUB_DATA`. If you don't have more than one 
repository as target and the key is, as in the example above `default`, you don't have to worry about that.

The **BugReport**-interface holds several optional fields of information which could be useful for the person receiving 
the BugReport. No fields are required, which ones you use depend on your implementation and your needs. Most fields
like `devInfo`, `date`, `url` get filled automatically if you leave them out or empty. only put those fields in the 
initial BugReport in `MAT_DIALOG_DATA`, that you neither want the user to put in nor to get automatically.

There is also a function `createFromJsError` in `BugReportService` to create a BugReport about a caught Javascript-Error.   

See `bug-report.interfaces.ts` for details on the interfaces.

##### Directly report a Bug without confirmation
You can also directly report a Bug without using the Dialog:

```lang-ts
import {GitHubService} from 'iqb-components';

...

this.gitHubService.publishIssue(bugReport, targetKey)
    .subscribe((bugReportResult: BugReportResult) => {
        ...
    });

``` 


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
* chrome (tests are set up for for testing with chrome but could be done with firefox as well)

### How to include a new component

#### new component check list

* clone repository and install showcase up (see above)
* place component under `src/app/components`
* include component in module in `src/app/components/iqb-components.module.ts`
* export component from barrel file: `src/app/components/public_api.ts` 
* make a testing card in the showcase app for your component in `src/app/showcase.component.*`
* write unit test in same folder like component. You can use ... to auto-generate a skeleton for the unit test
* write a e2e-test for your component in e2e/src

#### publish new version of components lib

* change version tag both in `src/app/components/package.json` and `package.json` to new {version}
* `npm run build:lib`
* `cp README.md dist/`
* `npm login`
* `npm publish dist`
* `git tag {version}`
* `git push` # or pull request
* `git push origin {version}`
