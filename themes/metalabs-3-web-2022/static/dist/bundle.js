(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.window = global.window || {}));
}(this, (function (exports) { 'use strict';

	var _trimExp = /(^\s+|\s+$)/g;
	var emojiExp = /([\uD800-\uDBFF][\uDC00-\uDFFF](?:[\u200D\uFE0F][\uD800-\uDBFF][\uDC00-\uDFFF]){2,}|\uD83D\uDC69(?:\u200D(?:(?:\uD83D\uDC69\u200D)?\uD83D\uDC67|(?:\uD83D\uDC69\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]\uFE0F|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC6F\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3C-\uDD3E\uDDD6-\uDDDF])\u200D[\u2640\u2642]\uFE0F|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])\uFE0F|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC69\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708]))\uFE0F|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83D\uDC69\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]))|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\u200D(?:(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F)/;
	function getText(e) {
	  var type = e.nodeType,
	      result = "";

	  if (type === 1 || type === 9 || type === 11) {
	    if (typeof e.textContent === "string") {
	      return e.textContent;
	    } else {
	      for (e = e.firstChild; e; e = e.nextSibling) {
	        result += getText(e);
	      }
	    }
	  } else if (type === 3 || type === 4) {
	    return e.nodeValue;
	  }

	  return result;
	}
	function splitInnerHTML(element, delimiter, trim, preserveSpaces) {
	  var node = element.firstChild,
	      result = [],
	      s;

	  while (node) {
	    if (node.nodeType === 3) {
	      s = (node.nodeValue + "").replace(/^\n+/g, "");

	      if (!preserveSpaces) {
	        s = s.replace(/\s+/g, " ");
	      }

	      result.push.apply(result, emojiSafeSplit(s, delimiter, trim, preserveSpaces));
	    } else if ((node.nodeName + "").toLowerCase() === "br") {
	      result[result.length - 1] += "<br>";
	    } else {
	      result.push(node.outerHTML);
	    }

	    node = node.nextSibling;
	  }

	  s = result.length;

	  while (s--) {
	    result[s] === "&" && result.splice(s, 1, "&amp;");
	  }

	  return result;
	}
	function emojiSafeSplit(text, delimiter, trim, preserveSpaces) {
	  text += "";

	  if (trim) {
	    text = text.replace(_trimExp, "");
	  }

	  if (delimiter && delimiter !== "") {
	    return text.replace(/>/g, "&gt;").replace(/</g, "&lt;").split(delimiter);
	  }

	  var result = [],
	      l = text.length,
	      i = 0,
	      j,
	      character;

	  for (; i < l; i++) {
	    character = text.charAt(i);

	    if (character.charCodeAt(0) >= 0xD800 && character.charCodeAt(0) <= 0xDBFF || text.charCodeAt(i + 1) >= 0xFE00 && text.charCodeAt(i + 1) <= 0xFE0F) {
	      j = ((text.substr(i, 12).split(emojiExp) || [])[1] || "").length || 2;
	      character = text.substr(i, j);
	      result.emoji = 1;
	      i += j - 1;
	    }

	    result.push(character === ">" ? "&gt;" : character === "<" ? "&lt;" : preserveSpaces && character === " " && (text.charAt(i - 1) === " " || text.charAt(i + 1) === " ") ? "&nbsp;" : character);
	  }

	  return result;
	}

	/*!
	 * TextPlugin 3.10.4
	 * https://greensock.com
	 *
	 * @license Copyright 2008-2022, GreenSock. All rights reserved.
	 * Subject to the terms at https://greensock.com/standard-license or for
	 * Club GreenSock members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	*/

	var gsap,
	    _tempDiv,
	    _getGSAP = function _getGSAP() {
	  return gsap || typeof window !== "undefined" && (gsap = window.gsap) && gsap.registerPlugin && gsap;
	};

	var TextPlugin = {
	  version: "3.10.4",
	  name: "text",
	  init: function init(target, value, tween) {
	    typeof value !== "object" && (value = {
	      value: value
	    });

	    var i = target.nodeName.toUpperCase(),
	        data = this,
	        _value = value,
	        newClass = _value.newClass,
	        oldClass = _value.oldClass,
	        preserveSpaces = _value.preserveSpaces,
	        rtl = _value.rtl,
	        delimiter = data.delimiter = value.delimiter || "",
	        fillChar = data.fillChar = value.fillChar || (value.padSpace ? "&nbsp;" : ""),
	        _short,
	        text,
	        original,
	        j,
	        condensedText,
	        condensedOriginal,
	        aggregate,
	        s;

	    data.svg = target.getBBox && (i === "TEXT" || i === "TSPAN");

	    if (!("innerHTML" in target) && !data.svg) {
	      return false;
	    }

	    data.target = target;

	    if (!("value" in value)) {
	      data.text = data.original = [""];
	      return;
	    }

	    original = splitInnerHTML(target, delimiter, false, preserveSpaces);
	    _tempDiv || (_tempDiv = document.createElement("div"));
	    _tempDiv.innerHTML = value.value;
	    text = splitInnerHTML(_tempDiv, delimiter);
	    data.from = tween._from;

	    if ((data.from || rtl) && !(rtl && data.from)) {
	      i = original;
	      original = text;
	      text = i;
	    }

	    data.hasClass = !!(newClass || oldClass);
	    data.newClass = rtl ? oldClass : newClass;
	    data.oldClass = rtl ? newClass : oldClass;
	    i = original.length - text.length;
	    _short = i < 0 ? original : text;

	    if (i < 0) {
	      i = -i;
	    }

	    while (--i > -1) {
	      _short.push(fillChar);
	    }

	    if (value.type === "diff") {
	      j = 0;
	      condensedText = [];
	      condensedOriginal = [];
	      aggregate = "";

	      for (i = 0; i < text.length; i++) {
	        s = text[i];

	        if (s === original[i]) {
	          aggregate += s;
	        } else {
	          condensedText[j] = aggregate + s;
	          condensedOriginal[j++] = aggregate + original[i];
	          aggregate = "";
	        }
	      }

	      text = condensedText;
	      original = condensedOriginal;

	      if (aggregate) {
	        text.push(aggregate);
	        original.push(aggregate);
	      }
	    }

	    value.speed && tween.duration(Math.min(0.05 / value.speed * _short.length, value.maxDuration || 9999));
	    data.rtl = rtl;
	    data.original = original;
	    data.text = text;

	    data._props.push("text");
	  },
	  render: function render(ratio, data) {
	    if (ratio > 1) {
	      ratio = 1;
	    } else if (ratio < 0) {
	      ratio = 0;
	    }

	    if (data.from) {
	      ratio = 1 - ratio;
	    }

	    var text = data.text,
	        hasClass = data.hasClass,
	        newClass = data.newClass,
	        oldClass = data.oldClass,
	        delimiter = data.delimiter,
	        target = data.target,
	        fillChar = data.fillChar,
	        original = data.original,
	        rtl = data.rtl,
	        l = text.length,
	        i = (rtl ? 1 - ratio : ratio) * l + 0.5 | 0,
	        applyNew,
	        applyOld,
	        str;

	    if (hasClass && ratio) {
	      applyNew = newClass && i;
	      applyOld = oldClass && i !== l;
	      str = (applyNew ? "<span class='" + newClass + "'>" : "") + text.slice(0, i).join(delimiter) + (applyNew ? "</span>" : "") + (applyOld ? "<span class='" + oldClass + "'>" : "") + delimiter + original.slice(i).join(delimiter) + (applyOld ? "</span>" : "");
	    } else {
	      str = text.slice(0, i).join(delimiter) + delimiter + original.slice(i).join(delimiter);
	    }

	    if (data.svg) {
	      target.textContent = str;
	    } else {
	      target.innerHTML = fillChar === "&nbsp;" && ~str.indexOf("  ") ? str.split("  ").join("&nbsp;&nbsp;") : str;
	    }
	  }
	};
	TextPlugin.splitInnerHTML = splitInnerHTML;
	TextPlugin.emojiSafeSplit = emojiSafeSplit;
	TextPlugin.getText = getText;
	_getGSAP() && gsap.registerPlugin(TextPlugin);

	exports.TextPlugin = TextPlugin;
	exports.default = TextPlugin;

	Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],2:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _gsap = _interopRequireDefault(require("gsap"));
var _SplitText = require("gsap/dist/SplitText");
var _swiper = _interopRequireWildcard(require("swiper"));
var _dSliderModels = _interopRequireDefault(require("./3dSliderModels"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
_gsap.default.registerPlugin(_SplitText.SplitText);
var ThreeDSlider = /*#__PURE__*/function () {
  function ThreeDSlider() {
    _classCallCheck(this, ThreeDSlider);
    this.DOM = {
      wrapper: ".js-3d-slider-wrapper",
      slider: ".js-3d-slider",
      next: ".js-3d-slider-next",
      prev: ".js-3d-slider-prev",
      pagination: ".js-3d-slider-pagination",
      primaryTitle: ".js-slide-title-primary",
      secondaryTitle: ".js-slide-title-secondary"
    };
    this.wrapper = document.querySelector(this.DOM.wrapper);
  }
  _createClass(ThreeDSlider, [{
    key: "init",
    value: function init() {
      var _this = this;
      if (!this.wrapper) return;
      this.models = new _dSliderModels.default(this.wrapper);
      var slider = this.wrapper.querySelector(this.DOM.slider);
      var next = this.wrapper.querySelector(this.DOM.next);
      var prev = this.wrapper.querySelector(this.DOM.prev);
      var pagination = this.wrapper.querySelector(this.DOM.pagination);
      var swiper = new _swiper.default(slider, {
        modules: [_swiper.Navigation, _swiper.Pagination],
        loop: false,
        pagination: {
          el: pagination,
          clickable: false,
          renderBullet: function renderBullet(index, className) {
            return "\n                        <span class=\"".concat(className, "\">\n                            <span>\n                                <svg class=\"u-icon\" viewBox=\"0 0 12 19\" xmlns=\"http://www.w3.org/2000/svg\">\n                                    <path d=\"M6.18029 18.7476C9.98524 18.7476 11.5688 15.6579 11.5688 10.0807V8.66682C11.5688 3.08968 9.98524 0 6.18029 0H5.38851C1.60556 0 0 3.0635 0 8.66682V10.0807C0 15.6841 1.60556 18.7476 5.38851 18.7476H6.18029ZM5.47649 16.3387C3.34308 16.3387 2.30936 14.4272 2.30936 10.6044V8.14315C2.30936 4.32032 3.34308 2.4089 5.47649 2.4089H6.11431C8.24772 2.4089 9.28143 4.32032 9.28143 8.14315V10.6044C9.28143 14.4272 8.24772 16.3387 6.11431 16.3387H5.47649Z\"/>\n                                </svg>\n                            </span>\n                            <span>\n                                <svg class=\"u-icon\" viewBox=\"0 0 8 19\" xmlns=\"http://www.w3.org/2000/svg\">\n                                    <path d=\"M2.6973 1.57724L0.851562 0H7.27867L5.43294 1.57724V16.7863L7.27867 18.3635H0.851562L2.6973 16.7863V1.57724Z\"/>\n                                </svg>\n                            </span>\n                        </span>");
          }
        },
        navigation: {
          nextEl: next,
          prevEl: prev
        },
        on: {
          slideChange: function slideChange(swiper) {
            _this.animateTitles(swiper);
            _this.models.changeSlide(swiper.activeIndex, swiper.previousIndex);
          },
          afterInit: function afterInit(swiper) {
            _this.models.init();
            swiper.slides.forEach(function (slide, index) {
              return _this.models.initModel(slide, index);
            });
            _this.onScrollAnimation(swiper.slides[0], swiper);
          }
        }
      });
      swiper.slides.forEach(function (slide) {
        var titlePrimary = slide.querySelector(_this.DOM.primaryTitle);
        var titleSecondary = slide.querySelector(_this.DOM.secondaryTitle);
        var splitPrimary = new _SplitText.SplitText(titlePrimary, {
          type: "chars",
          charsClass: "split-text-char"
        });
        var splitSecondary = new _SplitText.SplitText(titleSecondary, {
          type: "chars",
          charsClass: "split-text-char"
        });
        _gsap.default.set(splitPrimary.chars, {
          visibility: "hidden"
        });
      });
    }
  }, {
    key: "animateTitles",
    value: function animateTitles(swiper) {
      this.animateTitleIn(swiper.slides[swiper.activeIndex]);
      if (swiper.slides[swiper.previousIndex]) {
        this.animateTitleOut(swiper.slides[swiper.previousIndex]);
      }
    }
  }, {
    key: "animateTitleIn",
    value: function animateTitleIn(slide) {
      var titlePrimaryChars = slide.querySelector(this.DOM.primaryTitle).querySelectorAll(".split-text-char");
      var titleSecondaryChars = slide.querySelector(this.DOM.secondaryTitle).querySelectorAll(".split-text-char");
      _gsap.default.to(titlePrimaryChars, {
        visibility: "visible",
        delay: 0.6,
        duration: 0.2,
        stagger: {
          each: 0.05,
          from: "center"
        }
      });
      _gsap.default.to(titleSecondaryChars, {
        visibility: "hidden",
        delay: 0.4,
        duration: 0.2,
        stagger: {
          each: 0.05,
          from: "center"
        }
      });
    }
  }, {
    key: "animateTitleOut",
    value: function animateTitleOut(slide) {
      var titlePrimaryChars = slide.querySelector(this.DOM.primaryTitle).querySelectorAll(".split-text-char");
      var titleSecondaryChars = slide.querySelector(this.DOM.secondaryTitle).querySelectorAll(".split-text-char");
      _gsap.default.to(titlePrimaryChars, {
        visibility: "hidden"
      });
      _gsap.default.to(titleSecondaryChars, {
        visibility: "visible"
      });
    }
  }, {
    key: "onScrollAnimation",
    value: function onScrollAnimation(firstSlide, swiper) {
      var _this2 = this;
      if (!firstSlide) return;
      _gsap.default.fromTo(firstSlide, {
        x: "100%",
        autoAlpha: 0
      }, {
        x: "0%",
        autoAlpha: 1,
        ease: "power4.out",
        duration: 1.2,
        scrollTrigger: {
          trigger: this.wrapper,
          start: "top 40%",
          end: "bottom bottom"
        },
        onStart: function onStart() {
          return _this2.animateTitles(swiper);
        }
      });
    }
  }]);
  return ThreeDSlider;
}();
exports.default = ThreeDSlider;

},{"./3dSliderModels":3,"gsap":"gsap","gsap/dist/SplitText":"gsap/dist/SplitText","swiper":"swiper"}],3:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _gsap = _interopRequireDefault(require("gsap"));
var THREE = _interopRequireWildcard(require("three"));
var _DRACOLoader = require("three/examples/jsm/loaders/DRACOLoader");
var _GLTFLoader = require("three/examples/jsm/loaders/GLTFLoader");
var _ScrollTrigger = _interopRequireDefault(require("gsap/dist/ScrollTrigger"));
var _is_js = _interopRequireDefault(require("is_js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
_gsap.default.registerPlugin(_ScrollTrigger.default);
var ThreeDSliderModels = /*#__PURE__*/function () {
  function ThreeDSliderModels(wrapper) {
    _classCallCheck(this, ThreeDSliderModels);
    this.DOM = {
      models: ".js-3d-slider-models",
      slide: ".js-3d-slider-slide"
    };
    this.models = wrapper.querySelector(this.DOM.models);

    // config
    this.config = {
      modelOffset: 6,
      modelScale: 1
    };
  }
  _createClass(ThreeDSliderModels, [{
    key: "init",
    value: function init() {
      var _this = this;
      if (!this.models) return;
      this.modelsArray = [];
      this.modelsWrapper = new THREE.Object3D();
      this.loader = new _GLTFLoader.GLTFLoader();

      // loader
      var dracoLoader = new _DRACOLoader.DRACOLoader();
      dracoLoader.setDecoderPath(window.dracoPath);
      dracoLoader.setDecoderConfig({
        type: "js"
      });
      this.loader.setDRACOLoader(dracoLoader);
      THREE.Cache.enabled = true;
      this.resizeModels();
      this.width = this.models.offsetWidth;
      this.height = this.models.offsetHeight;
      this.initCamera();
      this.initScene();
      this.initLights();
      this.initRenderer();
      document.addEventListener("afterLoader", function () {
        _this.animate();
      });
      this.onScrollAnimation();
      if (!_is_js.default.mobile()) {
        this.mouseMove();
      }
      this.scene.add(this.modelsWrapper);

      // handle resize
      window.addEventListener("resize", function () {
        return _this.onWindowResize();
      }, false);
    }
  }, {
    key: "onScrollAnimation",
    value: function onScrollAnimation() {
      _gsap.default.timeline({
        scrollTrigger: {
          trigger: this.models,
          start: "top 30%",
          end: "bottom bottom"
        }
      }).add("start").fromTo(this.modelsWrapper.position, {
        y: -3
      }, {
        y: 0,
        ease: "power4.out",
        duration: 1
      }, "start").fromTo(this.modelsWrapper.rotation, {
        x: -3
      }, {
        x: 0,
        ease: "power4.out",
        duration: 1
      }, "start");
    }
  }, {
    key: "resizeModels",
    value: function resizeModels() {
      var _this2 = this;
      _ScrollTrigger.default.matchMedia({
        "(min-width: 1100px)": function minWidth1100px() {
          if (_this2.config.modelScale !== 1.2) {
            _this2.config.modelScale = 1.2;
          }
        },
        "(max-width: 801px)": function maxWidth801px() {
          if (_this2.config.modelScale !== 1.2) {
            _this2.config.modelScale = 1.2;
          }
        },
        "(max-width: 600px)": function maxWidth600px() {
          if (_this2.config.modelScale !== 1) {
            _this2.config.modelScale = 1;
          }
        },
        "(max-width: 475px)": function maxWidth475px() {
          if (_this2.config.modelScale !== 0.85) {
            _this2.config.modelScale = 0.85;
          }
        }
      });
    }
  }, {
    key: "mouseMove",
    value: function mouseMove() {
      var _this3 = this;
      var halfHeight = this.height / 2;
      var singlePercentCoefficient = 0.05 / halfHeight;
      window.addEventListener("mousemove", function (ev) {
        var mouseY = ev.clientY;
        _gsap.default.to(_this3.yellowLight.position, {
          y: -1 - (mouseY - window.innerHeight) / 400
        });
        _gsap.default.to(_this3.blueLight.position, {
          y: -(mouseY - window.innerHeight) / 400
        });
        _gsap.default.to(_this3.modelsWrapper.rotation, {
          x: -singlePercentCoefficient * (halfHeight - ev.clientY),
          delay: 0.1
        });
      });
    }

    /**
     * camera setup
     */
  }, {
    key: "initCamera",
    value: function initCamera() {
      this.camera = new THREE.PerspectiveCamera(35, this.width / this.height, 0.5, 100);
      this.camera.position.set(0, 0, 6);
      this.camera.lookAt(0, 0, 0);
    }

    /**
     * scene setup
     */
  }, {
    key: "initScene",
    value: function initScene() {
      this.scene = new THREE.Scene();
    }

    /**
     * lights setup - because of performance > all in one object
     */
  }, {
    key: "initLights",
    value: function initLights() {
      var lightWrapper = new THREE.Object3D();
      this.yellowLight = new THREE.PointLight(0xfeb301, 5, 4);
      this.yellowLight.position.set(-1, 1, 2);
      this.blueLight = new THREE.PointLight(0x2400ff, 5, 2);
      this.blueLight.position.set(1, 0, 1);
      lightWrapper.add(this.blueLight);
      lightWrapper.add(this.yellowLight);
      this.scene.add(lightWrapper);
    }

    /**
     * renderer setup
     */
  }, {
    key: "initRenderer",
    value: function initRenderer() {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
        alpha: true
      });
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.setPixelRatio(window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio);
      this.renderer.setSize(this.width, this.height);
      this.renderer.physicallyCorrectLights = true;
      this.models.appendChild(this.renderer.domElement);
    }

    /**
     * model setup and load call
     */
  }, {
    key: "initModel",
    value: function initModel(slide, index) {
      var _this4 = this;
      if (!slide) return;
      this.loader.load(slide.dataset.model, function (gltf) {
        gltf.scene.rotation.y = -Math.PI / 2;
        gltf.scene.position.x = index * _this4.config.modelOffset;
        gltf.scene.scale.set(_this4.config.modelScale, _this4.config.modelScale, _this4.config.modelScale);
        gltf.scene.uuid = index;
        _this4.modelsArray.push(gltf.scene);
        _this4.modelsWrapper.add(gltf.scene);
      }, function (xhr) {
        // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      }, function (error) {
        // console.log("An error happened");
      });
    }

    /**
     *
     */
  }, {
    key: "onWindowResize",
    value: function onWindowResize() {
      var _this5 = this;
      this.resizeModels();
      this.modelsWrapper.children.forEach(function (model) {
        return model.scale.set(_this5.config.modelScale, _this5.config.modelScale, _this5.config.modelScale);
      });
      this.camera.aspect = this.models.offsetWidth / this.models.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.models.offsetWidth, this.models.offsetHeight);
    }

    /**
     * requestAnimationFrame
     */
  }, {
    key: "animate",
    value: function animate() {
      var _this6 = this;
      var raf = null;
      var animate = function animate() {
        _this6.renderer.render(_this6.scene, _this6.camera);
        if (_this6.renderer != null) {
          raf = requestAnimationFrame(animate);
        }
      };
      _ScrollTrigger.default.create({
        trigger: this.models,
        start: "top bottom",
        end: "bottom top",
        onEnter: function onEnter() {
          raf = requestAnimationFrame(animate);
        },
        onLeave: function onLeave() {
          cancelAnimationFrame(raf);
        },
        onEnterBack: function onEnterBack() {
          raf = requestAnimationFrame(animate);
        },
        onLeaveBack: function onLeaveBack() {
          cancelAnimationFrame(raf);
        }
      });
    }
  }, {
    key: "changeSlide",
    value: function changeSlide(index, prevIndex) {
      var model = this.modelsArray.find(function (model) {
        return model.uuid === index;
      });
      var prevModel = this.modelsArray.find(function (model) {
        return model.uuid === prevIndex;
      });
      var direction = prevIndex > index ? 1 : -1;
      _gsap.default.timeline().add("start").to(this.modelsWrapper.position, {
        x: -index * this.config.modelOffset,
        duration: 2,
        ease: "power4.out"
      }, "start").fromTo(model.rotation, {
        y: -Math.PI / 2 + 2.5 * direction
      }, {
        y: -Math.PI / 2,
        duration: 2,
        ease: "power4.out"
      }, "start").fromTo(prevModel.rotation, {
        y: -Math.PI / 2
      }, {
        y: -Math.PI / 2 + -2.5 * direction,
        duration: 2,
        ease: "power4.out"
      }, "start");
    }
  }]);
  return ThreeDSliderModels;
}();
exports.default = ThreeDSliderModels;

},{"gsap":"gsap","gsap/dist/ScrollTrigger":"gsap/dist/ScrollTrigger","is_js":"is_js","three":"three","three/examples/jsm/loaders/DRACOLoader":"three/examples/jsm/loaders/DRACOLoader","three/examples/jsm/loaders/GLTFLoader":"three/examples/jsm/loaders/GLTFLoader"}],4:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _gsap = _interopRequireDefault(require("gsap"));
var THREE = _interopRequireWildcard(require("three"));
var _DRACOLoader = require("three/examples/jsm/loaders/DRACOLoader");
var _GLTFLoader = require("three/examples/jsm/loaders/GLTFLoader");
var _ScrollTrigger = _interopRequireDefault(require("gsap/dist/ScrollTrigger"));
var _is_js = _interopRequireDefault(require("is_js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
_gsap.default.registerPlugin(_ScrollTrigger.default);
var HeaderModel = /*#__PURE__*/function () {
  function HeaderModel() {
    _classCallCheck(this, HeaderModel);
    this.DOM = {
      wrapper: ".js-contact-model-wrapper"
    };
    this.wrapper = document.querySelector(this.DOM.wrapper);
    this.model = null;

    // config
    this.config = {
      modelOffset: 6,
      modelScale: 1
    };
  }
  _createClass(HeaderModel, [{
    key: "init",
    value: function init() {
      var _this = this;
      if (!this.wrapper) return;
      this.loader = new _GLTFLoader.GLTFLoader();

      // loader
      var dracoLoader = new _DRACOLoader.DRACOLoader();
      dracoLoader.setDecoderPath(window.dracoPath);
      dracoLoader.setDecoderConfig({
        type: "js"
      });
      this.loader.setDRACOLoader(dracoLoader);
      THREE.Cache.enabled = true;

      // this.resizeModels();

      this.width = this.wrapper.offsetWidth;
      this.height = this.wrapper.offsetHeight;
      this.initCamera();
      this.initScene();
      this.initLights();
      this.initRenderer();
      document.addEventListener("afterLoader", function () {
        _this.animate();
      });
      if (!_is_js.default.mobile()) {
        this.mouseMove();
      }
      this.initModel();

      // handle resize
      window.addEventListener("resize", function () {
        return _this.onWindowResize();
      }, false);
    }
  }, {
    key: "resizeModels",
    value: function resizeModels() {
      var _this2 = this;
      _ScrollTrigger.default.matchMedia({
        "(min-width: 1100px)": function minWidth1100px() {
          if (_this2.config.modelScale !== 1) {
            _this2.config.modelScale = 1;
          }
        },
        "(max-width: 801px)": function maxWidth801px() {
          if (_this2.config.modelScale !== 1.2) {
            _this2.config.modelScale = 1.2;
          }
        },
        "(max-width: 500px)": function maxWidth500px() {
          if (_this2.config.modelScale !== 1.4) {
            _this2.config.modelScale = 1.4;
          }
        }
      });
    }
  }, {
    key: "mouseMove",
    value: function mouseMove() {
      var _this3 = this;
      window.addEventListener("mousemove", function (ev) {
        var mouseY = ev.clientY;
        _gsap.default.to(_this3.yellowLight.position, {
          y: -1 - (mouseY - window.innerHeight) / 400
        });
        _gsap.default.to(_this3.blueLight.position, {
          y: -(mouseY - window.innerHeight) / 400
        });
      });
    }

    /**
     * camera setup
     */
  }, {
    key: "initCamera",
    value: function initCamera() {
      this.camera = new THREE.PerspectiveCamera(35, this.width / this.height, 0.5, 100);
      this.camera.position.set(-2, 0.5, 5.5);
      this.camera.lookAt(0.1, 0.4, 0);
    }

    /**
     * scene setup
     */
  }, {
    key: "initScene",
    value: function initScene() {
      this.scene = new THREE.Scene();
    }

    /**
     * lights setup - because of performance > all in one object
     */
  }, {
    key: "initLights",
    value: function initLights() {
      var lightWrapper = new THREE.Object3D();
      this.yellowLight = new THREE.PointLight(0xfeb301, 5, 4);
      this.yellowLight.position.set(-1, 1, 2);
      this.blueLight = new THREE.PointLight(0x2400ff, 5, 2);
      this.blueLight.position.set(1, 0, 1);
      lightWrapper.add(this.blueLight);
      lightWrapper.add(this.yellowLight);
      this.scene.add(lightWrapper);
    }

    /**
     * renderer setup
     */
  }, {
    key: "initRenderer",
    value: function initRenderer() {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
        alpha: true
      });
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.setPixelRatio(window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio);
      this.renderer.setSize(this.width, this.height);
      this.renderer.physicallyCorrectLights = true;
      this.wrapper.appendChild(this.renderer.domElement);
    }

    /**
     * model setup and load call
     */
  }, {
    key: "initModel",
    value: function initModel() {
      var _this$wrapper$dataset,
        _this$wrapper$dataset2,
        _this4 = this;
      if (((_this$wrapper$dataset = this.wrapper.dataset) === null || _this$wrapper$dataset === void 0 ? void 0 : _this$wrapper$dataset.model) === "" || ((_this$wrapper$dataset2 = this.wrapper.dataset) === null || _this$wrapper$dataset2 === void 0 ? void 0 : _this$wrapper$dataset2.model) === null) return;
      this.loader.load(this.wrapper.dataset.model, function (gltf) {
        gltf.scene.rotation.y = -Math.PI / 2;
        gltf.scene.scale.set(_this4.config.modelScale, _this4.config.modelScale, _this4.config.modelScale);
        _this4.model = gltf.scene;
        _this4.scrollModelAnimation(gltf.scene);
        _this4.scene.add(gltf.scene);
      }, function (xhr) {
        // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      }, function (error) {
        // console.log("An error happened");
      });
    }
  }, {
    key: "scrollModelAnimation",
    value: function scrollModelAnimation(model) {
      _gsap.default.fromTo(model.rotation, {
        y: "+=0.25",
        x: "-=0.1"
      }, {
        y: "-=0.5",
        x: "+=0.2",
        scrollTrigger: {
          trigger: this.wrapper,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8
        }
      });
    }

    /**
     *
     */
  }, {
    key: "onWindowResize",
    value: function onWindowResize() {
      // this.resizeModels();

      this.model.scale.set(this.config.modelScale, this.config.modelScale, this.config.modelScale);
      this.camera.aspect = this.wrapper.offsetWidth / this.wrapper.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.wrapper.offsetWidth, this.wrapper.offsetHeight);
    }

    /**
     * requestAnimationFrame
     */
  }, {
    key: "animate",
    value: function animate() {
      var _this5 = this;
      var raf = null;
      var animate = function animate() {
        _this5.renderer.render(_this5.scene, _this5.camera);
        if (_this5.renderer != null) {
          raf = requestAnimationFrame(animate);
        }
      };
      _ScrollTrigger.default.create({
        trigger: this.wrapper,
        start: "top bottom",
        end: "bottom top",
        onEnter: function onEnter() {
          raf = requestAnimationFrame(animate);
        },
        onLeave: function onLeave() {
          cancelAnimationFrame(raf);
        },
        onEnterBack: function onEnterBack() {
          raf = requestAnimationFrame(animate);
        },
        onLeaveBack: function onLeaveBack() {
          cancelAnimationFrame(raf);
        }
      });
    }
  }]);
  return HeaderModel;
}();
exports.default = HeaderModel;

},{"gsap":"gsap","gsap/dist/ScrollTrigger":"gsap/dist/ScrollTrigger","is_js":"is_js","three":"three","three/examples/jsm/loaders/DRACOLoader":"three/examples/jsm/loaders/DRACOLoader","three/examples/jsm/loaders/GLTFLoader":"three/examples/jsm/loaders/GLTFLoader"}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _gsap = _interopRequireDefault(require("gsap"));
var _is_js = _interopRequireDefault(require("is_js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var Cursor = /*#__PURE__*/function () {
  function Cursor() {
    _classCallCheck(this, Cursor);
    this.DOM = {
      wrapper: ".js-cursor"
    };
    this.wrapper = document.querySelector(this.DOM.wrapper);
    this.body = document.querySelector("body");
    this.moved = false;
  }
  _createClass(Cursor, [{
    key: "init",
    value: function init() {
      var _this = this;
      if (!this.wrapper || _is_js.default.touchDevice()) return;
      var offsetY = this.wrapper.offsetHeight * 0.5;
      var offsetX = this.wrapper.offsetWidth * 0.05;
      window.addEventListener("pointermove", function (ev) {
        if (!_this.moved) {
          _this.moved = true;
          _this.wrapper.classList.add("is-moved");
        }
        _gsap.default.set(_this.wrapper, {
          x: ev.clientX - offsetX,
          y: ev.clientY - offsetY
        });
      });
      this.body.addEventListener("mouseenter", function () {
        _this.wrapper.classList.add("is-moved");
      });
      this.body.addEventListener("mouseleave", function () {
        _this.wrapper.classList.remove("is-moved");
      });
      document.querySelectorAll("a").forEach(function (link) {
        _this.singleLink(link);
      });
      document.querySelectorAll(".has-hover").forEach(function (link) {
        _this.singleLink(link);
      });
    }
  }, {
    key: "singleLink",
    value: function singleLink(link) {
      var _this2 = this;
      link.addEventListener("mouseenter", function () {
        _this2.wrapper.classList.add("is-active");
      });
      link.addEventListener("mouseleave", function () {
        _this2.wrapper.classList.remove("is-active");
      });
    }
  }]);
  return Cursor;
}();
exports.default = Cursor;

},{"gsap":"gsap","is_js":"is_js"}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _gsap = _interopRequireDefault(require("gsap"));
var _TextPlugin = require("gsap/dist/TextPlugin");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
_gsap.default.registerPlugin(_TextPlugin.TextPlugin);
var Flicker404 = /*#__PURE__*/function () {
  function Flicker404() {
    _classCallCheck(this, Flicker404);
    this.DOM = {
      text: ".js-404-flickering",
      states: {
        isActive: "is-active"
      }
    };
    this.text = document.querySelector(this.DOM.text);
  }

  /**
   * Init
   */
  _createClass(Flicker404, [{
    key: "init",
    value: function init() {
      if (this.text !== null) {
        this.setup();
      }
    }
  }, {
    key: "setup",
    value: function setup() {
      var _this = this;
      this.text.addEventListener("mouseenter", function () {
        _this.onEnter();
      });
      this.text.addEventListener("mouseleave", function () {
        _this.onExit();
      });
    }
  }, {
    key: "onExit",
    value: function onExit() {
      _gsap.default.to(this.text, {
        delay: 0.2,
        text: this.text.dataset.exit,
        duration: 0.5
      });
      _gsap.default.timeline({
        delay: 0,
        scrollTrigger: {
          trigger: this.text,
          start: "top 90%"
        }
      }).to(this.text, {
        classList: "is-serif",
        duration: 0.05
      }).to(this.text, {
        classList: "",
        duration: 0.05
      }).to(this.text, {
        classList: "is-serif",
        duration: 0.075
      }).to(this.text, {
        classList: "",
        duration: 0.075
      }).to(this.text, {
        classList: "is-serif",
        duration: 0.1
      });
    }
  }, {
    key: "onEnter",
    value: function onEnter() {
      _gsap.default.to(this.text, {
        delay: 0.2,
        text: this.text.dataset.enter,
        duration: 0.5
      });
      _gsap.default.timeline({
        delay: 0,
        scrollTrigger: {
          trigger: this.text,
          start: "top 90%"
        }
      }).to(this.text, {
        classList: "is-serif",
        duration: 0.05
      }).to(this.text, {
        classList: "",
        duration: 0.05
      }).to(this.text, {
        classList: "is-serif",
        duration: 0.075
      }).to(this.text, {
        classList: "",
        duration: 0.075
      }).to(this.text, {
        classList: "is-serif",
        duration: 0.1
      }).to(this.text, {
        classList: "",
        duration: 0.075
      });
    }
  }]);
  return Flicker404;
}();
exports.default = Flicker404;

},{"gsap":"gsap","gsap/dist/TextPlugin":1}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _gsap = _interopRequireDefault(require("gsap"));
var _ScrollTrigger = _interopRequireDefault(require("gsap/dist/ScrollTrigger"));
var _SplitText = require("gsap/dist/SplitText");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
_gsap.default.registerPlugin(_ScrollTrigger.default, _SplitText.SplitText);
var FlickeringText = /*#__PURE__*/function () {
  function FlickeringText() {
    _classCallCheck(this, FlickeringText);
    this.DOM = {
      wrapper: ".js-flickering-text",
      email: ".js-mail-reveal a"
    };
    this.wrappers = document.querySelectorAll(this.DOM.wrapper);
    this.email = document.querySelector(this.DOM.email);
  }
  _createClass(FlickeringText, [{
    key: "init",
    value: function init() {
      var _this = this;
      if (this.email) this.emailReveal();
      if (this.wrappers.length < 1) return;
      this.wrappers.forEach(function (wrapper) {
        return _this.singleWrapper(wrapper);
      });
    }
  }, {
    key: "singleWrapper",
    value: function singleWrapper(wrapper) {
      var _this2 = this;
      var split = new _SplitText.SplitText(wrapper, {
        type: "words",
        wordsClass: "u-split-text-word"
      });
      if (split.words.length > 0) {
        _gsap.default.set(split.words, {
          autoAlpha: 0
        });
      }
      document.addEventListener("afterLoader", function () {
        _this2.animateIn(split.words, wrapper);
        var texts = wrapper.querySelectorAll("b");
        if (texts.length < 1) return;
        texts.forEach(function (text) {
          var flickerAnimation = _gsap.default.timeline({
            delay: 0.6,
            scrollTrigger: {
              trigger: text,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "restart none restart none",
              onEnter: function onEnter() {
                return text.classList.add("is-animating");
              },
              onEnterBack: function onEnterBack() {
                return text.classList.add("is-animating");
              }
            }
          }).to(text, {
            classList: "is-serif",
            duration: 0.05
          }).to(text, {
            classList: "",
            duration: 0.05
          }).to(text, {
            classList: "is-serif",
            duration: 0.075
          }).to(text, {
            classList: "",
            duration: 0.075
          }).to(text, {
            classList: "is-serif",
            duration: 0.1,
            onComplete: function onComplete() {
              text.classList.remove("is-animating");
            }
          });
          text.addEventListener("mouseenter", function () {
            if (!text.classList.contains("is-animating")) {
              text.classList.add("is-animating");
              flickerAnimation.delay(0).restart();
            }
          });
        });
      });
    }
  }, {
    key: "animateIn",
    value: function animateIn(words, wrapper) {
      _gsap.default.fromTo(words, {
        y: "20%",
        autoAlpha: 0
      }, {
        y: "0%",
        autoAlpha: 1,
        ease: "expo.inOut",
        stagger: 0.02,
        duration: 0.4,
        scrollTrigger: {
          trigger: wrapper,
          start: "top 85%",
          end: "bottom top"
        }
      });
    }
  }, {
    key: "emailReveal",
    value: function emailReveal() {
      var split = new _SplitText.SplitText(this.email, {
        type: "chars",
        wordsClass: "u-split-text-word"
      });
      _gsap.default.set(split.chars, {
        autoAlpha: 0
      });
      _gsap.default.fromTo(split.chars, {
        y: "20%",
        autoAlpha: 0
      }, {
        y: "0%",
        autoAlpha: 1,
        ease: "expo.inOut",
        stagger: 0.02,
        duration: 0.4,
        scrollTrigger: {
          trigger: this.email,
          start: "top 80%",
          end: "bottom top"
        }
      });
    }
  }]);
  return FlickeringText;
}();
exports.default = FlickeringText;

},{"gsap":"gsap","gsap/dist/ScrollTrigger":"gsap/dist/ScrollTrigger","gsap/dist/SplitText":"gsap/dist/SplitText"}],8:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _gsap = _interopRequireDefault(require("gsap"));
var THREE = _interopRequireWildcard(require("three"));
var _DRACOLoader = require("three/examples/jsm/loaders/DRACOLoader");
var _GLTFLoader = require("three/examples/jsm/loaders/GLTFLoader");
var _ScrollTrigger = _interopRequireDefault(require("gsap/dist/ScrollTrigger"));
var _is_js = _interopRequireDefault(require("is_js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
_gsap.default.registerPlugin(_ScrollTrigger.default);
var HeaderModel = /*#__PURE__*/function () {
  function HeaderModel(afterLoader) {
    _classCallCheck(this, HeaderModel);
    this.DOM = {
      wrapper: ".js-header-model-wrapper",
      header: ".js-header"
    };
    this.wrapper = document.querySelector(this.DOM.wrapper);
    this.header = document.querySelector(this.DOM.header);
    this.model = null;

    // config
    this.config = {
      modelOffset: 6,
      modelScale: 1
    };
  }
  _createClass(HeaderModel, [{
    key: "init",
    value: function init() {
      var _this = this;
      if (!this.wrapper) return;
      this.loader = new _GLTFLoader.GLTFLoader();

      // loader
      var dracoLoader = new _DRACOLoader.DRACOLoader();
      dracoLoader.setDecoderPath(window.dracoPath);
      dracoLoader.setDecoderConfig({
        type: "js"
      });
      this.loader.setDRACOLoader(dracoLoader);
      THREE.Cache.enabled = true;
      this.resizeModels();
      this.width = this.wrapper.offsetWidth;
      this.height = this.wrapper.offsetHeight;
      this.initCamera();
      this.initScene();
      this.initLights();
      this.initRenderer();
      document.addEventListener("afterLoader", function () {
        _this.animate();
      });
      if (!_is_js.default.mobile()) {
        this.mouseMove();
      }
      this.initModel();

      // handle resize
      window.addEventListener("resize", function () {
        return _this.onWindowResize();
      }, false);
    }
  }, {
    key: "resizeModels",
    value: function resizeModels() {
      var _this2 = this;
      _ScrollTrigger.default.matchMedia({
        "(min-width: 1100px)": function minWidth1100px() {
          if (_this2.config.modelScale !== 0.9) {
            _this2.config.modelScale = 0.9;
          }
        },
        "(max-width: 801px)": function maxWidth801px() {
          if (_this2.config.modelScale !== 0.7) {
            _this2.config.modelScale = 0.7;
          }
        },
        "(max-width: 600px)": function maxWidth600px() {
          if (_this2.config.modelScale !== 0.8) {
            _this2.config.modelScale = 0.8;
          }
        },
        "(max-width: 475px)": function maxWidth475px() {
          if (_this2.config.modelScale !== 1.1) {
            _this2.config.modelScale = 1.1;
          }
        }
      });
    }
  }, {
    key: "mouseMove",
    value: function mouseMove() {
      var _this3 = this;
      window.addEventListener("mousemove", function (ev) {
        var mouseY = ev.clientY;
        _gsap.default.to(_this3.yellowLight.position, {
          y: -1 - (mouseY - window.innerHeight) / 400
        });
        _gsap.default.to(_this3.blueLight.position, {
          y: 1 + (mouseY - window.innerHeight) / 400
        });
      });
    }

    /**
     * camera setup
     */
  }, {
    key: "initCamera",
    value: function initCamera() {
      this.camera = new THREE.PerspectiveCamera(35, this.width / this.height, 0.5, 100);
      this.camera.position.set(0, 0, 6);
      this.camera.lookAt(0, 0, 0);
    }

    /**
     * scene setup
     */
  }, {
    key: "initScene",
    value: function initScene() {
      this.scene = new THREE.Scene();
    }

    /**
     * lights setup - because of performance > all in one object
     */
  }, {
    key: "initLights",
    value: function initLights() {
      var lightWrapper = new THREE.Object3D();
      this.yellowLight = new THREE.PointLight(0xfeb301, 6, 5);
      this.yellowLight.position.set(-2, 1, 1);
      this.blueLight = new THREE.PointLight(0x2400ff, 6, 4);
      this.blueLight.position.set(1.5, 0, 2);
      lightWrapper.add(this.blueLight);
      lightWrapper.add(this.yellowLight);
      this.scene.add(lightWrapper);
    }

    /**
     * renderer setup
     */
  }, {
    key: "initRenderer",
    value: function initRenderer() {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
        alpha: true
      });
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.setPixelRatio(window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio);
      this.renderer.setSize(this.width, this.height);
      this.renderer.physicallyCorrectLights = true;
      this.wrapper.appendChild(this.renderer.domElement);
    }

    /**
     * model setup and load call
     */
  }, {
    key: "initModel",
    value: function initModel() {
      var _this$wrapper$dataset,
        _this$wrapper$dataset2,
        _this4 = this;
      if (((_this$wrapper$dataset = this.wrapper.dataset) === null || _this$wrapper$dataset === void 0 ? void 0 : _this$wrapper$dataset.model) === "" || ((_this$wrapper$dataset2 = this.wrapper.dataset) === null || _this$wrapper$dataset2 === void 0 ? void 0 : _this$wrapper$dataset2.model) === null) return;
      this.loader.load(this.wrapper.dataset.model, function (gltf) {
        gltf.scene.rotation.y = -Math.PI / 2;
        gltf.scene.scale.set(_this4.config.modelScale, _this4.config.modelScale, _this4.config.modelScale);
        _this4.model = gltf.scene;
        _this4.scrollModelAnimation(gltf.scene);
        _this4.scene.add(gltf.scene);
      }, function (xhr) {
        // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      }, function (error) {
        // console.log("An error happened");
      });
    }
  }, {
    key: "scrollModelAnimation",
    value: function scrollModelAnimation(model) {
      _gsap.default.fromTo(model.rotation, {
        y: "+=0.25",
        x: "-=0.1"
      }, {
        y: "-=0.5",
        x: "+=0.2",
        scrollTrigger: {
          trigger: this.header,
          start: "top top",
          end: "bottom top",
          scrub: 0.8
        }
      });
    }

    /**
     *
     */
  }, {
    key: "onWindowResize",
    value: function onWindowResize() {
      this.resizeModels();
      this.model.scale.set(this.config.modelScale, this.config.modelScale, this.config.modelScale);
      this.camera.aspect = this.wrapper.offsetWidth / this.wrapper.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.wrapper.offsetWidth, this.wrapper.offsetHeight);
    }

    /**
     * requestAnimationFrame
     */
  }, {
    key: "animate",
    value: function animate() {
      var _this5 = this;
      var raf = null;
      var animate = function animate() {
        _this5.renderer.render(_this5.scene, _this5.camera);
        if (_this5.renderer != null) {
          raf = requestAnimationFrame(animate);
        }
      };
      _ScrollTrigger.default.create({
        trigger: this.wrapper,
        start: "top bottom",
        end: "bottom top",
        onEnter: function onEnter() {
          raf = requestAnimationFrame(animate);
        },
        onLeave: function onLeave() {
          cancelAnimationFrame(raf);
        },
        onEnterBack: function onEnterBack() {
          raf = requestAnimationFrame(animate);
        },
        onLeaveBack: function onLeaveBack() {
          cancelAnimationFrame(raf);
        }
      });
    }
  }]);
  return HeaderModel;
}();
exports.default = HeaderModel;

},{"gsap":"gsap","gsap/dist/ScrollTrigger":"gsap/dist/ScrollTrigger","is_js":"is_js","three":"three","three/examples/jsm/loaders/DRACOLoader":"three/examples/jsm/loaders/DRACOLoader","three/examples/jsm/loaders/GLTFLoader":"three/examples/jsm/loaders/GLTFLoader"}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _gsap = _interopRequireDefault(require("gsap"));
var _lottie_light = _interopRequireDefault(require("lottie-web/build/player/lottie_light"));
var _bScrollLock = _interopRequireDefault(require("@bornfight/b-scroll-lock"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var Loader = /*#__PURE__*/function () {
  function Loader(afterLoader) {
    var _document$querySelect, _this$logo, _this$logo2;
    _classCallCheck(this, Loader);
    this.DOM = {
      wrapper: ".js-loader",
      animation: ".js-loader-animation",
      animationWrapper: ".js-loader-animation-wrapper",
      logo: ".js-nav-logo",
      header: ".js-header",
      nav: ".js-navigation-wrapper"
    };
    this.wrapper = document.querySelector(this.DOM.wrapper);
    this.afterLoader = afterLoader;
    if (!this.wrapper) {
      document.dispatchEvent(this.afterLoader);
    }
    this.logo = (_document$querySelect = document.querySelector(this.DOM.logo)) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.getBoundingClientRect();
    this.header = document.querySelector(this.DOM.header);
    this.nav = document.querySelector(this.DOM.nav);
    this.topLogoOffset = (_this$logo = this.logo) === null || _this$logo === void 0 ? void 0 : _this$logo.top;
    this.leftLogoOffset = (_this$logo2 = this.logo) === null || _this$logo2 === void 0 ? void 0 : _this$logo2.left;
    this.additionOffset = 10 / 1440 * window.innerWidth;
    _gsap.default.set(this.header, {
      x: 50,
      y: 50,
      autoAlpha: 0
    });
    _gsap.default.set(this.nav, {
      autoAlpha: 0
    });
    this.scrollLock = new _bScrollLock.default();
  }
  _createClass(Loader, [{
    key: "init",
    value: function init() {
      var _this = this;
      if (!this.wrapper) return;
      var animation = this.wrapper.querySelector(this.DOM.animation);
      var animationWrapper = this.wrapper.querySelector(this.DOM.animationWrapper);
      var json = animation.dataset.loader;
      if (!json) return;
      var lottieAnim = _lottie_light.default.loadAnimation({
        container: animation,
        renderer: "svg",
        autoplay: false,
        path: json
      });
      setTimeout(function () {
        if (window.smoother !== undefined) {
          window.smoother.paused(true);
        } else {
          _this.scrollLock.lockScroll();
        }
        lottieAnim.play();
      }, 200);
      lottieAnim.addEventListener("enterFrame", function (animation) {
        if (animation.currentTime > lottieAnim.totalFrames - 1) {
          lottieAnim.pause();
          _this.endOfAnimation(animationWrapper);
        }
      });
    }
  }, {
    key: "endOfAnimation",
    value: function endOfAnimation(animationWrapper) {
      var _this2 = this;
      if (window.smoother !== undefined) {
        window.smoother.paused(false);
      } else {
        this.scrollLock.unlockScroll();
      }
      this.topOffset = animationWrapper.getBoundingClientRect().top;
      var x = -(-this.leftLogoOffset - this.additionOffset + animationWrapper.offsetWidth / 2 - this.logo.width / 2);
      var y = -(this.topOffset - this.topLogoOffset + animationWrapper.offsetHeight / 2 - this.logo.height / 2);
      var scale = 0.69;
      var duration = 0.3;
      this.wrapper.classList.add("is-transparent");
      if (window.innerWidth < 800) {
        x = 0;
        y = 0;
        scale = 1;
        duration = 0;
      }
      _gsap.default.timeline().add("start").to(animationWrapper, {
        x: x,
        y: y,
        scale: scale,
        duration: duration
      }, "start").add("nav", "start+=0.2").to(this.wrapper, {
        autoAlpha: 0
      }, "nav").to(this.nav, {
        autoAlpha: 1
      }, "nav").add("content", "-=0.1").to(this.header, {
        x: 0,
        y: 0,
        autoAlpha: 1,
        duration: 1.2,
        ease: "expo.out",
        onStart: function onStart() {
          return document.dispatchEvent(_this2.afterLoader);
        }
      }, "content");
    }
  }]);
  return Loader;
}();
exports.default = Loader;

},{"@bornfight/b-scroll-lock":"@bornfight/b-scroll-lock","gsap":"gsap","lottie-web/build/player/lottie_light":"lottie-web/build/player/lottie_light"}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _gsap = _interopRequireDefault(require("gsap"));
var _ScrollTrigger = _interopRequireDefault(require("gsap/dist/ScrollTrigger"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
_gsap.default.registerPlugin(_ScrollTrigger.default);
/**
 * Marquee Controller
 */
var Marquee = /*#__PURE__*/function () {
  function Marquee() {
    _classCallCheck(this, Marquee);
    this.DOM = {
      item: ".js-scroll-marquee"
    };
    this.items = document.querySelectorAll(this.DOM.item);
  }
  _createClass(Marquee, [{
    key: "init",
    value: function init() {
      var _this = this;
      console.log("MarqueeController init()");
      if (this.items.length < 1) {
        return;
      }
      this.items.forEach(function (item, index) {
        _this.animateLine(item, index % 2 === 0);
      });
    }

    /**
     *
     * @param line
     * @param direction
     */
  }, {
    key: "animateLine",
    value: function animateLine(line, direction) {
      var start = -window.innerWidth / 4;
      var end = 0;
      if (direction) {
        start = 0;
        end = -window.innerWidth / 4;
      }
      _gsap.default.fromTo(line, {
        x: start
      }, {
        x: end,
        scrollTrigger: {
          trigger: line,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.2
        },
        ease: "none"
      });
    }
  }]);
  return Marquee;
}();
exports.default = Marquee;

},{"gsap":"gsap","gsap/dist/ScrollTrigger":"gsap/dist/ScrollTrigger"}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _gsap = require("gsap");
var _ScrollTrigger = _interopRequireDefault(require("gsap/dist/ScrollTrigger"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
_gsap.gsap.registerPlugin(_ScrollTrigger.default);

/**
 * Navigation controller
 * "smart" navigation which goes off screen when scrolling down for a better overview of content and UX
 * navigation appears when scrolling up
 */
var NavigationController = /*#__PURE__*/function () {
  function NavigationController() {
    _classCallCheck(this, NavigationController);
    /**
     * Navigation DOM selectors
     * Navigation DOM state CSS classes
     * @type {{navigation: string, states: {navigationSlideUp: string, navigationScrolled: string, navigationFixed: string}}}
     */
    this.DOM = {
      navigation: ".js-navigation",
      navigationItem: ".js-navigation-item",
      hamburger: ".js-hamburger",
      navigationList: ".js-navigation-list",
      states: {
        navigationScrolled: "has-scrolled",
        navigationFixed: "is-fixed",
        navigationSlideUp: "slide-up",
        active: "is-active"
      }
    };

    /**
     * flag, state variable for scrolling event
     * @type {boolean}
     */
    this.scrolling = false;
    /**
     * amount of pixels to scroll from top for adding "has-scrolled" state class
     * @type {number}
     */
    this.scrollNavigationOffset = 200;
    /**
     * variable for storing amount of scroll from top position value
     * @type {number}
     */
    this.previousTop = 0;
    /**
     * variable for storing current scroll position value
     * @type {number}
     */
    this.currentTop = 0;
    this.scrollDelta = 0;
    this.scrollOffset = 0;

    /**
     * fetch navigation element DOM element
     * @type {Element}
     */
    this.navigation = document.querySelector(this.DOM.navigation);
    this.hamburger = document.querySelector(this.DOM.hamburger);
    this.navigationList = document.querySelector(this.DOM.navigationList);
    this.bodyItems = document.querySelectorAll("[data-anchor-target]");
  }

  //region methods

  /**
   *
   */
  _createClass(NavigationController, [{
    key: "init",
    value: function init() {
      if (this.navigation !== null) {
        console.log("Navigation init()");
        this.navigationController();
      } else {
        console.error("".concat(this.DOM.navigation, " does not exist in the DOM!"));
      }
      if (this.navigationList !== null && this.hamburger !== null) this.mobileNavigation();
      if (this.navigationList && this.bodyItems.length > 0) this.activeController();
    }
  }, {
    key: "activeController",
    value: function activeController() {
      this.bodyItems.forEach(function (item) {
        var target = item.dataset.anchorTarget;
        if (target) {
          var link = document.querySelector("[data-scroll-to=\"#".concat(target, "\"]"));
          if (link) {
            _ScrollTrigger.default.create({
              trigger: item,
              start: "top center",
              end: "bottom center",
              onEnter: function onEnter() {
                link.classList.add("is-active");
              },
              onEnterBack: function onEnterBack() {
                link.classList.add("is-active");
              },
              onLeave: function onLeave() {
                link.classList.remove("is-active");
              },
              onLeaveBack: function onLeaveBack() {
                link.classList.remove("is-active");
              }
            });
          }
        }
      });
    }

    /**
     *
     */
  }, {
    key: "navigationController",
    value: function navigationController() {
      var _this = this;
      document.addEventListener("scroll", function () {
        if (!_this.scrolling) {
          _this.scrolling = true;
          if (!window.requestAnimationFrame) {
            setTimeout(_this.checkScroll(), 250);
          } else {
            requestAnimationFrame(function () {
              return _this.checkScroll();
            });
          }
        }
      });
    }

    /**
     *
     */
  }, {
    key: "checkScroll",
    value: function checkScroll() {
      /**
       *
       * @type {number}
       */
      var currentTop = window.pageYOffset | document.body.scrollTop;
      this.changeNavigationState(currentTop);
      this.previousTop = currentTop;
      this.scrolling = false;
    }

    /**
     *
     * @param currentTop
     */
  }, {
    key: "changeNavigationState",
    value: function changeNavigationState(currentTop) {
      if (currentTop > this.scrollNavigationOffset) {
        this.navigation.classList.add(this.DOM.states.navigationScrolled);
      } else {
        this.navigation.classList.remove(this.DOM.states.navigationScrolled);
      }
      if (this.previousTop >= currentTop) {
        this.scrollingUp(currentTop);
      } else {
        this.scrollingDown(currentTop);
      }
    }

    /**
     *
     * @param currentTop
     */
  }, {
    key: "scrollingUp",
    value: function scrollingUp(currentTop) {
      if (currentTop < this.scrollNavigationOffset) {
        this.navigation.classList.remove(this.DOM.states.navigationSlideUp);
      } else if (this.previousTop - currentTop > this.scrollDelta) {
        this.navigation.classList.remove(this.DOM.states.navigationSlideUp);
      }
    }

    /**
     *
     * @param currentTop
     */
  }, {
    key: "scrollingDown",
    value: function scrollingDown(currentTop) {
      if (currentTop > this.scrollNavigationOffset + this.scrollOffset) {
        this.navigation.classList.add(this.DOM.states.navigationSlideUp);
      } else if (currentTop > this.scrollNavigationOffset) {
        this.navigation.classList.remove(this.DOM.states.navigationSlideUp);
      }
    }

    //endregion
  }, {
    key: "mobileNavigation",
    value: function mobileNavigation() {
      var _this2 = this;
      this.navigationActive = false;
      this.navigationItems = document.querySelectorAll(this.DOM.navigationItem);
      this.hamburger.addEventListener("click", function () {
        if (!_this2.navigationActive) {
          _this2.openNavigation();
        } else {
          _this2.closeNavigation();
        }
      });
    }
  }, {
    key: "openNavigation",
    value: function openNavigation() {
      this.navigationActive = true;
      this.hamburger.classList.add(this.DOM.states.active);
      this.navigationList.classList.add(this.DOM.states.active);
      _gsap.gsap.fromTo(this.navigationItems, {
        autoAlpha: 0
      }, {
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.1
      });
    }
  }, {
    key: "closeNavigation",
    value: function closeNavigation() {
      this.navigationActive = false;
      this.hamburger.classList.remove(this.DOM.states.active);
      this.navigationList.classList.remove(this.DOM.states.active);
    }
  }]);
  return NavigationController;
}();
exports.default = NavigationController;

},{"gsap":"gsap","gsap/dist/ScrollTrigger":"gsap/dist/ScrollTrigger"}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _gsap = _interopRequireDefault(require("gsap"));
var _ScrollTrigger = _interopRequireDefault(require("gsap/dist/ScrollTrigger"));
var _ScrollSmoother = require("gsap/dist/ScrollSmoother");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
_gsap.default.registerPlugin(_ScrollTrigger.default, _ScrollSmoother.ScrollSmoother);
var SmoothScroll = /*#__PURE__*/function () {
  function SmoothScroll() {
    _classCallCheck(this, SmoothScroll);
    this.DOM = {};
  }
  _createClass(SmoothScroll, [{
    key: "init",
    value: function init() {
      var wrapper = document.querySelector("#smoothscroll-wrapper");
      var content = document.querySelector("#smoothscroll-content");
      if (!wrapper || !content) return;
      _ScrollTrigger.default.matchMedia({
        "(min-width: 901px)": function minWidth901px() {
          window.smoother = _ScrollSmoother.ScrollSmoother.create({
            wrapper: wrapper,
            content: content,
            smooth: 1,
            effects: true,
            normalizeScroll: true
          });
        }
      });
    }
  }]);
  return SmoothScroll;
}();
exports.default = SmoothScroll;

},{"gsap":"gsap","gsap/dist/ScrollSmoother":"gsap/dist/ScrollSmoother","gsap/dist/ScrollTrigger":"gsap/dist/ScrollTrigger"}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/**
 * Grid helper
 * Show grid overlay when developing
 * Not included in production bundle JS file
 */var GridHelper = /*#__PURE__*/function () {
  function GridHelper() {
    _classCallCheck(this, GridHelper);
    /**
     * Grid DOM selector
     * @type {{grid: string}}
     */
    this.DOM = {
      grid: "grid"
    };

    /**
     * Grid options
     * @type {{
     * gutterFixed: boolean,
     * initialDisplay: string,
     * gridFixed: boolean,
     * gutterWidth: number,
     * gridColor: string,
     * columnCount: number,
     * gridWidth: number,
     * columnBgColor: string
     * }}
     */
    this.gridOptions = {
      initialDisplay: "none",
      // "flex" or "none" — initial display for the grid — string
      columnCount: 24,
      // number of grid columns — integer
      gridWidth: 1440,
      // base grid used in design; value in px — integer
      gridFixed: false,
      // should grid width be restricted to gridWidth or it should go full width a nd behave fluidly across all screen sizes
      gutterWidth: 0,
      // grid gutters value in px — integer
      gutterFixed: false,
      // should grid gutter be a fixed value (px) or fluid — integer
      gridColor: "rgb(255, 0, 255, 0.15)",
      // grid guides color — string of an rgba or hex value
      columnBgColor: "rgb(255, 0, 255, 0.025)" // grid columns background color — string of an rgba or hex value
    };

    var consoleLogStyle = ["background-color: #a6a6a6", "color: black", "display: block", "line-height: 24px", "text-align: center", "border: 1px solid #ffffff", "font-weight: bold"].join(";");
    console.info("toggle grid: %c Alt/Option + G ", consoleLogStyle);
    this.grid = null;
    this.columnWidth = (this.gridOptions.gridWidth - (this.gridOptions.columnCount - 1) * this.gridOptions.gutterWidth) / this.gridOptions.columnCount;
    this.columnWidthPercentage = "".concat(this.columnWidth / this.gridOptions.gridWidth * 100, "%");
    this.gutterWidthPercentage = "".concat(this.gridOptions.gutterWidth / this.gridOptions.gridWidth * 100, "%");
  }
  _createClass(GridHelper, [{
    key: "init",
    value: function init() {
      console.log("GridHelper init()");
      this.initGrid();
      this.keyboardShortcut();
    }
  }, {
    key: "initGrid",
    value: function initGrid() {
      // create grid overlay element
      this.grid = document.createElement("div");
      this.grid.id = this.DOM.grid;

      // style grid element
      this.grid.style.cssText = "\n            pointer-events: none;\n            display: ".concat(this.gridOptions.initialDisplay, ";\n            flex-direction: row;\n            width: 100%;\n            height: 100%;\n            position: fixed;\n            top: 0;\n            left: 50%;\n            transform: translateX(-50%);\n            z-index: 999;\n        ");
      if (this.gridOptions.gridFixed === true) {
        this.grid.style.maxWidth = "".concat(this.gridOptions.gridWidth, "px");
      }
      if (!this.gridOptions.gutterWidth > 0) {
        this.grid.style.borderLeft = "none";
      }

      // add grid container to page
      document.body.appendChild(this.grid);

      // add columns to grid
      for (var i = 0; i < this.gridOptions.columnCount; i++) {
        var column = document.createElement("i");
        this.grid.appendChild(column);
        column.style.cssText = "\n                height: auto;\n                flex-grow: 1;\n                background-color: ".concat(this.gridOptions.columnBgColor, ";\n                border-left: 1px solid ").concat(this.gridOptions.gridColor, ";\n            ");
        if (this.gridOptions.gutterWidth > 0) {
          column.style.borderRight = "1px solid ".concat(this.gridOptions.gridColor);
        } else {
          this.grid.style.borderRight = "1px solid ".concat(this.gridOptions.gridColor);
        }
        if (this.gridOptions.gutterFixed === true) {
          column.style.marginRight = "".concat(this.gridOptions.gutterWidth, "px");
        } else {
          column.style.marginRight = this.gutterWidthPercentage;
          column.style.width = this.columnWidthPercentage;
        }
      }
      this.grid.lastChild.style.marginRight = 0;
    }
  }, {
    key: "keyboardShortcut",
    value: function keyboardShortcut() {
      var _this = this;
      document.addEventListener("keyup", function (ev) {
        if (ev.keyCode === 71 && ev.altKey) {
          if (_this.grid.style.display === "none") {
            _this.grid.style.display = "flex";
          } else {
            _this.grid.style.display = "none";
          }
        }
      });
    }
  }]);
  return GridHelper;
}();
exports.default = GridHelper;

},{}],14:[function(require,module,exports){
"use strict";

var _GridHelper = _interopRequireDefault(require("./helpers/GridHelper"));
var _Loader = _interopRequireDefault(require("./components/Loader"));
var _NavigationController = _interopRequireDefault(require("./components/NavigationController"));
var _Cursor = _interopRequireDefault(require("./components/Cursor"));
var _dSlider = _interopRequireDefault(require("./components/3dSlider"));
var _HeaderModel = _interopRequireDefault(require("./components/HeaderModel"));
var _ContactModel = _interopRequireDefault(require("./components/ContactModel"));
var _Marquee = _interopRequireDefault(require("./components/Marquee"));
var _FlickeringText = _interopRequireDefault(require("./components/FlickeringText"));
var _SmoothScroll = _interopRequireDefault(require("./components/SmoothScroll"));
var _bScrollTo = _interopRequireDefault(require("@bornfight/b-scroll-to"));
var _Flicker = _interopRequireDefault(require("./components/Flicker404"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MAIN JS FILE
 */

/**
 * Helpers
 * Imports of helper functions are stripped out of bundle
 * Include them within "start-strip-code" and "end-strip-code" comments
 */
/* start-strip-code */

/* end-strip-code */
/**
 * Components
 */

/**
 * Check if document is ready cross-browser
 * @param callback
 */
var ready = function ready(callback) {
  if (document.readyState !== "loading") {
    /**
     * Document is already ready, call the callback directly
     */
    callback();
  } else if (document.addEventListener) {
    /**
     * All modern browsers to register DOMContentLoaded
     */
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    /**
     * Old IE browsers
     */
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState === "complete") {
        callback();
      }
    });
  }
};

/**
 * Document ready callback
 */
ready(function () {
  /**
   * HELPERS INIT
   * Only init helpers if they exist
   * Will be undefined on production because of import stripping
   */
  if (typeof _GridHelper.default == "function") {
    var grid = new _GridHelper.default();
    grid.init();
  }
  var doc = document.documentElement;
  doc.style.setProperty("--win-height", "".concat(window.innerHeight, "px"));
  var afterLoader = new Event("afterLoader");

  /**
   * COMPONENTS INIT
   */

  /**
   * Loader
   * @type {Loader}
   */
  var loader = new _Loader.default(afterLoader);
  loader.init();

  /**
   * SmoothScroll
   * @type {SmoothScroll}
   */
  var smoothScroll = new _SmoothScroll.default();
  smoothScroll.init();

  /**
   * Navigation
   * @type {NavigationController}
   */
  var navigation = new _NavigationController.default();
  navigation.init();

  /**
   * ThreeDSlider
   * @type {ThreeDSlider}
   */
  var threeDSlider = new _dSlider.default();
  threeDSlider.init();

  /**
   * HeaderModel
   * @type {HeaderModel}
   */
  var headerModel = new _HeaderModel.default();
  headerModel.init();

  /**
   * ContactModel
   * @type {ContactModel}
   */
  var contactModel = new _ContactModel.default();
  contactModel.init();
  var marquee = new _Marquee.default();
  marquee.init();
  var flickeringText = new _FlickeringText.default();
  flickeringText.init();
  var flicker404 = new _Flicker.default();
  flicker404.init();
  setTimeout(function () {
    /**
     * Cursor
     * @type {Cursor}
     */
    var cursor = new _Cursor.default();
    cursor.init();
    new _bScrollTo.default();
  }, 500);
});

},{"./components/3dSlider":2,"./components/ContactModel":4,"./components/Cursor":5,"./components/Flicker404":6,"./components/FlickeringText":7,"./components/HeaderModel":8,"./components/Loader":9,"./components/Marquee":10,"./components/NavigationController":11,"./components/SmoothScroll":12,"./helpers/GridHelper":13,"@bornfight/b-scroll-to":"@bornfight/b-scroll-to"}]},{},[14])

//# sourceMappingURL=bundle.js.map
