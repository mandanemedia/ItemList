# How to run CucumberJS

Current project supported npm version - `6.14.4`

### Prerequisites

---
Run the command `npm install` for packages & dependencies installation.

### Running CucumberJS using "Command line"

---
To run tests you need to be in the directory `end-to-end-tests` 

Running the whole test suite
- execute the command - `./node_modules/.bin/cucumber-js` or `npm test`

Running a specific cucumber feature file
- execute the command - `./node_modules/.bin/cucumber-js features/(FileName).feature`
    - ex. `./node_modules/.bin/cucumber-js features/list-item-service.feature`

Running a specific annotation feature tag

#####Option 1
- execute the command - `node_modules/.bin/cucumber-js --tags @configuration`
    - ex. `node_modules/.bin/cucumber-js --tags @lookups`

#####Option 2
- execute the command - `yarn test-tag @(tag_feature)`
   - ex. `yarn test-tag @lookups`


### Running CucumberJS using "IntelliJ" IDE
---

In order for CucumberJS to function properly, you will need to download the plugin `cucumber.js` from intellj's marketplace settings.

- `* NOTE *` - You can also download the plugin from Jetbrains site - https://plugins.jetbrains.com/plugin/7418-cucumber-js

Import the project as an `empty project`

There are two options to run cucumber feature file when using an IDE

##### Option 1
* `* NOTE *` - Running tests when only one cucumber plugin is installed or disable other cucumber plugins
1. Open up the `features` directory in the project window of IntelliJ
2. `Right click` on the feature file
3. Go to `Run (feature file name).feature`

Running the whole test suite
1. Right click the `features` directory in the project window of IntelliJ
2. Click `Run features`

##### Option 2
* `* NOTE *` - Running tests when multiple plugins are installed in IntelliJ
1. Go to `Add Configuration` near the top right of the IntelliJ IDE
2. Click the `+` icon in the window
3. Select `CucumberJS`
4. In the `Feature file or Directory` input the file path of where the feature file is
    - ex. `(home directory)/gateway.svc.molt.in/component-tests/features`
5. Select the cucumber runner configuration you have just created
6. `Right click` on the feature file
7. Go to `Run` -> `(feature file name).feature`

#### In IntelliJ
1. Add the parameter string to the `Cucumber.js arguments` in the run configuration

### Generating the Cucumber HTML Report

1. Run `node index.js` from root