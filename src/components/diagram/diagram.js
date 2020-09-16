import './diagram.scss';

class Diagram {
  constructor($component) {
    this.$component = $component;

    this.render();
  }

  render() {

    let circle = $('.js-diagram__circle', this.$component);
    let listItem = $('.js-diagram__item', this.$component);


    listItem.each(function (index, elem) {
      $(elem).on('mouseover', function() {
        circle.eq(index).addClass('diagram__circle_hovered');
      });

      $(elem).on('mouseout', function() {
        circle.eq(index).removeClass('diagram__circle_hovered');
      });
    })
 
  }
}

let diagram = new Diagram('.js-diagram')