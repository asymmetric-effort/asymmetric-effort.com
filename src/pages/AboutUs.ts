import { createElement, useHead } from '@asymmetric-effort/specifyjs';

export function AboutUs() {
  useHead({
    title: 'Asymmetric Effort - About Us',
    description: 'Asymmetric Effort builds open-source frameworks, security tooling and collaboration platforms to help everyone stay safe online.',
    keywords: 'Asymmetric Effort, cybersecurity, open source, security tooling, about us',
    og: {
      title: 'Asymmetric Effort - About Us',
      description: 'Asymmetric Effort builds open-source frameworks, security tooling and collaboration platforms to help everyone stay safe online.',
    },
  });
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
