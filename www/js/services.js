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
        editButton: function(db_name, old_name, name, code) {
            var db = localStorageDB(db_name, localStorage);
            db.update("button", {name: old_name}, function(row) {
                row.name = name;
                row.code = code;

                return row;
            });
            db.commit();
        },
        deleteButton: function(db_name, name) {
            var db = localStorageDB(db_name, localStorage);
            db.deleteRows("button", {name: name});
            db.commit();
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
        saveScrbbl: function() {
            var db = new localStorageDB('savedScrbbls', localStorage);
            var sessionDB = localStorageDB('sessionScrbbl', sessionStorage);

            if ( db.isNew() ) {
                db.createTable("scrbbl", ["name", "html", "css", "js"]);
                db.commit();
            }

            var scrbbl = sessionDB.query("scrbbl");
            var name = scrbbl[0].name;
            var html = scrbbl[0].html;
            var css = scrbbl[0].css;
            var js = scrbbl[0].js;

            db.insertOrUpdate("scrbbl", {name: name}, {
                name: name,
                html: html,
                css: css,
                js: js
            });
            db.commit();
        },
        loadScrbbls: function() {
            var db = localStorageDB('savedScrbbls', localStorage);
            var scrbbls = db.query("scrbbl");

            return scrbbls;
        },
        editScrbbl: function(name) {
            var db = localStorageDB('savedScrbbls', localStorage);
            var sessionDB = localStorageDB('sessionScrbbl', sessionStorage);
            if ( sessionDB.isNew() ) {
                db.createTable("scrbbl", ["name", "html", "css", "js"]);
                db.commit();
            }

            var scrbbl = db.query('scrbbl', {name: name});
            var name = scrbbl[0].name;
            var html = scrbbl[0].html;
            var css = scrbbl[0].css;
            var js = scrbbl[0].js;

            sessionDB.insertOrUpdate("scrbbl", {ID: 1}, {
                name: name,
                html: html,
                css: css,
                js: js
            });
            sessionDB.commit();
        },
        deleteScrbbl: function(name) {
            var db = localStorageDB('savedScrbbls', localStorage);
            db.deleteRows("scrbbl", {name: name});
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
        getSessionScrbbl: function(type) {
            var db = new localStorageDB('sessionScrbbl', sessionStorage);
            var scrbbl = db.query("scrbbl");
            var name = scrbbl[0].name;
            var loaded = db.rowCount("scrbbl");

            if ( loaded == '0' ) {
                return;
            }
            else if ( type == "html" ) {
                return {
                    name: name,
                    code: scrbbl[0].html
                };
            }
            else if ( type == "css" ) {
                return {
                    name: name,
                    code: scrbbl[0].css
                };
            }
            else if ( type == "js" ) {
                return {
                    name: name,
                    code: scrbbl[0].js
                };
            }
        }
    }
});
