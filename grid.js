var smartgrid = require('smart-grid');

/* It's principal settings in smart grid project */
var settings = {
  outputStyle: 'scss', /* less || scss || sass || styl */
  columns: 24, /* number of grid columns */
  offset: '20px', /* gutter width px || % || rem */
  mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
  container: {
    maxWidth: '1160px', /* max-width оn very large screen */
    fields: '20px' /* side fields */
  },
  breakPoints: {
    lg: {
      width: '992px',
      fields: '15px'
    },
    md: {
      width: '768px'
    },
    sm: {
      width: '576px'
    },
    xs: {
      width: '320px'
    }
  }
};

smartgrid('./src/scss/', settings);
