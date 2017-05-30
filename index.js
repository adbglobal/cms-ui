define(function(require) {

    // page: "sample-products-list"
    //require("./gadgets/sample-products-list/sample-products-list.js");

    // dashlet: "sample-random-product-dashlet"
    //require("./gadgets/sample-random-product-dashlet/sample-random-product-dashlet.js");

    // action: "create-sample-space"
    //require("./actions/sample/create-sample-space.js");

    // sample form fields
    require("./fields/layout-object.js");
    require("./fields/content-typeahead.js");
    require("./fields/command-field.js");
    require("./fields/node-selector-field.js");
    require("./fields/slave-array.js");
    require("./fields/lodash.js")
    require("./fields/adb-summernote.js")

    // sample override to document-properties
    //require("./gadgets/sample-product-document-properties/sample-product-document-properties.js");

    // global CSS overrides
    //require("css!./styles/sample.css");

});