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


// Skillset data
const LANGUAGE = [
    ["Python", 10],
    ["Javascript", 6],
    ["mySQL", 4]
];





// Configuration for the timeline
let options = {};

// Create a Timeline
let timeline = new vis.Timeline($container, items, options);

// Set width and height of svg bubble chart
let svgHeight = 500;
let svgWidth = 500;

// DOM element for skillset bubble chart
let svg = d3.select('#skillset-plot')
    .append('svg')
    .attr('height', svgHeight)
    .attr('width', svgWidth);

let radiusScale = d3.scaleSqrt()
    .domain([0, 10])
    .range([10, 50]);

let chartGroup = svg.append('g')
    .attr('transform', `translate(0, 0)`);

chartGroup.selectAll('circle')
    .data(LANGUAGE)
    .enter()
    .append('circle')
    .attr('r', data => {
        return data[1];
    })
    .attr("fill", `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`)
    .attr("cx", data => {
        return d.x
    })
    .attr("cy", data => {
        return d.y
    });








