define(function (require) {

    const UI = require("ui");
    const Alpaca = require("alpaca");

    return UI.registerField("session-select", Alpaca.Fields.SelectField.extend({

        /**
         * getFieldType
         * @override
         * @returns {string} - field type
         */
        getFieldType: function () {
            return "session-select";
        },

        /**
         * setValue
         * @override
         * @param value - payload value
         *
         * Set on session storage the region value
         */
        setValue: function (value) {
            sessionStorage.setItem('region', value);
            this.base(value);
        }
    }))
});