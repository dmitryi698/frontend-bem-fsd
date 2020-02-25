import './checkbox-list.scss';

(function ($) {
  $('.js-checkbox-list').click(function () {
    $(this).toggleClass(' checkbox-list_open');
  });
}(jQuery));