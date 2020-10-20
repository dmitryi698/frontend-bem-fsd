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
  let textfield = new Textfield('.js-textfield');
});
