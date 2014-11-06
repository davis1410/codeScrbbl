angular.module('code_tester.controllers', [])

.controller('HTMLCtrl', function($scope, $window) {
    var buttonDB = localStorageDB("buttonDB", localStorage);
    if ( buttonDB.isNew() ) {
        buttonDB.createTable("button", ["name", "code"]);

        buttonDB.commit();
    }

    $scope.createButton = function(button_name, button_code) {
        buttonDB.insert("button", {name: button_name, code: button_code});

        buttonDB.commit();

		var refresh = (function() {
			$window.location.reload();
		})();

		return refresh;
	}

    $scope.buttons = buttonDB.query("button");

    $scope.insertCode = function(codeButton) {
        console.log("hit");
        console.log(codeButton);
        var currentCode = $("#input_area").val(),
            cursorPosition = $("#input_area")[0].selectionStart;
            front = (currentCode).substring(0,cursorPosition);
            back = (currentCode).substring(cursorPosition,currentCode.length);

        $("#input_area").val(front + codeButton + back);
    }
})

.controller('CSSCtrl', function($scope) {
})

.controller('JavaScriptCtrl', function($scope) {
})

.controller('PreviewCtrl', function($scope) {
});
