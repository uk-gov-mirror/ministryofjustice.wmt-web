var search
$.fn.dataTable.moment = function ( format, locale ) {
  var types = $.fn.dataTable.ext.type;

  // Add type detection
  types.detect.unshift( function ( d ) {
      return moment( d, format, locale, true ).isValid() ?
          'moment-'+format :
          null;
  } );

  // Add sorting method - use an integer for the sorting
  types.order[ 'moment-'+format+'-pre' ] = function ( d ) {
      return moment( d, format, locale, true ).unix();
  };
};

function cleanColumnOutput (data, type, row) {
  var unsafeOutputPattern = new RegExp(/>|<|&|"|\/|'/g)
  return data.replace(unsafeOutputPattern, '')
}
// https://datatables.net/examples/api/row_details.html
async function format ( d, row, tr ) {
  row.child('').show();
  tr.addClass('shown');
  var nestedTable = '<table class="govuk-table" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
      '<tr>'+
            '<th>Hours</th>'+
            '<th>Reason</th>'+
            '<th>Comments</th>'+
            '<th>Start Date</th>'+
            '<th>End Date</th>'+
            '<th>Status</th>'+
            '<th>Action Date</th>'+
            '<th>User</th>'+
        '</tr>'
  search.reductionId = d.reductionId
  if (d.reductionId) {
    $.post("/archive-data/reductions-history",
    search,
    function(reductionsHistory, status){      
      reductionsHistory.reductionsHistory.forEach(function (history) {
        nestedTable = nestedTable +
        '<tr>'+
            '<td>' + history.hours +'</td>'+
            '<td>' + history.reasonShortName +'</td>'+
            '<td>' + history.notes +'</td>'+
            '<td>' + history.reductionStartDate +'</td>'+
            '<td>' + history.reductionEndDate +'</td>'+
            '<td>' + history.status +'</td>'+
            '<td>' + history.updatedDate +'</td>'+
            '<td>' + history.name +'</td>'+
        '</tr>'
      })
      nestedTable = nestedTable + '</table>';
      row.child( nestedTable ).show();
      tr.addClass('shown');
      return nestedTable
    });
  } else {
    nestedTable = nestedTable + 
    '<tr><td colspan="8">No history is available for this reduction</td></tr></table>'
    row.child( nestedTable ).show();
    tr.addClass('shown');
    return nestedTable
  }
}

$(document).ready(function () {
  search = document.getElementById('rawQuery').value
  if (search) {
    search = JSON.parse(search)
  }

  var startSearching = document.getElementById('startSearching').value
  if (startSearching === 'true') {
    $('#search-results-header').show()
    $('#reduction-archive-table').show()
    var dataReference = '/archive-data/reductions'

    var table = $('#reduction-archive-table').DataTable({
      processing: true,
      serverSide: true,
      searching: false,
      lengthChange: true,
      order: [],
      ajax: {
        url: dataReference,
        type: 'POST',
        data: search,
        dataSrc: 'reductions',
        error: function (response) {
          $('#reduction-archive-table_processing').hide()
          alert('An error occurred when searching for reductions.') // eslint-disable-line no-undef
        }
      },
      columns: [
        {
            "className":      'details-control',
            "orderable":      false,
            "data":           null,
            "defaultContent": ''
        },
        {'data': 'omName'},
        {'data': 'hoursReduced'},
        {'data': 'reductionReason'},
        {'data': 'comments'},
        {'data': 'startDate'},
        {'data': 'endDate'},
        {'data': 'lastUpdatedDate'},
        {'data': 'reductionAddedBy'}
      ],

      columnDefs: [
        {
          'targets': [0, 1, 2, 3, 4, 5, 6, 7, 8],
          'visible': true,
          'searchable': false,
          'orderable': false,
          'createdCell': function (td, cellData, rowData, row, col) {
            $(td).css('padding', '10px')
          }
        }
      ],

      drawCallback: function () {
        var total = $('#reduction-archive-table_info').text().split(' ')[6]
        $('.badge').text(total)
      },

      language: {
        info: 'Showing _START_ to _END_ of _TOTAL_ reductions',
        infoEmpty: 'Showing 0 to 0 of 0 reductions',
        emptyTable: 'No reductions found'
      }
    })
  }
  // Add event listener for opening and closing details
  $('#reduction-archive-table tbody').on('click', 'td.details-control', async function () {
    var tr = $(this).closest('tr');
    var row = table.row( tr );

    if ( row.child.isShown() ) {
      // This row is already open - close it
      row.child.hide();
      tr.removeClass('shown');
      return Promise.resolve()
    }
    else {
      // Open this row
      format(row.data(), row, tr)
    }
  });
})