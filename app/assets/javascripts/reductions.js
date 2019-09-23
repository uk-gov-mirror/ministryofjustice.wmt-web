count = []
namesY = []

heightOfGraph = 500
legendY = -0.117923557914

reductions.forEach(function (reduction) {
  count.push(reduction.count)
  namesY.push(reduction.reductionReason)
})

trace1 = {
  values: count,
  labels: namesY,
  type: 'pie'
}
data = [trace1]

var layout = {
  height: 800,
  width: 1000
}

Plotly.plot('plotly-div-reductions', data, layout)