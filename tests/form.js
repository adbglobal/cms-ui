define(["jquery", "gitana", "alpaca", "bootstrap", "cms-ui"], function($) {

    var options = {
        "title": "Recipe with variants",
        "engineId": "alpaca1",
        "definitions": {
            "stepOptions": {
                "type": "layout-object",
                "collapsible": true,
                "label": "Step",
                "labelClass": "accordion-toggle",
                "layout": "layout-1-1",
                "fields": {
                    "title": { "column": "left" },
                    "connectedInstructions": { "type": "adb-summernote", "column": "right" },
                    "applianceCommand": {
                        "toolbarSticky": true,
                        "items": { "type": "appliance-command", "dependentField": "/appliances" },
                        "column": "left"
                    },
                    "description": { "type": "adb-summernote", "column": "left" },
                    "instructions": { "type": "adb-summernote", "column": "right" },
                    "image": { "column": "right", "type": "content-typeahead", "uploadPath": "/content/image", "maxFileSize": 25000000, "maxNumberOfFiles": 3, "fileTypes": "(\\.|\\/)(mov|jpe?g|png)$" },
                    "accessories": { "type": "node-selector", "column": "right" }
                }
            },
            "recipeYield": { "type": "select" },
            "recipeTime": { "type": "layout-object", "layout": "layout-1-1-1", "fields": { "prepTime": { "column": "left" }, "cookTime": { "column": "mid" }, "totalTime": { "column": "right", "readonly": true } } },
            "recipeIngredient": { "type": "slave-array", "actionbarStyle": "right", "dependentField": "/recipeIngredient", "dependentChilds": ["unit", "ingredient"], "toolbarSticky": true, "items": { "type": "layout-object", "layout": "layout-1-1-2", "fields": { "quantity": { "column": "left" }, "unit": { "type": "node-selector", "multiple": false, "column": "mid", "readonly": true }, "ingredient": { "type": "content-typeahead", "size": "40", "column": "right", "readonly": true } } } },
            "recipeInstructions": { "type": "slave-array", "toolbarSticky": true, "dependentField": "/recipeInstructions", "dependentChilds": ["title", "connectedInstructions", "description", "image", "accessories", "applianceCommand"], "items": { "type": "layout-object", "collapsible": true, "label": "Step", "labelClass": "accordion-toggle", "layout": "layout-1-1", "fields": { "title": { "column": "left", "readonly": true }, "connectedInstructions": { "type": "textarea", "rows": 4, "column": "right", "readonly": true }, "applianceCommand": { "toolbarSticky": true, "type": "slave-array", "dependentChilds": [], "items": { "type": "appliance-command", "isSlave": true, "dependentField": "/appliances" }, "column": "left" }, "description": { "type": "hidden" }, "instructions": { "type": "adb-summernote", "column": "right" }, "image": { "column": "right", "type": "content-typeahead", "hidden": true, "uploadPath": "/content/image", "maxFileSize": 25000000, "maxNumberOfFiles": 3, "fileTypes": "(\\.|\\/)(mov|jpe?g|png)$" }, "accessories": { "type": "node-selector", "column": "right", "hidden": true } } } }
        },
        "fields": {
            "description": { "type": "adb-summernote" },
            "brand": { "type": "node-selector" },
            "suitableForDiet": { "type": "node-selector" },
            "recipeCategory": { "type": "node-selector" },
            "recipeCuisine": { "type": "node-selector" },
            "recipeYield": { "type": "select", "removeDefaultNone": true },
            "complexity": { "type": "node-selector" },
            "aggregateRating": { "readonly": true },
            "appliances": { "type": "node-selector" },
            "applianceCategory": { "type": "node-selector" },
            "recipeTime": { "type": "layout-object", "layout": "layout-1-1-1", "fields": { "prepTime": { "column": "left" }, "cookTime": { "column": "mid" }, "totalTime": { "column": "right", "readonly": true } } },
            "image": { "type": "content-typeahead" },
            "video": { "type": "related-content", "uploadPath": "/content/video", "maxFileSize": 250000000, "maxNumberOfFiles": 3, "fileTypes": "(\\.|\\/)(mov|mpe?g|wmv|mp4)$" },
            "recipeIngredient": { "type": "array", "actionbarStyle": "right", "toolbarSticky": true, "fields": { "item": { "type": "layout-object", "layout": "layout-1-1-2", "fields": { "quantity": { "column": "left" }, "unit": { "type": "node-selector", "column": "mid" }, "ingredient": { "type": "content-typeahead", "size": "40", "column": "right" } } } } },
            "recipeInstructions": { "type": "array", "toolbarSticky": true, "actionbarStyle": "top", "toolbar": { "actions": [{ "action": "add", "label": "Add Steps" }] }, "fields": { "item": { "type": "layout-object", "collapsible": true, "label": "Step", "labelClass": "accordion-toggle", "layout": "layout-1-1", "fields": { "title": { "column": "left" }, "connectedInstructions": { "type": "adb-summernote", "column": "right" }, "applianceCommand": { "toolbarSticky": true, "items": { "type": "appliance-command", "dependentField": "/appliances" }, "column": "left" }, "description": { "type": "adb-summernote", "column": "left" }, "instructions": { "type": "adb-summernote", "column": "right" }, "image": { "column": "right", "type": "content-typeahead", "uploadPath": "/content/image", "maxFileSize": 25000000, "maxNumberOfFiles": 3, "fileTypes": "(\\.|\\/)(mov|jpe?g|png)$" }, "accessories": { "type": "node-selector", "column": "right" } } } } },
            "accessories": { "type": "node-selector" },
            "variant1": { "fields": { "recipeYield": { "type": "select" }, "recipeTime": { "$ref": "#/definitions/recipeTime" }, "recipeIngredient": { "$ref": "#/definitions/recipeIngredient" }, "recipeInstructions": { "$ref": "#/definitions/recipeInstructions" } } },
            "variant2": { "fields": { "recipeYield": { "type": "select" }, "recipeTime": { "$ref": "#/definitions/recipeTime" }, "recipeIngredient": { "$ref": "#/definitions/recipeIngredient" }, "recipeInstructions": { "$ref": "#/definitions/recipeInstructions" } } }
        },
        "view": {
            "parent": "bootstrap-edit",
            "layout": { "template": "<div><div class='row'><div class='col-md-12' id='top'></div></div><div class='row'><div class='col-md-4' id='t1'></div><div class='col-md-4' id='t2'></div><div class='col-md-4' id='t3'></div></div><div class='row'><div class='col-md-6' id='left'></div><div class='col-md-6' id='right'></div></div><div class='row'><div class='col-md-12' id='bottom'></div></div></div>", "bindings": { "title": "top", "description": "top", "method": "left", "image": "left", "relatedRecipes": "right", "video": "right", "suitableForDiet": "left", "recipeCategory": "left", "recipeCuisine": "left", "complexity": "left", "accessories": "left", "lowCalories": "left", "vegetarian": "left", "aggregateRating": "right", "brand": "left", "recipeTime": "top", "recipeYield": "t1", "recipeIngredient": "bottom", "appliances": "left", "applianceCategory": "right", "recipeInstructions": "bottom", "variant1": "top", "variant2": "top" } },
            "wizard": {
                "hideSubmitButton": true,
                "markAllStepsVisited": true,
                "title": "Recipe",
                "description": "Please fill data in",
                "bindings": {
                    "title": 1,
                    "description": 1,
                    "method": 1,
                    "image": 1,
                    "relatedRecipes": 1,
                    "video": 1,
                    "suitableForDiet": 2,
                    "recipeCategory": 2,
                    "recipeCuisine": 2,
                    "complexity": 2,
                    "accessories": 2,
                    "lowCalories": 2,
                    "vegetarian": 2,
                    "aggregateRating": 2,
                    "brand": 2,
                    "recipeTime": 3,
                    "recipeYield": 3,
                    "recipeIngredient": 3,
                    "appliances": 4,
                    "applianceCategory": 4,
                    "recipeInstructions": 4,
                    "variant1": 5,
                    "variant2": 6
                },
                "steps": [{
                    "title": "Getting Started",
                    "description": "Basic Information"
                }, {
                    "title": "Details",
                    "description": "Additional Information"
                }, {
                    "title": "Ingredients",
                    "description": "Recipe Ingredients"
                }, {
                    "title": "Steps",
                    "description": "Recipe Steps"
                }, {
                    "title": "Variant 1",
                    "description": "Recipe Variant"
                }, {
                    "title": "Variant 2",
                    "description": "Recipe Variant"
                }]
            }
        },
        "form": {
            "attributes": {
                "method": "post",
                "action": "/repositories/3b153ef293f8589d46f4/branches/dc9c8b4ce9a00f72c3bd/nodes"
            },
            "toggleSubmitValidState": false
        }
    }
    $("#form").alpaca({
        "connector": {
            "id": "cloudcms",
            "config": CLOUDCMS_CONFIG
        },
        "schemaSource": "ioCentro:multiRecipe",
        "dataSource": "552afbb28e66728a4f22",
        //"optionsSource": "MultiRecipe",
        "options": options,
        "view": "bootstrap-edit"
    });
})