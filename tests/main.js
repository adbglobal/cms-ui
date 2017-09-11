require.config({
    "baseUrl": '../',
    "packages": [{
            "name": "jquery",
            "location": "tests/vendor/jquery/dist",
            "main": "jquery.min"
        },
        {
            "name": "handlebars",
            "location": "tests/vendor/handlebars",
            "main": "handlebars"
        },
        {
            "name": "bootstrap",
            "location": "tests/vendor/bootstrap/dist/js",
            "main": "bootstrap"
        },
        {
            "name": "gitana",
            "location": "tests/vendor/gitana/dist",
            "main": "gitana"
        },
        {
            "name": "alpaca",
            "location": "tests/vendor/alpaca/build/alpaca/bootstrap",
            "main": "alpaca"
        },
        {
            "name": "form",
            "main": "../tests/form"
        },
        {
            "name": "cms-ui",
            "main": "../tests/index"
        },
        {
            "name": "ui",
            "main": "../tests/mock-ui"
        }
    ],
    "shim": {
        "bootstrap": ["jquery"],
        "jquery": [],
        "handlebars": {
            "exports": "Handlebars"
        }
    }
});

require(["form"], function() {
    // all done
});