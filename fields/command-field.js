define(function (require/*, exports, module*/) {

    const UI = require("ui");
    const Alpaca = require("alpaca");
    const _ = require('./lodash.js');

    Alpaca.Extend(Alpaca, {
        rules: [
            [_.isNull, () => ({type: 'null'})],
            [_.isNumber, (field, key) => ({type: 'number', format: "independent-slave-field"})],
            [_.isBoolean, () => ({type: 'boolean'})],
            [_.isString, (field, key) => ({type: 'string', readonly: true})],
            [_.isRegExp, pattern => ({type: 'string', pattern})],

            // Empty array -> array of any items
            [(example) => _.isArray(example) && !example.length, () => ({type: 'array'})],

            [_.isArray, items => ({type: 'array', items: Alpaca.schemaByExample(items[0])})],
            [_.isPlainObject, (object, key) => ({
                type: 'object',
                properties: _.mapValues(object, Alpaca.schemaByExample),
            })],
        ],

        schemaByExample: function (example, key) {
            for (const [isMatch, makeSchema] of Alpaca.rules) {
                if (isMatch(example)) {
                    return makeSchema(example, key);
                }
            }

            throw new TypeError(example);
        },
    });


    Alpaca.registerDefaultFormatFieldMapping("text", "text");

    return UI.registerField("appliance-command", Alpaca.Fields.ObjectField.extend({

        getFieldType: function () {
            return "appliance-command";
        },

        updateSchemaOptions: function (nodeId, callback) {

            const self = this,
                cacheKey = "command-field:" + nodeId;

            let clist = self.connector.cache(cacheKey);

            //const t0 = performance.now();
            //console.log(self.name, ": ", cacheKey)

            function loadCacheAttachment(field, node, attachmentName) {
                const cachedDocument = self.connector.cache(nodeId + '/' + attachmentName);
                if (cachedDocument) {
                    console.log("manual 1");
                    Object.assign(field, cachedDocument)
                } else {
                    console.log("manual 2");
                    node.attachment(attachmentName).download(function (data) {
                        const parsedData = JSON.parse(data);
                        self.connector.cache(nodeId + '/' + attachmentName, parsedData);
                        Object.assign(field, parsedData)
                    })
                }
                //console.log("update " + attachmentName + ' ' + self.name)
            }

            function makeSlaveSchema(schema) {
                if (schema.type === "object") {
                    console.log("manual 3");
                    const newSchema = {};
                    Object.assign(newSchema, schema);
                    newSchema.properties = _.mapValues(schema.properties, makeSlaveSchema);
                    return newSchema
                } else {
                    console.log("manual 4");
                    const newSchema = {};
                    Object.assign(newSchema, schema);
                    if (!schema.isVariant) {
                        console.log("manual 5");
                        newSchema["readonly"] = true;
                        newSchema["format"] = "text";
                    }
                    return newSchema
                }
            }

            function makeSlaveOptions(schema) {
                if (!Alpaca.isUndefined(schema.fields)) {
                    console.log("manual 6");
                    const newSchema = {};
                    Object.assign(newSchema, schema);
                    newSchema.fields = _.mapValues(schema.fields, makeSlaveOptions);
                    return newSchema
                } else {
                    console.log("manual 7");
                    const newSchema = {};
                    Object.assign(newSchema, schema);
                    if (schema.type === "select") {
                        console.log("manual 8");
                        newSchema.type = "text"
                    }
                    return newSchema
                }
            }

            function loadCacheAttachments(node) {
                //const t0 = performance.now();
                if (self.options.isSlave) {
                    console.log("manual 9");
                    // if (!node.isSlaveLoad) {
                    //     node.isSlaveLoad = true;
                    // console.log('Loading Slave schema', this.name);
                    const loadMasterSchema = function () {
                            const masterSchema = {};
                            loadCacheAttachment(masterSchema, node, 'schema');
                            Object.assign(self.schema, makeSlaveSchema(masterSchema))
                        },
                        loadMasterOptions = function () {
                            const masterOptions = {};
                            loadCacheAttachment(masterOptions, node, 'options');
                            Object.assign(self.options, makeSlaveOptions(masterOptions))
                        };
                    Alpaca.parallel([loadMasterSchema, loadMasterOptions], function () {
                        //const t1 = performance.now();
                        //console.log('Took', (t1 - t0).toFixed(4), 'milliseconds for loadCacheAttachments:', self.path);
                    })
                    // }
                } else {
                    console.log("manual 10");
                    // if (!node.isMasterLoad) {
                    //     node.isMasterLoad = true;
                    // console.log('Loading Master schema', this.name);
                    loadCacheAttachment(self.schema, node, 'schema');
                    loadCacheAttachment(self.options, node, 'options');
                    //const t1 = performance.now();
                    //console.log('Took', (t1 - t0).toFixed(4), 'milliseconds for loadCacheAttachments:', self.path);
                    // }
                }
            }

            function cacheHandlers() {
                const callbacks = $.Callbacks("once"),
                    addFn = function (func) {
                        const context = this,
                            args = arguments,
                            cb = function () {
                                func.apply(context, args);
                            };
                        callbacks.add(cb)
                    },
                    fireFn = function () {
                        callbacks.fire()
                    };
                return {add: addFn, fire: fireFn}
            }

            function loadCachedNode() {
                //console.log(self.name, ": fired")
                loadCacheAttachments(clist.node);
                if (callback){
                    console.log("manual 11");
                    callback();
                }
            }

            if (clist) {
                console.log("manual 12");
                if (clist.node) {
                    console.log("manual 13");
                    //console.log("found")
                    loadCachedNode()
                } else {
                    console.log("manual 14");
                    //console.log("callback added")
                    clist.add(loadCachedNode)
                }
            } else {
                console.log("manual 15");
                //console.log("not found")
                clist = cacheHandlers();
                clist.add(loadCachedNode);
                self.connector.cache(cacheKey, clist);
                self.connector.branch.queryOne({"_doc": nodeId}).then(function () {
                    clist.node = this;
                    loadCacheAttachments(this);
                    callback && callback();
                }).then(function () {
                    console.log("manual 16");
                    //const t1 = performance.now();
                    //console.log('Took', (t1 - t0).toFixed(4), 'milliseconds to load node:', self.path);
                    clist.fire()
                })
            }
        },

        setupField: function (callback) {
            const self = this;

            // console.log("Setup field", self.name);
            function refresh() {
                if (!self.initializing) {
                    console.log("manual 17");
                    if (self.top && self.top() && self.top().initializing) {
                        console.log("manual 18");
                        // if we're rendering under a top most control that isn't finished initializing, then don't refresh
                    } else {
                        console.log("manual 19");
                        // const t0 = performance.now();
                        // console.log("refreshing ", self.path)
                        self.refresh(function () {
                            // const t1 = performance.now();
                            // console.log('Took', (t1 - t0).toFixed(4), 'milliseconds to refresh:', self.path);
                        });
                    }
                }
            }

            if (self.options.dependentField) {
                console.log("manual 20");
                // find the field and register a callback
                self.top().on("ready", function () {
                    const dep = self.top().getControlByPath(self.options.dependentField);
                    //console.log(self.name, dep)
                    if (dep) {
                        console.log("manual 21");
                        if (!self.subscribed) {
                            console.log("manual 22");
                            self.subscribed = true;
                            self.subscribe(dep, function (value) {
                                if (value) {
                                    console.log("manual 23");
                                    const id = Alpaca.isArray(value)? self.getIdOfField(value[0]): self.getIdOfField(value);
                                    self.updateSchemaOptions(id, refresh)
                                }
                            });
                        }
                        if (dep.data) {
                            console.log("manual 24");
                            const id = Alpaca.isArray(dep.data)? self.getIdOfField(dep.data[0]): self.getIdOfField(dep.data);
                            self.updateSchemaOptions(id, refresh)
                        }
                    }
                });
                const dep = self.top().getControlByPath(self.options.dependentField);
                if (dep && dep.data) {
                    console.log("manual 25");
                    this.base(function () {
                        if (!self.subscribed) {
                            console.log("manual 26");
                            self.subscribed = true;
                            self.subscribe(dep, function (value) {
                                if (value) {
                                    console.log("manual 27");
                                    const id = Alpaca.isArray(value) ? self.getIdOfField(value[0]) : self.getIdOfField(value);
                                    self.updateSchemaOptions(id, refresh)
                                }
                            });
                        }
                        const id = Alpaca.isArray(dep.data) ? self.getIdOfField(dep.data[0]) : self.getIdOfField(dep.data);
                        self.updateSchemaOptions(id, callback)
                    });
                } else {
                    console.log("manual 28");
                    this.base(callback)
                }
            } else {
                console.log("manual 29");
                this.base(callback)
            }
        },

        setValue: function (value) {
            if (!Alpaca.isEmpty(value)) {
                console.log("manual 30");
                this.checkApplianceCommand(value);
            }
            this.base(value)
        },

        checkApplianceCommand: function (value) {
            if (value.hasOwnProperty('deviceCommandCode') && this.data.hasOwnProperty('deviceCommandCode') && this.schema) {
                console.log("manual 31");
                this.checkSchema(value, this.data, this.schema);
            }
        },

        getIdOfField: function(valueObj){
            var ret = null;

            if(valueObj){
                console.log("manual 32");
                ret = valueObj.id || valueObj.value;
            }

            return ret;
        },

        checkSchema: function (src, data, schema) {
            if (schema && schema.hasOwnProperty('properties')) {
                console.log("manual 33");
                for (const key in src) {
                    if (src.hasOwnProperty(key) && data.hasOwnProperty(key)) {
                        console.log("manual 34");
                        const properties = schema.properties[key];
                        if (typeof src[key] === 'object') {
                            console.log("manual 35");
                            this.checkSchema(src[key], data[key], properties);
                        } else if (data[key] && src[key] !== data[key] && properties.isVariant) {
                            console.log("manual 36");
                            src[key] = data[key];
                        }
                    }
                }
            }
        }
    }));

});