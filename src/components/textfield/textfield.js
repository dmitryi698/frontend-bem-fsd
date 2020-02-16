import './textfield.scss';

$(function ($) {
  $('.js-textfield__input_masked').inputmask({
    alias: 'datetime',
    inputFormat: 'dd.mm.yyyy',
    placeholder: 'ДД.ММ.ГГГГ'
  });
});
