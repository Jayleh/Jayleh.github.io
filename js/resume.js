// DOM element for timeline
let $container = document.getElementById('timeline');

// Timeline items styles
let educationStyle = "color:white;background-color: #003366;border:0px;";
let workStyle = "color:white;background-color: #0099CC;border:0px;";

// Create a DataSet (allows two way data-binding)
let items = new vis.DataSet([
    { id: 1, content: 'BS in Biological Sciences, Cal Poly SLO', start: '2009-09-28', end: '2013-06-15', style: educationStyle },
    { id: 2, content: 'TEFL Certification', start: '2015-08-10', style: educationStyle },
    { id: 3, content: 'English Teacher, English Program in Korea (EPIK)', start: '2015-02-20', end: '2017-03-01', style: workStyle },
    { id: 4, content: 'Inventory Specialis|Data Analyst, Cellese Regenerative Therapeutics', start: '2017-12-19', style: workStyle },
    { id: 5, content: 'UCI Data Analytics & Visulization', start: '2018-01-18', style: educationStyle }
]);

// Configuration for the timeline
let options = {};

// Create a Timeline
let timeline = new vis.Timeline($container, items, options);


// Force skillset diagram
(function () {
    // Set width and height of svg bubble chart
    let svgHeight = 500,
        svgWidth = 500;

    // DOM element for skillset bubble chart
    let svg = d3.select('#skillset-plot')
        .append('svg')
        .attr('height', svgHeight)
        .attr('width', svgWidth);

    let chartGroup = svg.append('g')
        .attr('transform', `translate(0, 0)`);

    let radiusScale = d3.scaleSqrt()
        .domain([4, 10])
        .range([40, 60]);

    // Simulation is a collection of forces about where we want our
    // circles to go and how we want our circles to interact
    // First, get them to the middle, then don't have them collide
    let simulation = d3.forceSimulation()
        .force('x', d3.forceX(svgWidth / 2).strength(0.05))
        .force('y', d3.forceY(svgWidth / 2).strength(0.05))
        .force('collide', d3.forceCollide(d => radiusScale(d.level + 0.1)));

    // Grab skillset data json
    d3.queue()
        .defer(d3.json, "../js/data/skillset.json")
        .await(ready); // calls the ready function

    function ready(error, datapoints) {
        if (error) throw error;

        console.log(datapoints[0]);

        let python = datapoints[0];
        let frontend = datapoints[1];
        let other = datapoints[2];

        // Create circle group
        let circles = chartGroup.append('g')
            .selectAll('circle')
            .data(python)
            .enter()
            .append('circle')
            // .attr('r', data => data.level * 3)
            .attr('r', d => radiusScale(d.level))
            .attr("fill", `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`);

        // Create text
        let text = chartGroup.append('g')
            .selectAll("text")
            .data(python)
            .enter()
            .append("text")
            .classed('text', true)
            .text(d => d.name)
            .style('font-size', 14)
            .attr("text-anchor", "middle")
            .attr("fill", "white");

        simulation.nodes(python)
            .on('tick', ticked);

        function ticked() {
            circles
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);

            text
                .attr('x', d => d.x)
                .attr('y', d => d.y);
        }
    }

})(); // Initialize function on load
















