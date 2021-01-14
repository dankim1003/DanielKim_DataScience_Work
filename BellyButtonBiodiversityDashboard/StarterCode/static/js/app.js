
function plotShow(id) {
    //Read json data by sampleData because of data used in plotly
    d3.json("samples.json").then((sampleData) => {
        var ids = (sampleData.samples[0].otu_ids.slice(0,10)).reverse();
        console.log(ids);
        //get top 10 sample value
        var sampleValue = (sampleData.samples[0].sample_values.slice(0, 10)).reverse();
        console.log(sampleValue);

        // place name "OTU" on ids
        var OTU_ids = ids.map(a => "OTU" + a);
        console.log(OTU_ids);

        //Bar plot with top 10 sample value with ID 
        var trace1 = {
            x : sampleValue,
            y : OTU_ids,
            type: "bar",
            orientation : "h"
        };
        data = [trace1]
        Plotly.newPlot("bar", data);
        

        // Bubble Plot with sample value with ID
        var trace2 = {
            x : sampleData.samples[0].otu_ids,
            y : sampleData.samples[0].sample_values,
            mode:"markers",
            marker :{
                size : sampleData.samples[0].sample_values,
                color: sampleData.samples[0].otu_ids
            },
            text : sampleData.samples[0].otu_labels
            
        };
    
        var layout = {
            xaxis : {title : "OTU ID"},
            height : 600,
            width : 1000
        }
        var data2=[trace2];
    
        Plotly.newPlot("bubble", data2, layout);
        
    
    
        });
    }

// create function for demographic data
function Info(id){
d3.json("samples.json").then((sampleData) => {

    //get metadata for panel
    var metadata = sampleData.metadata;
 
    console.log(metadata);
 
    //select demographic panel to put data
    var ids = metadata.filter(meta => meta.id.toString() === id)[0];
    //select demographic data 
    var demographic = d3.select("#sample-metadata");
    //empty the demographic info panel each time before getting new info
    demographic.html("");
    //get demographic data for id and append
    Object.entries(ids).forEach((key) => {
        demographic.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
    });
});
}

//create the function for the initial data rendering
function optionChanged(id){
    plotShow(id);
    Info(id);
}

//function for initial page
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("samples.json").then((data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        plotShow(data.names[0]);
        Info(data.names[0]);
    });
}

init();