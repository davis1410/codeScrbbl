angular.module('code_scrbbl.controllers', [])

.controller('HTMLCtrl', function($scope, $ionicModal, buttonService) {
    buttonService.createDB('buttonHtml');

    $scope.buttons = buttonService.getButtons('buttonHtml');

    // Create and load the Modal
    $ionicModal.fromTemplateUrl('new_button.html', function(modal) {
        $scope.CreateButtonModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    // Create a new code button
    $scope.createButton = function(db_name, button_name, button_code) {
        buttonService.createButton(db_name, button_name, button_code);
        $scope.CreateButtonModal.hide();
        $scope.buttons = buttonService.getButtons('buttonHtml');
    };

    // Open the new button modal
    $scope.newButton = function() {
        $scope.CreateButtonModal.show();
    };

    // Close the new button modal
    $scope.closeNewButton = function() {
        $scope.CreateButtonModal.hide();
    };

    // Button side menu
    $ionicModal.fromTemplateUrl('input_code.html', function(modal) {
        $scope.CodeButtonsModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-left'
    });

    // Open the Button side menu
    $scope.openCodeButtons = function() {
        $scope.CodeButtonsModal.show();
    }

    // Close the Button side menu
    $scope.closeCodeButtons = function() {
        $scope.CodeButtonsModal.hide();
    }

    // Insert the code from the button into the code editor area
    $scope.insertCode = function(codeButton) {
        console.log("hit");
        console.log(codeButton);
        var currentCode = $("#input_area").val(),
            cursorPosition = $("#input_area")[0].selectionStart;
            front = (currentCode).substring(0,cursorPosition);
            back = (currentCode).substring(cursorPosition,currentCode.length);

        $("#input_area").val(front + codeButton + back);

        $scope.CodeButtonsModal.hide();
    }
})

.controller('CSSCtrl', function($scope, $ionicModal, buttonService) {
    buttonService.createDB('buttonCSS');

    $scope.buttons = buttonService.getButtons('buttonCSS');

    // Create and load the Modal
    $ionicModal.fromTemplateUrl('new_button.html', function(modal) {
        $scope.CreateButtonModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    // Create a new code button
    $scope.createButton = function(db_name, button_name, button_code) {
        buttonService.createButton(db_name, button_name, button_code);
        $scope.CreateButtonModal.hide();
        $scope.buttons = buttonService.getButtons('buttonCSS');
    };

    // Open the new button modal
    $scope.newButton = function() {
        $scope.CreateButtonModal.show();
    };

    // Close the new button modal
    $scope.closeNewButton = function() {
        $scope.CreateButtonModal.hide();
    };

    // Button side menu
    $ionicModal.fromTemplateUrl('input_code.html', function(modal) {
        $scope.CodeButtonsModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-left'
    });

    // Open the Button side menu
    $scope.openCodeButtons = function() {
        $scope.CodeButtonsModal.show();
    }

    // Close the Button side menu
    $scope.closeCodeButtons = function() {
        $scope.CodeButtonsModal.hide();
    }

    // Insert the code from the button into the code editor area
    $scope.insertCode = function(codeButton) {
        console.log("hit");
        console.log(codeButton);
        var currentCode = $("#input_area").val(),
        cursorPosition = $("#input_area")[0].selectionStart;
        front = (currentCode).substring(0,cursorPosition);
        back = (currentCode).substring(cursorPosition,currentCode.length);

        $("#input_area").val(front + codeButton + back);

        $scope.CodeButtonsModal.hide();
    }
})

.controller('JavaScriptCtrl', function($scope) {
})

.controller('PreviewCtrl', function($scope) {
});
