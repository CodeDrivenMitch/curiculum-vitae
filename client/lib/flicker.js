$.fn.flicker = function(opts) {
    var default_ops = { action: "start", wait: 650, cssProperty: "opacity", cssValue: "0" };
    var currentColor;

    if(typeof opts !== "string") {
        opts = $.extend(default_ops, opts);
    } else {
        default_ops.action = opts;
        opts = default_ops;
    }

    var _flicker = function($el, callback) {
        var toAnimate = {};
        toAnimate[opts.cssProperty] = opts.cssValue;
        $el.animate(toAnimate, opts.wait, function() {
            toAnimate[opts.cssProperty] = currentColor;
            $el.animate(toAnimate, opts.wait);
        });
    };

    return this.each(function() {
        var $el = $(this);
        if(opts.action !== "stop") {
            currentColor = $el.css(opts.cssProperty);
            _flicker($el);
            if(opts.action !== "once") {
                var intervalId = setInterval(function() { _flicker($el); }, opts.wait * 2);
                $el.data("_interval", intervalId);
            }
        } else {
            var finish = $el.finish || $el.stop;
            clearInterval(finish.call($el, true).data("_interval"));
        }
    });
};