var MagicBoard = {
  createNew: function (paper, x, y, width, height, elem) {
    var board = {};
    var w = width / 4;
    var h = height / 2;

    for (var i = 0; i < 4; i++) {
      x0 = i * w + x;
      y0 = 0 + y;
      paper.rect(x0, y0, w, h);
      var t = paper.text(x0 + w / 2, y0 + h / 2, elem[i]);
      t.attr("text-anchor", 'middle').attr('font-size', h * 0.9);

      y0 += h;
      paper.rect(x0, y0, w, h);
      var t = paper.text(x0 + w / 2, y0 + h / 2, elem[i + 4]);
      t.attr("text-anchor", 'middle').attr('font-size', h * 0.9);
    };
    paper.rect(x, y, width, height);
  }
}
