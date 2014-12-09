angular.module('code_scrbbl.services', [])

.factory('buttonService', function() {
    return {
        createDB: function(db_name) {
            var db = new localStorageDB(db_name, localStorage);
            if ( db.isNew() ) {
                db.createTable("button", ["name", "code"]);
                db.commit();
            }
        },
        getButtons: function(db_name) {
            var db = localStorageDB(db_name, localStorage);
            var query = db.query("button");
            return query;
        },
        createButton: function(db_name, name, code) {
            var db = localStorageDB(db_name, localStorage);
            db.insert("button", {name: name, code: code});
            db.commit();
        },
        insertCode: function(codeButton) {
            var currentCode = $("#input_area").val(),
            cursorPosition = $("#input_area")[0].selectionStart;
            front = (currentCode).substring(0,cursorPosition);
            back = (currentCode).substring(cursorPosition,currentCode.length);

            $("#input_area").val(front + codeButton + back);
        },
    }
})

.factory('scrbblService', function() {
    return {
        newScrbbl: function(name) {
            var db = new localStorageDB('sessionScrbbl', sessionStorage);
            if ( db.isNew() ) {
                db.createTable("scrbbl", ["name", "html", "css", "js"]);
                db.commit();
            }
            db.insertOrUpdate("scrbbl", {ID: 1}, {
                name: name,
                html: "",
                css: "",
                js: ""
            });
            db.commit();
        },
        sessionScrbbl: function(type, val) {
            var db = new localStorageDB('sessionScrbbl', sessionStorage);
            if ( db.isNew() ) {
                db.createTable("scrbbl", ["html", "css", "js"]);
                db.commit();
            }
            var loaded = db.rowCount("scrbbl");
            if ( loaded == '0' ) {
                db.insert("scrbbl", {html: "", css: "", js: ""});
                db.commit();
            }
            db.update("scrbbl", {ID: 1}, function(row) {
                if ( type == "html" ) {
                    row.html = val;
                }
                else if ( type == "css" ) {
                    row.css = val;
                }
                else {
                    row.js = val;
                }
                return row;
            });
            db.commit();
        },
    }
});
