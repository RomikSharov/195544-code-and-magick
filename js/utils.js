'use strict';
(function () {
  window.utils = {
    //  function getRandomNumber(min, max) {
    RED: 'red',
    getRandomNumber: function (min, max) {
      var rand = min + Math.floor(Math.random() * (max - min + 1));
      return rand;
    },
    getRandValue: function (arr, counter) {
      var index = window.utils.getRandomNumber(counter.start, counter.end);
      var tmp = arr[index];
      arr[index] = arr[0];
      arr[0] = tmp;
      return tmp;
    },
    renderRect: function (ctx, rect) {
      ctx.fillStyle = rect.color;
      ctx.fillRect(rect.top, rect.left, rect.width, rect.height);
    },
    renderText: function (ctx, titleOptions) {
      ctx.fillStyle = titleOptions.color;
      ctx.font = '' + titleOptions.fontSize + titleOptions.font;
      ctx.fillText(titleOptions.text, titleOptions.top, titleOptions.left);
    }
  };
})();
