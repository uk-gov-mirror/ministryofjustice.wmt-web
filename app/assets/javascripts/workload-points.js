$(document).ready(function() {
  $(function(){
    $('.js-tabs').tabs();
  });

  $('.govuk-input').each(function(i, textbox) {
    textbox.setAttribute('class', 'govuk-input govuk-input--width-4 workloadPointsNoBorder')
    textbox.setAttribute('readonly', true)
  });

  document.getElementById('save-button').setAttribute('class', 'button displayNone')
  document.getElementById('save-notice').setAttribute('class', 'notice displayNone')

  $('#edit-button').click(function() {
    $('.govuk-input').each(function(i, textbox) {
      textbox.removeAttribute('readonly')
      textbox.setAttribute('class', 'govuk-input govuk-input--width-4 workloadPointsTextboxEdit')
    });

    document.getElementById('edit-button').setAttribute('class', 'button displayNone')
    document.getElementById('save-button').setAttribute('class', 'button displayInlineBlock')
    document.getElementById('save-notice').setAttribute('class', 'notice displayBlock')
  })
})