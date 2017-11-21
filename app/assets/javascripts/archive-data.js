$(document).ready(function() {
    $('.js-data-table').dataTable({
      paging: true,
      searching: false,
      info: false,
      "aaSorting": [],
      columnDefs: [{
        targets: [],
        orderable: false
      }
      ]
    });
  });

