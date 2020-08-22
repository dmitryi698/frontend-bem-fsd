var smartgrid = require('smart-grid');

/* It's principal settings in smart grid project */
var settings = {
  outputStyle: 'scss', /* less || scss || sass || styl */
  columns: 12, /* number of grid columns */
  offset: '30px', /* gutter width px || % || rem */
  mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
  container: {
    maxWidth: '1440px', /* max-width оn very large screen */
    fields: '30px' /* side fields */
  },
  breakPoints: {
    xl: {
      width: '1200px',
    },
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
