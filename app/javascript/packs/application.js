// CSS
import "bootstrap";
import 'mapbox-gl/dist/mapbox-gl.css'; // <-- you need to uncomment the stylesheet_pack_tag in the layout!
// internal imports
import { initModal } from '../components/modal';
import { initPostLocation } from '../components/post_location_input';
import '../components/nearby_markers';
import Map from '../components/Map';
import { initMapChannel } from "../channels/map_channel"
import smoothscroll from 'smoothscroll-polyfill';

initMapChannel();

initModal();
initPostLocation();
smoothscroll.polyfill();

window.mainMap = new Map('#map', '.js-post-container');

