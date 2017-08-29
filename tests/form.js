define(["jquery", "alpaca", "bootstrap"], function($) {
    $("#form").alpaca({
        "connector": {
            "id": "cloudcms",
            "config": CLOUDCMS_CONFIG
        },
        "schemaSource": "ioCentro:multiRecipe",
        "dataSource": "1c96a81038cc9c977abe",
        "optionsSource": "MultiRecipe",
        "view": "bootstrap-edit"
    });
})