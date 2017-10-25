define(function (require/*, exports, module*/) {

    const UI = require("ui");
    const Alpaca = require("alpaca");
    // const $ = require("jquery");

    return UI.registerField("sum", Alpaca.Fields.NumberField.extend({

        /**
         * getFieldType
         * @override
         * @returns {string} - field type
         */
        getFieldType: function () {
            return "sum";
        },

        /**
         * setValue
         * @override
         * @param value - payload value
         *
         * Sum dependency field values and apply it to the field
         */
        setValue: function (value) {
            value = this.getSum();
            this.base(value);
        },

        /**
         * postRender
         * @override
         * @param control - alpaca callback function
         *
         * Call parent method and attach listener of each dependency field
         */
        postRender: function (control) {
            Alpaca.Fields.NumberField.prototype.postRender.call(this, control);
            this.getDependencyFields().forEach(field => {
                field.on('change', value => this.setValue())
            });
        },

        /**
         * getDependencyFields
         * @returns {Array}
         *
         * Return the list of alpaca field objects found defined in the schema
         */
        getDependencyFields: function () {
            const fields = [];
            const dependencies = this.options.dependences || [];
            dependencies.forEach(name => {
                const field = this.getDependencyField(name);
                if (field) {
                    fields.push(field);
                }
            });
            return fields;
        },

        /**
         * getDependencyField
         * @param name
         * @returns {null} | {object} - alpaca field
         *
         * Find and return the field object corresponding to the parameter name
         */
        getDependencyField: function (name) {
            const parentElement = this.parent;
            if (!parentElement) {
                return null
            }
            if (parentElement.options.fields[name]) {
                return parentElement.children.find(field => field.propertyId === name);
            }
            return null;
        },

        /**
         * getSum
         * @param value: optional
         * @returns {*|number}
         *
         * Sum all field values found if there is some or 0
         */
        getSum: function (value) {
            value = value || 0;
            this.getDependencyFields().forEach(field => {
                value += field.getValue() || 0;
            });
            return value;
        }
    }))
});