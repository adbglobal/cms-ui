define(function (require/*, exports, module*/) {

    const UI = require("ui");
    const Alpaca = require("alpaca");

    return UI.registerField("multi-select", Alpaca.Fields.SelectField.extend({

        parentPrototype: Alpaca.Fields.SelectField.prototype,

        getFieldType: function () {
            return "multi-select";
        },

        getValue: function (value) {
            return this.data;
        }

    }))
});