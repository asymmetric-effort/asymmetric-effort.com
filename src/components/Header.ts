import { createElement, Link } from 'specifyjs-framework';

export function Header() {
  return createElement('header', null,
    createElement(Link, { to: '/' },
      createElement('img', { src: '/logo.png', alt: 'Asymmetric Effort', className: 'logo' })
    ),
    createElement('nav', null,
      createElement(Link, { to: '/' }, 'About Us'),
      createElement(Link, { to: '/projects' }, 'Projects'),
    ),
  );
}
