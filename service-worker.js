"use strict";
var precacheConfig = [
    ["/index.html", "46ffdb348b23ee7436d32e7ff9d97a98"],
    ["/static/css/main.6055eeee.css", "3fb2c8b839292fca9dae27154a38e7c1"],
    ["/static/js/main.1a070a53.js", "7c5bea6c5c851912162ab1ca29d002f7"],
    ["/static/media/burgers.a20242f9.png", "a20242f9c819c4d3e0e7c9d32f5da6f4"],
    [
      "/static/media/dictionarypic.5b9a687d.png",
      "5b9a687d3bf953bbc4c76619080005b2"
    ],
    ["/static/media/email.a4bcfcd2.png", "a4bcfcd2e46e5c61d75f82ce8780f929"],
    ["/static/media/eventpic.1bca63bb.png", "1bca63bbb5f6feb7399d90c1cba9b3cf"],
    ["/static/media/github.1ab17d19.png", "1ab17d196e9c84c1b8838f8fc6dd46d7"],
    ["/static/media/linkedin.7e3f62ff.png", "7e3f62ffdfad861a4c39e849b8e288ce"],
    ["/static/media/porfolio.c88208ff.png", "c88208ff7ee93764b7b1b4f8c8e0c9dd"],
    ["/static/media/react.2bee11a8.png", "2bee11a830bacc5ae9006df56b20c33a"],
    ["/static/media/sass.fcf40d6a.png", "fcf40d6a94df7a5a340cc3d9e9f1aca1"],
    ["/static/media/twitter.ba6e1f3f.png", "ba6e1f3ff22ddbb768480363d4665f2b"]
  ],
  cacheName =
    "sw-precache-v3-sw-precache-webpack-plugin-" +
    (self.registration ? self.registration.scope : ""),
  ignoreUrlParametersMatching = [/^utm_/],
  addDirectoryIndex = function(e, t) {
    var n = new URL(e);
    return "/" === n.pathname.slice(-1) && (n.pathname += t), n.toString();
  },
  cleanResponse = function(t) {
    return t.redirected
      ? ("body" in t ? Promise.resolve(t.body) : t.blob()).then(function(e) {
          return new Response(e, {
            headers: t.headers,
            status: t.status,
            statusText: t.statusText
          });
        })
      : Promise.resolve(t);
  },
  createCacheKey = function(e, t, n, a) {
    var r = new URL(e);
    return (
      (a && r.pathname.match(a)) ||
        (r.search +=
          (r.search ? "&" : "") +
          encodeURIComponent(t) +
          "=" +
          encodeURIComponent(n)),
      r.toString()
    );
  },
  isPathWhitelisted = function(e, t) {
    if (0 === e.length) return !0;
    var n = new URL(t).pathname;
    return e.some(function(e) {
      return n.match(e);
    });
  },
  stripIgnoredUrlParameters = function(e, n) {
    var t = new URL(e);
    return (
      (t.hash = ""),
      (t.search = t.search
        .slice(1)
        .split("&")
        .map(function(e) {
          return e.split("=");
        })
        .filter(function(t) {
          return n.every(function(e) {
            return !e.test(t[0]);
          });
        })
        .map(function(e) {
          return e.join("=");
        })
        .join("&")),
      t.toString()
    );
  },
  hashParamName = "_sw-precache",
  urlsToCacheKeys = new Map(
    precacheConfig.map(function(e) {
      var t = e[0],
        n = e[1],
        a = new URL(t, self.location),
        r = createCacheKey(a, hashParamName, n, /\.\w{8}\./);
      return [a.toString(), r];
    })
  );
function setOfCachedUrls(e) {
  return e
    .keys()
    .then(function(e) {
      return e.map(function(e) {
        return e.url;
      });
    })
    .then(function(e) {
      return new Set(e);
    });
}
self.addEventListener("install", function(e) {
  e.waitUntil(
    caches
      .open(cacheName)
      .then(function(a) {
        return setOfCachedUrls(a).then(function(n) {
          return Promise.all(
            Array.from(urlsToCacheKeys.values()).map(function(t) {
              if (!n.has(t)) {
                var e = new Request(t, { credentials: "same-origin" });
                return fetch(e).then(function(e) {
                  if (!e.ok)
                    throw new Error(
                      "Request for " +
                        t +
                        " returned a response with status " +
                        e.status
                    );
                  return cleanResponse(e).then(function(e) {
                    return a.put(t, e);
                  });
                });
              }
            })
          );
        });
      })
      .then(function() {
        return self.skipWaiting();
      })
  );
}),
  self.addEventListener("activate", function(e) {
    var n = new Set(urlsToCacheKeys.values());
    e.waitUntil(
      caches
        .open(cacheName)
        .then(function(t) {
          return t.keys().then(function(e) {
            return Promise.all(
              e.map(function(e) {
                if (!n.has(e.url)) return t.delete(e);
              })
            );
          });
        })
        .then(function() {
          return self.clients.claim();
        })
    );
  }),
  self.addEventListener("fetch", function(t) {
    if ("GET" === t.request.method) {
      var e,
        n = stripIgnoredUrlParameters(
          t.request.url,
          ignoreUrlParametersMatching
        ),
        a = "index.html";
      (e = urlsToCacheKeys.has(n)) ||
        ((n = addDirectoryIndex(n, a)), (e = urlsToCacheKeys.has(n)));
      var r = "/index.html";
      !e &&
        "navigate" === t.request.mode &&
        isPathWhitelisted(["^(?!\\/__).*"], t.request.url) &&
        ((n = new URL(r, self.location).toString()),
        (e = urlsToCacheKeys.has(n))),
        e &&
          t.respondWith(
            caches
              .open(cacheName)
              .then(function(e) {
                return e.match(urlsToCacheKeys.get(n)).then(function(e) {
                  if (e) return e;
                  throw Error(
                    "The cached response that was expected is missing."
                  );
                });
              })
              .catch(function(e) {
                return (
                  console.warn(
                    'Couldn\'t serve response for "%s" from cache: %O',
                    t.request.url,
                    e
                  ),
                  fetch(t.request)
                );
              })
          );
    }
  });
