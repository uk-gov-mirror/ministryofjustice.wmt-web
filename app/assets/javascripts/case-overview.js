$(document).ready(function() {
      $('.js-data-table').dataTable({
        paging: false,
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