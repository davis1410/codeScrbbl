angular.module('code_scrbbl.controllers', [])

// New Scrbbl Controller
.controller('NewScrbblCtrl', function($scope, $window, scrbblService) {
    // create new Scrbbl
    $scope.newScrbbl = function(name) {
        scrbblService.newScrbbl(name);
        $window.location.href = "#/tab/html";
    };    
})

// Manage Scrbbls Controller
.controller('ManageScrbblsCtrl', function($scope, $ionicModal, $ionicPopup, $window, scrbblService) {
    $scope.scrbbls = scrbblService.loadSavedScrbbls();

    // load Scrbbl
    $scope.loadScrbbl = function(name) {
        scrbblService.loadScrbbl(name);
        $window.location.href = "#/tab/html";
    };

    // Edit Scrbbl
    $ionicModal.fromTemplateUrl('edit_scrbbl.html', function(modal) {
        $scope.EditScrbblModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
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
        $scope.scrbbls = scrbblService.loadSavedScrbbls();
    };

    // delete Scrbbl
    $scope.deleteScrbbl = function(name) {
        var deleteScrbblConfirm = $ionicPopup.confirm({
            title: 'Delete Scrbbl',
            template: 'Are you sure you want to delete this Scrbbl?'
        });
        deleteScrbblConfirm.then(function(res) {
            if(res) {
                scrbblService.deleteScrbbl(name);
                $scope.scrbbls = scrbblService.loadSavedScrbbls();
            }
        });
    };
})

// HTML Controller
.controller('HTMLCtrl', function($scope, $ionicModal, $ionicPopup, editorService, scrbblService, buttonService) {
    // Editor type
    var type = "html";
    
    // Initiate the code editor
    var editor = editorService.initializeEditor(type);
    
    // Data for button/snips menu
    $scope.editor = editor;
    $scope.btnType = "buttonHtml";

    // Focus the editor and position the cursor on tap
    $scope.focusEditor = function() {
        editorService.focusEditor(editor, type);
    }
    
    // If code exists, load it when returning to this page
    $scope.$on('$ionicView.enter', function(){
        var load_data = scrbblService.getSessionScrbbl(type);
        $scope.scrbblName = load_data.name;
        editor.setValue(load_data.code, 1);
    });

    // Save the coder input into session storage and send it to preview
    editor.getSession().on('change', function(e) {
        var val = editor.getValue();
        scrbblService.sendToPreview(type, val);
    });

    // Save Scrbbl
    $scope.saveScrbbl = function() {
        scrbblService.saveScrbbl();
        var savePopup = $ionicPopup.alert({
            title: 'Save Scrbbl',
            template: 'Scrbbl has been saved.'
        });
    };
})

// CSS Controller
.controller('CSSCtrl', function($scope, $ionicModal, $ionicPopup, editorService, scrbblService, buttonService) {
    // Editor type
    var type = "css";
    
    // Initiate the code editor
    var editor = editorService.initializeEditor(type);
    
    // Data for button/snips menu
    $scope.editor = editor;
    $scope.btnType = "buttonCSS";

    // Focus the editor and position the cursor on tap
    $scope.focusEditor = function() {
        editorService.focusEditor(editor, type);
    }
    
    // If code exists, load it when returning to this page
    $scope.$on('$ionicView.enter', function(){
        var load_data = scrbblService.getSessionScrbbl(type);
        $scope.scrbblName = load_data.name;
        editor.setValue(load_data.code, 1);
    });

    // Save the coder input into session storage and send it to preview
    editor.getSession().on('change', function(e) {
        var val = editor.getValue();
        scrbblService.sendToPreview(type, val);
    });

    // Save Scrbbl
    $scope.saveScrbbl = function() {
        scrbblService.saveScrbbl();
        var savePopup = $ionicPopup.alert({
            title: 'Save Scrbbl',
            template: 'Scrbbl has been saved.'
        });
    };
})

// JavaScript Controller
.controller('JSCtrl', function($scope, $ionicModal, $ionicPopup, editorService, scrbblService, buttonService) {
    // Editor type
    var type = "js";
    
    // Initiate the code editor
    var editor = editorService.initializeEditor(type);
    
    // Data for button/snips menu
    $scope.editor = editor;
    $scope.btnType = "buttonJS";

    // Focus the editor and position the cursor on tap
    $scope.focusEditor = function() {
        editorService.focusEditor(editor, type);
    }
    
    // If code exists, load it when returning to this page
    $scope.$on('$ionicView.enter', function(){
        var load_data = scrbblService.getSessionScrbbl(type);
        $scope.scrbblName = load_data.name;
        editor.setValue(load_data.code, 1);
    });

    // Save the coder input into session storage and send it to preview
    editor.getSession().on('change', function(e) {
        var val = editor.getValue();
        scrbblService.sendToPreview(type, val);
    });

    // Save Scrbbl
    $scope.saveScrbbl = function() {
        scrbblService.saveScrbbl();
        var savePopup = $ionicPopup.alert({
            title: 'Save Scrbbl',
            template: 'Scrbbl has been saved.'
        });
    };
})

.directive('snipsMenu', function() {
    return {
        restrict: 'E',
        replace: false,
        transclude: true,
        scope: {
            editor: '=editor',
            type: '=type'
        },
        templateUrl: 'templates/snips-menu.html',
        controller: function($scope, $ionicModal, $ionicPopup, buttonService) {
            var editor = $scope['editor'];
            var type = $scope['type'];
            
            $scope.type = type;
            
            // Create the container for the buttons if it doesn't already exist
            buttonService.createDB(type);

            // If there are existing buttons, load them
            $scope.buttons = buttonService.getButtons(type);

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
                $scope.buttons = buttonService.getButtons(type);
            };

            $scope.deleteButton = function(db_name, name) {
                var deleteButtonConfirm = $ionicPopup.confirm({
                    title: 'Delete Button',
                    template: 'Are you sure you want to delete this button?'
                });
                deleteButtonConfirm.then(function(res) {
                    if(res) {
                        buttonService.deleteButton(db_name, name);
                        $scope.buttons = buttonService.getButtons(type);
                    }
                });
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
                animation: 'slide-in-up'
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
                buttonService.insertCode($scope["editor"], codeButton);
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
                $scope.buttons = buttonService.getButtons(type);
            };
        }
    }
})

.directive('codePreview', function() {
    return {
        restrict: 'E',
        replace: false,
        transclude: true,
        scope: {},
        controller: function($scope, scrbblService) {
            var preview = scrbblService.previewScrbbl();
            
            var preview_window = window.frames[0].document;
        
            preview_window.write("<!DOCTYPE html>");
            preview_window.write("<html>");
            preview_window.write("<head>");
            preview_window.write("<style type='text/css'>" + preview.css + "</style>");
            preview_window.write("<script src='lib/jquery/dist/jquery.min.js' type='text/javascript'></script>");
            preview_window.write("<script type='text/javascript'>\n");
            preview_window.write(preview.js);
            preview_window.write("\n</script>");
            preview_window.write("</head>");
            preview_window.write("<body>");
            preview_window.write(preview.html);
            preview_window.write("</body>");
            preview_window.write("</html>");
            preview_window.close();
        },
        templateUrl: 'templates/render-preview.html',
    };
});
