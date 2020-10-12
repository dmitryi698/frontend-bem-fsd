import './menu.scss';

class Menu {
  constructor($component) {
    this.$component = $component;

    this.render();
  }

  render() {

    let $menuItem = $('.js-menu__link', this.$component);
    let $submenuItem = $('.js-menu__submenu', this.$component);

    $menuItem.each(function (index, item) {
      $(item).on({
        
        click: function (e) {
          e.preventDefault();
          $(this).toggleClass('menu__link_activated');
          $submenuItem.eq(index).slideToggle();
        },
        focusout: function (e) {
          $(this).removeClass('menu__link_activated');
          $submenuItem.eq(index).slideUp();
        }
        
      })     
    })
  }
}

let menu = new Menu('.js-menu');