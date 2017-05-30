define(function(require, exports, module) {

    var UI = require("ui");
    var Alpaca = require("alpaca");
    var _ = require('./lodash.js');

    Alpaca.Extend(Alpaca, {
        rules: [
            [_.isNull, () => ({ type: 'null' })],
            [_.isNumber, (field, key) => ({ type: 'number', format: "independent-slave-field" })],
            [_.isBoolean, () => ({ type: 'boolean' })],
            [_.isString, (field, key) => ({ type: 'string', readonly: true })],
            [_.isRegExp, pattern => ({ type: 'string', pattern })],

            // Empty array -> array of any items
            [(example) => _.isArray(example) && !example.length, () => ({ type: 'array' })],

            [_.isArray, items => ({ type: 'array', items: Alpaca.schemaByExample(items[0]) })],
            [_.isPlainObject, (object, key) => ({
                type: 'object',
                properties: _.mapValues(object, Alpaca.schemaByExample),
            })],
        ],

        schemaByExample: function(example, key) {
            for (const [isMatch, makeSchema] of Alpaca.rules) {
                if (isMatch(example)) {
                    var schema = makeSchema(example, key);
                    return schema
                }
            }

            throw new TypeError(example);
        },
    })

    Alpaca.registerDefaultFormatFieldMapping("text", "text");

    return UI.registerField("appliance-command", Alpaca.Fields.ObjectField.extend({

        getFieldType: function() {
            return "appliance-command";
        },

        updateSchemaOptions: function(nodeId, callback) {
            function loadCacheAttachment(field, node, attachmentName) {
                var cachedDocument = null;
                var cachedDocument = self.connector.cache(nodeId + '/' + attachmentName);
                if (cachedDocument) {
                    Object.assign(field, cachedDocument)
                } else {
                    node.attachment(attachmentName).download(function(data) {
                        var parsedData = JSON.parse(data);
                        self.connector.cache(nodeId + '/' + attachmentName, parsedData);
                        Object.assign(field, parsedData)
                    })
                }
                //console.log("update " + attachmentName + ' ' + self.name)
            }

            function makeSlaveSchema(schema) {
                if (schema.type == "object") {
                    var newSchema = {};
                    Object.assign(newSchema, schema)
                    newSchema.properties = _.mapValues(schema.properties, makeSlaveSchema);
                    return newSchema
                } else {
                    var newSchema = {}
                    Object.assign(newSchema, schema)
                    if (!schema.isVariant) {
                        newSchema["readonly"] = true;
                        newSchema["format"] = "text";
                    }
                    return newSchema
                }
            }

            function makeSlaveOptions(schema) {
                if (!Alpaca.isUndefined(schema.fields)) {
                    var newSchema = {};
                    Object.assign(newSchema, schema)
                    newSchema.fields = _.mapValues(schema.fields, makeSlaveOptions);
                    return newSchema
                } else {
                    var newSchema = {}
                    Object.assign(newSchema, schema)
                    if (schema.type == "select") {
                        newSchema.type = "text"
                    }
                    return newSchema
                }
            }

            function loadCacheAttachments(node) {
                if (self.options.isSlave) {
                    var masterSchema = {};
                    var masterOptions = {};
                    var f1 = function() {
                        loadCacheAttachment(masterSchema, node, 'schema');
                        Object.assign(self.schema, makeSlaveSchema(masterSchema))
                    }
                    var f2 = function() {
                        loadCacheAttachment(masterOptions, node, 'options');
                        Object.assign(self.options, makeSlaveOptions(masterOptions))
                    }
                    Alpaca.parallel([f1, f2], function() {})
                } else {
                    loadCacheAttachment(self.schema, node, 'schema');
                    loadCacheAttachment(self.options, node, 'options');
                }
            }

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

            function loadCachedNode() {
                //console.log(self.name, ": fired")
                loadCacheAttachments(clist.node)
                if (callback)
                    callback();
            }

            var self = this;
            var cacheKey = "command-field:" + nodeId;
            //console.log(self.name, ": ", cacheKey)
            clist = self.connector.cache(cacheKey);
            if (clist) {
                if (clist.node) {
                    //console.log("found")
                    loadCachedNode()
                } else {
                    //console.log("callback added")
                    clist.add(loadCachedNode)
                }
            } else {
                //console.log("not found")
                clist = cacheHandlers();
                clist.add(loadCachedNode);
                self.connector.cache(cacheKey, clist);
                self.connector.branch.queryOne({ "_doc": nodeId }).then(function() {
                    clist.node = this;
                    loadCacheAttachments(this)
                }).then(function() {
                    clist.fire()
                })
            }
        },

        setupField: function(callback) {
            var self = this;
            //console.log("setup field " + self.name)

            if (self.options.dependentField) {
                // find the field and register a callback
                self.top().on("ready", function(e) {
                    var dep = self.top().getControlByPath(self.options.dependentField);
                    //console.log(self.name, dep)
                    if (dep) {
                        if (!self.subscribed) {
                            self.subscribed = true;
                            self.subscribe(dep, function(value) {
                                if (value)
                                    self.updateSchemaOptions(value.id, function() {
                                        self.refresh();
                                    })
                            });
                        }
                        if (dep.data) {
                            self.updateSchemaOptions(dep.data.id, function() {
                                self.refresh();
                            })
                        }
                    }
                });
                var dep = self.top().getControlByPath(self.options.dependentField);
                if (dep && dep.data)
                    this.base(function() {
                        if (!self.subscribed) {
                            self.subscribed = true;
                            self.subscribe(dep, function(value) {
                                if (value)
                                    self.updateSchemaOptions(value.id, function() {
                                        self.refresh();
                                    })
                            });
                        }
                        self.updateSchemaOptions(dep.data.id, callback)
                    })
                else {
                    this.base(callback)
                }
            } else {
                this.base(callback)
            }
        },

        setValue: function(value) {
            this.base(value)
        }

    }));

});

define(function(require, exports, module) {
    var UI = require("ui");
    var Alpaca = require("alpaca");

    Alpaca.registerDefaultFormatFieldMapping("independent-slave-field", "independent-slave-field");

    return UI.registerField("independent-slave-field", Alpaca.Fields.NumberField.extend({
        setValue: function(value) {
            //console.log(this.name + ' ' + this.data + " : " + value)
            if (Alpaca.isEmpty(this.data))
                this.base(value)
            else
                this.base(this.data)
        }
    }));
});