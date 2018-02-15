define(function (require) {

    const UI = require("ui");
    const Alpaca = require("alpaca");

    return UI.registerField("image-summernote", Alpaca.Fields.SummernoteField.extend({
        setup: function () {
            const self = this;

            this.options.summernote = {
                callbacks: {
                    onImageUpload: function (files) {
                        for (let i = files.length - 1; i >= 0; i--) {
                            self.sendFile(files[i], this);
                        }
                    }
                }
            };
            this.base()
        },

        sendFile(file, el) {
            const self = this,
                mimetype = file.type;
            self.connector.branch.queryOne({
                "_type": "n:list",
                "listKey": "images"
            });
            self.connector.branch.searchNodes(file.name).then(function (){console.log("Node exists")}).error(function(){console.error("!!!Node is new!!")})
        },

        readAsArrayBuffer: function (file) {
            return $.Deferred(function (deferred) {
                $.extend(new FileReader(), {
                    onload: function (e) {
                        deferred.resolve(e.target.result);
                    },
                    onerror: function () {
                        deferred.reject(this);
                    }
                }).readAsArrayBuffer(file);
            }).promise();
        }
    }))
});