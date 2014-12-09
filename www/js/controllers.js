angular.module('code_scrbbl.controllers', [])

// Home Controller
.controller('HomeCtrl', function($scope, $ionicModal, $window, scrbblService) {
    $ionicModal.fromTemplateUrl('new_scrbbl.html', function(modal) {
        $scope.NewScrbblModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    // Open the new Scrbbl modal
    $scope.openNewScrbbl = function() {
        $scope.NewScrbblModal.show();
    };

    // close the new Scrbbl modal
    $scope.closeNewScrbbl = function() {
        $scope.NewScrbblModal.hide();
    }

    // create new Scrbbl
    $scope.newScrbbl = function(name) {
        scrbblService.newScrbbl(name);
        $scope.NewScrbblModal.hide();
        $window.location.href = "#/tab/html";
    };

    // Load Scrbbl
    $ionicModal.fromTemplateUrl('manage_scrbbl.html', function(modal) {
        $scope.LoadScrbblModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    // open Load Scrbbl modal
    $scope.openLoadScrbbl = function() {
        $scope.scrbbls = scrbblService.loadScrbbls();
        $scope.LoadScrbblModal.show();
    };

    // close Load Scrbbl Modal
    $scope.closeLoadScrbbl = function() {
        $scope.LoadScrbblModal.hide();
    };

    // load Scrbbl
    $scope.loadScrbbl = function(name) {
        scrbblService.loadScrbbl(name);
        $scope.LoadScrbblModal.hide();
        $window.location.href = "#/tab/html";
    };

    // Edit Scrbbl
    $ionicModal.fromTemplateUrl('edit_scrbbl.html', function(modal) {
        $scope.EditScrbblModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-left'
    });

    $scope.openEditScrbbl = function(name) {
        $scope.old_name = name;
        $scope.edit_scrbbl_name = name;
        $scope.EditScrbblModal.show();
    };

    $scope.closeEditScrbbl = function() {
        $scope.EditScrbblModal.hide();
    };

    $scope.editScrbbl = function(old_name, name) {
        scrbblService.editScrbbl(old_name, name);
        $scope.EditScrbblModal.hide();
        $scope.scrbbls = scrbblService.loadScrbbls();
    };

    // delete Scrbbl
    $scope.deleteScrbbl = function(name) {
        if ($window.confirm('Are you sure you want to delete this button?')) {
            scrbblService.deleteScrbbl(name);
            // $scope.CodeButtonsModal.hide();
            $scope.scrbbls = scrbblService.loadScrbbls();
        }
    };
})

// HTML Controller
.controller('HTMLCtrl', function($scope, $window, $ionicModal, scrbblService, buttonService) {
    // If code exists, load it when returning to this page
    var load_data = scrbblService.getSessionScrbbl("html");
    $scope.scrbblName = load_data.name;
    $scope.input_area = load_data.code;

    // Create the container for the buttons if it doesn't already exist
    buttonService.createDB('buttonHtml');

    // If there are existing buttons, load them
    $scope.buttons = buttonService.getButtons('buttonHtml');

    // Create and load the Create Button Modal
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
        $scope.button_name = "";
        $scope.button_code = "";
        $scope.buttons = buttonService.getButtons('buttonHtml');
    };

    $scope.deleteButton = function(db_name, name) {
        if ($window.confirm('Are you sure you want to delete this button?')) {
            buttonService.deleteButton(db_name, name);
            // $scope.CodeButtonsModal.hide();
            $scope.buttons = buttonService.getButtons('buttonHtml');
        }
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
    };

    // Close the Button side menu
    $scope.closeCodeButtons = function() {
        $scope.CodeButtonsModal.hide();
    };

    // Insert the code from the button into the code editor area
    $scope.insertCode = function(codeButton) {
        buttonService.insertCode(codeButton);
        $scope.CodeButtonsModal.hide();
    };

    // Create and load the Edit Button Modal
    $ionicModal.fromTemplateUrl('edit_button.html', function(modal) {
        $scope.EditButtonsModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    // Open Edit Button modal
    $scope.openEditButton = function(name, code) {
        $scope.old_name = name;
        $scope.edit_button_name = name;
        $scope.edit_button_code = code;
        $scope.EditButtonsModal.show();
    };

    // Close Edit Button modal
    $scope.closeEditButton = function() {
        $scope.EditButtonsModal.hide();
    };

    // Edit button
    $scope.editButton = function(db_name, old_name, name, code) {
        buttonService.editButton(db_name, old_name, name, code);
        $scope.EditButtonsModal.hide();
        $scope.buttons = buttonService.getButtons('buttonHtml');
    };

    // Save the coder input into session storage and send it to preview
    $scope.sendToPreview = function(type, val) {
        scrbblService.sessionScrbbl(type, val);
    };

    // Save Scrbbl
    $scope.saveScrbbl = function() {
        scrbblService.saveScrbbl();
        $window.alert("Scrbbl saved");
    };
})

// CSS Controller
.controller('CSSCtrl', function($scope, $window, $ionicModal, scrbblService, buttonService) {
    // If code exists, load it when returning to this page
    var load_data = scrbblService.getSessionScrbbl("css");
    $scope.scrbblName = load_data.name;
    $scope.input_area = load_data.code;

    // Create the container for the buttons if it doesn't already exist
    buttonService.createDB('buttonCSS');

    // If there are existing buttons, load them
    $scope.buttons = buttonService.getButtons('buttonCSS');

    // Create and load the Create Button Modal
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
        $scope.button_name = "";
        $scope.button_code = "";
        $scope.buttons = buttonService.getButtons('buttonCSS');
    };

    $scope.deleteButton = function(db_name, name) {
        if ($window.confirm('Are you sure you want to delete this button?')) {
            buttonService.deleteButton(db_name, name);
            // $scope.CodeButtonsModal.hide();
            $scope.buttons = buttonService.getButtons('buttonCSS');
        }
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
    };

    // Close the Button side menu
    $scope.closeCodeButtons = function() {
        $scope.CodeButtonsModal.hide();
    };

    // Insert the code from the button into the code editor area
    $scope.insertCode = function(codeButton) {
        buttonService.insertCode(codeButton);
        $scope.CodeButtonsModal.hide();
    };

    // Create and load the Edit Button Modal
    $ionicModal.fromTemplateUrl('edit_button.html', function(modal) {
        $scope.EditButtonsModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    // Open Edit Button modal
    $scope.openEditButton = function(name, code) {
        $scope.old_name = name;
        $scope.edit_button_name = name;
        $scope.edit_button_code = code;
        $scope.EditButtonsModal.show();
    };

    // Close Edit Button modal
    $scope.closeEditButton = function() {
        $scope.EditButtonsModal.hide();
    };

    // Edit button
    $scope.editButton = function(db_name, old_name, name, code) {
        buttonService.editButton(db_name, old_name, name, code);
        $scope.EditButtonsModal.hide();
        $scope.buttons = buttonService.getButtons('buttonCSS');
    };

    // Save the coder input into session storage and send it to preview
    $scope.sendToPreview = function(type, val) {
        scrbblService.sessionScrbbl(type, val);
    };

    // Save Scrbbl
    $scope.saveScrbbl = function() {
        scrbblService.saveScrbbl();
        $window.alert("Scrbbl saved");
    };
})

// JavaScript Controller
.controller('JSCtrl', function($scope, $window, $ionicModal, scrbblService, buttonService) {
    // If code exists, load it when returning to this page
    var load_data = scrbblService.getSessionScrbbl("js");
    $scope.scrbblName = load_data.name;
    $scope.input_area = load_data.code;

    // Create the container for the buttons if it doesn't already exist
    buttonService.createDB('buttonJS');

    // If there are existing buttons, load them
    $scope.buttons = buttonService.getButtons('buttonJS');

    // Create and load the Create Button Modal
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
        $scope.button_name = "";
        $scope.button_code = "";
        $scope.buttons = buttonService.getButtons('buttonJS');
    };

    $scope.deleteButton = function(db_name, name) {
        if ($window.confirm('Are you sure you want to delete this button?')) {
            buttonService.deleteButton(db_name, name);
            // $scope.CodeButtonsModal.hide();
            $scope.buttons = buttonService.getButtons('buttonJS');
        }
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
    };

    // Close the Button side menu
    $scope.closeCodeButtons = function() {
        $scope.CodeButtonsModal.hide();
    };

    // Insert the code from the button into the code editor area
    $scope.insertCode = function(codeButton) {
        buttonService.insertCode(codeButton);
        $scope.CodeButtonsModal.hide();
    };

    // Create and load the Edit Button Modal
    $ionicModal.fromTemplateUrl('edit_button.html', function(modal) {
        $scope.EditButtonsModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    // Open Edit Button modal
    $scope.openEditButton = function(name, code) {
        $scope.old_name = name;
        $scope.edit_button_name = name;
        $scope.edit_button_code = code;
        $scope.EditButtonsModal.show();
    };

    // Close Edit Button modal
    $scope.closeEditButton = function() {
        $scope.EditButtonsModal.hide();
    };

    // Edit button
    $scope.editButton = function(db_name, old_name, name, code) {
        buttonService.editButton(db_name, old_name, name, code);
        $scope.EditButtonsModal.hide();
        $scope.buttons = buttonService.getButtons('buttonJS');
    };

    // Save the coder input into session storage and send it to preview
    $scope.sendToPreview = function(type, val) {
        scrbblService.sessionScrbbl(type, val);
    };

    // Save Scrbbl
    $scope.saveScrbbl = function() {
        scrbblService.saveScrbbl();
        $window.alert("Scrbbl saved");
    };
})

.controller('PreviewCtrl', function($scope, scrbblService) {
    scrbblService.previewScrbbl();
});
