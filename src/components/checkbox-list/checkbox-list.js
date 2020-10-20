/* global $ */
import './checkbox-list.scss';

  class CheckboxList {
    constructor($component) {
      this.$component = $component;
      this.render();

    }

    render() {
      let $button = $( '.js-checkbox-list__icon-button', this.$component );
      let $list = $(this.$component);

      $button.on( 'click', function () {
        $list.toggleClass('checkbox-list_open');
      } );
    }
  }


  $(() => {
    let checkboxlist = new CheckboxList('.js-checkbox-list');
  })
