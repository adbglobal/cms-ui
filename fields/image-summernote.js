define(function (require) {

    const UI = require("ui");
    const Alpaca = require("alpaca");

    return UI.registerField("image-summernote", Alpaca.Fields.SummernoteField.extend({
        setup: function () {
            const self = this;

            function sendFile(file, el) {
                const readAsArrayBuffer = function (file) {
                    return $.Deferred(function (deferred) {
                        $.extend(new FileReader(), {
                            onload: function (e) {
                                console.log('On load deferred file reader', this);
                                deferred.resolve(e.target.result);
                            },
                            onerror: function () {
                                console.error('On error deferred file reader', this);
                                deferred.reject(this);
                            }
                        }).readAsArrayBuffer(file);
                    }).promise();
                };

                // const listNode = self.connector.branch.queryOne({
                //     "_type": "n:list",
                //     "listKey": "images"
                // });
                const mimetype = file.type;
                self.connector.branch.createNode({
                    "title": file.name,
                    "_type": "ioCentro:webviewImage"
                }, {
                    "folderpath": "/content/webviewImages"
                })
                    .then(function () {
                        const node = this;
                        readAsArrayBuffer(file)
                            .then(function (data) {
                                node.attach("default", mimetype, data, file.name)
                                    .then(function () {
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
                    onImageUpload: function (files, editor, welEditable) {
                        for (let i = files.length - 1; i >= 0; i--) {
                            sendFile(files[i], this);
                        }
                    }
                }
            };
            this.base()
        }
    }))
});