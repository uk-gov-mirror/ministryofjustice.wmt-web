//var data

$(document).ready(function() {
    $('.js-data-table').dataTable({
      paging: true,
      "pageLength": 100,
      searching: true,
      info: false,
      "aaSorting": [],
      columnDefs: [{
        "width": "25%", 
        "targets": 1,
        orderable: true
      }
      ]
    });    
});
