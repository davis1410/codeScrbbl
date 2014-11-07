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

Currently the app is still under development, so there are only a few actions that can be performed in the app. You can enter code via a textarea on the HTML page, and also create buttons that will place inside the textarea whatever code you set them to enter.

Beneath the textarea is a form where you can create the buttons. Enter a user friendly name, and then the code you'd like that button to input. Tap the create button, and your new button will now appear under the textarea. To have the button input it's code, tap on the textarea, close your keyboard, then tap your button. This will enter the code you set the button to input into the textarea.

## Coming Next

When the app is complete, you will be able to edit HTML, CSS, and JavaScript in their own windows, then preview the results on a seperate preview screen. The buttons you create will accessed via a side menu. You'll also be able to save your code into what is called a *scrbbl* (just like in CodePen you create pens, in JSFiddle you create fiddles, etc...). You can manage and load saved scrbbls via another side menu.

## Known Bugs
1. Code Mirror doesn't seem to work in Android's WebView
2. When creating a new code button, the screen flashes black briefly
