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

var KnightBoard = {
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

var GraphKing = {
  createNew: function(svg, w, h, graph_king) {
    var force = d3.layout.force()
      .nodes(graph_king.nodes)
      .links(graph_king.edges)
      .size([w, h])
      .linkDistance([w / 8])
      .charge([-1000])
      .start();

    var edges = svg.selectAll("line")
      .data(graph_king.edges)
      .enter()
      .append("line")
      .style("stroke", "#ccc")
      .style("stroke-width", 1);

    var nodes = svg.selectAll("circle")
      .data(graph_king.nodes)
      .enter()
      .append("circle")
      .attr("r", 16)
      .style("fill", function(d) {return d.color; })
      .call(force.drag);

    var nodes2 = svg.selectAll("text")
      .data(graph_king.nodes)
      .enter()
      .append("text")
      .text(function(d) { return d.name; })
      .style("text-anchor", "middle")
      .style("fill", "black")
      .style("font-size", "32px")
      .call(force.drag);

    force.on("tick", function() {
      edges.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

    nodes.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
    nodes2.attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; });
    });
  }
}

