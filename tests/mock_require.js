var require = function(id) {
    switch (id) {
        case 'ui':
            return {
                registerField: Alpaca.registerFieldClass
            }
        case 'alpaca':
            return Alpaca
    }
}

var define = function(f) {
    f(require)
}