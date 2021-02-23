d3.json("samples.json").then(function(data) {
    var idSel = d3.select("#selDataset").node();
    for (var i = 0; i < data.names.length; i++) {
        idSel.options[idSel.options.length] = new Option(data.names[i], data.names[i])
    }
    
    idSel.onchange = function () {
        var sample = data.samples.find(({id}) => id === this.value);
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

        demoInfo = data.metadata.find(({id}) => id.toString() === this.value);

        d3.select('#sample-metadata').html(JSON.stringify(demoInfo).replace(/[{}]/g, "").replace(/,/g, '<br>').replace(/[""]/g, ""));
        
        var wfreq = demoInfo.wfreq;
        var gaugeData = {
                type: 'pie',
                showlegend: false,
                hole: 0.4,
                rotation: 90,
                values: [180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180],
                text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
                direction: 'clockwise',
                textinfo: 'text',
                textposition: 'inside',
                marker: {
                colors: ['#F8F3EC','#F4F1E5','#E9E6CA','#E2E4B1','#D5E49D','#B7CC92','#8CBF88','#8ABB8F','#85B48A','white'],
                labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9',''],
                hoverinfo: "label"
                },
                hoverinfo: "skip"
            };
        var dot = {
            type: 'scatter',
            x: [0],
            y: [0],
            marker: {
                size: 14,
                color:'#850000'
            },
            showlegend: false,
            hoverinfo: "skip"
            };
        
        let degrees = 180-(20 * wfreq); 
        let radius = .5;
        let radians = degrees * Math.PI / 180;
        let aX = 0.025 * Math.cos((radians) * Math.PI / 180);
        let aY = 0.025 * Math.sin((radians) * Math.PI / 180);
        let bX = -0.025 * Math.cos((radians) * Math.PI / 180);
        let bY = -0.025 * Math.sin((radians) * Math.PI / 180);
        let cX = radius * Math.cos(radians);
        let cY = radius * Math.sin(radians);

        let path = 'M ' + aX + ' ' + aY +
            ' L ' + bX + ' ' + bY +
            ' L ' + cX + ' ' + cY +
            ' Z';
        
        let gaugeLayout = {
            title: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
            shapes:[{
                type: 'path',
                path: path,
                fillcolor: '#850000',
                line: {
                    color: '#850000'
                }
                }],
            xaxis: {zeroline:false, 
                    showticklabels:false,
                    showgrid: false, 
                    range: [-1, 1],
                    fixedrange: true
                    },
            yaxis: {zeroline:false, 
                    showticklabels:false,
                    showgrid: false, 
                    range: [-1, 1],
                    fixedrange: true
                    }
            };
        Plotly.newPlot('gauge', [gaugeData, dot], gaugeLayout);
    }
})

