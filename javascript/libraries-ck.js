/*!
 * GMaps.js v0.3.1
 * http://hpneo.github.com/gmaps/
 *
 * Copyright 2012, Gustavo Leon
 * Released under the MIT License.
 */
/*

/*! fancyBox v2.1.4 fancyapps.com | fancyapps.com/fancybox/#license 
	*fancyBox Multi Domain License, 
	*License Name: Paulina Hetman	
*/
/* jQuery FlexSlider v2.1
 * http://www.woothemes.com/flexslider/
 *
 * Copyright 2012 WooThemes
 * Free to use under the GPLv2 license.
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Contributing author: Tyler Smith (@mbmufffin)
 */
(function(e, t, n, r) {
    var i = n(e),
        s = n(t),
        o = n.fancybox = function() {
            o.open.apply(this, arguments)
        },
        u = navigator.userAgent.match(/msie/),
        a = null,
        f = t.createTouch !== r,
        l = function(e) {
            return e && e.hasOwnProperty && e instanceof n
        },
        c = function(e) {
            return e && "string" === n.type(e)
        },
        h = function(e) {
            return c(e) && 0 < e.indexOf("%")
        },
        p = function(e, t) {
            var n = parseInt(e, 10) || 0;
            t && h(e) && (n *= o.getViewport()[t] / 100);
            return Math.ceil(n)
        },
        d = function(e, t) {
            return p(e, t) + "px"
        };
    n.extend(o, {
        version: "2.1.4",
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            autoSize: !0,
            autoHeight: !1,
            autoWidth: !1,
            autoResize: !0,
            autoCenter: !f,
            fitToView: !0,
            aspectRatio: !1,
            topRatio: .5,
            leftRatio: .5,
            scrolling: "auto",
            wrapCSS: "",
            arrows: !0,
            closeBtn: !0,
            closeClick: !1,
            nextClick: !1,
            mouseWheel: !0,
            autoPlay: !1,
            playSpeed: 3e3,
            preload: 3,
            modal: !1,
            loop: !0,
            ajax: {
                dataType: "html",
                headers: {
                    "X-fancyBox": !0
                }
            },
            iframe: {
                scrolling: "auto",
                preload: !0
            },
            swf: {
                wmode: "transparent",
                allowfullscreen: "true",
                allowscriptaccess: "always"
            },
            keys: {
                next: {
                    13: "left",
                    34: "up",
                    39: "left",
                    40: "up"
                },
                prev: {
                    8: "right",
                    33: "down",
                    37: "right",
                    38: "down"
                },
                close: [27],
                play: [32],
                toggle: [70]
            },
            direction: {
                next: "left",
                prev: "right"
            },
            scrollOutside: !0,
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (u ? ' allowtransparency="true"' : "") + "></iframe>",
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },
            openEffect: "fade",
            openSpeed: 250,
            openEasing: "swing",
            openOpacity: !0,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 250,
            closeEasing: "swing",
            closeOpacity: !0,
            closeMethod: "zoomOut",
            nextEffect: "elastic",
            nextSpeed: 250,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "elastic",
            prevSpeed: 250,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: {
                overlay: !0,
                title: !0
            },
            onCancel: n.noop,
            beforeLoad: n.noop,
            afterLoad: n.noop,
            beforeShow: n.noop,
            afterShow: n.noop,
            beforeChange: n.noop,
            beforeClose: n.noop,
            afterClose: n.noop
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: !1,
        isOpen: !1,
        isOpened: !1,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {
            timer: null,
            isActive: !1
        },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function(e, t) {
            if (e && (n.isPlainObject(t) || (t = {}), !1 !== o.close(!0))) return n.isArray(e) || (e = l(e) ? n(e).get() : [e]), n.each(e, function(i, s) {
                var u = {},
                    a, f, h, p, d;
                "object" === n.type(s) && (s.nodeType && (s = n(s)), l(s) ? (u = {
                    href: s.data("fancybox-href") || s.attr("href"),
                    title: s.data("fancybox-title") || s.attr("title"),
                    isDom: !0,
                    element: s
                }, n.metadata && n.extend(!0, u, s.metadata())) : u = s);
                a = t.href || u.href || (c(s) ? s : null);
                f = t.title !== r ? t.title : u.title || "";
                p = (h = t.content || u.content) ? "html" : t.type || u.type;
                !p && u.isDom && (p = s.data("fancybox-type"), p || (p = (p = s.prop("class").match(/fancybox\.(\w+)/)) ? p[1] : null));
                c(a) && (p || (o.isImage(a) ? p = "image" : o.isSWF(a) ? p = "swf" : "#" === a.charAt(0) ? p = "inline" : c(s) && (p = "html", h = s)), "ajax" === p && (d = a.split(/\s+/, 2), a = d.shift(), d = d.shift()));
                h || ("inline" === p ? a ? h = n(c(a) ? a.replace(/.*(?=#[^\s]+$)/, "") : a) : u.isDom && (h = s) : "html" === p ? h = a : !p && !a && u.isDom && (p = "inline", h = s));
                n.extend(u, {
                    href: a,
                    type: p,
                    content: h,
                    title: f,
                    selector: d
                });
                e[i] = u
            }), o.opts = n.extend(!0, {}, o.defaults, t), t.keys !== r && (o.opts.keys = t.keys ? n.extend({}, o.defaults.keys, t.keys) : !1), o.group = e, o._start(o.opts.index)
        },
        cancel: function() {
            var e = o.coming;
            e && !1 !== o.trigger("onCancel") && (o.hideLoading(), o.ajaxLoad && o.ajaxLoad.abort(), o.ajaxLoad = null, o.imgPreload && (o.imgPreload.onload = o.imgPreload.onerror = null), e.wrap && e.wrap.stop(!0, !0).trigger("onReset").remove(), o.coming = null, o.current || o._afterZoomOut(e))
        },
        close: function(e) {
            o.cancel();
            !1 !== o.trigger("beforeClose") && (o.unbindEvents(), o.isActive && (!o.isOpen || !0 === e ? (n(".fancybox-wrap").stop(!0).trigger("onReset").remove(), o._afterZoomOut()) : (o.isOpen = o.isOpened = !1, o.isClosing = !0, n(".fancybox-item, .fancybox-nav").remove(), o.wrap.stop(!0, !0).removeClass("fancybox-opened"), o.transitions[o.current.closeMethod]())))
        },
        play: function(e) {
            var t = function() {
                    clearTimeout(o.player.timer)
                },
                r = function() {
                    t();
                    o.current && o.player.isActive && (o.player.timer = setTimeout(o.next, o.current.playSpeed))
                },
                i = function() {
                    t();
                    n("body").unbind(".player");
                    o.player.isActive = !1;
                    o.trigger("onPlayEnd")
                };
            !0 === e || !o.player.isActive && !1 !== e ? o.current && (o.current.loop || o.current.index < o.group.length - 1) && (o.player.isActive = !0, n("body").bind({
                "afterShow.player onUpdate.player": r,
                "onCancel.player beforeClose.player": i,
                "beforeLoad.player": t
            }), r(), o.trigger("onPlayStart")) : i()
        },
        next: function(e) {
            var t = o.current;
            t && (c(e) || (e = t.direction.next), o.jumpto(t.index + 1, e, "next"))
        },
        prev: function(e) {
            var t = o.current;
            t && (c(e) || (e = t.direction.prev), o.jumpto(t.index - 1, e, "prev"))
        },
        jumpto: function(e, t, n) {
            var i = o.current;
            i && (e = p(e), o.direction = t || i.direction[e >= i.index ? "next" : "prev"], o.router = n || "jumpto", i.loop && (0 > e && (e = i.group.length + e % i.group.length), e %= i.group.length), i.group[e] !== r && (o.cancel(), o._start(e)))
        },
        reposition: function(e, t) {
            var r = o.current,
                i = r ? r.wrap : null,
                s;
            i && (s = o._getPosition(t), e && "scroll" === e.type ? (delete s.position, i.stop(!0, !0).animate(s, 200)) : (i.css(s), r.pos = n.extend({}, r.dim, s)))
        },
        update: function(e) {
            var t = e && e.type,
                n = !t || "orientationchange" === t;
            n && (clearTimeout(a), a = null);
            o.isOpen && !a && (a = setTimeout(function() {
                var r = o.current;
                r && !
                    o.isClosing && (o.wrap.removeClass("fancybox-tmp"), (n || "load" === t || "resize" === t && r.autoResize) && o._setDimension(), "scroll" === t && r.canShrink || o.reposition(e), o.trigger("onUpdate"), a = null)
            }, n && !f ? 0 : 300))
        },
        toggle: function(e) {
            o.isOpen && (o.current.fitToView = "boolean" === n.type(e) ? e : !o.current.fitToView, f && (o.wrap.removeAttr("style").addClass("fancybox-tmp"), o.trigger("onUpdate")), o.update())
        },
        hideLoading: function() {
            s.unbind(".loading");
            n("#fancybox-loading").remove()
        },
        showLoading: function() {
            var e, t;
            o.hideLoading();
            e = n('<div id="fancybox-loading"><div></div></div>').click(o.cancel).appendTo("body");
            s.bind("keydown.loading", function(e) {
                27 === (e.which || e.keyCode) && (e.preventDefault(), o.cancel())
            });
            o.defaults.fixed || (t = o.getViewport(), e.css({
                position: "absolute",
                top: .5 * t.h + t.y,
                left: .5 * t.w + t.x
            }))
        },
        getViewport: function() {
            var t = o.current && o.current.locked || !1,
                n = {
                    x: i.scrollLeft(),
                    y: i.scrollTop()
                };
            t ? (n.w = t[0].clientWidth, n.h = t[0].clientHeight) : (n.w = f && e.innerWidth ? e.innerWidth : i.width(), n.h = f && e.innerHeight ? e.innerHeight : i.height());
            return n
        },
        unbindEvents: function() {
            o.wrap && l(o.wrap) && o.wrap.unbind(".fb");
            s.unbind(".fb");
            i.unbind(".fb")
        },
        bindEvents: function() {
            var e = o.current,
                t;
            e && (i.bind("orientationchange.fb" + (f ? "" : " resize.fb") + (e.autoCenter && !e.locked ? " scroll.fb" : ""), o.update), (t = e.keys) && s.bind("keydown.fb", function(i) {
                var s = i.which || i.keyCode,
                    u = i.target || i.srcElement;
                if (27 === s && o.coming) return !1;
                !i.ctrlKey && !i.altKey && !i.shiftKey && !i.metaKey && (!u || !u.type && !n(u).is("[contenteditable]")) && n.each(t, function(t, u) {
                    if (1 < e.group.length && u[s] !== r) return o[t](u[s]), i.preventDefault(), !1;
                    if (-1 < n.inArray(s, u)) return o[t](), i.preventDefault(), !1
                })
            }), n.fn.mousewheel && e.mouseWheel && o.wrap.bind("mousewheel.fb", function(t, r, i, s) {
                for (var u = n(t.target || null), a = !1; u.length && !a && !u.is(".fancybox-skin") && !u.is(".fancybox-wrap");) a = u[0] && (!u[0].style.overflow || "hidden" !== u[0].style.overflow) && (u[0].clientWidth && u[0].scrollWidth > u[0].clientWidth || u[0].clientHeight && u[0].scrollHeight > u[0].clientHeight), u = n(u).parent();
                if (0 !== r && !a && 1 < o.group.length && !e.canShrink) {
                    0 < s || 0 < i ? o.prev(0 < s ? "down" : "left") : (0 > s || 0 > i) && o.next(0 > s ? "up" : "right");
                    t.preventDefault()
                }
            }))
        },
        trigger: function(e, t) {
            var r, i = t || o.coming || o.current;
            if (i) {
                n.isFunction(i[e]) && (r = i[e].apply(i, Array.prototype.slice.call(arguments, 1)));
                if (!1 === r) return !1;
                i.helpers && n.each(i.helpers, function(t, r) {
                    r && o.helpers[t] && n.isFunction(o.helpers[t][e]) && (r = n.extend(!0, {}, o.helpers[t].defaults, r), o.helpers[t][e](r, i))
                });
                n.event.trigger(e + ".fb")
            }
        },
        isImage: function(e) {
            return c(e) && e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp)((\?|#).*)?$)/i)
        },
        isSWF: function(e) {
            return c(e) && e.match(/\.(swf)((\?|#).*)?$/i)
        },
        _start: function(e) {
            var t = {},
                r, i;
            e = p(e);
            r = o.group[e] || null;
            if (!r) return !1;
            t = n.extend(!0, {}, o.opts, r);
            r = t.margin;
            i = t.padding;
            "number" === n.type(r) && (t.margin = [r, r, r, r]);
            "number" === n.type(i) && (t.padding = [i, i, i, i]);
            t.modal && n.extend(!0, t, {
                closeBtn: !1,
                closeClick: !1,
                nextClick: !1,
                arrows: !1,
                mouseWheel: !1,
                keys: null,
                helpers: {
                    overlay: {
                        closeClick: !1
                    }
                }
            });
            t.autoSize && (t.autoWidth = t.autoHeight = !0);
            "auto" === t.width && (t.autoWidth = !0);
            "auto" === t.height && (t.autoHeight = !0);
            t.group = o.group;
            t.index = e;
            o.coming = t;
            if (!1 === o.trigger("beforeLoad")) o.coming = null;
            else {
                i = t.type;
                r = t.href;
                if (!i) return o.coming = null, o.current && o.router && "jumpto" !== o.router ? (o.current.index = e, o[o.router](o.direction)) : !1;
                o.isActive = !0;
                if ("image" === i || "swf" === i) t.autoHeight = t.autoWidth = !1, t.scrolling = "visible";
                "image" === i && (t.aspectRatio = !0);
                "iframe" === i && f && (t.scrolling = "scroll");
                t.wrap = n(t.tpl.wrap).addClass("fancybox-" + (f ? "mobile" : "desktop") + " fancybox-type-" + i + " fancybox-tmp " + t.wrapCSS).appendTo(t.parent || "body");
                n.extend(t, {
                    skin: n(".fancybox-skin", t.wrap),
                    outer: n(".fancybox-outer", t.wrap),
                    inner: n(".fancybox-inner", t.wrap)
                });
                n.each(["Top", "Right", "Bottom", "Left"], function(e, n) {
                    t.skin.css("padding" + n, d(t.padding[e]))
                });
                o.trigger("onReady");
                if ("inline" === i || "html" === i) {
                    if (!t.content || !t.content.length) return o._error("content")
                } else if (!r) return o._error("href");
                "image" === i ? o._loadImage() : "ajax" === i ? o._loadAjax() : "iframe" === i ? o._loadIframe() : o._afterLoad()
            }
        },
        _error: function(e) {
            n.extend(o.coming, {
                type: "html",
                autoWidth: !0,
                autoHeight: !0,
                minWidth: 0,
                minHeight: 0,
                scrolling: "no",
                hasError: e,
                content: o.coming.tpl.error
            });
            o._afterLoad()
        },
        _loadImage: function() {
            var e = o.imgPreload = new Image;
            e.onload = function() {
                this.onload = this.onerror = null;
                o.coming.width = this.width;
                o.coming.height = this.height;
                o._afterLoad()
            };
            e.onerror = function() {
                this.onload = this.onerror = null;
                o._error("image")
            };
            e.src = o.coming.href;
            !0 !== e.complete && o.showLoading()
        },
        _loadAjax: function() {
            var e = o.coming;
            o.showLoading();
            o.ajaxLoad = n.ajax(n.extend({}, e.ajax, {
                url: e.href,
                error: function(e, t) {
                    o.coming && "abort" !== t ? o._error("ajax", e) : o.hideLoading()
                },
                success: function(t, n) {
                    "success" === n && (e.content = t, o._afterLoad())
                }
            }))
        },
        _loadIframe: function() {
            var e = o.coming,
                t = n(e.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", f ? "auto" : e.iframe.scrolling).attr("src", e.href);
            n(e.wrap).bind("onReset", function() {
                try {
                    n(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                } catch (e) {}
            });
            e.iframe.preload && (o.showLoading(), t.one("load", function() {
                n(this).data("ready", 1);
                f || n(this).bind("load.fb", o.update);
                n(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();
                o._afterLoad()
            }));
            e.content = t.appendTo(e.inner);
            e.iframe.preload || o._afterLoad()
        },
        _preloadImages: function() {
            var e = o.group,
                t = o.current,
                n = e.length,
                r = t.preload ? Math.min(t.preload, n - 1) : 0,
                i, s;
            for (s = 1; s <= r; s += 1) i = e[(t.index + s) % n], "image" === i.type && i.href && ((new Image).src = i.href)
        },
        _afterLoad: function() {
            var e = o.coming,
                t = o.current,
                r, i, s, u, a;
            o.hideLoading();
            if (e && !1 !== o.isActive)
                if (!1 === o.trigger("afterLoad", e, t)) e.wrap.stop(!0).trigger("onReset").remove(), o.coming = null;
                else {
                    t && (o.trigger("beforeChange", t), t.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());
                    o.unbindEvents();
                    r = e.content;
                    i = e.type;
                    s = e.scrolling;
                    n.extend(o, {
                        wrap: e.wrap,
                        skin: e.skin,
                        outer: e.outer,
                        inner: e.inner,
                        current: e,
                        previous: t
                    });
                    u = e.href;
                    switch (i) {
                        case "inline":
                        case "ajax":
                        case "html":
                            e.selector ? r = n("<div>").html(r).find(e.selector) : l(r) && (r.data("fancybox-placeholder") || r.data("fancybox-placeholder", n('<div class="fancybox-placeholder"></div>').insertAfter(r).hide()), r = r.show().detach(), e.wrap.bind("onReset", function() {
                                n(this).find(r).length && r.hide().replaceAll(r.data("fancybox-placeholder")).data("fancybox-placeholder", !1)
                            }));
                            break;
                        case "image":
                            r = e.tpl.image.replace("{href}", u);
                            break;
                        case "swf":
                            r = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + u + '"></param>', a = "", n.each(e.swf, function(e, t) {
                                r += '<param name="' + e + '" value="' + t + '"></param>';
                                a += " " + e + '="' + t + '"'
                            }), r += '<embed src="' + u + '" type="application/x-shockwave-flash" width="100%" height="100%"' + a + "></embed></object>"
                    }(!l(r) || !r.parent().is(e.inner)) && e.inner.append(r);
                    o.trigger("beforeShow");
                    e.inner.css("overflow", "yes" === s ? "scroll" : "no" === s ? "hidden" : s);
                    o._setDimension();
                    o.reposition();
                    o.isOpen = !1;
                    o.coming = null;
                    o.bindEvents();
                    o.isOpened ? t.prevMethod && o.transitions[t.prevMethod]() : n(".fancybox-wrap").not(e.wrap).stop(!0).trigger("onReset").remove();
                    o.transitions[o.isOpened ? e.nextMethod : e.openMethod]();
                    o._preloadImages()
                }
        },
        _setDimension: function() {
            var e = o.getViewport(),
                t = 0,
                r = !1,
                i = !1,
                r = o.wrap,
                s = o.skin,
                u = o.inner,
                a = o.current,
                i = a.width,
                f = a.height,
                l = a.minWidth,
                c = a.minHeight,
                v = a.maxWidth,
                m = a.maxHeight,
                g = a.scrolling,
                y = a.scrollOutside ? a.scrollbarWidth : 0,
                w = a.margin,
                E = p(w[1] + w[3]),
                S = p(w[0] + w[2]),
                T, N, C, k, L, A, O, M, _;
            r.add(s).add(u).width("auto").height("auto").removeClass("fancybox-tmp");
            w = p(s.outerWidth(!0) - s.width());
            T = p(s.outerHeight(!0) - s.height());
            N = E + w;
            C = S + T;
            k = h(i) ? (e.w - N) * p(i) / 100 : i;
            L = h(f) ? (e.h - C) * p(f) / 100 : f;
            if ("iframe" === a.type) {
                if (_ = a.content, a.autoHeight && 1 === _.data("ready")) try {
                    _[0].contentWindow.document.location && (u.width(k).height(9999), A = _.contents().find("body"), y && A.css("overflow-x", "hidden"), L = A.height())
                } catch (D) {}
            } else if (a.autoWidth || a.autoHeight) u.addClass("fancybox-tmp"), a.autoWidth || u.width(k), a.autoHeight || u.height(L), a.autoWidth && (k = u.width()), a.autoHeight && (L = u.height()), u.removeClass("fancybox-tmp");
            i = p(k);
            f = p(L);
            M = k / L;
            l = p(h(l) ? p(l, "w") - N : l);
            v = p(h(v) ? p(v, "w") - N : v);
            c = p(h(c) ? p(c, "h") - C : c);
            m = p(h(m) ? p(m, "h") - C : m);
            A = v;
            O = m;
            a.fitToView && (v = Math.min(e.w - N, v), m = Math.min(e.h - C, m));
            N = e.w - E;
            S = e.h - S;
            a.aspectRatio ? (i > v && (i = v, f = p(i / M)), f > m && (f = m, i = p(f * M)), i < l && (i = l, f = p(i / M)), f < c && (f = c, i = p(f * M))) : (i = Math.max(l, Math.min(i, v)), a.autoHeight && "iframe" !== a.type && (u.width(i), f = u.height()), f = Math.max(c, Math.min(f, m)));
            if (a.fitToView)
                if (u.width(i).height(f), r.width(i + w), e = r.width(), E = r.height(), a.aspectRatio)
                    for (;
                        (e > N || E > S) && i > l && f > c && !(19 < t++);) f = Math.max(c, Math.min(m, f - 10)), i = p(f * M), i < l && (i = l, f = p(i / M)), i > v && (i = v, f = p(i / M)), u.width(i).height(f), r.width(i + w), e = r.width(), E = r.height();
                else i = Math.max(l, Math.min(i, i - (e - N))), f = Math.max(c, Math.min(f, f - (E - S)));
            y && "auto" === g && f < L && i + w + y < N && (i += y);
            u.width(i).height(f);
            r.width(i + w);
            e = r.width();
            E = r.height();
            r = (e > N || E > S) && i > l && f > c;
            i = a.aspectRatio ? i < A && f < O && i < k && f < L : (i < A || f < O) && (i < k || f < L);
            n.extend(a, {
                dim: {
                    width: d(e),
                    height: d(E)
                },
                origWidth: k,
                origHeight: L,
                canShrink: r,
                canExpand: i,
                wPadding: w,
                hPadding: T,
                wrapSpace: E - s.outerHeight(!0),
                skinSpace: s.height() - f
            });
            !_ && a.autoHeight && f > c && f < m && !i && u.height("auto")
        },
        _getPosition: function(e) {
            var t = o.current,
                n = o.getViewport(),
                r = t.margin,
                i = o.wrap.width() + r[1] + r[3],
                s = o.wrap.height() + r[0] + r[2],
                r = {
                    position: "absolute",
                    top: r[0],
                    left: r[3]
                };
            t.autoCenter && t.fixed && !e && s <= n.h && i <= n.w ? r.position = "fixed" : t.locked || (r.top += n.y, r.left += n.x);
            r.top = d(Math.max(r.top, r.top + (n.h - s) * t.topRatio));
            r.left = d(Math.max(r.left, r.left + (n.w - i) * t.leftRatio));
            return r
        },
        _afterZoomIn: function() {
            var e = o.current;
            e && (o.isOpen = o.isOpened = !0, o.wrap.css("overflow", "visible").addClass("fancybox-opened"), o.update(), (e.closeClick || e.nextClick && 1 < o.group.length) && o.inner.css("cursor", "pointer").bind("click.fb", function(t) {
                !n(t.target).is("a") && !n(t.target).parent().is("a") && (t.preventDefault(), o[e.closeClick ? "close" : "next"]())
            }), e.closeBtn && n(e.tpl.closeBtn).appendTo(o.skin).bind("click.fb", function(e) {
                e.preventDefault();
                o.close()
            }), e.arrows && 1 < o.group.length && ((e.loop || 0 < e.index) && n(e.tpl.prev).appendTo(o.outer).bind("click.fb", o.prev), (e.loop || e.index < o.group.length - 1) && n(e.tpl.next).appendTo(o.outer).bind("click.fb", o.next)), o.trigger("afterShow"), !e.loop && e.index === e.group.length - 1 ? o.play(!1) : o.opts.autoPlay && !o.player.isActive && (o.opts.autoPlay = !1, o.play()))
        },
        _afterZoomOut: function(e) {
            e = e || o.current;
            n(".fancybox-wrap").trigger("onReset").remove();
            n.extend(o, {
                group: {},
                opts: {},
                router: !1,
                current: null,
                isActive: !1,
                isOpened: !1,
                isOpen: !1,
                isClosing: !1,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            });
            o.trigger("afterClose", e)
        }
    });
    o.transitions = {
        getOrigPosition: function() {
            var e = o.current,
                t = e.element,
                n = e.orig,
                r = {},
                i = 50,
                s = 50,
                u = e.hPadding,
                a = e.wPadding,
                f = o.getViewport();
            !n && e.isDom && t.is(":visible") && (n = t.find("img:first"), n.length || (n = t));
            l(n) ? (r = n.offset(), n.is("img") && (i = n.outerWidth(), s = n.outerHeight())) : (r.top = f.y + (f.h - s) * e.topRatio, r.left = f.x + (f.w - i) * e.leftRatio);
            if ("fixed" === o.wrap.css("position") || e.locked) r.top -= f.y, r.left -= f.x;
            return r = {
                top: d(r.top - u * e.topRatio),
                left: d(r.left - a * e.leftRatio),
                width: d(i + a),
                height: d(s + u)
            }
        },
        step: function(e, t) {
            var n, r, i = t.prop;
            r = o.current;
            var s = r.wrapSpace,
                u = r.skinSpace;
            if ("width" === i || "height" === i) n = t.end === t.start ? 1 : (e - t.start) / (t.end - t.start), o.isClosing && (n = 1 - n), r = "width" === i ? r.wPadding : r.hPadding, r = e - r, o.skin[i](p("width" === i ? r : r - s * n)), o.inner[i](p("width" === i ? r : r - s * n - u * n))
        },
        zoomIn: function() {
            var e = o.current,
                t = e.pos,
                r = e.openEffect,
                i = "elastic" === r,
                s = n.extend({
                    opacity: 1
                }, t);
            delete s.position;
            i ? (t = this.getOrigPosition(), e.openOpacity && (t.opacity = .1)) : "fade" === r && (t.opacity = .1);
            o.wrap.css(t).animate(s, {
                duration: "none" === r ? 0 : e.openSpeed,
                easing: e.openEasing,
                step: i ? this.step : null,
                complete: o._afterZoomIn
            })
        },
        zoomOut: function() {
            var e = o.current,
                t = e.closeEffect,
                n = "elastic" === t,
                r = {
                    opacity: .1
                };
            n && (r = this.getOrigPosition(), e.closeOpacity && (r.opacity = .1));
            o.wrap.animate(r, {
                duration: "none" === t ? 0 : e.closeSpeed,
                easing: e.closeEasing,
                step: n ? this.step : null,
                complete: o._afterZoomOut
            })
        },
        changeIn: function() {
            var e = o.current,
                t = e.nextEffect,
                n = e.pos,
                r = {
                    opacity: 1
                },
                i = o.direction,
                s;
            n.opacity = .1;
            "elastic" === t && (s = "down" === i || "up" === i ? "top" : "left", "down" === i || "right" === i ? (n[s] = d(p(n[s]) - 200), r[s] = "+=200px") : (n[s] = d(p(n[s]) + 200), r[s] = "-=200px"));
            "none" === t ? o._afterZoomIn() : o.wrap.css(n).animate(r, {
                duration: e.nextSpeed,
                easing: e.nextEasing,
                complete: o._afterZoomIn
            })
        },
        changeOut: function() {
            var e = o.previous,
                t = e.prevEffect,
                r = {
                    opacity: .1
                },
                i = o.direction;
            "elastic" === t && (r["down" === i || "up" === i ? "top" : "left"] = ("up" === i || "left" === i ? "-" : "+") + "=200px");
            e.wrap.animate(r, {
                duration: "none" === t ? 0 : e.prevSpeed,
                easing: e.prevEasing,
                complete: function() {
                    n(this).trigger("onReset").remove()
                }
            })
        }
    };
    o.helpers.overlay = {
        defaults: {
            closeClick: !0,
            speedOut: 200,
            showEarly: !0,
            css: {},
            locked: !f,
            fixed: !0
        },
        overlay: null,
        fixed: !1,
        create: function(e) {
            e = n.extend({}, this.defaults, e);
            this.overlay && this.close();
            this.overlay = n('<div class="fancybox-overlay"></div>').appendTo("body");
            this.fixed = !1;
            e.fixed && o.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
        },
        open: function(e) {
            var t = this;
            e = n.extend({}, this.defaults, e);
            this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(e);
            this.fixed || (i.bind("resize.overlay", n.proxy(this.update, this)), this.update());
            e.closeClick && this.overlay.bind("click.overlay", function(e) {
                n(e.target).hasClass("fancybox-overlay") && (o.isActive ? o.close() : t.close())
            });
            this.overlay.css(e.css).show()
        },
        close: function() {
            n(".fancybox-overlay").remove();
            i.unbind("resize.overlay");
            this.overlay = null;
            !1 !== this.margin && (n("body").css("margin-right", this.margin), this.margin = !1);
            this.el && this.el.removeClass("fancybox-lock")
        },
        update: function() {
            var e = "100%",
                n;
            this.overlay.width(e).height("100%");
            u ? (n = Math.max(t.documentElement.offsetWidth, t.body.offsetWidth), s.width() > n && (e = s.width())) : s.width() > i.width() && (e = s.width());
            this.overlay.width(e).height(s.height())
        },
        onReady: function(e, r) {
            n(".fancybox-overlay").stop(!0, !0);
            this.overlay || (this.margin = s.height() > i.height() || "scroll" === n("body").css("overflow-y") ? n("body").css("margin-right") : !1, this.el = t.all && !t.querySelector ? n("html") : n("body"), this.create(e));
            e.locked && this.fixed && (r.locked = this.overlay.append(r.wrap), r.fixed = !1);
            !0 === e.showEarly && this.beforeShow.apply(this, arguments)
        },
        beforeShow: function(e, t) {
            t.locked && (this.el.addClass("fancybox-lock"), !1 !== this.margin && n("body").css("margin-right", p(this.margin) + t.scrollbarWidth));
            this.open(e)
        },
        onUpdate: function() {
            this.fixed || this.update()
        },
        afterClose: function(e) {
            this.overlay && !o.isActive && this.overlay.fadeOut(e.speedOut, n.proxy(this.close, this))
        }
    };
    o.helpers.title = {
        defaults: {
            type: "float",
            position: "bottom"
        },
        beforeShow: function(e) {
            var t = o.current,
                r = t.title,
                i = e.type;
            n.isFunction(r) && (r = r.call(t.element, t));
            if (c(r) && "" !== n.trim(r)) {
                t = n('<div class="fancybox-title fancybox-title-' + i + '-wrap">' + r + "</div>");
                switch (i) {
                    case "inside":
                        i = o.skin;
                        break;
                    case "outside":
                        i = o.wrap;
                        break;
                    case "over":
                        i = o.inner;
                        break;
                    default:
                        i = o.skin, t.appendTo("body"), u && t.width(t.width()), t.wrapInner('<span class="child"></span>'), o.current.margin[2] += Math.abs(p(t.css("margin-bottom")))
                }
                t["top" === e.position ? "prependTo" : "appendTo"](i)
            }
        }
    };
    n.fn.fancybox = function(e) {
        var t, r = n(this),
            i = this.selector || "",
            u = function(s) {
                var u = n(this).blur(),
                    a = t,
                    f, l;
                !s.ctrlKey && !s.altKey && !s.shiftKey && !s.metaKey && !u.is(".fancybox-wrap") && (f = e.groupAttr || "data-fancybox-group", l = u.attr(f), l || (f = "rel", l = u.get(0)[f]), l && "" !== l && "nofollow" !== l && (u = i.length ? n(i) : r, u = u.filter("[" + f + '="' + l + '"]'), a = u.index(this)), e.index = a, !1 !== o.open(u, e) && s.preventDefault())
            };
        e = e || {};
        t = e.index || 0;
        !i || !1 === e.live ? r.unbind("click.fb-start").bind("click.fb-start", u) : s.undelegate(i, "click.fb-start").delegate(i + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", u);
        this.filter("[data-fancybox-start=1]").trigger("click");
        return this
    };
    s.ready(function() {
        n.scrollbarWidth === r && (n.scrollbarWidth = function() {
            var e = n('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
                t = e.children(),
                t = t.innerWidth() - t.height(99).innerWidth();
            e.remove();
            return t
        });
        if (n.support.fixedPosition === r) {
            var e = n.support,
                t = n('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
                i = 20 === t[0].offsetTop || 15 === t[0].offsetTop;
            t.remove();
            e.fixedPosition = i
        }
        n.extend(o.defaults, {
            scrollbarWidth: n.scrollbarWidth(),
            fixed: n.support.fixedPosition,
            parent: n("body")
        })
    })
})(window, document, jQuery);
(function(e) {
    e.flexslider = function(t, n) {
        var r = e(t),
            i = e.extend({}, e.flexslider.defaults, n),
            s = i.namespace,
            o = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
            u = o ? "touchend" : "click",
            a = "vertical" === i.direction,
            f = i.reverse,
            l = 0 < i.itemWidth,
            c = "fade" === i.animation,
            h = "" !== i.asNavFor,
            p = {};
        e.data(t, "flexslider", r);
        p = {
            init: function() {
                r.animating = !1;
                r.currentSlide = i.startAt;
                r.animatingTo = r.currentSlide;
                r.atEnd = 0 === r.currentSlide || r.currentSlide === r.last;
                r.containerSelector = i.selector.substr(0, i.selector.search(" "));
                r.slides = e(i.selector, r);
                r.container = e(r.containerSelector, r);
                r.count = r.slides.length;
                r.syncExists = 0 < e(i.sync).length;
                "slide" === i.animation && (i.animation = "swing");
                r.prop = a ? "top" : "marginLeft";
                r.args = {};
                r.manualPause = !1;
                var t = r,
                    n;
                if (n = !i.video)
                    if (n = !c)
                        if (n = i.useCSS) e: {
                            n = document.createElement("div");
                            var s = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"],
                                u;
                            for (u in s)
                                if (void 0 !== n.style[s[u]]) {
                                    r.pfx = s[u].replace("Perspective", "").toLowerCase();
                                    r.prop = "-" + r.pfx + "-transform";
                                    n = !0;
                                    break e
                                }
                            n = !1
                        }
                        t.transitions = n;
                "" !== i.controlsContainer && (r.controlsContainer = 0 < e(i.controlsContainer).length && e(i.controlsContainer));
                "" !== i.manualControls && (r.manualControls = 0 < e(i.manualControls).length && e(i.manualControls));
                i.randomize && (r.slides.sort(function() {
                    return Math.round(Math.random()) - .5
                }), r.container.empty().append(r.slides));
                r.doMath();
                h && p.asNav.setup();
                r.setup("init");
                i.controlNav && p.controlNav.setup();
                i.directionNav && p.directionNav.setup();
                i.keyboard && (1 === e(r.containerSelector).length || i.multipleKeyboard) && e(document).bind("keyup", function(e) {
                    e = e.keyCode;
                    !r.animating && (39 === e || 37 === e) && (e = 39 === e ? r.getTarget("next") : 37 === e ? r.getTarget("prev") : !1, r.flexAnimate(e, i.pauseOnAction))
                });
                i.mousewheel && r.bind("mousewheel", function(e, t) {
                    e.preventDefault();
                    var n = 0 > t ? r.getTarget("next") : r.getTarget("prev");
                    r.flexAnimate(n, i.pauseOnAction)
                });
                i.pausePlay && p.pausePlay.setup();
                i.slideshow && (i.pauseOnHover && r.hover(function() {
                    !r.manualPlay && !r.manualPause && r.pause()
                }, function() {
                    !r.manualPause && !r.manualPlay && r.play()
                }), 0 < i.initDelay ? setTimeout(r.play, i.initDelay) : r.play());
                o && i.touch && p.touch();
                (!c || c && i.smoothHeight) && e(window).bind("resize focus", p.resize);
                setTimeout(function() {
                    i.start(r)
                }, 200)
            },
            asNav: {
                setup: function() {
                    r.asNav = !0;
                    r.animatingTo = Math.floor(r.currentSlide / r.move);
                    r.currentItem = r.currentSlide;
                    r.slides.removeClass(s + "active-slide").eq(r.currentItem).addClass(s + "active-slide");
                    r.slides.click(function(t) {
                        t.preventDefault();
                        t = e(this);
                        var n = t.index();
                        !e(i.asNavFor).data("flexslider").animating && !t.hasClass("active") && (r.direction = r.currentItem < n ? "next" : "prev", r.flexAnimate(n, i.pauseOnAction, !1, !0, !0))
                    })
                }
            },
            controlNav: {
                setup: function() {
                    r.manualControls ? p.controlNav.setupManual() : p.controlNav.setupPaging()
                },
                setupPaging: function() {
                    var t = 1,
                        n;
                    r.controlNavScaffold = e('<ol class="' + s + "control-nav " + s + ("thumbnails" === i.controlNav ? "control-thumbs" : "control-paging") + '"></ol>');
                    if (1 < r.pagingCount)
                        for (var a = 0; a < r.pagingCount; a++) n = "thumbnails" === i.controlNav ? '<img src="' + r.slides.eq(a).attr("data-thumb") + '"/>' : "<a>" + t + "</a>", r.controlNavScaffold.append("<li>" + n + "</li>"), t++;
                    r.controlsContainer ? e(r.controlsContainer).append(r.controlNavScaffold) : r.append(r.controlNavScaffold);
                    p.controlNav.set();
                    p.controlNav.active();
                    r.controlNavScaffold.delegate("a, img", u, function(t) {
                        t.preventDefault();
                        t = e(this);
                        var n = r.controlNav.index(t);
                        t.hasClass(s + "active") || (r.direction = n > r.currentSlide ? "next" : "prev", r.flexAnimate(n, i.pauseOnAction))
                    });
                    o && r.controlNavScaffold.delegate("a", "click touchstart", function(e) {
                        e.preventDefault()
                    })
                },
                setupManual: function() {
                    r.controlNav = r.manualControls;
                    p.controlNav.active();
                    r.controlNav.live(u, function(t) {
                        t.preventDefault();
                        t = e(this);
                        var n = r.controlNav.index(t);
                        t.hasClass(s + "active") || (n > r.currentSlide ? r.direction = "next" : r.direction = "prev", r.flexAnimate(n, i.pauseOnAction))
                    });
                    o && r.controlNav.live("click touchstart", function(e) {
                        e.preventDefault()
                    })
                },
                set: function() {
                    r.controlNav = e("." + s + "control-nav li " + ("thumbnails" === i.controlNav ? "img" : "a"), r.controlsContainer ? r.controlsContainer : r)
                },
                active: function() {
                    r.controlNav.removeClass(s + "active").eq(r.animatingTo).addClass(s + "active")
                },
                update: function(t, n) {
                    1 < r.pagingCount && "add" === t ? r.controlNavScaffold.append(e("<li><a>" + r.count + "</a></li>")) : 1 === r.pagingCount ? r.controlNavScaffold.find("li").remove() : r.controlNav.eq(n).closest("li").remove();
                    p.controlNav.set();
                    1 < r.pagingCount && r.pagingCount !== r.controlNav.length ? r.update(n, t) : p.controlNav.active()
                }
            },
            directionNav: {
                setup: function() {
                    var t = e('<ul class="' + s + 'direction-nav"><li><a class="' + s + 'prev" href="#">' + i.prevText + '</a></li><li><a class="' + s + 'next" href="#">' + i.nextText + "</a></li></ul>");
                    r.controlsContainer ? (e(r.controlsContainer).append(t), r.directionNav = e("." + s + "direction-nav li a", r.controlsContainer)) : (r.append(t), r.directionNav = e("." + s + "direction-nav li a", r));
                    p.directionNav.update();
                    r.directionNav.bind(u, function(t) {
                        t.preventDefault();
                        t = e(this).hasClass(s + "next") ? r.getTarget("next") : r.getTarget("prev");
                        r.flexAnimate(t, i.pauseOnAction)
                    });
                    o && r.directionNav.bind("click touchstart", function(e) {
                        e.preventDefault()
                    })
                },
                update: function() {
                    var e = s + "disabled";
                    1 === r.pagingCount ? r.directionNav.addClass(e) : i.animationLoop ? r.directionNav.removeClass(e) : 0 === r.animatingTo ? r.directionNav.removeClass(e).filter("." + s + "prev").addClass(e) : r.animatingTo === r.last ? r.directionNav.removeClass(e).filter("." + s + "next").addClass(e) : r.directionNav.removeClass(e)
                }
            },
            pausePlay: {
                setup: function() {
                    var t = e('<div class="' + s + 'pauseplay"><a></a></div>');
                    r.controlsContainer ? (r.controlsContainer.append(t), r.pausePlay = e("." + s + "pauseplay a", r.controlsContainer)) : (r.append(t), r.pausePlay = e("." + s + "pauseplay a", r));
                    p.pausePlay.update(i.slideshow ? s + "pause" : s + "play");
                    r.pausePlay.bind(u, function(t) {
                        t.preventDefault();
                        e(this).hasClass(s + "pause") ? (r.manualPause = !0, r.manualPlay = !1, r.pause()) : (r.manualPause = !1, r.manualPlay = !0, r.play())
                    });
                    o && r.pausePlay.bind("click touchstart", function(e) {
                        e.preventDefault()
                    })
                },
                update: function(e) {
                    "play" === e ? r.pausePlay.removeClass(s + "pause").addClass(s + "play").text(i.playText) : r.pausePlay.removeClass(s + "play").addClass(s + "pause").text(i.pauseText)
                }
            },
            touch: function() {
                function e(e) {
                    p = a ? s - e.touches[0].pageY : s - e.touches[0].pageX;
                    v = a ? Math.abs(p) < Math.abs(e.touches[0].pageX - o) : Math.abs(p) < Math.abs(e.touches[0].pageY - o);
                    if (!v || 500 < Number(new Date) - d) e.preventDefault(), !c && r.transitions && (i.animationLoop || (p /= 0 === r.currentSlide && 0 > p || r.currentSlide === r.last && 0 < p ? Math.abs(p) / h + 2 : 1), r.setProps(u + p, "setTouch"))
                }

                function n() {
                    t.removeEventListener("touchmove", e, !1);
                    if (r.animatingTo === r.currentSlide && !v && null !== p) {
                        var a = f ? -p : p,
                            l = 0 < a ? r.getTarget("next") : r.getTarget("prev");
                        r.canAdvance(l) && (550 > Number(new Date) - d && 50 < Math.abs(a) || Math.abs(a) > h / 2) ? r.flexAnimate(l, i.pauseOnAction) : c || r.flexAnimate(r.currentSlide, i.pauseOnAction, !0)
                    }
                    t.removeEventListener("touchend", n, !1);
                    u = p = o = s = null
                }
                var s, o, u, h, p, d, v = !1;
                t.addEventListener("touchstart", function(c) {
                    r.animating ? c.preventDefault() : 1 === c.touches.length && (r.pause(), h = a ? r.h : r.w, d = Number(new Date), u = l && f && r.animatingTo === r.last ? 0 : l && f ? r.limit - (r.itemW + i.itemMargin) * r.move * r.animatingTo : l && r.currentSlide === r.last ? r.limit : l ? (r.itemW + i.itemMargin) * r.move * r.currentSlide : f ? (r.last - r.currentSlide + r.cloneOffset) * h : (r.currentSlide + r.cloneOffset) * h, s = a ? c.touches[0].pageY : c.touches[0].pageX, o = a ? c.touches[0].pageX : c.touches[0].pageY, t.addEventListener("touchmove", e, !1), t.addEventListener("touchend", n, !1))
                }, !1)
            },
            resize: function() {
                !r.animating && r.is(":visible") && (l || r.doMath(), c ? p.smoothHeight() : l ? (r.slides.width(r.computedW), r.update(r.pagingCount), r.setProps()) : a ? (r.viewport.height(r.h), r.setProps(r.h, "setTotal")) : (i.smoothHeight && p.smoothHeight(), r.newSlides.width(r.computedW), r.setProps(r.computedW, "setTotal")))
            },
            smoothHeight: function(e) {
                if (!a || c) {
                    var t = c ? r : r.viewport;
                    e ? t.animate({
                        height: r.slides.eq(r.animatingTo).height()
                    }, e) : t.height(r.slides.eq(r.animatingTo).height())
                }
            },
            sync: function(t) {
                var n = e(i.sync).data("flexslider"),
                    s = r.animatingTo;
                switch (t) {
                    case "animate":
                        n.flexAnimate(s, i.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        !n.playing && !n.asNav && n.play();
                        break;
                    case "pause":
                        n.pause()
                }
            }
        };
        r.flexAnimate = function(t, n, u, v, g) {
            h && 1 === r.pagingCount && (r.direction = r.currentItem < t ? "next" : "prev");
            if (!r.animating && (r.canAdvance(t, g) || u) && r.is(":visible")) {
                if (h && v) {
                    if (u = e(i.asNavFor).data("flexslider"), r.atEnd = 0 === t || t === r.count - 1, u.flexAnimate(t, !0, !1, !0, g), r.direction = r.currentItem < t ? "next" : "prev", u.direction = r.direction, Math.ceil((t + 1) / r.visible) - 1 === r.currentSlide || 0 === t) return r.currentItem = t, r.slides.removeClass(s + "active-slide").eq(t).addClass(s + "active-slide"), !1;
                    r.currentItem = t, r.slides.removeClass(s + "active-slide").eq(t).addClass(s + "active-slide"), t = Math.floor(t / r.visible)
                }
                r.animating = !0;
                r.animatingTo = t;
                i.before(r);
                n && r.pause();
                r.syncExists && !g && p.sync("animate");
                i.controlNav && p.controlNav.active();
                l || r.slides.removeClass(s + "active-slide").eq(t).addClass(s + "active-slide");
                r.atEnd = 0 === t || t === r.last;
                i.directionNav && p.directionNav.update();
                t === r.last && (i.end(r), i.animationLoop || r.pause());
                if (c) o ? (r.slides.eq(r.currentSlide).css({
                    opacity: 0,
                    zIndex: 1
                }), r.slides.eq(t).css({
                    opacity: 1,
                    zIndex: 2
                }), r.slides.unbind("webkitTransitionEnd transitionend"), r.slides.eq(r.currentSlide).bind("webkitTransitionEnd transitionend", function() {
                    i.after(r)
                }), r.animating = !1, r.currentSlide = r.animatingTo) : (r.slides.eq(r.currentSlide).fadeOut(i.animationSpeed, i.easing), r.slides.eq(t).fadeIn(i.animationSpeed, i.easing, r.wrapup));
                else {
                    var y = a ? r.slides.filter(":first").height() : r.computedW;
                    l ? (t = i.itemWidth > r.w ? 2 * i.itemMargin : i.itemMargin, t = (r.itemW + t) * r.move * r.animatingTo, t = t > r.limit && 1 !== r.visible ? r.limit : t) : t = 0 === r.currentSlide && t === r.count - 1 && i.animationLoop && "next" !== r.direction ? f ? (r.count + r.cloneOffset) * y : 0 : r.currentSlide === r.last && 0 === t && i.animationLoop && "prev" !== r.direction ? f ? 0 : (r.count + 1) * y : f ? (r.count - 1 - t + r.cloneOffset) * y : (t + r.cloneOffset) * y;
                    r.setProps(t, "", i.animationSpeed);
                    if (r.transitions) {
                        if (!i.animationLoop || !r.atEnd) r.animating = !1, r.currentSlide = r.animatingTo;
                        r.container.unbind("webkitTransitionEnd transitionend");
                        r.container.bind("webkitTransitionEnd transitionend", function() {
                            r.wrapup(y)
                        })
                    } else r.container.animate(r.args, i.animationSpeed, i.easing, function() {
                        r.wrapup(y)
                    })
                }
                i.smoothHeight && p.smoothHeight(i.animationSpeed)
            }
        };
        r.wrapup = function(e) {
            !c && !l && (0 === r.currentSlide && r.animatingTo === r.last && i.animationLoop ? r.setProps(e, "jumpEnd") : r.currentSlide === r.last && 0 === r.animatingTo && i.animationLoop && r.setProps(e, "jumpStart"));
            r.animating = !1;
            r.currentSlide = r.animatingTo;
            i.after(r)
        };
        r.animateSlides = function() {
            r.animating || r.flexAnimate(r.getTarget("next"))
        };
        r.pause = function() {
            clearInterval(r.animatedSlides);
            r.playing = !1;
            i.pausePlay && p.pausePlay.update("play");
            r.syncExists && p.sync("pause")
        };
        r.play = function() {
            r.animatedSlides = setInterval(r.animateSlides, i.slideshowSpeed);
            r.playing = !0;
            i.pausePlay && p.pausePlay.update("pause");
            r.syncExists && p.sync("play")
        };
        r.canAdvance = function(e, t) {
            var n = h ? r.pagingCount - 1 : r.last;
            return t ? !0 : h && r.currentItem === r.count - 1 && 0 === e && "prev" === r.direction ? !0 : h && 0 === r.currentItem && e === r.pagingCount - 1 && "next" !== r.direction ? !1 : e === r.currentSlide && !h ? !1 : i.animationLoop ? !0 : r.atEnd && 0 === r.currentSlide && e === n && "next" !== r.direction ? !1 : r.atEnd && r.currentSlide === n && 0 === e && "next" === r.direction ? !1 : !0
        };
        r.getTarget = function(e) {
            r.direction = e;
            return "next" === e ? r.currentSlide === r.last ? 0 : r.currentSlide + 1 : 0 === r.currentSlide ? r.last : r.currentSlide - 1
        };
        r.setProps = function(e, t, n) {
            var s, o = e ? e : (r.itemW + i.itemMargin) * r.move * r.animatingTo;
            s = -1 * function() {
                if (l) return "setTouch" === t ? e : f && r.animatingTo === r.last ? 0 : f ? r.limit - (r.itemW + i.itemMargin) * r.move * r.animatingTo : r.animatingTo === r.last ? r.limit : o;
                switch (t) {
                    case "setTotal":
                        return f ? (r.count - 1 - r.currentSlide + r.cloneOffset) * e : (r.currentSlide + r.cloneOffset) * e;
                    case "setTouch":
                        return e;
                    case "jumpEnd":
                        return f ? e : r.count * e;
                    case "jumpStart":
                        return f ? r.count * e : e;
                    default:
                        return e
                }
            }() + "px";
            r.transitions && (s = a ? "translate3d(0," + s + ",0)" : "translate3d(" + s + ",0,0)", n = void 0 !== n ? n / 1e3 + "s" : "0s", r.container.css("-" + r.pfx + "-transition-duration", n));
            r.args[r.prop] = s;
            (r.transitions || void 0 === n) && r.container.css(r.args)
        };
        r.setup = function(t) {
            if (c) r.slides.css({
                width: "100%",
                "float": "left",
                marginRight: "-100%",
                position: "relative"
            }), "init" === t && (o ? r.slides.css({
                opacity: 0,
                display: "block",
                webkitTransition: "opacity " + i.animationSpeed / 1e3 + "s ease",
                zIndex: 1
            }).eq(r.currentSlide).css({
                opacity: 1,
                zIndex: 2
            }) : r.slides.eq(r.currentSlide).fadeIn(i.animationSpeed, i.easing)), i.smoothHeight && p.smoothHeight();
            else {
                var n, u;
                "init" === t && (r.viewport = e('<div class="' + s + 'viewport"></div>').css({
                    overflow: "hidden",
                    position: "relative"
                }).appendTo(r).append(r.container), r.cloneCount = 0, r.cloneOffset = 0, f && (u = e.makeArray(r.slides).reverse(), r.slides = e(u), r.container.empty().append(r.slides)));
                i.animationLoop && !l && (r.cloneCount = 2, r.cloneOffset = 1, "init" !== t && r.container.find(".clone").remove(), r.container.append(r.slides.first().clone().addClass("clone")).prepend(r.slides.last().clone().addClass("clone")));
                r.newSlides = e(i.selector, r);
                n = f ? r.count - 1 - r.currentSlide + r.cloneOffset : r.currentSlide + r.cloneOffset;
                a && !l ? (r.container.height(200 * (r.count + r.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function() {
                    r.newSlides.css({
                        display: "block"
                    });
                    r.doMath();
                    r.viewport.height(r.h);
                    r.setProps(n * r.h, "init")
                }, "init" === t ? 100 : 0)) : (r.container.width(200 * (r.count + r.cloneCount) + "%"), r.setProps(n * r.computedW, "init"), setTimeout(function() {
                    r.doMath();
                    r.newSlides.css({
                        width: r.computedW,
                        "float": "left",
                        display: "block"
                    });
                    i.smoothHeight && p.smoothHeight()
                }, "init" === t ? 100 : 0))
            }
            l || r.slides.removeClass(s + "active-slide").eq(r.currentSlide).addClass(s + "active-slide")
        };
        r.doMath = function() {
            var e = r.slides.first(),
                t = i.itemMargin,
                n = i.minItems,
                s = i.maxItems;
            r.w = r.width();
            r.h = e.height();
            r.boxPadding = e.outerWidth() - e.width();
            l ? (r.itemT = i.itemWidth + t, r.minW = n ? n * r.itemT : r.w, r.maxW = s ? s * r.itemT : r.w, r.itemW = r.minW > r.w ? (r.w - t * n) / n : r.maxW < r.w ? (r.w - t * s) / s : i.itemWidth > r.w ? r.w : i.itemWidth, r.visible = Math.floor(r.w / (r.itemW + t)), r.move = 0 < i.move && i.move < r.visible ? i.move : r.visible, r.pagingCount = Math.ceil((r.count - r.visible) / r.move + 1), r.last = r.pagingCount - 1, r.limit = 1 === r.pagingCount ? 0 : i.itemWidth > r.w ? (r.itemW + 2 * t) * r.count - r.w - t : (r.itemW + t) * r.count - r.w - t) : (r.itemW = r.w, r.pagingCount = r.count, r.last = r.count - 1);
            r.computedW = r.itemW - r.boxPadding
        };
        r.update = function(e, t) {
            r.doMath();
            l || (e < r.currentSlide ? r.currentSlide += 1 : e <= r.currentSlide && 0 !== e && (r.currentSlide -= 1), r.animatingTo = r.currentSlide);
            if (i.controlNav && !r.manualControls)
                if ("add" === t && !l || r.pagingCount > r.controlNav.length) p.controlNav.update("add");
                else if ("remove" === t && !l || r.pagingCount < r.controlNav.length) l && r.currentSlide > r.last && (r.currentSlide -= 1, r.animatingTo -= 1), p.controlNav.update("remove", r.last);
            i.directionNav && p.directionNav.update()
        };
        r.addSlide = function(t, n) {
            var s = e(t);
            r.count += 1;
            r.last = r.count - 1;
            a && f ? void 0 !== n ? r.slides.eq(r.count - n).after(s) : r.container.prepend(s) : void 0 !== n ? r.slides.eq(n).before(s) : r.container.append(s);
            r.update(n, "add");
            r.slides = e(i.selector + ":not(.clone)", r);
            r.setup();
            i.added(r)
        };
        r.removeSlide = function(t) {
            var n = isNaN(t) ? r.slides.index(e(t)) : t;
            r.count -= 1;
            r.last = r.count - 1;
            isNaN(t) ? e(t, r.slides).remove() : a && f ? r.slides.eq(r.last).remove() : r.slides.eq(t).remove();
            r.doMath();
            r.update(n, "remove");
            r.slides = e(i.selector + ":not(.clone)", r);
            r.setup();
            i.removed(r)
        };
        p.init()
    };
    e.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 0,
        maxItems: 0,
        move: 0,
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {},
        added: function() {},
        removed: function() {}
    };
    e.fn.flexslider = function(t) {
        void 0 === t && (t = {});
        if ("object" == typeof t) return this.each(function() {
            var n = e(this),
                r = n.find(t.selector ? t.selector : ".slides > li");
            1 === r.length ? (r.fadeIn(400), t.start && t.start(n)) : void 0 == n.data("flexslider") && new e.flexslider(this, t)
        });
        var n = e(this).data("flexslider");
        switch (t) {
            case "play":
                n.play();
                break;
            case "pause":
                n.pause();
                break;
            case "next":
                n.flexAnimate(n.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                n.flexAnimate(n.getTarget("prev"), !0);
                break;
            default:
                "number" == typeof t && n.flexAnimate(t, !0)
        }
    }
})(jQuery);