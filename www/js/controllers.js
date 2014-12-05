angular.module('code_scrbbl.controllers', [])

.controller('HTMLCtrl', function($scope, $ionicModal,  scrbblService, buttonService) {
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
        buttonService.insertCode(codeButton);
        $scope.CodeButtonsModal.hide();
    }

    // Save the coder input into session storage and send it to preview
    $scope.sendToPreview = function(type, val) {
        scrbblService.sessionScrbbl(type, val);
    }
})

.controller('CSSCtrl', function($scope, $ionicModal, scrbblService, buttonService) {
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
        buttonService.insertCode(codeButton);
        $scope.CodeButtonsModal.hide();
    }

    // Save the coder input into session storage and send it to preview
    $scope.sendToPreview = function(type, val) {
        scrbblService.sessionScrbbl(type, val);
    }
})

.controller('JavaScriptCtrl', function($scope, $ionicModal, scrbblService, buttonService) {
    buttonService.createDB('buttonJS');

    $scope.buttons = buttonService.getButtons('buttonJS');

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
        $scope.buttons = buttonService.getButtons('buttonJS');
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
        buttonService.insertCode(codeButton);
        $scope.CodeButtonsModal.hide();
    }

    // Save the coder input into session storage and send it to preview
    $scope.sendToPreview = function(type, val) {
        scrbblService.sessionScrbbl(type, val);
    }
})

.controller('PreviewCtrl', function($scope) {
});
