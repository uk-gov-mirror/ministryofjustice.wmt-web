let capacityTable = document.getElementById('capacityTable').value
if (capacityTable) {
    capacityTable = JSON.parse(capacityTable)
}
trace1 = {
    x: capacityTable.headings,
    y: capacityTable.rows[0].values,
    line: {width: 3.5},
    marker: {
        line: {width: -0.5},
        size: 9
    },
    name: 'Capacity %',
};
trace2 = {
    x: capacityTable.headings,
    y: capacityTable.rows[2].values,
    line: {width: 3.5},
    marker: {
        line: {width: -0.5},
        size: 9
    },
    name: 'Reduction Hours %',
};
data = [trace1, trace2];
layout = {
    hovermode: 'closest',
    legend: {
        x: 0.436873550022,
        y: -0.208008047869,
        borderwidth: 0,
        font: {size: 12},
        orientation: 'h'
    },
    margin: {
        r: 0,
        t: 40,
        b: 60,
        l: 50
    },
    shapes: [
    {
        fillcolor: 'rgb(109, 206, 250)',
        line: {
            color: 'rgba(68, 68, 68, 100)',
            dash: 'dot',
            width: 1
        },
        opacity: 0.3,
        type: 'rectangle',
        x0: 0,
        x1: 1,
        xref: 'paper',
        y0: 90,
        y1: 110,
        yref: 'y'
    }
    ],
    showlegend: true,
    xaxis: {
        autorange: true,
        fixedrange: true,
        mirror: false,
        nticks: 0,
        showgrid: false,
        showline: true,
        side: 'bottom',
        ticks: 'outside',
        title: 'Time',
        titlefont: {size: 15},
        type: 'date',
        zeroline: false,
        zerolinewidth: 11
    },
    yaxis: {
        autorange: true,
        fixedrange: true,
        showline: true,
        ticks: 'outside',
        title: 'Capacity %',
        type: 'linear'
    }
};
Plotly.plot('plotly-div-line', {
    data: data,
    layout: layout
});
