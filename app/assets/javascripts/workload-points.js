$(function(){
  $('.js-tabs').tabs();
});

$('.form-control').each(function(i, textbox) {
  textbox.setAttribute('readonly', true)
  textbox.setAttribute('style', 'border:none; width: 60px; outline:none; text-align:right;')
});
document.getElementById('save-button').setAttribute('style', 'display: none;')
document.getElementById('save-notice').setAttribute('style', 'display: none;')

var edit = function () {
  $('.form-control').each(function(i, textbox) {
   textbox.removeAttribute('readonly')
   textbox.setAttribute('style', 'width: 50px; text-align:right;')
  });

  document.getElementById('edit-button').setAttribute('style', 'display: none;')
  document.getElementById('save-button').setAttribute('style', 'display: inline-block;')
  document.getElementById('save-notice').setAttribute('style', 'display: block;')
}