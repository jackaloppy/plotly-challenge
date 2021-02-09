d3.json("samples.json").then(function(data) {
    var sample = data.samples[0];
    var hbar = [{
        type: 'bar',
        x: sample.sample_values.slice(0,10),
        y: sample.otu_ids.slice(0,10).map(i => 'OTU ' + i),
        orientation: 'h'
    }];
    var layout = {
        yaxis: {
            autorange: 'reversed'
        }
    }
    console.log(sample.otu_ids.slice(0,10).map(i => 'OTU ' + i))
    Plotly.newPlot('bar', hbar, layout);
})

