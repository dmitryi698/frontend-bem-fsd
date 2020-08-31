//SCSS
import './scss/app.scss';

//plugins css
import '../node_modules/ion-rangeslider/css/ion.rangeSlider.css';
import '../node_modules/air-datepicker/dist/css/datepicker.css';

// plugins
import '../node_modules/inputmask/dist/jquery.inputmask';
import '../node_modules/ion-rangeslider/js/ion.rangeSlider';
import '../node_modules/air-datepicker/dist/js/datepicker'


/* The function so as not to engage in copying styles was taken in the project */
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(require.context('./components', true, /^\.\/(?!.*(?:__tests__)).*\.(jsx?)$/));  // pattern to take each .js(x) files except of the ones with __tests__ directory https://regex101.com/r/J8NWTj/1
requireAll(require.context('./pages/', true, /^\.\/(?!.*(?:__tests__)).*\.(jsx?)$/));
