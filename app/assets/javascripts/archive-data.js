$(document).ready(function() {
    $('.js-data-table').dataTable({
      paging: true,
      "pageLength": 100,
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

