/* eslint-disable */

/*! jQuery v3.4.0 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-effects,-effects/Tween,-effects/animatedSelector | (c) JS Foundation and other contributors | jquery.org/license */
!(function(e, t) {
  'use strict';
  'object' == typeof module && 'object' == typeof module.exports
    ? (module.exports = e.document
        ? t(e, !0)
        : function(e) {
            if (!e.document)
              throw new Error('jQuery requires a window with a document');
            return t(e);
          })
    : t(e);
})('undefined' != typeof window ? window : this, function(g, e) {
  'use strict';
  var t = [],
    v = g.document,
    r = Object.getPrototypeOf,
    s = t.slice,
    y = t.concat,
    u = t.push,
    i = t.indexOf,
    n = {},
    o = n.toString,
    m = n.hasOwnProperty,
    a = m.toString,
    l = a.call(Object),
    b = {},
    x = function(e) {
      return 'function' == typeof e && 'number' != typeof e.nodeType;
    },
    w = function(e) {
      return null != e && e === e.window;
    },
    c = { type: !0, src: !0, nonce: !0, noModule: !0 };
  function C(e, t, n) {
    var r,
      i,
      o = (n = n || v).createElement('script');
    if (((o.text = e), t))
      for (r in c)
        (i = t[r] || (t.getAttribute && t.getAttribute(r))) &&
          o.setAttribute(r, i);
    n.head.appendChild(o).parentNode.removeChild(o);
  }
  function T(e) {
    return null == e
      ? e + ''
      : 'object' == typeof e || 'function' == typeof e
      ? n[o.call(e)] || 'object'
      : typeof e;
  }
  var f =
      '3.4.0 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-effects,-effects/Tween,-effects/animatedSelector',
    E = function(e, t) {
      return new E.fn.init(e, t);
    },
    d = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  function p(e) {
    var t = !!e && 'length' in e && e.length,
      n = T(e);
    return (
      !x(e) &&
      !w(e) &&
      ('array' === n ||
        0 === t ||
        ('number' == typeof t && 0 < t && t - 1 in e))
    );
  }
  (E.fn = E.prototype = {
    jquery: f,
    constructor: E,
    length: 0,
    toArray: function() {
      return s.call(this);
    },
    get: function(e) {
      return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e];
    },
    pushStack: function(e) {
      var t = E.merge(this.constructor(), e);
      return (t.prevObject = this), t;
    },
    each: function(e) {
      return E.each(this, e);
    },
    map: function(n) {
      return this.pushStack(
        E.map(this, function(e, t) {
          return n.call(e, t, e);
        })
      );
    },
    slice: function() {
      return this.pushStack(s.apply(this, arguments));
    },
    first: function() {
      return this.eq(0);
    },
    last: function() {
      return this.eq(-1);
    },
    eq: function(e) {
      var t = this.length,
        n = +e + (e < 0 ? t : 0);
      return this.pushStack(0 <= n && n < t ? [this[n]] : []);
    },
    end: function() {
      return this.prevObject || this.constructor();
    },
    push: u,
    sort: t.sort,
    splice: t.splice,
  }),
    (E.extend = E.fn.extend = function() {
      var e,
        t,
        n,
        r,
        i,
        o,
        a = arguments[0] || {},
        s = 1,
        u = arguments.length,
        l = !1;
      for (
        'boolean' == typeof a && ((l = a), (a = arguments[s] || {}), s++),
          'object' == typeof a || x(a) || (a = {}),
          s === u && ((a = this), s--);
        s < u;
        s++
      )
        if (null != (e = arguments[s]))
          for (t in e)
            (r = e[t]),
              '__proto__' !== t &&
                a !== r &&
                (l && r && (E.isPlainObject(r) || (i = Array.isArray(r)))
                  ? ((n = a[t]),
                    (o =
                      i && !Array.isArray(n)
                        ? []
                        : i || E.isPlainObject(n)
                        ? n
                        : {}),
                    (i = !1),
                    (a[t] = E.extend(l, o, r)))
                  : void 0 !== r && (a[t] = r));
      return a;
    }),
    E.extend({
      expando: 'jQuery' + (f + Math.random()).replace(/\D/g, ''),
      isReady: !0,
      error: function(e) {
        throw new Error(e);
      },
      noop: function() {},
      isPlainObject: function(e) {
        var t, n;
        return (
          !(!e || '[object Object]' !== o.call(e)) &&
          (!(t = r(e)) ||
            ('function' ==
              typeof (n = m.call(t, 'constructor') && t.constructor) &&
              a.call(n) === l))
        );
      },
      isEmptyObject: function(e) {
        var t;
        for (t in e) return !1;
        return !0;
      },
      globalEval: function(e, t) {
        C(e, { nonce: t && t.nonce });
      },
      each: function(e, t) {
        var n,
          r = 0;
        if (p(e)) {
          for (n = e.length; r < n; r++)
            if (!1 === t.call(e[r], r, e[r])) break;
        } else for (r in e) if (!1 === t.call(e[r], r, e[r])) break;
        return e;
      },
      trim: function(e) {
        return null == e ? '' : (e + '').replace(d, '');
      },
      makeArray: function(e, t) {
        var n = t || [];
        return (
          null != e &&
            (p(Object(e))
              ? E.merge(n, 'string' == typeof e ? [e] : e)
              : u.call(n, e)),
          n
        );
      },
      inArray: function(e, t, n) {
        return null == t ? -1 : i.call(t, e, n);
      },
      merge: function(e, t) {
        for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
        return (e.length = i), e;
      },
      grep: function(e, t, n) {
        for (var r = [], i = 0, o = e.length, a = !n; i < o; i++)
          !t(e[i], i) !== a && r.push(e[i]);
        return r;
      },
      map: function(e, t, n) {
        var r,
          i,
          o = 0,
          a = [];
        if (p(e))
          for (r = e.length; o < r; o++)
            null != (i = t(e[o], o, n)) && a.push(i);
        else for (o in e) null != (i = t(e[o], o, n)) && a.push(i);
        return y.apply([], a);
      },
      guid: 1,
      support: b,
    }),
    'function' == typeof Symbol && (E.fn[Symbol.iterator] = t[Symbol.iterator]),
    E.each(
      'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(
        ' '
      ),
      function(e, t) {
        n['[object ' + t + ']'] = t.toLowerCase();
      }
    );
  var h = (function(n) {
    var e,
      p,
      x,
      o,
      i,
      h,
      f,
      g,
      w,
      u,
      l,
      C,
      T,
      a,
      E,
      v,
      s,
      c,
      y,
      N = 'sizzle' + 1 * new Date(),
      m = n.document,
      k = 0,
      r = 0,
      d = ue(),
      b = ue(),
      A = ue(),
      S = ue(),
      D = function(e, t) {
        return e === t && (l = !0), 0;
      },
      L = {}.hasOwnProperty,
      t = [],
      j = t.pop,
      q = t.push,
      O = t.push,
      P = t.slice,
      H = function(e, t) {
        for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
        return -1;
      },
      I =
        'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
      R = '[\\x20\\t\\r\\n\\f]',
      B = '(?:\\\\.|[\\w-]|[^\0-\\xa0])+',
      M =
        '\\[' +
        R +
        '*(' +
        B +
        ')(?:' +
        R +
        '*([*^$|!~]?=)' +
        R +
        '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' +
        B +
        '))|)' +
        R +
        '*\\]',
      W =
        ':(' +
        B +
        ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' +
        M +
        ')*)|.*)\\)|)',
      $ = new RegExp(R + '+', 'g'),
      F = new RegExp('^' + R + '+|((?:^|[^\\\\])(?:\\\\.)*)' + R + '+$', 'g'),
      z = new RegExp('^' + R + '*,' + R + '*'),
      _ = new RegExp('^' + R + '*([>+~]|' + R + ')' + R + '*'),
      U = new RegExp(R + '|>'),
      V = new RegExp(W),
      X = new RegExp('^' + B + '$'),
      Q = {
        ID: new RegExp('^#(' + B + ')'),
        CLASS: new RegExp('^\\.(' + B + ')'),
        TAG: new RegExp('^(' + B + '|[*])'),
        ATTR: new RegExp('^' + M),
        PSEUDO: new RegExp('^' + W),
        CHILD: new RegExp(
          '^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' +
            R +
            '*(even|odd|(([+-]|)(\\d*)n|)' +
            R +
            '*(?:([+-]|)' +
            R +
            '*(\\d+)|))' +
            R +
            '*\\)|)',
          'i'
        ),
        bool: new RegExp('^(?:' + I + ')$', 'i'),
        needsContext: new RegExp(
          '^' +
            R +
            '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' +
            R +
            '*((?:-\\d)?\\d*)' +
            R +
            '*\\)|)(?=[^-]|$)',
          'i'
        ),
      },
      Y = /HTML$/i,
      G = /^(?:input|select|textarea|button)$/i,
      K = /^h\d$/i,
      J = /^[^{]+\{\s*\[native \w/,
      Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      ee = /[+~]/,
      te = new RegExp('\\\\([\\da-f]{1,6}' + R + '?|(' + R + ')|.)', 'ig'),
      ne = function(e, t, n) {
        var r = '0x' + t - 65536;
        return r != r || n
          ? t
          : r < 0
          ? String.fromCharCode(r + 65536)
          : String.fromCharCode((r >> 10) | 55296, (1023 & r) | 56320);
      },
      re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
      ie = function(e, t) {
        return t
          ? '\0' === e
            ? '\ufffd'
            : e.slice(0, -1) +
              '\\' +
              e.charCodeAt(e.length - 1).toString(16) +
              ' '
          : '\\' + e;
      },
      oe = function() {
        C();
      },
      ae = xe(
        function(e) {
          return !0 === e.disabled && 'fieldset' === e.nodeName.toLowerCase();
        },
        { dir: 'parentNode', next: 'legend' }
      );
    try {
      O.apply((t = P.call(m.childNodes)), m.childNodes),
        t[m.childNodes.length].nodeType;
    } catch (e) {
      O = {
        apply: t.length
          ? function(e, t) {
              q.apply(e, P.call(t));
            }
          : function(e, t) {
              var n = e.length,
                r = 0;
              while ((e[n++] = t[r++]));
              e.length = n - 1;
            },
      };
    }
    function se(t, e, n, r) {
      var i,
        o,
        a,
        s,
        u,
        l,
        c,
        f = e && e.ownerDocument,
        d = e ? e.nodeType : 9;
      if (
        ((n = n || []),
        'string' != typeof t || !t || (1 !== d && 9 !== d && 11 !== d))
      )
        return n;
      if (
        !r &&
        ((e ? e.ownerDocument || e : m) !== T && C(e), (e = e || T), E)
      ) {
        if (11 !== d && (u = Z.exec(t)))
          if ((i = u[1])) {
            if (9 === d) {
              if (!(a = e.getElementById(i))) return n;
              if (a.id === i) return n.push(a), n;
            } else if (f && (a = f.getElementById(i)) && y(e, a) && a.id === i)
              return n.push(a), n;
          } else {
            if (u[2]) return O.apply(n, e.getElementsByTagName(t)), n;
            if (
              (i = u[3]) &&
              p.getElementsByClassName &&
              e.getElementsByClassName
            )
              return O.apply(n, e.getElementsByClassName(i)), n;
          }
        if (
          p.qsa &&
          !S[t + ' '] &&
          (!v || !v.test(t)) &&
          (1 !== d || 'object' !== e.nodeName.toLowerCase())
        ) {
          if (((c = t), (f = e), 1 === d && U.test(t))) {
            (s = e.getAttribute('id'))
              ? (s = s.replace(re, ie))
              : e.setAttribute('id', (s = N)),
              (o = (l = h(t)).length);
            while (o--) l[o] = '#' + s + ' ' + be(l[o]);
            (c = l.join(',')), (f = (ee.test(t) && ye(e.parentNode)) || e);
          }
          try {
            return O.apply(n, f.querySelectorAll(c)), n;
          } catch (e) {
            S(t, !0);
          } finally {
            s === N && e.removeAttribute('id');
          }
        }
      }
      return g(t.replace(F, '$1'), e, n, r);
    }
    function ue() {
      var r = [];
      return function e(t, n) {
        return (
          r.push(t + ' ') > x.cacheLength && delete e[r.shift()],
          (e[t + ' '] = n)
        );
      };
    }
    function le(e) {
      return (e[N] = !0), e;
    }
    function ce(e) {
      var t = T.createElement('fieldset');
      try {
        return !!e(t);
      } catch (e) {
        return !1;
      } finally {
        t.parentNode && t.parentNode.removeChild(t), (t = null);
      }
    }
    function fe(e, t) {
      var n = e.split('|'),
        r = n.length;
      while (r--) x.attrHandle[n[r]] = t;
    }
    function de(e, t) {
      var n = t && e,
        r =
          n &&
          1 === e.nodeType &&
          1 === t.nodeType &&
          e.sourceIndex - t.sourceIndex;
      if (r) return r;
      if (n) while ((n = n.nextSibling)) if (n === t) return -1;
      return e ? 1 : -1;
    }
    function pe(t) {
      return function(e) {
        return 'input' === e.nodeName.toLowerCase() && e.type === t;
      };
    }
    function he(n) {
      return function(e) {
        var t = e.nodeName.toLowerCase();
        return ('input' === t || 'button' === t) && e.type === n;
      };
    }
    function ge(t) {
      return function(e) {
        return 'form' in e
          ? e.parentNode && !1 === e.disabled
            ? 'label' in e
              ? 'label' in e.parentNode
                ? e.parentNode.disabled === t
                : e.disabled === t
              : e.isDisabled === t || (e.isDisabled !== !t && ae(e) === t)
            : e.disabled === t
          : 'label' in e && e.disabled === t;
      };
    }
    function ve(a) {
      return le(function(o) {
        return (
          (o = +o),
          le(function(e, t) {
            var n,
              r = a([], e.length, o),
              i = r.length;
            while (i--) e[(n = r[i])] && (e[n] = !(t[n] = e[n]));
          })
        );
      });
    }
    function ye(e) {
      return e && 'undefined' != typeof e.getElementsByTagName && e;
    }
    for (e in ((p = se.support = {}),
    (i = se.isXML = function(e) {
      var t = e.namespaceURI,
        n = (e.ownerDocument || e).documentElement;
      return !Y.test(t || (n && n.nodeName) || 'HTML');
    }),
    (C = se.setDocument = function(e) {
      var t,
        n,
        r = e ? e.ownerDocument || e : m;
      return (
        r !== T &&
          9 === r.nodeType &&
          r.documentElement &&
          ((a = (T = r).documentElement),
          (E = !i(T)),
          m !== T &&
            (n = T.defaultView) &&
            n.top !== n &&
            (n.addEventListener
              ? n.addEventListener('unload', oe, !1)
              : n.attachEvent && n.attachEvent('onunload', oe)),
          (p.attributes = ce(function(e) {
            return (e.className = 'i'), !e.getAttribute('className');
          })),
          (p.getElementsByTagName = ce(function(e) {
            return (
              e.appendChild(T.createComment('')),
              !e.getElementsByTagName('*').length
            );
          })),
          (p.getElementsByClassName = J.test(T.getElementsByClassName)),
          (p.getById = ce(function(e) {
            return (
              (a.appendChild(e).id = N),
              !T.getElementsByName || !T.getElementsByName(N).length
            );
          })),
          p.getById
            ? ((x.filter.ID = function(e) {
                var t = e.replace(te, ne);
                return function(e) {
                  return e.getAttribute('id') === t;
                };
              }),
              (x.find.ID = function(e, t) {
                if ('undefined' != typeof t.getElementById && E) {
                  var n = t.getElementById(e);
                  return n ? [n] : [];
                }
              }))
            : ((x.filter.ID = function(e) {
                var n = e.replace(te, ne);
                return function(e) {
                  var t =
                    'undefined' != typeof e.getAttributeNode &&
                    e.getAttributeNode('id');
                  return t && t.value === n;
                };
              }),
              (x.find.ID = function(e, t) {
                if ('undefined' != typeof t.getElementById && E) {
                  var n,
                    r,
                    i,
                    o = t.getElementById(e);
                  if (o) {
                    if ((n = o.getAttributeNode('id')) && n.value === e)
                      return [o];
                    (i = t.getElementsByName(e)), (r = 0);
                    while ((o = i[r++]))
                      if ((n = o.getAttributeNode('id')) && n.value === e)
                        return [o];
                  }
                  return [];
                }
              })),
          (x.find.TAG = p.getElementsByTagName
            ? function(e, t) {
                return 'undefined' != typeof t.getElementsByTagName
                  ? t.getElementsByTagName(e)
                  : p.qsa
                  ? t.querySelectorAll(e)
                  : void 0;
              }
            : function(e, t) {
                var n,
                  r = [],
                  i = 0,
                  o = t.getElementsByTagName(e);
                if ('*' === e) {
                  while ((n = o[i++])) 1 === n.nodeType && r.push(n);
                  return r;
                }
                return o;
              }),
          (x.find.CLASS =
            p.getElementsByClassName &&
            function(e, t) {
              if ('undefined' != typeof t.getElementsByClassName && E)
                return t.getElementsByClassName(e);
            }),
          (s = []),
          (v = []),
          (p.qsa = J.test(T.querySelectorAll)) &&
            (ce(function(e) {
              (a.appendChild(e).innerHTML =
                "<a id='" +
                N +
                "'></a><select id='" +
                N +
                "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                e.querySelectorAll("[msallowcapture^='']").length &&
                  v.push('[*^$]=' + R + '*(?:\'\'|"")'),
                e.querySelectorAll('[selected]').length ||
                  v.push('\\[' + R + '*(?:value|' + I + ')'),
                e.querySelectorAll('[id~=' + N + '-]').length || v.push('~='),
                e.querySelectorAll(':checked').length || v.push(':checked'),
                e.querySelectorAll('a#' + N + '+*').length ||
                  v.push('.#.+[+~]');
            }),
            ce(function(e) {
              e.innerHTML =
                "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
              var t = T.createElement('input');
              t.setAttribute('type', 'hidden'),
                e.appendChild(t).setAttribute('name', 'D'),
                e.querySelectorAll('[name=d]').length &&
                  v.push('name' + R + '*[*^$|!~]?='),
                2 !== e.querySelectorAll(':enabled').length &&
                  v.push(':enabled', ':disabled'),
                (a.appendChild(e).disabled = !0),
                2 !== e.querySelectorAll(':disabled').length &&
                  v.push(':enabled', ':disabled'),
                e.querySelectorAll('*,:x'),
                v.push(',.*:');
            })),
          (p.matchesSelector = J.test(
            (c =
              a.matches ||
              a.webkitMatchesSelector ||
              a.mozMatchesSelector ||
              a.oMatchesSelector ||
              a.msMatchesSelector)
          )) &&
            ce(function(e) {
              (p.disconnectedMatch = c.call(e, '*')),
                c.call(e, "[s!='']:x"),
                s.push('!=', W);
            }),
          (v = v.length && new RegExp(v.join('|'))),
          (s = s.length && new RegExp(s.join('|'))),
          (t = J.test(a.compareDocumentPosition)),
          (y =
            t || J.test(a.contains)
              ? function(e, t) {
                  var n = 9 === e.nodeType ? e.documentElement : e,
                    r = t && t.parentNode;
                  return (
                    e === r ||
                    !(
                      !r ||
                      1 !== r.nodeType ||
                      !(n.contains
                        ? n.contains(r)
                        : e.compareDocumentPosition &&
                          16 & e.compareDocumentPosition(r))
                    )
                  );
                }
              : function(e, t) {
                  if (t) while ((t = t.parentNode)) if (t === e) return !0;
                  return !1;
                }),
          (D = t
            ? function(e, t) {
                if (e === t) return (l = !0), 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return (
                  n ||
                  (1 &
                    (n =
                      (e.ownerDocument || e) === (t.ownerDocument || t)
                        ? e.compareDocumentPosition(t)
                        : 1) ||
                  (!p.sortDetached && t.compareDocumentPosition(e) === n)
                    ? e === T || (e.ownerDocument === m && y(m, e))
                      ? -1
                      : t === T || (t.ownerDocument === m && y(m, t))
                      ? 1
                      : u
                      ? H(u, e) - H(u, t)
                      : 0
                    : 4 & n
                    ? -1
                    : 1)
                );
              }
            : function(e, t) {
                if (e === t) return (l = !0), 0;
                var n,
                  r = 0,
                  i = e.parentNode,
                  o = t.parentNode,
                  a = [e],
                  s = [t];
                if (!i || !o)
                  return e === T
                    ? -1
                    : t === T
                    ? 1
                    : i
                    ? -1
                    : o
                    ? 1
                    : u
                    ? H(u, e) - H(u, t)
                    : 0;
                if (i === o) return de(e, t);
                n = e;
                while ((n = n.parentNode)) a.unshift(n);
                n = t;
                while ((n = n.parentNode)) s.unshift(n);
                while (a[r] === s[r]) r++;
                return r
                  ? de(a[r], s[r])
                  : a[r] === m
                  ? -1
                  : s[r] === m
                  ? 1
                  : 0;
              })),
        T
      );
    }),
    (se.matches = function(e, t) {
      return se(e, null, null, t);
    }),
    (se.matchesSelector = function(e, t) {
      if (
        ((e.ownerDocument || e) !== T && C(e),
        p.matchesSelector &&
          E &&
          !S[t + ' '] &&
          (!s || !s.test(t)) &&
          (!v || !v.test(t)))
      )
        try {
          var n = c.call(e, t);
          if (
            n ||
            p.disconnectedMatch ||
            (e.document && 11 !== e.document.nodeType)
          )
            return n;
        } catch (e) {
          S(t, !0);
        }
      return 0 < se(t, T, null, [e]).length;
    }),
    (se.contains = function(e, t) {
      return (e.ownerDocument || e) !== T && C(e), y(e, t);
    }),
    (se.attr = function(e, t) {
      (e.ownerDocument || e) !== T && C(e);
      var n = x.attrHandle[t.toLowerCase()],
        r = n && L.call(x.attrHandle, t.toLowerCase()) ? n(e, t, !E) : void 0;
      return void 0 !== r
        ? r
        : p.attributes || !E
        ? e.getAttribute(t)
        : (r = e.getAttributeNode(t)) && r.specified
        ? r.value
        : null;
    }),
    (se.escape = function(e) {
      return (e + '').replace(re, ie);
    }),
    (se.error = function(e) {
      throw new Error('Syntax error, unrecognized expression: ' + e);
    }),
    (se.uniqueSort = function(e) {
      var t,
        n = [],
        r = 0,
        i = 0;
      if (
        ((l = !p.detectDuplicates),
        (u = !p.sortStable && e.slice(0)),
        e.sort(D),
        l)
      ) {
        while ((t = e[i++])) t === e[i] && (r = n.push(i));
        while (r--) e.splice(n[r], 1);
      }
      return (u = null), e;
    }),
    (o = se.getText = function(e) {
      var t,
        n = '',
        r = 0,
        i = e.nodeType;
      if (i) {
        if (1 === i || 9 === i || 11 === i) {
          if ('string' == typeof e.textContent) return e.textContent;
          for (e = e.firstChild; e; e = e.nextSibling) n += o(e);
        } else if (3 === i || 4 === i) return e.nodeValue;
      } else while ((t = e[r++])) n += o(t);
      return n;
    }),
    ((x = se.selectors = {
      cacheLength: 50,
      createPseudo: le,
      match: Q,
      attrHandle: {},
      find: {},
      relative: {
        '>': { dir: 'parentNode', first: !0 },
        ' ': { dir: 'parentNode' },
        '+': { dir: 'previousSibling', first: !0 },
        '~': { dir: 'previousSibling' },
      },
      preFilter: {
        ATTR: function(e) {
          return (
            (e[1] = e[1].replace(te, ne)),
            (e[3] = (e[3] || e[4] || e[5] || '').replace(te, ne)),
            '~=' === e[2] && (e[3] = ' ' + e[3] + ' '),
            e.slice(0, 4)
          );
        },
        CHILD: function(e) {
          return (
            (e[1] = e[1].toLowerCase()),
            'nth' === e[1].slice(0, 3)
              ? (e[3] || se.error(e[0]),
                (e[4] = +(e[4]
                  ? e[5] + (e[6] || 1)
                  : 2 * ('even' === e[3] || 'odd' === e[3]))),
                (e[5] = +(e[7] + e[8] || 'odd' === e[3])))
              : e[3] && se.error(e[0]),
            e
          );
        },
        PSEUDO: function(e) {
          var t,
            n = !e[6] && e[2];
          return Q.CHILD.test(e[0])
            ? null
            : (e[3]
                ? (e[2] = e[4] || e[5] || '')
                : n &&
                  V.test(n) &&
                  (t = h(n, !0)) &&
                  (t = n.indexOf(')', n.length - t) - n.length) &&
                  ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
              e.slice(0, 3));
        },
      },
      filter: {
        TAG: function(e) {
          var t = e.replace(te, ne).toLowerCase();
          return '*' === e
            ? function() {
                return !0;
              }
            : function(e) {
                return e.nodeName && e.nodeName.toLowerCase() === t;
              };
        },
        CLASS: function(e) {
          var t = d[e + ' '];
          return (
            t ||
            ((t = new RegExp('(^|' + R + ')' + e + '(' + R + '|$)')) &&
              d(e, function(e) {
                return t.test(
                  ('string' == typeof e.className && e.className) ||
                    ('undefined' != typeof e.getAttribute &&
                      e.getAttribute('class')) ||
                    ''
                );
              }))
          );
        },
        ATTR: function(n, r, i) {
          return function(e) {
            var t = se.attr(e, n);
            return null == t
              ? '!=' === r
              : !r ||
                  ((t += ''),
                  '=' === r
                    ? t === i
                    : '!=' === r
                    ? t !== i
                    : '^=' === r
                    ? i && 0 === t.indexOf(i)
                    : '*=' === r
                    ? i && -1 < t.indexOf(i)
                    : '$=' === r
                    ? i && t.slice(-i.length) === i
                    : '~=' === r
                    ? -1 < (' ' + t.replace($, ' ') + ' ').indexOf(i)
                    : '|=' === r &&
                      (t === i || t.slice(0, i.length + 1) === i + '-'));
          };
        },
        CHILD: function(h, e, t, g, v) {
          var y = 'nth' !== h.slice(0, 3),
            m = 'last' !== h.slice(-4),
            b = 'of-type' === e;
          return 1 === g && 0 === v
            ? function(e) {
                return !!e.parentNode;
              }
            : function(e, t, n) {
                var r,
                  i,
                  o,
                  a,
                  s,
                  u,
                  l = y !== m ? 'nextSibling' : 'previousSibling',
                  c = e.parentNode,
                  f = b && e.nodeName.toLowerCase(),
                  d = !n && !b,
                  p = !1;
                if (c) {
                  if (y) {
                    while (l) {
                      a = e;
                      while ((a = a[l]))
                        if (
                          b ? a.nodeName.toLowerCase() === f : 1 === a.nodeType
                        )
                          return !1;
                      u = l = 'only' === h && !u && 'nextSibling';
                    }
                    return !0;
                  }
                  if (((u = [m ? c.firstChild : c.lastChild]), m && d)) {
                    (p =
                      (s =
                        (r =
                          (i =
                            (o = (a = c)[N] || (a[N] = {}))[a.uniqueID] ||
                            (o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]) &&
                      r[2]),
                      (a = s && c.childNodes[s]);
                    while ((a = (++s && a && a[l]) || (p = s = 0) || u.pop()))
                      if (1 === a.nodeType && ++p && a === e) {
                        i[h] = [k, s, p];
                        break;
                      }
                  } else if (
                    (d &&
                      (p = s =
                        (r =
                          (i =
                            (o = (a = e)[N] || (a[N] = {}))[a.uniqueID] ||
                            (o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]),
                    !1 === p)
                  )
                    while ((a = (++s && a && a[l]) || (p = s = 0) || u.pop()))
                      if (
                        (b
                          ? a.nodeName.toLowerCase() === f
                          : 1 === a.nodeType) &&
                        ++p &&
                        (d &&
                          ((i =
                            (o = a[N] || (a[N] = {}))[a.uniqueID] ||
                            (o[a.uniqueID] = {}))[h] = [k, p]),
                        a === e)
                      )
                        break;
                  return (p -= v) === g || (p % g == 0 && 0 <= p / g);
                }
              };
        },
        PSEUDO: function(e, o) {
          var t,
            a =
              x.pseudos[e] ||
              x.setFilters[e.toLowerCase()] ||
              se.error('unsupported pseudo: ' + e);
          return a[N]
            ? a(o)
            : 1 < a.length
            ? ((t = [e, e, '', o]),
              x.setFilters.hasOwnProperty(e.toLowerCase())
                ? le(function(e, t) {
                    var n,
                      r = a(e, o),
                      i = r.length;
                    while (i--) e[(n = H(e, r[i]))] = !(t[n] = r[i]);
                  })
                : function(e) {
                    return a(e, 0, t);
                  })
            : a;
        },
      },
      pseudos: {
        not: le(function(e) {
          var r = [],
            i = [],
            s = f(e.replace(F, '$1'));
          return s[N]
            ? le(function(e, t, n, r) {
                var i,
                  o = s(e, null, r, []),
                  a = e.length;
                while (a--) (i = o[a]) && (e[a] = !(t[a] = i));
              })
            : function(e, t, n) {
                return (r[0] = e), s(r, null, n, i), (r[0] = null), !i.pop();
              };
        }),
        has: le(function(t) {
          return function(e) {
            return 0 < se(t, e).length;
          };
        }),
        contains: le(function(t) {
          return (
            (t = t.replace(te, ne)),
            function(e) {
              return -1 < (e.textContent || o(e)).indexOf(t);
            }
          );
        }),
        lang: le(function(n) {
          return (
            X.test(n || '') || se.error('unsupported lang: ' + n),
            (n = n.replace(te, ne).toLowerCase()),
            function(e) {
              var t;
              do {
                if (
                  (t = E
                    ? e.lang
                    : e.getAttribute('xml:lang') || e.getAttribute('lang'))
                )
                  return (
                    (t = t.toLowerCase()) === n || 0 === t.indexOf(n + '-')
                  );
              } while ((e = e.parentNode) && 1 === e.nodeType);
              return !1;
            }
          );
        }),
        target: function(e) {
          var t = n.location && n.location.hash;
          return t && t.slice(1) === e.id;
        },
        root: function(e) {
          return e === a;
        },
        focus: function(e) {
          return (
            e === T.activeElement &&
            (!T.hasFocus || T.hasFocus()) &&
            !!(e.type || e.href || ~e.tabIndex)
          );
        },
        enabled: ge(!1),
        disabled: ge(!0),
        checked: function(e) {
          var t = e.nodeName.toLowerCase();
          return (
            ('input' === t && !!e.checked) || ('option' === t && !!e.selected)
          );
        },
        selected: function(e) {
          return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
        },
        empty: function(e) {
          for (e = e.firstChild; e; e = e.nextSibling)
            if (e.nodeType < 6) return !1;
          return !0;
        },
        parent: function(e) {
          return !x.pseudos.empty(e);
        },
        header: function(e) {
          return K.test(e.nodeName);
        },
        input: function(e) {
          return G.test(e.nodeName);
        },
        button: function(e) {
          var t = e.nodeName.toLowerCase();
          return ('input' === t && 'button' === e.type) || 'button' === t;
        },
        text: function(e) {
          var t;
          return (
            'input' === e.nodeName.toLowerCase() &&
            'text' === e.type &&
            (null == (t = e.getAttribute('type')) || 'text' === t.toLowerCase())
          );
        },
        first: ve(function() {
          return [0];
        }),
        last: ve(function(e, t) {
          return [t - 1];
        }),
        eq: ve(function(e, t, n) {
          return [n < 0 ? n + t : n];
        }),
        even: ve(function(e, t) {
          for (var n = 0; n < t; n += 2) e.push(n);
          return e;
        }),
        odd: ve(function(e, t) {
          for (var n = 1; n < t; n += 2) e.push(n);
          return e;
        }),
        lt: ve(function(e, t, n) {
          for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r; ) e.push(r);
          return e;
        }),
        gt: ve(function(e, t, n) {
          for (var r = n < 0 ? n + t : n; ++r < t; ) e.push(r);
          return e;
        }),
      },
    }).pseudos.nth = x.pseudos.eq),
    { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
      x.pseudos[e] = pe(e);
    for (e in { submit: !0, reset: !0 }) x.pseudos[e] = he(e);
    function me() {}
    function be(e) {
      for (var t = 0, n = e.length, r = ''; t < n; t++) r += e[t].value;
      return r;
    }
    function xe(s, e, t) {
      var u = e.dir,
        l = e.next,
        c = l || u,
        f = t && 'parentNode' === c,
        d = r++;
      return e.first
        ? function(e, t, n) {
            while ((e = e[u])) if (1 === e.nodeType || f) return s(e, t, n);
            return !1;
          }
        : function(e, t, n) {
            var r,
              i,
              o,
              a = [k, d];
            if (n) {
              while ((e = e[u]))
                if ((1 === e.nodeType || f) && s(e, t, n)) return !0;
            } else
              while ((e = e[u]))
                if (1 === e.nodeType || f)
                  if (
                    ((i =
                      (o = e[N] || (e[N] = {}))[e.uniqueID] ||
                      (o[e.uniqueID] = {})),
                    l && l === e.nodeName.toLowerCase())
                  )
                    e = e[u] || e;
                  else {
                    if ((r = i[c]) && r[0] === k && r[1] === d)
                      return (a[2] = r[2]);
                    if (((i[c] = a)[2] = s(e, t, n))) return !0;
                  }
            return !1;
          };
    }
    function we(i) {
      return 1 < i.length
        ? function(e, t, n) {
            var r = i.length;
            while (r--) if (!i[r](e, t, n)) return !1;
            return !0;
          }
        : i[0];
    }
    function Ce(e, t, n, r, i) {
      for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)
        (o = e[s]) && ((n && !n(o, r, i)) || (a.push(o), l && t.push(s)));
      return a;
    }
    function Te(p, h, g, v, y, e) {
      return (
        v && !v[N] && (v = Te(v)),
        y && !y[N] && (y = Te(y, e)),
        le(function(e, t, n, r) {
          var i,
            o,
            a,
            s = [],
            u = [],
            l = t.length,
            c =
              e ||
              (function(e, t, n) {
                for (var r = 0, i = t.length; r < i; r++) se(e, t[r], n);
                return n;
              })(h || '*', n.nodeType ? [n] : n, []),
            f = !p || (!e && h) ? c : Ce(c, s, p, n, r),
            d = g ? (y || (e ? p : l || v) ? [] : t) : f;
          if ((g && g(f, d, n, r), v)) {
            (i = Ce(d, u)), v(i, [], n, r), (o = i.length);
            while (o--) (a = i[o]) && (d[u[o]] = !(f[u[o]] = a));
          }
          if (e) {
            if (y || p) {
              if (y) {
                (i = []), (o = d.length);
                while (o--) (a = d[o]) && i.push((f[o] = a));
                y(null, (d = []), i, r);
              }
              o = d.length;
              while (o--)
                (a = d[o]) &&
                  -1 < (i = y ? H(e, a) : s[o]) &&
                  (e[i] = !(t[i] = a));
            }
          } else (d = Ce(d === t ? d.splice(l, d.length) : d)), y ? y(null, t, d, r) : O.apply(t, d);
        })
      );
    }
    function Ee(e) {
      for (
        var i,
          t,
          n,
          r = e.length,
          o = x.relative[e[0].type],
          a = o || x.relative[' '],
          s = o ? 1 : 0,
          u = xe(
            function(e) {
              return e === i;
            },
            a,
            !0
          ),
          l = xe(
            function(e) {
              return -1 < H(i, e);
            },
            a,
            !0
          ),
          c = [
            function(e, t, n) {
              var r =
                (!o && (n || t !== w)) ||
                ((i = t).nodeType ? u(e, t, n) : l(e, t, n));
              return (i = null), r;
            },
          ];
        s < r;
        s++
      )
        if ((t = x.relative[e[s].type])) c = [xe(we(c), t)];
        else {
          if ((t = x.filter[e[s].type].apply(null, e[s].matches))[N]) {
            for (n = ++s; n < r; n++) if (x.relative[e[n].type]) break;
            return Te(
              1 < s && we(c),
              1 < s &&
                be(
                  e
                    .slice(0, s - 1)
                    .concat({ value: ' ' === e[s - 2].type ? '*' : '' })
                ).replace(F, '$1'),
              t,
              s < n && Ee(e.slice(s, n)),
              n < r && Ee((e = e.slice(n))),
              n < r && be(e)
            );
          }
          c.push(t);
        }
      return we(c);
    }
    return (
      (me.prototype = x.filters = x.pseudos),
      (x.setFilters = new me()),
      (h = se.tokenize = function(e, t) {
        var n,
          r,
          i,
          o,
          a,
          s,
          u,
          l = b[e + ' '];
        if (l) return t ? 0 : l.slice(0);
        (a = e), (s = []), (u = x.preFilter);
        while (a) {
          for (o in ((n && !(r = z.exec(a))) ||
            (r && (a = a.slice(r[0].length) || a), s.push((i = []))),
          (n = !1),
          (r = _.exec(a)) &&
            ((n = r.shift()),
            i.push({ value: n, type: r[0].replace(F, ' ') }),
            (a = a.slice(n.length))),
          x.filter))
            !(r = Q[o].exec(a)) ||
              (u[o] && !(r = u[o](r))) ||
              ((n = r.shift()),
              i.push({ value: n, type: o, matches: r }),
              (a = a.slice(n.length)));
          if (!n) break;
        }
        return t ? a.length : a ? se.error(e) : b(e, s).slice(0);
      }),
      (f = se.compile = function(e, t) {
        var n,
          v,
          y,
          m,
          b,
          r,
          i = [],
          o = [],
          a = A[e + ' '];
        if (!a) {
          t || (t = h(e)), (n = t.length);
          while (n--) (a = Ee(t[n]))[N] ? i.push(a) : o.push(a);
          (a = A(
            e,
            ((v = o),
            (m = 0 < (y = i).length),
            (b = 0 < v.length),
            (r = function(e, t, n, r, i) {
              var o,
                a,
                s,
                u = 0,
                l = '0',
                c = e && [],
                f = [],
                d = w,
                p = e || (b && x.find.TAG('*', i)),
                h = (k += null == d ? 1 : Math.random() || 0.1),
                g = p.length;
              for (
                i && (w = t === T || t || i);
                l !== g && null != (o = p[l]);
                l++
              ) {
                if (b && o) {
                  (a = 0), t || o.ownerDocument === T || (C(o), (n = !E));
                  while ((s = v[a++]))
                    if (s(o, t || T, n)) {
                      r.push(o);
                      break;
                    }
                  i && (k = h);
                }
                m && ((o = !s && o) && u--, e && c.push(o));
              }
              if (((u += l), m && l !== u)) {
                a = 0;
                while ((s = y[a++])) s(c, f, t, n);
                if (e) {
                  if (0 < u) while (l--) c[l] || f[l] || (f[l] = j.call(r));
                  f = Ce(f);
                }
                O.apply(r, f),
                  i &&
                    !e &&
                    0 < f.length &&
                    1 < u + y.length &&
                    se.uniqueSort(r);
              }
              return i && ((k = h), (w = d)), c;
            }),
            m ? le(r) : r)
          )).selector = e;
        }
        return a;
      }),
      (g = se.select = function(e, t, n, r) {
        var i,
          o,
          a,
          s,
          u,
          l = 'function' == typeof e && e,
          c = !r && h((e = l.selector || e));
        if (((n = n || []), 1 === c.length)) {
          if (
            2 < (o = c[0] = c[0].slice(0)).length &&
            'ID' === (a = o[0]).type &&
            9 === t.nodeType &&
            E &&
            x.relative[o[1].type]
          ) {
            if (!(t = (x.find.ID(a.matches[0].replace(te, ne), t) || [])[0]))
              return n;
            l && (t = t.parentNode), (e = e.slice(o.shift().value.length));
          }
          i = Q.needsContext.test(e) ? 0 : o.length;
          while (i--) {
            if (((a = o[i]), x.relative[(s = a.type)])) break;
            if (
              (u = x.find[s]) &&
              (r = u(
                a.matches[0].replace(te, ne),
                (ee.test(o[0].type) && ye(t.parentNode)) || t
              ))
            ) {
              if ((o.splice(i, 1), !(e = r.length && be(o))))
                return O.apply(n, r), n;
              break;
            }
          }
        }
        return (
          (l || f(e, c))(
            r,
            t,
            !E,
            n,
            !t || (ee.test(e) && ye(t.parentNode)) || t
          ),
          n
        );
      }),
      (p.sortStable =
        N.split('')
          .sort(D)
          .join('') === N),
      (p.detectDuplicates = !!l),
      C(),
      (p.sortDetached = ce(function(e) {
        return 1 & e.compareDocumentPosition(T.createElement('fieldset'));
      })),
      ce(function(e) {
        return (
          (e.innerHTML = "<a href='#'></a>"),
          '#' === e.firstChild.getAttribute('href')
        );
      }) ||
        fe('type|href|height|width', function(e, t, n) {
          if (!n) return e.getAttribute(t, 'type' === t.toLowerCase() ? 1 : 2);
        }),
      (p.attributes &&
        ce(function(e) {
          return (
            (e.innerHTML = '<input/>'),
            e.firstChild.setAttribute('value', ''),
            '' === e.firstChild.getAttribute('value')
          );
        })) ||
        fe('value', function(e, t, n) {
          if (!n && 'input' === e.nodeName.toLowerCase()) return e.defaultValue;
        }),
      ce(function(e) {
        return null == e.getAttribute('disabled');
      }) ||
        fe(I, function(e, t, n) {
          var r;
          if (!n)
            return !0 === e[t]
              ? t.toLowerCase()
              : (r = e.getAttributeNode(t)) && r.specified
              ? r.value
              : null;
        }),
      se
    );
  })(g);
  (E.find = h),
    (E.expr = h.selectors),
    (E.expr[':'] = E.expr.pseudos),
    (E.uniqueSort = E.unique = h.uniqueSort),
    (E.text = h.getText),
    (E.isXMLDoc = h.isXML),
    (E.contains = h.contains),
    (E.escapeSelector = h.escape);
  var N = function(e, t, n) {
      var r = [],
        i = void 0 !== n;
      while ((e = e[t]) && 9 !== e.nodeType)
        if (1 === e.nodeType) {
          if (i && E(e).is(n)) break;
          r.push(e);
        }
      return r;
    },
    k = function(e, t) {
      for (var n = []; e; e = e.nextSibling)
        1 === e.nodeType && e !== t && n.push(e);
      return n;
    },
    A = E.expr.match.needsContext;
  function S(e, t) {
    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
  }
  var D = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
  function L(e, n, r) {
    return x(n)
      ? E.grep(e, function(e, t) {
          return !!n.call(e, t, e) !== r;
        })
      : n.nodeType
      ? E.grep(e, function(e) {
          return (e === n) !== r;
        })
      : 'string' != typeof n
      ? E.grep(e, function(e) {
          return -1 < i.call(n, e) !== r;
        })
      : E.filter(n, e, r);
  }
  (E.filter = function(e, t, n) {
    var r = t[0];
    return (
      n && (e = ':not(' + e + ')'),
      1 === t.length && 1 === r.nodeType
        ? E.find.matchesSelector(r, e)
          ? [r]
          : []
        : E.find.matches(
            e,
            E.grep(t, function(e) {
              return 1 === e.nodeType;
            })
          )
    );
  }),
    E.fn.extend({
      find: function(e) {
        var t,
          n,
          r = this.length,
          i = this;
        if ('string' != typeof e)
          return this.pushStack(
            E(e).filter(function() {
              for (t = 0; t < r; t++) if (E.contains(i[t], this)) return !0;
            })
          );
        for (n = this.pushStack([]), t = 0; t < r; t++) E.find(e, i[t], n);
        return 1 < r ? E.uniqueSort(n) : n;
      },
      filter: function(e) {
        return this.pushStack(L(this, e || [], !1));
      },
      not: function(e) {
        return this.pushStack(L(this, e || [], !0));
      },
      is: function(e) {
        return !!L(this, 'string' == typeof e && A.test(e) ? E(e) : e || [], !1)
          .length;
      },
    });
  var j,
    q = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
  ((E.fn.init = function(e, t, n) {
    var r, i;
    if (!e) return this;
    if (((n = n || j), 'string' == typeof e)) {
      if (
        !(r =
          '<' === e[0] && '>' === e[e.length - 1] && 3 <= e.length
            ? [null, e, null]
            : q.exec(e)) ||
        (!r[1] && t)
      )
        return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
      if (r[1]) {
        if (
          ((t = t instanceof E ? t[0] : t),
          E.merge(
            this,
            E.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : v, !0)
          ),
          D.test(r[1]) && E.isPlainObject(t))
        )
          for (r in t) x(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
        return this;
      }
      return (
        (i = v.getElementById(r[2])) && ((this[0] = i), (this.length = 1)), this
      );
    }
    return e.nodeType
      ? ((this[0] = e), (this.length = 1), this)
      : x(e)
      ? void 0 !== n.ready
        ? n.ready(e)
        : e(E)
      : E.makeArray(e, this);
  }).prototype = E.fn),
    (j = E(v));
  var O = /^(?:parents|prev(?:Until|All))/,
    P = { children: !0, contents: !0, next: !0, prev: !0 };
  function H(e, t) {
    while ((e = e[t]) && 1 !== e.nodeType);
    return e;
  }
  E.fn.extend({
    has: function(e) {
      var t = E(e, this),
        n = t.length;
      return this.filter(function() {
        for (var e = 0; e < n; e++) if (E.contains(this, t[e])) return !0;
      });
    },
    closest: function(e, t) {
      var n,
        r = 0,
        i = this.length,
        o = [],
        a = 'string' != typeof e && E(e);
      if (!A.test(e))
        for (; r < i; r++)
          for (n = this[r]; n && n !== t; n = n.parentNode)
            if (
              n.nodeType < 11 &&
              (a
                ? -1 < a.index(n)
                : 1 === n.nodeType && E.find.matchesSelector(n, e))
            ) {
              o.push(n);
              break;
            }
      return this.pushStack(1 < o.length ? E.uniqueSort(o) : o);
    },
    index: function(e) {
      return e
        ? 'string' == typeof e
          ? i.call(E(e), this[0])
          : i.call(this, e.jquery ? e[0] : e)
        : this[0] && this[0].parentNode
        ? this.first().prevAll().length
        : -1;
    },
    add: function(e, t) {
      return this.pushStack(E.uniqueSort(E.merge(this.get(), E(e, t))));
    },
    addBack: function(e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
    },
  }),
    E.each(
      {
        parent: function(e) {
          var t = e.parentNode;
          return t && 11 !== t.nodeType ? t : null;
        },
        parents: function(e) {
          return N(e, 'parentNode');
        },
        parentsUntil: function(e, t, n) {
          return N(e, 'parentNode', n);
        },
        next: function(e) {
          return H(e, 'nextSibling');
        },
        prev: function(e) {
          return H(e, 'previousSibling');
        },
        nextAll: function(e) {
          return N(e, 'nextSibling');
        },
        prevAll: function(e) {
          return N(e, 'previousSibling');
        },
        nextUntil: function(e, t, n) {
          return N(e, 'nextSibling', n);
        },
        prevUntil: function(e, t, n) {
          return N(e, 'previousSibling', n);
        },
        siblings: function(e) {
          return k((e.parentNode || {}).firstChild, e);
        },
        children: function(e) {
          return k(e.firstChild);
        },
        contents: function(e) {
          return 'undefined' != typeof e.contentDocument
            ? e.contentDocument
            : (S(e, 'template') && (e = e.content || e),
              E.merge([], e.childNodes));
        },
      },
      function(r, i) {
        E.fn[r] = function(e, t) {
          var n = E.map(this, i, e);
          return (
            'Until' !== r.slice(-5) && (t = e),
            t && 'string' == typeof t && (n = E.filter(t, n)),
            1 < this.length &&
              (P[r] || E.uniqueSort(n), O.test(r) && n.reverse()),
            this.pushStack(n)
          );
        };
      }
    );
  var I = /[^\x20\t\r\n\f]+/g;
  function R(e) {
    return e;
  }
  function B(e) {
    throw e;
  }
  function M(e, t, n, r) {
    var i;
    try {
      e && x((i = e.promise))
        ? i
            .call(e)
            .done(t)
            .fail(n)
        : e && x((i = e.then))
        ? i.call(e, t, n)
        : t.apply(void 0, [e].slice(r));
    } catch (e) {
      n.apply(void 0, [e]);
    }
  }
  (E.Callbacks = function(r) {
    var e, n;
    r =
      'string' == typeof r
        ? ((e = r),
          (n = {}),
          E.each(e.match(I) || [], function(e, t) {
            n[t] = !0;
          }),
          n)
        : E.extend({}, r);
    var i,
      t,
      o,
      a,
      s = [],
      u = [],
      l = -1,
      c = function() {
        for (a = a || r.once, o = i = !0; u.length; l = -1) {
          t = u.shift();
          while (++l < s.length)
            !1 === s[l].apply(t[0], t[1]) &&
              r.stopOnFalse &&
              ((l = s.length), (t = !1));
        }
        r.memory || (t = !1), (i = !1), a && (s = t ? [] : '');
      },
      f = {
        add: function() {
          return (
            s &&
              (t && !i && ((l = s.length - 1), u.push(t)),
              (function n(e) {
                E.each(e, function(e, t) {
                  x(t)
                    ? (r.unique && f.has(t)) || s.push(t)
                    : t && t.length && 'string' !== T(t) && n(t);
                });
              })(arguments),
              t && !i && c()),
            this
          );
        },
        remove: function() {
          return (
            E.each(arguments, function(e, t) {
              var n;
              while (-1 < (n = E.inArray(t, s, n)))
                s.splice(n, 1), n <= l && l--;
            }),
            this
          );
        },
        has: function(e) {
          return e ? -1 < E.inArray(e, s) : 0 < s.length;
        },
        empty: function() {
          return s && (s = []), this;
        },
        disable: function() {
          return (a = u = []), (s = t = ''), this;
        },
        disabled: function() {
          return !s;
        },
        lock: function() {
          return (a = u = []), t || i || (s = t = ''), this;
        },
        locked: function() {
          return !!a;
        },
        fireWith: function(e, t) {
          return (
            a ||
              ((t = [e, (t = t || []).slice ? t.slice() : t]),
              u.push(t),
              i || c()),
            this
          );
        },
        fire: function() {
          return f.fireWith(this, arguments), this;
        },
        fired: function() {
          return !!o;
        },
      };
    return f;
  }),
    E.extend({
      Deferred: function(e) {
        var o = [
            [
              'notify',
              'progress',
              E.Callbacks('memory'),
              E.Callbacks('memory'),
              2,
            ],
            [
              'resolve',
              'done',
              E.Callbacks('once memory'),
              E.Callbacks('once memory'),
              0,
              'resolved',
            ],
            [
              'reject',
              'fail',
              E.Callbacks('once memory'),
              E.Callbacks('once memory'),
              1,
              'rejected',
            ],
          ],
          i = 'pending',
          a = {
            state: function() {
              return i;
            },
            always: function() {
              return s.done(arguments).fail(arguments), this;
            },
            catch: function(e) {
              return a.then(null, e);
            },
            pipe: function() {
              var i = arguments;
              return E.Deferred(function(r) {
                E.each(o, function(e, t) {
                  var n = x(i[t[4]]) && i[t[4]];
                  s[t[1]](function() {
                    var e = n && n.apply(this, arguments);
                    e && x(e.promise)
                      ? e
                          .promise()
                          .progress(r.notify)
                          .done(r.resolve)
                          .fail(r.reject)
                      : r[t[0] + 'With'](this, n ? [e] : arguments);
                  });
                }),
                  (i = null);
              }).promise();
            },
            then: function(t, n, r) {
              var u = 0;
              function l(i, o, a, s) {
                return function() {
                  var n = this,
                    r = arguments,
                    e = function() {
                      var e, t;
                      if (!(i < u)) {
                        if ((e = a.apply(n, r)) === o.promise())
                          throw new TypeError('Thenable self-resolution');
                        (t =
                          e &&
                          ('object' == typeof e || 'function' == typeof e) &&
                          e.then),
                          x(t)
                            ? s
                              ? t.call(e, l(u, o, R, s), l(u, o, B, s))
                              : (u++,
                                t.call(
                                  e,
                                  l(u, o, R, s),
                                  l(u, o, B, s),
                                  l(u, o, R, o.notifyWith)
                                ))
                            : (a !== R && ((n = void 0), (r = [e])),
                              (s || o.resolveWith)(n, r));
                      }
                    },
                    t = s
                      ? e
                      : function() {
                          try {
                            e();
                          } catch (e) {
                            E.Deferred.exceptionHook &&
                              E.Deferred.exceptionHook(e, t.stackTrace),
                              u <= i + 1 &&
                                (a !== B && ((n = void 0), (r = [e])),
                                o.rejectWith(n, r));
                          }
                        };
                  i
                    ? t()
                    : (E.Deferred.getStackHook &&
                        (t.stackTrace = E.Deferred.getStackHook()),
                      g.setTimeout(t));
                };
              }
              return E.Deferred(function(e) {
                o[0][3].add(l(0, e, x(r) ? r : R, e.notifyWith)),
                  o[1][3].add(l(0, e, x(t) ? t : R)),
                  o[2][3].add(l(0, e, x(n) ? n : B));
              }).promise();
            },
            promise: function(e) {
              return null != e ? E.extend(e, a) : a;
            },
          },
          s = {};
        return (
          E.each(o, function(e, t) {
            var n = t[2],
              r = t[5];
            (a[t[1]] = n.add),
              r &&
                n.add(
                  function() {
                    i = r;
                  },
                  o[3 - e][2].disable,
                  o[3 - e][3].disable,
                  o[0][2].lock,
                  o[0][3].lock
                ),
              n.add(t[3].fire),
              (s[t[0]] = function() {
                return (
                  s[t[0] + 'With'](this === s ? void 0 : this, arguments), this
                );
              }),
              (s[t[0] + 'With'] = n.fireWith);
          }),
          a.promise(s),
          e && e.call(s, s),
          s
        );
      },
      when: function(e) {
        var n = arguments.length,
          t = n,
          r = Array(t),
          i = s.call(arguments),
          o = E.Deferred(),
          a = function(t) {
            return function(e) {
              (r[t] = this),
                (i[t] = 1 < arguments.length ? s.call(arguments) : e),
                --n || o.resolveWith(r, i);
            };
          };
        if (
          n <= 1 &&
          (M(e, o.done(a(t)).resolve, o.reject, !n),
          'pending' === o.state() || x(i[t] && i[t].then))
        )
          return o.then();
        while (t--) M(i[t], a(t), o.reject);
        return o.promise();
      },
    });
  var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  (E.Deferred.exceptionHook = function(e, t) {
    g.console &&
      g.console.warn &&
      e &&
      W.test(e.name) &&
      g.console.warn('jQuery.Deferred exception: ' + e.message, e.stack, t);
  }),
    (E.readyException = function(e) {
      g.setTimeout(function() {
        throw e;
      });
    });
  var $ = E.Deferred();
  function F() {
    v.removeEventListener('DOMContentLoaded', F),
      g.removeEventListener('load', F),
      E.ready();
  }
  (E.fn.ready = function(e) {
    return (
      $.then(e)['catch'](function(e) {
        E.readyException(e);
      }),
      this
    );
  }),
    E.extend({
      isReady: !1,
      readyWait: 1,
      ready: function(e) {
        (!0 === e ? --E.readyWait : E.isReady) ||
          ((E.isReady = !0) !== e && 0 < --E.readyWait) ||
          $.resolveWith(v, [E]);
      },
    }),
    (E.ready.then = $.then),
    'complete' === v.readyState ||
    ('loading' !== v.readyState && !v.documentElement.doScroll)
      ? g.setTimeout(E.ready)
      : (v.addEventListener('DOMContentLoaded', F),
        g.addEventListener('load', F));
  var z = function(e, t, n, r, i, o, a) {
      var s = 0,
        u = e.length,
        l = null == n;
      if ('object' === T(n))
        for (s in ((i = !0), n)) z(e, t, s, n[s], !0, o, a);
      else if (
        void 0 !== r &&
        ((i = !0),
        x(r) || (a = !0),
        l &&
          (a
            ? (t.call(e, r), (t = null))
            : ((l = t),
              (t = function(e, t, n) {
                return l.call(E(e), n);
              }))),
        t)
      )
        for (; s < u; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
      return i ? e : l ? t.call(e) : u ? t(e[0], n) : o;
    },
    _ = /^-ms-/,
    U = /-([a-z])/g;
  function V(e, t) {
    return t.toUpperCase();
  }
  function X(e) {
    return e.replace(_, 'ms-').replace(U, V);
  }
  var Q = function(e) {
    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
  };
  function Y() {
    this.expando = E.expando + Y.uid++;
  }
  (Y.uid = 1),
    (Y.prototype = {
      cache: function(e) {
        var t = e[this.expando];
        return (
          t ||
            ((t = {}),
            Q(e) &&
              (e.nodeType
                ? (e[this.expando] = t)
                : Object.defineProperty(e, this.expando, {
                    value: t,
                    configurable: !0,
                  }))),
          t
        );
      },
      set: function(e, t, n) {
        var r,
          i = this.cache(e);
        if ('string' == typeof t) i[X(t)] = n;
        else for (r in t) i[X(r)] = t[r];
        return i;
      },
      get: function(e, t) {
        return void 0 === t
          ? this.cache(e)
          : e[this.expando] && e[this.expando][X(t)];
      },
      access: function(e, t, n) {
        return void 0 === t || (t && 'string' == typeof t && void 0 === n)
          ? this.get(e, t)
          : (this.set(e, t, n), void 0 !== n ? n : t);
      },
      remove: function(e, t) {
        var n,
          r = e[this.expando];
        if (void 0 !== r) {
          if (void 0 !== t) {
            n = (t = Array.isArray(t)
              ? t.map(X)
              : (t = X(t)) in r
              ? [t]
              : t.match(I) || []).length;
            while (n--) delete r[t[n]];
          }
          (void 0 === t || E.isEmptyObject(r)) &&
            (e.nodeType ? (e[this.expando] = void 0) : delete e[this.expando]);
        }
      },
      hasData: function(e) {
        var t = e[this.expando];
        return void 0 !== t && !E.isEmptyObject(t);
      },
    });
  var G = new Y(),
    K = new Y(),
    J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    Z = /[A-Z]/g;
  function ee(e, t, n) {
    var r, i;
    if (void 0 === n && 1 === e.nodeType)
      if (
        ((r = 'data-' + t.replace(Z, '-$&').toLowerCase()),
        'string' == typeof (n = e.getAttribute(r)))
      ) {
        try {
          n =
            'true' === (i = n) ||
            ('false' !== i &&
              ('null' === i
                ? null
                : i === +i + ''
                ? +i
                : J.test(i)
                ? JSON.parse(i)
                : i));
        } catch (e) {}
        K.set(e, t, n);
      } else n = void 0;
    return n;
  }
  E.extend({
    hasData: function(e) {
      return K.hasData(e) || G.hasData(e);
    },
    data: function(e, t, n) {
      return K.access(e, t, n);
    },
    removeData: function(e, t) {
      K.remove(e, t);
    },
    _data: function(e, t, n) {
      return G.access(e, t, n);
    },
    _removeData: function(e, t) {
      G.remove(e, t);
    },
  }),
    E.fn.extend({
      data: function(n, e) {
        var t,
          r,
          i,
          o = this[0],
          a = o && o.attributes;
        if (void 0 === n) {
          if (
            this.length &&
            ((i = K.get(o)), 1 === o.nodeType && !G.get(o, 'hasDataAttrs'))
          ) {
            t = a.length;
            while (t--)
              a[t] &&
                0 === (r = a[t].name).indexOf('data-') &&
                ((r = X(r.slice(5))), ee(o, r, i[r]));
            G.set(o, 'hasDataAttrs', !0);
          }
          return i;
        }
        return 'object' == typeof n
          ? this.each(function() {
              K.set(this, n);
            })
          : z(
              this,
              function(e) {
                var t;
                if (o && void 0 === e)
                  return void 0 !== (t = K.get(o, n))
                    ? t
                    : void 0 !== (t = ee(o, n))
                    ? t
                    : void 0;
                this.each(function() {
                  K.set(this, n, e);
                });
              },
              null,
              e,
              1 < arguments.length,
              null,
              !0
            );
      },
      removeData: function(e) {
        return this.each(function() {
          K.remove(this, e);
        });
      },
    }),
    E.extend({
      queue: function(e, t, n) {
        var r;
        if (e)
          return (
            (t = (t || 'fx') + 'queue'),
            (r = G.get(e, t)),
            n &&
              (!r || Array.isArray(n)
                ? (r = G.access(e, t, E.makeArray(n)))
                : r.push(n)),
            r || []
          );
      },
      dequeue: function(e, t) {
        t = t || 'fx';
        var n = E.queue(e, t),
          r = n.length,
          i = n.shift(),
          o = E._queueHooks(e, t);
        'inprogress' === i && ((i = n.shift()), r--),
          i &&
            ('fx' === t && n.unshift('inprogress'),
            delete o.stop,
            i.call(
              e,
              function() {
                E.dequeue(e, t);
              },
              o
            )),
          !r && o && o.empty.fire();
      },
      _queueHooks: function(e, t) {
        var n = t + 'queueHooks';
        return (
          G.get(e, n) ||
          G.access(e, n, {
            empty: E.Callbacks('once memory').add(function() {
              G.remove(e, [t + 'queue', n]);
            }),
          })
        );
      },
    }),
    E.fn.extend({
      queue: function(t, n) {
        var e = 2;
        return (
          'string' != typeof t && ((n = t), (t = 'fx'), e--),
          arguments.length < e
            ? E.queue(this[0], t)
            : void 0 === n
            ? this
            : this.each(function() {
                var e = E.queue(this, t, n);
                E._queueHooks(this, t),
                  'fx' === t && 'inprogress' !== e[0] && E.dequeue(this, t);
              })
        );
      },
      dequeue: function(e) {
        return this.each(function() {
          E.dequeue(this, e);
        });
      },
      clearQueue: function(e) {
        return this.queue(e || 'fx', []);
      },
      promise: function(e, t) {
        var n,
          r = 1,
          i = E.Deferred(),
          o = this,
          a = this.length,
          s = function() {
            --r || i.resolveWith(o, [o]);
          };
        'string' != typeof e && ((t = e), (e = void 0)), (e = e || 'fx');
        while (a--)
          (n = G.get(o[a], e + 'queueHooks')) &&
            n.empty &&
            (r++, n.empty.add(s));
        return s(), i.promise(t);
      },
    });
  var te = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    ne = new RegExp('^(?:([+-])=|)(' + te + ')([a-z%]*)$', 'i'),
    re = ['Top', 'Right', 'Bottom', 'Left'],
    ie = v.documentElement,
    oe = function(e) {
      return E.contains(e.ownerDocument, e);
    },
    ae = { composed: !0 };
  ie.attachShadow &&
    (oe = function(e) {
      return (
        E.contains(e.ownerDocument, e) || e.getRootNode(ae) === e.ownerDocument
      );
    });
  var se = function(e, t) {
      return (
        'none' === (e = t || e).style.display ||
        ('' === e.style.display && oe(e) && 'none' === E.css(e, 'display'))
      );
    },
    ue = function(e, t, n, r) {
      var i,
        o,
        a = {};
      for (o in t) (a[o] = e.style[o]), (e.style[o] = t[o]);
      for (o in ((i = n.apply(e, r || [])), t)) e.style[o] = a[o];
      return i;
    };
  var le = {};
  function ce(e, t) {
    for (var n, r, i, o, a, s, u, l = [], c = 0, f = e.length; c < f; c++)
      (r = e[c]).style &&
        ((n = r.style.display),
        t
          ? ('none' === n &&
              ((l[c] = G.get(r, 'display') || null),
              l[c] || (r.style.display = '')),
            '' === r.style.display &&
              se(r) &&
              (l[c] = ((u = a = o = void 0),
              (a = (i = r).ownerDocument),
              (s = i.nodeName),
              (u = le[s]) ||
                ((o = a.body.appendChild(a.createElement(s))),
                (u = E.css(o, 'display')),
                o.parentNode.removeChild(o),
                'none' === u && (u = 'block'),
                (le[s] = u)))))
          : 'none' !== n && ((l[c] = 'none'), G.set(r, 'display', n)));
    for (c = 0; c < f; c++) null != l[c] && (e[c].style.display = l[c]);
    return e;
  }
  E.fn.extend({
    show: function() {
      return ce(this, !0);
    },
    hide: function() {
      return ce(this);
    },
    toggle: function(e) {
      return 'boolean' == typeof e
        ? e
          ? this.show()
          : this.hide()
        : this.each(function() {
            se(this) ? E(this).show() : E(this).hide();
          });
    },
  });
  var fe = /^(?:checkbox|radio)$/i,
    de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
    pe = /^$|^module$|\/(?:java|ecma)script/i,
    he = {
      option: [1, "<select multiple='multiple'>", '</select>'],
      thead: [1, '<table>', '</table>'],
      col: [2, '<table><colgroup>', '</colgroup></table>'],
      tr: [2, '<table><tbody>', '</tbody></table>'],
      td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
      _default: [0, '', ''],
    };
  function ge(e, t) {
    var n;
    return (
      (n =
        'undefined' != typeof e.getElementsByTagName
          ? e.getElementsByTagName(t || '*')
          : 'undefined' != typeof e.querySelectorAll
          ? e.querySelectorAll(t || '*')
          : []),
      void 0 === t || (t && S(e, t)) ? E.merge([e], n) : n
    );
  }
  function ve(e, t) {
    for (var n = 0, r = e.length; n < r; n++)
      G.set(e[n], 'globalEval', !t || G.get(t[n], 'globalEval'));
  }
  (he.optgroup = he.option),
    (he.tbody = he.tfoot = he.colgroup = he.caption = he.thead),
    (he.th = he.td);
  var ye,
    me,
    be = /<|&#?\w+;/;
  function xe(e, t, n, r, i) {
    for (
      var o,
        a,
        s,
        u,
        l,
        c,
        f = t.createDocumentFragment(),
        d = [],
        p = 0,
        h = e.length;
      p < h;
      p++
    )
      if ((o = e[p]) || 0 === o)
        if ('object' === T(o)) E.merge(d, o.nodeType ? [o] : o);
        else if (be.test(o)) {
          (a = a || f.appendChild(t.createElement('div'))),
            (s = (de.exec(o) || ['', ''])[1].toLowerCase()),
            (u = he[s] || he._default),
            (a.innerHTML = u[1] + E.htmlPrefilter(o) + u[2]),
            (c = u[0]);
          while (c--) a = a.lastChild;
          E.merge(d, a.childNodes), ((a = f.firstChild).textContent = '');
        } else d.push(t.createTextNode(o));
    (f.textContent = ''), (p = 0);
    while ((o = d[p++]))
      if (r && -1 < E.inArray(o, r)) i && i.push(o);
      else if (
        ((l = oe(o)), (a = ge(f.appendChild(o), 'script')), l && ve(a), n)
      ) {
        c = 0;
        while ((o = a[c++])) pe.test(o.type || '') && n.push(o);
      }
    return f;
  }
  (ye = v.createDocumentFragment().appendChild(v.createElement('div'))),
    (me = v.createElement('input')).setAttribute('type', 'radio'),
    me.setAttribute('checked', 'checked'),
    me.setAttribute('name', 't'),
    ye.appendChild(me),
    (b.checkClone = ye.cloneNode(!0).cloneNode(!0).lastChild.checked),
    (ye.innerHTML = '<textarea>x</textarea>'),
    (b.noCloneChecked = !!ye.cloneNode(!0).lastChild.defaultValue);
  var we = /^key/,
    Ce = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    Te = /^([^.]*)(?:\.(.+)|)/;
  function Ee() {
    return !0;
  }
  function Ne() {
    return !1;
  }
  function ke(e, t) {
    return (
      (e ===
        (function() {
          try {
            return v.activeElement;
          } catch (e) {}
        })()) ==
      ('focus' === t)
    );
  }
  function Ae(e, t, n, r, i, o) {
    var a, s;
    if ('object' == typeof t) {
      for (s in ('string' != typeof n && ((r = r || n), (n = void 0)), t))
        Ae(e, s, n, r, t[s], o);
      return e;
    }
    if (
      (null == r && null == i
        ? ((i = n), (r = n = void 0))
        : null == i &&
          ('string' == typeof n
            ? ((i = r), (r = void 0))
            : ((i = r), (r = n), (n = void 0))),
      !1 === i)
    )
      i = Ne;
    else if (!i) return e;
    return (
      1 === o &&
        ((a = i),
        ((i = function(e) {
          return E().off(e), a.apply(this, arguments);
        }).guid = a.guid || (a.guid = E.guid++))),
      e.each(function() {
        E.event.add(this, t, i, r, n);
      })
    );
  }
  function Se(e, i, o) {
    o
      ? (G.set(e, i, !1),
        E.event.add(e, i, {
          namespace: !1,
          handler: function(e) {
            var t,
              n,
              r = G.get(this, i);
            if (1 & e.isTrigger && this[i]) {
              if (r)
                (E.event.special[i] || {}).delegateType && e.stopPropagation();
              else if (
                ((r = s.call(arguments)),
                G.set(this, i, r),
                (t = o(this, i)),
                this[i](),
                r !== (n = G.get(this, i)) || t
                  ? G.set(this, i, !1)
                  : (n = void 0),
                r !== n)
              )
                return e.stopImmediatePropagation(), e.preventDefault(), n;
            } else
              r &&
                (G.set(
                  this,
                  i,
                  E.event.trigger(
                    E.extend(r.shift(), E.Event.prototype),
                    r,
                    this
                  )
                ),
                e.stopImmediatePropagation());
          },
        }))
      : E.event.add(e, i, Ee);
  }
  (E.event = {
    global: {},
    add: function(t, e, n, r, i) {
      var o,
        a,
        s,
        u,
        l,
        c,
        f,
        d,
        p,
        h,
        g,
        v = G.get(t);
      if (v) {
        n.handler && ((n = (o = n).handler), (i = o.selector)),
          i && E.find.matchesSelector(ie, i),
          n.guid || (n.guid = E.guid++),
          (u = v.events) || (u = v.events = {}),
          (a = v.handle) ||
            (a = v.handle = function(e) {
              return 'undefined' != typeof E && E.event.triggered !== e.type
                ? E.event.dispatch.apply(t, arguments)
                : void 0;
            }),
          (l = (e = (e || '').match(I) || ['']).length);
        while (l--)
          (p = g = (s = Te.exec(e[l]) || [])[1]),
            (h = (s[2] || '').split('.').sort()),
            p &&
              ((f = E.event.special[p] || {}),
              (p = (i ? f.delegateType : f.bindType) || p),
              (f = E.event.special[p] || {}),
              (c = E.extend(
                {
                  type: p,
                  origType: g,
                  data: r,
                  handler: n,
                  guid: n.guid,
                  selector: i,
                  needsContext: i && E.expr.match.needsContext.test(i),
                  namespace: h.join('.'),
                },
                o
              )),
              (d = u[p]) ||
                (((d = u[p] = []).delegateCount = 0),
                (f.setup && !1 !== f.setup.call(t, r, h, a)) ||
                  (t.addEventListener && t.addEventListener(p, a))),
              f.add &&
                (f.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)),
              i ? d.splice(d.delegateCount++, 0, c) : d.push(c),
              (E.event.global[p] = !0));
      }
    },
    remove: function(e, t, n, r, i) {
      var o,
        a,
        s,
        u,
        l,
        c,
        f,
        d,
        p,
        h,
        g,
        v = G.hasData(e) && G.get(e);
      if (v && (u = v.events)) {
        l = (t = (t || '').match(I) || ['']).length;
        while (l--)
          if (
            ((p = g = (s = Te.exec(t[l]) || [])[1]),
            (h = (s[2] || '').split('.').sort()),
            p)
          ) {
            (f = E.event.special[p] || {}),
              (d = u[(p = (r ? f.delegateType : f.bindType) || p)] || []),
              (s =
                s[2] &&
                new RegExp('(^|\\.)' + h.join('\\.(?:.*\\.|)') + '(\\.|$)')),
              (a = o = d.length);
            while (o--)
              (c = d[o]),
                (!i && g !== c.origType) ||
                  (n && n.guid !== c.guid) ||
                  (s && !s.test(c.namespace)) ||
                  (r && r !== c.selector && ('**' !== r || !c.selector)) ||
                  (d.splice(o, 1),
                  c.selector && d.delegateCount--,
                  f.remove && f.remove.call(e, c));
            a &&
              !d.length &&
              ((f.teardown && !1 !== f.teardown.call(e, h, v.handle)) ||
                E.removeEvent(e, p, v.handle),
              delete u[p]);
          } else for (p in u) E.event.remove(e, p + t[l], n, r, !0);
        E.isEmptyObject(u) && G.remove(e, 'handle events');
      }
    },
    dispatch: function(e) {
      var t,
        n,
        r,
        i,
        o,
        a,
        s = E.event.fix(e),
        u = new Array(arguments.length),
        l = (G.get(this, 'events') || {})[s.type] || [],
        c = E.event.special[s.type] || {};
      for (u[0] = s, t = 1; t < arguments.length; t++) u[t] = arguments[t];
      if (
        ((s.delegateTarget = this),
        !c.preDispatch || !1 !== c.preDispatch.call(this, s))
      ) {
        (a = E.event.handlers.call(this, s, l)), (t = 0);
        while ((i = a[t++]) && !s.isPropagationStopped()) {
          (s.currentTarget = i.elem), (n = 0);
          while ((o = i.handlers[n++]) && !s.isImmediatePropagationStopped())
            (s.rnamespace &&
              !1 !== o.namespace &&
              !s.rnamespace.test(o.namespace)) ||
              ((s.handleObj = o),
              (s.data = o.data),
              void 0 !==
                (r = (
                  (E.event.special[o.origType] || {}).handle || o.handler
                ).apply(i.elem, u)) &&
                !1 === (s.result = r) &&
                (s.preventDefault(), s.stopPropagation()));
        }
        return c.postDispatch && c.postDispatch.call(this, s), s.result;
      }
    },
    handlers: function(e, t) {
      var n,
        r,
        i,
        o,
        a,
        s = [],
        u = t.delegateCount,
        l = e.target;
      if (u && l.nodeType && !('click' === e.type && 1 <= e.button))
        for (; l !== this; l = l.parentNode || this)
          if (1 === l.nodeType && ('click' !== e.type || !0 !== l.disabled)) {
            for (o = [], a = {}, n = 0; n < u; n++)
              void 0 === a[(i = (r = t[n]).selector + ' ')] &&
                (a[i] = r.needsContext
                  ? -1 < E(i, this).index(l)
                  : E.find(i, this, null, [l]).length),
                a[i] && o.push(r);
            o.length && s.push({ elem: l, handlers: o });
          }
      return (
        (l = this), u < t.length && s.push({ elem: l, handlers: t.slice(u) }), s
      );
    },
    addProp: function(t, e) {
      Object.defineProperty(E.Event.prototype, t, {
        enumerable: !0,
        configurable: !0,
        get: x(e)
          ? function() {
              if (this.originalEvent) return e(this.originalEvent);
            }
          : function() {
              if (this.originalEvent) return this.originalEvent[t];
            },
        set: function(e) {
          Object.defineProperty(this, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: e,
          });
        },
      });
    },
    fix: function(e) {
      return e[E.expando] ? e : new E.Event(e);
    },
    special: {
      load: { noBubble: !0 },
      click: {
        setup: function(e) {
          var t = this || e;
          return (
            fe.test(t.type) &&
              t.click &&
              S(t, 'input') &&
              void 0 === G.get(t, 'click') &&
              Se(t, 'click', Ee),
            !1
          );
        },
        trigger: function(e) {
          var t = this || e;
          return (
            fe.test(t.type) &&
              t.click &&
              S(t, 'input') &&
              void 0 === G.get(t, 'click') &&
              Se(t, 'click'),
            !0
          );
        },
        _default: function(e) {
          var t = e.target;
          return (
            (fe.test(t.type) &&
              t.click &&
              S(t, 'input') &&
              G.get(t, 'click')) ||
            S(t, 'a')
          );
        },
      },
      beforeunload: {
        postDispatch: function(e) {
          void 0 !== e.result &&
            e.originalEvent &&
            (e.originalEvent.returnValue = e.result);
        },
      },
    },
  }),
    (E.removeEvent = function(e, t, n) {
      e.removeEventListener && e.removeEventListener(t, n);
    }),
    (E.Event = function(e, t) {
      if (!(this instanceof E.Event)) return new E.Event(e, t);
      e && e.type
        ? ((this.originalEvent = e),
          (this.type = e.type),
          (this.isDefaultPrevented =
            e.defaultPrevented ||
            (void 0 === e.defaultPrevented && !1 === e.returnValue)
              ? Ee
              : Ne),
          (this.target =
            e.target && 3 === e.target.nodeType
              ? e.target.parentNode
              : e.target),
          (this.currentTarget = e.currentTarget),
          (this.relatedTarget = e.relatedTarget))
        : (this.type = e),
        t && E.extend(this, t),
        (this.timeStamp = (e && e.timeStamp) || Date.now()),
        (this[E.expando] = !0);
    }),
    (E.Event.prototype = {
      constructor: E.Event,
      isDefaultPrevented: Ne,
      isPropagationStopped: Ne,
      isImmediatePropagationStopped: Ne,
      isSimulated: !1,
      preventDefault: function() {
        var e = this.originalEvent;
        (this.isDefaultPrevented = Ee),
          e && !this.isSimulated && e.preventDefault();
      },
      stopPropagation: function() {
        var e = this.originalEvent;
        (this.isPropagationStopped = Ee),
          e && !this.isSimulated && e.stopPropagation();
      },
      stopImmediatePropagation: function() {
        var e = this.originalEvent;
        (this.isImmediatePropagationStopped = Ee),
          e && !this.isSimulated && e.stopImmediatePropagation(),
          this.stopPropagation();
      },
    }),
    E.each(
      {
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(e) {
          var t = e.button;
          return null == e.which && we.test(e.type)
            ? null != e.charCode
              ? e.charCode
              : e.keyCode
            : !e.which && void 0 !== t && Ce.test(e.type)
            ? 1 & t
              ? 1
              : 2 & t
              ? 3
              : 4 & t
              ? 2
              : 0
            : e.which;
        },
      },
      E.event.addProp
    ),
    E.each({ focus: 'focusin', blur: 'focusout' }, function(e, t) {
      E.event.special[e] = {
        setup: function() {
          return Se(this, e, ke), !1;
        },
        trigger: function() {
          return Se(this, e), !0;
        },
        delegateType: t,
      };
    }),
    E.each(
      {
        mouseenter: 'mouseover',
        mouseleave: 'mouseout',
        pointerenter: 'pointerover',
        pointerleave: 'pointerout',
      },
      function(e, i) {
        E.event.special[e] = {
          delegateType: i,
          bindType: i,
          handle: function(e) {
            var t,
              n = e.relatedTarget,
              r = e.handleObj;
            return (
              (n && (n === this || E.contains(this, n))) ||
                ((e.type = r.origType),
                (t = r.handler.apply(this, arguments)),
                (e.type = i)),
              t
            );
          },
        };
      }
    ),
    E.fn.extend({
      on: function(e, t, n, r) {
        return Ae(this, e, t, n, r);
      },
      one: function(e, t, n, r) {
        return Ae(this, e, t, n, r, 1);
      },
      off: function(e, t, n) {
        var r, i;
        if (e && e.preventDefault && e.handleObj)
          return (
            (r = e.handleObj),
            E(e.delegateTarget).off(
              r.namespace ? r.origType + '.' + r.namespace : r.origType,
              r.selector,
              r.handler
            ),
            this
          );
        if ('object' == typeof e) {
          for (i in e) this.off(i, t, e[i]);
          return this;
        }
        return (
          (!1 !== t && 'function' != typeof t) || ((n = t), (t = void 0)),
          !1 === n && (n = Ne),
          this.each(function() {
            E.event.remove(this, e, n, t);
          })
        );
      },
    });
  var De = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
    Le = /<script|<style|<link/i,
    je = /checked\s*(?:[^=]|=\s*.checked.)/i,
    qe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  function Oe(e, t) {
    return (
      (S(e, 'table') &&
        S(11 !== t.nodeType ? t : t.firstChild, 'tr') &&
        E(e).children('tbody')[0]) ||
      e
    );
  }
  function Pe(e) {
    return (e.type = (null !== e.getAttribute('type')) + '/' + e.type), e;
  }
  function He(e) {
    return (
      'true/' === (e.type || '').slice(0, 5)
        ? (e.type = e.type.slice(5))
        : e.removeAttribute('type'),
      e
    );
  }
  function Ie(e, t) {
    var n, r, i, o, a, s, u, l;
    if (1 === t.nodeType) {
      if (
        G.hasData(e) &&
        ((o = G.access(e)), (a = G.set(t, o)), (l = o.events))
      )
        for (i in (delete a.handle, (a.events = {}), l))
          for (n = 0, r = l[i].length; n < r; n++) E.event.add(t, i, l[i][n]);
      K.hasData(e) && ((s = K.access(e)), (u = E.extend({}, s)), K.set(t, u));
    }
  }
  function Re(n, r, i, o) {
    r = y.apply([], r);
    var e,
      t,
      a,
      s,
      u,
      l,
      c = 0,
      f = n.length,
      d = f - 1,
      p = r[0],
      h = x(p);
    if (h || (1 < f && 'string' == typeof p && !b.checkClone && je.test(p)))
      return n.each(function(e) {
        var t = n.eq(e);
        h && (r[0] = p.call(this, e, t.html())), Re(t, r, i, o);
      });
    if (
      f &&
      ((t = (e = xe(r, n[0].ownerDocument, !1, n, o)).firstChild),
      1 === e.childNodes.length && (e = t),
      t || o)
    ) {
      for (s = (a = E.map(ge(e, 'script'), Pe)).length; c < f; c++)
        (u = e),
          c !== d &&
            ((u = E.clone(u, !0, !0)), s && E.merge(a, ge(u, 'script'))),
          i.call(n[c], u, c);
      if (s)
        for (l = a[a.length - 1].ownerDocument, E.map(a, He), c = 0; c < s; c++)
          (u = a[c]),
            pe.test(u.type || '') &&
              !G.access(u, 'globalEval') &&
              E.contains(l, u) &&
              (u.src && 'module' !== (u.type || '').toLowerCase()
                ? E._evalUrl &&
                  !u.noModule &&
                  E._evalUrl(u.src, {
                    nonce: u.nonce || u.getAttribute('nonce'),
                  })
                : C(u.textContent.replace(qe, ''), u, l));
    }
    return n;
  }
  function Be(e, t, n) {
    for (var r, i = t ? E.filter(t, e) : e, o = 0; null != (r = i[o]); o++)
      n || 1 !== r.nodeType || E.cleanData(ge(r)),
        r.parentNode &&
          (n && oe(r) && ve(ge(r, 'script')), r.parentNode.removeChild(r));
    return e;
  }
  E.extend({
    htmlPrefilter: function(e) {
      return e.replace(De, '<$1></$2>');
    },
    clone: function(e, t, n) {
      var r,
        i,
        o,
        a,
        s,
        u,
        l,
        c = e.cloneNode(!0),
        f = oe(e);
      if (
        !(
          b.noCloneChecked ||
          (1 !== e.nodeType && 11 !== e.nodeType) ||
          E.isXMLDoc(e)
        )
      )
        for (a = ge(c), r = 0, i = (o = ge(e)).length; r < i; r++)
          (s = o[r]),
            (u = a[r]),
            void 0,
            'input' === (l = u.nodeName.toLowerCase()) && fe.test(s.type)
              ? (u.checked = s.checked)
              : ('input' !== l && 'textarea' !== l) ||
                (u.defaultValue = s.defaultValue);
      if (t)
        if (n)
          for (o = o || ge(e), a = a || ge(c), r = 0, i = o.length; r < i; r++)
            Ie(o[r], a[r]);
        else Ie(e, c);
      return (
        0 < (a = ge(c, 'script')).length && ve(a, !f && ge(e, 'script')), c
      );
    },
    cleanData: function(e) {
      for (var t, n, r, i = E.event.special, o = 0; void 0 !== (n = e[o]); o++)
        if (Q(n)) {
          if ((t = n[G.expando])) {
            if (t.events)
              for (r in t.events)
                i[r] ? E.event.remove(n, r) : E.removeEvent(n, r, t.handle);
            n[G.expando] = void 0;
          }
          n[K.expando] && (n[K.expando] = void 0);
        }
    },
  }),
    E.fn.extend({
      detach: function(e) {
        return Be(this, e, !0);
      },
      remove: function(e) {
        return Be(this, e);
      },
      text: function(e) {
        return z(
          this,
          function(e) {
            return void 0 === e
              ? E.text(this)
              : this.empty().each(function() {
                  (1 !== this.nodeType &&
                    11 !== this.nodeType &&
                    9 !== this.nodeType) ||
                    (this.textContent = e);
                });
          },
          null,
          e,
          arguments.length
        );
      },
      append: function() {
        return Re(this, arguments, function(e) {
          (1 !== this.nodeType &&
            11 !== this.nodeType &&
            9 !== this.nodeType) ||
            Oe(this, e).appendChild(e);
        });
      },
      prepend: function() {
        return Re(this, arguments, function(e) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var t = Oe(this, e);
            t.insertBefore(e, t.firstChild);
          }
        });
      },
      before: function() {
        return Re(this, arguments, function(e) {
          this.parentNode && this.parentNode.insertBefore(e, this);
        });
      },
      after: function() {
        return Re(this, arguments, function(e) {
          this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
        });
      },
      empty: function() {
        for (var e, t = 0; null != (e = this[t]); t++)
          1 === e.nodeType && (E.cleanData(ge(e, !1)), (e.textContent = ''));
        return this;
      },
      clone: function(e, t) {
        return (
          (e = null != e && e),
          (t = null == t ? e : t),
          this.map(function() {
            return E.clone(this, e, t);
          })
        );
      },
      html: function(e) {
        return z(
          this,
          function(e) {
            var t = this[0] || {},
              n = 0,
              r = this.length;
            if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
            if (
              'string' == typeof e &&
              !Le.test(e) &&
              !he[(de.exec(e) || ['', ''])[1].toLowerCase()]
            ) {
              e = E.htmlPrefilter(e);
              try {
                for (; n < r; n++)
                  1 === (t = this[n] || {}).nodeType &&
                    (E.cleanData(ge(t, !1)), (t.innerHTML = e));
                t = 0;
              } catch (e) {}
            }
            t && this.empty().append(e);
          },
          null,
          e,
          arguments.length
        );
      },
      replaceWith: function() {
        var n = [];
        return Re(
          this,
          arguments,
          function(e) {
            var t = this.parentNode;
            E.inArray(this, n) < 0 &&
              (E.cleanData(ge(this)), t && t.replaceChild(e, this));
          },
          n
        );
      },
    }),
    E.each(
      {
        appendTo: 'append',
        prependTo: 'prepend',
        insertBefore: 'before',
        insertAfter: 'after',
        replaceAll: 'replaceWith',
      },
      function(e, a) {
        E.fn[e] = function(e) {
          for (var t, n = [], r = E(e), i = r.length - 1, o = 0; o <= i; o++)
            (t = o === i ? this : this.clone(!0)),
              E(r[o])[a](t),
              u.apply(n, t.get());
          return this.pushStack(n);
        };
      }
    );
  var Me = new RegExp('^(' + te + ')(?!px)[a-z%]+$', 'i'),
    We = function(e) {
      var t = e.ownerDocument.defaultView;
      return (t && t.opener) || (t = g), t.getComputedStyle(e);
    },
    $e = new RegExp(re.join('|'), 'i');
  function Fe(e, t, n) {
    var r,
      i,
      o,
      a,
      s = e.style;
    return (
      (n = n || We(e)) &&
        ('' !== (a = n.getPropertyValue(t) || n[t]) ||
          oe(e) ||
          (a = E.style(e, t)),
        !b.pixelBoxStyles() &&
          Me.test(a) &&
          $e.test(t) &&
          ((r = s.width),
          (i = s.minWidth),
          (o = s.maxWidth),
          (s.minWidth = s.maxWidth = s.width = a),
          (a = n.width),
          (s.width = r),
          (s.minWidth = i),
          (s.maxWidth = o))),
      void 0 !== a ? a + '' : a
    );
  }
  function ze(e, t) {
    return {
      get: function() {
        if (!e()) return (this.get = t).apply(this, arguments);
        delete this.get;
      },
    };
  }
  !(function() {
    function e() {
      if (u) {
        (s.style.cssText =
          'position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0'),
          (u.style.cssText =
            'position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%'),
          ie.appendChild(s).appendChild(u);
        var e = g.getComputedStyle(u);
        (n = '1%' !== e.top),
          (a = 12 === t(e.marginLeft)),
          (u.style.right = '60%'),
          (o = 36 === t(e.right)),
          (r = 36 === t(e.width)),
          (u.style.position = 'absolute'),
          (i = 12 === t(u.offsetWidth / 3)),
          ie.removeChild(s),
          (u = null);
      }
    }
    function t(e) {
      return Math.round(parseFloat(e));
    }
    var n,
      r,
      i,
      o,
      a,
      s = v.createElement('div'),
      u = v.createElement('div');
    u.style &&
      ((u.style.backgroundClip = 'content-box'),
      (u.cloneNode(!0).style.backgroundClip = ''),
      (b.clearCloneStyle = 'content-box' === u.style.backgroundClip),
      E.extend(b, {
        boxSizingReliable: function() {
          return e(), r;
        },
        pixelBoxStyles: function() {
          return e(), o;
        },
        pixelPosition: function() {
          return e(), n;
        },
        reliableMarginLeft: function() {
          return e(), a;
        },
        scrollboxSize: function() {
          return e(), i;
        },
      }));
  })();
  var _e = ['Webkit', 'Moz', 'ms'],
    Ue = v.createElement('div').style,
    Ve = {};
  function Xe(e) {
    var t = E.cssProps[e] || Ve[e];
    return (
      t ||
      (e in Ue
        ? e
        : (Ve[e] =
            (function(e) {
              var t = e[0].toUpperCase() + e.slice(1),
                n = _e.length;
              while (n--) if ((e = _e[n] + t) in Ue) return e;
            })(e) || e))
    );
  }
  var Qe,
    Ye,
    Ge = /^(none|table(?!-c[ea]).+)/,
    Ke = /^--/,
    Je = { position: 'absolute', visibility: 'hidden', display: 'block' },
    Ze = { letterSpacing: '0', fontWeight: '400' };
  function et(e, t, n) {
    var r = ne.exec(t);
    return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || 'px') : t;
  }
  function tt(e, t, n, r, i, o) {
    var a = 'width' === t ? 1 : 0,
      s = 0,
      u = 0;
    if (n === (r ? 'border' : 'content')) return 0;
    for (; a < 4; a += 2)
      'margin' === n && (u += E.css(e, n + re[a], !0, i)),
        r
          ? ('content' === n && (u -= E.css(e, 'padding' + re[a], !0, i)),
            'margin' !== n &&
              (u -= E.css(e, 'border' + re[a] + 'Width', !0, i)))
          : ((u += E.css(e, 'padding' + re[a], !0, i)),
            'padding' !== n
              ? (u += E.css(e, 'border' + re[a] + 'Width', !0, i))
              : (s += E.css(e, 'border' + re[a] + 'Width', !0, i)));
    return (
      !r &&
        0 <= o &&
        (u +=
          Math.max(
            0,
            Math.ceil(
              e['offset' + t[0].toUpperCase() + t.slice(1)] - o - u - s - 0.5
            )
          ) || 0),
      u
    );
  }
  function nt(e, t, n) {
    var r = We(e),
      i =
        (!b.boxSizingReliable() || n) &&
        'border-box' === E.css(e, 'boxSizing', !1, r),
      o = i,
      a = Fe(e, t, r),
      s = 'offset' + t[0].toUpperCase() + t.slice(1);
    if (Me.test(a)) {
      if (!n) return a;
      a = 'auto';
    }
    return (
      ((!b.boxSizingReliable() && i) ||
        'auto' === a ||
        (!parseFloat(a) && 'inline' === E.css(e, 'display', !1, r))) &&
        e.getClientRects().length &&
        ((i = 'border-box' === E.css(e, 'boxSizing', !1, r)),
        (o = s in e) && (a = e[s])),
      (a = parseFloat(a) || 0) +
        tt(e, t, n || (i ? 'border' : 'content'), o, r, a) +
        'px'
    );
  }
  E.extend({
    cssHooks: {
      opacity: {
        get: function(e, t) {
          if (t) {
            var n = Fe(e, 'opacity');
            return '' === n ? '1' : n;
          }
        },
      },
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      gridArea: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnStart: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowStart: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
    },
    cssProps: {},
    style: function(e, t, n, r) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var i,
          o,
          a,
          s = X(t),
          u = Ke.test(t),
          l = e.style;
        if (
          (u || (t = Xe(s)), (a = E.cssHooks[t] || E.cssHooks[s]), void 0 === n)
        )
          return a && 'get' in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
        'string' === (o = typeof n) &&
          (i = ne.exec(n)) &&
          i[1] &&
          ((n = (function(e, t, n, r) {
            var i,
              o,
              a = 20,
              s = r
                ? function() {
                    return r.cur();
                  }
                : function() {
                    return E.css(e, t, '');
                  },
              u = s(),
              l = (n && n[3]) || (E.cssNumber[t] ? '' : 'px'),
              c =
                e.nodeType &&
                (E.cssNumber[t] || ('px' !== l && +u)) &&
                ne.exec(E.css(e, t));
            if (c && c[3] !== l) {
              (u /= 2), (l = l || c[3]), (c = +u || 1);
              while (a--)
                E.style(e, t, c + l),
                  (1 - o) * (1 - (o = s() / u || 0.5)) <= 0 && (a = 0),
                  (c /= o);
              (c *= 2), E.style(e, t, c + l), (n = n || []);
            }
            return (
              n &&
                ((c = +c || +u || 0),
                (i = n[1] ? c + (n[1] + 1) * n[2] : +n[2]),
                r && ((r.unit = l), (r.start = c), (r.end = i))),
              i
            );
          })(e, t, i)),
          (o = 'number')),
          null != n &&
            n == n &&
            ('number' !== o ||
              u ||
              (n += (i && i[3]) || (E.cssNumber[s] ? '' : 'px')),
            b.clearCloneStyle ||
              '' !== n ||
              0 !== t.indexOf('background') ||
              (l[t] = 'inherit'),
            (a && 'set' in a && void 0 === (n = a.set(e, n, r))) ||
              (u ? l.setProperty(t, n) : (l[t] = n)));
      }
    },
    css: function(e, t, n, r) {
      var i,
        o,
        a,
        s = X(t);
      return (
        Ke.test(t) || (t = Xe(s)),
        (a = E.cssHooks[t] || E.cssHooks[s]) &&
          'get' in a &&
          (i = a.get(e, !0, n)),
        void 0 === i && (i = Fe(e, t, r)),
        'normal' === i && t in Ze && (i = Ze[t]),
        '' === n || n
          ? ((o = parseFloat(i)), !0 === n || isFinite(o) ? o || 0 : i)
          : i
      );
    },
  }),
    E.each(['height', 'width'], function(e, u) {
      E.cssHooks[u] = {
        get: function(e, t, n) {
          if (t)
            return !Ge.test(E.css(e, 'display')) ||
              (e.getClientRects().length && e.getBoundingClientRect().width)
              ? nt(e, u, n)
              : ue(e, Je, function() {
                  return nt(e, u, n);
                });
        },
        set: function(e, t, n) {
          var r,
            i = We(e),
            o = !b.scrollboxSize() && 'absolute' === i.position,
            a = (o || n) && 'border-box' === E.css(e, 'boxSizing', !1, i),
            s = n ? tt(e, u, n, a, i) : 0;
          return (
            a &&
              o &&
              (s -= Math.ceil(
                e['offset' + u[0].toUpperCase() + u.slice(1)] -
                  parseFloat(i[u]) -
                  tt(e, u, 'border', !1, i) -
                  0.5
              )),
            s &&
              (r = ne.exec(t)) &&
              'px' !== (r[3] || 'px') &&
              ((e.style[u] = t), (t = E.css(e, u))),
            et(0, t, s)
          );
        },
      };
    }),
    (E.cssHooks.marginLeft = ze(b.reliableMarginLeft, function(e, t) {
      if (t)
        return (
          (parseFloat(Fe(e, 'marginLeft')) ||
            e.getBoundingClientRect().left -
              ue(e, { marginLeft: 0 }, function() {
                return e.getBoundingClientRect().left;
              })) + 'px'
        );
    })),
    E.each({ margin: '', padding: '', border: 'Width' }, function(i, o) {
      (E.cssHooks[i + o] = {
        expand: function(e) {
          for (
            var t = 0, n = {}, r = 'string' == typeof e ? e.split(' ') : [e];
            t < 4;
            t++
          )
            n[i + re[t] + o] = r[t] || r[t - 2] || r[0];
          return n;
        },
      }),
        'margin' !== i && (E.cssHooks[i + o].set = et);
    }),
    E.fn.extend({
      css: function(e, t) {
        return z(
          this,
          function(e, t, n) {
            var r,
              i,
              o = {},
              a = 0;
            if (Array.isArray(t)) {
              for (r = We(e), i = t.length; a < i; a++)
                o[t[a]] = E.css(e, t[a], !1, r);
              return o;
            }
            return void 0 !== n ? E.style(e, t, n) : E.css(e, t);
          },
          e,
          t,
          1 < arguments.length
        );
      },
    }),
    (E.fn.delay = function(r, e) {
      return (
        (r = (E.fx && E.fx.speeds[r]) || r),
        (e = e || 'fx'),
        this.queue(e, function(e, t) {
          var n = g.setTimeout(e, r);
          t.stop = function() {
            g.clearTimeout(n);
          };
        })
      );
    }),
    (Qe = v.createElement('input')),
    (Ye = v.createElement('select').appendChild(v.createElement('option'))),
    (Qe.type = 'checkbox'),
    (b.checkOn = '' !== Qe.value),
    (b.optSelected = Ye.selected),
    ((Qe = v.createElement('input')).value = 't'),
    (Qe.type = 'radio'),
    (b.radioValue = 't' === Qe.value);
  var rt,
    it = E.expr.attrHandle;
  E.fn.extend({
    attr: function(e, t) {
      return z(this, E.attr, e, t, 1 < arguments.length);
    },
    removeAttr: function(e) {
      return this.each(function() {
        E.removeAttr(this, e);
      });
    },
  }),
    E.extend({
      attr: function(e, t, n) {
        var r,
          i,
          o = e.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return 'undefined' == typeof e.getAttribute
            ? E.prop(e, t, n)
            : ((1 === o && E.isXMLDoc(e)) ||
                (i =
                  E.attrHooks[t.toLowerCase()] ||
                  (E.expr.match.bool.test(t) ? rt : void 0)),
              void 0 !== n
                ? null === n
                  ? void E.removeAttr(e, t)
                  : i && 'set' in i && void 0 !== (r = i.set(e, n, t))
                  ? r
                  : (e.setAttribute(t, n + ''), n)
                : i && 'get' in i && null !== (r = i.get(e, t))
                ? r
                : null == (r = E.find.attr(e, t))
                ? void 0
                : r);
      },
      attrHooks: {
        type: {
          set: function(e, t) {
            if (!b.radioValue && 'radio' === t && S(e, 'input')) {
              var n = e.value;
              return e.setAttribute('type', t), n && (e.value = n), t;
            }
          },
        },
      },
      removeAttr: function(e, t) {
        var n,
          r = 0,
          i = t && t.match(I);
        if (i && 1 === e.nodeType) while ((n = i[r++])) e.removeAttribute(n);
      },
    }),
    (rt = {
      set: function(e, t, n) {
        return !1 === t ? E.removeAttr(e, n) : e.setAttribute(n, n), n;
      },
    }),
    E.each(E.expr.match.bool.source.match(/\w+/g), function(e, t) {
      var a = it[t] || E.find.attr;
      it[t] = function(e, t, n) {
        var r,
          i,
          o = t.toLowerCase();
        return (
          n ||
            ((i = it[o]),
            (it[o] = r),
            (r = null != a(e, t, n) ? o : null),
            (it[o] = i)),
          r
        );
      };
    });
  var ot = /^(?:input|select|textarea|button)$/i,
    at = /^(?:a|area)$/i;
  function st(e) {
    return (e.match(I) || []).join(' ');
  }
  function ut(e) {
    return (e.getAttribute && e.getAttribute('class')) || '';
  }
  function lt(e) {
    return Array.isArray(e) ? e : ('string' == typeof e && e.match(I)) || [];
  }
  E.fn.extend({
    prop: function(e, t) {
      return z(this, E.prop, e, t, 1 < arguments.length);
    },
    removeProp: function(e) {
      return this.each(function() {
        delete this[E.propFix[e] || e];
      });
    },
  }),
    E.extend({
      prop: function(e, t, n) {
        var r,
          i,
          o = e.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return (
            (1 === o && E.isXMLDoc(e)) ||
              ((t = E.propFix[t] || t), (i = E.propHooks[t])),
            void 0 !== n
              ? i && 'set' in i && void 0 !== (r = i.set(e, n, t))
                ? r
                : (e[t] = n)
              : i && 'get' in i && null !== (r = i.get(e, t))
              ? r
              : e[t]
          );
      },
      propHooks: {
        tabIndex: {
          get: function(e) {
            var t = E.find.attr(e, 'tabindex');
            return t
              ? parseInt(t, 10)
              : ot.test(e.nodeName) || (at.test(e.nodeName) && e.href)
              ? 0
              : -1;
          },
        },
      },
      propFix: { for: 'htmlFor', class: 'className' },
    }),
    b.optSelected ||
      (E.propHooks.selected = {
        get: function(e) {
          var t = e.parentNode;
          return t && t.parentNode && t.parentNode.selectedIndex, null;
        },
        set: function(e) {
          var t = e.parentNode;
          t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
        },
      }),
    E.each(
      [
        'tabIndex',
        'readOnly',
        'maxLength',
        'cellSpacing',
        'cellPadding',
        'rowSpan',
        'colSpan',
        'useMap',
        'frameBorder',
        'contentEditable',
      ],
      function() {
        E.propFix[this.toLowerCase()] = this;
      }
    ),
    E.fn.extend({
      addClass: function(t) {
        var e,
          n,
          r,
          i,
          o,
          a,
          s,
          u = 0;
        if (x(t))
          return this.each(function(e) {
            E(this).addClass(t.call(this, e, ut(this)));
          });
        if ((e = lt(t)).length)
          while ((n = this[u++]))
            if (((i = ut(n)), (r = 1 === n.nodeType && ' ' + st(i) + ' '))) {
              a = 0;
              while ((o = e[a++]))
                r.indexOf(' ' + o + ' ') < 0 && (r += o + ' ');
              i !== (s = st(r)) && n.setAttribute('class', s);
            }
        return this;
      },
      removeClass: function(t) {
        var e,
          n,
          r,
          i,
          o,
          a,
          s,
          u = 0;
        if (x(t))
          return this.each(function(e) {
            E(this).removeClass(t.call(this, e, ut(this)));
          });
        if (!arguments.length) return this.attr('class', '');
        if ((e = lt(t)).length)
          while ((n = this[u++]))
            if (((i = ut(n)), (r = 1 === n.nodeType && ' ' + st(i) + ' '))) {
              a = 0;
              while ((o = e[a++]))
                while (-1 < r.indexOf(' ' + o + ' '))
                  r = r.replace(' ' + o + ' ', ' ');
              i !== (s = st(r)) && n.setAttribute('class', s);
            }
        return this;
      },
      toggleClass: function(i, t) {
        var o = typeof i,
          a = 'string' === o || Array.isArray(i);
        return 'boolean' == typeof t && a
          ? t
            ? this.addClass(i)
            : this.removeClass(i)
          : x(i)
          ? this.each(function(e) {
              E(this).toggleClass(i.call(this, e, ut(this), t), t);
            })
          : this.each(function() {
              var e, t, n, r;
              if (a) {
                (t = 0), (n = E(this)), (r = lt(i));
                while ((e = r[t++]))
                  n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
              } else (void 0 !== i && 'boolean' !== o) || ((e = ut(this)) && G.set(this, '__className__', e), this.setAttribute && this.setAttribute('class', e || !1 === i ? '' : G.get(this, '__className__') || ''));
            });
      },
      hasClass: function(e) {
        var t,
          n,
          r = 0;
        t = ' ' + e + ' ';
        while ((n = this[r++]))
          if (1 === n.nodeType && -1 < (' ' + st(ut(n)) + ' ').indexOf(t))
            return !0;
        return !1;
      },
    });
  var ct = /\r/g;
  E.fn.extend({
    val: function(n) {
      var r,
        e,
        i,
        t = this[0];
      return arguments.length
        ? ((i = x(n)),
          this.each(function(e) {
            var t;
            1 === this.nodeType &&
              (null == (t = i ? n.call(this, e, E(this).val()) : n)
                ? (t = '')
                : 'number' == typeof t
                ? (t += '')
                : Array.isArray(t) &&
                  (t = E.map(t, function(e) {
                    return null == e ? '' : e + '';
                  })),
              ((r =
                E.valHooks[this.type] ||
                E.valHooks[this.nodeName.toLowerCase()]) &&
                'set' in r &&
                void 0 !== r.set(this, t, 'value')) ||
                (this.value = t));
          }))
        : t
        ? (r = E.valHooks[t.type] || E.valHooks[t.nodeName.toLowerCase()]) &&
          'get' in r &&
          void 0 !== (e = r.get(t, 'value'))
          ? e
          : 'string' == typeof (e = t.value)
          ? e.replace(ct, '')
          : null == e
          ? ''
          : e
        : void 0;
    },
  }),
    E.extend({
      valHooks: {
        option: {
          get: function(e) {
            var t = E.find.attr(e, 'value');
            return null != t ? t : st(E.text(e));
          },
        },
        select: {
          get: function(e) {
            var t,
              n,
              r,
              i = e.options,
              o = e.selectedIndex,
              a = 'select-one' === e.type,
              s = a ? null : [],
              u = a ? o + 1 : i.length;
            for (r = o < 0 ? u : a ? o : 0; r < u; r++)
              if (
                ((n = i[r]).selected || r === o) &&
                !n.disabled &&
                (!n.parentNode.disabled || !S(n.parentNode, 'optgroup'))
              ) {
                if (((t = E(n).val()), a)) return t;
                s.push(t);
              }
            return s;
          },
          set: function(e, t) {
            var n,
              r,
              i = e.options,
              o = E.makeArray(t),
              a = i.length;
            while (a--)
              ((r = i[a]).selected =
                -1 < E.inArray(E.valHooks.option.get(r), o)) && (n = !0);
            return n || (e.selectedIndex = -1), o;
          },
        },
      },
    }),
    E.each(['radio', 'checkbox'], function() {
      (E.valHooks[this] = {
        set: function(e, t) {
          if (Array.isArray(t))
            return (e.checked = -1 < E.inArray(E(e).val(), t));
        },
      }),
        b.checkOn ||
          (E.valHooks[this].get = function(e) {
            return null === e.getAttribute('value') ? 'on' : e.value;
          });
    }),
    (b.focusin = 'onfocusin' in g);
  var ft = /^(?:focusinfocus|focusoutblur)$/,
    dt = function(e) {
      e.stopPropagation();
    };
  E.extend(E.event, {
    trigger: function(e, t, n, r) {
      var i,
        o,
        a,
        s,
        u,
        l,
        c,
        f,
        d = [n || v],
        p = m.call(e, 'type') ? e.type : e,
        h = m.call(e, 'namespace') ? e.namespace.split('.') : [];
      if (
        ((o = f = a = n = n || v),
        3 !== n.nodeType &&
          8 !== n.nodeType &&
          !ft.test(p + E.event.triggered) &&
          (-1 < p.indexOf('.') && ((p = (h = p.split('.')).shift()), h.sort()),
          (u = p.indexOf(':') < 0 && 'on' + p),
          ((e = e[E.expando]
            ? e
            : new E.Event(p, 'object' == typeof e && e)).isTrigger = r ? 2 : 3),
          (e.namespace = h.join('.')),
          (e.rnamespace = e.namespace
            ? new RegExp('(^|\\.)' + h.join('\\.(?:.*\\.|)') + '(\\.|$)')
            : null),
          (e.result = void 0),
          e.target || (e.target = n),
          (t = null == t ? [e] : E.makeArray(t, [e])),
          (c = E.event.special[p] || {}),
          r || !c.trigger || !1 !== c.trigger.apply(n, t)))
      ) {
        if (!r && !c.noBubble && !w(n)) {
          for (
            s = c.delegateType || p, ft.test(s + p) || (o = o.parentNode);
            o;
            o = o.parentNode
          )
            d.push(o), (a = o);
          a === (n.ownerDocument || v) &&
            d.push(a.defaultView || a.parentWindow || g);
        }
        i = 0;
        while ((o = d[i++]) && !e.isPropagationStopped())
          (f = o),
            (e.type = 1 < i ? s : c.bindType || p),
            (l = (G.get(o, 'events') || {})[e.type] && G.get(o, 'handle')) &&
              l.apply(o, t),
            (l = u && o[u]) &&
              l.apply &&
              Q(o) &&
              ((e.result = l.apply(o, t)),
              !1 === e.result && e.preventDefault());
        return (
          (e.type = p),
          r ||
            e.isDefaultPrevented() ||
            (c._default && !1 !== c._default.apply(d.pop(), t)) ||
            !Q(n) ||
            (u &&
              x(n[p]) &&
              !w(n) &&
              ((a = n[u]) && (n[u] = null),
              (E.event.triggered = p),
              e.isPropagationStopped() && f.addEventListener(p, dt),
              n[p](),
              e.isPropagationStopped() && f.removeEventListener(p, dt),
              (E.event.triggered = void 0),
              a && (n[u] = a))),
          e.result
        );
      }
    },
    simulate: function(e, t, n) {
      var r = E.extend(new E.Event(), n, { type: e, isSimulated: !0 });
      E.event.trigger(r, null, t);
    },
  }),
    E.fn.extend({
      trigger: function(e, t) {
        return this.each(function() {
          E.event.trigger(e, t, this);
        });
      },
      triggerHandler: function(e, t) {
        var n = this[0];
        if (n) return E.event.trigger(e, t, n, !0);
      },
    }),
    b.focusin ||
      E.each({ focus: 'focusin', blur: 'focusout' }, function(n, r) {
        var i = function(e) {
          E.event.simulate(r, e.target, E.event.fix(e));
        };
        E.event.special[r] = {
          setup: function() {
            var e = this.ownerDocument || this,
              t = G.access(e, r);
            t || e.addEventListener(n, i, !0), G.access(e, r, (t || 0) + 1);
          },
          teardown: function() {
            var e = this.ownerDocument || this,
              t = G.access(e, r) - 1;
            t
              ? G.access(e, r, t)
              : (e.removeEventListener(n, i, !0), G.remove(e, r));
          },
        };
      });
  var pt,
    ht = /\[\]$/,
    gt = /\r?\n/g,
    vt = /^(?:submit|button|image|reset|file)$/i,
    yt = /^(?:input|select|textarea|keygen)/i;
  function mt(n, e, r, i) {
    var t;
    if (Array.isArray(e))
      E.each(e, function(e, t) {
        r || ht.test(n)
          ? i(n, t)
          : mt(
              n + '[' + ('object' == typeof t && null != t ? e : '') + ']',
              t,
              r,
              i
            );
      });
    else if (r || 'object' !== T(e)) i(n, e);
    else for (t in e) mt(n + '[' + t + ']', e[t], r, i);
  }
  (E.param = function(e, t) {
    var n,
      r = [],
      i = function(e, t) {
        var n = x(t) ? t() : t;
        r[r.length] =
          encodeURIComponent(e) + '=' + encodeURIComponent(null == n ? '' : n);
      };
    if (null == e) return '';
    if (Array.isArray(e) || (e.jquery && !E.isPlainObject(e)))
      E.each(e, function() {
        i(this.name, this.value);
      });
    else for (n in e) mt(n, e[n], t, i);
    return r.join('&');
  }),
    E.fn.extend({
      serialize: function() {
        return E.param(this.serializeArray());
      },
      serializeArray: function() {
        return this.map(function() {
          var e = E.prop(this, 'elements');
          return e ? E.makeArray(e) : this;
        })
          .filter(function() {
            var e = this.type;
            return (
              this.name &&
              !E(this).is(':disabled') &&
              yt.test(this.nodeName) &&
              !vt.test(e) &&
              (this.checked || !fe.test(e))
            );
          })
          .map(function(e, t) {
            var n = E(this).val();
            return null == n
              ? null
              : Array.isArray(n)
              ? E.map(n, function(e) {
                  return { name: t.name, value: e.replace(gt, '\r\n') };
                })
              : { name: t.name, value: n.replace(gt, '\r\n') };
          })
          .get();
      },
    }),
    E.fn.extend({
      wrapAll: function(e) {
        var t;
        return (
          this[0] &&
            (x(e) && (e = e.call(this[0])),
            (t = E(e, this[0].ownerDocument)
              .eq(0)
              .clone(!0)),
            this[0].parentNode && t.insertBefore(this[0]),
            t
              .map(function() {
                var e = this;
                while (e.firstElementChild) e = e.firstElementChild;
                return e;
              })
              .append(this)),
          this
        );
      },
      wrapInner: function(n) {
        return x(n)
          ? this.each(function(e) {
              E(this).wrapInner(n.call(this, e));
            })
          : this.each(function() {
              var e = E(this),
                t = e.contents();
              t.length ? t.wrapAll(n) : e.append(n);
            });
      },
      wrap: function(t) {
        var n = x(t);
        return this.each(function(e) {
          E(this).wrapAll(n ? t.call(this, e) : t);
        });
      },
      unwrap: function(e) {
        return (
          this.parent(e)
            .not('body')
            .each(function() {
              E(this).replaceWith(this.childNodes);
            }),
          this
        );
      },
    }),
    (E.expr.pseudos.hidden = function(e) {
      return !E.expr.pseudos.visible(e);
    }),
    (E.expr.pseudos.visible = function(e) {
      return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
    }),
    (b.createHTMLDocument = (((pt = v.implementation.createHTMLDocument('')
      .body).innerHTML = '<form></form><form></form>'),
    2 === pt.childNodes.length)),
    (E.parseHTML = function(e, t, n) {
      return 'string' != typeof e
        ? []
        : ('boolean' == typeof t && ((n = t), (t = !1)),
          t ||
            (b.createHTMLDocument
              ? (((r = (t = v.implementation.createHTMLDocument(
                  ''
                )).createElement('base')).href = v.location.href),
                t.head.appendChild(r))
              : (t = v)),
          (o = !n && []),
          (i = D.exec(e))
            ? [t.createElement(i[1])]
            : ((i = xe([e], t, o)),
              o && o.length && E(o).remove(),
              E.merge([], i.childNodes)));
      var r, i, o;
    }),
    (E.offset = {
      setOffset: function(e, t, n) {
        var r,
          i,
          o,
          a,
          s,
          u,
          l = E.css(e, 'position'),
          c = E(e),
          f = {};
        'static' === l && (e.style.position = 'relative'),
          (s = c.offset()),
          (o = E.css(e, 'top')),
          (u = E.css(e, 'left')),
          ('absolute' === l || 'fixed' === l) && -1 < (o + u).indexOf('auto')
            ? ((a = (r = c.position()).top), (i = r.left))
            : ((a = parseFloat(o) || 0), (i = parseFloat(u) || 0)),
          x(t) && (t = t.call(e, n, E.extend({}, s))),
          null != t.top && (f.top = t.top - s.top + a),
          null != t.left && (f.left = t.left - s.left + i),
          'using' in t ? t.using.call(e, f) : c.css(f);
      },
    }),
    E.fn.extend({
      offset: function(t) {
        if (arguments.length)
          return void 0 === t
            ? this
            : this.each(function(e) {
                E.offset.setOffset(this, t, e);
              });
        var e,
          n,
          r = this[0];
        return r
          ? r.getClientRects().length
            ? ((e = r.getBoundingClientRect()),
              (n = r.ownerDocument.defaultView),
              { top: e.top + n.pageYOffset, left: e.left + n.pageXOffset })
            : { top: 0, left: 0 }
          : void 0;
      },
      position: function() {
        if (this[0]) {
          var e,
            t,
            n,
            r = this[0],
            i = { top: 0, left: 0 };
          if ('fixed' === E.css(r, 'position')) t = r.getBoundingClientRect();
          else {
            (t = this.offset()),
              (n = r.ownerDocument),
              (e = r.offsetParent || n.documentElement);
            while (
              e &&
              (e === n.body || e === n.documentElement) &&
              'static' === E.css(e, 'position')
            )
              e = e.parentNode;
            e &&
              e !== r &&
              1 === e.nodeType &&
              (((i = E(e).offset()).top += E.css(e, 'borderTopWidth', !0)),
              (i.left += E.css(e, 'borderLeftWidth', !0)));
          }
          return {
            top: t.top - i.top - E.css(r, 'marginTop', !0),
            left: t.left - i.left - E.css(r, 'marginLeft', !0),
          };
        }
      },
      offsetParent: function() {
        return this.map(function() {
          var e = this.offsetParent;
          while (e && 'static' === E.css(e, 'position')) e = e.offsetParent;
          return e || ie;
        });
      },
    }),
    E.each({ scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' }, function(
      t,
      i
    ) {
      var o = 'pageYOffset' === i;
      E.fn[t] = function(e) {
        return z(
          this,
          function(e, t, n) {
            var r;
            if (
              (w(e) ? (r = e) : 9 === e.nodeType && (r = e.defaultView),
              void 0 === n)
            )
              return r ? r[i] : e[t];
            r
              ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset)
              : (e[t] = n);
          },
          t,
          e,
          arguments.length
        );
      };
    }),
    E.each(['top', 'left'], function(e, n) {
      E.cssHooks[n] = ze(b.pixelPosition, function(e, t) {
        if (t)
          return (t = Fe(e, n)), Me.test(t) ? E(e).position()[n] + 'px' : t;
      });
    }),
    E.each({ Height: 'height', Width: 'width' }, function(a, s) {
      E.each({ padding: 'inner' + a, content: s, '': 'outer' + a }, function(
        r,
        o
      ) {
        E.fn[o] = function(e, t) {
          var n = arguments.length && (r || 'boolean' != typeof e),
            i = r || (!0 === e || !0 === t ? 'margin' : 'border');
          return z(
            this,
            function(e, t, n) {
              var r;
              return w(e)
                ? 0 === o.indexOf('outer')
                  ? e['inner' + a]
                  : e.document.documentElement['client' + a]
                : 9 === e.nodeType
                ? ((r = e.documentElement),
                  Math.max(
                    e.body['scroll' + a],
                    r['scroll' + a],
                    e.body['offset' + a],
                    r['offset' + a],
                    r['client' + a]
                  ))
                : void 0 === n
                ? E.css(e, t, i)
                : E.style(e, t, n, i);
            },
            s,
            n ? e : void 0,
            n
          );
        };
      });
    }),
    E.each(
      'blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu'.split(
        ' '
      ),
      function(e, n) {
        E.fn[n] = function(e, t) {
          return 0 < arguments.length
            ? this.on(n, null, e, t)
            : this.trigger(n);
        };
      }
    ),
    E.fn.extend({
      hover: function(e, t) {
        return this.mouseenter(e).mouseleave(t || e);
      },
    }),
    E.fn.extend({
      bind: function(e, t, n) {
        return this.on(e, null, t, n);
      },
      unbind: function(e, t) {
        return this.off(e, null, t);
      },
      delegate: function(e, t, n, r) {
        return this.on(t, e, n, r);
      },
      undelegate: function(e, t, n) {
        return 1 === arguments.length
          ? this.off(e, '**')
          : this.off(t, e || '**', n);
      },
    }),
    (E.proxy = function(e, t) {
      var n, r, i;
      if (('string' == typeof t && ((n = e[t]), (t = e), (e = n)), x(e)))
        return (
          (r = s.call(arguments, 2)),
          ((i = function() {
            return e.apply(t || this, r.concat(s.call(arguments)));
          }).guid = e.guid = e.guid || E.guid++),
          i
        );
    }),
    (E.holdReady = function(e) {
      e ? E.readyWait++ : E.ready(!0);
    }),
    (E.isArray = Array.isArray),
    (E.parseJSON = JSON.parse),
    (E.nodeName = S),
    (E.isFunction = x),
    (E.isWindow = w),
    (E.camelCase = X),
    (E.type = T),
    (E.now = Date.now),
    (E.isNumeric = function(e) {
      var t = E.type(e);
      return ('number' === t || 'string' === t) && !isNaN(e - parseFloat(e));
    }),
    'function' == typeof define &&
      define.amd &&
      define('jquery', [], function() {
        return E;
      });
  var bt = g.jQuery,
    xt = g.$;
  return (
    (E.noConflict = function(e) {
      return g.$ === E && (g.$ = xt), e && g.jQuery === E && (g.jQuery = bt), E;
    }),
    e || (g.jQuery = g.$ = E),
    E
  );
});

// Typewriter.js
!(function(t, e) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
    ? define('Typewriter', [], e)
    : 'object' == typeof exports
    ? (exports.Typewriter = e())
    : (t.Typewriter = e());
})(window, function() {
  return (function(t) {
    var e = {};
    function n(r) {
      if (e[r]) return e[r].exports;
      var o = (e[r] = { i: r, l: !1, exports: {} });
      return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    return (
      (n.m = t),
      (n.c = e),
      (n.d = function(t, e, r) {
        n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
      }),
      (n.r = function(t) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 });
      }),
      (n.t = function(t, e) {
        if ((1 & e && (t = n(t)), 8 & e)) return t;
        if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
        var r = Object.create(null);
        if (
          (n.r(r),
          Object.defineProperty(r, 'default', { enumerable: !0, value: t }),
          2 & e && 'string' != typeof t)
        )
          for (var o in t)
            n.d(
              r,
              o,
              function(e) {
                return t[e];
              }.bind(null, o)
            );
        return r;
      }),
      (n.n = function(t) {
        var e =
          t && t.__esModule
            ? function() {
                return t.default;
              }
            : function() {
                return t;
              };
        return n.d(e, 'a', e), e;
      }),
      (n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (n.p = ''),
      n((n.s = 53))
    );
  })([
    function(t, e, n) {
      var r = n(27)('wks'),
        o = n(15),
        i = n(1).Symbol,
        u = 'function' == typeof i;
      (t.exports = function(t) {
        return r[t] || (r[t] = (u && i[t]) || (u ? i : o)('Symbol.' + t));
      }).store = r;
    },
    function(t, e) {
      var n = (t.exports =
        'undefined' != typeof window && window.Math == Math
          ? window
          : 'undefined' != typeof self && self.Math == Math
          ? self
          : Function('return this')());
      'number' == typeof __g && (__g = n);
    },
    function(t, e, n) {
      var r = n(8),
        o = n(36),
        i = n(23),
        u = Object.defineProperty;
      e.f = n(3)
        ? Object.defineProperty
        : function(t, e, n) {
            if ((r(t), (e = i(e, !0)), r(n), o))
              try {
                return u(t, e, n);
              } catch (t) {}
            if ('get' in n || 'set' in n)
              throw TypeError('Accessors not supported!');
            return 'value' in n && (t[e] = n.value), t;
          };
    },
    function(t, e, n) {
      t.exports = !n(6)(function() {
        return (
          7 !=
          Object.defineProperty({}, 'a', {
            get: function() {
              return 7;
            },
          }).a
        );
      });
    },
    function(t, e, n) {
      var r = n(1),
        o = n(11),
        i = n(7),
        u = n(9),
        a = n(18),
        c = function(t, e, n) {
          var s,
            f,
            l,
            p,
            v = t & c.F,
            h = t & c.G,
            d = t & c.S,
            y = t & c.P,
            m = t & c.B,
            g = h ? r : d ? r[e] || (r[e] = {}) : (r[e] || {}).prototype,
            b = h ? o : o[e] || (o[e] = {}),
            E = b.prototype || (b.prototype = {});
          for (s in (h && (n = e), n))
            (l = ((f = !v && g && void 0 !== g[s]) ? g : n)[s]),
              (p =
                m && f
                  ? a(l, r)
                  : y && 'function' == typeof l
                  ? a(Function.call, l)
                  : l),
              g && u(g, s, l, t & c.U),
              b[s] != l && i(b, s, p),
              y && E[s] != l && (E[s] = l);
        };
      (r.core = o),
        (c.F = 1),
        (c.G = 2),
        (c.S = 4),
        (c.P = 8),
        (c.B = 16),
        (c.W = 32),
        (c.U = 64),
        (c.R = 128),
        (t.exports = c);
    },
    function(t, e) {
      t.exports = function(t) {
        return 'object' == typeof t ? null !== t : 'function' == typeof t;
      };
    },
    function(t, e) {
      t.exports = function(t) {
        try {
          return !!t();
        } catch (t) {
          return !0;
        }
      };
    },
    function(t, e, n) {
      var r = n(2),
        o = n(14);
      t.exports = n(3)
        ? function(t, e, n) {
            return r.f(t, e, o(1, n));
          }
        : function(t, e, n) {
            return (t[e] = n), t;
          };
    },
    function(t, e, n) {
      var r = n(5);
      t.exports = function(t) {
        if (!r(t)) throw TypeError(t + ' is not an object!');
        return t;
      };
    },
    function(t, e, n) {
      var r = n(1),
        o = n(7),
        i = n(10),
        u = n(15)('src'),
        a = Function.toString,
        c = ('' + a).split('toString');
      (n(11).inspectSource = function(t) {
        return a.call(t);
      }),
        (t.exports = function(t, e, n, a) {
          var s = 'function' == typeof n;
          s && (i(n, 'name') || o(n, 'name', e)),
            t[e] !== n &&
              (s && (i(n, u) || o(n, u, t[e] ? '' + t[e] : c.join(String(e)))),
              t === r
                ? (t[e] = n)
                : a
                ? t[e]
                  ? (t[e] = n)
                  : o(t, e, n)
                : (delete t[e], o(t, e, n)));
        })(Function.prototype, 'toString', function() {
          return ('function' == typeof this && this[u]) || a.call(this);
        });
    },
    function(t, e) {
      var n = {}.hasOwnProperty;
      t.exports = function(t, e) {
        return n.call(t, e);
      };
    },
    function(t, e) {
      var n = (t.exports = { version: '2.5.7' });
      'number' == typeof __e && (__e = n);
    },
    function(t, e, n) {
      var r = n(39),
        o = n(21);
      t.exports = function(t) {
        return r(o(t));
      };
    },
    ,
    function(t, e) {
      t.exports = function(t, e) {
        return {
          enumerable: !(1 & t),
          configurable: !(2 & t),
          writable: !(4 & t),
          value: e,
        };
      };
    },
    function(t, e) {
      var n = 0,
        r = Math.random();
      t.exports = function(t) {
        return 'Symbol('.concat(
          void 0 === t ? '' : t,
          ')_',
          (++n + r).toString(36)
        );
      };
    },
    function(t, e) {
      t.exports = {};
    },
    function(t, e, n) {
      var r = n(43),
        o = n(29);
      t.exports =
        Object.keys ||
        function(t) {
          return r(t, o);
        };
    },
    function(t, e, n) {
      var r = n(55);
      t.exports = function(t, e, n) {
        if ((r(t), void 0 === e)) return t;
        switch (n) {
          case 1:
            return function(n) {
              return t.call(e, n);
            };
          case 2:
            return function(n, r) {
              return t.call(e, n, r);
            };
          case 3:
            return function(n, r, o) {
              return t.call(e, n, r, o);
            };
        }
        return function() {
          return t.apply(e, arguments);
        };
      };
    },
    function(t, e) {
      var n = {}.toString;
      t.exports = function(t) {
        return n.call(t).slice(8, -1);
      };
    },
    function(t, e, n) {
      var r = n(21);
      t.exports = function(t) {
        return Object(r(t));
      };
    },
    function(t, e) {
      t.exports = function(t) {
        if (void 0 == t) throw TypeError("Can't call method on  " + t);
        return t;
      };
    },
    function(t, e) {
      t.exports = !1;
    },
    function(t, e, n) {
      var r = n(5);
      t.exports = function(t, e) {
        if (!r(t)) return t;
        var n, o;
        if (e && 'function' == typeof (n = t.toString) && !r((o = n.call(t))))
          return o;
        if ('function' == typeof (n = t.valueOf) && !r((o = n.call(t))))
          return o;
        if (!e && 'function' == typeof (n = t.toString) && !r((o = n.call(t))))
          return o;
        throw TypeError("Can't convert object to primitive value");
      };
    },
    function(t, e, n) {
      var r = n(25),
        o = Math.min;
      t.exports = function(t) {
        return t > 0 ? o(r(t), 9007199254740991) : 0;
      };
    },
    function(t, e) {
      var n = Math.ceil,
        r = Math.floor;
      t.exports = function(t) {
        return isNaN((t = +t)) ? 0 : (t > 0 ? r : n)(t);
      };
    },
    function(t, e, n) {
      var r = n(19);
      t.exports =
        Array.isArray ||
        function(t) {
          return 'Array' == r(t);
        };
    },
    function(t, e, n) {
      var r = n(11),
        o = n(1),
        i = o['__core-js_shared__'] || (o['__core-js_shared__'] = {});
      (t.exports = function(t, e) {
        return i[t] || (i[t] = void 0 !== e ? e : {});
      })('versions', []).push({
        version: r.version,
        mode: n(22) ? 'pure' : 'global',
        copyright: '© 2018 Denis Pushkarev (zloirock.ru)',
      });
    },
    function(t, e, n) {
      var r = n(27)('keys'),
        o = n(15);
      t.exports = function(t) {
        return r[t] || (r[t] = o(t));
      };
    },
    function(t, e) {
      t.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(
        ','
      );
    },
    function(t, e, n) {
      var r = n(2).f,
        o = n(10),
        i = n(0)('toStringTag');
      t.exports = function(t, e, n) {
        t &&
          !o((t = n ? t : t.prototype), i) &&
          r(t, i, { configurable: !0, value: e });
      };
    },
    function(t, e, n) {
      'use strict';
      var r = n(8);
      t.exports = function() {
        var t = r(this),
          e = '';
        return (
          t.global && (e += 'g'),
          t.ignoreCase && (e += 'i'),
          t.multiline && (e += 'm'),
          t.unicode && (e += 'u'),
          t.sticky && (e += 'y'),
          e
        );
      };
    },
    function(t, e) {
      e.f = {}.propertyIsEnumerable;
    },
    function(t, e, n) {
      var r = n(43),
        o = n(29).concat('length', 'prototype');
      e.f =
        Object.getOwnPropertyNames ||
        function(t) {
          return r(t, o);
        };
    },
    function(t, e, n) {
      (function(e) {
        for (
          var r = n(90),
            o = 'undefined' == typeof window ? e : window,
            i = ['moz', 'webkit'],
            u = 'AnimationFrame',
            a = o['request' + u],
            c = o['cancel' + u] || o['cancelRequest' + u],
            s = 0;
          !a && s < i.length;
          s++
        )
          (a = o[i[s] + 'Request' + u]),
            (c = o[i[s] + 'Cancel' + u] || o[i[s] + 'CancelRequest' + u]);
        if (!a || !c) {
          var f = 0,
            l = 0,
            p = [];
          (a = function(t) {
            if (0 === p.length) {
              var e = r(),
                n = Math.max(0, 1e3 / 60 - (e - f));
              (f = n + e),
                setTimeout(function() {
                  var t = p.slice(0);
                  p.length = 0;
                  for (var e = 0; e < t.length; e++)
                    if (!t[e].cancelled)
                      try {
                        t[e].callback(f);
                      } catch (t) {
                        setTimeout(function() {
                          throw t;
                        }, 0);
                      }
                }, Math.round(n));
            }
            return p.push({ handle: ++l, callback: t, cancelled: !1 }), l;
          }),
            (c = function(t) {
              for (var e = 0; e < p.length; e++)
                p[e].handle === t && (p[e].cancelled = !0);
            });
        }
        (t.exports = function(t) {
          return a.call(o, t);
        }),
          (t.exports.cancel = function() {
            c.apply(o, arguments);
          }),
          (t.exports.polyfill = function(t) {
            t || (t = o),
              (t.requestAnimationFrame = a),
              (t.cancelAnimationFrame = c);
          });
      }.call(this, n(89)));
    },
    function(t, e, n) {
      var r = n(8),
        o = n(61),
        i = n(29),
        u = n(28)('IE_PROTO'),
        a = function() {},
        c = function() {
          var t,
            e = n(37)('iframe'),
            r = i.length;
          for (
            e.style.display = 'none',
              n(64).appendChild(e),
              e.src = 'javascript:',
              (t = e.contentWindow.document).open(),
              t.write('<script>document.F=Object</script>'),
              t.close(),
              c = t.F;
            r--;

          )
            delete c.prototype[i[r]];
          return c();
        };
      t.exports =
        Object.create ||
        function(t, e) {
          var n;
          return (
            null !== t
              ? ((a.prototype = r(t)),
                (n = new a()),
                (a.prototype = null),
                (n[u] = t))
              : (n = c()),
            void 0 === e ? n : o(n, e)
          );
        };
    },
    function(t, e, n) {
      t.exports =
        !n(3) &&
        !n(6)(function() {
          return (
            7 !=
            Object.defineProperty(n(37)('div'), 'a', {
              get: function() {
                return 7;
              },
            }).a
          );
        });
    },
    function(t, e, n) {
      var r = n(5),
        o = n(1).document,
        i = r(o) && r(o.createElement);
      t.exports = function(t) {
        return i ? o.createElement(t) : {};
      };
    },
    function(t, e, n) {
      var r = n(18),
        o = n(39),
        i = n(20),
        u = n(24),
        a = n(56);
      t.exports = function(t, e) {
        var n = 1 == t,
          c = 2 == t,
          s = 3 == t,
          f = 4 == t,
          l = 6 == t,
          p = 5 == t || l,
          v = e || a;
        return function(e, a, h) {
          for (
            var d,
              y,
              m = i(e),
              g = o(m),
              b = r(a, h, 3),
              E = u(g.length),
              T = 0,
              w = n ? v(e, E) : c ? v(e, 0) : void 0;
            E > T;
            T++
          )
            if ((p || T in g) && ((y = b((d = g[T]), T, m)), t))
              if (n) w[T] = y;
              else if (y)
                switch (t) {
                  case 3:
                    return !0;
                  case 5:
                    return d;
                  case 6:
                    return T;
                  case 2:
                    w.push(d);
                }
              else if (f) return !1;
          return l ? -1 : s || f ? f : w;
        };
      };
    },
    function(t, e, n) {
      var r = n(19);
      t.exports = Object('z').propertyIsEnumerable(0)
        ? Object
        : function(t) {
            return 'String' == r(t) ? t.split('') : Object(t);
          };
    },
    function(t, e, n) {
      'use strict';
      var r = n(6);
      t.exports = function(t, e) {
        return (
          !!t &&
          r(function() {
            e ? t.call(null, function() {}, 1) : t.call(null);
          })
        );
      };
    },
    function(t, e, n) {
      'use strict';
      var r = n(58),
        o = n(59),
        i = n(16),
        u = n(12);
      (t.exports = n(42)(
        Array,
        'Array',
        function(t, e) {
          (this._t = u(t)), (this._i = 0), (this._k = e);
        },
        function() {
          var t = this._t,
            e = this._k,
            n = this._i++;
          return !t || n >= t.length
            ? ((this._t = void 0), o(1))
            : o(0, 'keys' == e ? n : 'values' == e ? t[n] : [n, t[n]]);
        },
        'values'
      )),
        (i.Arguments = i.Array),
        r('keys'),
        r('values'),
        r('entries');
    },
    function(t, e, n) {
      'use strict';
      var r = n(22),
        o = n(4),
        i = n(9),
        u = n(7),
        a = n(16),
        c = n(60),
        s = n(30),
        f = n(65),
        l = n(0)('iterator'),
        p = !([].keys && 'next' in [].keys()),
        v = function() {
          return this;
        };
      t.exports = function(t, e, n, h, d, y, m) {
        c(n, e, h);
        var g,
          b,
          E,
          T = function(t) {
            if (!p && t in S) return S[t];
            switch (t) {
              case 'keys':
              case 'values':
                return function() {
                  return new n(this, t);
                };
            }
            return function() {
              return new n(this, t);
            };
          },
          w = e + ' Iterator',
          O = 'values' == d,
          x = !1,
          S = t.prototype,
          _ = S[l] || S['@@iterator'] || (d && S[d]),
          A = _ || T(d),
          L = d ? (O ? T('entries') : A) : void 0,
          N = ('Array' == e && S.entries) || _;
        if (
          (N &&
            (E = f(N.call(new t()))) !== Object.prototype &&
            E.next &&
            (s(E, w, !0), r || 'function' == typeof E[l] || u(E, l, v)),
          O &&
            _ &&
            'values' !== _.name &&
            ((x = !0),
            (A = function() {
              return _.call(this);
            })),
          (r && !m) || (!p && !x && S[l]) || u(S, l, A),
          (a[e] = A),
          (a[w] = v),
          d)
        )
          if (
            ((g = {
              values: O ? A : T('values'),
              keys: y ? A : T('keys'),
              entries: L,
            }),
            m)
          )
            for (b in g) b in S || i(S, b, g[b]);
          else o(o.P + o.F * (p || x), e, g);
        return g;
      };
    },
    function(t, e, n) {
      var r = n(10),
        o = n(12),
        i = n(62)(!1),
        u = n(28)('IE_PROTO');
      t.exports = function(t, e) {
        var n,
          a = o(t),
          c = 0,
          s = [];
        for (n in a) n != u && r(a, n) && s.push(n);
        for (; e.length > c; ) r(a, (n = e[c++])) && (~i(s, n) || s.push(n));
        return s;
      };
    },
    function(t, e, n) {
      var r = n(1),
        o = n(11),
        i = n(22),
        u = n(45),
        a = n(2).f;
      t.exports = function(t) {
        var e = o.Symbol || (o.Symbol = i ? {} : r.Symbol || {});
        '_' == t.charAt(0) || t in e || a(e, t, { value: u.f(t) });
      };
    },
    function(t, e, n) {
      e.f = n(0);
    },
    function(t, e) {
      e.f = Object.getOwnPropertySymbols;
    },
    function(t, e, n) {
      var r = n(32),
        o = n(14),
        i = n(12),
        u = n(23),
        a = n(10),
        c = n(36),
        s = Object.getOwnPropertyDescriptor;
      e.f = n(3)
        ? s
        : function(t, e) {
            if (((t = i(t)), (e = u(e, !0)), c))
              try {
                return s(t, e);
              } catch (t) {}
            if (a(t, e)) return o(!r.f.call(t, e), t[e]);
          };
    },
    function(t, e, n) {
      var r = n(5),
        o = n(19),
        i = n(0)('match');
      t.exports = function(t) {
        var e;
        return r(t) && (void 0 !== (e = t[i]) ? !!e : 'RegExp' == o(t));
      };
    },
    function(t, e, n) {
      n(44)('asyncIterator');
    },
    function(t, e, n) {
      'use strict';
      var r = n(1),
        o = n(10),
        i = n(3),
        u = n(4),
        a = n(9),
        c = n(80).KEY,
        s = n(6),
        f = n(27),
        l = n(30),
        p = n(15),
        v = n(0),
        h = n(45),
        d = n(44),
        y = n(81),
        m = n(26),
        g = n(8),
        b = n(5),
        E = n(12),
        T = n(23),
        w = n(14),
        O = n(35),
        x = n(82),
        S = n(47),
        _ = n(2),
        A = n(17),
        L = S.f,
        N = _.f,
        M = x.f,
        R = r.Symbol,
        C = r.JSON,
        j = C && C.stringify,
        P = v('_hidden'),
        k = v('toPrimitive'),
        I = {}.propertyIsEnumerable,
        D = f('symbol-registry'),
        F = f('symbols'),
        U = f('op-symbols'),
        V = Object.prototype,
        H = 'function' == typeof R,
        G = r.QObject,
        Q = !G || !G.prototype || !G.prototype.findChild,
        B =
          i &&
          s(function() {
            return (
              7 !=
              O(
                N({}, 'a', {
                  get: function() {
                    return N(this, 'a', { value: 7 }).a;
                  },
                })
              ).a
            );
          })
            ? function(t, e, n) {
                var r = L(V, e);
                r && delete V[e], N(t, e, n), r && t !== V && N(V, e, r);
              }
            : N,
        q = function(t) {
          var e = (F[t] = O(R.prototype));
          return (e._k = t), e;
        },
        Y =
          H && 'symbol' == typeof R.iterator
            ? function(t) {
                return 'symbol' == typeof t;
              }
            : function(t) {
                return t instanceof R;
              },
        J = function(t, e, n) {
          return (
            t === V && J(U, e, n),
            g(t),
            (e = T(e, !0)),
            g(n),
            o(F, e)
              ? (n.enumerable
                  ? (o(t, P) && t[P][e] && (t[P][e] = !1),
                    (n = O(n, { enumerable: w(0, !1) })))
                  : (o(t, P) || N(t, P, w(1, {})), (t[P][e] = !0)),
                B(t, e, n))
              : N(t, e, n)
          );
        },
        W = function(t, e) {
          g(t);
          for (var n, r = y((e = E(e))), o = 0, i = r.length; i > o; )
            J(t, (n = r[o++]), e[n]);
          return t;
        },
        z = function(t) {
          var e = I.call(this, (t = T(t, !0)));
          return (
            !(this === V && o(F, t) && !o(U, t)) &&
            (!(e || !o(this, t) || !o(F, t) || (o(this, P) && this[P][t])) || e)
          );
        },
        $ = function(t, e) {
          if (((t = E(t)), (e = T(e, !0)), t !== V || !o(F, e) || o(U, e))) {
            var n = L(t, e);
            return (
              !n || !o(F, e) || (o(t, P) && t[P][e]) || (n.enumerable = !0), n
            );
          }
        },
        K = function(t) {
          for (var e, n = M(E(t)), r = [], i = 0; n.length > i; )
            o(F, (e = n[i++])) || e == P || e == c || r.push(e);
          return r;
        },
        X = function(t) {
          for (
            var e, n = t === V, r = M(n ? U : E(t)), i = [], u = 0;
            r.length > u;

          )
            !o(F, (e = r[u++])) || (n && !o(V, e)) || i.push(F[e]);
          return i;
        };
      H ||
        (a(
          (R = function() {
            if (this instanceof R)
              throw TypeError('Symbol is not a constructor!');
            var t = p(arguments.length > 0 ? arguments[0] : void 0),
              e = function(n) {
                this === V && e.call(U, n),
                  o(this, P) && o(this[P], t) && (this[P][t] = !1),
                  B(this, t, w(1, n));
              };
            return i && Q && B(V, t, { configurable: !0, set: e }), q(t);
          }).prototype,
          'toString',
          function() {
            return this._k;
          }
        ),
        (S.f = $),
        (_.f = J),
        (n(33).f = x.f = K),
        (n(32).f = z),
        (n(46).f = X),
        i && !n(22) && a(V, 'propertyIsEnumerable', z, !0),
        (h.f = function(t) {
          return q(v(t));
        })),
        u(u.G + u.W + u.F * !H, { Symbol: R });
      for (
        var Z = 'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(
            ','
          ),
          tt = 0;
        Z.length > tt;

      )
        v(Z[tt++]);
      for (var et = A(v.store), nt = 0; et.length > nt; ) d(et[nt++]);
      u(u.S + u.F * !H, 'Symbol', {
        for: function(t) {
          return o(D, (t += '')) ? D[t] : (D[t] = R(t));
        },
        keyFor: function(t) {
          if (!Y(t)) throw TypeError(t + ' is not a symbol!');
          for (var e in D) if (D[e] === t) return e;
        },
        useSetter: function() {
          Q = !0;
        },
        useSimple: function() {
          Q = !1;
        },
      }),
        u(u.S + u.F * !H, 'Object', {
          create: function(t, e) {
            return void 0 === e ? O(t) : W(O(t), e);
          },
          defineProperty: J,
          defineProperties: W,
          getOwnPropertyDescriptor: $,
          getOwnPropertyNames: K,
          getOwnPropertySymbols: X,
        }),
        C &&
          u(
            u.S +
              u.F *
                (!H ||
                  s(function() {
                    var t = R();
                    return (
                      '[null]' != j([t]) ||
                      '{}' != j({ a: t }) ||
                      '{}' != j(Object(t))
                    );
                  })),
            'JSON',
            {
              stringify: function(t) {
                for (var e, n, r = [t], o = 1; arguments.length > o; )
                  r.push(arguments[o++]);
                if (((n = e = r[1]), (b(e) || void 0 !== t) && !Y(t)))
                  return (
                    m(e) ||
                      (e = function(t, e) {
                        if (
                          ('function' == typeof n && (e = n.call(this, t, e)),
                          !Y(e))
                        )
                          return e;
                      }),
                    (r[1] = e),
                    j.apply(C, r)
                  );
              },
            }
          ),
        R.prototype[k] || n(7)(R.prototype, k, R.prototype.valueOf),
        l(R, 'Symbol'),
        l(Math, 'Math', !0),
        l(r.JSON, 'JSON', !0);
    },
    function(t, e, n) {
      var r = n(4);
      r(r.S + r.F * !n(3), 'Object', { defineProperty: n(2).f });
    },
    function(t, e, n) {
      var r = n(5),
        o = n(8),
        i = function(t, e) {
          if ((o(t), !r(e) && null !== e))
            throw TypeError(e + ": can't set as prototype!");
        };
      t.exports = {
        set:
          Object.setPrototypeOf ||
          ('__proto__' in {}
            ? (function(t, e, r) {
                try {
                  (r = n(18)(
                    Function.call,
                    n(47).f(Object.prototype, '__proto__').set,
                    2
                  ))(t, []),
                    (e = !(t instanceof Array));
                } catch (t) {
                  e = !0;
                }
                return function(t, n) {
                  return i(t, n), e ? (t.__proto__ = n) : r(t, n), t;
                };
              })({}, !1)
            : void 0),
        check: i,
      };
    },
    function(t, e, n) {
      'use strict';
      n.r(e);
      n(54),
        n(41),
        n(66),
        n(68),
        n(70),
        n(77),
        n(79),
        n(49),
        n(50),
        n(83),
        n(51),
        n(84),
        n(85),
        n(87),
        n(88);
      var r = n(34),
        o = n.n(r),
        i = (n(92),
        function(t) {
          return new RegExp(/<[a-z][\s\S]*>/i).test(t);
        }),
        u = function(t) {
          var e = document.createElement('div');
          return (e.innerHTML = t), e.firstChild;
        },
        a = function(t, e) {
          return Math.floor(Math.random() * (e - t + 1)) + t;
        };
      n(95);
      function c(t) {
        return (
          (function(t) {
            if (Array.isArray(t)) {
              for (var e = 0, n = new Array(t.length); e < t.length; e++)
                n[e] = t[e];
              return n;
            }
          })(t) ||
          (function(t) {
            if (
              Symbol.iterator in Object(t) ||
              '[object Arguments]' === Object.prototype.toString.call(t)
            )
              return Array.from(t);
          })(t) ||
          (function() {
            throw new TypeError(
              'Invalid attempt to spread non-iterable instance'
            );
          })()
        );
      }
      function s(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(t, r.key, r);
        }
      }
      function f(t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = n),
          t
        );
      }
      var l = (function() {
        function t(e, n) {
          var r = this;
          if (
            ((function(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function');
            })(this, t),
            f(this, 'eventNames', {
              TYPE_CHARACTER: 'TYPE_CHARACTER',
              REMOVE_CHARACTER: 'REMOVE_CHARACTER',
              REMOVE_ALL: 'REMOVE_ALL',
              REMOVE_LAST_VISIBLE_NODE: 'REMOVE_LAST_VISIBLE_NODE',
              PAUSE_FOR: 'PAUSE_FOR',
              CALL_FUNCTION: 'CALL_FUNCTION',
              ADD_HTML_TAG_ELEMENT: 'ADD_HTML_TAG_ELEMENT',
              REMOVE_HTML_TAG_ELEMENT: 'REMOVE_HTML_TAG_ELEMENT',
            }),
            f(this, 'visibleNodeTypes', {
              HTML_TAG: 'HTML_TAG',
              TEXT_NODE: 'TEXT_NODE',
            }),
            f(this, 'state', {
              cursorAnimation: null,
              lastFrameTime: null,
              pauseUntil: null,
              eventQueue: [],
              eventLoop: null,
              eventLoopPaused: !1,
              reverseCalledEvents: [],
              calledEvents: [],
              visibleNodes: [],
              elements: {
                container: null,
                wrapper: document.createElement('span'),
                cursor: document.createElement('span'),
              },
            }),
            f(this, 'options', {
              strings: null,
              cursor: '|',
              delay: 'natural',
              loop: !1,
              autoStart: !1,
              devMode: !1,
              wrapperClassName: 'Typewriter__wrapper',
              cursorClassName: 'Typewriter__cursor',
            }),
            f(this, 'setupWrapperElement', function() {
              (r.state.elements.wrapper.className = r.options.wrapperClassName),
                (r.state.elements.cursor.className = r.options.cursorClassName),
                (r.state.elements.cursor.innerHTML = r.options.cursor),
                (r.state.elements.container.innerHTML = ''),
                r.state.elements.container.appendChild(
                  r.state.elements.wrapper
                ),
                r.state.elements.container.appendChild(r.state.elements.cursor);
            }),
            f(this, 'start', function() {
              return (r.state.eventLoopPaused = !1), r.runEventLoop(), r;
            }),
            f(this, 'pause', function() {
              return (r.state.eventLoopPaused = !0), r;
            }),
            f(this, 'stop', function() {
              return r.state.eventLoop && o.a.cancel(r.state.eventLoop), r;
            }),
            f(this, 'pauseFor', function(t) {
              return r.addEventToQueue(r.eventNames.PAUSE_FOR, { ms: t }), r;
            }),
            f(this, 'typeOutAllStrings', function() {
              return 'string' == typeof r.options.strings
                ? (r.typeString(r.options.strings).pauseFor(1500), r)
                : (r.options.strings.forEach(function(t, e) {
                    r.typeString(t),
                      e !== r.options.strings.length - 1 && r.typeString(' '),
                      r.pauseFor(1500);
                  }),
                  r);
            }),
            f(this, 'typeString', function(t) {
              return i(t)
                ? r.typeOutHTMLString(t)
                : (t.split('').forEach(function(t) {
                    r.addEventToQueue(r.eventNames.TYPE_CHARACTER, {
                      character: t,
                    });
                  }),
                  r);
            }),
            f(this, 'typeOutHTMLString', function(t) {
              var e = u(t),
                n = e.innerText.split('');
              return n.length
                ? ((e.innerText = ''),
                  r.addEventToQueue(r.eventNames.ADD_HTML_TAG_ELEMENT, {
                    htmlTagElement: e,
                  }),
                  n.forEach(function(t) {
                    r.addEventToQueue(r.eventNames.TYPE_CHARACTER, {
                      character: t,
                      htmlTagElement: e,
                    });
                  }),
                  r)
                : r;
            }),
            f(this, 'deleteAll', function() {
              return (
                r.addEventToQueue(r.eventNames.REMOVE_ALL, {
                  removingCharacterNode: !1,
                }),
                r
              );
            }),
            f(this, 'deleteChars', function(t) {
              for (var e = 0; e < t; e++)
                r.addEventToQueue(r.eventNames.REMOVE_CHARACTER);
              return r;
            }),
            f(this, 'callFunction', function(t, e) {
              return (
                'function' == typeof t &&
                  r.addEventToQueue(r.eventNames.CALL_FUNCTION, {
                    cb: t,
                    thisArg: e,
                  }),
                r
              );
            }),
            f(this, 'typeCharacters', function(t) {
              return (
                t.forEach(function(t) {
                  r.addEventToQueue(r.eventNames.TYPE_CHARACTER, {
                    character: t,
                  });
                }),
                r
              );
            }),
            f(this, 'removeCharacters', function(t) {
              return (
                t.forEach(function() {
                  r.addEventToQueue(r.eventNames.REMOVE_CHARACTER);
                }),
                r
              );
            }),
            f(this, 'addEventToQueue', function(t, e) {
              var n =
                arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
              return r.addEventToStateProperty(t, e, n, 'eventQueue');
            }),
            f(this, 'addReverseCalledEvent', function(t, e) {
              var n =
                arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
              return r.options.loop
                ? r.addEventToStateProperty(t, e, n, 'reverseCalledEvents')
                : r;
            }),
            f(this, 'addEventToStateProperty', function(t, e) {
              var n =
                  arguments.length > 2 &&
                  void 0 !== arguments[2] &&
                  arguments[2],
                o = arguments.length > 3 ? arguments[3] : void 0,
                i = { eventName: t, eventArgs: e };
              return (
                (r.state[o] = n
                  ? [i].concat(c(r.state[o]))
                  : c(r.state[o]).concat([i])),
                r
              );
            }),
            f(this, 'runEventLoop', function() {
              r.state.lastFrameTime || (r.state.lastFrameTime = Date.now());
              var t = Date.now(),
                e = t - r.state.lastFrameTime;
              if (!r.state.eventQueue.length) {
                if (!r.options.loop) return;
                (r.state.eventQueue = r.state.calledEvents),
                  (r.state.calledEvents = []),
                  r.addEventToQueue(r.eventNames.REMOVE_ALL, null, !0);
              }
              if (
                ((r.state.eventLoop = o()(r.runEventLoop)),
                !r.state.eventLoopPaused)
              ) {
                if (r.state.pauseUntil) {
                  if (t < r.state.pauseUntil) return;
                  r.state.pauseUntil = null;
                }
                if (
                  !(
                    e <=
                    ('natural' === r.options.delay
                      ? a(100, 200)
                      : r.options.delay)
                  )
                ) {
                  var n = r.state.eventQueue.shift(),
                    i = n.eventName,
                    u = n.eventArgs;
                  switch (
                    (r.logInDevMode({ currentEvent: n, state: r.state }), i)
                  ) {
                    case r.eventNames.TYPE_CHARACTER:
                      var s = u.character,
                        f = u.htmlTagElement,
                        l = document.createTextNode(s);
                      f
                        ? f.appendChild(l)
                        : r.state.elements.wrapper.appendChild(l),
                        (r.state.visibleNodes = c(r.state.visibleNodes).concat([
                          { type: r.visibleNodeTypes.TEXT_NODE, node: l },
                        ]));
                      break;
                    case r.eventNames.REMOVE_CHARACTER:
                      r.addEventToQueue(
                        r.eventNames.REMOVE_LAST_VISIBLE_NODE,
                        { removingCharacterNode: !0 },
                        !0
                      );
                      break;
                    case r.eventNames.PAUSE_FOR:
                      var p = n.eventArgs.ms;
                      r.state.pauseUntil = Date.now() + parseInt(p);
                      break;
                    case r.eventNames.CALL_FUNCTION:
                      var v = n.eventArgs,
                        h = v.cb,
                        d = v.thisArg;
                      h.call(d, { elements: r.state.elements });
                      break;
                    case r.eventNames.ADD_HTML_TAG_ELEMENT:
                      var y = n.eventArgs.htmlTagElement;
                      r.state.elements.wrapper.appendChild(y),
                        (r.state.visibleNodes = c(r.state.visibleNodes).concat([
                          { type: r.visibleNodeTypes.HTML_TAG, node: y },
                        ]));
                      break;
                    case r.eventNames.REMOVE_ALL:
                      for (
                        var m = 0, g = r.state.visibleNodes.length;
                        m < g;
                        m++
                      )
                        r.addEventToQueue(
                          r.eventNames.REMOVE_LAST_VISIBLE_NODE,
                          { removingCharacterNode: !1 },
                          !0
                        );
                      break;
                    case r.eventNames.REMOVE_LAST_VISIBLE_NODE:
                      var b = n.eventArgs.removingCharacterNode;
                      if (r.state.visibleNodes.length) {
                        var E = r.state.visibleNodes.pop(),
                          T = E.type;
                        E.node.remove(),
                          T === r.visibleNodeTypes.HTML_TAG &&
                            b &&
                            r.addEventToQueue(
                              r.eventNames.REMOVE_LAST_VISIBLE_NODE,
                              null,
                              !0
                            );
                      }
                  }
                  r.options.loop &&
                    ((n.eventName === r.eventNames.REMOVE_ALL &&
                      n.eventName === r.eventNames.REMOVE_LAST_VISIBLE_NODE) ||
                      r.state.calledEvents.push(n)),
                    (r.state.lastFrameTime = t);
                }
              }
            }),
            !e)
          )
            throw new Error('No container element was provided');
          if ('string' == typeof e) {
            var s = document.querySelector(e);
            if (!s) throw new Error('Could not find container element');
            this.state.elements.container = s;
          } else this.state.elements.container = e;
          n &&
            (this.options = (function(t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {},
                  r = Object.keys(n);
                'function' == typeof Object.getOwnPropertySymbols &&
                  (r = r.concat(
                    Object.getOwnPropertySymbols(n).filter(function(t) {
                      return Object.getOwnPropertyDescriptor(n, t).enumerable;
                    })
                  )),
                  r.forEach(function(e) {
                    f(t, e, n[e]);
                  });
              }
              return t;
            })({}, this.options, n)),
            this.init();
        }
        return (
          (function(t, e, n) {
            e && s(t.prototype, e), n && s(t, n);
          })(t, [
            {
              key: 'init',
              value: function() {
                this.setupWrapperElement(),
                  !0 === this.options.autoStart &&
                    this.options.strings &&
                    this.typeOutAllStrings().start();
              },
            },
            {
              key: 'logInDevMode',
              value: function(t) {
                this.options.devMode && console.log(t);
              },
            },
          ]),
          t
        );
      })();
      n.d(e, 'default', function() {
        return l;
      });
    },
    function(t, e, n) {
      'use strict';
      var r = n(4),
        o = n(38)(2);
      r(r.P + r.F * !n(40)([].filter, !0), 'Array', {
        filter: function(t) {
          return o(this, t, arguments[1]);
        },
      });
    },
    function(t, e) {
      t.exports = function(t) {
        if ('function' != typeof t) throw TypeError(t + ' is not a function!');
        return t;
      };
    },
    function(t, e, n) {
      var r = n(57);
      t.exports = function(t, e) {
        return new (r(t))(e);
      };
    },
    function(t, e, n) {
      var r = n(5),
        o = n(26),
        i = n(0)('species');
      t.exports = function(t) {
        var e;
        return (
          o(t) &&
            ('function' != typeof (e = t.constructor) ||
              (e !== Array && !o(e.prototype)) ||
              (e = void 0),
            r(e) && null === (e = e[i]) && (e = void 0)),
          void 0 === e ? Array : e
        );
      };
    },
    function(t, e, n) {
      var r = n(0)('unscopables'),
        o = Array.prototype;
      void 0 == o[r] && n(7)(o, r, {}),
        (t.exports = function(t) {
          o[r][t] = !0;
        });
    },
    function(t, e) {
      t.exports = function(t, e) {
        return { value: e, done: !!t };
      };
    },
    function(t, e, n) {
      'use strict';
      var r = n(35),
        o = n(14),
        i = n(30),
        u = {};
      n(7)(u, n(0)('iterator'), function() {
        return this;
      }),
        (t.exports = function(t, e, n) {
          (t.prototype = r(u, { next: o(1, n) })), i(t, e + ' Iterator');
        });
    },
    function(t, e, n) {
      var r = n(2),
        o = n(8),
        i = n(17);
      t.exports = n(3)
        ? Object.defineProperties
        : function(t, e) {
            o(t);
            for (var n, u = i(e), a = u.length, c = 0; a > c; )
              r.f(t, (n = u[c++]), e[n]);
            return t;
          };
    },
    function(t, e, n) {
      var r = n(12),
        o = n(24),
        i = n(63);
      t.exports = function(t) {
        return function(e, n, u) {
          var a,
            c = r(e),
            s = o(c.length),
            f = i(u, s);
          if (t && n != n) {
            for (; s > f; ) if ((a = c[f++]) != a) return !0;
          } else
            for (; s > f; f++)
              if ((t || f in c) && c[f] === n) return t || f || 0;
          return !t && -1;
        };
      };
    },
    function(t, e, n) {
      var r = n(25),
        o = Math.max,
        i = Math.min;
      t.exports = function(t, e) {
        return (t = r(t)) < 0 ? o(t + e, 0) : i(t, e);
      };
    },
    function(t, e, n) {
      var r = n(1).document;
      t.exports = r && r.documentElement;
    },
    function(t, e, n) {
      var r = n(10),
        o = n(20),
        i = n(28)('IE_PROTO'),
        u = Object.prototype;
      t.exports =
        Object.getPrototypeOf ||
        function(t) {
          return (
            (t = o(t)),
            r(t, i)
              ? t[i]
              : 'function' == typeof t.constructor && t instanceof t.constructor
              ? t.constructor.prototype
              : t instanceof Object
              ? u
              : null
          );
        };
    },
    function(t, e, n) {
      var r = n(20),
        o = n(17);
      n(67)('keys', function() {
        return function(t) {
          return o(r(t));
        };
      });
    },
    function(t, e, n) {
      var r = n(4),
        o = n(11),
        i = n(6);
      t.exports = function(t, e) {
        var n = (o.Object || {})[t] || Object[t],
          u = {};
        (u[t] = e(n)),
          r(
            r.S +
              r.F *
                i(function() {
                  n(1);
                }),
            'Object',
            u
          );
      };
    },
    function(t, e, n) {
      'use strict';
      var r = n(69)(!0);
      n(42)(
        String,
        'String',
        function(t) {
          (this._t = String(t)), (this._i = 0);
        },
        function() {
          var t,
            e = this._t,
            n = this._i;
          return n >= e.length
            ? { value: void 0, done: !0 }
            : ((t = r(e, n)), (this._i += t.length), { value: t, done: !1 });
        }
      );
    },
    function(t, e, n) {
      var r = n(25),
        o = n(21);
      t.exports = function(t) {
        return function(e, n) {
          var i,
            u,
            a = String(o(e)),
            c = r(n),
            s = a.length;
          return c < 0 || c >= s
            ? t
              ? ''
              : void 0
            : (i = a.charCodeAt(c)) < 55296 ||
              i > 56319 ||
              c + 1 === s ||
              (u = a.charCodeAt(c + 1)) < 56320 ||
              u > 57343
            ? t
              ? a.charAt(c)
              : i
            : t
            ? a.slice(c, c + 2)
            : u - 56320 + ((i - 55296) << 10) + 65536;
        };
      };
    },
    function(t, e, n) {
      'use strict';
      var r = n(18),
        o = n(4),
        i = n(20),
        u = n(71),
        a = n(72),
        c = n(24),
        s = n(73),
        f = n(74);
      o(
        o.S +
          o.F *
            !n(76)(function(t) {
              Array.from(t);
            }),
        'Array',
        {
          from: function(t) {
            var e,
              n,
              o,
              l,
              p = i(t),
              v = 'function' == typeof this ? this : Array,
              h = arguments.length,
              d = h > 1 ? arguments[1] : void 0,
              y = void 0 !== d,
              m = 0,
              g = f(p);
            if (
              (y && (d = r(d, h > 2 ? arguments[2] : void 0, 2)),
              void 0 == g || (v == Array && a(g)))
            )
              for (n = new v((e = c(p.length))); e > m; m++)
                s(n, m, y ? d(p[m], m) : p[m]);
            else
              for (l = g.call(p), n = new v(); !(o = l.next()).done; m++)
                s(n, m, y ? u(l, d, [o.value, m], !0) : o.value);
            return (n.length = m), n;
          },
        }
      );
    },
    function(t, e, n) {
      var r = n(8);
      t.exports = function(t, e, n, o) {
        try {
          return o ? e(r(n)[0], n[1]) : e(n);
        } catch (e) {
          var i = t.return;
          throw (void 0 !== i && r(i.call(t)), e);
        }
      };
    },
    function(t, e, n) {
      var r = n(16),
        o = n(0)('iterator'),
        i = Array.prototype;
      t.exports = function(t) {
        return void 0 !== t && (r.Array === t || i[o] === t);
      };
    },
    function(t, e, n) {
      'use strict';
      var r = n(2),
        o = n(14);
      t.exports = function(t, e, n) {
        e in t ? r.f(t, e, o(0, n)) : (t[e] = n);
      };
    },
    function(t, e, n) {
      var r = n(75),
        o = n(0)('iterator'),
        i = n(16);
      t.exports = n(11).getIteratorMethod = function(t) {
        if (void 0 != t) return t[o] || t['@@iterator'] || i[r(t)];
      };
    },
    function(t, e, n) {
      var r = n(19),
        o = n(0)('toStringTag'),
        i =
          'Arguments' ==
          r(
            (function() {
              return arguments;
            })()
          );
      t.exports = function(t) {
        var e, n, u;
        return void 0 === t
          ? 'Undefined'
          : null === t
          ? 'Null'
          : 'string' ==
            typeof (n = (function(t, e) {
              try {
                return t[e];
              } catch (t) {}
            })((e = Object(t)), o))
          ? n
          : i
          ? r(e)
          : 'Object' == (u = r(e)) && 'function' == typeof e.callee
          ? 'Arguments'
          : u;
      };
    },
    function(t, e, n) {
      var r = n(0)('iterator'),
        o = !1;
      try {
        var i = [7][r]();
        (i.return = function() {
          o = !0;
        }),
          Array.from(i, function() {
            throw 2;
          });
      } catch (t) {}
      t.exports = function(t, e) {
        if (!e && !o) return !1;
        var n = !1;
        try {
          var i = [7],
            u = i[r]();
          (u.next = function() {
            return { done: (n = !0) };
          }),
            (i[r] = function() {
              return u;
            }),
            t(i);
        } catch (t) {}
        return n;
      };
    },
    function(t, e, n) {
      'use strict';
      n(78);
      var r = n(8),
        o = n(31),
        i = n(3),
        u = /./.toString,
        a = function(t) {
          n(9)(RegExp.prototype, 'toString', t, !0);
        };
      n(6)(function() {
        return '/a/b' != u.call({ source: 'a', flags: 'b' });
      })
        ? a(function() {
            var t = r(this);
            return '/'.concat(
              t.source,
              '/',
              'flags' in t
                ? t.flags
                : !i && t instanceof RegExp
                ? o.call(t)
                : void 0
            );
          })
        : 'toString' != u.name &&
          a(function() {
            return u.call(this);
          });
    },
    function(t, e, n) {
      n(3) &&
        'g' != /./g.flags &&
        n(2).f(RegExp.prototype, 'flags', { configurable: !0, get: n(31) });
    },
    function(t, e, n) {
      var r = Date.prototype,
        o = r.toString,
        i = r.getTime;
      new Date(NaN) + '' != 'Invalid Date' &&
        n(9)(r, 'toString', function() {
          var t = i.call(this);
          return t == t ? o.call(this) : 'Invalid Date';
        });
    },
    function(t, e, n) {
      var r = n(15)('meta'),
        o = n(5),
        i = n(10),
        u = n(2).f,
        a = 0,
        c =
          Object.isExtensible ||
          function() {
            return !0;
          },
        s = !n(6)(function() {
          return c(Object.preventExtensions({}));
        }),
        f = function(t) {
          u(t, r, { value: { i: 'O' + ++a, w: {} } });
        },
        l = (t.exports = {
          KEY: r,
          NEED: !1,
          fastKey: function(t, e) {
            if (!o(t))
              return 'symbol' == typeof t
                ? t
                : ('string' == typeof t ? 'S' : 'P') + t;
            if (!i(t, r)) {
              if (!c(t)) return 'F';
              if (!e) return 'E';
              f(t);
            }
            return t[r].i;
          },
          getWeak: function(t, e) {
            if (!i(t, r)) {
              if (!c(t)) return !0;
              if (!e) return !1;
              f(t);
            }
            return t[r].w;
          },
          onFreeze: function(t) {
            return s && l.NEED && c(t) && !i(t, r) && f(t), t;
          },
        });
    },
    function(t, e, n) {
      var r = n(17),
        o = n(46),
        i = n(32);
      t.exports = function(t) {
        var e = r(t),
          n = o.f;
        if (n)
          for (var u, a = n(t), c = i.f, s = 0; a.length > s; )
            c.call(t, (u = a[s++])) && e.push(u);
        return e;
      };
    },
    function(t, e, n) {
      var r = n(12),
        o = n(33).f,
        i = {}.toString,
        u =
          'object' == typeof window && window && Object.getOwnPropertyNames
            ? Object.getOwnPropertyNames(window)
            : [];
      t.exports.f = function(t) {
        return u && '[object Window]' == i.call(t)
          ? (function(t) {
              try {
                return o(t);
              } catch (t) {
                return u.slice();
              }
            })(t)
          : o(r(t));
      };
    },
    function(t, e, n) {
      var r = n(4);
      r(r.S, 'Array', { isArray: n(26) });
    },
    function(t, e, n) {
      var r = n(4);
      r(r.S, 'Date', {
        now: function() {
          return new Date().getTime();
        },
      });
    },
    function(t, e, n) {
      n(86)('split', 2, function(t, e, r) {
        'use strict';
        var o = n(48),
          i = r,
          u = [].push;
        if (
          'c' == 'abbc'.split(/(b)*/)[1] ||
          4 != 'test'.split(/(?:)/, -1).length ||
          2 != 'ab'.split(/(?:ab)*/).length ||
          4 != '.'.split(/(.?)(.?)/).length ||
          '.'.split(/()()/).length > 1 ||
          ''.split(/.?/).length
        ) {
          var a = void 0 === /()??/.exec('')[1];
          r = function(t, e) {
            var n = String(this);
            if (void 0 === t && 0 === e) return [];
            if (!o(t)) return i.call(n, t, e);
            var r,
              c,
              s,
              f,
              l,
              p = [],
              v =
                (t.ignoreCase ? 'i' : '') +
                (t.multiline ? 'm' : '') +
                (t.unicode ? 'u' : '') +
                (t.sticky ? 'y' : ''),
              h = 0,
              d = void 0 === e ? 4294967295 : e >>> 0,
              y = new RegExp(t.source, v + 'g');
            for (
              a || (r = new RegExp('^' + y.source + '$(?!\\s)', v));
              (c = y.exec(n)) &&
              !(
                (s = c.index + c[0].length) > h &&
                (p.push(n.slice(h, c.index)),
                !a &&
                  c.length > 1 &&
                  c[0].replace(r, function() {
                    for (l = 1; l < arguments.length - 2; l++)
                      void 0 === arguments[l] && (c[l] = void 0);
                  }),
                c.length > 1 && c.index < n.length && u.apply(p, c.slice(1)),
                (f = c[0].length),
                (h = s),
                p.length >= d)
              );

            )
              y.lastIndex === c.index && y.lastIndex++;
            return (
              h === n.length
                ? (!f && y.test('')) || p.push('')
                : p.push(n.slice(h)),
              p.length > d ? p.slice(0, d) : p
            );
          };
        } else
          '0'.split(void 0, 0).length &&
            (r = function(t, e) {
              return void 0 === t && 0 === e ? [] : i.call(this, t, e);
            });
        return [
          function(n, o) {
            var i = t(this),
              u = void 0 == n ? void 0 : n[e];
            return void 0 !== u ? u.call(n, i, o) : r.call(String(i), n, o);
          },
          r,
        ];
      });
    },
    function(t, e, n) {
      'use strict';
      var r = n(7),
        o = n(9),
        i = n(6),
        u = n(21),
        a = n(0);
      t.exports = function(t, e, n) {
        var c = a(t),
          s = n(u, c, ''[t]),
          f = s[0],
          l = s[1];
        i(function() {
          var e = {};
          return (
            (e[c] = function() {
              return 7;
            }),
            7 != ''[t](e)
          );
        }) &&
          (o(String.prototype, t, f),
          r(
            RegExp.prototype,
            c,
            2 == e
              ? function(t, e) {
                  return l.call(t, this, e);
                }
              : function(t) {
                  return l.call(t, this);
                }
          ));
      };
    },
    function(t, e, n) {
      for (
        var r = n(41),
          o = n(17),
          i = n(9),
          u = n(1),
          a = n(7),
          c = n(16),
          s = n(0),
          f = s('iterator'),
          l = s('toStringTag'),
          p = c.Array,
          v = {
            CSSRuleList: !0,
            CSSStyleDeclaration: !1,
            CSSValueList: !1,
            ClientRectList: !1,
            DOMRectList: !1,
            DOMStringList: !1,
            DOMTokenList: !0,
            DataTransferItemList: !1,
            FileList: !1,
            HTMLAllCollection: !1,
            HTMLCollection: !1,
            HTMLFormElement: !1,
            HTMLSelectElement: !1,
            MediaList: !0,
            MimeTypeArray: !1,
            NamedNodeMap: !1,
            NodeList: !0,
            PaintRequestList: !1,
            Plugin: !1,
            PluginArray: !1,
            SVGLengthList: !1,
            SVGNumberList: !1,
            SVGPathSegList: !1,
            SVGPointList: !1,
            SVGStringList: !1,
            SVGTransformList: !1,
            SourceBufferList: !1,
            StyleSheetList: !0,
            TextTrackCueList: !1,
            TextTrackList: !1,
            TouchList: !1,
          },
          h = o(v),
          d = 0;
        d < h.length;
        d++
      ) {
        var y,
          m = h[d],
          g = v[m],
          b = u[m],
          E = b && b.prototype;
        if (E && (E[f] || a(E, f, p), E[l] || a(E, l, m), (c[m] = p), g))
          for (y in r) E[y] || i(E, y, r[y], !0);
      }
    },
    function(t, e, n) {
      'use strict';
      var r = n(4),
        o = n(38)(0),
        i = n(40)([].forEach, !0);
      r(r.P + r.F * !i, 'Array', {
        forEach: function(t) {
          return o(this, t, arguments[1]);
        },
      });
    },
    function(t, e) {
      var n;
      n = (function() {
        return this;
      })();
      try {
        n = n || Function('return this')() || (0, eval)('this');
      } catch (t) {
        'object' == typeof window && (n = window);
      }
      t.exports = n;
    },
    function(t, e, n) {
      (function(e) {
        (function() {
          var n, r, o, i, u, a;
          'undefined' != typeof performance &&
          null !== performance &&
          performance.now
            ? (t.exports = function() {
                return performance.now();
              })
            : void 0 !== e && null !== e && e.hrtime
            ? ((t.exports = function() {
                return (n() - u) / 1e6;
              }),
              (r = e.hrtime),
              (i = (n = function() {
                var t;
                return 1e9 * (t = r())[0] + t[1];
              })()),
              (a = 1e9 * e.uptime()),
              (u = i - a))
            : Date.now
            ? ((t.exports = function() {
                return Date.now() - o;
              }),
              (o = Date.now()))
            : ((t.exports = function() {
                return new Date().getTime() - o;
              }),
              (o = new Date().getTime()));
        }.call(this));
      }.call(this, n(91)));
    },
    function(t, e) {
      var n,
        r,
        o = (t.exports = {});
      function i() {
        throw new Error('setTimeout has not been defined');
      }
      function u() {
        throw new Error('clearTimeout has not been defined');
      }
      function a(t) {
        if (n === setTimeout) return setTimeout(t, 0);
        if ((n === i || !n) && setTimeout)
          return (n = setTimeout), setTimeout(t, 0);
        try {
          return n(t, 0);
        } catch (e) {
          try {
            return n.call(null, t, 0);
          } catch (e) {
            return n.call(this, t, 0);
          }
        }
      }
      !(function() {
        try {
          n = 'function' == typeof setTimeout ? setTimeout : i;
        } catch (t) {
          n = i;
        }
        try {
          r = 'function' == typeof clearTimeout ? clearTimeout : u;
        } catch (t) {
          r = u;
        }
      })();
      var c,
        s = [],
        f = !1,
        l = -1;
      function p() {
        f &&
          c &&
          ((f = !1), c.length ? (s = c.concat(s)) : (l = -1), s.length && v());
      }
      function v() {
        if (!f) {
          var t = a(p);
          f = !0;
          for (var e = s.length; e; ) {
            for (c = s, s = []; ++l < e; ) c && c[l].run();
            (l = -1), (e = s.length);
          }
          (c = null),
            (f = !1),
            (function(t) {
              if (r === clearTimeout) return clearTimeout(t);
              if ((r === u || !r) && clearTimeout)
                return (r = clearTimeout), clearTimeout(t);
              try {
                r(t);
              } catch (e) {
                try {
                  return r.call(null, t);
                } catch (e) {
                  return r.call(this, t);
                }
              }
            })(t);
        }
      }
      function h(t, e) {
        (this.fun = t), (this.array = e);
      }
      function d() {}
      (o.nextTick = function(t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
        s.push(new h(t, e)), 1 !== s.length || f || a(v);
      }),
        (h.prototype.run = function() {
          this.fun.apply(null, this.array);
        }),
        (o.title = 'browser'),
        (o.browser = !0),
        (o.env = {}),
        (o.argv = []),
        (o.version = ''),
        (o.versions = {}),
        (o.on = d),
        (o.addListener = d),
        (o.once = d),
        (o.off = d),
        (o.removeListener = d),
        (o.removeAllListeners = d),
        (o.emit = d),
        (o.prependListener = d),
        (o.prependOnceListener = d),
        (o.listeners = function(t) {
          return [];
        }),
        (o.binding = function(t) {
          throw new Error('process.binding is not supported');
        }),
        (o.cwd = function() {
          return '/';
        }),
        (o.chdir = function(t) {
          throw new Error('process.chdir is not supported');
        }),
        (o.umask = function() {
          return 0;
        });
    },
    function(t, e, n) {
      var r = n(1),
        o = n(93),
        i = n(2).f,
        u = n(33).f,
        a = n(48),
        c = n(31),
        s = r.RegExp,
        f = s,
        l = s.prototype,
        p = /a/g,
        v = /a/g,
        h = new s(p) !== p;
      if (
        n(3) &&
        (!h ||
          n(6)(function() {
            return (
              (v[n(0)('match')] = !1),
              s(p) != p || s(v) == v || '/a/i' != s(p, 'i')
            );
          }))
      ) {
        s = function(t, e) {
          var n = this instanceof s,
            r = a(t),
            i = void 0 === e;
          return !n && r && t.constructor === s && i
            ? t
            : o(
                h
                  ? new f(r && !i ? t.source : t, e)
                  : f(
                      (r = t instanceof s) ? t.source : t,
                      r && i ? c.call(t) : e
                    ),
                n ? this : l,
                s
              );
        };
        for (
          var d = function(t) {
              (t in s) ||
                i(s, t, {
                  configurable: !0,
                  get: function() {
                    return f[t];
                  },
                  set: function(e) {
                    f[t] = e;
                  },
                });
            },
            y = u(f),
            m = 0;
          y.length > m;

        )
          d(y[m++]);
        (l.constructor = s), (s.prototype = l), n(9)(r, 'RegExp', s);
      }
      n(94)('RegExp');
    },
    function(t, e, n) {
      var r = n(5),
        o = n(52).set;
      t.exports = function(t, e, n) {
        var i,
          u = e.constructor;
        return (
          u !== n &&
            'function' == typeof u &&
            (i = u.prototype) !== n.prototype &&
            r(i) &&
            o &&
            o(t, i),
          t
        );
      };
    },
    function(t, e, n) {
      'use strict';
      var r = n(1),
        o = n(2),
        i = n(3),
        u = n(0)('species');
      t.exports = function(t) {
        var e = r[t];
        i &&
          e &&
          !e[u] &&
          o.f(e, u, {
            configurable: !0,
            get: function() {
              return this;
            },
          });
      };
    },
    function(t, e, n) {
      var r = n(96);
      'string' == typeof r && (r = [[t.i, r, '']]);
      var o = { hmr: !0, transform: void 0, insertInto: void 0 };
      n(98)(r, o);
      r.locals && (t.exports = r.locals);
    },
    function(t, e, n) {
      (t.exports = n(97)(!1)).push([
        t.i,
        '.Typewriter__cursor{-webkit-animation:Typewriter-cursor 1s infinite;animation:Typewriter-cursor 1s infinite;margin-left:1px}@-webkit-keyframes Typewriter-cursor{0%{opacity:0}50%{opacity:1}to{opacity:0}}@keyframes Typewriter-cursor{0%{opacity:0}50%{opacity:1}to{opacity:0}}',
        '',
      ]);
    },
    function(t, e) {
      t.exports = function(t) {
        var e = [];
        return (
          (e.toString = function() {
            return this.map(function(e) {
              var n = (function(t, e) {
                var n = t[1] || '',
                  r = t[3];
                if (!r) return n;
                if (e && 'function' == typeof btoa) {
                  var o = (function(t) {
                      return (
                        '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,' +
                        btoa(unescape(encodeURIComponent(JSON.stringify(t)))) +
                        ' */'
                      );
                    })(r),
                    i = r.sources.map(function(t) {
                      return '/*# sourceURL=' + r.sourceRoot + t + ' */';
                    });
                  return [n]
                    .concat(i)
                    .concat([o])
                    .join('\n');
                }
                return [n].join('\n');
              })(e, t);
              return e[2] ? '@media ' + e[2] + '{' + n + '}' : n;
            }).join('');
          }),
          (e.i = function(t, n) {
            'string' == typeof t && (t = [[null, t, '']]);
            for (var r = {}, o = 0; o < this.length; o++) {
              var i = this[o][0];
              'number' == typeof i && (r[i] = !0);
            }
            for (o = 0; o < t.length; o++) {
              var u = t[o];
              ('number' == typeof u[0] && r[u[0]]) ||
                (n && !u[2]
                  ? (u[2] = n)
                  : n && (u[2] = '(' + u[2] + ') and (' + n + ')'),
                e.push(u));
            }
          }),
          e
        );
      };
    },
    function(t, e, n) {
      var r = {},
        o = (function(t) {
          var e;
          return function() {
            return void 0 === e && (e = t.apply(this, arguments)), e;
          };
        })(function() {
          return window && document && document.all && !window.atob;
        }),
        i = (function(t) {
          var e = {};
          return function(t, n) {
            if ('function' == typeof t) return t();
            if (void 0 === e[t]) {
              var r = function(t, e) {
                return e ? e.querySelector(t) : document.querySelector(t);
              }.call(this, t, n);
              if (
                window.HTMLIFrameElement &&
                r instanceof window.HTMLIFrameElement
              )
                try {
                  r = r.contentDocument.head;
                } catch (t) {
                  r = null;
                }
              e[t] = r;
            }
            return e[t];
          };
        })(),
        u = null,
        a = 0,
        c = [],
        s = n(99);
      function f(t, e) {
        for (var n = 0; n < t.length; n++) {
          var o = t[n],
            i = r[o.id];
          if (i) {
            i.refs++;
            for (var u = 0; u < i.parts.length; u++) i.parts[u](o.parts[u]);
            for (; u < o.parts.length; u++) i.parts.push(y(o.parts[u], e));
          } else {
            var a = [];
            for (u = 0; u < o.parts.length; u++) a.push(y(o.parts[u], e));
            r[o.id] = { id: o.id, refs: 1, parts: a };
          }
        }
      }
      function l(t, e) {
        for (var n = [], r = {}, o = 0; o < t.length; o++) {
          var i = t[o],
            u = e.base ? i[0] + e.base : i[0],
            a = { css: i[1], media: i[2], sourceMap: i[3] };
          r[u] ? r[u].parts.push(a) : n.push((r[u] = { id: u, parts: [a] }));
        }
        return n;
      }
      function p(t, e) {
        var n = i(t.insertInto);
        if (!n)
          throw new Error(
            "Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid."
          );
        var r = c[c.length - 1];
        if ('top' === t.insertAt)
          r
            ? r.nextSibling
              ? n.insertBefore(e, r.nextSibling)
              : n.appendChild(e)
            : n.insertBefore(e, n.firstChild),
            c.push(e);
        else if ('bottom' === t.insertAt) n.appendChild(e);
        else {
          if ('object' != typeof t.insertAt || !t.insertAt.before)
            throw new Error(
              "[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n"
            );
          var o = i(t.insertAt.before, n);
          n.insertBefore(e, o);
        }
      }
      function v(t) {
        if (null === t.parentNode) return !1;
        t.parentNode.removeChild(t);
        var e = c.indexOf(t);
        e >= 0 && c.splice(e, 1);
      }
      function h(t) {
        var e = document.createElement('style');
        if (
          (void 0 === t.attrs.type && (t.attrs.type = 'text/css'),
          void 0 === t.attrs.nonce)
        ) {
          var r = (function() {
            0;
            return n.nc;
          })();
          r && (t.attrs.nonce = r);
        }
        return d(e, t.attrs), p(t, e), e;
      }
      function d(t, e) {
        Object.keys(e).forEach(function(n) {
          t.setAttribute(n, e[n]);
        });
      }
      function y(t, e) {
        var n, r, o, i;
        if (e.transform && t.css) {
          if (!(i = e.transform(t.css))) return function() {};
          t.css = i;
        }
        if (e.singleton) {
          var c = a++;
          (n = u || (u = h(e))),
            (r = g.bind(null, n, c, !1)),
            (o = g.bind(null, n, c, !0));
        } else
          t.sourceMap &&
          'function' == typeof URL &&
          'function' == typeof URL.createObjectURL &&
          'function' == typeof URL.revokeObjectURL &&
          'function' == typeof Blob &&
          'function' == typeof btoa
            ? ((n = (function(t) {
                var e = document.createElement('link');
                return (
                  void 0 === t.attrs.type && (t.attrs.type = 'text/css'),
                  (t.attrs.rel = 'stylesheet'),
                  d(e, t.attrs),
                  p(t, e),
                  e
                );
              })(e)),
              (r = function(t, e, n) {
                var r = n.css,
                  o = n.sourceMap,
                  i = void 0 === e.convertToAbsoluteUrls && o;
                (e.convertToAbsoluteUrls || i) && (r = s(r));
                o &&
                  (r +=
                    '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(o)))) +
                    ' */');
                var u = new Blob([r], { type: 'text/css' }),
                  a = t.href;
                (t.href = URL.createObjectURL(u)), a && URL.revokeObjectURL(a);
              }.bind(null, n, e)),
              (o = function() {
                v(n), n.href && URL.revokeObjectURL(n.href);
              }))
            : ((n = h(e)),
              (r = function(t, e) {
                var n = e.css,
                  r = e.media;
                r && t.setAttribute('media', r);
                if (t.styleSheet) t.styleSheet.cssText = n;
                else {
                  for (; t.firstChild; ) t.removeChild(t.firstChild);
                  t.appendChild(document.createTextNode(n));
                }
              }.bind(null, n)),
              (o = function() {
                v(n);
              }));
        return (
          r(t),
          function(e) {
            if (e) {
              if (
                e.css === t.css &&
                e.media === t.media &&
                e.sourceMap === t.sourceMap
              )
                return;
              r((t = e));
            } else o();
          }
        );
      }
      t.exports = function(t, e) {
        if ('undefined' != typeof DEBUG && DEBUG && 'object' != typeof document)
          throw new Error(
            'The style-loader cannot be used in a non-browser environment'
          );
        ((e = e || {}).attrs = 'object' == typeof e.attrs ? e.attrs : {}),
          e.singleton || 'boolean' == typeof e.singleton || (e.singleton = o()),
          e.insertInto || (e.insertInto = 'head'),
          e.insertAt || (e.insertAt = 'bottom');
        var n = l(t, e);
        return (
          f(n, e),
          function(t) {
            for (var o = [], i = 0; i < n.length; i++) {
              var u = n[i];
              (a = r[u.id]).refs--, o.push(a);
            }
            t && f(l(t, e), e);
            for (i = 0; i < o.length; i++) {
              var a;
              if (0 === (a = o[i]).refs) {
                for (var c = 0; c < a.parts.length; c++) a.parts[c]();
                delete r[a.id];
              }
            }
          }
        );
      };
      var m = (function() {
        var t = [];
        return function(e, n) {
          return (t[e] = n), t.filter(Boolean).join('\n');
        };
      })();
      function g(t, e, n, r) {
        var o = n ? '' : r.css;
        if (t.styleSheet) t.styleSheet.cssText = m(e, o);
        else {
          var i = document.createTextNode(o),
            u = t.childNodes;
          u[e] && t.removeChild(u[e]),
            u.length ? t.insertBefore(i, u[e]) : t.appendChild(i);
        }
      }
    },
    function(t, e) {
      t.exports = function(t) {
        var e = 'undefined' != typeof window && window.location;
        if (!e) throw new Error('fixUrls requires window.location');
        if (!t || 'string' != typeof t) return t;
        var n = e.protocol + '//' + e.host,
          r = n + e.pathname.replace(/\/[^\/]*$/, '/');
        return t.replace(
          /url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,
          function(t, e) {
            var o,
              i = e
                .trim()
                .replace(/^"(.*)"$/, function(t, e) {
                  return e;
                })
                .replace(/^'(.*)'$/, function(t, e) {
                  return e;
                });
            return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)
              ? t
              : ((o =
                  0 === i.indexOf('//')
                    ? i
                    : 0 === i.indexOf('/')
                    ? n + i
                    : r + i.replace(/^\.\//, '')),
                'url(' + JSON.stringify(o) + ')');
          }
        );
      };
    },
  ]).default;
});

var $zoho = $zoho || {};

(function($) {
  $zoho.salesiq = $zoho.salesiq || {
    widgetcode:
      '2ec8007b909bea50fdf290d463df875ae63a33a1b36c413de416285a6db6e780',
    values: {},
    ready: function() {
      $('#chat-input, #start-chat').click(function() {
        $('#siqbtndiv').trigger('click');
      });
    },
  };
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.id = 'zsiqscript';
  s.defer = true;
  s.src = 'https://salesiq.zoho.com/widget';
  var t = document.getElementsByTagName('script')[0];
  t.parentNode.insertBefore(s, t);
  $('body').append("<div id='zsiqwidget'></div>");
})(jQuery);
