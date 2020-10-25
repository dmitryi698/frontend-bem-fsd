/* global $ */
import './textfield.scss';

class Textfield {
  constructor($component) {
    this.$component = $component;
    this.render();
  }
  render() {
    let $mask = $('.js-textfield__input_masked', this.$component);

    $mask.inputmask({
      alias: 'datetime',
      inputFormat: 'dd.mm.yyyy',
      placeholder: 'ДД.ММ.ГГГГ'
    });
  }
}

$(() => {
  $('.js-textfield').each((index, $node) => {
    new Textfield($node)
  })
});
