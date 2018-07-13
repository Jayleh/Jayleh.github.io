let width = 600,
    height = 600;

let nodes = d3.range(50).map(function () { return { radius: Math.random() * 12 + 4 }; }),
    root = nodes[0],
    color = d3.scale.quantize().domain([1, 50])
        .range(["#97a675", '#eff2d8', '#d6ead4', '#81b0b2', '#00738c']);

root.radius = 0;
root.fixed = true;

let force = d3.layout.force()
    .gravity(0.05)
    .charge(function (d, i) { return i ? 0 : -1000; })
    .nodes(nodes)
    .size([width, height]);

force.start();

let svg = d3.select("#collision").append("svg")
    .attr("width", width)
    .attr("height", height);
// .attr("class", "justify-content-center");

svg.selectAll("circle")
    .data(nodes.slice(1))
    .enter().append("circle")
    .attr("r", function (d) { return d.radius; })
    .style("fill", function (d, i) { return color(i); });

force.on("tick", function (e) {
    let q = d3.geom.quadtree(nodes),
        i = 0,
        n = nodes.length;

    while (++i < n) q.visit(collide(nodes[i]));

    svg.selectAll("circle")
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; });
});

svg.on("mousemove", function () {
    let p1 = d3.mouse(this);
    root.px = p1[0];
    root.py = p1[1];
    force.resume();
});

function collide(node) {
    let r = node.radius + 16,
        nx1 = node.x - r,
        nx2 = node.x + r,
        ny1 = node.y - r,
        ny2 = node.y + r;
    return function (quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== node)) {
            let x = node.x - quad.point.x,
                y = node.y - quad.point.y,
                l = Math.sqrt(x * x + y * y),
                r = node.radius + quad.point.radius;
            if (l < r) {
                l = (l - r) / l * 0.5;
                node.x -= x *= l;
                node.y -= y *= l;
                quad.point.x += x;
                quad.point.y += y;
            }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    };
}