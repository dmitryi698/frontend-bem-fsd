/* global $ */
import './range-slider.scss';


class Slider {

  constructor($component) {
    this.$component = $component;
    this.render();
  }

  render() {

    let $range = $('.js-range-slider__input', this.$component);
    let $inputRange = $('.js-input-range', this.$component);
    let $inputFrom = $('.js-input-from', this.$component);
    let $inputTo = $('.js-input-to', this.$component);

    $range.ionRangeSlider({
      skin: "user",
      type: "double",
      min: 0,
      max: 15000,
      from: 5000,
      to: 10000,
      step: 1000,
      hide_min_max: true,
      hide_from_to: true,
      keyboard: true,
      onStart: setInputValue,
      onChange: setInputValue
    });

    function numberWithSpaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function setInputValue(data) {
      let from = numberWithSpaces(data.from);
      let to = numberWithSpaces(data.to);

      $inputFrom.prop("value", from);
      $inputTo.prop("value", to);
      $inputRange.html(`${from}&#8381; - ${to}&#8381;`);
    }
  }
}

$(() => {
  $('.range-slider').each((index, node) => {
    new Slider($(node));
  });
});
