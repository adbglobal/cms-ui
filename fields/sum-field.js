define(function (require/*, exports, module*/) {

    const UI = require("ui");
    const Alpaca = require("alpaca");
    // const $ = require("jquery");

    return UI.registerField("sum", Alpaca.Fields.NumberField.extend({
        getFieldType: function () {
            return "sum";
        },
        setValue: function (value) {
            value = this.getSum(value);
            this.base(value);
        },
        postRender: function (control) {
            Alpaca.Fields.NumberField.prototype.postRender.call(this, control);
            this.getDependencyFields().forEach(field => {
                field.on('change', value => this.setValue())
            });
        },
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
        getDependencyField: function (name, context) {
            context = context || this;
            if (!context.parent) {
                return null;
            }
            if (context.parent.options.fields[name]) {
                return context.parent.children.find(field => field.propertyId === name);
            }
            return null;
        },
        getSum: function (value) {
            value = value || 0;
            this.getDependencyFields().forEach(field => {
                value += field.getValue() || 0;
            });
            return value;
        }
    }))
});