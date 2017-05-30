define(function(require, exports, module) {

    var UI = require("ui");
    var Alpaca = require("alpaca");

    return UI.registerField("adb-summernote", Alpaca.Fields.SummernoteField.extend({
        setup: function() {
            this.option["summernote"]["toolbar"] = [
                ["style", ["bold", "italic", "underline", "clear"]],
                ["font", ["strikethrough", "superscript", "subscript"]],
                ["fontsize", ["fontsize"]],
                ["color", ["color"]],
                ["para", ["ul", "ol", "paragraph"]],
                ["height", ["height"]]
            ]
            this.base()
        }
    }))
})