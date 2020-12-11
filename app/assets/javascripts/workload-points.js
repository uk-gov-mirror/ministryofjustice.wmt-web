$(document).ready(function() {
  $(function(){
    $('.js-tabs').tabs();
  });

  $('.form-control').each(function(i, textbox) {
    textbox.setAttribute('class', 'form-control workloadPointsNoBorder')
    textbox.setAttribute('readonly', true)
  });

  document.getElementById('save-button').setAttribute('class', 'button displayNone')
  document.getElementById('save-notice').setAttribute('class', 'notice displayNone')

  $('#edit-button').click(function() {
    $('.form-control').each(function(i, textbox) {
      textbox.removeAttribute('readonly')
      textbox.setAttribute('class', 'form-control workloadPointsTextboxEdit')
    });

    document.getElementById('edit-button').setAttribute('class', 'button displayNone')
    document.getElementById('save-button').setAttribute('class', 'button displayInlineBlock')
    document.getElementById('save-notice').setAttribute('class', 'notice displayBlock')
  })
})