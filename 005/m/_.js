//# sourceMappingURL=_.js.map
(function(){var g=function(a){return new l(a)},l=function(a){a=document.querySelectorAll(a);this.length=a.length;this.version="0.0.5\u00df";this.revision="r1";this.fullversion=this.version+this.revision;this.isBeta=this.version.match(/\u00df/g)?!0:!1;this.isAlpha=this.version.match(/\u03b1/g)?!0:!1;this.isCompiled=!1;this.isStable=this.isBeta||this.isAlpha?!1:!0;this.ScriptRX="<script[^>]*>([\\S\\s]*?)\x3c/script\\s*>";this.JSONRX="/^/*-secure-([sS]*)*/s*$/";for(var b=0;b<this.length;b++)this[b]=
a[b];return this};g.fn=l.prototype={_:function(a,b){if(b)console.error("[_.js Error: NOT SUPPORTED]\nError, Failed to set '"+a+"' to '"+b+"'.");else return eval("this."+a)},$:function(){alert("Hi");confirm("Did you know that i'm not jQuery?")?alert("Why did you even try this?"):alert("Nope, i'm not jQuery");alert("Thanks for using '_.js'!\n"+decodeURIComponent("%F0%9F%92%99"))},require:function(a,b){if("object"===typeof a)for(var c=a.length-1;0<=c;c--){a[c].match(/\.js/g)||(a[c]+=".js");this.startsWith(a[c],
"_")&&!this.isLocal()&&this.isStable&&(a[c]="https://raw.githubusercontent.com/wesdegroot/_.js/master/latest/modules/"+a[c]);var d=document.createElement("script");d.type="text/javascript";d.src=a[c];1==c&&(d.onreadystatechange=b);1==c&&(d.onload=b);document.head.appendChild(d)}else"string"===typeof a?(a.match(/\.js/g)||(a+=".js"),this.startsWith(a,"_")&&!this.isLocal()&&this.isStable&&(a="https://raw.githubusercontent.com/wesdegroot/_.js/master/latest/modules/"+a),d=document.createElement("script"),
d.type="text/javascript",d.src=a,d.onreadystatechange=b,d.onload=b,document.head.appendChild(d)):console.error("Please use only a array, or a string.")},format:function(){var a=arguments,b=1;return a[0].replace(/%((%)|s|d)/g,function(c){var d=null;if(c[2])d=c[2];else{d=a[b];switch(c){case "%d":d=parseFloat(d),isNaN(d)&&(d=0)}b++}return d})},hide:function(){for(var a=this.length;a--;)this[a].style.display="none";return this},html:function(a){for(var b=this.length;b--;){if("undefined"===typeof a)return this[b].innerHTML;
this[b].innerHTML=a}return this},show:function(){for(var a=this.length;a--;)this[a].style.display="block";return this},framebreak:function(){top.location!=location&&(top.location.href=document.location.href);return this},ajaxPOST:function(a,b){for(var c=this.length;c--;){var d,e=this[c],m=a.action;d=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");for(var h=a.elements,m=a.action,k="",g,f=0;f<h.length;f++)(g="select"==h[f].tagName.toLowerCase()?h[f].options[h[f].selectedIndex].value:
h[f].value)&&(k+=h[f].name+"="+encodeURIComponent(g)+"&");k+="AJAXby="+encodeURIComponent("_.js");d.open("POST",m,!0);d.setRequestHeader("Content-type","application/x-www-form-urlencoded");d.onreadystatechange=function(){if(4==d.readyState&&200==d.status){e.innerHTML=d.responseText;for(var a=e.getElementsByTagName("script"),b=0,c=a.length;b<c;b++)eval(a[b].innerHTML);a=e.getElementsByTagName("form");b=0;for(c=a.length;b<c;b++)"post"==a[b].method.toLowerCase()&&a[b].setAttribute("onsubmit","event.preventDefault();_('."+
e.className+"').ajaxPOST(this);")}};d.send(k)}return!1},ajax:function(a,b){for(var c=this.length;c--;){var d,e=this[c];d=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");d.onreadystatechange=function(){if(4==d.readyState&&200==d.status){e.innerHTML=d.responseText;for(var a=e.getElementsByTagName("script"),b=0,c=a.length;b<c;b++)eval(a[b].innerHTML);a=e.getElementsByTagName("form");b=0;for(c=a.length;b<c;b++)"post"==a[b].method.toLowerCase()&&a[b].setAttribute("onsubmit",
"event.preventDefault();_('."+e.className+"').ajaxPOST(this);")}};d.open("GET",a,!0);d.send()}return this},noConflict:function(){"object"===typeof n&&(window._=n);return g},isLocal:function(){return"file:"!=window.location.protocol?window.location.href.match(/(localhost|127\.0\.0\.1|::1)/g)?!0:!1:!0},requireSSL:function(){"https:"==window.location.protocol||"file:"==window.location.protocol||window.location.href.match(/(localhost|127\.0\.0\.1|::1)/g)||(window.location.href="https:"+window.location.href.substring(window.location.protocol.length))},
loadExtension:function(a,b){return this.require(a,b)},isUndefined:function(a){return"undefined"==typeof a},isEmpty:function(a){return""==a},isBlank:function(a){return/^\s*$/.test(a)},stripTags:function(){for(var a=this.length;a--;)this[a].innerHTML=this[a].innerHTML.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi,"")},stripScripts:function(){for(var a=this.length;a--;)this[a].innerHTML=this[a].innerHTML.replace(new RegExp(this.ScriptRX,"img"),"")},css:function(a,b){for(var c=this.length;c--;){if(this.isUndefined(b))return window.getComputedStyle(this[c]).getPropertyValue(a);
a.replace(/-/g,"");this[c].setAttribute("style",a+":"+b+";");return this}},escapeHTML:function(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},unescapeHTML:function(a){return a.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&")},toArray:function(a){return a.split("")},runTest:function(a,b){return"function"!=typeof a?a==b:a()==b},includes:function(a,b){return-1<a.indexOf(b)},startsWith:function(a,b){return 0===a.lastIndexOf(b,0)},endsWith:function(a,b){var c=
a.length-b.length;return 0<=c&&a.indexOf(b,c)===c},capitalize:function(a){return a.charAt(0).toUpperCase()+a.substring(1).toLowerCase()},camelize:function(a){return a.replace(/-+(.)?/g,function(a,c){return c?c.toUpperCase():""})},scrollToBottom:function(){for(var a=this.length;a--;)this[a].scrollTop=0;return!0},scrollToTop:function(){for(var a=this.length;a--;)this[a].scrollTop=this[a].scrollHeight;return!0},truncate:function(a,b){for(var c=this.length;c--;)a=a||30,b=this.isUndefined(b)?"...":b,this[c].innerHTML=
this[c].innerHTML.length>a?this[c].innerHTML.substring(0,a)+b:String(this[c].innerHTML);return!0}};window.onerror=function(a,b,c,d,e){b=(d?" (col: "+d+")":"")+(e?"\nerror: "+e:"");console.error("[_.js INFORMATION]\nError: "+a+"\nline: "+c+b);return!0};if(window._)var n=window._;return window._=g})();
