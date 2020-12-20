// from data.js

// Level 1 : Automatic Table and Date Search -------------------------------------------------------------------

// Declare Variable 
// var tableData = data;
// var tbody = d3.select("tbody");
// var form = d3.select("#form");
// var button = d3.select("#button");
// button.on("click", runEnter);
// form.on("submit",runEnter);

// Declare enter function
// function runEnter(){
//     d3.event.preventDefault();
//     var form = d3.select("#datetime");
//     var inputValue = form.property("value");
//     var filteredData = tableData.filter(a => a.datetime === inputValue);
    
//     var list = d3.select("#ufo-table");
// Append tr & td and put cell text based on date search
//     filteredData.forEach(function(a){
//         var row = tbody.append("tr");
//         Object.entries(a).forEach(function([key, value]){
//             var cell = row.append("td");
           
//             cell.text(value);
//         });
//     });
// }



// Level 2 ----------------------------------------------------------------

var tableData = data;
var tbody = d3.select("tbody");
var form = d3.select("#form");
var button = d3.select("#button");
var dropdownMenu = d3.select("#selDataset");



button.on("click", runEnter);
form.on("submit",runEnter);



d3.selectAll("#selDataset").on("change", function(){
    var dataset = dropdownMenu.property("value");
    if (dataset === "dataset1"){
        document.getElementById("datetime").placeholder = "ex) 1/11/2011";
    }
    if (dataset === "dataset2"){
        document.getElementById("datetime").placeholder = "ex) Benton";
    }
    if (dataset === "dataset3"){
        document.getElementById("datetime").placeholder = "ex) US";
    }
    if (dataset === "dataset4"){
        document.getElementById("datetime").placeholder = "ex) CA";
    }
    if (dataset === "dataset5"){
        document.getElementById("datetime").placeholder = "ex) Circle";
    }
   
});


//Enter function 
function runEnter(){

    //Declare variable 
    d3.event.preventDefault();
    var form = d3.select("#datetime");
    var inputValue = form.property("value");
    var dataset = dropdownMenu.property("value");
    
    // data search by date/city/state/shape/country

    if (dataset === "dataset1"){
        //reset tobody as "" (blank)
        tbody.html("");
        var filteredData = tableData.filter(a => a.datetime === inputValue);
        
        filteredData.forEach(function(a){
        var row = tbody.append("tr");
        Object.entries(a).forEach(function([key, value]){
            var cell = row.append("td");
           
            cell.text(value);
            
        });
    });
    }

    if (dataset === "dataset2"){
        tbody.html("");
        var filteredData = tableData.filter(a => a.city === inputValue);
        filteredData.forEach(function(a){
        var row = tbody.append("tr");
        Object.entries(a).forEach(function([key, value]){
            var cell = row.append("td");
           
            cell.text(value);
        });
    });
    }

    if (dataset === "dataset3"){
        tbody.html("");
        var filteredData = tableData.filter(a => a.country === inputValue);
        filteredData.forEach(function(a){
        var row = tbody.append("tr");
        Object.entries(a).forEach(function([key, value]){
            var cell = row.append("td");
           
            cell.text(value);
        });
    });
    }
    if (dataset === "dataset4"){
        tbody.html("");
        var filteredData = tableData.filter(a => a.state === inputValue);
        filteredData.forEach(function(a){
        var row = tbody.append("tr");
        Object.entries(a).forEach(function([key, value]){
            var cell = row.append("td");
           
            cell.text(value);
        });
    });
    }
    if (dataset === "dataset5"){
        tbody.html("");
        var filteredData = tableData.filter(a => a.shape === inputValue);
        filteredData.forEach(function(a){
        var row = tbody.append("tr");
        Object.entries(a).forEach(function([key, value]){
            var cell = row.append("td");
           
            cell.text(value);
        });
    });
    }
};


