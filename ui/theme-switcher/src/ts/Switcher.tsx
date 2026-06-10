import register from 'preact-custom-element';
import { switcher } from '../css/switcher.css.ts';

function Switcher() {
  return <p className={switcher}>Hello, world!</p>;
}

register(Switcher, 'wh-theme-switcher');
