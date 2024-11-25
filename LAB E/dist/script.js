/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


var appState = {
  currentStyle: "page1",
  availableStyles: {
    page1: "css/page1.css",
    page2: "css/page2.css",
    page3: "css/page3.css"
  }
};
function changeStyle(styleName) {
  var head = document.querySelector("head");
  var existingLink = document.getElementById("theme-stylesheet");
  if (existingLink) {
    head === null || head === void 0 ? void 0 : head.removeChild(existingLink);
  }
  var newLink = document.createElement("link");
  newLink.id = "theme-stylesheet";
  newLink.rel = "stylesheet";
  newLink.href = appState.availableStyles[styleName];
  head === null || head === void 0 ? void 0 : head.appendChild(newLink);
  appState.currentStyle = styleName;
}
function initializeStyleLinks() {
  var container = document.getElementById("style-links");
  if (container) {
    container.innerHTML = "";
    var _loop = function _loop(styleName) {
      var link = document.createElement("a");
      link.href = "#";
      link.textContent = "Zmie\u0144 na ".concat(styleName, " ");
      link.addEventListener("click", function (e) {
        e.preventDefault();
        changeStyle(styleName);
      });
      container.appendChild(link);
    };
    for (var styleName in appState.availableStyles) {
      _loop(styleName);
    }
  }
}
document.addEventListener("DOMContentLoaded", function () {
  initializeStyleLinks();
  changeStyle(appState.currentStyle);
});
/******/ })()
;