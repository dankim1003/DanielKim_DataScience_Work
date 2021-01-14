// @TODO: YOUR CODE HERE!
var svgWidth = 650;
var svgHeight = 500;

var margin = {
    top : 20,
    right : 50,
    bottom : 60,
    left : 50
}

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.bottom - margin.top;


//Create an SVG wrapper, append and SVG group that will hold chart
var svg =d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);


var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Initial Params
var chosenXAxis = "poverty";



//import Data and parse Data
d3.csv("assets/data/data.csv").then(function(aData){
    aData.forEach(function(data){
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
        data.smokes = +data.smokes;
        data.age = +data.age;

    });

    //Create Scale
    var xLinearScale1 = d3.scaleLinear()
        .domain([d3.min(aData, d=>d.poverty * 0.8),
            d3.max(aData, d=> d.poverty) * 1.1])
        .range([0,width]);

    var xLinearScale2 = d3.scaleLinear()
        .domain([d3.min(aData, d=>d.age) *0.8,
            d3.max(aData, d=> d.age) * 1.1])
        .range([0,width]);

    var yLinearScale1 = d3.scaleLinear()
        .domain([0,d3.max(aData, d=>d.healthcare) * 1.1])
        .range([height,0]);

    var yLinearScale2 = d3.scaleLinear()
        .domain([0,d3.max(aData, d=>d.smokes) * 1.1])
        .range([height,0]);

    //Create Axis
    var bottomAxis1 = d3.axisBottom(xLinearScale1);
    var leftAxis1 = d3.axisLeft(yLinearScale1);

    var bottomAxis2 = d3.axisBottom(xLinearScale2);
    var leftAxis2 = d3.axisLeft(yLinearScale2);
    

    //Append Axis
    chartGroup.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(bottomAxis1);

    chartGroup.append("g")
        .call(leftAxis1);

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left )
        .attr("x", 0 - (height - 150 ))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare(%)")

    chartGroup.append("text")
        .attr("transform", `translate(${width - 300}, ${height + margin.top + 15 })`)
        .attr("class", "axisText")
        .text("In Poverty(%)")
    

    //Append text on circle
    chartGroup.append("text")
        .style("font-size", "10px")
        .selectAll("tspan")
        .data(aData)
        .enter()
        .append("tspan")
            .attr("x", d=> xLinearScale1(d.poverty - 0.2))
            .attr("y", d=> yLinearScale1(d.healthcare-0.2))
            .text(d=>d.abbr)
    
    


    var toolTip = d3
        .tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(data){
            var stateName = data.state;
            var pov = +data.poverty;
            var income = +data.income;
            return(
                stateName + "<br> Poverty " + pov + "% <br> Median Income :$" + income  
            );
        })
    chartGroup.call(toolTip);
 
    //Append Circle
    chartGroup.selectAll("circle")
        .data(aData)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return xLinearScale1(d.poverty);
            })
        .attr("cy", function(d){
            return yLinearScale1(d.healthcare);
            })
        .attr("r", 9)
        .attr("fill", "lightblue")
        .attr("opacity", "0.35")
        .on("click", function(data){
            toolTip.show(data, this);
        })
        .on("mouseout", function(data, index){
            toolTip.hide(data);
        });


                
    
        

}).catch(function(error){
    console.log(error);
});
