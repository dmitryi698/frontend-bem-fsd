var smartgrid = require('smart-grid');

/* It's principal settings in smart grid project */
var settings = {
  outputStyle: 'scss', /* less || scss || sass || styl */
  columns: 24, /* number of grid columns */
  offset: '10px', /* gutter width px || % || rem */
  mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
  container: {
    maxWidth: '1200px', /* max-width оn very large screen */
    fields: '30px' /* side fields */
  },
  breakPoints: {
    lg: {
      width: '992px',
    },
    md: {
      width: '768px',
      fields: '20px'
    },
    sm: {
      width: '576px',
      fields: '15px'
    },
    xs: {
      width: '320px',
      fields: '10px'
    }
  }
};

smartgrid('./src/scss/', settings);
