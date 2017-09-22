# cms-ui

to run local tests:

cd tests

(sudo) nom install bower -g

bower install

cd vendor/alpaca

(sudo) npm install gulp

npm install

npm start

cd ../.. (go back to 'tests' folder)

create cloudcms-config.js and define a global variable CLOUDCMS_CONFIG that will be used in form.js

cd .. (go back to root folder)

start python server

start debugger in vs code


#Example of CLOUDCMS_CONFIG:

Copy the following code into cloudcms-config.js and replace [...] items with real values

> var CLOUDCMS_CONFIG = {
   "clientKey": "[client-key-string]",
   "clientSecret": "[client-secret-string]",
   "username": "[username-string]",
   "password": "[password-string]",
   "baseURL": "[base-url followed by /proxy]",
   "application": "[application-string]"
};


For http://iot-dev-2.adbitaly.com values can be found in API keys section, choose one project and click on the irght to obtain the correct JSON


# Python Simple HTTP Server

Move to the root folder and type one of the following command depending on installed python version (python --version):

python 3+ 
>python -m http.server

python 2
> python -m SimpleHTTPServer


# Form.js

At the end of the file there is the connection with Cloud CMS.

Use local JSON to load static values or set remote values to load data from CMS.

Example of remote source configurations from http://iot-dev-2.adbitaly.com :

- schemaSource: is the definition QName
>http://iot-dev-2.adbitaly.com/#/projects/bc8cc6ec71977b5b0dab/definitions/ioCentro:multiRecipe
- dataSource: is the document JSON
>http://iot-dev-2.adbitaly.com/#/projects/bc8cc6ec71977b5b0dab/documents/dd280a33360a4e554f94
- optionsSource: is the form key
>http://iot-dev-2.adbitaly.com/#/projects/bc8cc6ec71977b5b0dab/definitions/ioCentro:multiRecipe/forms/MultiRecipe
