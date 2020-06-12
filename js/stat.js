'use strict';

var cloud = {
  X: 100,
  Y: 10,
  WIDTH: 420,
  HEIGHT: 270,
  SHADOW_GAP: 10,
  GAP: 20,
  COLOR: '#fff',
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)'
};

var textStyle = {
  FONT_SIZE: 16,
  FONT_FAMILY: 'PT Mono',
  COLOR: '#000',
  GAP: 4
};

var bar = {
  WIDTH: 40,
  MAX_HEIGHT: 150,
  HORIZONTAL_GAP: 50,
  VERTICAL_GAP: 18
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloud.WIDTH, cloud.HEIGHT);
};

var renderText = function (ctx, style, x, y, text, baseline) {
  ctx.font = style.FONT_SIZE + 'px ' + style.FONT_FAMILY;
  ctx.textBaseline = 'hanging';
  if (baseline) {
    ctx.textBaseline = baseline;
  }
  ctx.fillStyle = style.COLOR;
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};


window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, cloud.X + cloud.SHADOW_GAP, cloud.Y + cloud.SHADOW_GAP, cloud.SHADOW_COLOR);
  renderCloud(ctx, cloud.X, cloud.Y, cloud.COLOR);

  var initialX = cloud.X + cloud.GAP;
  var initialY = cloud.Y + cloud.GAP;
  renderText(ctx, textStyle, initialX, initialY, 'Ура вы победили!');
  renderText(ctx, textStyle, initialX, initialY + textStyle.FONT_SIZE + textStyle.GAP, 'Список результатов:');

  var maxTime = getMaxElement(times);
  var histogramX = cloud.X + bar.HORIZONTAL_GAP;
  var histogramY = cloud.Y + cloud.HEIGHT - bar.VERTICAL_GAP;
  var itemX;
  var itemY = histogramY - textStyle.FONT_SIZE - textStyle.GAP;
  var currentBarHeight;

  for (var i = 0; i < names.length; i++) {
    itemX = histogramX + (bar.WIDTH + bar.HORIZONTAL_GAP) * i;
    currentBarHeight = bar.MAX_HEIGHT * Math.round(times[i]) / maxTime;

    renderText(ctx, textStyle, itemX, histogramY + textStyle.GAP, names[i], 'bottom');
    renderText(ctx, textStyle, itemX, itemY - textStyle.GAP - currentBarHeight, Math.round(times[i]), 'bottom');

    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + Math.random() * 100 + '%, 50%)';
    ctx.fillRect(itemX, itemY, bar.WIDTH, -currentBarHeight);
  }
};
