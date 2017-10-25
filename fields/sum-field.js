define(function (require/*, exports, module*/) {

    const UI = require("ui");
    const Alpaca = require("alpaca");
    // const $ = require("jquery");

    return UI.registerField("sum-field", Alpaca.Fields.NumberField.extend({
        dependencyFields: [],
        getFieldType: function () {
            return "sum-field";
        },
        setValue: function (value) {
            value = value || 0;
            const dependencies = this.options.dependences || [];
            dependencies.forEach(name => {
                value += this.getDependencyValue(name);
            });
            this.base(value);
        },
        getDependencyValue: function (name, context) {
            context = context || this;
            if (!context.parent) {
                return 0;
            }
            if (context.parent.options.fields[name]) {
                const field = context.parent.children.find(field => field.propertyId === name);
                if (field) {
                    this.dependencyFields.push(field);
                }
                return field.getValue() || 0
            }
            return this.getDependencyValue(name, context.parent);
        },
        postRender: function (control) {
            Alpaca.Fields.NumberField.prototype.postRender.call(this, control);
            this.dependencyFields.forEach(field => {
                field.on('change', value => this.setValue())
            });
        }
    }))
});