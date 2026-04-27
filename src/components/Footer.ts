import { createElement } from '@asymmetric-effort/specifyjs';
import { VERSION } from '../version';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return createElement('footer', null,
    createElement('div', null, `\u00A9 2022-${currentYear} Asymmetric Effort, LLC.`),
    createElement('div', { className: 'version' }, `v${VERSION}`),
  );
}
