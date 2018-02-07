define(function(require, exports, module) {

    var UI = require("ui");
    var Alpaca = require("alpaca");

    return UI.registerField("image-summernote", Alpaca.Fields.SummernoteField.extend({
        setup: function() {
            var self = this;

            function sendFile(file, el) {
                var readAsArrayBuffer = function(file) {
                    return $.Deferred(function(deferred) {
                        $.extend(new FileReader(), {
                            onload: function(e) {
                                var data = e.target.result;
                                deferred.resolve(data);
                            },
                            onerror: function() {
                                deferred.reject(this);
                            }
                        }).readAsArrayBuffer(file);
                    }).promise();
                };

                var listNode = self.connector.branch.queryOne({
                    "_type": "n:list",
                    "listKey": "images"
                })
                var mimetype = file.type;
                self.connector.branch.createNode({
                    "title": file.name,
                    "_type": "ioCentro:webviewImage"
                }, {
                    "folderpath": "/content/webviewImages"
                }).then(function() {
                    var node = this;
                    readAsArrayBuffer(file).then(function(data) {
                        node.attach("default", mimetype, data, file.name).then(function() {
                            const baseUrl = window.location.origin + '/static/',
                                nodeUrl = node.getRepositoryId() + '-' + node.getBranchId() + '-' + node._doc + '-default?' +
                                    'repository=' + node.getRepositoryId() + '&branch=' + node.getBranchId() + '&node=' + node._doc + '&attachment=default';
                            $(el).summernote('editor.insertImage', baseUrl + nodeUrl);
                        })
                    })
                })
            }

            this.options["summernote"] = {
                callbacks: {
                    onImageUpload: function(files, editor, welEditable) {
                        for (var i = files.length - 1; i >= 0; i--) {
                            sendFile(files[i], this);
                        }
                    }
                }
            }
            this.base()
        }
    }))
})