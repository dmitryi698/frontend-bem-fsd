import './menu.scss';

$(() => {

  const $touch = $('.js-menu__link');
  const $menu = $('.js-menu__list');
  let menuButton = $('.js-menu__button');

  $('html').click(function () {
    $menu.find('.menu__submenu').removeClass('menu__submenu_activated');
  });

  $menu.click(function (e) {
    e.stopPropagation();
  });

  $touch.on('click', function (e) {
    e.preventDefault();
    let submenu = $(this).closest('li').find('.menu__submenu');
    let isActive = submenu.hasClass('menu__submenu_activated'); // закрыто ли подменю, по которому кликнули

    $menu.find('.menu__submenu').removeClass('menu__submenu_activated'); // закрываем все подменю

    // если меню было закрыто, то открываем его
    if (!isActive) {
      submenu.addClass('menu__submenu_activated');
    }
  });

  menuButton.click(function(){
    
    $menu.toggleClass('menu__list_open');
    
  });

});