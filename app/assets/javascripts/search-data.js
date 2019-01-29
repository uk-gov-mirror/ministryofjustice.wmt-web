//var data

$(document).ready(function() {
    $('.js-data-table').dataTable({
      paging: true,
      "pageLength": 100,
      searching: true,
      info: false,
      order: [[4, 'asc']],
      "aaSorting": [],
      columnDefs: [{
        targets: [],
        orderable: false
      }
      ]
    });
});

