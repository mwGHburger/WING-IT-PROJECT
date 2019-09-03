// CSS
import "bootstrap";
import 'mapbox-gl/dist/mapbox-gl.css'; // <-- you need to uncomment the stylesheet_pack_tag in the layout!
// internal imports
import { initMapbox } from '../plugins/init_mapbox';
import { getCurrentPosition } from '../components/get_current_location';

initMapbox();
getCurrentPosition();

