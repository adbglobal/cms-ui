define(["alpaca"], function(Alpaca) {
    return {
        registerField: function(name, value) {
            Alpaca.registerFieldClass(name, value)
        }
    }
})