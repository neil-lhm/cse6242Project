<script src="../Recommender/Scripts/d3.v3.min.js">
</script>

<script>
// get the data
links = [
  {
    "source": "Harry",
    "target": "Sally",
    "value": 1.2
  },
  {
    "source": "Harry",
    "target": "Mario",
    "value": 1.3
  },
  {
    "source": "Sarah",
    "target": "Alice",
    "value": 0.2
  },
  {
    "source": "Eveie",
    "target": "Alice",
    "value": 0.5
  },
  {
    "source": "Peter",
    "target": "Alice",
    "value": 1.6
  },
  {
    "source": "Mario",
    "target": "Alice",
    "value": 0.4
  },
  {
    "source": "James",
    "target": "Alice",
    "value": 0.6
  },
  {
    "source": "Harry",
    "target": "Carol",
    "value": 0.7
  },
  {
    "source": "Harry",
    "target": "Nicky",
    "value": 0.8
  },
  {
    "source": "Bobby",
    "target": "Frank",
    "value": 0.8
  },
  {
    "source": "Alice",
    "target": "Mario",
    "value": 0.7
  },
  {
    "source": "Harry",
    "target": "Lynne",
    "value": 0.5
  },
  {
    "source": "Sarah",
    "target": "James",
    "value": 1.9
  },
  {
    "source": "Roger",
    "target": "James",
    "value": 1.1
  },
  {
    "source": "Maddy",
    "target": "James",
    "value": 0.3
  },
  {
    "source": "Sonny",
    "target": "Roger",
    "value": 0.5
  },
  {
    "source": "James",
    "target": "Roger",
    "value": 1.5
  },
  {
    "source": "Alice",
    "target": "Peter",
    "value": 1.1
  },
  {
    "source": "Johan",
    "target": "Peter",
    "value": 1.6
  },
  {
    "source": "Alice",
    "target": "Eveie",
    "value": 0.5
  },
  {
    "source": "Harry",
    "target": "Eveie",
    "value": 0.1
  },
  {
    "source": "Eveie",
    "target": "Harry",
    "value": 2
  },
  {
    "source": "Henry",
    "target": "Mikey",
    "value": 0.4
  },
  {
    "source": "Elric",
    "target": "Mikey",
    "value": 0.6
  },
  {
    "source": "James",
    "target": "Sarah",
    "value": 1.5
  },
  {
    "source": "Alice",
    "target": "Sarah",
    "value": 0.6
  },
  {
    "source": "James",
    "target": "Maddy",
    "value": 0.5
  },
  {
    "source": "Peter",
    "target": "Johan",
    "value": 0.7
  }
];

var nodes = {};

// Compute the distinct nodes from the links.
links.forEach(function(link) {
    link.source = nodes[link.source] ||
        (nodes[link.source] = {name: link.source});
    link.target = nodes[link.target] ||
        (nodes[link.target] = {name: link.target});
});


var width = 960,
    height = 500,
    color = d3.scale.category20c();


var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .linkDistance(60)
    .charge(-300)
    .on("tick", tick)
    .start();

// Set the range
var  v = d3.scale.linear().range([0, 100]);

// Scale the range of the data
v.domain([0, d3.max(links, function(d) { return d.value; })]);


var svg = d3.select("#graph").append("svg")
    .attr("width", width)
    .attr("height", height);

// build the arrow.
svg.append("svg:defs").selectAll("marker")
    .data(["end"])    // Different link/path types can be defined here
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

// add the links and the arrows
var path = svg.append("svg:g").selectAll("path")
    .data(force.links())
  .enter().append("svg:path")
    .style("stroke", function(d) {if (d.value < 1.5) {return "green";} else {return "blue";}})
    .attr("class", function(d) { return "link " + d.type; });

// define the nodes
var node = svg.selectAll(".node")
    .data(force.nodes())
  .enter().append("g")
    .attr("class", "node")
    .call(force.drag);

// add the nodes
node.append("circle")
    .attr("r", function(n) {return 3 * Math.sqrt(n.weight);})
    .on("dblclick", dblclick)

node.append("text")
    .attr("dx",10)
    .text(function(n) {return n.name;});

// add the curvy lines
function tick() {
    path.attr("d", function(d) {
        var dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr = Math.sqrt(dx * dx + dy * dy);
        return "M" +
            d.source.x + "," +
            d.source.y + "A" +
            dr + "," + dr + " 0 0,1 " +
            d.target.x + "," +
            d.target.y;
    });

    node
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")"; });
};

function dblclick(d) {
    if (d.fixed != true) {
        d3.select(this).classed("fixed", d.fixed = true);
    } else {
        d3.select(this).classed("fixed", d.fixed = false);
    }
}

</script>