define(function (require/*, exports, module*/) {

    const UI = require("ui");
    const Alpaca = require("alpaca");
    // const $ = require("jquery");

    return UI.registerField("number", Alpaca.Fields.NumberField.extend({

        /**
         * _validateDivisibleBy
         * @override
         * @returns {boolean} - check if value not null and is divisible
         * @private
         */
        _validateDivisibleBy: function () {
            const value = this.getValue();
            if (Alpaca.isEmpty(value) || isNaN(value)) {
                return true
            }
            if (!Alpaca.isEmpty(this.schema.divisibleBy)) {
                if (value % this.schema.divisibleBy !== 0) {
                    return false;
                }
            }
            return true;
        },

        /**
         * _validateMaximum
         * @override
         * @returns {boolean} - check if value not null and less than maximum
         * @private
         */
        _validateMaximum: function () {
            const value = this.getValue();
            if (Alpaca.isEmpty(value) || isNaN(value)) {
                return true
            }
            if (!Alpaca.isEmpty(this.schema.maximum)) {
                if (value > this.schema.maximum) {
                    return false;
                }
                if (!Alpaca.isEmpty(this.schema.exclusiveMaximum)) {
                    if (value === this.schema.maximum && this.schema.exclusiveMaximum) { // jshint ignore:line
                        return false;
                    }
                }
            }
            return true;
        },

        /**
         * _validateMinimum
         * @override
         * @returns {boolean} - check if value not null and greater than minimum
         * @private
         */
        _validateMinimum: function () {
            const value = this.getValue();
            if (Alpaca.isEmpty(value) || isNaN(value)) {
                return true
            }
            if (!Alpaca.isEmpty(this.schema.minimum)) {
                if (value < this.schema.minimum) {
                    return false;
                }
                if (!Alpaca.isEmpty(this.schema.exclusiveMinimum)) {
                    if (value === this.schema.minimum && this.schema.exclusiveMinimum) { // jshint ignore:line
                        return false;
                    }
                }
            }
            return true;
        },

        /**
         * _validateMultipleOf
         * @override
         * @returns {boolean} - check if value not null and multiple
         * @private
         */
        _validateMultipleOf: function () {
            const value = this.getValue();
            if (Alpaca.isEmpty(value) || isNaN(value)) {
                return true
            }
            if (!Alpaca.isEmpty(this.schema.multipleOf)) {
                if (value && this.schema.multipleOf !== 0) {
                    return false;
                }
            }
            return true;
        },
    }))
});