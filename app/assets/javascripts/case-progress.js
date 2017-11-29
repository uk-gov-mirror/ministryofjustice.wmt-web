commLast16WeeksX = []
licenseLast16WeeksX = []
totalCasesX = []
warrantsTotalX = []
unpaidWorkTotalX = []
overdueTerminationsTotalX = []
namesY = []

caseProgress.forEach(function (caseInfo) {
  commLast16WeeksX.push(caseInfo.communityLast16Weeks)
  licenseLast16WeeksX.push(caseInfo.licenseLast16Weeks)
  totalCasesX.push(caseInfo.totalCases)
  warrantsTotalX.push(caseInfo.warrantsTotal)
  unpaidWorkTotalX.push(caseInfo.unpaidWorkTotal)
  overdueTerminationsTotalX.push(caseInfo.overdueTerminationsTotal)
  namesY.push(caseInfo.name)
})

maxLabelLength = Math.max((namesY.map(function(name){
    return name.length;
    })));
letterWidth = 7

trace1 = {
  x: commLast16WeeksX,
  y: namesY,
  hoverinfo: 'x', 
  marker: {color: 'rgb(131, 202, 207)'}, 
  name: 'Community <16WK', 
  orientation: 'h', 
  type: 'bar'
}
trace2 = {
  x: licenseLast16WeeksX,
  y: namesY,
  hoverinfo: 'x', 
  marker: {color: 'rgb(65, 157, 197)'}, 
  name: 'Licence <16WK', 
  orientation: 'h', 
  type: 'bar'
}
trace3 = {
  x: totalCasesX,
  y: namesY,
  hoverinfo: 'x', 
  marker: {color: 'rgb(52, 116, 172)'}, 
  name: 'Total Active Cases', 
  orientation: 'h', 
  type: 'bar'
}
trace4 = {
  x: warrantsTotalX,
  y: namesY,
  hoverinfo: 'x', 
  marker: {color: 'rgb(30, 48, 130)'}, 
  name: 'Active Warrants', 
  orientation: 'h', 
  type: 'bar'
}
trace5 = {
  x: unpaidWorkTotalX,
  y: namesY,
  hoverinfo: 'x', 
  marker: {color: 'rgb(227, 119, 194)'}, 
  name: 'UPW', 
  orientation: 'h', 
  type: 'bar'
}
trace6 = {
  x: overdueTerminationsTotalX,
  y: namesY,
  hoverinfo: 'x', 
  marker: {color: 'rgb(214, 39, 40)'}, 
  name: 'Overdue Terminations', 
  orientation: 'h', 
  type: 'bar'
}

data = [trace1, trace2, trace3, trace4, trace5, trace6]

layout = {
  autosize: true, 
  bargap: 0.2, 
  barmode: 'stack', 
  dragmode: 'zoom', 
  font: {family: 'Arial'}, 
  height: 500, 
  hovermode: 'y', 
  legend: {
    x: -0.0234375, 
    y: -0.117923557914, 
    bgcolor: '#fff', 
    bordercolor: '#444', 
    borderwidth: 0, 
    font: {
      color: '#444', 
      family: 'Arial', 
      size: 12
    }, 
    orientation: 'h', 
    traceorder: 'normal', 
    xanchor: 'left', 
    yanchor: 'top'
  }, 
  margin: {
    r: 0, 
    t: 0, 
    b: 0, 
    l: maxLabelLength * letterWidth, 
    pad: 5
  }, 
  plot_bgcolor: 'rgb(255, 255, 255)', 
  showlegend: true, 
  titlefont: {family: 'Arial'}, 
  xaxis: {
    anchor: 'y', 
    autorange: true, 
    domain: [0, 1.01], 
    exponentformat: 'none', 
    gridwidth: 1, 
    nticks: 0, 
    range: [0, 197.894736842], 
    showgrid: false, 
    showline: true, 
    showticklabels: true, 
    side: 'bottom', 
    tickfont: {family: 'Arial'}, 
    ticklen: 5, 
    tickprefix: '', 
    ticks: 'outside', 
    ticksuffix: '', 
    title: 'Number of Cases', 
    type: 'linear', 
    zeroline: true, 
    zerolinewidth: 1
  }, 
  yaxis: {
    anchor: 'x', 
    autorange: true, 
    domain: [0.07, 0.97], 
    range: [-0.5, 4.5], 
    showgrid: false, 
    showline: false,

    side: 'left', 
    tickfont: {
      family: 'Arial', 
      size: 12
    }, 
    type: 'category', 
    zeroline: true
  }
};
Plotly.plot('plotly-div-cases', {
  data: data,
  layout: layout
});