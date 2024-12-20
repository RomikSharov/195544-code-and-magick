'use strict';
(function () {
  var messageRect = {
    top: 100,
    left: 10,
    width: 420,
    height: 270,
    shadow: 10,
    color: 'white'
  };

  var title = {
    top: messageRect.top + 30,
    left: messageRect.left + 40,
    text: '',
    font: 'pt PT Mono',
    color: '#00F',
    fontSize: 16
  };

  var bar = {
    width: 40,
    height: 150,
    indent: 50
  };

  window.renderStatistics = function (ctx, names, times) {
    window.utils.renderRect(ctx, {top: messageRect.top + messageRect.shadow, left: messageRect.left + messageRect.shadow, width: messageRect.width, height: messageRect.height, shadow: messageRect.shadow, color: 'rgba(0, 0, 0, 0.7)'});
    window.utils.renderRect(ctx, {top: messageRect.top, left: messageRect.left, width: messageRect.width, height: messageRect.height, shadow: messageRect.shadow, color: 'white'});

    window.utils.renderText(ctx, {top: title.top, left: title.left, text: 'Ура вы победили!', font: title.font, color: title.color, fontSize: title.fontSize});
    window.utils.renderText(ctx, {top: title.top, left: title.left + title.fontSize, text: 'Список результатов:', font: title.font, color: title.color, fontSize: title.fontSize});

    var bestTimes = Math.max.apply(null, times);
    var ratioHistogramLength = bestTimes / bar.height;
    var arrNamesLength = names.length;
    for (var i = 0; i < arrNamesLength; i++) {
      var histogramLength = Math.round(times[i] / ratioHistogramLength);
      window.utils.renderRect(ctx, {
        top: title.top + i * (bar.width + bar.indent),
        left: title.left + title.fontSize * 3.125 + bar.height - histogramLength,
        width: bar.width,
        height: histogramLength,
        color: (names[i].toLowerCase() !== 'вы') ? 'rgba(0, 0, 255, ' + (Math.random() + 0.1) + ' )' : 'rgba(250, 0, 0, 1)'
      });
      window.utils.renderText(ctx, {
        top: title.top + i * (bar.width + bar.indent),
        left: messageRect.height,
        text: names[i],
        font: title.font,
        color: title.color,
        fontSize: title.fontSize
      });
      window.utils.renderText(ctx, {
        top: title.top + i * (bar.width + bar.indent),
        left: messageRect.height - messageRect.left - bar.height - title.fontSize,
        text: Math.round(times[i]),
        font: title.font,
        color: title.color,
        fontSize: title.fontSize
      });
    }
  };
})();
