import { createElement } from '@asymmetric-effort/specifyjs';
import { setPageMeta } from '../utils/setPageMeta';

interface Resource {
  name: string;
  url: string;
  description: string;
}

const resources: Resource[] = [
  {
    name: 'Coding Standards',
    url: 'https://coding-standards.asymmetric-effort.com',
    description: 'Organization-wide coding standards and best practices for all Asymmetric Effort projects.',
  },
];

export function Resources() {
  setPageMeta({
    title: 'Asymmetric Effort - Resources',
    description: 'Developer resources, coding standards and reference materials for Asymmetric Effort projects.',
    keywords: 'coding standards, developer resources, best practices, Asymmetric Effort',
  });
  return createElement('main', null,
    createElement('h1', null, 'Resources'),
    ...resources.map((resource) =>
      createElement('div', { className: 'project-card', key: resource.name },
        createElement('h2', null,
          createElement('a', { href: resource.url, target: '_blank', rel: 'noopener noreferrer' },
            resource.name
          )
        ),
        createElement('p', null, resource.description),
      )
    ),
  );
}
