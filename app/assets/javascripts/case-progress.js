trace1 = {
  x: [caseProgress.communityLast16Weeks], 
  y: [rowTitle], 
  hoverinfo: 'x', 
  marker: {color: 'rgb(131, 202, 207)'}, 
  name: 'Community <16WK', 
  orientation: 'h', 
  type: 'bar', 
  uid: 'ccd732'
};
trace2 = {
  x: [caseProgress.licenseLast16Weeks], 
  y: [rowTitle], 
  hoverinfo: 'x', 
  marker: {color: 'rgb(65, 157, 197)'}, 
  name: 'Licence <16WK', 
  orientation: 'h', 
  type: 'bar', 
  uid: '37661e'
};
trace3 = {
  x: [caseProgress.totalCases], 
  y: [rowTitle], 
  hoverinfo: 'x', 
  marker: {color: 'rgb(52, 116, 172)'}, 
  name: 'Total Active Cases', 
  orientation: 'h', 
  type: 'bar', 
  uid: 'afc4b3'
};
trace4 = {
  x: [caseProgress.warrantsTotal], 
  y: [rowTitle], 
  hoverinfo: 'x', 
  marker: {color: 'rgb(30, 48, 130)'}, 
  name: 'Active Warrants', 
  orientation: 'h', 
  type: 'bar', 
  uid: '523497'
};
trace5 = {
  x: [caseProgress.unpaidWorkTotal], 
  y: [rowTitle], 
  hoverinfo: 'x', 
  marker: {color: 'rgb(227, 119, 194)'}, 
  name: 'UPW', 
  orientation: 'h', 
  type: 'bar', 
  uid: '964533'
};
trace6 = {
  x: [caseProgress.overdueTerminationsTotal], 
  y: [rowTitle], 
  hoverinfo: 'x', 
  marker: {color: 'rgb(214, 39, 40)'}, 
  name: 'Overdue Terminations', 
  orientation: 'h', 
  type: 'bar', 
  uid: '06b618'
};
data = [trace1, trace2, trace3, trace4, trace5, trace6];


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
    l: 100, 
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
    title: 'Cases', 
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
    title: 'Click to enter Y axis title', 
    type: 'category', 
    zeroline: true
  }
};
Plotly.plot('plotly-div-cases', {
  data: data,
  layout: layout
});