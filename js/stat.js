'use strict';

var findMax = function (mass) {
  var maxItem = mass[0];
  for (var i = 1; i < mass.length; i++) {
    if (maxItem < mass[i]) {
      maxItem = mass[i];
    }
  }
  return maxItem;
};

var renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(messageRectX + shadowOffset, messageRectY + shadowOffset, messageWidth, messageHeight);
  ctx.fillStyle = 'white';
  ctx.fillRect(messageRectX, messageRectY, messageWidth, messageHeight);

  ctx.fillStyle = '#00F';
  ctx.font = '' + fontHeight + 'pt PT Mono';
  ctx.fillText('Ура вы победили!', messageTitleX, messageTitleY);
  ctx.fillText('Список результатов:', messageTitleX, messageTitleY + fontHeight);

  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(250, 0, 0, 1)'; //  намеренно не задаю изменение цвета для текста ников, хочу чтобы были в цвет гистограммы, а в задании это не регламентируется
    } else {
      histogramTransparency = Math.random();
      histogramTransparency = (histogramTransparency === 0) ? 1 : histogramTransparency;
      ctx.fillStyle = 'rgba(0, 0, 255, ' + histogramTransparency + ' )';
    }

    var bestTimes = findMax(times);
    var ratioHistogramLength = bestTimes / maxHistogramLength;
    histogramLength = Math.round(times[i] / ratioHistogramLength);
    ctx.fillRect(messageTitleX + i * (histogramWidth + distanceBetweenHistogram), histogramRectY + maxHistogramLength - histogramLength, histogramWidth, histogramLength);
    ctx.font = '' + fontHeight + 'pt PT Mono';
    ctx.fillText(names[i], messageTitleX + i * (histogramWidth + distanceBetweenHistogram), messageHeight);
    ctx.fillText(Math.round(times[i]), messageTitleX + i * (histogramWidth + distanceBetweenHistogram), messageHeight - messageRectY - maxHistogramLength - fontHeight);
  }
};

var messageRectX = 100;
var messageRectY = 10;
var shadowOffset = 10;
var messageWidth = 420;
var messageHeight = 270;
var messageTitleX = 130;
var messageTitleY = 50;
var fontHeight = 16;
var histogramLength;
var maxHistogramLength = 150;
var histogramWidth = 40;
var distanceBetweenHistogram = 50;
var histogramRectY = messageTitleY + fontHeight * 3.125;
var histogramTransparency = 1;
