define(function(require/*, exports, module*/) {

    const UI = require("ui");
    const Alpaca = require("alpaca");

    return UI.registerField("adb-summernote", Alpaca.Fields.SummernoteField.extend({
        setup: function() {
            this.options["summernote"] = {
                "toolbar": [
                    ["style", ["bold", "italic", "underline", "clear"]],
                    ["font", ["strikethrough", "superscript", "subscript"]],
                    ["fontsize", ["fontsize"]],
                    ["color", ["color"]],
                    ["para", ["ul", "ol", "paragraph"]],
                    ["height", ["height"]]
                ],
                height: null,
                minHeight: null,
                maxHeight: null,
                focus: true
            };
            this.base();
        },
        render: function (view, callback) {
            Alpaca.Fields.SummernoteField.prototype.render.call(this, view, callback);
            this.field[0].addEventListener('paste', function(e) {
                console.log('AdbSummerNote', 'Past plain text');
                e.preventDefault();
                const text = e.clipboardData.getData("text/plain");
                document.execCommand("insertText", true, text);
            });
        }
    }))
});