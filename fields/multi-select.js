define(function (require/*, exports, module*/) {

    const UI = require("ui");
    const Alpaca = require("alpaca");

    return UI.registerField("multi-select", Alpaca.Fields.SelectField.extend({

        getFieldType: function() {
            return "multi-select";
        },

        setup: function() {
            var self = this;
            this.base();
            if (this.options.readonly) {
                self.options.multiselect = null;
            }
        },

        dataStringToObject: function(text) {
            return {
                "id": text
            };
        },

        getValue: function() {
            var value;
            var scalarValue = this.control.val()

            if (Alpaca.isArray(scalarValue)) {
                value = scalarValue.map(x => this.selectOptions.find(y => y.value == x))
                return value ? value.map(x => x.picked) : null
            } else {
                value = this.selectOptions.find(x => x.value == scalarValue);
                return value ? value.picked : null
            }
        },

        setValue: function(val) {
            this.base(val)
        },

        convertToScalarValue: function(data) {
            if (Alpaca.isArray(data))
                return data.map(x => x.id)
            else
                return data ? data.id : null;
        },

        convertToDataValue: function(scalarValue, callback) {
            var value;
            if (Alpaca.isArray(scalarValue)) {
                value = scalarValue.map(x => this.selectOptions.find(y => y.value == x))
                callback(null, value ? value.map(x => x.picked) : null);
            } else {
                value = this.selectOptions.find(x => x.value == scalarValue);
                callback(null, value ? value.picked : null);
            }
        },

        loadCacheList: function(callback) {
            var self = this;
            var clist = null
            var cachekey = "node-selector:" + self.connector.branch.getUri() + self.schema._relator.nodeType

            function cacheHandlers() {
                var callbacks = $.Callbacks("once")
                var addFn = function(func) {
                    var context = this,
                        args = arguments;
                    var cb = function() {
                        func.apply(context, args);
                    };
                    callbacks.add(cb)
                }
                var fireFn = function() {
                    callbacks.fire()
                }
                return { add: addFn, fire: fireFn }
            }

            function loadCachedList() {
                //console.log(self.name, ": fired")
                self.selectOptions = clist.list.slice();
                if (callback)
                    callback();
            }

            clist = self.connector.cache(cachekey);
            //console.log(self.name, ": ", cachekey)
            if (clist) {
                if (clist.list) {
                    //console.log("found")
                    loadCachedList()
                } else {
                    //console.log("callback added")
                    clist.add(loadCachedList)
                }
            } else {
                //console.log("not found")
                clist = cacheHandlers();
                clist.add(loadCachedList);
                self.connector.cache(cachekey, clist);
                self.connector.branch.queryNodes({
                    _type: self.schema._relator.nodeType,
                    "_features.f:translation": { $exists: false }
                }, {
                    "sort": {
                        "title": 1
                    },
                    "limit": 50
                }).then(function() {
                    clist.list = [];
                    this.each(function() {
                        clist.list.push({
                            "value": this._doc,
                            "text": this.title,
                            "picked": {
                                "id": this._doc,
                                "ref": this.ref(this),
                                "title": this.title,
                                "qname": this.getQName(),
                                "typeQName": this.getTypeQName(),
                            }
                        });
                    })
                }).then(function() {
                    clist.fire()
                });
            }
        }/*,

        setupField: function(callback) {
            var self = this;
            this.base(function() {
                self.loadCacheList(callback)
            })
        }*/

    }))
});