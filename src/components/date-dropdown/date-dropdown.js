import './date-dropdown.scss';

$(function ($) {
  $('.js-date-dropdown__input_start').inputmask({
    alias: 'datetime',
    inputFormat: 'dd.mm.yyyy',
    placeholder: 'ДД.ММ.ГГГГ'
  });

  $('.js-date-dropdown__input_end').inputmask({
    alias: 'datetime',
    inputFormat: 'dd.mm.yyyy',
    placeholder: 'ДД.ММ.ГГГГ'
  });

});



// Добавил в настройку позиционированию posOffset,
// регулирует положение календаря относительно инпута по горизонтали
const prewCustom = 'arrow_back';
const nextCustom = 'arrow_forward';

let $start = $('.js-date-dropdown__input_start'),
    $end = $('.js-date-dropdown__input_end'),
    $filterDate = $('.js-date-dropdown__input');

$start.datepicker({
  clearButton: true,
  posOffset: 16,
  multipleDatesSeparator: ' - ',
  dateFormat: 'dd.mm.yyyy',
  prevHtml: prewCustom,
  nextHtml: nextCustom,
  navTitles: {
    days: 'MM yyyy'
  },  onSelect: function (fd, date) {
    $end.data('datepicker')
      .update('minDate', date);

    $end.focus();
  }
})

$end.datepicker({
  position: 'bottom right',
  posOffset: 48,
  clearButton: true,
  multipleDatesSeparator: ' - ',
  dateFormat: 'dd.mm.yyyy',
  prevHtml: prewCustom,
  nextHtml: nextCustom,
  navTitles: {
    days: 'MM yyyy'
  },
  onSelect: function (fd, date) {
    $start.data('datepicker')
      .update('maxDate', date)
  }
})

$filterDate.datepicker({
  posOffset: 16,
  range: true,
  clearButton: true,
  multipleDatesSeparator: ' - ',
  dateFormat: 'dd M',
  prevHtml: prewCustom,
  nextHtml: nextCustom,
  navTitles: {
    days: 'MM yyyy'
  },
})


// Add confirm button
var okButton = '<span class="datepicker--button" data-action="hide">Применить</span>';
$('.datepicker--button[data-action="clear"]').each(function (index) { $(okButton).insertAfter($(this)); });