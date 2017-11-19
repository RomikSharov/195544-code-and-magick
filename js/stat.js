var findMax = function (mass){
  var maxItem = mass[0];
  for (let index = 0; index < mass.length; index++) {
    if (maxItem<mass[index]){
      maxItem=mass[index];
    }
  }
  return maxItem;
}

var renderStatistics = function(ctx, names, times) {
  var messageRectX = 100;
  var messageRectY = 10;
  var shadowOffset = 10;
  var messageWidth =420;
  var messageHeight =270;

  ctx.fillStyle ='rgba(0, 0, 0, 0.7)';
  ctx.fillRect(messageRectX+shadowOffset, messageRectY+shadowOffset, messageWidth, messageHeight);
  ctx.fillStyle = 'white';
  ctx.fillRect(messageRectX, messageRectY, messageWidth, messageHeight);

  var messageTitleX = 130;
  var messageTitleY = 50;
  var fontHeight = 16;
  ctx.fillStyle = '#00F';
  ctx.font = '' + fontHeight+'pt PT Mono';
  ctx.fillText('Ура вы победили!', messageTitleX, messageTitleY);
  ctx.fillText('Список результатов:', messageTitleX, messageTitleY+fontHeight);

  var bestTimes=findMax(times);
  var histogramLength;
  var maxHistogramLength = 150;
  var ratioHistogramLength = bestTimes/maxHistogramLength;
  var histogramWidth = 40;
  var distanceBetweenHistogram = 50;
  var histogramRectY = messageTitleY+fontHeight*3.125;
  var histogramTransparency = 1;

  for (var i=0; i<names.length; i++) {
    console.log(names[i]);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(250, 0, 0, 1)';   //намеренно не задаю изменение цвета для текста ников, хочу чтобы были в цвет гистограммы, а в задании это не регламентируется
    } else {
      histogramTransparency =  Math.random();
      histogramTransparency = (histogramTransparency===0)?1:histogramTransparency;
      ctx.fillStyle = 'rgba(0, 0, 255, ' + histogramTransparency+' )';
    }

    histogramLength = Math.round(times[i]/ratioHistogramLength);                    //100
    ctx.fillRect(messageTitleX+i*(histogramWidth+distanceBetweenHistogram), histogramRectY+maxHistogramLength-histogramLength, histogramWidth, histogramLength);
    ctx.font = '16pt PT Mono';
    ctx.fillText(names[i], messageTitleX+i*(histogramWidth+distanceBetweenHistogram), messageHeight);
    ctx.fillText(Math.round(times[i]), messageTitleX+i*(histogramWidth+distanceBetweenHistogram), messageHeight-messageRectY-maxHistogramLength-fontHeight);
  }
}
