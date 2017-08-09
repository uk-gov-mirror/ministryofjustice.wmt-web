$(document).ready(function() {
      $('.js-data-table').dataTable({
        paging: false,
        searching: false,
        info: false,
        "aaSorting": [],
        columnDefs: [{
          targets: [0,1,2,3,5,6],
          orderable: false
        }
        ]
      });
    });