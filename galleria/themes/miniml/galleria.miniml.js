/**
 * @preserve Galleria Miniml Theme 2011-02-14
 * http://galleria.aino.se
 *
 * Copyright (c) 2011, Aino
 * Licensed under the MIT license.
 */
 
/*global jQuery, Galleria */

(function($) {

Galleria.addTheme({
    name: 'miniml',
    author: 'Galleria',
    css: 'galleria.miniml.css',
    defaults: {
        transition: "pulse",
        thumbCrop: true,
        imageCrop: true,
        carousel: false,
        imagePan: true,
        clicknext: true,
        _locale: {
            enter_fullscreen: "Enter fullscreen",
            exit_fullscreen: "Exit fullscreen",
            click_to_close: "Click to close",
            show_thumbnails: "Show thumbnails",
            show_info: "Show info"
        }
    },
    init: function (s) {
        var t = this,
            M = false,
            N;
        N = 0;
        var I, Y, W;
        this.addElement("desc", "dots", "thumbs", "fs", "more");
        this.append({
            container: ["desc", "dots", "thumbs", "fs", "info-description", "more"]
        });
        W = this.$("thumbnails-container").hide().css("visibility", "visible");
        for (N = 0; N < this.getDataLength(); N++) this.$("dots").append($("<div>").click(function (Q) {
            return function (Z) {
                Z.preventDefault();
                t.show(Q)
            }
        }(N)));
        N = this.$("dots").outerWidth();
        I = this.$("desc").hide().hover(function () {
            $(this).addClass("hover")
        }, function () {
            $(this).removeClass("hover")
        }).click(function () {
            $(this).hide()
        });
        Y = this.$("loader");
        this.bindTooltip({
            fs: function () {
                return M ? s._locale.exit_fullscreen : s._locale.enter_fullscreen
            },
            desc: s._locale.click_to_close,
            more: s._locale.show_info,
            thumbs: s._locale.show_thumbnails
        });
        this.bind("loadstart", function (Q) {
            Q.cached || this.$("loader").show().fadeTo(200, 0.4)
        });
        this.bind("loadfinish", function (Q) {
            var Z = t.getData().title,
                ga = t.getData().description;
            I.hide();
            Y.fadeOut(200);
            this.$("dots").children("div").eq(Q.index).addClass("active").siblings(".active").removeClass("active");
            if (Z && ga) {
                I.empty().append("<strong>" + Z + "</strong>", "<p>" + ga + "</p>").css({
                    marginTop: this.$("desc").outerHeight() / -2
                });
                this.$("more").show()
            } else this.$("more").hide();
            W.fadeOut(s.fadeSpeed);
            t.$("thumbs").removeClass("active")
        });
        this.bind("thumbnail", function (Q) {
            $(Q.thumbTarget).hover(function () {
                t.setInfo(Q.index)
            }, function () {
                t.setInfo()
            })
        });
        this.$("fs").click(function () {
            t.toggleFullscreen();
            M = !M
        });
        this.$("thumbs").click(function (Q) {
            Q.preventDefault();
            W.toggle();
            $(this).toggleClass("active");
            I.hide()
        });
        this.$("more").click(function () {
            I.toggle()
        });
        this.$("info").css({
            width: this.getStageWidth() - N - 30,
            left: N + 10
        })
    }
});

}(jQuery));