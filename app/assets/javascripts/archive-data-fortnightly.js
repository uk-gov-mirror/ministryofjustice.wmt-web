//var data

$(document).ready(function() {
    $('.js-data-table').dataTable({
      paging: true,
      "pageLength": 100,
      searching: true,
      info: false,
      "aaSorting": [],
      columnDefs: [{
        "width": "20%", 
        "targets": 1,
        orderable: true
      }
      ]
    });

    
    
});

function printData() {
  var table = $('.js-data-table').DataTable();
  var data = table.rows({
    filter: 'applied'
  }).data();
}