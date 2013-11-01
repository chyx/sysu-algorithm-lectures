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

var BishopBoard = {
  createNew: function (svg, w, h) {
    var ldata = Array();
    for(var i = 0; i < 8; ++i) {
      ldata.push([h / 8 * i + h / 16, 0]);
      ldata.push([h / 8 * i + h / 16, 1]);
    }

    // build the arrow.
    svg.append("svg:defs").selectAll("marker")
      .data(["end"])      // Different link/path types can be defined here
      .enter().append("svg:marker")    // This section adds in the arrows
      .attr("id", String)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", -1.5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5");

    rdata = Array();
    for (var i = -2; i <= 2; ++i) {
      for (var j = -2; j <= 2; ++j) {
        if (Math.abs(i) + Math.abs(j) == 3) {
          rdata.push([w / 2, h / 2, w / 2 + w / 8 * i, h / 2 + h / 8 * j])
        }
      }
    }

    // The board
    svg.append("g").attr('id', 'board').selectAll("line").data(ldata).enter()
      .insert("line")
      .attr('x1', function(d) {
        if (d[1] == 0) {
          return 0;
        } else {
          return d[0];
        }
      })
    .attr('y1', function(d) {
      if (d[1] == 0) {
        return d[0];
      } else {
        return 0;
      }
    })
    .attr('x2', function(d) {
      if (d[1] == 0) {
        return w;
      } else {
        return d[0];
      }

    })
    .attr('y2', function(d) {
      if (d[1] == 0) {
        return d[0];
      } else {
        return h;
      }
    })
    .attr('style', "stroke:66ccff");

    svg.append("g").attr('id', 'way').selectAll("line").data(rdata)
      .enter()
      .append("line")
      .attr("x1", function(d) { return d[0]; })
      .attr("y1", function(d) { return d[1]; })
      .attr("x2", function(d) { return d[2]; })
      .attr("y2", function(d) { return d[3]; })
      .attr("marker-end", "url(#end)")
      .attr('style', "stroke:black");
  }
}
