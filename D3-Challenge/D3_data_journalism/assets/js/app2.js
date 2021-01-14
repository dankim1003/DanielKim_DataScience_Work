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
var chosenYAxis = "healthcare";

function xScale(data, chosenXAxis){
    // create scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d=> d[chosenXAxis]) * 0.8,
             d3.max(data, d=>d[chosenXAxis]) *1.1])
        .range([0, width]);

    return xLinearScale;
}

function yScale(data, chosenYAxis){
    // create scales
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d=>d[chosenYAxis]) *1.1])
        .range([height, 0]);

    return yLinearScale;
}

function renderAxes(newXScale, xAxis){
    var bottomAxis = d3.axisBottom(newXScale);
    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}

function renderCircles(circlesGroup, newXScale, chosenXAxis){
    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d=> newXScale(d[chosenXAxis]));
    return circlesGroup;
}

function updateToolTip(chosenXAxis, circlesGroup){
    var label;

    if(chosenXAxis === "poverty"){
        label = "Poverty (%)";
    }
    else if(chosenXAxis ==="age"){
        label = "Age(Median)";
    }
    else if (chosenXAxis ==="income"){
        label="Household Income(Median)";
    }
    // var toolTip = d3.tip()
    //     .attr("class", "tooltip")
    //     .offset([80, -60])
    //     .html(function(d){
    //         return (`${d.poverty}<br>${label} ${d[chosenXAxis]}`);
    //     });

    // circlesGroup.call(toolTip);

    // circlesGroup.on("mouseover", function(data){
    //     toolTip.show(data);
    // })

    // //onmouseout event
    // .on("mouseout", function(data, index){
    //     toolTip.hide(data);
    // });

    return circlesGroup;
}

//import Data and parse Data
d3.csv("assets/data/data.csv").then(function(aData){
    aData.forEach(function(data){
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
        data.smokes = +data.smokes;
        data.age = +data.age;

    });

    //Create Scale
    var xLinearScale = xScale(aData, chosenXAxis);
    var yLinearScale = yScale(aData, chosenYAxis);

    //Create Axis
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    

    //Append Axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0,${height})`)
        .call(bottomAxis);
    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        .call(leftAxis);

    // chartGroup.append("g")
    //     .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
        .data(aData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("r", 20)
        .attr("fill", "lightblue")
        .attr("opacity", ".60");

    var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var yLabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var povertyLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 10)
        .attr("value", "poverty")
        .classed("active", true)
        .text("Poverty Rate(%)");

    var ageLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "age")
        .classed("inactive", true)
        .text("Age(Median)");
      
    var householdLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "income")
        .classed("inactive", true)
        .text("Household Income(Median)");

    //yAxis
    var healthcareLabel = yLabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 100)
        .attr("value", "healthcare")
        .classed("active", true)
        .text("Healthcare number");

    var smokesLabel = yLabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "smokes")
        .classed("inactive", true)
        .text("Smokes(%)");

    var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);




    // var toolTip = d3
    //     .tip()
    //     .attr("class", "tooltip")
    //     .offset([80, -60])
    //     .html(function(data){
    //         var stateName = data.state;
    //         var pov = +data.poverty;
    //         var income = +data.income;
    //         return(
    //             stateName + "<br> Poverty " + pov + "% <br> Median Income :$" + income  
    //         );
    //     })
    // chartGroup.call(toolTip);
 
    // //Append Circle
    // chartGroup.selectAll("circle")
    //     .data(aData)
    //     .enter()
    //     .append("circle")
    //     .attr("cx", function(d) {
    //         return xLinearScale1(d[chosenXAxis]);
    //         })
    //     .attr("cy", function(d){
    //         return yLinearScale1(d[chosenYAxis]);
    //         })
    //     .attr("r", 9)
    //     .attr("fill", "lightblue")
    //     .attr("opacity", "0.35")
    //     .on("click", function(data){
    //         toolTip.show(data, this);
    //     })
    //     .on("mouseout", function(data, index){
    //         toolTip.hide(data);
    //     });
    


        // Create group for two x-axis labels
   
    

    labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

      
        chosenXAxis = value;
        xLinearScale = xScale(aData, chosenXAxis);
        xAxis = renderAxes(xLinearScale, xAxis);
        yAxis = renderAxes(yLinearScale, yAxis);

        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
        if (chosenXAxis === "poverty") {
            povertyLabel
                .classed("active", true)
                .classed("inactive", false);
            ageLabel
                .classed("active", false)
                .classed("inactive", true);
            householdLabel
                .classed("active", false)
                .classed("inactive", true);
        }
        else if (chosenXAxis === "age") {
        
            povertyLabel
             .classed("active", false)
             .classed("inactive", true);
            ageLabel
             .classed("active", true)
             .classed("inactive", false);
            householdLabel
             .classed("active", false)
             .classed("inactive", true);
        }

        else if (chosenXAxis === "income"){
            povertyLabel
             .classed("active", false)
             .classed("inactive", true);
            ageLabel
             .classed("active", false)
             .classed("inactive", false);
            householdLabel
             .classed("active", true)
             .classed("inactive", false);
        }
      }
    //   yLabelsGroup.selectAll("text")
    //   .on("click", function() {
    //     // get value of selection
    //     var value = d3.select(this).attr("value");
    //     if (value !== chosenYAxis) {
  
        
    //       chosenXAxis = value;
    //       yLinearScale = xScale(aData, chosenYAxis);
    //       xAxis = renderAxes(xLinearScale, xAxis);
    //       yAxis = renderAxes(yLinearScale, yAxis);
  
    //       circlesGroup = renderCircles(circlesGroup, yLinearScale, chosenYxis);
    //       circlesGroup = updateToolTip(chosenYAxis, circlesGroup);
    //       if (chosenYAxis === "healthcare") {
    //             healthcareLabel
    //               .classed("active", true)
    //               .classed("inactive", false);
    //             smokesLabel
    //               .classed("active", false)
    //               .classed("inactive", true);
    //       }
    //       else if (chosenYAxis === "smokes") {
    //         healthcareLabel
    //           .classed("active", false)
    //           .classed("inactive", true);
    //         smokesLabel
    //           .classed("active", true)
    //           .classed("inactive", false);
    //         }
    //     }
  
    });            
    
}).catch(function(error){
    console.log(error);
});
