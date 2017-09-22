define(["jquery", "gitana", "alpaca", "bootstrap", "cms-ui"], function ($) {

    /* Option Source */
    const options = {
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
                    "title": {
                        "column": "left"
                    },
                    "connectedInstructions": {
                        "type": "adb-summernote",
                        "column": "right"
                    },
                    "applianceCommand": {
                        "toolbarSticky": true,
                        "items": {
                            "type": "appliance-command",
                            "dependentField": "/appliances"
                        },
                        "column": "left"
                    },
                    "description": {
                        "type": "adb-summernote",
                        "column": "left"
                    },
                    "instructions": {
                        "type": "adb-summernote",
                        "column": "right"
                    },
                    "image": {
                        "column": "right",
                        "type": "content-typeahead",
                        "uploadPath": "/content/image",
                        "maxFileSize": 25000000,
                        "maxNumberOfFiles": 3,
                        "fileTypes": "(\\.|\\/)(mov|jpe?g|png)$"
                    },
                    "accessories": {
                        "type": "node-selector",
                        "column": "right"
                    }
                }
            },
            "recipeYield": {
                "type": "select"
            },
            "recipeTime": {
                "type": "layout-object",
                "layout": "layout-1-1-1",
                "fields": {
                    "prepTime": {
                        "column": "left"
                    },
                    "cookTime": {
                        "column": "mid"
                    },
                    "totalTime": {
                        "column": "right",
                        "readonly": true
                    }
                }
            },
            "recipeIngredient": {
                "type": "slave-array",
                "actionbarStyle": "right",
                "dependentField": "/recipeIngredient",
                "dependentChilds": [
                    "unit",
                    "ingredient"
                ],
                "toolbarSticky": true,
                "items": {
                    "type": "layout-object",
                    "layout": "layout-1-1-2",
                    "fields": {
                        "quantity": {
                            "column": "left"
                        },
                        "unit": {
                            "type": "node-selector",
                            "multiple": false,
                            "column": "mid",
                            "readonly": true
                        },
                        "ingredient": {
                            "type": "content-typeahead",
                            "size": "40",
                            "column": "right",
                            "readonly": true
                        }
                    }
                }
            },
            "recipeInstructions": {
                "type": "slave-array",
                "toolbarSticky": true,
                "dependentField": "/recipeInstructions",
                "dependentChilds": [
                    "title",
                    "connectedInstructions",
                    "description",
                    "image",
                    "accessories",
                    "applianceCommand"
                ],
                "items": {
                    "type": "layout-object",
                    "collapsible": true,
                    "label": "Step",
                    "labelClass": "accordion-toggle",
                    "layout": "layout-1-1",
                    "fields": {
                        "title": {
                            "column": "left",
                            "readonly": true
                        },
                        "connectedInstructions": {
                            "type": "textarea",
                            "rows": 4,
                            "column": "right",
                            "readonly": true
                        },
                        "applianceCommand": {
                            "toolbarSticky": true,
                            "type": "slave-array",
                            "dependentChilds": [],
                            "items": {
                                "type": "appliance-command",
                                "isSlave": true,
                                "dependentField": "/appliances"
                            },
                            "column": "left"
                        },
                        "description": {
                            "type": "hidden"
                        },
                        "instructions": {
                            "type": "adb-summernote",
                            "column": "right"
                        },
                        "image": {
                            "column": "right",
                            "type": "content-typeahead",
                            "hidden": true,
                            "uploadPath": "/content/image",
                            "maxFileSize": 25000000,
                            "maxNumberOfFiles": 3,
                            "fileTypes": "(\\.|\\/)(mov|jpe?g|png)$"
                        },
                        "accessories": {
                            "type": "node-selector",
                            "column": "right",
                            "hidden": true
                        }
                    }
                }
            }
        },
        "fields": {
            "description": {
                "type": "adb-summernote"
            },
            "brand": {
                "type": "node-selector"
            },
            "suitableForDiet": {
                "type": "node-selector"
            },
            "recipeCategory": {
                "type": "node-selector"
            },
            "mainCourseType": {
                "type": "node-selector"
            },
            "recipeCuisine": {
                "type": "node-selector"
            },
            "recipeYield": {
                "type": "select",
                "removeDefaultNone": true
            },
            "complexity": {
                "type": "node-selector"
            },
            "aggregateRating": {
                "readonly": true
            },
            "appliances": {
                "type": "node-selector"
            },
            "applianceCategory": {
                "type": "node-selector"
            },
            "recipeTime": {
                "type": "layout-object",
                "layout": "layout-1-1-1",
                "fields": {
                    "prepTime": {
                        "column": "left"
                    },
                    "cookTime": {
                        "column": "mid"
                    },
                    "totalTime": {
                        "column": "right",
                        "readonly": true
                    }
                }
            },
            "image": {
                "type": "content-typeahead"
            },
            "video": {
                "type": "related-content",
                "uploadPath": "/content/video",
                "maxFileSize": 250000000,
                "maxNumberOfFiles": 3,
                "fileTypes": "(\\.|\\/)(mov|mpe?g|wmv|mp4)$"
            },
            "recipeIngredient": {
                "type": "array",
                "actionbarStyle": "right",
                "toolbarSticky": true,
                "fields": {
                    "item": {
                        "type": "layout-object",
                        "layout": "layout-1-1-2",
                        "fields": {
                            "quantity": {
                                "column": "left"
                            },
                            "unit": {
                                "type": "node-selector",
                                "column": "mid",
                                "removeDefaultNone": true
                            },
                            "ingredient": {
                                "type": "content-typeahead",
                                "size": "40",
                                "column": "right"
                            }
                        }
                    }
                }
            },
            "recipeInstructions": {
                "type": "array",
                "toolbarSticky": true,
                "actionbarStyle": "top",
                "toolbar": {
                    "actions": [
                        {
                            "action": "add",
                            "label": "Add Steps"
                        }
                    ]
                },
                "fields": {
                    "item": {
                        "type": "layout-object",
                        "collapsible": true,
                        "label": "Step",
                        "labelClass": "accordion-toggle",
                        "layout": "layout-1-1",
                        "fields": {
                            "title": {
                                "column": "left"
                            },
                            "connectedInstructions": {
                                "type": "adb-summernote",
                                "column": "right"
                            },
                            "applianceCommand": {
                                "toolbarSticky": true,
                                "items": {
                                    "type": "appliance-command",
                                    "dependentField": "/appliances"
                                },
                                "column": "left"
                            },
                            "description": {
                                "type": "adb-summernote",
                                "column": "left"
                            },
                            "instructions": {
                                "type": "adb-summernote",
                                "column": "right"
                            },
                            "image": {
                                "column": "right",
                                "type": "content-typeahead",
                                "uploadPath": "/content/image",
                                "maxFileSize": 25000000,
                                "maxNumberOfFiles": 3,
                                "fileTypes": "(\\.|\\/)(mov|jpe?g|png)$"
                            },
                            "accessories": {
                                "type": "node-selector",
                                "column": "right"
                            }
                        }
                    }
                }
            },
            "accessories": {
                "type": "node-selector"
            },
            "variant1": {
                "fields": {
                    "recipeYield": {
                        "$ref": "#/definitions/recipeYield"
                    },
                    "recipeTime": {
                        "$ref": "#/definitions/recipeTime"
                    },
                    "recipeIngredient": {
                        "$ref": "#/definitions/recipeIngredient"
                    },
                    "recipeInstructions": {
                        "$ref": "#/definitions/recipeInstructions"
                    }
                }
            },
            "variant2": {
                "fields": {
                    "recipeYield": {
                        "$ref": "#/definitions/recipeYield"
                    },
                    "recipeTime": {
                        "$ref": "#/definitions/recipeTime"
                    },
                    "recipeIngredient": {
                        "$ref": "#/definitions/recipeIngredient"
                    },
                    "recipeInstructions": {
                        "$ref": "#/definitions/recipeInstructions"
                    }
                }
            }
        },
        "view": {
            "parent": "bootstrap-edit",
            "layout": {
                "template": "<div><div class='row'><div class='col-md-12' id='top'></div></div><div class='row'><div class='col-md-4' id='t1'></div><div class='col-md-4' id='t2'></div><div class='col-md-4' id='t3'></div></div><div class='row'><div class='col-md-6' id='left'></div><div class='col-md-6' id='right'></div></div><div class='row'><div class='col-md-12' id='bottom'></div></div></div>",
                "bindings": {
                    "title": "top",
                    "description": "top",
                    "method": "left",
                    "image": "left",
                    "relatedRecipes": "right",
                    "video": "right",
                    "suitableForDiet": "left",
                    "recipeCategory": "left",
                    "mainCourseType": "left",
                    "recipeCuisine": "left",
                    "complexity": "left",
                    "accessories": "left",
                    "lowCalories": "left",
                    "vegetarian": "left",
                    "aggregateRating": "right",
                    "brand": "left",
                    "recipeTime": "top",
                    "recipeYield": "t1",
                    "recipeIngredient": "bottom",
                    "appliances": "left",
                    "applianceCategory": "right",
                    "recipeInstructions": "bottom",
                    "variant1": "top",
                    "variant2": "top"
                }
            },
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
                    "mainCourseType": 2,
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
                "steps": [
                    {
                        "title": "Getting Started",
                        "description": "Basic Information"
                    },
                    {
                        "title": "Details",
                        "description": "Additional Information"
                    },
                    {
                        "title": "Ingredients",
                        "description": "Recipe Ingredients"
                    },
                    {
                        "title": "Steps",
                        "description": "Recipe Steps"
                    },
                    {
                        "title": "Variant 1",
                        "description": "Recipe Variant"
                    },
                    {
                        "title": "Variant 2",
                        "description": "Recipe Variant"
                    }
                ]
            }
        },
        "form": {
            "attributes": {
                "method": "post",
                "action": "/repositories/fbe6fb72e1ae809dea25/branches/b076748df473f08f9485/nodes"
            },
            "toggleSubmitValidState": false,
            "buttons": {
                "noop": {
                    "type": "button",
                    "value": "Do Nothing",
                    "styles": "btn btn-primary"
                },
                "validate": {
                    "title": "Validate and view JSON!",
                    "click": function () {
                        this.refreshValidationState(true);
                        if (this.isValid(true)) {
                            console.log(this.getValue());
                        }
                    }
                }
            }
        },
        "_form_key": "MultiRecipe"
    };

    /* Schema Source */
    const schema = {
        "definitions": {
            "recipeTime": {
                "type": "object",
                "title": "Time",
                "properties": {
                    "prepTime": {
                        "type": "number",
                        "title": "Preparation time"
                    },
                    "cookTime": {
                        "type": "number",
                        "title": "Cooking Time"
                    },
                    "totalTime": {
                        "type": "number",
                        "title": "Total Time"
                    }
                },
                "$ref_resolved": "#/definitions/recipeTime"
            },
            "recipeYield": {
                "type": "number",
                "title": "Number of servings",
                "enum": [
                    0,
                    2,
                    4,
                    6
                ],
                "$ref_resolved": "#/definitions/recipeYield"
            },
            "recipeIngredient": {
                "type": "array",
                "title": "Ingredients",
                "items": {
                    "type": "object",
                    "properties": {
                        "quantity": {
                            "type": "string",
                            "title": "Quantity"
                        },
                        "unit": {
                            "type": "object",
                            "title": "Unit",
                            "properties": {
                                "id": {
                                    "type": "string"
                                }
                            },
                            "_relator": {
                                "nodeType": "ioCentro:unit"
                            }
                        },
                        "ingredient": {
                            "title": "Ingredient",
                            "type": "object",
                            "_relator": {
                                "nodeType": "ioCentro:ingredient"
                            },
                            "properties": {
                                "id": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                },
                "$ref_resolved": "#/definitions/recipeIngredient"
            },
            "recipeInstructions": {
                "title": "Recipe Steps",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "title": "Title"
                        },
                        "description": {
                            "type": "string",
                            "title": "App message"
                        },
                        "connectedInstructions": {
                            "type": "string",
                            "title": "Instructions for connected appliance"
                        },
                        "instructions": {
                            "type": "string",
                            "title": "Instructions for non connected appliance"
                        },
                        "image": {
                            "type": "object",
                            "title": "Step picture",
                            "_relator": {
                                "nodeType": "ioCentro:image"
                            }
                        },
                        "accessories": {
                            "type": "array",
                            "title": "Accessories",
                            "items": {
                                "type": "object"
                            },
                            "_relator": {
                                "nodeType": "ioCentro:accessory"
                            }
                        },
                        "applianceCommand": {
                            "type": "array",
                            "title": "Appliance command",
                            "items": {
                                "type": "object"
                            }
                        }
                    }
                },
                "$ref_resolved": "#/definitions/recipeInstructions"
            },
            "recipeVariant": {
                "type": "object",
                "title": "Variant",
                "properties": {
                    "recipeYield": {
                        "$ref": "#/definitions/recipeYield"
                    },
                    "recipeTime": {
                        "$ref": "#/definitions/recipeTime"
                    },
                    "recipeIngredient": {
                        "$ref": "#/definitions/recipeIngredient"
                    },
                    "recipeInstructions": {
                        "$ref": "#/definitions/recipeInstructions"
                    }
                },
                "$ref_resolved": "#/definitions/recipeVariant"
            }
        },
        "properties": {
            "brand": {
                "title": "Brand",
                "type": "object",
                "_relator": {
                    "nodeType": "ioCentro:brand"
                }
            },
            "title": {
                "type": "string",
                "title": "Title"
            },
            "description": {
                "type": "string",
                "title": "Summary"
            },
            "relatedRecipes": {
                "type": "array",
                "title": "Related Recipes",
                "items": {
                    "type": "object"
                },
                "_relator": {
                    "nodeType": "ioCentro:recipe"
                }
            },
            "appliances": {
                "type": "array",
                "title": "Appliances",
                "items": {
                    "type": "object"
                },
                "_relator": {
                    "nodeType": "ioCentro:appliance"
                }
            },
            "suitableForDiet": {
                "type": "array",
                "title": "Dietary guidelines",
                "_relator": {
                    "nodeType": "ioCentro:dietaryGuidelines"
                }
            },
            "recipeCategory": {
                "type": "array",
                "title": "Category",
                "_relator": {
                    "nodeType": "ioCentro:recipeCategory"
                }
            },
            "mainCourseType": {
                "title": "Main Course",
                "type": "object",
                "_relator": {
                    "nodeType": "ioCentro:mainCourseType"
                }
            },
            "recipeCuisine": {
                "type": "array",
                "title": "Cuisines",
                "_relator": {
                    "nodeType": "ioCentro:recipeCuisine"
                }
            },
            "applianceCategory": {
                "title": "Appliance Category",
                "type": "object",
                "_relator": {
                    "nodeType": "ioCentro:applianceCategory"
                }
            },
            "complexity": {
                "title": "Complexity",
                "type": "object",
                "_relator": {
                    "nodeType": "ioCentro:complexity"
                }
            },
            "lowCalories": {
                "title": "Low Calories",
                "type": "boolean"
            },
            "vegetarian": {
                "title": "Vegetarian",
                "type": "boolean"
            },
            "accessories": {
                "type": "array",
                "title": "Accessories",
                "items": {
                    "type": "object"
                },
                "_relator": {
                    "nodeType": "ioCentro:accessory"
                }
            },
            "aggregateRating": {
                "type": "object",
                "title": "Rating",
                "properties": {
                    "ratingCount": {
                        "type": "number",
                        "title": "Total ratings"
                    },
                    "reviewCount": {
                        "type": "number",
                        "title": "Total reviews"
                    },
                    "ratingValue": {
                        "type": "number",
                        "title": "Average rating"
                    }
                }
            },
            "image": {
                "type": "object",
                "title": "Picture",
                "_relator": {
                    "nodeType": "ioCentro:image"
                }
            },
            "video": {
                "type": "array",
                "title": "Video",
                "_relator": {
                    "nodeType": "ioCentro:video"
                }
            },
            "method": {
                "title": "Method",
                "type": "object",
                "_relator": {
                    "nodeType": "ioCentro:method"
                }
            },
            "nutrition": {
                "$ref": "qname://ioCentro/nutrition"
            },
            "recipeTime": {
                "title": "Recipe time",
                "$ref": "#/definitions/recipeTime"
            },
            "recipeYield": {
                "$ref": "#/definitions/recipeYield"
            },
            "recipeIngredient": {
                "$ref": "#/definitions/recipeIngredient"
            },
            "recipeInstructions": {
                "$ref": "#/definitions/recipeInstructions"
            },
            "variant1": {
                "$ref": "#/definitions/recipeVariant"
            },
            "variant2": {
                "$ref": "#/definitions/recipeVariant"
            },
            "unit": {
                "type": "object",
                "_relator": {
                    "nodeType": "ioCentro:unit"
                }
            }
        },
        "title": "MultiRecipe",
        "description": "Recipe with variants",
        "mandatoryFeatures": {
            "f:multilingual": {
                "enabled": true
            }
        },
        "_parent": "n:node",
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "format": "layout-object"
    };

    /* Data Source */
    const dataWithCommands = {
        "brand": {
            "id": "79fb0ea320d561837567",
            "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/79fb0ea320d561837567",
            "title": "Whirlpool",
            "qname": "o:999705de5a64c15b1bb4",
            "typeQName": "ioCentro:brand"
        },
        "title": "Almond-and-honey pie",
        "description": "<p>The almond-and-honey PIE is a classic dessert, largely appreciated by everyone, especially when served with a little cream garnished with a drop of honey. You can eat it in the morning drenched in the tea or offer it as a snack.<br/></p>",
        "appliances": [
            {
                "id": "d614609f4e59fb853aba",
                "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/d614609f4e59fb853aba",
                "title": "MWO MWO Phoenix",
                "qname": "o:ae5ba0c8ec3b71591e98",
                "typeQName": "ioCentro:appliance"
            },
            {
                "id": "0722d89e0cff9b4783eb",
                "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/0722d89e0cff9b4783eb",
                "title": "NC MWO Maxi Chef Model 2",
                "qname": "o:3ef152d0ed2d1b1e2590",
                "typeQName": "ioCentro:appliance"
            },
            {
                "id": "50e7daba99e26f12649a",
                "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/50e7daba99e26f12649a",
                "title": "NC MWO Maxi Chef Model 3",
                "qname": "o:bde330326ce28bf7692a",
                "typeQName": "ioCentro:appliance"
            },
            {
                "id": "c6700c8e3f6d0dbe4192",
                "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/c6700c8e3f6d0dbe4192",
                "title": "NC MWO Maxi Chef Model 4",
                "qname": "o:c2a405ee8a9e9e144063",
                "typeQName": "ioCentro:appliance"
            },
            {
                "id": "918912ba5602ec5d1eda",
                "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/918912ba5602ec5d1eda",
                "title": "NC MWO Maxi Chef Model 5",
                "qname": "o:ba7462c28dd33953911e",
                "typeQName": "ioCentro:appliance"
            }
        ],
        "recipeCategory": [
            {
                "id": "9fe07eef1fb28544656c",
                "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/9fe07eef1fb28544656c",
                "title": "Dessert",
                "qname": "o:88005eea32e07ed27c00",
                "typeQName": "ioCentro:recipeCategory"
            }
        ],
        "recipeCuisine": [
            {
                "id": "4a5dd646a3c3d048ad7c",
                "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/4a5dd646a3c3d048ad7c",
                "title": "classic",
                "qname": "o:dc98703e16951d72ea2f",
                "typeQName": "ioCentro:recipeCuisine"
            }
        ],
        "complexity": {
            "id": "c1d23ae2227d89f86a97",
            "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/c1d23ae2227d89f86a97",
            "title": "Medium",
            "qname": "o:93e862f0f6092de6ac7c",
            "typeQName": "ioCentro:complexity"
        },
        "aggregateRating": {},
        "image": {
            "id": "6259d3b9f6ce825d8f75",
            "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/6259d3b9f6ce825d8f75",
            "title": "39.torta_mandorle _miele",
            "qname": "o:adf1a81e8da6fe7eda7f",
            "typeQName": "ioCentro:image"
        },
        "video": [],
        "nutrition": {},
        "recipeTime": {
            "prepTime": 40,
            "cookTime": 8
        },
        "recipeYield": 6,
        "recipeIngredient": [
            {
                "quantity": "220",
                "unit": {
                    "id": "5c64dce1c08348f95727",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                    "title": "gr",
                    "qname": "o:9fe269a4060c11042c2c",
                    "typeQName": "ioCentro:unit"
                },
                "ingredient": {
                    "id": "c108996787fb3a3380c1",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/c108996787fb3a3380c1",
                    "title": "flour",
                    "qname": "o:31573ef988c8a1ee91b1",
                    "typeQName": "ioCentro:ingredient"
                }
            },
            {
                "quantity": "70",
                "unit": {
                    "id": "5c64dce1c08348f95727",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                    "title": "gr",
                    "qname": "o:9fe269a4060c11042c2c",
                    "typeQName": "ioCentro:unit"
                },
                "ingredient": {
                    "id": "be541a1f3fba92aff9a2",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/be541a1f3fba92aff9a2",
                    "title": "sugar",
                    "qname": "o:a277418d85e78483ee56",
                    "typeQName": "ioCentro:ingredient"
                }
            },
            {
                "quantity": "50",
                "unit": {
                    "id": "5c64dce1c08348f95727",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                    "title": "gr",
                    "qname": "o:9fe269a4060c11042c2c",
                    "typeQName": "ioCentro:unit"
                },
                "ingredient": {
                    "id": "2f093e2131c7197272bd",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/2f093e2131c7197272bd",
                    "title": "butter",
                    "qname": "o:8be4643c35a346a58658",
                    "typeQName": "ioCentro:ingredient"
                }
            },
            {
                "quantity": "70",
                "unit": {
                    "id": "5c64dce1c08348f95727",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                    "title": "gr",
                    "qname": "o:9fe269a4060c11042c2c",
                    "typeQName": "ioCentro:unit"
                },
                "ingredient": {
                    "id": "9082e3ffb25229b38d80",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/9082e3ffb25229b38d80",
                    "title": "honey",
                    "qname": "o:17d2436cb369a6f232de",
                    "typeQName": "ioCentro:ingredient"
                }
            },
            {
                "quantity": "60",
                "unit": {
                    "id": "5c64dce1c08348f95727",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                    "title": "gr",
                    "qname": "o:9fe269a4060c11042c2c",
                    "typeQName": "ioCentro:unit"
                },
                "ingredient": {
                    "id": "65cac6cef9f0a63bae32",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/65cac6cef9f0a63bae32",
                    "title": "sliced almonds",
                    "qname": "o:5d9a504a0c4c2dbc51d6",
                    "typeQName": "ioCentro:ingredient"
                }
            },
            {
                "quantity": "3",
                "unit": {
                    "id": "300387a9278c2e8e8857",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/300387a9278c2e8e8857",
                    "title": "table spoon",
                    "qname": "o:3c6c194d327bfda3f176",
                    "typeQName": "ioCentro:unit"
                },
                "ingredient": {
                    "id": "c99420b57d9067ff0b58",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/c99420b57d9067ff0b58",
                    "title": "eggs",
                    "qname": "o:bbffeab2e242cb28fba6",
                    "typeQName": "ioCentro:ingredient"
                }
            },
            {
                "quantity": "1/2",
                "unit": {
                    "id": "5fe5649cc80846fc4f8a",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5fe5649cc80846fc4f8a",
                    "title": "sachet",
                    "qname": "o:26561d479240f3328bfe",
                    "typeQName": "ioCentro:unit"
                },
                "ingredient": {
                    "id": "6154858be78c88e4d78c",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/6154858be78c88e4d78c",
                    "title": "baker's yeast",
                    "qname": "o:f56e3633826f0de45cd7",
                    "typeQName": "ioCentro:ingredient"
                }
            },
            {
                "unit": {
                    "id": "300387a9278c2e8e8857",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/300387a9278c2e8e8857",
                    "title": "table spoon",
                    "qname": "o:3c6c194d327bfda3f176",
                    "typeQName": "ioCentro:unit"
                },
                "ingredient": {
                    "id": "8288a33d61f533cb365d",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/8288a33d61f533cb365d",
                    "title": "crumbled pistachio",
                    "qname": "o:388ba42eb0fef7092e2e",
                    "typeQName": "ioCentro:ingredient"
                }
            }
        ],
        "recipeInstructions": [
            {
                "title": "SUMMARY",
                "description": "<p>The almond-and-honey pie is easy to prepare: grind the almonds, set aside a teaspoon quantity. Melt the yeast into the milk and mix together the rest of the ingredients. Finally, combine the almonds. Cooking your pie in your microwave will allow you to have a soft and tasty pie in less than 10 minutes.<br/></p>",
                "image": {
                    "id": "62e3476106768739f079",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/62e3476106768739f079",
                    "title": "39.torta_mandorle _miele_1",
                    "qname": "o:5c006f4e314291bfd07c",
                    "typeQName": "ioCentro:image"
                },
                "applianceCommand": [
                    {
                        "deviceCommandCode": "ManualCycleStart",
                        "ManualCycleStart": {
                            "ManualFunctionsSettings": "FastPreheating",
                            "FastPreheating": {
                                "TargetTemp": 50,
                                "CookTimeCompleteAction": "ProcessCmpltActionWaitForNextCommand"
                            }
                        }
                    }
                ]
            },
            {
                "title": "STEP 2",
                "description": "<p>Beat the eggs with the sugar in a bowl until you get a foamy compound.<br/></p>",
                "image": {
                    "id": "60d51da4b4389584676c",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/60d51da4b4389584676c",
                    "title": "39.torta_mandorle _miele_2",
                    "qname": "o:78561a05d04429f3d7b6",
                    "typeQName": "ioCentro:image"
                },
                "applianceCommand": [
                    {
                        "deviceCommandCode": "ManualCycleStart",
                        "ManualCycleStart": {
                            "mainDeviceCommandParameter": "ManualFunctionsSettings",
                            "ManualFunctionsSettings": "Microwave",
                            "Microwave": {
                                "CookTimeSet": 60,
                                "CookPower": "900W",
                                "CookTimeCompleteAction": "ProcessCmpltActionWaitForNextCommand"
                            }
                        }
                    }
                ]
            },
            {
                "title": "STEP 3",
                "applianceCommand": []
            },
            {
                "title": "STEP 4",
                "description": "<p>Pour the mixture on the exclusive Crisp plate, level the surface and garnish with the teaspoon of &nbsp;minced almonds and the crumbled pistachio.<br/></p>",
                "image": {
                    "id": "abcbea0ac694907fe467",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/abcbea0ac694907fe467",
                    "title": "39.torta_mandorle _miele_4",
                    "qname": "o:d3f00beaa28193617baf",
                    "typeQName": "ioCentro:image"
                },
                "applianceCommand": [
                    {}
                ]
            },
            {
                "title": "STEP 5",
                "connectedInstructions": "<p>Place the Crisp plate into the microwave oven and press the 'Send to Microwave' button to send all the cooking settings to the microwave or select 'Plan' to cook when desired.<br/></p>",
                "instructions": "<p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\">Place the Crisp Plate in the microwave and apply the\nfollowing settings:<o:p></o:p></span></p><p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\">&nbsp;<o:p></o:p></span></p><p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><b>Function: CRISP</b></span><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><o:p></o:p></span></p><p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><b>Power: AUTO</b></span><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><o:p></o:p></span></p><p>\n\n\n\n\n\n\n\n</p><p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><b>Time: 8 min</b></span><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><o:p></o:p></span></p>",
                "applianceCommand": [
                    {
                        "deviceCommandCode": "ManualCycleStart",
                        "ManualCycleStart": {
                            "mainDeviceCommandParameter": "ManualFunctionsSettings",
                            "ManualFunctionsSettings": "Grill",
                            "Grill": {
                                "CookTimeSet": 200,
                                "BroilLevel": "BroilLevelHigh",
                                "Message": "wait water to boil",
                                "CookTimeCompleteAction": "ProcessCmpltActionWaitForNextCommand"
                            }
                        }
                    }
                ]
            }
        ],
        "variant1": {
            "recipeYield": 2,
            "recipeTime": {},
            "recipeIngredient": [
                {
                    "quantity": "220",
                    "unit": {
                        "id": "5c64dce1c08348f95727",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                        "title": "gr",
                        "qname": "o:9fe269a4060c11042c2c",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "c108996787fb3a3380c1",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/c108996787fb3a3380c1",
                        "title": "flour",
                        "qname": "o:31573ef988c8a1ee91b1",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "quantity": "70",
                    "unit": {
                        "id": "5c64dce1c08348f95727",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                        "title": "gr",
                        "qname": "o:9fe269a4060c11042c2c",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "be541a1f3fba92aff9a2",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/be541a1f3fba92aff9a2",
                        "title": "sugar",
                        "qname": "o:a277418d85e78483ee56",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "quantity": "50",
                    "unit": {
                        "id": "5c64dce1c08348f95727",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                        "title": "gr",
                        "qname": "o:9fe269a4060c11042c2c",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "2f093e2131c7197272bd",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/2f093e2131c7197272bd",
                        "title": "butter",
                        "qname": "o:8be4643c35a346a58658",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "quantity": "70",
                    "unit": {
                        "id": "5c64dce1c08348f95727",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                        "title": "gr",
                        "qname": "o:9fe269a4060c11042c2c",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "9082e3ffb25229b38d80",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/9082e3ffb25229b38d80",
                        "title": "honey",
                        "qname": "o:17d2436cb369a6f232de",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "quantity": "60",
                    "unit": {
                        "id": "5c64dce1c08348f95727",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                        "title": "gr",
                        "qname": "o:9fe269a4060c11042c2c",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "65cac6cef9f0a63bae32",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/65cac6cef9f0a63bae32",
                        "title": "sliced almonds",
                        "qname": "o:5d9a504a0c4c2dbc51d6",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "quantity": "3",
                    "unit": {
                        "id": "300387a9278c2e8e8857",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/300387a9278c2e8e8857",
                        "title": "table spoon",
                        "qname": "o:3c6c194d327bfda3f176",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "c99420b57d9067ff0b58",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/c99420b57d9067ff0b58",
                        "title": "eggs",
                        "qname": "o:bbffeab2e242cb28fba6",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "quantity": "1/2",
                    "unit": {
                        "id": "5fe5649cc80846fc4f8a",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5fe5649cc80846fc4f8a",
                        "title": "sachet",
                        "qname": "o:26561d479240f3328bfe",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "6154858be78c88e4d78c",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/6154858be78c88e4d78c",
                        "title": "baker's yeast",
                        "qname": "o:f56e3633826f0de45cd7",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "unit": {
                        "id": "300387a9278c2e8e8857",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/300387a9278c2e8e8857",
                        "title": "table spoon",
                        "qname": "o:3c6c194d327bfda3f176",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "8288a33d61f533cb365d",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/8288a33d61f533cb365d",
                        "title": "crumbled pistachio",
                        "qname": "o:388ba42eb0fef7092e2e",
                        "typeQName": "ioCentro:ingredient"
                    }
                }
            ],
            "recipeInstructions": [
                {
                    "title": "SUMMARY",
                    "description": "<p>The almond-and-honey pie is easy to prepare: grind the almonds, set aside a teaspoon quantity. Melt the yeast into the milk and mix together the rest of the ingredients. Finally, combine the almonds. Cooking your pie in your microwave will allow you to have a soft and tasty pie in less than 10 minutes.<br/></p>",
                    "image": {
                        "id": "62e3476106768739f079",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/62e3476106768739f079",
                        "title": "39.torta_mandorle _miele_1",
                        "qname": "o:5c006f4e314291bfd07c",
                        "typeQName": "ioCentro:image"
                    },
                    "applianceCommand": [
                        {
                            "deviceCommandCode": "ManualCycleStart",
                            "ManualCycleStart": {
                                "ManualFunctionsSettings": "FastPreheating",
                                "FastPreheating": {
                                    "TargetTemp": 50,
                                    "CookTimeCompleteAction": "ProcessCmpltActionWaitForNextCommand"
                                }
                            }
                        }
                    ]
                },
                {
                    "title": "STEP 2",
                    "description": "<p>Beat the eggs with the sugar in a bowl until you get a foamy compound.<br/></p>",
                    "image": {
                        "id": "60d51da4b4389584676c",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/60d51da4b4389584676c",
                        "title": "39.torta_mandorle _miele_2",
                        "qname": "o:78561a05d04429f3d7b6",
                        "typeQName": "ioCentro:image"
                    },
                    "applianceCommand": [
                        {
                            "deviceCommandCode": "ManualCycleStart",
                            "ManualCycleStart": {
                                "mainDeviceCommandParameter": "ManualFunctionsSettings",
                                "ManualFunctionsSettings": "Microwave",
                                "Microwave": {
                                    "CookTimeSet": 120,
                                    "CookPower": "900W",
                                    "CookTimeCompleteAction": "ProcessCmpltActionWaitForNextCommand"
                                }
                            }
                        }
                    ]
                },
                {
                    "title": "STEP 3",
                    "applianceCommand": []
                },
                {
                    "title": "STEP 4",
                    "description": "<p>Pour the mixture on the exclusive Crisp plate, level the surface and garnish with the teaspoon of &nbsp;minced almonds and the crumbled pistachio.<br/></p>",
                    "image": {
                        "id": "abcbea0ac694907fe467",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/abcbea0ac694907fe467",
                        "title": "39.torta_mandorle _miele_4",
                        "qname": "o:d3f00beaa28193617baf",
                        "typeQName": "ioCentro:image"
                    },
                    "applianceCommand": [
                        {}
                    ]
                },
                {
                    "title": "STEP 5",
                    "connectedInstructions": "<p>Place the Crisp plate into the microwave oven and press the 'Send to Microwave' button to send all the cooking settings to the microwave or select 'Plan' to cook when desired.<br/></p>",
                    "instructions": "<p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\">Place the Crisp Plate in the microwave and apply the\nfollowing settings:<o:p></o:p></span></p><p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\">&nbsp;<o:p></o:p></span></p><p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><b>Function: CRISP</b></span><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><o:p></o:p></span></p><p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><b>Power: AUTO</b></span><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><o:p></o:p></span></p><p>\n\n\n\n\n\n\n\n</p><p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><b>Time: 8 min</b></span><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><o:p></o:p></span></p>",
                    "applianceCommand": [
                        {
                            "deviceCommandCode": "ManualCycleStart",
                            "ManualCycleStart": {
                                "mainDeviceCommandParameter": "ManualFunctionsSettings",
                                "ManualFunctionsSettings": "Grill",
                                "Grill": {
                                    "CookTimeSet": 500,
                                    "BroilLevel": "BroilLevelHigh",
                                    "Message": "wait water to boil",
                                    "CookTimeCompleteAction": "ProcessCmpltActionWaitForNextCommand"
                                }
                            }
                        }
                    ]
                }
            ]
        },
        "variant2": {
            "recipeYield": 2,
            "recipeTime": {},
            "recipeIngredient": [
                {
                    "quantity": "220",
                    "unit": {
                        "id": "5c64dce1c08348f95727",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                        "title": "gr",
                        "qname": "o:9fe269a4060c11042c2c",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "c108996787fb3a3380c1",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/c108996787fb3a3380c1",
                        "title": "flour",
                        "qname": "o:31573ef988c8a1ee91b1",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "quantity": "70",
                    "unit": {
                        "id": "5c64dce1c08348f95727",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                        "title": "gr",
                        "qname": "o:9fe269a4060c11042c2c",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "be541a1f3fba92aff9a2",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/be541a1f3fba92aff9a2",
                        "title": "sugar",
                        "qname": "o:a277418d85e78483ee56",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "quantity": "50",
                    "unit": {
                        "id": "5c64dce1c08348f95727",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                        "title": "gr",
                        "qname": "o:9fe269a4060c11042c2c",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "2f093e2131c7197272bd",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/2f093e2131c7197272bd",
                        "title": "butter",
                        "qname": "o:8be4643c35a346a58658",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "quantity": "70",
                    "unit": {
                        "id": "5c64dce1c08348f95727",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                        "title": "gr",
                        "qname": "o:9fe269a4060c11042c2c",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "9082e3ffb25229b38d80",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/9082e3ffb25229b38d80",
                        "title": "honey",
                        "qname": "o:17d2436cb369a6f232de",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "quantity": "60",
                    "unit": {
                        "id": "5c64dce1c08348f95727",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                        "title": "gr",
                        "qname": "o:9fe269a4060c11042c2c",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "65cac6cef9f0a63bae32",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/65cac6cef9f0a63bae32",
                        "title": "sliced almonds",
                        "qname": "o:5d9a504a0c4c2dbc51d6",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "quantity": "3",
                    "unit": {
                        "id": "300387a9278c2e8e8857",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/300387a9278c2e8e8857",
                        "title": "table spoon",
                        "qname": "o:3c6c194d327bfda3f176",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "c99420b57d9067ff0b58",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/c99420b57d9067ff0b58",
                        "title": "eggs",
                        "qname": "o:bbffeab2e242cb28fba6",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "quantity": "1/2",
                    "unit": {
                        "id": "5fe5649cc80846fc4f8a",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5fe5649cc80846fc4f8a",
                        "title": "sachet",
                        "qname": "o:26561d479240f3328bfe",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "6154858be78c88e4d78c",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/6154858be78c88e4d78c",
                        "title": "baker's yeast",
                        "qname": "o:f56e3633826f0de45cd7",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "unit": {
                        "id": "300387a9278c2e8e8857",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/300387a9278c2e8e8857",
                        "title": "table spoon",
                        "qname": "o:3c6c194d327bfda3f176",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "8288a33d61f533cb365d",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/8288a33d61f533cb365d",
                        "title": "crumbled pistachio",
                        "qname": "o:388ba42eb0fef7092e2e",
                        "typeQName": "ioCentro:ingredient"
                    }
                }
            ],
            "recipeInstructions": [
                {
                    "title": "SUMMARY",
                    "description": "<p>The almond-and-honey pie is easy to prepare: grind the almonds, set aside a teaspoon quantity. Melt the yeast into the milk and mix together the rest of the ingredients. Finally, combine the almonds. Cooking your pie in your microwave will allow you to have a soft and tasty pie in less than 10 minutes.<br/></p>",
                    "image": {
                        "id": "62e3476106768739f079",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/62e3476106768739f079",
                        "title": "39.torta_mandorle _miele_1",
                        "qname": "o:5c006f4e314291bfd07c",
                        "typeQName": "ioCentro:image"
                    },
                    "applianceCommand": [
                        {
                            "deviceCommandCode": "ManualCycleStart",
                            "ManualCycleStart": {
                                "ManualFunctionsSettings": "FastPreheating",
                                "FastPreheating": {
                                    "TargetTemp": 50,
                                    "CookTimeCompleteAction": "ProcessCmpltActionWaitForNextCommand"
                                }
                            }
                        }
                    ]
                },
                {
                    "title": "STEP 2",
                    "description": "<p>Beat the eggs with the sugar in a bowl until you get a foamy compound.<br/></p>",
                    "image": {
                        "id": "60d51da4b4389584676c",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/60d51da4b4389584676c",
                        "title": "39.torta_mandorle _miele_2",
                        "qname": "o:78561a05d04429f3d7b6",
                        "typeQName": "ioCentro:image"
                    },
                    "applianceCommand": [
                        {
                            "deviceCommandCode": "ManualCycleStart",
                            "ManualCycleStart": {
                                "mainDeviceCommandParameter": "ManualFunctionsSettings",
                                "ManualFunctionsSettings": "Microwave",
                                "Microwave": {
                                    "CookTimeSet": 180,
                                    "CookPower": "900W",
                                    "CookTimeCompleteAction": "ProcessCmpltActionWaitForNextCommand"
                                }
                            }
                        }
                    ]
                },
                {
                    "title": "STEP 3",
                    "applianceCommand": []
                },
                {
                    "title": "STEP 4",
                    "description": "<p>Pour the mixture on the exclusive Crisp plate, level the surface and garnish with the teaspoon of &nbsp;minced almonds and the crumbled pistachio.<br/></p>",
                    "image": {
                        "id": "abcbea0ac694907fe467",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/abcbea0ac694907fe467",
                        "title": "39.torta_mandorle _miele_4",
                        "qname": "o:d3f00beaa28193617baf",
                        "typeQName": "ioCentro:image"
                    },
                    "applianceCommand": [
                        {}
                    ]
                },
                {
                    "title": "STEP 5",
                    "connectedInstructions": "<p>Place the Crisp plate into the microwave oven and press the 'Send to Microwave' button to send all the cooking settings to the microwave or select 'Plan' to cook when desired.<br/></p>",
                    "instructions": "<p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\">Place the Crisp Plate in the microwave and apply the\nfollowing settings:<o:p></o:p></span></p><p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\">&nbsp;<o:p></o:p></span></p><p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><b>Function: CRISP</b></span><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><o:p></o:p></span></p><p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><b>Power: AUTO</b></span><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><o:p></o:p></span></p><p>\n\n\n\n\n\n\n\n</p><p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><b>Time: 8 min</b></span><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><o:p></o:p></span></p>",
                    "applianceCommand": [
                        {
                            "deviceCommandCode": "ManualCycleStart",
                            "ManualCycleStart": {
                                "mainDeviceCommandParameter": "ManualFunctionsSettings",
                                "ManualFunctionsSettings": "Grill",
                                "Grill": {
                                    "CookTimeSet": 1000,
                                    "BroilLevel": "BroilLevelHigh",
                                    "Message": "wait water to boil",
                                    "CookTimeCompleteAction": "ProcessCmpltActionWaitForNextCommand"
                                }
                            }
                        }
                    ]
                }
            ]
        },
        "_system": {
            "deleted": false,
            "changeset": "1115:93996db66febfa74e261",
            "modified_on": {
                "timestamp": "21-Sep-2017 10:02:47",
                "year": 2017,
                "month": 8,
                "day_of_month": 21,
                "hour": 10,
                "minute": 2,
                "second": 47,
                "millisecond": 798,
                "ms": 1505988167798,
                "iso_8601": "2017-09-21T10:02:47Z"
            },
            "modified_by": "admin",
            "modified_by_principal_id": "8bab17107d03afd83b64",
            "modified_by_principal_domain_id": "default",
            "created_on": {
                "timestamp": "28-Aug-2017 14:42:06",
                "year": 2017,
                "month": 7,
                "day_of_month": 28,
                "hour": 14,
                "minute": 42,
                "second": 6,
                "millisecond": 566,
                "ms": 1503931326566,
                "iso_8601": "2017-08-28T14:42:06Z"
            },
            "created_by": "admin",
            "created_by_principal_id": "8bab17107d03afd83b64",
            "created_by_principal_domain_id": "default",
            "previousChangeset": "1113:86e49314bd4ce84e0c9b"
        },
        "_doc": "dd280a33360a4e554f94",
        "_qname": "o:198d211e4a6ccae2ec25",
        "_features": {
            "f:audit": {},
            "f:titled": {},
            "f:filename": {
                "filename": "Almond_and_honey_pie"
            },
            "f:geolocation": {},
            "f:indexable": {},
            "f:multilingual": {
                "enabled": true
            }
        },
        "_type": "ioCentro:multiRecipe",
        "_statistics": {
            "a:linked": 3,
            "a:linked_OUTGOING": 3
        },
        "_is_association": false
    };
    const dataNoCommand = {
        "brand": {
            "id": "79fb0ea320d561837567",
            "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/79fb0ea320d561837567",
            "title": "Whirlpool",
            "qname": "o:999705de5a64c15b1bb4",
            "typeQName": "ioCentro:brand"
        },
        "title": "Almond-and-honey pie",
        "description": "<p>The almond-and-honey PIE is a classic dessert, largely appreciated by everyone, especially when served with a little cream garnished with a drop of honey. You can eat it in the morning drenched in the tea or offer it as a snack.<br/></p>",
        "appliances": [
            {
                "id": "d614609f4e59fb853aba",
                "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/d614609f4e59fb853aba",
                "title": "MWO MWO Phoenix",
                "qname": "o:ae5ba0c8ec3b71591e98",
                "typeQName": "ioCentro:appliance"
            },
            {
                "id": "0722d89e0cff9b4783eb",
                "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/0722d89e0cff9b4783eb",
                "title": "NC MWO Maxi Chef Model 2",
                "qname": "o:3ef152d0ed2d1b1e2590",
                "typeQName": "ioCentro:appliance"
            },
            {
                "id": "50e7daba99e26f12649a",
                "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/50e7daba99e26f12649a",
                "title": "NC MWO Maxi Chef Model 3",
                "qname": "o:bde330326ce28bf7692a",
                "typeQName": "ioCentro:appliance"
            },
            {
                "id": "c6700c8e3f6d0dbe4192",
                "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/c6700c8e3f6d0dbe4192",
                "title": "NC MWO Maxi Chef Model 4",
                "qname": "o:c2a405ee8a9e9e144063",
                "typeQName": "ioCentro:appliance"
            },
            {
                "id": "918912ba5602ec5d1eda",
                "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/918912ba5602ec5d1eda",
                "title": "NC MWO Maxi Chef Model 5",
                "qname": "o:ba7462c28dd33953911e",
                "typeQName": "ioCentro:appliance"
            }
        ],
        "recipeCategory": [
            {
                "id": "9fe07eef1fb28544656c",
                "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/9fe07eef1fb28544656c",
                "title": "Dessert",
                "qname": "o:88005eea32e07ed27c00",
                "typeQName": "ioCentro:recipeCategory"
            }
        ],
        "recipeCuisine": [
            {
                "id": "4a5dd646a3c3d048ad7c",
                "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/4a5dd646a3c3d048ad7c",
                "title": "classic",
                "qname": "o:dc98703e16951d72ea2f",
                "typeQName": "ioCentro:recipeCuisine"
            }
        ],
        "complexity": {
            "id": "c1d23ae2227d89f86a97",
            "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/c1d23ae2227d89f86a97",
            "title": "Medium",
            "qname": "o:93e862f0f6092de6ac7c",
            "typeQName": "ioCentro:complexity"
        },
        "aggregateRating": {},
        "image": {
            "id": "6259d3b9f6ce825d8f75",
            "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/6259d3b9f6ce825d8f75",
            "title": "39.torta_mandorle _miele",
            "qname": "o:adf1a81e8da6fe7eda7f",
            "typeQName": "ioCentro:image"
        },
        "video": [],
        "nutrition": {},
        "recipeTime": {
            "prepTime": 40,
            "cookTime": 8
        },
        "recipeYield": 6,
        "recipeIngredient": [
            {
                "quantity": "220",
                "unit": {
                    "id": "5c64dce1c08348f95727",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                    "title": "gr",
                    "qname": "o:9fe269a4060c11042c2c",
                    "typeQName": "ioCentro:unit"
                },
                "ingredient": {
                    "id": "c108996787fb3a3380c1",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/c108996787fb3a3380c1",
                    "title": "flour",
                    "qname": "o:31573ef988c8a1ee91b1",
                    "typeQName": "ioCentro:ingredient"
                }
            },
            {
                "quantity": "70",
                "unit": {
                    "id": "5c64dce1c08348f95727",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                    "title": "gr",
                    "qname": "o:9fe269a4060c11042c2c",
                    "typeQName": "ioCentro:unit"
                },
                "ingredient": {
                    "id": "be541a1f3fba92aff9a2",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/be541a1f3fba92aff9a2",
                    "title": "sugar",
                    "qname": "o:a277418d85e78483ee56",
                    "typeQName": "ioCentro:ingredient"
                }
            },
            {
                "quantity": "50",
                "unit": {
                    "id": "5c64dce1c08348f95727",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                    "title": "gr",
                    "qname": "o:9fe269a4060c11042c2c",
                    "typeQName": "ioCentro:unit"
                },
                "ingredient": {
                    "id": "2f093e2131c7197272bd",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/2f093e2131c7197272bd",
                    "title": "butter",
                    "qname": "o:8be4643c35a346a58658",
                    "typeQName": "ioCentro:ingredient"
                }
            },
            {
                "quantity": "70",
                "unit": {
                    "id": "5c64dce1c08348f95727",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                    "title": "gr",
                    "qname": "o:9fe269a4060c11042c2c",
                    "typeQName": "ioCentro:unit"
                },
                "ingredient": {
                    "id": "9082e3ffb25229b38d80",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/9082e3ffb25229b38d80",
                    "title": "honey",
                    "qname": "o:17d2436cb369a6f232de",
                    "typeQName": "ioCentro:ingredient"
                }
            },
            {
                "quantity": "60",
                "unit": {
                    "id": "5c64dce1c08348f95727",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                    "title": "gr",
                    "qname": "o:9fe269a4060c11042c2c",
                    "typeQName": "ioCentro:unit"
                },
                "ingredient": {
                    "id": "65cac6cef9f0a63bae32",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/65cac6cef9f0a63bae32",
                    "title": "sliced almonds",
                    "qname": "o:5d9a504a0c4c2dbc51d6",
                    "typeQName": "ioCentro:ingredient"
                }
            },
            {
                "quantity": "3",
                "unit": {
                    "id": "300387a9278c2e8e8857",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/300387a9278c2e8e8857",
                    "title": "table spoon",
                    "qname": "o:3c6c194d327bfda3f176",
                    "typeQName": "ioCentro:unit"
                },
                "ingredient": {
                    "id": "c99420b57d9067ff0b58",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/c99420b57d9067ff0b58",
                    "title": "eggs",
                    "qname": "o:bbffeab2e242cb28fba6",
                    "typeQName": "ioCentro:ingredient"
                }
            },
            {
                "quantity": "1/2",
                "unit": {
                    "id": "5fe5649cc80846fc4f8a",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5fe5649cc80846fc4f8a",
                    "title": "sachet",
                    "qname": "o:26561d479240f3328bfe",
                    "typeQName": "ioCentro:unit"
                },
                "ingredient": {
                    "id": "6154858be78c88e4d78c",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/6154858be78c88e4d78c",
                    "title": "baker's yeast",
                    "qname": "o:f56e3633826f0de45cd7",
                    "typeQName": "ioCentro:ingredient"
                }
            },
            {
                "unit": {
                    "id": "300387a9278c2e8e8857",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/300387a9278c2e8e8857",
                    "title": "table spoon",
                    "qname": "o:3c6c194d327bfda3f176",
                    "typeQName": "ioCentro:unit"
                },
                "ingredient": {
                    "id": "8288a33d61f533cb365d",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/8288a33d61f533cb365d",
                    "title": "crumbled pistachio",
                    "qname": "o:388ba42eb0fef7092e2e",
                    "typeQName": "ioCentro:ingredient"
                }
            }
        ],
        "recipeInstructions": [
            {
                "title": "SUMMARY",
                "description": "<p>The almond-and-honey pie is easy to prepare: grind the almonds, set aside a teaspoon quantity. Melt the yeast into the milk and mix together the rest of the ingredients. Finally, combine the almonds. Cooking your pie in your microwave will allow you to have a soft and tasty pie in less than 10 minutes.<br/></p>",
                "image": {
                    "id": "62e3476106768739f079",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/62e3476106768739f079",
                    "title": "39.torta_mandorle _miele_1",
                    "qname": "o:5c006f4e314291bfd07c",
                    "typeQName": "ioCentro:image"
                },
                "applianceCommand": []
            },
            {
                "title": "STEP 2",
                "description": "<p>Beat the eggs with the sugar in a bowl until you get a foamy compound.<br/></p>",
                "image": {
                    "id": "60d51da4b4389584676c",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/60d51da4b4389584676c",
                    "title": "39.torta_mandorle _miele_2",
                    "qname": "o:78561a05d04429f3d7b6",
                    "typeQName": "ioCentro:image"
                },
                "applianceCommand": []
            },
            {
                "title": "STEP 3",
                "applianceCommand": []
            },
            {
                "title": "STEP 4",
                "description": "<p>Pour the mixture on the exclusive Crisp plate, level the surface and garnish with the teaspoon of &nbsp;minced almonds and the crumbled pistachio.<br/></p>",
                "image": {
                    "id": "abcbea0ac694907fe467",
                    "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/abcbea0ac694907fe467",
                    "title": "39.torta_mandorle _miele_4",
                    "qname": "o:d3f00beaa28193617baf",
                    "typeQName": "ioCentro:image"
                },
                "applianceCommand": []
            },
            {
                "title": "STEP 5",
                "connectedInstructions": "<p>Place the Crisp plate into the microwave oven and press the 'Send to Microwave' button to send all the cooking settings to the microwave or select 'Plan' to cook when desired.<br/></p>",
                "instructions": "<p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\">Place the Crisp Plate in the microwave and apply the\nfollowing settings:<o:p></o:p></span></p><p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\">&nbsp;<o:p></o:p></span></p><p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><b>Function: CRISP</b></span><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><o:p></o:p></span></p><p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><b>Power: AUTO</b></span><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><o:p></o:p></span></p><p>\n\n\n\n\n\n\n\n</p><p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><b>Time: 8 min</b></span><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><o:p></o:p></span></p>",
                "applianceCommand": []
            }
        ],
        "variant1": {
            "recipeYield": 2,
            "recipeTime": {},
            "recipeIngredient": [
                {
                    "quantity": "220",
                    "unit": {
                        "id": "5c64dce1c08348f95727",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                        "title": "gr",
                        "qname": "o:9fe269a4060c11042c2c",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "c108996787fb3a3380c1",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/c108996787fb3a3380c1",
                        "title": "flour",
                        "qname": "o:31573ef988c8a1ee91b1",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "quantity": "70",
                    "unit": {
                        "id": "5c64dce1c08348f95727",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                        "title": "gr",
                        "qname": "o:9fe269a4060c11042c2c",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "be541a1f3fba92aff9a2",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/be541a1f3fba92aff9a2",
                        "title": "sugar",
                        "qname": "o:a277418d85e78483ee56",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "quantity": "50",
                    "unit": {
                        "id": "5c64dce1c08348f95727",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                        "title": "gr",
                        "qname": "o:9fe269a4060c11042c2c",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "2f093e2131c7197272bd",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/2f093e2131c7197272bd",
                        "title": "butter",
                        "qname": "o:8be4643c35a346a58658",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "quantity": "70",
                    "unit": {
                        "id": "5c64dce1c08348f95727",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                        "title": "gr",
                        "qname": "o:9fe269a4060c11042c2c",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "9082e3ffb25229b38d80",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/9082e3ffb25229b38d80",
                        "title": "honey",
                        "qname": "o:17d2436cb369a6f232de",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "quantity": "60",
                    "unit": {
                        "id": "5c64dce1c08348f95727",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                        "title": "gr",
                        "qname": "o:9fe269a4060c11042c2c",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "65cac6cef9f0a63bae32",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/65cac6cef9f0a63bae32",
                        "title": "sliced almonds",
                        "qname": "o:5d9a504a0c4c2dbc51d6",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "quantity": "3",
                    "unit": {
                        "id": "300387a9278c2e8e8857",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/300387a9278c2e8e8857",
                        "title": "table spoon",
                        "qname": "o:3c6c194d327bfda3f176",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "c99420b57d9067ff0b58",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/c99420b57d9067ff0b58",
                        "title": "eggs",
                        "qname": "o:bbffeab2e242cb28fba6",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "quantity": "1/2",
                    "unit": {
                        "id": "5fe5649cc80846fc4f8a",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5fe5649cc80846fc4f8a",
                        "title": "sachet",
                        "qname": "o:26561d479240f3328bfe",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "6154858be78c88e4d78c",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/6154858be78c88e4d78c",
                        "title": "baker's yeast",
                        "qname": "o:f56e3633826f0de45cd7",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "unit": {
                        "id": "300387a9278c2e8e8857",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/300387a9278c2e8e8857",
                        "title": "table spoon",
                        "qname": "o:3c6c194d327bfda3f176",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "8288a33d61f533cb365d",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/8288a33d61f533cb365d",
                        "title": "crumbled pistachio",
                        "qname": "o:388ba42eb0fef7092e2e",
                        "typeQName": "ioCentro:ingredient"
                    }
                }
            ],
            "recipeInstructions": [
                {
                    "title": "SUMMARY",
                    "description": "<p>The almond-and-honey pie is easy to prepare: grind the almonds, set aside a teaspoon quantity. Melt the yeast into the milk and mix together the rest of the ingredients. Finally, combine the almonds. Cooking your pie in your microwave will allow you to have a soft and tasty pie in less than 10 minutes.<br/></p>",
                    "image": {
                        "id": "62e3476106768739f079",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/62e3476106768739f079",
                        "title": "39.torta_mandorle _miele_1",
                        "qname": "o:5c006f4e314291bfd07c",
                        "typeQName": "ioCentro:image"
                    },
                    "applianceCommand": []
                },
                {
                    "title": "STEP 2",
                    "description": "<p>Beat the eggs with the sugar in a bowl until you get a foamy compound.<br/></p>",
                    "image": {
                        "id": "60d51da4b4389584676c",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/60d51da4b4389584676c",
                        "title": "39.torta_mandorle _miele_2",
                        "qname": "o:78561a05d04429f3d7b6",
                        "typeQName": "ioCentro:image"
                    },
                    "applianceCommand": []
                },
                {
                    "title": "STEP 3",
                    "applianceCommand": []
                },
                {
                    "title": "STEP 4",
                    "description": "<p>Pour the mixture on the exclusive Crisp plate, level the surface and garnish with the teaspoon of &nbsp;minced almonds and the crumbled pistachio.<br/></p>",
                    "image": {
                        "id": "abcbea0ac694907fe467",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/abcbea0ac694907fe467",
                        "title": "39.torta_mandorle _miele_4",
                        "qname": "o:d3f00beaa28193617baf",
                        "typeQName": "ioCentro:image"
                    },
                    "applianceCommand": []
                },
                {
                    "title": "STEP 5",
                    "connectedInstructions": "<p>Place the Crisp plate into the microwave oven and press the 'Send to Microwave' button to send all the cooking settings to the microwave or select 'Plan' to cook when desired.<br/></p>",
                    "instructions": "<p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\">Place the Crisp Plate in the microwave and apply the\nfollowing settings:<o:p></o:p></span></p><p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\">&nbsp;<o:p></o:p></span></p><p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><b>Function: CRISP</b></span><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><o:p></o:p></span></p><p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><b>Power: AUTO</b></span><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><o:p></o:p></span></p><p>\n\n\n\n\n\n\n\n</p><p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><b>Time: 8 min</b></span><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><o:p></o:p></span></p>",
                    "applianceCommand": []
                }
            ]
        },
        "variant2": {
            "recipeYield": 2,
            "recipeTime": {},
            "recipeIngredient": [
                {
                    "quantity": "220",
                    "unit": {
                        "id": "5c64dce1c08348f95727",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                        "title": "gr",
                        "qname": "o:9fe269a4060c11042c2c",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "c108996787fb3a3380c1",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/c108996787fb3a3380c1",
                        "title": "flour",
                        "qname": "o:31573ef988c8a1ee91b1",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "quantity": "70",
                    "unit": {
                        "id": "5c64dce1c08348f95727",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                        "title": "gr",
                        "qname": "o:9fe269a4060c11042c2c",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "be541a1f3fba92aff9a2",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/be541a1f3fba92aff9a2",
                        "title": "sugar",
                        "qname": "o:a277418d85e78483ee56",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "quantity": "50",
                    "unit": {
                        "id": "5c64dce1c08348f95727",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                        "title": "gr",
                        "qname": "o:9fe269a4060c11042c2c",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "2f093e2131c7197272bd",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/2f093e2131c7197272bd",
                        "title": "butter",
                        "qname": "o:8be4643c35a346a58658",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "quantity": "70",
                    "unit": {
                        "id": "5c64dce1c08348f95727",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                        "title": "gr",
                        "qname": "o:9fe269a4060c11042c2c",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "9082e3ffb25229b38d80",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/9082e3ffb25229b38d80",
                        "title": "honey",
                        "qname": "o:17d2436cb369a6f232de",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "quantity": "60",
                    "unit": {
                        "id": "5c64dce1c08348f95727",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5c64dce1c08348f95727",
                        "title": "gr",
                        "qname": "o:9fe269a4060c11042c2c",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "65cac6cef9f0a63bae32",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/65cac6cef9f0a63bae32",
                        "title": "sliced almonds",
                        "qname": "o:5d9a504a0c4c2dbc51d6",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "quantity": "3",
                    "unit": {
                        "id": "300387a9278c2e8e8857",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/300387a9278c2e8e8857",
                        "title": "table spoon",
                        "qname": "o:3c6c194d327bfda3f176",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "c99420b57d9067ff0b58",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/c99420b57d9067ff0b58",
                        "title": "eggs",
                        "qname": "o:bbffeab2e242cb28fba6",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "quantity": "1/2",
                    "unit": {
                        "id": "5fe5649cc80846fc4f8a",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/5fe5649cc80846fc4f8a",
                        "title": "sachet",
                        "qname": "o:26561d479240f3328bfe",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "6154858be78c88e4d78c",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/6154858be78c88e4d78c",
                        "title": "baker's yeast",
                        "qname": "o:f56e3633826f0de45cd7",
                        "typeQName": "ioCentro:ingredient"
                    }
                },
                {
                    "unit": {
                        "id": "300387a9278c2e8e8857",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/300387a9278c2e8e8857",
                        "title": "table spoon",
                        "qname": "o:3c6c194d327bfda3f176",
                        "typeQName": "ioCentro:unit"
                    },
                    "ingredient": {
                        "id": "8288a33d61f533cb365d",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/8288a33d61f533cb365d",
                        "title": "crumbled pistachio",
                        "qname": "o:388ba42eb0fef7092e2e",
                        "typeQName": "ioCentro:ingredient"
                    }
                }
            ],
            "recipeInstructions": [
                {
                    "title": "SUMMARY",
                    "description": "<p>The almond-and-honey pie is easy to prepare: grind the almonds, set aside a teaspoon quantity. Melt the yeast into the milk and mix together the rest of the ingredients. Finally, combine the almonds. Cooking your pie in your microwave will allow you to have a soft and tasty pie in less than 10 minutes.<br/></p>",
                    "image": {
                        "id": "62e3476106768739f079",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/62e3476106768739f079",
                        "title": "39.torta_mandorle _miele_1",
                        "qname": "o:5c006f4e314291bfd07c",
                        "typeQName": "ioCentro:image"
                    },
                    "applianceCommand": []
                },
                {
                    "title": "STEP 2",
                    "description": "<p>Beat the eggs with the sugar in a bowl until you get a foamy compound.<br/></p>",
                    "image": {
                        "id": "60d51da4b4389584676c",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/60d51da4b4389584676c",
                        "title": "39.torta_mandorle _miele_2",
                        "qname": "o:78561a05d04429f3d7b6",
                        "typeQName": "ioCentro:image"
                    },
                    "applianceCommand": []
                },
                {
                    "title": "STEP 3",
                    "applianceCommand": []
                },
                {
                    "title": "STEP 4",
                    "description": "<p>Pour the mixture on the exclusive Crisp plate, level the surface and garnish with the teaspoon of &nbsp;minced almonds and the crumbled pistachio.<br/></p>",
                    "image": {
                        "id": "abcbea0ac694907fe467",
                        "ref": "node://4f19b8c98f3f8634ef42/11b3c60b8b6fedaafda0/6cd38867f2f71113ef66/abcbea0ac694907fe467",
                        "title": "39.torta_mandorle _miele_4",
                        "qname": "o:d3f00beaa28193617baf",
                        "typeQName": "ioCentro:image"
                    },
                    "applianceCommand": []
                },
                {
                    "title": "STEP 5",
                    "connectedInstructions": "<p>Place the Crisp plate into the microwave oven and press the 'Send to Microwave' button to send all the cooking settings to the microwave or select 'Plan' to cook when desired.<br/></p>",
                    "instructions": "<p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\">Place the Crisp Plate in the microwave and apply the\nfollowing settings:<o:p></o:p></span></p><p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\">&nbsp;<o:p></o:p></span></p><p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><b>Function: CRISP</b></span><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><o:p></o:p></span></p><p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><b>Power: AUTO</b></span><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><o:p></o:p></span></p><p>\n\n\n\n\n\n\n\n</p><p style=\"margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm\"><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><b>Time: 8 min</b></span><span lang=\"EN-US\" style=\"font-size: 10.5pt; font-family: Arial, sans-serif;\"><o:p></o:p></span></p>",
                    "applianceCommand": []
                }
            ]
        },
        "_system": {
            "deleted": false,
            "changeset": "1115:93996db66febfa74e261",
            "modified_on": {
                "timestamp": "21-Sep-2017 10:02:47",
                "year": 2017,
                "month": 8,
                "day_of_month": 21,
                "hour": 10,
                "minute": 2,
                "second": 47,
                "millisecond": 798,
                "ms": 1505988167798,
                "iso_8601": "2017-09-21T10:02:47Z"
            },
            "modified_by": "admin",
            "modified_by_principal_id": "8bab17107d03afd83b64",
            "modified_by_principal_domain_id": "default",
            "created_on": {
                "timestamp": "28-Aug-2017 14:42:06",
                "year": 2017,
                "month": 7,
                "day_of_month": 28,
                "hour": 14,
                "minute": 42,
                "second": 6,
                "millisecond": 566,
                "ms": 1503931326566,
                "iso_8601": "2017-08-28T14:42:06Z"
            },
            "created_by": "admin",
            "created_by_principal_id": "8bab17107d03afd83b64",
            "created_by_principal_domain_id": "default",
            "previousChangeset": "1113:86e49314bd4ce84e0c9b"
        },
        "_doc": "dd280a33360a4e554f94",
        "_qname": "o:198d211e4a6ccae2ec25",
        "_features": {
            "f:audit": {},
            "f:titled": {},
            "f:filename": {
                "filename": "Almond_and_honey_pie"
            },
            "f:geolocation": {},
            "f:indexable": {},
            "f:multilingual": {
                "enabled": true
            }
        },
        "_type": "ioCentro:multiRecipe",
        "_statistics": {
            "a:linked": 3,
            "a:linked_OUTGOING": 3
        },
        "_is_association": false
    };

    $("#form").alpaca({
        "connector": {
            "id": "cloudcms",
            "config": CLOUDCMS_CONFIG
        },
        "schema": schema,
        // "schemaSource": "ioCentro:multiRecipe",
        "data": dataWithCommands, // choose one data from constant above
        // "dataSource": "dd280a33360a4e554f94",  // source from => http://iot-dev-2.adbitaly.com/#/projects/bc8cc6ec71977b5b0dab/documents/dd280a33360a4e554f94
        "options": options, // => local configuration defined above
        // "optionsSource": "MultiRecipe", // => remote link to a form in the CMS, for more details see http://alpacajs.org/docs/api/connectors.html
        "view": "bootstrap-edit"
    });
});