define(function(require, exports, module) {

    var UI = require("ui");
    var Alpaca = require("alpaca");

    return UI.registerField("slave-array", Alpaca.Fields.ArrayField.extend({

        setup: function() {
            var self = this;
            this.base();
            this.actionbar = {};
            this.toolbar = {};
            this.on("ready", function() {
                self.fireCallback("arrayToolbar", true);
                self.fireCallback("arrayActionbars", true);
            })
            if (self.options.dependentField) {
                function debounce(func, wait, immediate) {
                    var timeout;
                    return function() {
                        var context = this,
                            args = arguments;
                        var later = function() {
                            timeout = null;
                            if (!immediate) {
                                //console.log("debounce called timeout")
                                func.apply(context, args);
                            }
                        };
                        var callNow = immediate && !timeout;
                        clearTimeout(timeout);
                        timeout = setTimeout(later, wait);
                        if (callNow) {
                            //console.log("debounce called direct")
                            func.apply(context, args);
                        } else {
                            //console.log("debounce skipped")
                        }
                    };
                };

                var debouceUpdateField = debounce(function() {
                    var dep = self.top().getControlByPath(self.options.dependentField);
                    var dependentData = dep.getValue();
                    var myData = self.getValue()
                    if (!Alpaca.compareObject(dependentData, myData)) {
                        for (var i = 0; i < dependentData.length; i++) {
                            if (myData[i])
                                for (var key of Object.keys(myData[i])) {
                                    if ((self.options.dependentChilds.indexOf(key) == -1) &&
                                        !Alpaca.isEmpty(myData[i][key])) {
                                        dependentData[i][key] = myData[i][key]
                                    }
                                }
                        }
                        self.setValue(dependentData);
                    }
                }, 300, false);

                self.top().on("ready", function(e) {
                    var dep = self.top().getControlByPath(self.options.dependentField);
                    if (dep) {
                        dep.getFieldEl().bind("fieldupdate", debouceUpdateField)
                    }
                });
            }
        },

        /**
         * Workhorse method for createItem.
         *
         * @param index
         * @param itemSchema
         * @param itemOptions
         * @param itemData
         * @param postRenderCallback
         * @return {*}
         * @private
         */
        createItem: function(index, itemSchema, itemOptions, itemData, postRenderCallback)
        {
            var self = this;

            if (self._validateEqualMaxItems())
            {
                var formEl = $("<div></div>");
                formEl.alpaca({
                    "data" : itemData,
                    "options": itemOptions,
                    "schema" : itemSchema,
                    "view" : this.view.id ? this.view.id : this.view,
                    "connector": this.connector,
                    "error": function(err)
                    {
                        self.destroy();

                        self.errorCallback.call(self, err);
                    },
                    "notTopLevel":true,
                    "render": function(fieldControl, cb) {
                        // render
                        fieldControl.parent = self;
                        // setup item path
                        fieldControl.path = self.path + "[" + index + "]";
                        //fieldControl.nameCalculated = true;
                        fieldControl.render(null, function() {
                            if (cb) {
                                cb();
                            }
                        });
                    },
                    "postRender": function(control)
                    {
                        // alpaca finished

                        // render the outer container
                        var containerItemEl = Alpaca.tmpl(self.containerItemTemplateDescriptor, {
                            "id": self.getId(),
                            "name": control.name,
                            "parentFieldId": self.getId(),
                            "actionbarStyle": self.options.actionbarStyle,
							"toolbarLocation": self.options.toolbarLocation,
                            "view": self.view,
                            "data": itemData
                        });

                        // find the insertion point
                        var insertionPointEl = $(containerItemEl).find("." + Alpaca.MARKER_CLASS_CONTAINER_FIELD_ITEM_FIELD);
                        if (insertionPointEl.length === 0)
                        {
                            if ($(containerItemEl).hasClass(Alpaca.MARKER_CLASS_CONTAINER_FIELD_ITEM_FIELD)) {
                                insertionPointEl = $(containerItemEl);
                            }
                        }
                        if (insertionPointEl.length === 0)
                        {
                            self.errorCallback.call(self, {
                                "message": "Cannot find insertion point for field: " + self.getId()
                            });
                            return;
                        }

                        // copy into place
                        $(insertionPointEl).before(control.getFieldEl());
                        $(insertionPointEl).remove();

                        control.containerItemEl = containerItemEl;

                        // TODO: verify, as per: https://github.com/emircal/alpaca/commit/4061c33787bd7a2b86fb613317374d365d9acc92
                        // Reset hideInitValidationError after render
                        Alpaca.fieldApplyFieldAndChildren(control, function(_control) {
                            _control.hideInitValidationError = false;
                        });

                        // PR: https://github.com/gitana/alpaca/pull/124
                        if (Alpaca.isFunction(self.options.items.postRender))
                        {
                            self.options.items.postRender.call(control, insertionPointEl);
                        }

                        if (postRenderCallback)
                        {
                            postRenderCallback(control);
                        }
                    }
                });
            }
        },

        /**
         * This method gets invoked after items are dynamically added, removed or moved around in the child chain.
         * It adjusts classes on child DOM elements to make sure they're correct.
         */
        updatePathAndName: function()
        {
            var self = this;

            var updateChildrenPathAndName = function(parent)
            {
                if (parent.children)
                {
                    $.each(parent.children, function(i, v) {

                        if (parent.prePath && Alpaca.startsWith(v.path, parent.prePath))
                        {
                            v.prePath = v.path;
                            v.path = v.path.replace(parent.prePath, parent.path);
                        }

                        // re-calculate name
                        if (parent.preName && Alpaca.startsWith(v.name, parent.preName))
                        {
                            v.preName = v.name;
                            v.name = v.name.replace(parent.preName, parent.name);
                            if (v.field)
                            {
                                $(v.field).attr("name", v.name);
                            }
                        }

                        updateChildrenPathAndName(v);
                    });
                }
            };

            if (this.children && this.children.length > 0)
            {
                $.each(this.children, function(i, v) {

                    var idx = v.path.lastIndexOf('/');
                    var lastSegment = v.path.substring(idx+1);
                    var lastIndex = -1;
                    if (lastSegment.indexOf("[") > 0 && lastSegment.indexOf("]") > 0)
                    {
                        lastIndex = parseInt(lastSegment.substring(lastSegment.indexOf("[") + 1, lastSegment.indexOf("]")));
                    }

                    if (lastIndex !== i)
                    {
                        v.prePath = v.path;
                        v.path = v.path.substring(0, idx) + "/" + lastSegment.substring(0, lastSegment.indexOf("[")) + "[" + i + "]";
                    }

                    // re-calculate name
                    if (v.nameCalculated)
                    {
                        v.preName = v.name;

                        if (v.parent && v.parent.name && v.path)
                        {
                            v.name = v.parent.name + "_" + i;
                        }
                        else
                        {
                            if (v.path)
                            {
                                v.name = v.path.replace(/\//g, "").replace(/\[/g, "_").replace(/\]/g, "");
                            }
                        }

                        if (this.parent.options.rubyrails )
                        {
                            $(v.field).attr("name", v.parent.name);
                        }
                        else
                        {
                            $(v.field).attr("name", v.name);
                        }

                    }

                    if (!v.prePath)
                    {
                        v.prePath = v.path;
                    }

                    updateChildrenPathAndName(v);
                });
            }
        },

        setValue: function(value) {
            //console.log("update array value " + this.name + ' value ' + JSON.stringify(value));
            this.base(value);
        }

    }))
});