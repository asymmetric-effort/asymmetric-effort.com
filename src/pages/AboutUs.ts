import { createElement } from '@asymmetric-effort/specifyjs';
import { setPageMeta } from '../utils/setPageMeta';

export function AboutUs() {
  setPageMeta(
    'Asymmetric Effort - About Us',
    'Asymmetric Effort builds open-source frameworks, security tooling and collaboration platforms to help everyone stay safe online.',
    'Asymmetric Effort, cybersecurity, open source, security tooling, about us'
  );
  return createElement('main', null,
    createElement('h1', null, 'About Us'),
    createElement('p', null,
      'We are Asymmetric Effort. Our mission is to improve cybersecurity through innovative ' +
      'approaches focused on helping everyone stay safe online. Whether you are a business or a ' +
      'consumer, our goal is to develop tools, solutions and systems which protect your identity, ' +
      'data and peace of mind.'
    ),
    createElement('p', null,
      'We build open-source frameworks, security tooling and collaboration platforms that ' +
      'empower developers and organizations to ship safer, more reliable software.'
    ),
  );
}
