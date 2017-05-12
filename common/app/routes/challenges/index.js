import Show from './Show.jsx';
import _Map from './views/map';


export function modernChallengesRoute() {
  return {
    path: 'challenges/:block/:dashedName',
    component: Show
  };
}

export function mapRoute() {
  return {
    path: 'map',
    component: _Map
  };
}
