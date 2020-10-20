/* global $ */
import './date-dropdown.scss';



class Datepicker {
  constructor($component) {
    this.$component = $component;

    this.render();
  }

  render() {

    let $start = $('.js-date-dropdown__input_start', this.$component);
    let $end = $('.js-date-dropdown__input_end', this.$component);
    let $filterDate = $('.js-date-dropdown__input', this.$component);
    let prewCustom = 'arrow_back';
    let nextCustom = 'arrow_forward';
    let okButton = '<span class="datepicker--button" data-action="hide">Применить</span>';

    $start.datepicker({
      offset: 5,
      posOffset: 1,
      dateFormat: 'dd.mm.yyyy',
      clearButton: true,
      prevHtml: prewCustom,
      nextHtml: nextCustom,
      navTitles: {
        days: 'MM yyyy'
      }, onSelect: function (fd, date) {
        $end.data('datepicker')
          .update('minDate', date);
        $end.focus();
      }
    });

    $end.datepicker({
      position: 'bottom right',
      offset: 5,
      posOffset: 35,
      dateFormat: 'dd.mm.yyyy',
      clearButton: true,
      prevHtml: prewCustom,
      nextHtml: nextCustom,
      navTitles: {
        days: 'MM yyyy'
      },
      onSelect: function (fd, date) {
        $start.data('datepicker')
          .update('maxDate', date)
      }
    });

    $('.datepicker--button[data-action="clear"]').each(function (index) { $(okButton).insertAfter($(this)); });

    $filterDate.datepicker({
      offset: 5,
      posOffset: 0,
      range: true,
      clearButton: true,
      multipleDatesSeparator: ' - ',
      dateFormat: 'dd M',
      prevHtml: prewCustom,
      nextHtml: nextCustom,
      navTitles: {
        days: 'MM yyyy'
      }
    });


  }
}


  $(() => {
    let dateFilter = new Datepicker('.js-date-dropdown_theme_filter');
    let dateDropdown = new Datepicker('.js-date-dropdown');
  });
