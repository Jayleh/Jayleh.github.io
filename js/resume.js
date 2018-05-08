// DOM element where the Timeline will be attached
let container = document.getElementById('timeline');

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

// Configuration for the Timeline
let options = {};

// Create a Timeline
let timeline = new vis.Timeline(container, items, options);