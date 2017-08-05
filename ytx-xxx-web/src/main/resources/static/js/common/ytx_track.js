/**
 * 埋点，基于JQuery
 * Created by linjiang on 2017/4/18.
 */
(function ($) {
    //埋点组装的数据
    var track = {
        url: document.URL,
        referrer: document.referrer,
        domain: document.domain,
        os: getOS(),
        browser: getBrowser(),
        visitorcode: getVisitorCode(),
        search: getSearchByCookie(),
        source_type: 1,
        accountId: null
    };

    $.getJSON('/ipinfo', function (data) {
        track.ip = data.ip;
        sendTrack();
    });

    function sendTrack() {

        //提交到source http
        $.ajax({
            type: "post",
            url: "/foo/visit",
            data: JSON.stringify(track),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log(data);
            }
        });
    }


    /**
     * 获取操作系统
     */
    function getOS() {
        var sUserAgent = navigator.userAgent;
        var sPlatform = navigator.platform;
        var isWin = (sPlatform === "Win32") || (sPlatform === "Windows");
        var isMac = (sPlatform === "Mac68K") || (sPlatform === "MacPPC") || (sPlatform === "Macintosh") || (sPlatform === "MacIntel");
        if (isMac) return "Mac";
        var isUnix = (sPlatform === "X11") && !isWin && !isMac;
        if (isUnix) return "Unix";
        var isLinux = (String(sPlatform).indexOf("Linux") > -1);
        if (isLinux) return "Linux";
        if (isWin) {
            var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
            if (isWin2K) return "Win2000";
            var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
            if (isWinXP) return "WinXP";
            var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
            if (isWin2003) return "Win2003";
            var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
            if (isWinVista) return "WinVista";
            var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
            if (isWin7) return "Win7";
            var isWin8 = sUserAgent.indexOf("Windows NT 6.2") > -1 || sUserAgent.indexOf("Windows 8") > -1;
            if (isWin8) return "Win8";
            var isWin10 = sUserAgent.indexOf("Windows NT 10.0") > -1 || sUserAgent.indexOf("Windows 10") > -1;
            if (isWin10) return "Win10";
        }
        return "other";
    }

    /**
     * 获取浏览器
     */
    function getBrowser() {
        var agent = navigator.userAgent.toLowerCase();

        if (/ucweb/.test(agent)) {// UC浏览器
            return "uc";
        } else if (/chrome/.test(agent)) {//Chrome浏览器
            return "chrome";
        } else if (/firefox/.test(agent)) {//火狐浏览器
            return "firefox";
        } else if (/opera/.test(agent)) {//Opera浏览器
            return "opera";
        } else if (/safari/.test(agent) && !/chrome/.test(agent)) {//safari
            return "safari";
        } else if (/360se/.test(agent)) {//360浏览器
            return "360";
        } else if (/bidubrowser/.test(agent)) {//百度浏览器
            return "baidu";
        } else if (/metasr/.test(agent)) {//搜狗浏览器
            return "sougou";
        } else if (/msie/.test(agent)) {//ie
            return "ie";
        } else if (/lbbrowser/.test(agent)) {//猎豹浏览器
            return "liebao";
        } else if (/micromessenger/.test(agent)) {//微信内置浏览器
            return "weixin";
        } else if (/qqbrowser/.test(agent)) {//QQ浏览器
            return "qq";
        } else if (/maxthon/.test(agent)) {//傲游
            return "maxthon";
        } else {
            return "other";
        }
    }


    /**
     * 设置cookieId
     */
    function setCookie(c_name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";";
    }

    /**
     * 获取uuid
     * @returns {string}
     */
    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    /**
     * 获取cookieId
     */
    function getCookie(c_name) {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                var c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    }

    /**
     * 获取搜索引擎
     * @returns {*}
     */
    function getSearch() {
        var referrer = document.referrer;
        if (referrer == '') {
            return "直接访问";
        }
        var searchArr = {'baidu': 'Baidu', 'so': '360', '360': '360'};
        var search = referrer.split(".")[1];
        if (search.indexOf("ytx") != -1) {
            return "直接访问";
        }
        if (searchArr[search] == undefined) {
            return "其他渠道";
        }
        return searchArr[search];
    }

    /**
     * 在cookie中获取搜索引擎
     * @returns {*}
     */
    function getSearchByCookie() {
        var search = getCookie("search");
        if (search == "") {
            search = getSearch();
            setCookie("search", search, 1);
        }
        return search;
    }

    /**
     * 获取visitorCode
     */
    function getVisitorCode() {
        var visitorCode = getCookie("visitorCode");
        if (visitorCode == "") {
            visitorCode = guid();
            setCookie("visitorCode", visitorCode, 1);
        }
        return visitorCode;
    }
})(jQuery);