angular.module('code_tester.controllers', [])

// .controller('HTMLCtrl', function($scope, $window) {
//     var buttonDB = localStorageDB("buttonDB", localStorage);
//     if ( buttonDB.isNew() ) {
//         buttonDB.createTable("button", ["name", "code"]);
//
//         buttonDB.commit();
//     }
//
//     $scope.createButton = function(button_name, button_code) {
//         buttonDB.insert("button", {name: button_name, code: button_code});
//
//         buttonDB.commit();
//
// 		var refresh = (function() {
// 			$window.location.reload();
// 		})();
//
// 		return refresh;
// 	}
//
//     $scope.buttons = buttonDB.query("button");
//
//     $scope.insertCode = function(codeButton) {
//         console.log("hit");
//         console.log(codeButton);
//         var currentCode = $("#input_area").val(),
//             cursorPosition = $("#input_area")[0].selectionStart;
//             front = (currentCode).substring(0,cursorPosition);
//             back = (currentCode).substring(cursorPosition,currentCode.length);
//
//         $("#input_area").val(front + codeButton + back);
//     }
// })

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

    // Open our new task modal
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
        var currentCode = $("#input_area").val(),
            cursorPosition = $("#input_area")[0].selectionStart;
            front = (currentCode).substring(0,cursorPosition);
            back = (currentCode).substring(cursorPosition,currentCode.length);

        $("#input_area").val(front + codeButton + back);

        $scope.HTMLCodeButtonsModal.hide();
    }
})

.controller('CSSCtrl', function($scope) {
})

.controller('JavaScriptCtrl', function($scope) {
})

.controller('PreviewCtrl', function($scope) {
});
