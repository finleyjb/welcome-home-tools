// SPDX-FileCopyrightText: 2026 Finley J Baker <finleyb.dev@proton.me>
//
// SPDX-License-Identifier: MPL-2.0

import register from 'preact-custom-element';
import { switcher } from '../css/switcher.css.ts';

function Switcher() {
  return <p className={switcher}>Hello, world!</p>;
}

register(Switcher, 'wh-theme-switcher');
