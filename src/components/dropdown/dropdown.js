import './dropdown.scss';

(function ($) {
  const defaults = {
    maxItems: Infinity,
    minItems: 0,
    defaultSelectionText: 'ItemDefault',
    selectionText: [],
    textAdult: [],
    textMinor: [],
    textInfant: [],
    title: {
      adult: '',
      minor: '',
      infant: ''
    },
    controls: {
      position: 'right',
      displayCls: 'dropdown__content',
      controlsCls: 'dropdown__controls',
      counterCls: 'dropdown__counter',
    },
    items: {},
    onChange: () => { },
    beforeDecrement: () => true,
    beforeIncrement: () => true,
  };

  $.fn.dropdown = function (options) {
    this.each(function () {
      const $this = $(this);
      const $selection = $this.find('p.dropdown__input').last();
      const $menu = $this.find('.dropdown__menu');
      const $items = $menu.find('.dropdown__option');
      const $clearButton = $this.find('.dropdown__button_clear');
      const settings = $.extend(true, {}, defaults, options);
      const itemCount = {};
      let totalItems = 0;

      //Added a function to change the endings of Russian meaning words
      function declOfNum(number, titles) {
        let cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
      }
      //The function of checking input data and data received from the user
      function checkItemId() {
        let result = '';
        let adult = '';
        let minor = '';
        let infant = '';
        let id = 0;

        if (id === "adult" || "minor" || "infant") {
          if (settings.textAdult.length > 0 && itemCount.adult > 0)
            adult = itemCount.adult + ' ' + declOfNum(itemCount.adult, settings.textAdult);
          if (settings.textMinor.length > 0 && itemCount.minor > 0)
            minor = itemCount.minor + ' ' + declOfNum(itemCount.minor, settings.textMinor);
          if (settings.textInfant.length > 0 && itemCount.infant > 0)
            infant = itemCount.infant + ' ' + declOfNum(itemCount.infant, settings.textInfant);
          result = adult + ' ' + minor + ' ' + infant;
        }
        return result;
      }

      function addClassDecrBtn(id, $item) {
        id = $item.data('id');
        let itemId = $this.find(`div[data-id=${id}] > .dropdown__controls .js-dropdown__button-decrement`);

        if (itemCount[id] === 0) {
          itemId.addClass('dropdown__button-decrement_no-activated');
        }
        else {
          itemId.removeClass('dropdown__button-decrement_no-activated');
        }
      }

      function updateDisplay() {
        const text = declOfNum(totalItems, settings.selectionText);
        let str = '';
        // Show or hide clear button
        (totalItems === 0) ? $clearButton.hide() : $clearButton.show();
        
        if (totalItems == 0 && settings.defaultSelectionText.length > 0) {
          $selection.html(`${settings.defaultSelectionText}`);
        }
        else {
          if (settings.selectionText.length > 0) {
            str = totalItems + ' ' + text + ' ' + checkItemId();
            $selection.html(`${str}`);
          }
          else {
            str = checkItemId();
            $selection.html(`${str}`);
          }
        }
      }

      function setItemSettings(id, $item) {
        const minCount = Number($item.data('mincount'));
        const maxCount = Number($item.data('maxcount'));

        settings.items[id] = {
          minCount: Number.isNaN(Number(minCount)) ? 0 : minCount,
          maxCount: Number.isNaN(Number(maxCount)) ? Infinity : maxCount,
        };
      }

      function addControls(id, $item) {
        const $controls = $('<div />').addClass(settings.controls.controlsCls);
        const $decrementButton = $(`
          <button class="dropdown__button-decrement js-dropdown__button-decrement">
            <i class="dropdown__icon-decrement">-</i>
          </button>
        `);
        const $incrementButton = $(`
          <button class="dropdown__button-increment">
            <i class="dropdown__icon-increment">+</i>
          </button>
        `);
        const $counter = $(`<span>${itemCount[id]}</span>`).addClass(settings.controls.counterCls);

        $item.children('div').addClass(settings.controls.displayCls);
        $controls.append($decrementButton, $counter, $incrementButton);

        // Custom configuration of content option        
        let optionTitle = settings.title;
        for (let key in optionTitle){
          (key === id) ? $(`div[data-id=${id}] > .dropdown__content`).html(`${settings.title[key]}`) : '';
        }
        
        if (settings.controls.position === 'right') {
          $item.append($controls);
        } else {
          $item.prepend($controls);
        }
        addClassDecrBtn(id, $item);


        $decrementButton.click((event) => {
          const { items, minItems, beforeDecrement, onChange } = settings;
          const allowClick = beforeDecrement(id, itemCount);

          if (allowClick && totalItems > minItems && itemCount[id] > items[id].minCount) {
            itemCount[id] -= 1;
            totalItems -= 1;
            $counter.html(itemCount[id]);

            addClassDecrBtn(id, $item);
            updateDisplay();
            onChange(id, itemCount[id], totalItems);
          }

          event.preventDefault();
        });

        $incrementButton.click((event) => {
          const { items, maxItems, beforeIncrement, onChange } = settings;
          const allowClick = beforeIncrement(id, itemCount);

          if (allowClick && totalItems < maxItems && itemCount[id] < items[id].maxCount) {
            itemCount[id] += 1;
            totalItems += 1;
            $counter.html(itemCount[id]);

            addClassDecrBtn(id, $item);
            updateDisplay();
            onChange(id, itemCount[id], totalItems);
          }

          event.preventDefault();
        });
        // Added button clear
  
        $clearButton.click(() => {
          totalItems = 0;
          itemCount[id] = 0;
          $counter.html('0');

          updateDisplay();
        });

        $item.click(event => event.stopPropagation());

        return $item;
      }


      $this.click(() => {
        $menu.toggleClass('dropdown__menu_open');
        $this.find('.dropdown__selection').toggleClass(' dropdown__selection_open')
      });
      $(document).mouseup(function (e) {
        if (!$this.is(e.target)
          && $this.has(e.target).length === 0) {
          $menu.removeClass('dropdown__menu_open');
          $this.find('.dropdown__selection').removeClass(' dropdown__selection_open')
        }

      });
      $items.each(function () {
        const $item = $(this);
        const id = $item.data('id');
        const defaultCount = Number($item.data('defaultcount') || '0');
        itemCount[id] = defaultCount;
        totalItems += defaultCount;

        setItemSettings(id, $item);
        addControls(id, $item);
      });

      updateDisplay();
    });

    return this;
  };
}(jQuery));



//Customization dropdown
$(document).ready(function () {
  $('.js-dropdown_guests').dropdown({
    minItems: 0,
    maxItems: 10,
    title: {
      adult: 'Взрослые',
      minor: 'Дети',
      infant: 'Младенцы'
    },
    defaultSelectionText: 'Сколько гостей',
    selectionText: ['гость', 'гостя', 'гостей'],//    selectionText: ['гость','гостя','гостей'],
    textAdult: [],
    textMinor: [],
    textInfant: ['Младенец', 'Младенца', 'Младенцев'],
    onChange: function (id, count, totalItems) {
    }
  });
  
  $('.js-dropdown_rooms').dropdown({
    minItems: 0,
    maxItems: 10,
    title: {
      adult: 'Спальни',
      minor: 'Кровати',
      infant: 'Ванные комнаты'
    },
    defaultSelectionText: '',
    selectionText: [],//    selectionText: ['гость','гостя','гостей'],
    textAdult: ['Спальня', 'Спальни', 'Спален'],
    textMinor: ['Кровать', 'Кровати', 'Кроватей'],
    textInfant: ['Ванная комната', 'Ванных комнаты', 'Ванных комнат'],
    onChange: function (id, count, totalItems) {
    }
  });
});