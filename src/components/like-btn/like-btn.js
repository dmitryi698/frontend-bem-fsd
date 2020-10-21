/* global $ */
import './like-btn.scss';


class Likebtn {
  constructor($component) {
    this.$component = $component;
    this.render();
  }

  render() {
    let $btnCounter = $( '.js-like-btn__counter', this.$component );
    $btnCounter.on( 'click', btnActivated );

    function btnActivated (event) {
      event.preventDefault();

      let $this = $(this);
      let active = $this.hasClass('like-btn__counter_active');
      let counter = +$this.attr('data-count');

      if ( active ) {
        $this.attr('data-count', --counter).removeClass('like-btn__counter_active');
      }
      else {
        $this.attr('data-count', ++counter).addClass('like-btn__counter_active');
      }
    }
  }
}

$(() => {
  let likeBtn = new Likebtn('.js-like-btn');
  console.log();
});
