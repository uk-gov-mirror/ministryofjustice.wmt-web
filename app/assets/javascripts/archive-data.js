$(document).ready(function() {
    $('.js-data-table').dataTable({
      paging: true,
      searching: true,
      info: false,
      "aaSorting": [],
      columnDefs: [{
        targets: [],
        orderable: false
      }
      ]
    });
  });

