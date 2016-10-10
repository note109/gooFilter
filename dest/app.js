"use strict";

var isDragging = false;
var $dom = void 0;
var offsetX = void 0;
var offsetY = void 0;

var GLOBAL_VARS = {
  opacity: 1.0
};

$(function () {

  $(".circle").on("mousedown touchstart", function (e) {
    isDragging = true;
    $dom = $(e.target);
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });

  $(".wrapper").on("mousemove", function (e) {
    if (isDragging && $dom) {
      (function () {
        var x = e.clientX - offsetX;
        var y = e.clientY - offsetY;
        requestAnimationFrame(function () {
          $dom.css({
            top: y + "px",
            left: x + "px"
          });

          var id = $dom.attr("id");
          $("#" + id + "0").css({
            top: y + 200 + "px",
            left: x + "px"
          });
          $("#" + id + "00").css({
            top: y + 200 * 2 + "px",
            left: x + "px"
          });
        });
      })();
    }
  });

  $(".wrapper").on("mouseup touchend", function () {
    isDragging = false;
    $dom = null;
  });

  var gui = new dat.GUI();
  gui.add(GLOBAL_VARS, "opacity", 0, 1.0).step(0.01).onChange(function (val) {
    $(".circle").css({
      opacity: val
    });
  });
});