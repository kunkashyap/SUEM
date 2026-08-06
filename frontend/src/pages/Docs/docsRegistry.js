import React, { lazy } from 'react';

// Lazy load content components to ensure optimal performance and code splitting
const Introduction = lazy(() => import('@/content/docs/introduction'));
const GettingStarted = lazy(() => import('@/content/docs/getting-started'));
const Architecture = lazy(() => import('@/content/docs/architecture'));
const ApiReference = lazy(() => import('@/content/docs/api'));
const DatabaseSchema = lazy(() => import('@/content/docs/database'));
const Roadmap = lazy(() => import('@/content/docs/roadmap'));
const FAQ = lazy(() => import('@/content/docs/faq'));
const Troubleshooting = lazy(() => import('@/content/docs/troubleshooting'));
const License = lazy(() => import('@/content/docs/license'));
const Contact = lazy(() => import('@/content/docs/contact'));

export const docSections = [
  {
    title: 'Getting Started',
    items: ['introduction', 'getting-started']
  },
  {
    title: 'Core Concepts',
    items: ['architecture', 'database']
  },
  {
    title: 'References',
    items: ['api', 'troubleshooting']
  },
  {
    title: 'Community & Info',
    items: ['roadmap', 'faq', 'license', 'contact']
  }
];

export const docsRegistry = {
  introduction: {
    title: 'Introduction',
    slug: 'introduction',
    section: 'Getting Started',
    order: 1,
    status: 'implemented',
    description: 'Overview, Vision, Problem Statement, Objectives, and Target Audience of MedSim.',
    readingTime: '3 min read',
    component: Introduction
  },
  'getting-started': {
    title: 'Getting Started',
    slug: 'getting-started',
    section: 'Getting Started',
    order: 2,
    status: 'implemented',
    description: 'Installation instructions, software requirements, local run instructions, and project structure.',
    readingTime: '4 min read',
    component: GettingStarted
  },
  architecture: {
    title: 'System Architecture',
    slug: 'architecture',
    section: 'Core Concepts',
    order: 3,
    status: 'implemented',
    description: 'Detailed overview of MedSim frontend, backend, AI pipeline, and Unity simulation engine.',
    readingTime: '6 min read',
    component: Architecture
  },
  database: {
    title: 'Database Schema',
    slug: 'database',
    section: 'Core Concepts',
    order: 4,
    status: 'implemented',
    description: 'Logical entities, user roles, simulation templates, and session logs database mapping.',
    readingTime: '3 min read',
    component: DatabaseSchema
  },
  api: {
    title: 'API Reference',
    slug: 'api',
    section: 'References',
    order: 5,
    status: 'implemented',
    description: 'Standard REST endpoints, authentication protocols, and request/response specifications.',
    readingTime: '5 min read',
    component: ApiReference
  },
  troubleshooting: {
    title: 'Troubleshooting',
    slug: 'troubleshooting',
    section: 'References',
    order: 6,
    status: 'implemented',
    description: 'Common setup failures, compile issues, and runtime debug scenarios.',
    readingTime: '3 min read',
    component: Troubleshooting
  },
  roadmap: {
    title: 'Roadmap & Timeline',
    slug: 'roadmap',
    section: 'Community & Info',
    order: 7,
    status: 'implemented',
    description: 'Milestone objectives and developmental roadmap of MedSim surgical training suite.',
    readingTime: '3 min read',
    component: Roadmap
  },
  faq: {
    title: 'FAQ',
    slug: 'faq',
    section: 'Community & Info',
    order: 8,
    status: 'implemented',
    description: 'Frequently asked questions regarding licensing, deployment, and academic usage.',
    readingTime: '3 min read',
    component: FAQ
  },
  license: {
    title: 'License',
    slug: 'license',
    section: 'Community & Info',
    order: 9,
    status: 'implemented',
    description: 'Open-source code distribution license and guidelines.',
    readingTime: '1 min read',
    component: License
  },
  contact: {
    title: 'Contact',
    slug: 'contact',
    section: 'Community & Info',
    order: 10,
    status: 'implemented',
    description: 'Academic outreach, support channels, and developmental team links.',
    readingTime: '1 min read',
    component: Contact
  }
};

export const getSidebarList = () => {
  const list = [];
  docSections.forEach(section => {
    const items = section.items.map(slug => docsRegistry[slug]).filter(Boolean);
    list.push({ ...section, items });
  });
  return list;
};

export const getFlatDocs = () => {
  const flat = [];
  docSections.forEach(section => {
    section.items.forEach(slug => {
      if (docsRegistry[slug]) {
        flat.push(docsRegistry[slug]);
      }
    });
  });
  return flat;
};
