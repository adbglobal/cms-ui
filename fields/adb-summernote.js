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
                disableDragAndDrop: true,
                height: null,
                minHeight: null,
                maxHeight: null,
                focus: true
            };
            this.base();
        },
        /**
         * render
         * @override
         * @param view
         * @param callback
         *
         * Call parent render function and listener to the html field to override paste user action
         */
        render: function (view, callback) {
            Alpaca.Fields.SummernoteField.prototype.render.call(this, view, callback);

            if (this.field && this.field.length > 0) {
                this.field[0].addEventListener('paste', function (e) {
                    e.preventDefault();
                    const text = e.clipboardData.getData("text/plain");
                    document.execCommand("insertText", true, text);
                })
            }
        }
    }))
});