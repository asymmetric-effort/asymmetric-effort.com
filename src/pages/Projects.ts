import { createElement } from 'specifyjs-framework';

interface Project {
  name: string;
  url: string;
  description: string;
}

const projects: Project[] = [
  {
    name: 'SpecifyJS',
    url: 'https://specifyjs.asymmetric-effort.com',
    description:
      'A declarative TypeScript UI framework with zero runtime dependencies, ' +
      'built-in routing, and a 56-component library in under 4KB gzipped.',
  },
  {
    name: 'Scrutineer',
    url: 'https://scrutineer.asymmetric-effort.com',
    description:
      'Security analysis and auditing platform for identifying vulnerabilities ' +
      'and ensuring compliance across your infrastructure.',
  },
  {
    name: 'Convocate',
    url: 'https://convocate.asymmetric-effort.com',
    description:
      'A collaboration platform designed to bring teams together for secure, ' +
      'efficient communication and project coordination.',
  },
];

export function Projects() {
  return createElement('main', null,
    createElement('h1', null, 'Our Projects'),
    ...projects.map((project) =>
      createElement('div', { className: 'project-card', key: project.name },
        createElement('h2', null,
          createElement('a', { href: project.url, target: '_blank', rel: 'noopener noreferrer' },
            project.name
          )
        ),
        createElement('p', null, project.description),
      )
    ),
  );
}
