import "./scss/common.scss";
import 'bootstrap';
import 'basiclightbox/dist/basicLightbox.min.css';
import 'bootstrap/scss/bootstrap.scss';
import Clock from './js/clock.js';

import 'toastr/build/toastr.min.css';

const clock1 = new Clock({
  title: "clock 1",
  selector: ".clock-widget"
});
