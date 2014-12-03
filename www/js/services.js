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
    }
})

.factory('scrbblService', function() {
    return {
        sessionDB: function(db_name) {
            var db = new localStorageDB(db_name, sessionStorage);
            if ( db.isNew() ) {
                db.createTable("scrbbl", ["html", "css", "js"]);
                db.commit();
            }
        },
    }
});
