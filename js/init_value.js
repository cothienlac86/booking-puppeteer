require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }

    var $ = require("jquery")(window);

    $('#From').val('HAN');
    $('#To').val('SIN');
});