import './like-btn.scss';


$('.js-like-btn__counter').on('click', function (event, count) {
  event.preventDefault();

  var $this = $(this),
    count = $this.attr('data-count'),
    active = $this.hasClass('like-btn__counter_active');


  $this.attr('data-count', active ? --count : ++count).toggleClass('like-btn__counter_active');

});