d3.json("samples.json").then(function(data) {
    var sample = data.samples[0];
    var hbar = [{
        type: 'bar',
        x: sample.sample_values.slice(0,10),
        y: sample.otu_ids.slice(0,10).map(i => 'OTU ' + i),
        orientation: 'h'
    }];
    var hbarLayout = {
        yaxis: {
            autorange: 'reversed'
        }
    }
    Plotly.newPlot('bar', hbar, hbarLayout);

    console.log(sample);
    var bubble = [{
        x: sample.otu_ids,
        y: sample.sample_values,
        text: sample.otu_labels,
        mode: 'markers',
        marker: {
            size: sample.sample_values,
            sizeref: 0.1,
            sizemode: 'area',
            color: sample.otu_ids,
            colorscale: [[0, '#1f77b4'],[0.5, '#2ca02c'],[1, '#8c564b']],
            opacity: 0.7
        }
    }];
    var bbLayout = {
        xaxis: {
            title:{
                text: 'OTU ID'
            }
        }
      };
      Plotly.newPlot('bubble', bubble, bbLayout);
})

