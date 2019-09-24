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
function format ( d ) {
  // `d` is the original data object for the row
  return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
      '<tr>'+
          '<th>Hours</th>'+
          '<th>Reason</th>'+
          '<th>Comments</th>'+
          '<th>Start Date</th>'+
          '<th>End Date</th>'+
          '<th>Action</th>'+
          '<th>Action Date</th>'+
          '<th>User</th>'+
      '</tr>'+
      '<tr>'+
          '<td>1.85</td>'+
          '<td>SPOC Lead</td>'+
          '<td></td>'+
          '<td>01/01/2019</td>'+
          '<td>01/06/2019</td>'+
          '<td>Reduction Edited</td>'+
          '<td>12/12/2018</td>'+
          '<td>Joe Bloggs</td>'+
      '</tr>'+
      '<tr>'+
          '<td>29.6</td>'+
          '<td>PQiP21 0-6</td>'+
          '<td></td>'+
          '<td>01/05/2019</td>'+
          '<td>01/11/2019</td>'+
          '<td>Reduction Edited</td>'+
          '<td>04/03/2019</td>'+
          '<td>Joe Bloggs</td>'+
      '</tr>'+
  '</table>';
}

$(document).ready(function () {
  var search = document.getElementById('rawQuery').value
  if (search) {
    search = JSON.parse(search)
  }
  console.log(search)

  var startSearching = document.getElementById('startSearching').value
  if (startSearching === 'true') {
    $('#search-results-header').show()
    $('#reduction-archive-table').show()
    var dataReference = '/archive-data/reductions'

    var table = $('#reduction-archive-table').DataTable({
      processing: true,
      serverSide: true,
      searching: false,
      lengthChange: false,
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
  $('#reduction-archive-table tbody').on('click', 'td.details-control', function () {
    var tr = $(this).closest('tr');
    var row = table.row( tr );

    if ( row.child.isShown() ) {
        // This row is already open - close it
        row.child.hide();
        tr.removeClass('shown');
    }
    else {
        // Open this row
        row.child( format(row.data()) ).show();
        tr.addClass('shown');
    }
} );
})