var Utils = function() {

    var request = require('request');

    this._ = require('underscore');

    this.session = null;

    this.creditCardList = [
        //type      prefix   length
        ["amex",    "34",    15],
        ["amex",    "37",    15],
        ["disc",    "6011",  16],
        ["mc",      "51",    16],
        ["mc",      "52",    16],
        ["mc",      "53",    16],
        ["mc",      "54",    16],
        ["mc",      "55",    16],
        ["visa",    "4",     13],
        ["visa",    "4",     16]
    ];

    this.color= function (str) {
        return str.match(/^#[a-f0-9]{6}$/i) !== null;
    };

    this.isValidString= function(val) {
        if (val.length > 1) {
            return true;
        } else {
            return false;
        }
    };

    // ----------------------- Validation functions -----------------
    this.isValidName = function(val, policies) {
        var re = /\w{3,}/;


        if (typeof policies != 'undefined' && typeof policies.length != 'undefined' && policies.length != 0 && this._.indexOf(this._.pluck(policies, 'name'), 'Name') != -1) {
            for (var i = 0; i < policies.length; i++)
                if (policies[i].name === 'Name') {
                    re = new RegExp(policies[i].value);
                }
        }
        return re.test(val);
    };

    this.isValidScreenName = function(val, policies) {
        var re = /.{4,}/;

        if (typeof policies != 'undefined' && typeof policies.length != 'undefined' && policies.length != 0 && this._.indexOf(this._.pluck(policies, 'name'), 'username') != -1) {
            for (var i = 0; i < policies.length; i++)
                if (policies[i].name === 'username') {
                    re = new RegExp(policies[i].value);
                }
        }

        return re.test(val);
    };

    this.isValidPassword = function(val, policies) {

        var re = /.{6,}/;

        if (typeof policies != 'undefined' && typeof policies.length != 'undefined' && policies.length != 0 && this._.indexOf(this._.pluck(policies, 'name'), 'password') != -1) {
            for (var i = 0; i < policies.length; i++)
                if (policies[i].name === 'password') {
                    re = new RegExp(policies[i].value);
                }
        }

        return re.test(val);
    };

    this.isValidEmailToken = function(val) {
        return (val.length==64) ? true : false;
    };

    this.isValidPhone=function(str) {
        var re = /1?\W*([2-9][0-8][0-9])\W*([2-9][0-9]{2})\W*([0-9]{4})(\se?x?t?(\d*))?/; ///^([\(]{1}[0-9]{3}[\)]{1}[ |\-]{0,1}|^[0-9]{3}[\-| ])?[0-9]{3}(\-| ){1}[0-9]{4}$/;
        return re.test(str);
    };

    this.isValidEmail= function(val) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(val);
    };

    this.isValidUrl=function(val) {
        if (typeof val != 'undefined') {
            var re = new RegExp(
                "^" +
                    "(?:(?:http(s)?)://)?" +
                    "(?:\\S+(?::\\S*)?@)?" +
                    "(?:" +
                    "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
                    "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
                    "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
                    "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
                    "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
                    "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
                    "|" +
                    "(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)" +
                    "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*" +
                    "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
                    ")" +
                    "(?::\\d{2,5})?" +
                    "(?:/[^\\s]*)?" +
                    "$", "i"
            );
            return re.test(val);
        } else {
            return false;
        }
    };

    this.email= function(val) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(val);
    };

    this.message = function(val) {
        return this._isBlank(val);
    };

    this.subject = function(val) {
        return this._isBlank(val);
    };

    this.name= function(val) {
        return this._isBlank(val);
    };

    this._isBlank= function(val) {
        var re = /\S/;
        return re.test(val);
    };

    this._isInteger= function(val) {
        var re = /^\s*(\+|-)?\d+\s*$/;
        return re.test(val);
    };

    this._isDecimal = function(val) {
        var re = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
        return re.test(val);
    };

    this._isValidName = function(val) {
        var re=/^.{3}$/;
        return re.test(val);
    };

    this._isValidLuhn= function(val) {
        var sum = 0;
        var i;

        for (i = val.length - 2; i >= 0; i -= 2) {
            sum += new Array(0, 2, 4, 6, 8, 1, 3, 5, 7, 9) [parseInt (val.charAt (i), 10)];
        }
        for (i = val.length - 1; i >= 0; i -= 2) {
            sum += parseInt (val.charAt (i), 10);
        }
        return (sum % 10) == 0;
    };

    this._isValidCC = function(cctype,ccnumber) {
        this.cc = ccnumber.replace (/[^\d]/g,'');
        if (this._isValidLuhn(this.cc)) {
            for (var i in this.creditCardList) {
                if (this.creditCardList[i][0] == (cctype.toLowerCase ())) {
                    if (this.cc.indexOf (this.creditCardList [i][1]) == 0) {
                        if (this.creditCardList [i][2] == this.cc.length) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };

    this.stripHtml=function(text) {
        var re = new RegExp("<(.|\n)+?>","gi");
        var match = re.exec(text);
        if (match != null) {
            text = text.replace(re,' ');
            return text;
        } else {
            return text;
        }
    };

    this.getClientIp = function(req) {
        var ipAddress;
        var forwardedIpsStr = req.header('x-forwarded-for');
        if (forwardedIpsStr) {
            var forwardedIps = forwardedIpsStr.split(',');
            ipAddress = forwardedIps[0];
        }
        if (!ipAddress) {
            ipAddress = req.connection.remoteAddress;
        }
        return ipAddress;
    };

    this.stripHtml=function(text) {
        var re = new RegExp("<(.|\n)+?>","gi");
        var match = re.exec(text);
        if (match != null) {
            text = text.replace(re,' ');
            return text;
        } else {
            return text;
        }
    };

    this.sha256 = function(s) {
        var chrsz   = 8;
        var hexcase = 0;

        function safe_add (x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }

        function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
        function R (X, n) { return ( X >>> n ); }
        function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
        function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
        function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
        function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
        function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
        function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }

        function core_sha256 (m, l) {
            var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
            var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
            var W = new Array(64);
            var a, b, c, d, e, f, g, h, i, j;
            var T1, T2;

            m[l >> 5] |= 0x80 << (24 - l % 32);
            m[((l + 64 >> 9) << 4) + 15] = l;

            for ( var i = 0; i<m.length; i+=16 ) {
                a = HASH[0];
                b = HASH[1];
                c = HASH[2];
                d = HASH[3];
                e = HASH[4];
                f = HASH[5];
                g = HASH[6];
                h = HASH[7];

                for ( var j = 0; j<64; j++) {
                    if (j < 16) W[j] = m[j + i];
                    else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

                    T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                    T2 = safe_add(Sigma0256(a), Maj(a, b, c));

                    h = g;
                    g = f;
                    f = e;
                    e = safe_add(d, T1);
                    d = c;
                    c = b;
                    b = a;
                    a = safe_add(T1, T2);
                }

                HASH[0] = safe_add(a, HASH[0]);
                HASH[1] = safe_add(b, HASH[1]);
                HASH[2] = safe_add(c, HASH[2]);
                HASH[3] = safe_add(d, HASH[3]);
                HASH[4] = safe_add(e, HASH[4]);
                HASH[5] = safe_add(f, HASH[5]);
                HASH[6] = safe_add(g, HASH[6]);
                HASH[7] = safe_add(h, HASH[7]);
            }
            return HASH;
        }

        function str2binb (str) {
            var bin = Array();
            var mask = (1 << chrsz) - 1;
            for(var i = 0; i < str.length * chrsz; i += chrsz) {
                bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
            }
            return bin;
        };

        function Utf8Encode(string) {
            if (string.length == 0) return;
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        }

        function binb2hex (binarray) {
            var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
            var str = "";
            for(var i = 0; i < binarray.length * 4; i++) {
                str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
                    hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
            }
            return str;
        }

        s = Utf8Encode(s);
        return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
    };
    this.logWsToConsole = function(path,payload) {
        console.log('===================  begin payload  =================');
        console.log(path + '\n' + JSON.stringify(payload).replace(',','\n'));
        console.log('===================  end payload  =================');

    };

    this.makeGenericPayload = function(method,path,body,headers) {
        switch(method) {
            case 'POST':
                if (typeof headers != 'undefined') {
                    return {
                        url         : path
                        ,jar        : false
                        ,method     : method
                        ,headers    : headers
                        ,json       : body
                        ,rejectUnauthorized: false
                        ,requestCert: true
                        ,agent: false
                    }
                } else {
                    return {
                        url         : path
                        ,jar        : false
                        ,method     : method
                        ,json       : body
                        ,rejectUnauthorized: false
                        ,requestCert: true
                        ,agent: false
                    }
                }
                break;
            case 'GET':
                if (typeof headers != 'undefined') {
                    return {
                        url         : path
                        ,jar        : false
                        ,method     : method
                        ,headers    : headers
                        ,rejectUnauthorized: false
                        ,requestCert: true
                        ,agent: false
                    }
                } else {
                    return {
                        url         : path
                        ,jar        : false
                        ,method     : method
                        ,rejectUnauthorized: false
                        ,requestCert: true
                        ,agent: false
                    }
                }
                break;
            default:
                return {};
        }
    };

    this.makePayload = function(method,path,body,isForm,headers) {
        switch(method) {
            case 'GET':
                if (typeof headers != 'undefined') {
                    return {
                        url         : process.env.IdsUrl + path
                        ,headers    : headers
                        ,jar        : false
                        ,method     : 'GET'
                        ,rejectUnauthorized: false
                        ,requestCert: true
                        ,agent: false
                    };
                } else {
                    return {
                        url         : process.env.IdsUrl + path
                        ,jar        : false
                        ,method     : 'GET'
                        ,rejectUnauthorized: false
                        ,requestCert: true
                        ,agent: false
                    };
                }
                break;
            case 'POST':
                if (typeof headers != 'undefined') {
                    if (typeof isForm != 'undefined') {
                        if (isForm) {
                            return {
                                url         : process.env.IdsUrl + path
                                ,headers    : headers
                                ,jar        : false
                                ,method     : 'POST'
                                ,form       : body
                        ,rejectUnauthorized: false
                        ,requestCert: true
                        ,agent: false
                            };
                        } else {
                            return {
                                url         : process.env.IdsUrl + path
                                ,headers    : headers
                                ,jar        : false
                                ,method     : 'POST'
                                ,json       : body
                        ,rejectUnauthorized: false
                        ,requestCert: true
                        ,agent: false
                            };
                        }
                    } else {
                        return {
                            url         : process.env.IdsUrl + path
                            ,headers    : headers
                            ,jar        : false
                            ,method     : 'POST'
                            ,json       : body
                        ,rejectUnauthorized: false
                        ,requestCert: true
                        ,agent: false
                        };
                    }

                } else {
                    if (typeof isForm != 'undefined') {
                        if (isForm) {
                            return {
                                url         : process.env.IdsUrl + path
                                ,jar        : false
                                ,method     : 'POST'
                                ,form       : body
                        ,rejectUnauthorized: false
                        ,requestCert: true
                        ,agent: false
                            };
                        } else {
                            return {
                                url         : process.env.IdsUrl + path
                                ,jar        : false
                                ,method     : 'POST'
                                ,json       : body
                        ,rejectUnauthorized: false
                        ,requestCert: true
                        ,agent: false
                            };
                        }
                    } else {
                        return {
                            url         : process.env.IdsUrl + path
                            ,jar        : false
                            ,method     : 'POST'
                            ,json       : body
                        ,rejectUnauthorized: false
                        ,requestCert: true
                        ,agent: false
                        };
                    }

                }
                break;
            case 'PUT':
                if (typeof headers != 'undefined') {
                    if (typeof isForm != 'undefined') {
                        if (isForm) {
                            return {
                                url         : process.env.IdsUrl + path
                                ,headers    : headers
                                ,jar        : false
                                ,method     : 'PUT'
                                ,form       : body
                                ,rejectUnauthorized: false
                                ,requestCert: true
                                ,agent: false
                            };
                        } else {
                            return {
                                url         : process.env.IdsUrl + path
                                ,headers    : headers
                                ,jar        : false
                                ,method     : 'PUT'
                                ,json       : body
                                ,rejectUnauthorized: false
                                ,requestCert: true
                                ,agent: false
                            };
                        }
                    } else {
                        return {
                            url         : process.env.IdsUrl + path
                            ,headers    : headers
                            ,jar        : false
                            ,method     : 'PUT'
                            ,json       : body
                            ,rejectUnauthorized: false
                            ,requestCert: true
                            ,agent: false
                        };
                    }

                } else {
                    if (typeof isForm != 'undefined') {
                        if (isForm) {
                            return {
                                url         : process.env.IdsUrl + path
                                ,jar        : false
                                ,method     : 'PUT'
                                ,form       : body
                                ,rejectUnauthorized: false
                                ,requestCert: true
                                ,agent: false
                            };
                        } else {
                            return {
                                url         : process.env.IdsUrl + path
                                ,jar        : false
                                ,method     : 'PUT'
                                ,json       : body
                                ,rejectUnauthorized: false
                                ,requestCert: true
                                ,agent: false
                            };
                        }
                    } else {
                        return {
                            url         : process.env.IdsUrl + path
                            ,jar        : false
                            ,method     : 'PUT'
                            ,json       : body
                            ,rejectUnauthorized: false
                            ,requestCert: true
                            ,agent: false
                        };
                    }

                }
                break;
            default:
        }
    };
    this.makeRequest = function(payload,cb) {
        request(
            payload
            , function(error, response, body) {
                if (!error && typeof response != "undefined") {
                    if (response.statusCode == 200) {
                        cb({status:200},{response:response.body});
                        console.log(response.body);
                    } else {
                        cb({status:response.statusCode});
                    }
                } else {
                    cb({status:500},{response: error});
                }
            }
        );
    };
    this.isNumeric = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    this.isBoolean = function(b) {
      return (b === 'true' || b === 'false' || typeof b === 'boolean');
    }

    this.addHours = function(d,h) {
        if (this._.isDate(d) && this._.isFinite(h)) {
            d.setHours(d.getHours()+h);
            return d;
        } else {
            return null;
        }
    },
    this.isValidDate=function(val) {
        try {
            var v = new Date(val);
        }catch(e) {
            return false;
        }
        return true;
    }

};

exports.Utils = Utils;

(function() {
    /**
     * Decimal adjustment of a number.
     *
     * @param {String}  type  The type of adjustment.
     * @param {Number}  value The number.
     * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
     * @returns {Number} The adjusted value.
     */
    function decimalAdjust(type, value, exp) {
        // If the exp is undefined or zero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    // Decimal round
    if (!Math.round10) {
        Math.round10 = function(value, exp) {
            return decimalAdjust('round', value, exp);
        };
    }
    // Decimal floor
    if (!Math.floor10) {
        Math.floor10 = function(value, exp) {
            return decimalAdjust('floor', value, exp);
        };
    }
    // Decimal ceil
    if (!Math.ceil10) {
        Math.ceil10 = function(value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }
})();
