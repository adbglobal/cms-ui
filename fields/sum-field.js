define(function (require/*, exports, module*/) {

    const UI = require("ui");
    const Alpaca = require("alpaca");
    // const $ = require("jquery");

    return UI.registerField("sum-field", Alpaca.Fields.NumberField.extend({
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
                return context.parent.children.find(field => field.propertyId === name).getValue() || 0
            }
            return this.getDependencyValue(name, context.parent);
        }/*,
        getFieldValue: function (name, context) {
            context = context || this;
            if (context.parent) {
                return this.getFieldValue(name, context.parent)
            }
            const instances = context.allFieldInstances();
            for (const key in instances) {
                if (instances.hasOwnProperty(key)) {
                    const field = instances[key];
                    console.log(field.propertyId);
                    if (field.propertyId === name) {
                        return field.getValue()
                    }
                }
            }
        },
        findFieldValue: function (name, context) {
            context = context || this;
            if (context.propertyId === name){
                return context.getValue()
            }
            if (!context.children) {
                return
            }
            for (const child of context.children) {
                const value = this.findFieldValue(name, child);
                if (value) {
                    return Number(value)
                }
            }
        }*/
    }))
});