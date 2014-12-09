# Code Scrbbl

*Code testing on the go for Front End Web Developers*


## Description

Code Scrbbl is a mobile app for Android that allows front end web developers to test HTML, CSS, and JavaScript code while on the go. It's similar to online tools such as CodePen, JSFiddle, and Plunker.

## Development and Testing

Code Scrbbl is built with the Ionic framework, so you'll need to have it installed to run the app. Please visit [ionicframework.com](http://ionicframework.com/ "Ionic Framework") for installation instructions.

You'll also need Node.js installed. Visit [nodejs.org](http://nodejs.org/ "Node.js") to download and install.

Once you've got your development environment setup, you'll need to install the app's dependencies. Open a command prompt, cd into the app directory, and run the following command:
```
npm install
bower install
```
This will install all the dependencies the app requires to run.

Once dependencies are installed, you should be able to build the app. Type the following commands:
```
ionic platform android
ionic build android
ionic serve (opens the app in your default browser)
ionic run android (to open in an emulator or push to a connected device)
```

## Using the App

On the home screen of the app you'll have the option of creating a new "Scrbbl" or managing existing ones. Once you've created a Scrbbl, you may edit the HTML, CSS, and JavaScript in their respective screens. You'll be able to preview the changes you've made to your code on the Preview tab.

You may also create code buttons for your most commonly used code. Click on the menu icon in the upper left corner of any of the three language editing screens to create, edit, and delete code buttons.

## Known Bugs
1. Code Mirror doesn't seem to work in Android's WebView
2. JavaScript has trouble finding elements, I'm guessing due to load order
3. jQuery does not work in the Preview
