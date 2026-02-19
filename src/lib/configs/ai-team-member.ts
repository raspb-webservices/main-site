import alexImg from '$images/alex.png';
import mayaImg from '$images/maya.png';
import samImg from '$images/sam.png';
import rioImg from '$images/rio.png';
import melindaImg from '$images/melinda.png';

export const teamMembers = [
  {
    id: 'alex',
    name: 'Alex',
    role: 'Lead Developer & Architect',
    avatar: alexImg,
    skills: [
      'Cloud Architecture & Infrastructure',
      'Scalability & Performance Optimization',
      'Security & Data Integrity',
      'CI/CD & DevOps Automation',
      'API Design & Integration'
    ]
  },
  {
    id: 'maya',
    name: 'Maya',
    role: 'UX/UI Design Specialist',
    avatar: mayaImg,
    skills: [
      'Usability Testing & User Research',
      'Prototyping & Wireframing',
      'Interaction Design (IxD)',
      'Visual Design & UI Patterns',
      'Design System Management'
    ]
  },
  {
    id: 'sam',
    name: 'Sam',
    role: 'Content Strategy & SEO Expert',
    avatar: samImg,
    skills: [
      'Keyword Research & Analysis',
      'On-Page SEO & Technical SEO',
      'Content Strategy',
      'Link Building & Off-Page SEO',
      'Performance Tracking & Reporting'
    ]
  },
  {
    id: 'rio',
    name: 'Rio',
    role: 'Quality Assurance & Testing Lead',
    avatar: rioImg,
    skills: ['Test Automation Strategy', 'Performance & Load Testing', 'Defect Management & Analysis', 'Integration', 'Test Environment & Data Management']
  },
  {
    id: 'melinda',
    name: 'Melinda',
    role: 'Customer Service & Accounting',
    avatar: melindaImg,
    skills: [
      'Accounting Software',
      'Billing & Collections Management',
      'Customer Support Management',
      'Financial Reporting & Analysis',
      'Dispute Resolution & Issue Tracking'
    ]
  }
];
