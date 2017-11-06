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
                        "type": "sum",
                        "dependences": ["cookTime", "prepTime", "quantity"],
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
            },
            "multiSelect": {
                "type": "multi-select"
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
                    "multiSelect": "top",
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
    const prodOptions = {
        "title":"Recipe with variants",
        "engineId":"alpaca1",
        "definitions":{
            "stepOptions":{
                "type":"layout-object",
                "collapsible":true,
                "label":"Step",
                "labelClass":"accordion-toggle",
                "layout":"layout-1-1",
                "fields":{
                    "title":{
                        "column":"left"
                    },
                    "connectedInstructions":{
                        "type":"adb-summernote",
                        "column":"right"
                    },
                    "applianceCommand":{
                        "toolbarSticky":true,
                        "items":{
                            "type":"appliance-command",
                            "dependentField":"/appliances"
                        },
                        "column":"left"
                    },
                    "description":{
                        "type":"adb-summernote",
                        "column":"left"
                    },
                    "instructions":{
                        "type":"adb-summernote",
                        "column":"right"
                    },
                    "image":{
                        "column":"right",
                        "type":"content-typeahead",
                        "uploadPath":"/content/image",
                        "maxFileSize":25000000,
                        "maxNumberOfFiles":3,
                        "fileTypes":"(\\.|\\/)(mov|jpe?g|png)$"
                    },
                    "accessories":{
                        "type":"node-selector",
                        "column":"right"
                    }
                }
            },
            "recipeYield":{
                "type":"select"
            },
            "recipeTime":{
                "type":"layout-object",
                "layout":"layout-1-1-1",
                "fields":{
                    "prepTime":{
                        "column":"left"
                    },
                    "cookTime":{
                        "column":"mid"
                    },
                    "totalTime":{
                        "type":"sum",
                        "dependences":[
                            "prepTime",
                            "cookTime"
                        ],
                        "column":"right",
                        "readonly":true
                    }
                }
            },
            "recipeIngredient":{
                "type":"slave-array",
                "actionbarStyle":"right",
                "dependentField":"/recipeIngredient",
                "dependentChilds":[
                    "unit",
                    "ingredient"
                ],
                "toolbarSticky":true,
                "items":{
                    "type":"layout-object",
                    "layout":"layout-1-1-2",
                    "fields":{
                        "quantity":{
                            "column":"left"
                        },
                        "unit":{
                            "type":"node-selector",
                            "multiple":false,
                            "column":"mid",
                            "readonly":true
                        },
                        "ingredient":{
                            "type":"content-typeahead",
                            "size":"40",
                            "column":"right",
                            "readonly":true
                        }
                    }
                }
            },
            "recipeInstructions":{
                "type":"slave-array",
                "toolbarSticky":true,
                "dependentField":"/recipeInstructions",
                "dependentChilds":[
                    "title",
                    "connectedInstructions",
                    "description",
                    "image",
                    "accessories",
                    "applianceCommand"
                ],
                "items":{
                    "type":"layout-object",
                    "collapsible":true,
                    "label":"Step",
                    "labelClass":"accordion-toggle",
                    "layout":"layout-1-1",
                    "fields":{
                        "title":{
                            "column":"left",
                            "readonly":true
                        },
                        "connectedInstructions":{
                            "type":"textarea",
                            "rows":4,
                            "column":"right",
                            "readonly":true
                        },
                        "applianceCommand":{
                            "toolbarSticky":true,
                            "type":"slave-array",
                            "dependentChilds":[],
                            "items":{
                                "type":"appliance-command",
                                "isSlave":true,
                                "dependentField":"/appliances"
                            },
                            "column":"left"
                        },
                        "description":{
                            "type":"hidden"
                        },
                        "instructions":{
                            "type":"adb-summernote",
                            "column":"right"
                        },
                        "image":{
                            "column":"right",
                            "type":"content-typeahead",
                            "hidden":true,
                            "uploadPath":"/content/image",
                            "maxFileSize":25000000,
                            "maxNumberOfFiles":3,
                            "fileTypes":"(\\.|\\/)(mov|jpe?g|png)$"
                        },
                        "accessories":{
                            "type":"node-selector",
                            "column":"right",
                            "hidden":true
                        }
                    }
                }
            }
        },
        "fields":{
            "description":{
                "type":"adb-summernote"
            },
            "brand":{
                "type":"node-selector"
            },
            "suitableForDiet":{
                "type":"node-selector"
            },
            "recipeCategory":{
                "type":"node-selector"
            },
            "mainCourseType":{
                "type":"node-selector"
            },
            "recipeCuisine":{
                "type":"node-selector"
            },
            "recipeYield":{
                "type":"select",
                "removeDefaultNone":true
            },
            "complexity":{
                "type":"node-selector"
            },
            "aggregateRating":{
                "readonly":true
            },
            "appliances":{
                "type":"node-selector"
            },
            "applianceCategory":{
                "type":"node-selector"
            },
            "recipeTime":{
                "type":"layout-object",
                "layout":"layout-1-1-1",
                "fields":{
                    "prepTime":{
                        "column":"left"
                    },
                    "cookTime":{
                        "column":"mid"
                    },
                    "totalTime":{
                        "type":"sum",
                        "dependences":[
                            "prepTime",
                            "cookTime"
                        ],
                        "column":"right",
                        "readonly":true
                    }
                }
            },
            "image":{
                "type":"content-typeahead"
            },
            "video":{
                "type":"related-content",
                "uploadPath":"/content/video",
                "maxFileSize":250000000,
                "maxNumberOfFiles":3,
                "fileTypes":"(\\.|\\/)(mov|mpe?g|wmv|mp4)$"
            },
            "recipeIngredient":{
                "type":"array",
                "actionbarStyle":"right",
                "toolbarSticky":true,
                "fields":{
                    "item":{
                        "type":"layout-object",
                        "layout":"layout-1-1-2",
                        "fields":{
                            "quantity":{
                                "column":"left"
                            },
                            "unit":{
                                "type":"node-selector",
                                "column":"mid",
                                "removeDefaultNone":true
                            },
                            "ingredient":{
                                "type":"content-typeahead",
                                "size":"40",
                                "column":"right"
                            }
                        }
                    }
                }
            },
            "recipeInstructions":{
                "type":"array",
                "toolbarSticky":true,
                "actionbarStyle":"top",
                "toolbar":{
                    "actions":[
                        {
                            "action":"add",
                            "label":"Add Steps"
                        }
                    ]
                },
                "fields":{
                    "item":{
                        "type":"layout-object",
                        "collapsible":true,
                        "label":"Step",
                        "labelClass":"accordion-toggle",
                        "layout":"layout-1-1",
                        "fields":{
                            "title":{
                                "column":"left"
                            },
                            "connectedInstructions":{
                                "type":"adb-summernote",
                                "column":"right"
                            },
                            "applianceCommand":{
                                "toolbarSticky":true,
                                "items":{
                                    "type":"appliance-command",
                                    "dependentField":"/appliances"
                                },
                                "column":"left"
                            },
                            "description":{
                                "type":"adb-summernote",
                                "column":"left"
                            },
                            "instructions":{
                                "type":"adb-summernote",
                                "column":"right"
                            },
                            "image":{
                                "column":"right",
                                "type":"content-typeahead",
                                "uploadPath":"/content/image",
                                "maxFileSize":25000000,
                                "maxNumberOfFiles":3,
                                "fileTypes":"(\\.|\\/)(mov|jpe?g|png)$"
                            },
                            "accessories":{
                                "type":"node-selector",
                                "column":"right"
                            }
                        }
                    }
                }
            },
            "accessories":{
                "type":"node-selector"
            },
            "variant1":{
                "fields":{
                    "recipeYield":{
                        "$ref":"#/definitions/recipeYield",
                        "removeDefaultNone":true
                    },
                    "recipeTime":{
                        "$ref":"#/definitions/recipeTime"
                    },
                    "recipeIngredient":{
                        "$ref":"#/definitions/recipeIngredient"
                    },
                    "recipeInstructions":{
                        "$ref":"#/definitions/recipeInstructions"
                    }
                }
            },
            "variant2":{
                "fields":{
                    "recipeYield":{
                        "$ref":"#/definitions/recipeYield",
                        "removeDefaultNone":true
                    },
                    "recipeTime":{
                        "$ref":"#/definitions/recipeTime"
                    },
                    "recipeIngredient":{
                        "$ref":"#/definitions/recipeIngredient"
                    },
                    "recipeInstructions":{
                        "$ref":"#/definitions/recipeInstructions"
                    }
                }
            }
        },
        "view":{
            "parent":"bootstrap-edit",
            "layout":{
                "template":"<div><div class='row'><div class='col-md-12' id='top'></div></div><div class='row'><div class='col-md-4' id='t1'></div><div class='col-md-4' id='t2'></div><div class='col-md-4' id='t3'></div></div><div class='row'><div class='col-md-6' id='left'></div><div class='col-md-6' id='right'></div></div><div class='row'><div class='col-md-12' id='bottom'></div></div></div>",
                "bindings":{
                    "title":"top",
                    "description":"top",
                    "method":"left",
                    "image":"left",
                    "relatedRecipes":"right",
                    "video":"right",
                    "suitableForDiet":"left",
                    "recipeCategory":"left",
                    "mainCourseType":"left",
                    "recipeCuisine":"left",
                    "complexity":"left",
                    "accessories":"left",
                    "lowCalories":"left",
                    "vegetarian":"left",
                    "aggregateRating":"right",
                    "brand":"left",
                    "recipeTime":"top",
                    "recipeYield":"t1",
                    "recipeIngredient":"bottom",
                    "appliances":"left",
                    "applianceCategory":"right",
                    "recipeInstructions":"bottom",
                    "variant1":"top",
                    "variant2":"top"
                }
            },
            "wizard":{
                "hideSubmitButton":true,
                "markAllStepsVisited":true,
                "title":"Recipe",
                "description":"Please fill data in",
                "bindings":{
                    "title":1,
                    "description":1,
                    "method":1,
                    "image":1,
                    "relatedRecipes":1,
                    "video":1,
                    "suitableForDiet":2,
                    "recipeCategory":2,
                    "mainCourseType":2,
                    "recipeCuisine":2,
                    "complexity":2,
                    "accessories":2,
                    "lowCalories":2,
                    "vegetarian":2,
                    "aggregateRating":2,
                    "brand":2,
                    "recipeTime":3,
                    "recipeYield":3,
                    "recipeIngredient":3,
                    "appliances":4,
                    "applianceCategory":4,
                    "recipeInstructions":4,
                    "variant1":5,
                    "variant2":6
                },
                "steps":[
                    {
                        "title":"Getting Started",
                        "description":"Basic Information"
                    },
                    {
                        "title":"Details",
                        "description":"Additional Information"
                    },
                    {
                        "title":"Ingredients",
                        "description":"Recipe Ingredients"
                    },
                    {
                        "title":"Steps",
                        "description":"Recipe Steps"
                    },
                    {
                        "title":"Variant 1",
                        "description":"Recipe Variant"
                    },
                    {
                        "title":"Variant 2",
                        "description":"Recipe Variant"
                    }
                ]
            }
        },
        "form":{
            "attributes":{
                "method":"post",
                "action":"/repositories/c689143fb96794f12fc6/branches/1138e9eeadb3b75a6520/nodes"
            }
        }
    };
    const kitchenAidCookProcessorForm = {
        "title": "Recipe",
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
                "type": "select",
                "removeDefaultNone": true
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
                        "type": "sum",
                        "dependences": [
                            "prepTime",
                            "cookTime"
                        ],
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
                        "descrio": {
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
            "multiSelect": {
                "type": "multi-select",
                "multiple": true,
                "removeDefaultNone": true
            },
            "description": {
                "type": "adb-summernote"
            },
            "method": {
                "type": "node-selector"
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
            "cost": {
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
                        "type": "sum",
                        "dependences": [
                            "prepTime",
                            "cookTime"
                        ],
                        "column": "right",
                        "readonly": true
                    }
                }
            },
            "thumbnailImage": {
                "type": "related-content",
                "uploadPath": "/content/image",
                "maxFileSize": 25000000,
                "maxNumberOfFiles": 3,
                "fileTypes": "(\\.|\\/)(jpe?g|png)$"
            },
            "wallpaperImage": {
                "type": "related-content",
                "uploadPath": "/content/image",
                "maxFileSize": 25000000,
                "maxNumberOfFiles": 3,
                "fileTypes": "(\\.|\\/)(jpe?g|png)$"
            },
            "ingredientsImage": {
                "type": "related-content",
                "uploadPath": "/content/image",
                "maxFileSize": 25000000,
                "maxNumberOfFiles": 3,
                "fileTypes": "(\\.|\\/)(jpe?g|png)$"
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
                        "layout": "layout-1-1-2-2",
                        "fields": {
                            "quantity": {
                                "column": "1"
                            },
                            "unit": {
                                "type": "node-selector",
                                "column": "2"
                            },
                            "ingredient": {
                                "type": "content-typeahead",
                                "size": "40",
                                "column": "3"
                            },
                            "preparation": {
                                "column": "4"
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
                            "description": {
                                "type": "adb-summernote",
                                "column": "left"
                            },
                            "applianceCommand": {
                                "toolbarSticky": true,
                                "items": {
                                    "type": "appliance-command",
                                    "dependentField": "/appliances"
                                },
                                "column": "right"
                            },
                            "image": {
                                "column": "left",
                                "type": "related-content",
                                "uploadPath": "/content/image",
                                "maxFileSize": 25000000,
                                "maxNumberOfFiles": 3,
                                "fileTypes": "(\\.|\\/)(mov|jpe?g|png)$"
                            },
                            "tips": {
                                "column": "left"
                            },
                            "video": {
                                "type": "related-content",
                                "column": "left",
                                "uploadPath": "/content/video",
                                "maxFileSize": 250000000,
                                "maxNumberOfFiles": 3,
                                "fileTypes": "(\\.|\\/)(mov|mpe?g|wmv|mp4)$"
                            }
                        }
                    }
                }
            },
            "unconnectedInstructions": {
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
                        "collapsible": true,
                        "label": "Step",
                        "labelClass": "accordion-toggle",
                        "fields": {
                            "description": {
                                "type": "adb-summernote"
                            }
                        }
                    }
                }
            },
            "accessories": {
                "type": "node-selector"
            }
        },
        "view": {
            "parent": "bootstrap-edit",
            "layout": {
                "template": "<div><div class='row'><div class='col-md-12' id='top'></div></div><div class='row'><div class='col-md-4' id='t1'></div><div class='col-md-4' id='t2'></div><div class='col-md-4' id='t3'></div></div><div class='row'><div class='col-md-6' id='left'></div><div class='col-md-6' id='right'></div></div><div class='row'><div class='col-md-12' id='bottom'></div></div></div>",
                "bindings": {
                    "title": "top",
                    "description": "top",
                    "multiSelect": "top",
                    "method": "left",
                    "relatedRecipes": "right",
                    "thumbnailImage": "left",
                    "wallpaperImage": "left",
                    "ingredientsImage": "right",
                    "video": "right",
                    "suitableForDiet": "left",
                    "recipeCategory": "left",
                    "recipeCuisine": "left",
                    "complexity": "left",
                    "cost": "left",
                    "accessories": "left",
                    "aggregateRating": "right",
                    "brand": "left",
                    "recipeTime": "top",
                    "recipeYield": "t1",
                    "recipeIngredient": "bottom",
                    "appliances": "left",
                    "applianceCategory": "right",
                    "recipeInstructions": "bottom",
                    "unconnectedInstructions": "top"
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
                    "relatedRecipes": 1,
                    "thumbnailImage": 1,
                    "wallpaperImage": 1,
                    "ingredientsImage": 1,
                    "video": 1,
                    "suitableForDiet": 2,
                    "recipeCategory": 2,
                    "recipeCuisine": 2,
                    "complexity": 2,
                    "cost": 2,
                    "accessories": 2,
                    "aggregateRating": 2,
                    "brand": 2,
                    "recipeTime": 3,
                    "recipeYield": 3,
                    "recipeIngredient": 3,
                    "appliances": 4,
                    "applianceCategory": 4,
                    "recipeInstructions": 4,
                    "unconnectedInstructions": 5
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
                        "description": "For connected appliances"
                    },
                    {
                        "title": "Steps",
                        "description": "For other appliances"
                    }
                ]
            }
        },
        "form": {
            "buttons": {
                "validate": {
                    "title": "Validate and view JSON!",
                    "click": function () {
                        this.refreshValidationState(true);
                        if (this.isValid(true)) {
                            console.log(this.getValue());
                        }
                    }
                }
            },
            "attributes": {
                "method": "post",
                "action": "/repositories/fbe6fb72e1ae809dea25/branches/b076748df473f08f9485/nodes"
            }
        },
        "_form_key": "recipe"
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
            },
            "multiSelect": {
                "title": "Multi Select",
                "type": "array",
                "enum": [
                    "value 1",
                    "value 2",
                    "value 3",
                    "value 4",
                    "value 5",
                ],
                "$ref_resolved": "#/definitions/multiSelect"
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
            "multiSelect": {
                "$ref": "#/definitions/multiSelect"
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
    const prodSchema = {
        "definitions":{
            "recipeTime":{
                "type":"object",
                "title":"Time",
                "properties":{
                    "prepTime":{
                        "type":"number",
                        "title":"Preparation time"
                    },
                    "cookTime":{
                        "type":"number",
                        "title":"Cooking Time"
                    },
                    "totalTime":{
                        "type":"number",
                        "title":"Total Time"
                    }
                },
                "$ref_resolved":"#/definitions/recipeTime"
            },
            "recipeYield":{
                "type":"number",
                "title":"Number of servings",
                "enum":[
                    0,
                    2,
                    4,
                    6
                ],
                "$ref_resolved":"#/definitions/recipeYield"
            },
            "recipeIngredient":{
                "type":"array",
                "title":"Ingredients",
                "items":{
                    "type":"object",
                    "properties":{
                        "quantity":{
                            "type":"string",
                            "title":"Quantity"
                        },
                        "unit":{
                            "type":"object",
                            "title":"Unit",
                            "properties":{
                                "id":{
                                    "type":"string"
                                }
                            },
                            "_relator":{
                                "nodeType":"ioCentro:unit"
                            }
                        },
                        "ingredient":{
                            "title":"Ingredient",
                            "type":"object",
                            "_relator":{
                                "nodeType":"ioCentro:ingredient"
                            },
                            "properties":{
                                "id":{
                                    "type":"string"
                                }
                            }
                        }
                    }
                },
                "$ref_resolved":"#/definitions/recipeIngredient"
            },
            "recipeInstructions":{
                "title":"Recipe Steps",
                "type":"array",
                "items":{
                    "type":"object",
                    "properties":{
                        "title":{
                            "type":"string",
                            "title":"Title"
                        },
                        "description":{
                            "type":"string",
                            "title":"App message"
                        },
                        "connectedInstructions":{
                            "type":"string",
                            "title":"Instructions for connected appliance"
                        },
                        "instructions":{
                            "type":"string",
                            "title":"Instructions for non connected appliance"
                        },
                        "image":{
                            "type":"object",
                            "title":"Step picture",
                            "_relator":{
                                "nodeType":"ioCentro:image"
                            }
                        },
                        "accessories":{
                            "type":"array",
                            "title":"Accessories",
                            "items":{
                                "type":"object"
                            },
                            "_relator":{
                                "nodeType":"ioCentro:accessory"
                            }
                        },
                        "applianceCommand":{
                            "type":"array",
                            "title":"Appliance command",
                            "items":{
                                "type":"object"
                            }
                        }
                    }
                },
                "$ref_resolved":"#/definitions/recipeInstructions"
            },
            "recipeVariant":{
                "type":"object",
                "title":"Variant",
                "properties":{
                    "recipeYield":{
                        "$ref":"#/definitions/recipeYield"
                    },
                    "recipeTime":{
                        "$ref":"#/definitions/recipeTime"
                    },
                    "recipeIngredient":{
                        "$ref":"#/definitions/recipeIngredient"
                    },
                    "recipeInstructions":{
                        "$ref":"#/definitions/recipeInstructions"
                    }
                },
                "$ref_resolved":"#/definitions/recipeVariant"
            }
        },
        "properties":{
            "brand":{
                "title":"Brand",
                "type":"object",
                "_relator":{
                    "nodeType":"ioCentro:brand"
                }
            },
            "title":{
                "type":"string",
                "title":"Title"
            },
            "description":{
                "type":"string",
                "title":"Summary"
            },
            "relatedRecipes":{
                "type":"array",
                "title":"Related Recipes",
                "items":{
                    "type":"object"
                },
                "_relator":{
                    "nodeType":"ioCentro:recipe"
                }
            },
            "appliances":{
                "type":"array",
                "title":"Appliances",
                "items":{
                    "type":"object"
                },
                "_relator":{
                    "nodeType":"ioCentro:appliance"
                }
            },
            "suitableForDiet":{
                "type":"array",
                "title":"Dietary guidelines",
                "_relator":{
                    "nodeType":"ioCentro:dietaryGuidelines"
                }
            },
            "recipeCategory":{
                "type":"array",
                "title":"Category",
                "_relator":{
                    "nodeType":"ioCentro:recipeCategory"
                }
            },
            "mainCourseType":{
                "title":"Main Course",
                "type":"object",
                "_relator":{
                    "nodeType":"ioCentro:mainCourseType"
                }
            },
            "recipeCuisine":{
                "type":"array",
                "title":"Cuisines",
                "_relator":{
                    "nodeType":"ioCentro:recipeCuisine"
                }
            },
            "applianceCategory":{
                "title":"Appliance Category",
                "type":"object",
                "_relator":{
                    "nodeType":"ioCentro:applianceCategory"
                }
            },
            "complexity":{
                "title":"Complexity",
                "type":"object",
                "_relator":{
                    "nodeType":"ioCentro:complexity"
                }
            },
            "lowCalories":{
                "title":"Low Calories",
                "type":"boolean"
            },
            "vegetarian":{
                "title":"Vegetarian",
                "type":"boolean"
            },
            "accessories":{
                "type":"array",
                "title":"Accessories",
                "items":{
                    "type":"object"
                },
                "_relator":{
                    "nodeType":"ioCentro:accessory"
                }
            },
            "aggregateRating":{
                "type":"object",
                "title":"Rating",
                "properties":{
                    "ratingCount":{
                        "type":"number",
                        "title":"Total ratings"
                    },
                    "reviewCount":{
                        "type":"number",
                        "title":"Total reviews"
                    },
                    "ratingValue":{
                        "type":"number",
                        "title":"Average rating"
                    }
                }
            },
            "image":{
                "type":"object",
                "title":"Picture",
                "_relator":{
                    "nodeType":"ioCentro:image"
                }
            },
            "video":{
                "type":"array",
                "title":"Video",
                "_relator":{
                    "nodeType":"ioCentro:video"
                }
            },
            "method":{
                "title":"Method",
                "type":"object",
                "_relator":{
                    "nodeType":"ioCentro:method"
                }
            },
            "nutrition":{
                "$ref":"qname://ioCentro/nutrition",
                "$ref_resolved":"qname://ioCentro/nutrition",
                "type":"object"
            },
            "recipeTime":{
                "type":"object",
                "title":"Time",
                "properties":{
                    "prepTime":{
                        "type":"number",
                        "title":"Preparation time"
                    },
                    "cookTime":{
                        "type":"number",
                        "title":"Cooking Time"
                    },
                    "totalTime":{
                        "type":"number",
                        "title":"Total Time"
                    }
                },
                "$ref_resolved":"#/definitions/recipeTime"
            },
            "recipeYield":{
                "type":"number",
                "title":"Number of servings",
                "enum":[
                    0,
                    2,
                    4,
                    6
                ],
                "$ref_resolved":"#/definitions/recipeYield"
            },
            "recipeIngredient":{
                "type":"array",
                "title":"Ingredients",
                "items":{
                    "type":"object",
                    "properties":{
                        "quantity":{
                            "type":"string",
                            "title":"Quantity"
                        },
                        "unit":{
                            "type":"object",
                            "title":"Unit",
                            "properties":{
                                "id":{
                                    "type":"string"
                                }
                            },
                            "_relator":{
                                "nodeType":"ioCentro:unit"
                            }
                        },
                        "ingredient":{
                            "title":"Ingredient",
                            "type":"object",
                            "_relator":{
                                "nodeType":"ioCentro:ingredient"
                            },
                            "properties":{
                                "id":{
                                    "type":"string"
                                }
                            }
                        }
                    }
                },
                "$ref_resolved":"#/definitions/recipeIngredient"
            },
            "recipeInstructions":{
                "title":"Recipe Steps",
                "type":"array",
                "items":{
                    "type":"object",
                    "properties":{
                        "title":{
                            "type":"string",
                            "title":"Title"
                        },
                        "description":{
                            "type":"string",
                            "title":"App message"
                        },
                        "connectedInstructions":{
                            "type":"string",
                            "title":"Instructions for connected appliance"
                        },
                        "instructions":{
                            "type":"string",
                            "title":"Instructions for non connected appliance"
                        },
                        "image":{
                            "type":"object",
                            "title":"Step picture",
                            "_relator":{
                                "nodeType":"ioCentro:image"
                            }
                        },
                        "accessories":{
                            "type":"array",
                            "title":"Accessories",
                            "items":{
                                "type":"object"
                            },
                            "_relator":{
                                "nodeType":"ioCentro:accessory"
                            }
                        },
                        "applianceCommand":{
                            "type":"array",
                            "title":"Appliance command",
                            "items":{
                                "type":"object"
                            }
                        }
                    }
                },
                "$ref_resolved":"#/definitions/recipeInstructions"
            },
            "variant1":{
                "type":"object",
                "title":"Variant",
                "properties":{
                    "recipeYield":{
                        "$ref":"#/definitions/recipeYield"
                    },
                    "recipeTime":{
                        "$ref":"#/definitions/recipeTime"
                    },
                    "recipeIngredient":{
                        "$ref":"#/definitions/recipeIngredient"
                    },
                    "recipeInstructions":{
                        "$ref":"#/definitions/recipeInstructions"
                    }
                },
                "$ref_resolved":"#/definitions/recipeVariant"
            },
            "variant2":{
                "type":"object",
                "title":"Variant",
                "properties":{
                    "recipeYield":{
                        "$ref":"#/definitions/recipeYield"
                    },
                    "recipeTime":{
                        "$ref":"#/definitions/recipeTime"
                    },
                    "recipeIngredient":{
                        "$ref":"#/definitions/recipeIngredient"
                    },
                    "recipeInstructions":{
                        "$ref":"#/definitions/recipeInstructions"
                    }
                },
                "$ref_resolved":"#/definitions/recipeVariant"
            },
            "unit":{
                "type":"object",
                "_relator":{
                    "nodeType":"ioCentro:unit"
                }
            }
        },
        "title":"MultiRecipe",
        "description":"Recipe with variants",
        "_parent":"n:node",
        "$schema":"http://json-schema.org/draft-04/schema#",
        "type":"object",
        "format":"layout-object",
        "_system":{
            "deleted":false,
            "changeset":"0:root",
            "modified_on":{
                "timestamp":"12-Oct-2017 15:26:58",
                "year":2017,
                "month":9,
                "day_of_month":12,
                "hour":15,
                "minute":26,
                "second":58,
                "millisecond":714,
                "ms":1507822018714,
                "iso_8601":"2017-10-12T15:26:58Z"
            },
            "modified_by":"admin",
            "modified_by_principal_id":"75ef3993715285e713fd",
            "modified_by_principal_domain_id":"default",
            "created_on":{
                "timestamp":"12-Oct-2017 15:26:58",
                "year":2017,
                "month":9,
                "day_of_month":12,
                "hour":15,
                "minute":26,
                "second":58,
                "millisecond":714,
                "ms":1507822018714,
                "iso_8601":"2017-10-12T15:26:58Z"
            },
            "created_by":"admin",
            "created_by_principal_id":"75ef3993715285e713fd",
            "created_by_principal_domain_id":"default"
        },
        "_qname":"ioCentro:multiRecipe",
        "_type":"d:type",
        "_doc":"8d762a048f801bc51839"
    };
    const kitchenAidCookProcessorDefinitions = {
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
                        },
                        "preparation": {
                            "type": "string",
                            "title": "Preparation"
                        }
                    }
                },
                "$ref_resolved": "#/definitions/recipeIngredient"
            },
            "recipeInstructions": {
                "title": "Connected Steps",
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
                        "image": {
                            "type": "object",
                            "title": "Step picture",
                            "_relator": {
                                "nodeType": "ioCentro:image"
                            }
                        },
                        "video": {
                            "type": "object",
                            "title": "Step video",
                            "_relator": {
                                "nodeType": "ioCentro:video"
                            }
                        },
                        "tips": {
                            "type": "string",
                            "title": "Tips"
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
            "unconnectedInstructions": {
                "title": "Not connected Steps",
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
                            "title": "Description"
                        }
                    }
                },
                "$ref_resolved": "#/definitions/unconnectedInstructions"
            }
        },
        "properties": {
            "multiSelect": {
                "type": "string",
                "title": "Enum Select",
                "enum": [
                    "IT",
                    "DE",
                    "FR",
                    "EN"
                ]
            },
            "brand": {
                "title": "Brand",
                "type": "object",
                "_relator": {
                    "nodeType": "ioCentro:brand"
                }
            },
            "originalID": {
                "type": "string"
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
                "title": "Courses",
                "_relator": {
                    "nodeType": "ioCentro:recipeCategory"
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
            "cost": {
                "title": "Cost",
                "type": "object",
                "_relator": {
                    "nodeType": "ioCentro:cost"
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
            "thumbnailImage": {
                "type": "object",
                "title": "Thumbnail image",
                "_relator": {
                    "nodeType": "ioCentro:image"
                }
            },
            "wallpaperImage": {
                "type": "object",
                "title": "Wallpaper image",
                "_relator": {
                    "nodeType": "ioCentro:image"
                }
            },
            "ingredientsImage": {
                "type": "object",
                "title": "Ingredients image",
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
                "title": "Methods",
                "type": "array",
                "items": {
                    "type": "object"
                },
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
            "unconnectedInstructions": {
                "$ref": "#/definitions/unconnectedInstructions"
            }
        },
        "title": "Recipe",
        "description": "Recipe",
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
    const prodData = {
        "brand":{
            "id":"76b17bfe5e7aa45e7aa5",
            "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/76b17bfe5e7aa45e7aa5",
            "title":"Whirlpool",
            "qname":"o:999705de5a64c15b1bb4",
            "typeQName":"ioCentro:brand"
        },
        "title":"Picana's Churrasco",
        "description":"<p>Churrasco is a traditional style to grill meat in South America, particularly popular in Brazil. Preparing in this exclusive oven will result in a tender and tasty meat dish.<br></p>",
        "suitableForDiet":[
            {
                "id":"4d3165fd54f5c74d7275",
                "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/4d3165fd54f5c74d7275",
                "title":"Gluten free",
                "qname":"o:6dec658833cfc242cd97",
                "typeQName":"ioCentro:dietaryGuidelines"
            },
            {
                "id":"105f5f96f72ada2edeb1",
                "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/105f5f96f72ada2edeb1",
                "title":"Lactose free",
                "qname":"o:c89939fa52c70f650321",
                "typeQName":"ioCentro:dietaryGuidelines"
            },
            {
                "id":"c051f01b127867841496",
                "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/c051f01b127867841496",
                "title":"Shellfish free",
                "qname":"o:84c75dc8a7f7baf68dfb",
                "typeQName":"ioCentro:dietaryGuidelines"
            }
        ],
        "recipeCategory":[
            {
                "id":"f95075dd6df327ca0f8b",
                "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/f95075dd6df327ca0f8b",
                "title":"Main Course",
                "qname":"o:16918b615cb49a545a99",
                "typeQName":"ioCentro:recipeCategory"
            }
        ],
        "mainCourseType":{
            "id":"5de1381b3b83641805bf",
            "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/5de1381b3b83641805bf",
            "title":"Main Course 2",
            "qname":"o:ddd3a5f54f9073902cde",
            "typeQName":"ioCentro:mainCourseType"
        },
        "recipeCuisine":[
            {
                "id":"22bdd8efd205ad81f2ce",
                "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/22bdd8efd205ad81f2ce",
                "title":"classic",
                "qname":"o:dc98703e16951d72ea2f",
                "typeQName":"ioCentro:recipeCuisine"
            }
        ],
        "applianceCategory":{
            "id":"94e200587555119ff236",
            "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/94e200587555119ff236",
            "title":"Oven",
            "qname":"o:f53f6e001f4712478a9e",
            "typeQName":"ioCentro:applianceCategory"
        },
        "complexity":{
            "id":"aff0268c508983a05832",
            "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/aff0268c508983a05832",
            "title":"Low",
            "qname":"o:aa48aec1a077280b4c3a",
            "typeQName":"ioCentro:complexity"
        },
        "aggregateRating":{

        },
        "image":{
            "id":"fe64d9dda7424e40fbce",
            "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/fe64d9dda7424e40fbce",
            "title":"05.picanhas_churrasco",
            "qname":"o:86d78097ed5b3db7199d",
            "typeQName":"ioCentro:image"
        },
        "video":[

        ],
        "nutrition":{

        },
        "recipeTime":{
            "prepTime":20,
            "cookTime":45,
            "totalTime":65
        },
        "recipeYield":2,
        "recipeIngredient":[
            {
                "quantity":"300",
                "unit":{
                    "id":"1fc28cd09aeacdd4322f",
                    "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/1fc28cd09aeacdd4322f",
                    "title":"gr",
                    "qname":"o:9fe269a4060c11042c2c",
                    "typeQName":"ioCentro:unit"
                },
                "ingredient":{
                    "id":"492d010b8332c09c30bd",
                    "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/492d010b8332c09c30bd",
                    "title":"beef rumpsteak",
                    "qname":"o:624bea7a8af089003bbb",
                    "typeQName":"ioCentro:ingredient"
                }
            },
            {
                "quantity":"1",
                "unit":{
                    "id":"81d5142766a81f1e2535",
                    "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/81d5142766a81f1e2535",
                    "title":"clove",
                    "qname":"o:50456c2fecc107472825",
                    "typeQName":"ioCentro:unit"
                },
                "ingredient":{
                    "id":"cb3941263d7f0b0b3ecb",
                    "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/cb3941263d7f0b0b3ecb",
                    "title":"garlic",
                    "qname":"o:ab20f600b2dc9b4314ca",
                    "typeQName":"ioCentro:ingredient"
                }
            },
            {
                "quantity":"2",
                "unit":{
                    "id":"5bc3b3b29c511880ccee",
                    "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/5bc3b3b29c511880ccee",
                    "title":"leaves",
                    "qname":"o:a4a4083d8af63fbe1734",
                    "typeQName":"ioCentro:unit"
                },
                "ingredient":{
                    "id":"f19fdc50e4a65b2f5256",
                    "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/f19fdc50e4a65b2f5256",
                    "title":"sage",
                    "qname":"o:2a8ef5283f90e1202d44",
                    "typeQName":"ioCentro:ingredient"
                }
            },
            {
                "quantity":"0.5",
                "unit":{
                    "id":"6f10b46bb3ea001183dd",
                    "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/6f10b46bb3ea001183dd",
                    "title":"sprigs",
                    "qname":"o:727b989962be0a7a86cf",
                    "typeQName":"ioCentro:unit"
                },
                "ingredient":{
                    "id":"b3e3322ffb50c806a463",
                    "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/b3e3322ffb50c806a463",
                    "title":"rosemary",
                    "qname":"o:cf0c3e526a99c8676880",
                    "typeQName":"ioCentro:ingredient"
                }
            },
            {
                "quantity":"2",
                "unit":{
                    "id":"91c73fc937ed040b6eba",
                    "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/91c73fc937ed040b6eba",
                    "title":"table spoon",
                    "qname":"o:3c6c194d327bfda3f176",
                    "typeQName":"ioCentro:unit"
                },
                "ingredient":{
                    "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/1eca22c4425163bd7b2e",
                    "id":"1eca22c4425163bd7b2e",
                    "title":"Extra virgin olive oil",
                    "qname":"o:55ba50360c3d96e644bc",
                    "typeQName":"ioCentro:ingredient"
                }
            },
            {
                "quantity":"1",
                "unit":{
                    "id":"1fa97c0b37560c5ae617",
                    "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/1fa97c0b37560c5ae617",
                    "title":"none",
                    "qname":"o:a2babd27252ba07238d2",
                    "typeQName":"ioCentro:unit"
                },
                "ingredient":{
                    "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/e6665a5b10ca6f08b160",
                    "id":"e6665a5b10ca6f08b160",
                    "title":"Pink peppercorns",
                    "qname":"o:40a99e37f4ba37dfe265",
                    "typeQName":"ioCentro:ingredient"
                }
            },
            {
                "unit":{
                    "id":"1fa97c0b37560c5ae617",
                    "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/1fa97c0b37560c5ae617",
                    "title":"none",
                    "qname":"o:a2babd27252ba07238d2",
                    "typeQName":"ioCentro:unit"
                },
                "ingredient":{
                    "id":"ebedc81f8db369550083",
                    "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/ebedc81f8db369550083",
                    "title":"salt",
                    "qname":"o:14eb12e67bd7cb1bf860",
                    "typeQName":"ioCentro:ingredient"
                }
            }
        ],
        "recipeInstructions":[
            {
                "title":"SUMMARY",
                "description":"<p>The first step for the Picana's churrasco is to make your marinade by combining olive oil, salt, pepper, rosemary and minced sage. Next, add the rumpsteak and let it marinate for about two hours prior to cooking.<br></p>",
                "image":{
                    "id":"e9c2a9678e1a05710caf",
                    "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/e9c2a9678e1a05710caf",
                    "title":"05.picanhas_churrasco_1",
                    "qname":"o:dfc29f9c4c01d41fe727",
                    "typeQName":"ioCentro:image"
                },
                "applianceCommand":[

                ]
            },
            {
                "title":"STEP 2",
                "description":"<p>Clean and finely mince the garlic. Clean the rosemary and separate the tips form the stem. Next, clean the sage leaves and mince them. Put all the aromatic herbs in a mixing bowl and mix them together with the olive oil, &nbsp;salt and pink peppercorn.<br></p>",
                "image":{
                    "id":"b06781cfb540ac28ab66",
                    "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/b06781cfb540ac28ab66",
                    "title":"05.picanhas_churrasco_2",
                    "qname":"o:d6cbbeb8cfe99180b5b6",
                    "typeQName":"ioCentro:image"
                },
                "applianceCommand":[

                ]
            },
            {
                "title":"STEP 3",
                "description":"<p>Place the whole rumpsteak onto an oven pan. Pour the marinade over it and let it steep for about two hours. Finally, you are ready to cook.<br></p>",
                "image":{
                    "id":"dc270864b153ffa58e70",
                    "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/dc270864b153ffa58e70",
                    "title":"05.picanhas_churrasco_3",
                    "qname":"o:0cc721a743fca2a95943",
                    "typeQName":"ioCentro:image"
                },
                "applianceCommand":[

                ]
            },
            {
                "title":"STEP 4",
                "connectedInstructions":"<p>Place the container into the oven, onto the second rack and press the 'Send to the Oven' button to send all the cooking settings to the oven or select 'Plan' to cook when desired.<br></p>",
                "instructions":"<p>Place the container into the oven, onto the second rack. Select the conventional heating function. Temperature: 180°. Cooking time: 45 min.<br></p>",
                "image":{
                    "id":"fe64d9dda7424e40fbce",
                    "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/fe64d9dda7424e40fbce",
                    "title":"05.picanhas_churrasco",
                    "qname":"o:86d78097ed5b3db7199d",
                    "typeQName":"ioCentro:image"
                },
                "applianceCommand":[
                    {
                        "deviceCommandCode":"ManualCycleStart",
                        "ManualCycleStart":{
                            "mainDeviceCommandParameter":"ManualFunctionsSettings",
                            "ManualFunctionsSettings":"Conventional",
                            "Conventional":{
                                "TargetTemp":180,
                                "CookTimeSet":46,
                                "PreheatOn":"Off",
                                "CookTimeCompleteAction":"TurnOff"
                            }
                        }
                    }
                ]
            }
        ],
        "variant1":{
            "recipeYield":4,
            "recipeTime":{
                "prepTime":25,
                "cookTime":47,
                "totalTime":72
            },
            "recipeIngredient":[
                {
                    "quantity":"500",
                    "unit":{
                        "id":"1fc28cd09aeacdd4322f",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/1fc28cd09aeacdd4322f",
                        "title":"gr",
                        "qname":"o:9fe269a4060c11042c2c",
                        "typeQName":"ioCentro:unit"
                    },
                    "ingredient":{
                        "id":"492d010b8332c09c30bd",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/492d010b8332c09c30bd",
                        "title":"beef rumpsteak",
                        "qname":"o:624bea7a8af089003bbb",
                        "typeQName":"ioCentro:ingredient"
                    }
                },
                {
                    "quantity":"2",
                    "unit":{
                        "id":"81d5142766a81f1e2535",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/81d5142766a81f1e2535",
                        "title":"clove",
                        "qname":"o:50456c2fecc107472825",
                        "typeQName":"ioCentro:unit"
                    },
                    "ingredient":{
                        "id":"cb3941263d7f0b0b3ecb",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/cb3941263d7f0b0b3ecb",
                        "title":"garlic",
                        "qname":"o:ab20f600b2dc9b4314ca",
                        "typeQName":"ioCentro:ingredient"
                    }
                },
                {
                    "quantity":"4",
                    "unit":{
                        "id":"5bc3b3b29c511880ccee",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/5bc3b3b29c511880ccee",
                        "title":"leaves",
                        "qname":"o:a4a4083d8af63fbe1734",
                        "typeQName":"ioCentro:unit"
                    },
                    "ingredient":{
                        "id":"f19fdc50e4a65b2f5256",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/f19fdc50e4a65b2f5256",
                        "title":"sage",
                        "qname":"o:2a8ef5283f90e1202d44",
                        "typeQName":"ioCentro:ingredient"
                    }
                },
                {
                    "quantity":"1",
                    "unit":{
                        "id":"6f10b46bb3ea001183dd",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/6f10b46bb3ea001183dd",
                        "title":"sprigs",
                        "qname":"o:727b989962be0a7a86cf",
                        "typeQName":"ioCentro:unit"
                    },
                    "ingredient":{
                        "id":"b3e3322ffb50c806a463",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/b3e3322ffb50c806a463",
                        "title":"rosemary",
                        "qname":"o:cf0c3e526a99c8676880",
                        "typeQName":"ioCentro:ingredient"
                    }
                },
                {
                    "quantity":"4",
                    "unit":{
                        "id":"91c73fc937ed040b6eba",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/91c73fc937ed040b6eba",
                        "title":"table spoon",
                        "qname":"o:3c6c194d327bfda3f176",
                        "typeQName":"ioCentro:unit"
                    },
                    "ingredient":{
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/1eca22c4425163bd7b2e",
                        "id":"1eca22c4425163bd7b2e",
                        "title":"Extra virgin olive oil",
                        "qname":"o:55ba50360c3d96e644bc",
                        "typeQName":"ioCentro:ingredient"
                    }
                },
                {
                    "quantity":"2",
                    "unit":{
                        "id":"1fa97c0b37560c5ae617",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/1fa97c0b37560c5ae617",
                        "title":"none",
                        "qname":"o:a2babd27252ba07238d2",
                        "typeQName":"ioCentro:unit"
                    },
                    "ingredient":{
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/e6665a5b10ca6f08b160",
                        "id":"e6665a5b10ca6f08b160",
                        "title":"Pink peppercorns",
                        "qname":"o:40a99e37f4ba37dfe265",
                        "typeQName":"ioCentro:ingredient"
                    }
                },
                {
                    "unit":{
                        "id":"1fa97c0b37560c5ae617",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/1fa97c0b37560c5ae617",
                        "title":"none",
                        "qname":"o:a2babd27252ba07238d2",
                        "typeQName":"ioCentro:unit"
                    },
                    "ingredient":{
                        "id":"ebedc81f8db369550083",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/ebedc81f8db369550083",
                        "title":"salt",
                        "qname":"o:14eb12e67bd7cb1bf860",
                        "typeQName":"ioCentro:ingredient"
                    }
                }
            ],
            "recipeInstructions":[
                {
                    "title":"SUMMARY",
                    "description":"<p>The first step for the Picana's churrasco is to make your marinade by combining olive oil, salt, pepper, rosemary and minced sage. Next, add the rumpsteak and let it marinate for about two hours prior to cooking.<br></p>",
                    "image":{
                        "id":"e9c2a9678e1a05710caf",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/e9c2a9678e1a05710caf",
                        "title":"05.picanhas_churrasco_1",
                        "qname":"o:dfc29f9c4c01d41fe727",
                        "typeQName":"ioCentro:image"
                    },
                    "applianceCommand":[

                    ]
                },
                {
                    "title":"STEP 2",
                    "description":"<p>Clean and finely mince the garlic. Clean the rosemary and separate the tips form the stem. Next, clean the sage leaves and mince them. Put all the aromatic herbs in a mixing bowl and mix them together with the olive oil, &nbsp;salt and pink peppercorn.<br></p>",
                    "image":{
                        "id":"b06781cfb540ac28ab66",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/b06781cfb540ac28ab66",
                        "title":"05.picanhas_churrasco_2",
                        "qname":"o:d6cbbeb8cfe99180b5b6",
                        "typeQName":"ioCentro:image"
                    },
                    "applianceCommand":[

                    ]
                },
                {
                    "title":"STEP 3",
                    "description":"<p>Place the whole rumpsteak onto an oven pan. Pour the marinade over it and let it steep for about two hours. Finally, you are ready to cook.<br></p>",
                    "image":{
                        "id":"dc270864b153ffa58e70",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/dc270864b153ffa58e70",
                        "title":"05.picanhas_churrasco_3",
                        "qname":"o:0cc721a743fca2a95943",
                        "typeQName":"ioCentro:image"
                    },
                    "applianceCommand":[

                    ]
                },
                {
                    "title":"STEP 4",
                    "connectedInstructions":"<p>Place the container into the oven, onto the second rack and press the 'Send to the Oven' button to send all the cooking settings to the oven or select 'Plan' to cook when desired.<br></p>",
                    "instructions":"<p>Place the container into the oven, onto the second rack. Select the conventional heating function. Temperature: 180°. Cooking time: 47 min.<br></p>",
                    "image":{
                        "id":"fe64d9dda7424e40fbce",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/fe64d9dda7424e40fbce",
                        "title":"05.picanhas_churrasco",
                        "qname":"o:86d78097ed5b3db7199d",
                        "typeQName":"ioCentro:image"
                    },
                    "applianceCommand":[
                        {
                            "deviceCommandCode":"ManualCycleStart",
                            "ManualCycleStart":{
                                "mainDeviceCommandParameter":"ManualFunctionsSettings",
                                "ManualFunctionsSettings":"Conventional",
                                "Conventional":{
                                    "TargetTemp":180,
                                    "CookTimeSet":45,
                                    "PreheatOn":"Off",
                                    "CookTimeCompleteAction":"TurnOff"
                                }
                            }
                        }
                    ]
                }
            ]
        },
        "variant2":{
            "recipeYield":6,
            "recipeTime":{
                "prepTime":30,
                "cookTime":48,
                "totalTime":78
            },
            "recipeIngredient":[
                {
                    "quantity":"700",
                    "unit":{
                        "id":"1fc28cd09aeacdd4322f",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/1fc28cd09aeacdd4322f",
                        "title":"gr",
                        "qname":"o:9fe269a4060c11042c2c",
                        "typeQName":"ioCentro:unit"
                    },
                    "ingredient":{
                        "id":"492d010b8332c09c30bd",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/492d010b8332c09c30bd",
                        "title":"beef rumpsteak",
                        "qname":"o:624bea7a8af089003bbb",
                        "typeQName":"ioCentro:ingredient"
                    }
                },
                {
                    "quantity":"3",
                    "unit":{
                        "id":"81d5142766a81f1e2535",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/81d5142766a81f1e2535",
                        "title":"clove",
                        "qname":"o:50456c2fecc107472825",
                        "typeQName":"ioCentro:unit"
                    },
                    "ingredient":{
                        "id":"cb3941263d7f0b0b3ecb",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/cb3941263d7f0b0b3ecb",
                        "title":"garlic",
                        "qname":"o:ab20f600b2dc9b4314ca",
                        "typeQName":"ioCentro:ingredient"
                    }
                },
                {
                    "quantity":"6",
                    "unit":{
                        "id":"5bc3b3b29c511880ccee",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/5bc3b3b29c511880ccee",
                        "title":"leaves",
                        "qname":"o:a4a4083d8af63fbe1734",
                        "typeQName":"ioCentro:unit"
                    },
                    "ingredient":{
                        "id":"f19fdc50e4a65b2f5256",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/f19fdc50e4a65b2f5256",
                        "title":"sage",
                        "qname":"o:2a8ef5283f90e1202d44",
                        "typeQName":"ioCentro:ingredient"
                    }
                },
                {
                    "quantity":"1",
                    "unit":{
                        "id":"6f10b46bb3ea001183dd",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/6f10b46bb3ea001183dd",
                        "title":"sprigs",
                        "qname":"o:727b989962be0a7a86cf",
                        "typeQName":"ioCentro:unit"
                    },
                    "ingredient":{
                        "id":"b3e3322ffb50c806a463",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/b3e3322ffb50c806a463",
                        "title":"rosemary",
                        "qname":"o:cf0c3e526a99c8676880",
                        "typeQName":"ioCentro:ingredient"
                    }
                },
                {
                    "quantity":"6",
                    "unit":{
                        "id":"91c73fc937ed040b6eba",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/91c73fc937ed040b6eba",
                        "title":"table spoon",
                        "qname":"o:3c6c194d327bfda3f176",
                        "typeQName":"ioCentro:unit"
                    },
                    "ingredient":{
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/1eca22c4425163bd7b2e",
                        "id":"1eca22c4425163bd7b2e",
                        "title":"Extra virgin olive oil",
                        "qname":"o:55ba50360c3d96e644bc",
                        "typeQName":"ioCentro:ingredient"
                    }
                },
                {
                    "quantity":"3",
                    "unit":{
                        "id":"1fa97c0b37560c5ae617",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/1fa97c0b37560c5ae617",
                        "title":"none",
                        "qname":"o:a2babd27252ba07238d2",
                        "typeQName":"ioCentro:unit"
                    },
                    "ingredient":{
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/e6665a5b10ca6f08b160",
                        "id":"e6665a5b10ca6f08b160",
                        "title":"Pink peppercorns",
                        "qname":"o:40a99e37f4ba37dfe265",
                        "typeQName":"ioCentro:ingredient"
                    }
                },
                {
                    "unit":{
                        "id":"1fa97c0b37560c5ae617",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/1fa97c0b37560c5ae617",
                        "title":"none",
                        "qname":"o:a2babd27252ba07238d2",
                        "typeQName":"ioCentro:unit"
                    },
                    "ingredient":{
                        "id":"ebedc81f8db369550083",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/ebedc81f8db369550083",
                        "title":"salt",
                        "qname":"o:14eb12e67bd7cb1bf860",
                        "typeQName":"ioCentro:ingredient"
                    }
                }
            ],
            "recipeInstructions":[
                {
                    "title":"SUMMARY",
                    "description":"<p>The first step for the Picana's churrasco is to make your marinade by combining olive oil, salt, pepper, rosemary and minced sage. Next, add the rumpsteak and let it marinate for about two hours prior to cooking.<br></p>",
                    "image":{
                        "id":"e9c2a9678e1a05710caf",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/e9c2a9678e1a05710caf",
                        "title":"05.picanhas_churrasco_1",
                        "qname":"o:dfc29f9c4c01d41fe727",
                        "typeQName":"ioCentro:image"
                    },
                    "applianceCommand":[

                    ]
                },
                {
                    "title":"STEP 2",
                    "description":"<p>Clean and finely mince the garlic. Clean the rosemary and separate the tips form the stem. Next, clean the sage leaves and mince them. Put all the aromatic herbs in a mixing bowl and mix them together with the olive oil, &nbsp;salt and pink peppercorn.<br></p>",
                    "image":{
                        "id":"b06781cfb540ac28ab66",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/b06781cfb540ac28ab66",
                        "title":"05.picanhas_churrasco_2",
                        "qname":"o:d6cbbeb8cfe99180b5b6",
                        "typeQName":"ioCentro:image"
                    },
                    "applianceCommand":[

                    ]
                },
                {
                    "title":"STEP 3",
                    "description":"<p>Place the whole rumpsteak onto an oven pan. Pour the marinade over it and let it steep for about two hours. Finally, you are ready to cook.<br></p>",
                    "image":{
                        "id":"dc270864b153ffa58e70",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/dc270864b153ffa58e70",
                        "title":"05.picanhas_churrasco_3",
                        "qname":"o:0cc721a743fca2a95943",
                        "typeQName":"ioCentro:image"
                    },
                    "applianceCommand":[

                    ]
                },
                {
                    "title":"STEP 4",
                    "connectedInstructions":"<p>Place the container into the oven, onto the second rack and press the 'Send to the Oven' button to send all the cooking settings to the oven or select 'Plan' to cook when desired.<br></p>",
                    "instructions":"<p>Place the container into the oven, onto the second rack. Select the conventional heating function. Temperature: 180°. Cooking time: 48 min.<br></p>",
                    "image":{
                        "id":"fe64d9dda7424e40fbce",
                        "ref":"node://2413c45b074b07d975d8/c689143fb96794f12fc6/1138e9eeadb3b75a6520/fe64d9dda7424e40fbce",
                        "title":"05.picanhas_churrasco",
                        "qname":"o:86d78097ed5b3db7199d",
                        "typeQName":"ioCentro:image"
                    },
                    "applianceCommand":[
                        {
                            "deviceCommandCode":"ManualCycleStart",
                            "ManualCycleStart":{
                                "mainDeviceCommandParameter":"ManualFunctionsSettings",
                                "ManualFunctionsSettings":"Conventional",
                                "Conventional":{
                                    "TargetTemp":180,
                                    "CookTimeSet":45,
                                    "PreheatOn":"Off",
                                    "CookTimeCompleteAction":"TurnOff"
                                }
                            }
                        }
                    ]
                }
            ]
        },
        "_system":{
            "deleted":false,
            "changeset":"8128:61146c7ccb8a07eb427b",
            "modified_on":{
                "timestamp":"02-Nov-2017 08:15:41",
                "year":2017,
                "month":10,
                "day_of_month":2,
                "hour":8,
                "minute":15,
                "second":41,
                "millisecond":547,
                "ms":1509610541547,
                "iso_8601":"2017-11-02T08:15:41Z"
            },
            "modified_by":"admin",
            "modified_by_principal_id":"75ef3993715285e713fd",
            "modified_by_principal_domain_id":"default",
            "created_on":{
                "timestamp":"12-Oct-2017 15:27:31",
                "year":2017,
                "month":9,
                "day_of_month":12,
                "hour":15,
                "minute":27,
                "second":31,
                "millisecond":824,
                "ms":1507822051824,
                "iso_8601":"2017-10-12T15:27:31Z"
            },
            "created_by":"admin",
            "created_by_principal_id":"75ef3993715285e713fd",
            "created_by_principal_domain_id":"default",
            "previousChangeset":"8126:2a476a954e2af3a3fb29"
        },
        "_doc":"5cbe4c25aff57d885cf7",
        "_qname":"o:7641f625b26535177443",
        "_features":{
            "f:audit":{

            },
            "f:titled":{

            },
            "f:filename":{
                "filename":"Picana%27s+Churrasco"
            },
            "f:geolocation":{

            },
            "f:indexable":{

            },
            "f:multilingual":{
                "enabled":true
            }
        },
        "_type":"ioCentro:multiRecipe",
        "_statistics":{
            "a:linked":3,
            "a:linked_OUTGOING":3
        },
        "_is_association":false
    };
    const kitchenAidCookProcessorDocument = {
        "title": "RISOTTO",
        "appliances": [
            {
                "id": "774b561bbc188bd6d532",
                "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/774b561bbc188bd6d532",
                "title": "Kitchenaid cook processor",
                "qname": "o:ef4559c6884cd71cd387",
                "typeQName": "ioCentro:appliance"
            }
        ],
        "recipeCategory": [
            {
                "id": "59c0d35430c8ff666e7a",
                "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/59c0d35430c8ff666e7a",
                "title": "Main course",
                "qname": "o:eca6b78d4a80ee7a9afe",
                "typeQName": "ioCentro:recipeCategory"
            }
        ],
        "recipeCuisine": [
            {
                "id": "2e3bd43d426375eb361c",
                "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/2e3bd43d426375eb361c",
                "title": "Italian",
                "qname": "o:6f7944dc3e0b8da7780c",
                "typeQName": "ioCentro:recipeCuisine"
            }
        ],
        "complexity": {
            "id": "fb9827f005f6e06b00bd",
            "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/fb9827f005f6e06b00bd",
            "title": "Low",
            "qname": "o:19f1a358b34c0dfe9546",
            "typeQName": "ioCentro:complexity"
        },
        "cost": {
            "id": "f588ea57afff660937eb",
            "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/f588ea57afff660937eb",
            "title": "Low",
            "qname": "o:676f0ee08664940d1b4a",
            "typeQName": "ioCentro:cost"
        },
        "accessories": [
            {
                "id": "2706af8ec684a43e5af1",
                "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/2706af8ec684a43e5af1",
                "title": "MultiBlade",
                "qname": "o:231c5d1e297d6c586357",
                "typeQName": "ioCentro:accessory"
            },
            {
                "id": "64fa58ce681b69c4eb5b",
                "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/64fa58ce681b69c4eb5b",
                "title": "StirAssist",
                "qname": "o:e9ef209c1c3dd020af8e",
                "typeQName": "ioCentro:accessory"
            }
        ],
        "aggregateRating": {},
        "thumbnailImage": {
            "id": "67012a3ece6930d08e47",
            "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/67012a3ece6930d08e47",
            "title": "Risotto_wallpaperX2.jpg",
            "qname": "o:525ac73fea455732f2ad",
            "typeQName": "ioCentro:image"
        },
        "wallpaperImage": {
            "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/67012a3ece6930d08e47",
            "id": "67012a3ece6930d08e47",
            "title": "Risotto_wallpaperX2.jpg",
            "qname": "o:525ac73fea455732f2ad",
            "typeQName": "ioCentro:image"
        },
        "ingredientsImage": {
            "id": "67012a3ece6930d08e47",
            "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/67012a3ece6930d08e47",
            "title": "Risotto_wallpaperX2.jpg",
            "qname": "o:525ac73fea455732f2ad",
            "typeQName": "ioCentro:image"
        },
        "video": [
            {
                "id": "ec0e07947a556b75cc28",
                "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/ec0e07947a556b75cc28",
                "title": "Recipe Cooking with Wine.mp4",
                "qname": "o:8f9c1ecbe24f4777ce8b",
                "typeQName": "ioCentro:video"
            }
        ],
        "method": [
            {
                "id": "422a5a3e2499879afb0a",
                "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/422a5a3e2499879afb0a",
                "title": "Boil",
                "qname": "o:79b47f2e788574220e89",
                "typeQName": "ioCentro:method"
            }
        ],
        "nutrition": {},
        "recipeTime": {
            "prepTime": 2,
            "cookTime": 30,
            "totalTime": 32
        },
        "recipeYield": 2,
        "recipeIngredient": [
            {
                "quantity": "90",
                "unit": {
                    "id": "687187e326bd12c7a915",
                    "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/687187e326bd12c7a915",
                    "title": "gr",
                    "qname": "o:35f536ab46e77928e3a2",
                    "typeQName": "ioCentro:unit"
                },
                "ingredient": {
                    "id": "1bc0cb41b8108a8a67a6",
                    "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/1bc0cb41b8108a8a67a6",
                    "title": "onions",
                    "qname": "o:581baebecf88f6dac65c",
                    "typeQName": "ioCentro:ingredient"
                },
                "preparation": "peeled and chopped in 4"
            },
            {
                "quantity": "40",
                "unit": {
                    "id": "687187e326bd12c7a915",
                    "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/687187e326bd12c7a915",
                    "title": "gr",
                    "qname": "o:35f536ab46e77928e3a2",
                    "typeQName": "ioCentro:unit"
                },
                "ingredient": {
                    "id": "45217e0220efcfa22527",
                    "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/45217e0220efcfa22527",
                    "title": "olive oil",
                    "qname": "o:dc635d37b1cfc4ce6e31",
                    "typeQName": "ioCentro:ingredient"
                }
            },
            {
                "quantity": "20",
                "unit": {
                    "id": "687187e326bd12c7a915",
                    "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/687187e326bd12c7a915",
                    "title": "gr",
                    "qname": "o:35f536ab46e77928e3a2",
                    "typeQName": "ioCentro:unit"
                },
                "ingredient": {
                    "id": "40b60c1ebb02d34570d7",
                    "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/40b60c1ebb02d34570d7",
                    "title": "farmhouse butter",
                    "qname": "o:ea327e47e22ff1f0b8f6",
                    "typeQName": "ioCentro:ingredient"
                }
            },
            {
                "quantity": "80",
                "unit": {
                    "id": "687187e326bd12c7a915",
                    "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/687187e326bd12c7a915",
                    "title": "gr",
                    "qname": "o:35f536ab46e77928e3a2",
                    "typeQName": "ioCentro:unit"
                },
                "ingredient": {
                    "id": "34a59b2c24f4facdceeb",
                    "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/34a59b2c24f4facdceeb",
                    "title": "parmesan leaves",
                    "qname": "o:827b14d07e63c85472f8",
                    "typeQName": "ioCentro:ingredient"
                }
            },
            {
                "quantity": "300",
                "unit": {
                    "id": "687187e326bd12c7a915",
                    "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/687187e326bd12c7a915",
                    "title": "gr",
                    "qname": "o:35f536ab46e77928e3a2",
                    "typeQName": "ioCentro:unit"
                },
                "ingredient": {
                    "id": "fd3c78b87cff4132faeb",
                    "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/fd3c78b87cff4132faeb",
                    "title": "carnaroli rice",
                    "qname": "o:8c0b195349aaf48d7c5b",
                    "typeQName": "ioCentro:ingredient"
                }
            },
            {
                "quantity": "500",
                "unit": {
                    "id": "687187e326bd12c7a915",
                    "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/687187e326bd12c7a915",
                    "title": "gr",
                    "qname": "o:35f536ab46e77928e3a2",
                    "typeQName": "ioCentro:unit"
                },
                "ingredient": {
                    "id": "57ec87484c7f9a3a8841",
                    "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/57ec87484c7f9a3a8841",
                    "title": "vegetable stock",
                    "qname": "o:792464021127b7d5a794",
                    "typeQName": "ioCentro:ingredient"
                }
            },
            {
                "quantity": "150",
                "unit": {
                    "id": "687187e326bd12c7a915",
                    "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/687187e326bd12c7a915",
                    "title": "gr",
                    "qname": "o:35f536ab46e77928e3a2",
                    "typeQName": "ioCentro:unit"
                },
                "ingredient": {
                    "id": "9fd45d22e3401afb8f3c",
                    "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/9fd45d22e3401afb8f3c",
                    "title": "dry white wine",
                    "qname": "o:a43441ec3a72fc4ac140",
                    "typeQName": "ioCentro:ingredient"
                }
            }
        ],
        "recipeInstructions": [
            {
                "title": "Multiblade",
                "description": "<p>Insert the \"Multiblade\" into the bowl<br></p>",
                "image": {
                    "id": "00253f162de8cfd10827",
                    "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/00253f162de8cfd10827",
                    "title": "MultiBlade_accessories-thumb-smallX2.jpg",
                    "qname": "o:abb39e79ef1bdf2f6be8",
                    "typeQName": "ioCentro:image"
                },
                "applianceCommand": [
                    {
                        "deviceCommandCode": "CycleOperationSetOnDisplay",
                        "CycleOperationSetOnDisplay": {
                            "mainDeviceCommandParameter": "Mode",
                            "Mode": "CookProcModeManual",
                            "CookProcModeManual": {
                                "ProcessTimeSet": 50,
                                "TargetTemp": 40,
                                "MotorSpeed": "MotorSpeedOff",
                                "ScaleReset": "NoAction",
                                "Message": "See app for instructions",
                                "Icon": "CookProcIconNone",
                                "ProcessCompleteAction": "ProcessCmpltActionWaitForNextCommand"
                            }
                        }
                    }
                ]
            },
            {
                "title": "Onion, 90g, peeled and cut into 4",
                "description": "<p>Add onions, close the lid<br></p>",
                "image": {
                    "id": "d9bd827229c4bd1fc0d7",
                    "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/d9bd827229c4bd1fc0d7",
                    "title": "450-21832812-white-onion.jpg",
                    "qname": "o:7196d4146c9e9fe55608",
                    "typeQName": "ioCentro:image"
                },
                "applianceCommand": [
                    {
                        "deviceCommandCode": "CycleOperationSetOnDisplay",
                        "CycleOperationSetOnDisplay": {
                            "mainDeviceCommandParameter": "Mode",
                            "Mode": "CookProcModeWeigh",
                            "CookProcModeWeigh": {
                                "IncrementalAmount": 90,
                                "MotorSpeed": "MotorSpeedOff",
                                "ScaleReset": "NoAction",
                                "Message": "Add onions: 90g",
                                "Icon": "CookProcIconNone",
                                "ProcessCompleteAction": "ProcessCmpltActionWaitForNextCommand"
                            }
                        }
                    }
                ]
            },
            {
                "title": "Pulse",
                "description": "<p>Press and hold pulse for 5 seconds<br></p>",
                "image": {
                    "id": "9aea790f62cb95741c64",
                    "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/9aea790f62cb95741c64",
                    "title": "Cook processor.jpg",
                    "qname": "o:2a9943ce7b2d5196069d",
                    "typeQName": "ioCentro:image"
                },
                "applianceCommand": [
                    {
                        "deviceCommandCode": "CycleOperationSetOnDisplay",
                        "CycleOperationSetOnDisplay": {
                            "mainDeviceCommandParameter": "Mode",
                            "Mode": "CookProcModeManual",
                            "CookProcModeManual": {
                                "ProcessTimeSet": 30,
                                "TargetTemp": 40,
                                "MotorSpeed": "MotorSpeedOff",
                                "ScaleReset": "NoAction",
                                "Message": "See app for instructions",
                                "Icon": "CookProcIconNone",
                                "ProcessCompleteAction": "ProcessCmpltActionWaitForNextCommand"
                            }
                        }
                    }
                ]
            },
            {
                "title": "Stirassist",
                "description": "<p>Open and scrape down. Replace the \"MultiBlade\" with the \"StirAssist\"<br></p>",
                "image": {
                    "id": "79fd9ad8399024b11ca2",
                    "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/79fd9ad8399024b11ca2",
                    "title": "StirAssist_accessories-thumb-smallX2.jpg",
                    "qname": "o:a794d24f6ced53f1f48c",
                    "typeQName": "ioCentro:image"
                },
                "applianceCommand": [
                    {
                        "deviceCommandCode": "CycleOperationSetOnDisplay",
                        "CycleOperationSetOnDisplay": {
                            "mainDeviceCommandParameter": "Mode",
                            "Mode": "CookProcModeManual",
                            "CookProcModeManual": {
                                "ProcessTimeSet": 30,
                                "TargetTemp": 40,
                                "MotorSpeed": "MotorSpeedOff",
                                "ScaleReset": "NoAction",
                                "Message": "See app for instructions",
                                "Icon": "CookProcIconNone",
                                "ProcessCompleteAction": "ProcessCmpltActionWaitForNextCommand"
                            }
                        }
                    }
                ]
            },
            {
                "title": "Olive oil, 40ml",
                "description": "<p>Add the oil to the bowl. Close the lead but remove the measuring cup<br></p>",
                "image": {
                    "id": "a1eae06a3217c4e2800d",
                    "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/a1eae06a3217c4e2800d",
                    "title": "OliveOilBreadDip_article.jpg",
                    "qname": "o:923ae3fea4e56ba7ff71",
                    "typeQName": "ioCentro:image"
                },
                "applianceCommand": [
                    {
                        "deviceCommandCode": "CycleOperationSetOnDisplay",
                        "CycleOperationSetOnDisplay": {
                            "mainDeviceCommandParameter": "Mode",
                            "Mode": "CookProcModeManual",
                            "CookProcModeManual": {
                                "ProcessTimeSet": 30,
                                "TargetTemp": 40,
                                "MotorSpeed": "MotorSpeedOff",
                                "ScaleReset": "NoAction",
                                "Message": "See app for instructions",
                                "Icon": "CookProcIconNone",
                                "ProcessCompleteAction": "ProcessCmpltActionWaitForNextCommand"
                            }
                        }
                    }
                ]
            },
            {
                "title": "Cook",
                "description": "<p>Press start to begin cooking<br></p>",
                "applianceCommand": [
                    {
                        "deviceCommandCode": "CycleOperationSetOnDisplay",
                        "CycleOperationSetOnDisplay": {
                            "mainDeviceCommandParameter": "Mode",
                            "Mode": "CookProcModeRecipe",
                            "CookProcModeRecipe": {
                                "ProcessTimeSet": 120,
                                "TargetTemp": 110,
                                "MotorSpeed": "MotorSpeed02",
                                "ScaleReset": "NoAction",
                                "Message": "Press > to start",
                                "Icon": "CookProcIconNone",
                                "ProcessCompleteAction": "ProcessCmpltActionWaitForNextCommand"
                            }
                        }
                    }
                ]
            },
            {
                "title": "Carnaroli rice",
                "description": "<p>Add the rice to the bowl. Close the lid but remove the measuring cup<br></p>",
                "image": {
                    "id": "396e8ebca774ccfca669",
                    "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/396e8ebca774ccfca669",
                    "title": "800px_COLOURBOX5478449.jpg",
                    "qname": "o:63101565246516139701",
                    "typeQName": "ioCentro:image"
                },
                "applianceCommand": [
                    {
                        "deviceCommandCode": "CycleOperationSetOnDisplay",
                        "CycleOperationSetOnDisplay": {
                            "mainDeviceCommandParameter": "Mode",
                            "Mode": "CookProcModeWeigh",
                            "CookProcModeWeigh": {
                                "IncrementalAmount": 300,
                                "MotorSpeed": "MotorSpeedOff",
                                "ScaleReset": "NoAction",
                                "Icon": "CookProcIconNone",
                                "ProcessCompleteAction": "ProcessCmpltActionWaitForNextCommand"
                            }
                        }
                    }
                ]
            },
            {
                "title": "Cook",
                "description": "<p>Press start to begin cooking<br></p>",
                "applianceCommand": [
                    {
                        "deviceCommandCode": "CycleOperationSetOnDisplay",
                        "CycleOperationSetOnDisplay": {
                            "mainDeviceCommandParameter": "Mode",
                            "Mode": "CookProcModeRecipe",
                            "CookProcModeRecipe": {
                                "ProcessTimeSet": 180,
                                "TargetTemp": 110,
                                "MotorSpeed": "MotorSpeed02",
                                "ScaleReset": "NoAction",
                                "Message": "Press > to start",
                                "Icon": "CookProcIconNone",
                                "ProcessCompleteAction": "ProcessCmpltActionWaitForNextCommand"
                            }
                        }
                    }
                ]
            },
            {
                "title": "Dry white wine, 150ml",
                "description": "<p>Add the wine. Close the lid but remove the measuring cup<br></p>",
                "video": {
                    "id": "ec0e07947a556b75cc28",
                    "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/ec0e07947a556b75cc28",
                    "title": "Recipe Cooking with Wine.mp4",
                    "qname": "o:8f9c1ecbe24f4777ce8b",
                    "typeQName": "ioCentro:video"
                },
                "tips": "Discover how to select the best wine for cooking",
                "applianceCommand": [
                    {
                        "deviceCommandCode": "CycleOperationSetOnDisplay",
                        "CycleOperationSetOnDisplay": {
                            "mainDeviceCommandParameter": "Mode",
                            "Mode": "CookProcModeManual",
                            "CookProcModeManual": {
                                "ProcessTimeSet": 30,
                                "TargetTemp": 40,
                                "MotorSpeed": "MotorSpeedOff",
                                "ScaleReset": "NoAction",
                                "Message": "See app for instructions",
                                "Icon": "CookProcIconNone",
                                "ProcessCompleteAction": "ProcessCmpltActionWaitForNextCommand"
                            }
                        }
                    }
                ]
            },
            {
                "title": "Cook",
                "description": "<p>Press start to begin cooking<br></p>",
                "applianceCommand": [
                    {
                        "deviceCommandCode": "CycleOperationSetOnDisplay",
                        "CycleOperationSetOnDisplay": {
                            "mainDeviceCommandParameter": "Mode",
                            "Mode": "CookProcModeRecipe",
                            "CookProcModeRecipe": {
                                "ProcessTimeSet": 180,
                                "TargetTemp": 110,
                                "MotorSpeed": "MotorSpeed02",
                                "ScaleReset": "NoAction",
                                "Message": "Press > to start",
                                "Icon": "CookProcIconNone",
                                "ProcessCompleteAction": "ProcessCmpltActionWaitForNextCommand"
                            }
                        }
                    }
                ]
            },
            {
                "title": "Vegetable stock, 500ml",
                "description": "<p>Add the stock and close the lid without the measuring cup<br></p>",
                "applianceCommand": [
                    {
                        "deviceCommandCode": "CycleOperationSetOnDisplay",
                        "CycleOperationSetOnDisplay": {
                            "mainDeviceCommandParameter": "Mode",
                            "Mode": "CookProcModeManual",
                            "CookProcModeManual": {
                                "ProcessTimeSet": 30,
                                "TargetTemp": 40,
                                "MotorSpeed": "MotorSpeedOff",
                                "ScaleReset": "NoAction",
                                "Message": "See app for instructions",
                                "Icon": "CookProcIconNone",
                                "ProcessCompleteAction": "ProcessCmpltActionWaitForNextCommand"
                            }
                        }
                    }
                ]
            },
            {
                "title": "Cook",
                "description": "<p>Press start to begin cooking<br></p>",
                "applianceCommand": [
                    {
                        "deviceCommandCode": "CycleOperationSetOnDisplay",
                        "CycleOperationSetOnDisplay": {
                            "mainDeviceCommandParameter": "Mode",
                            "Mode": "CookProcModeRecipe",
                            "CookProcModeRecipe": {
                                "ProcessTimeSet": 900,
                                "TargetTemp": 100,
                                "MotorSpeed": "MotorSpeed02",
                                "ScaleReset": "NoAction",
                                "Icon": "CookProcIconNone",
                                "ProcessCompleteAction": "ProcessCmpltActionWaitForNextCommand"
                            }
                        }
                    }
                ]
            },
            {
                "title": "Farmhouse butter, 20g",
                "description": "<p>Add the butter<br></p>",
                "image": {
                    "id": "2d6c5e668c91dd473612",
                    "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/2d6c5e668c91dd473612",
                    "title": "butter-white-background-salt-isolated-49354961.jpg",
                    "qname": "o:4b1ba4b19d9c58a8e0d1",
                    "typeQName": "ioCentro:image"
                },
                "applianceCommand": [
                    {
                        "deviceCommandCode": "CycleOperationSetOnDisplay",
                        "CycleOperationSetOnDisplay": {
                            "mainDeviceCommandParameter": "Mode",
                            "Mode": "CookProcModeWeigh",
                            "CookProcModeWeigh": {
                                "IncrementalAmount": 20,
                                "MotorSpeed": "MotorSpeedOff",
                                "ScaleReset": "NoAction",
                                "Message": "Add butter, 20g",
                                "Icon": "CookProcIconNone",
                                "ProcessCompleteAction": "ProcessCmpltActionWaitForNextCommand"
                            }
                        }
                    }
                ]
            },
            {
                "title": "Parmesan shavings",
                "description": "<p>Add the parmesan cheese, close the lid<br></p>",
                "image": {
                    "id": "9d3433404ef4b4cb4e4b",
                    "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/9d3433404ef4b4cb4e4b",
                    "title": "stock-photo-shaved-parmesan-cheese-in-a-glass-bowl-the-image-is-a-cut-out-isolated-on-a-white-background-344943395.jpg",
                    "qname": "o:8b453a84b989e59fd035",
                    "typeQName": "ioCentro:image"
                },
                "applianceCommand": [
                    {
                        "deviceCommandCode": "CycleOperationSetOnDisplay",
                        "CycleOperationSetOnDisplay": {
                            "mainDeviceCommandParameter": "Mode",
                            "Mode": "CookProcModeWeigh",
                            "CookProcModeWeigh": {
                                "IncrementalAmount": 80,
                                "MotorSpeed": "MotorSpeedOff",
                                "ScaleReset": "NoAction",
                                "Message": "Parmesan cheese added",
                                "Icon": "CookProcIconNone",
                                "ProcessCompleteAction": "ProcessCmpltActionWaitForNextCommand"
                            }
                        }
                    }
                ]
            },
            {
                "title": "Stir",
                "description": "<p>Press start to begin cooking<br></p>",
                "applianceCommand": [
                    {
                        "deviceCommandCode": "CycleOperationSetOnDisplay",
                        "CycleOperationSetOnDisplay": {
                            "mainDeviceCommandParameter": "Mode",
                            "Mode": "CookProcModeRecipe",
                            "CookProcModeRecipe": {
                                "ProcessTimeSet": 60,
                                "TargetTemp": 40,
                                "MotorSpeed": "MotorSpeed01",
                                "ScaleReset": "NoAction",
                                "Icon": "CookProcIconNone",
                                "ProcessCompleteAction": "ProcessCmpltActionWaitForNextCommand"
                            }
                        }
                    }
                ]
            },
            {
                "title": "Serve",
                "description": "<p>Stir the content of the bowl manually if &nbsp;the cheese has not blended into the rice completely. Serve immediately</p>",
                "image": {
                    "id": "67012a3ece6930d08e47",
                    "ref": "node://4f19b8c98f3f8634ef42/057e43e53d4d4a905761/c90c2895385b33d92381/67012a3ece6930d08e47",
                    "title": "Risotto_wallpaperX2.jpg",
                    "qname": "o:525ac73fea455732f2ad",
                    "typeQName": "ioCentro:image"
                },
                "applianceCommand": []
            }
        ],
        "unconnectedInstructions": [
            {
                "title": "Step 1",
                "description": "<p>Insert the 'MultiBlade' into the bowl. Add the onion. Close the lid. Press Pulse for 5 seconds. Open and scrape down. Replace the 'MultiBlade' with the 'StirAssist'. Add the oil to the bowl. Close the lid but remove the measuring cup. Select STEW P9 and press Start. Step 1 shows on the display. Press Start to confirm.<br></p>"
            },
            {
                "title": "Step 2",
                "description": "<p>After Step 1: add the rice to the bowl. Close without the measuring cup and press Start to activate step 2.<br></p>"
            },
            {
                "title": "Step 3",
                "description": "<p>After Step 2: add the white wine. Close again and without the measuring cup and press Start to activate Step 3.<br></p>"
            },
            {
                "title": "Step 4",
                "description": "<p>After Step 3: add the stock. Close without the measuring cup and press Start to activate Step 4.<br></p>"
            },
            {
                "title": "Step 5",
                "description": "<p>After Step 4: press cancel to exit keep warm mode. Add the butter and Parmesan. Close the lid. Set the speed to 1 and leave the machine to run for one minute. Stir the contents of the bowl manually if the cheese has not blended into the rice completely. Serve immediately.<br></p>"
            },
            {
                "title": "TIP",
                "description": "<p>Another option is to add vegetables or jumbo shrimp at step 3 (after Step 2).<br></p>"
            }
        ]
    };

    $("#form").alpaca({
        "connector": {
            "id": "cloudcms",
            "config": KITCHEN_AID_DEV
        },
        "schema": kitchenAidCookProcessorDefinitions,
        // "schemaSource": "ioCentro:multiRecipe",
        "data": kitchenAidCookProcessorDocument, // choose one data from constant above
        // "dataSource": "dd280a33360a4e554f94",  // source from => http://iot-dev-2.adbitaly.com/#/projects/bc8cc6ec71977b5b0dab/documents/dd280a33360a4e554f94
        // "dataSource": "5cbe4c25aff57d885cf7", // => http://content.iot.adbglobal.com/#/projects/7b29406abd9764b5a964/documents/5cbe4c25aff57d885cf7
        "options": kitchenAidCookProcessorForm, // => local configuration defined above
        // "optionsSource": "MultiRecipe", // => remote link to a form in the CMS, for more details see http://alpacajs.org/docs/api/connectors.html
        "view": "bootstrap-edit"
    });
});