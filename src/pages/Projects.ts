import { createElement, useHead } from '@asymmetric-effort/specifyjs';

interface Project {
  name: string;
  url?: string;
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
  {
    name: 'Actions',
    url: 'https://actions.asymmetric-effort.com',
    description:
      'Reusable GitHub Actions and CI/CD workflows for Asymmetric Effort projects.',
  },
  {
    name: 'Linux PAM OIDC',
    url: 'https://github.com/asymmetric-effort/linux-oidc-plugin',
    description:
      'A Linux PAM module enabling OpenID Connect (OIDC) authentication for ' +
      'system login, providing federated identity support at the OS level.',
  },
  {
    name: 'GreyNet',
    description:
      'GreyNet provides decentralized, peer-to-peer zero trust network access ' +
      'without reliance on centralized control planes. Nodes authenticate and ' +
      'authorize each other directly using cryptographic identity, establishing ' +
      'secure channels only after mutual verification.',
  },
];

export function Projects() {
  useHead({
    title: 'Asymmetric Effort - Projects',
    description: 'Open-source projects by Asymmetric Effort including SpecifyJS, Scrutineer, Convocate, Actions, Linux PAM OIDC and GreyNet.',
    keywords: 'SpecifyJS, Scrutineer, Convocate, Actions, Linux PAM OIDC, GreyNet, open source, TypeScript, security, collaboration',
    og: {
      title: 'Asymmetric Effort - Projects',
      description: 'Open-source projects by Asymmetric Effort including SpecifyJS, Scrutineer, Convocate, Actions, Linux PAM OIDC and GreyNet.',
    },
  });
  return createElement('main', null,
    createElement('h1', null, 'Our Projects'),
    ...projects.map((project) =>
      createElement('div', { className: 'project-card', key: project.name },
        createElement('h2', null,
          project.url
            ? createElement('a', { href: project.url, target: '_blank', rel: 'noopener noreferrer' }, project.name)
            : project.name
        ),
        createElement('p', null, project.description),
      )
    ),
  );
}
