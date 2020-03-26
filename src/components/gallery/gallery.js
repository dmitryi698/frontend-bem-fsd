import './gallery.scss';




var Slider = function ({images, imageShowed}) {

  this.images = document.querySelectorAll(images);
  this.imageShowed = document.querySelector(imageShowed);
  // default images of slider
  this.imageShowed.src = this.images[0].src;

    for (let i = 0; i < this.images.length; i++) {
        let image = this.images[i];

        // this.imageShowed.onclick = () => {
        //   this.imageShowed.src = image.src;
        // }

        image.onclick = () => {
          let item = this.imageShowed.src;
          this.imageShowed.src = image.src;
          image.src = item;
        }

        
      }    
    
  }

let slider = new Slider({ images: '.js-gallery__img', imageShowed: '.js-gallery__img_showed'});