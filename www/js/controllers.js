angular.module('code_scrbbl.controllers', [])

.controller('HTMLCtrl', function($scope, $ionicModal) {
    var buttonHtmlDB = new localStorageDB("buttonHtml", localStorage);
    if ( buttonHtmlDB.isNew() ) {
        buttonHtmlDB.createTable("button", ["name", "code"]);

        buttonHtmlDB.commit();
    }

    $scope.buttons = buttonHtmlDB.query("button");

    // Create and load the Modal
    $ionicModal.fromTemplateUrl('new_html_button.html', function(modal) {
        $scope.HTMLCreateButtonModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    // Called when the form is submitted
    $scope.createHTMLButton = function(name, code) {
        buttonHtmlDB.insert("button", {name: name, code: code});
        buttonHtmlDB.commit();
        $scope.HTMLCreateButtonModal.hide();
        $scope.buttons = buttonHtmlDB.query("button");
    };

    // Open the new task modal
    $scope.newHTMLButton = function() {
        $scope.HTMLCreateButtonModal.show();
    };

    // Close the new task modal
    $scope.closeNewHTMLButton = function() {
        $scope.HTMLCreateButtonModal.hide();
    };

    $ionicModal.fromTemplateUrl('input_code.html', function(modal) {
        $scope.HTMLCodeButtonsModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-left'
    });

    $scope.openHTMLCodeButtons = function() {
        $scope.HTMLCodeButtonsModal.show();
    }

    $scope.closeHTMLCodeButtons = function() {
        $scope.HTMLCodeButtonsModal.hide();
    }

    $scope.insertCode = function(codeButton) {
        console.log("hit");
        console.log(codeButton);
        var currentCode = $("#input_area_html").val(),
            cursorPosition = $("#input_area_html")[0].selectionStart;
            front = (currentCode).substring(0,cursorPosition);
            back = (currentCode).substring(cursorPosition,currentCode.length);

        $("#input_area_html").val(front + codeButton + back);

        $scope.HTMLCodeButtonsModal.hide();
    }
})

.controller('CSSCtrl', function($scope, $ionicModal) {
    var buttonCSSDB = new localStorageDB("buttonCSS", localStorage);
    if ( buttonCSSDB.isNew() ) {
        buttonCSSDB.createTable("button", ["name", "code"]);

        buttonCSSDB.commit();
    }

    $scope.buttons = buttonCSSDB.query("button");

    // Create and load the Modal
    $ionicModal.fromTemplateUrl('new_css_button.html', function(modal) {
        $scope.CSSCreateButtonModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    // Called when the form is submitted
    $scope.createCSSButton = function(name, code) {
        buttonCSSDB.insert("button", {name: name, code: code});
        buttonCSSDB.commit();
        $scope.CSSCreateButtonModal.hide();
        $scope.buttons = buttonCSSDB.query("button");
    };

    // Open the new task modal
    $scope.newCSSButton = function() {
        $scope.CSSCreateButtonModal.show();
    };

    // Close the new task modal
    $scope.closeNewCSSButton = function() {
        $scope.CSSCreateButtonModal.hide();
    };

    $ionicModal.fromTemplateUrl('input_code.html', function(modal) {
        $scope.CSSCodeButtonsModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-left'
    });

    $scope.openCSSCodeButtons = function() {
        $scope.CSSCodeButtonsModal.show();
    }

    $scope.closeCSSCodeButtons = function() {
        $scope.CSSCodeButtonsModal.hide();
    }

    $scope.insertCode = function(codeButton) {
        console.log("hit");
        console.log(codeButton);
        var currentCode = $("#input_area_css").val(),
        cursorPosition = $("#input_area_css")[0].selectionStart;
        front = (currentCode).substring(0,cursorPosition);
        back = (currentCode).substring(cursorPosition,currentCode.length);

        $("#input_area_css").val(front + codeButton + back);

        $scope.CSSCodeButtonsModal.hide();
    }
})

.controller('JavaScriptCtrl', function($scope) {
})

.controller('PreviewCtrl', function($scope) {
});
