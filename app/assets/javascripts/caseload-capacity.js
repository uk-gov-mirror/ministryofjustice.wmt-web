
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
    y: capacityTable.rows[1].values,
    line: {width: 3.5},
    marker: {
        line: {width: -0.5},
        size: 9
    },
    name: 'Reduction Hours',
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
        title: '2016',
        titlefont: {size: 15},
        range: ['2015-02-17', '2017-02-16'], 
        rangeselector: {buttons: [
        {
          count: 1, 
          label: '1 Month', 
          step: 'month', 
          stepmode: 'backward'
        }, 
        {
          count: 6, 
          label: '6 Months', 
          step: 'month', 
          stepmode: 'backward'
        },
        {
          count: 12, 
          label: '12 Months', 
          step: 'month', 
          stepmode: 'backward'
        }, 
        {
          count: 18, 
          label: '18 Months', 
          step: 'month', 
          stepmode: 'backward'
        },
        {step: 'all'}
      ]}, 
        type: 'date',
        zeroline: false,
        zerolinewidth: 11
    },
    yaxis: {
        autorange: false,
        fixedrange: true,
        range: [0, 120],
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