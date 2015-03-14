angular.module('code_scrbbl.services', [])

.factory('editorService', function() {
    return {
        initializeEditor: function(type) {
            var editor = ace.edit(type + "_editor");            
            document.getElementById(type + '_editor').style.fontSize='16px';
            editor.getSession().setUseWrapMode(true);
            
            if (type == "js") {
                editor.getSession().setMode("ace/mode/javascript");
            }
            else {
                editor.getSession().setMode("ace/mode/" + type);
            }
            
            return editor;
        },
        focusEditor: function(editor, type) {
            editor.focus();

            $("#" + type + "_editor").on("tap", function(e, data) {
                var row = Number(data.x);
                var column = Number(data.y);

                var pos = editor.renderer.screenToTextCoordinates(row, column);

                var move = editor.moveCursorToPosition(pos)
            });
            cordova.plugins.Keyboard.show();
        }
    }
})

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
        insertCode: function(editor, codeButton) {
            editor.insert(codeButton);
            editor.focus();
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
        loadSavedScrbbls: function() {
            var db = new localStorageDB('savedScrbbls', localStorage);

            if ( db.isNew() ) {
                db.createTable("scrbbl", ["name", "html", "css", "js"]);
                db.commit();
            }

            var scrbbls = db.query("scrbbl");

            return scrbbls;
        },
        loadScrbbl: function(name) {
            var db = localStorageDB('savedScrbbls', localStorage);
            var sessionDB = localStorageDB('sessionScrbbl', sessionStorage);
            if ( sessionDB.isNew() ) {
                sessionDB.createTable("scrbbl", ["name", "html", "css", "js"]);
                sessionDB.commit();
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
        editScrbbl: function(old_name, name) {
            var db = localStorageDB("savedScrbbls", localStorage);
            db.update("scrbbl", {name: old_name}, function(row) {
                row.name = name;

                return row;
            });
            db.commit();
        },
        deleteScrbbl: function(name) {
            var db = localStorageDB('savedScrbbls', localStorage);
            var sessionDB = localStorageDB('sessionScrbbl', sessionStorage);
            
            // Delete scrbbl from saved scrbbls and session scrbbl
            db.deleteRows("scrbbl", {name: name});
            sessionDB.deleteRows("scrbbl", {name: name});
            
            // Commit the changes
            db.commit();
            sessionDB.commit();
        },
        sendToPreview: function(type, val) {
            var db = new localStorageDB('sessionScrbbl', sessionStorage);
            if ( db.isNew() ) {
                db.createTable("scrbbl", ["name", "html", "css", "js"]);
                db.commit();
            }
            var loaded = db.rowCount("scrbbl");
            if ( loaded == '0' ) {
                db.insert("scrbbl", {name: "Untitled", html: "", css: "", js: ""});
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
            if ( db.isNew() ) {
                db.createTable("scrbbl", ["name", "html", "css", "js"]);
                db.commit();
            }

            var loaded = db.rowCount("scrbbl");
            if ( loaded == '0' ) {
                db.insert("scrbbl", {name: "Untitled", html: "", css: "", js: ""});
                db.commit();
            }

            var scrbbl = db.query("scrbbl");
            var name = scrbbl[0].name;

            if ( type == "html" && loaded != '0' ) {
                return {
                    name: name,
                    code: scrbbl[0].html
                };
            }
            else if ( type == "css" && loaded != '0' ) {
                return {
                    name: name,
                    code: scrbbl[0].css
                };
            }
            else if ( type == "js" && loaded != '0' ) {
                return {
                    name: name,
                    code: scrbbl[0].js
                };
            }
            else {
                return {
                    name: "Untitled",
                };
            }
        },
        previewScrbbl: function() {
            var db = new localStorageDB('sessionScrbbl', sessionStorage);
            var scrbbl = db.query("scrbbl");
            
            var html = scrbbl[0].html
            var css = scrbbl[0].css
            var js = scrbbl[0].js
            
            return {
                "html": html,
                "css": css,
                "js": js,
            }
        }
    }
})

.provider('shadowService', function() {
    var supportsShadowDom = angular.isDefined(document.querySelector('body').createShadowRoot);

    function getStyleInclusion(url) {
      return url ? '<style>' +
        '  @import url("' + url + '");' +
        '</style>' : ''
    }

    this.$get = ['$compile', '$interpolate', '$templateCache',

      function($compile, $interpolate, $templateCache) {
        var shadowTemplate = $interpolate('<div ng-transclude></div>' +
          '<template>{{style}}{{template}}</template>');

        function handleShadowTemplate(config) {
          var template = $templateCache.get(config.templateUrl);

          if (supportsShadowDom) {
            template =
              template.replace('<div ng-transclude></div>', '<content></content>');
            template = shadowTemplate({
              style: getStyleInclusion(config.styleUrl),
              template: template
            })
          }

          return template;
        }

        function shadowLink(linkCallback) {
          return function($scope, element, attr, controllers, transcludeFn) {
            if (supportsShadowDom) {
              var shadow = element.find('div')[0].createShadowRoot(),
                template = element.find('template')[0],
                clone = document.importNode(template.content, true),
                elementWrapper = $interpolate(element.html());

              shadow.appendChild(clone);
              $compile(shadow)($scope);
            }

            linkCallback($scope, element, attr, controllers, transcludeFn);
          }
        }

        return {
          shadowTemplate: handleShadowTemplate,
          shadowLink: shadowLink
        };
      }
    ];
});
