$(document).ready(function () {
  $('#search-field').keyup(function () {
    if ($('#search-field').val().length > 5) {
      $.get('/user-search?name=' + $('#search-field').val(), {
        name: $(this).value
      },
      function(data, status) {
        $('#search-field').empty()
        if (data.length > 0) {
          data.forEach(function (option) {
            $('#search-field').append('<option value="' + option.id + '">' + option.name + '</option>');
          })
        }
      })
    }
  })
});