   $(document).ready(function() {
   var $table = $('table.data-table');
   $table.floatThead({
       responsiveContainer: function($table){
           return $table.closest('.table-responsive');
       }
   });
});