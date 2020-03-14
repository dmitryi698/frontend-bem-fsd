import './menu.scss';

$(() => {
  $('.js-menu__link').click(() => {

    $('.menu__submenu').toggleClass('menu__submenu_activated');
    
  });

  $(document).mouseup((e) => {
    
    if (!$('.menu__submenu').is(e.target) && $('.menu__submenu').has(e.target).length === 0) {

      $('.menu__submenu').removeClass('menu__submenu_activated');

    }
  });
});