import './diagram.scss';

class Diagram {
  constructor($component) {
    this.$component = $component;

    this.render();
  }

  render() {

    
    let circles = document.querySelectorAll('.diagram__circle');
    let listItem = document.querySelectorAll('.js-diagram__item');

    listItem.forEach(function (item, index) {
      item.addEventListener('mouseover', function () {
        circles[index].classList.add('diagram__circle_hovered');
      });

      item.addEventListener('mouseout', function () {
        circles[index].classList.remove('diagram__circle_hovered');
      });
    });
 
  }
}

let diagram = new Diagram('.js-diagram')