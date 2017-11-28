$(document).ready(function() {
      $('.js-data-table').dataTable({
        paging: false,
        searching: false,
        info: false,
        "aaSorting": [],
        "order": [[ 0, "asc" ]],
        columnDefs: [{
          targets: [],
          orderable: false
        }
        ]
      });
    });