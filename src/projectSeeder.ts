import mongoose from 'mongoose';
import Project from './models/casestudyModel';

const sampleProjects = [
  {
    title: 'Project Alpha',
    appName: 'Alpha App',
    logo: 'https://example.com/logo-alpha.png',
    slug: 'project-alpha',
    thumbImage: 'https://example.com/thumb-alpha.png',
    projectOverview: 'Overview of Project Alpha.',
    about: 'About Project Alpha.',
    coverImage: 'https://example.com/cover-alpha.png',
    clientFeedback: {
      clientName: 'John Doe',
      clientImage: 'https://example.com/client-alpha.png',
      clientDesignation: 'CEO',
      feedback: 'Excellent work!',
    },
    solution: {
      description: 'Solution description for Project Alpha.',
      solutions: ['Solution 1', 'Solution 2'],
    },
    result: {
      description: 'Result description for Project Alpha.',
      results: ['Result 1', 'Result 2'],
      resultImage: 'https://example.com/result-alpha.png',
    },
    keyFeature: {
      description: 'Key features of Project Alpha.',
      features: ['Feature 1', 'Feature 2'],
    },
    team: {
      numberOfMembers: 5,
      text: 'Team description for Project Alpha.',
    },
    sprints: {
      numberOfSprints: 3,
      text: 'Sprint details for Project Alpha.',
    },
    time: {
      numberOfMonths: 6,
      text: 'Time details for Project Alpha.',
    },
    technologies: ['Node.js', 'MongoDB'],
    industry: 'Software Development',
  },
  {
    title: 'Project Beta',
    appName: 'Beta App',
    logo: 'https://example.com/logo-beta.png',
    slug: 'project-beta',
    thumbImage: 'https://example.com/thumb-beta.png',
    projectOverview: 'Overview of Project Beta.',
    about: 'About Project Beta.',
    coverImage: 'https://example.com/cover-beta.png',
    clientFeedback: {
      clientName: 'Jane Smith',
      clientImage: 'https://example.com/client-beta.png',
      clientDesignation: 'CTO',
      feedback: 'Very satisfied!',
    },
    solution: {
      description: 'Solution description for Project Beta.',
      solutions: ['Solution A', 'Solution B'],
    },
    result: {
      description: 'Result description for Project Beta.',
      results: ['Result A', 'Result B'],
      resultImage: 'https://example.com/result-beta.png',
    },
    keyFeature: {
      description: 'Key features of Project Beta.',
      features: ['Feature A', 'Feature B'],
    },
    team: {
      numberOfMembers: 7,
      text: 'Team description for Project Beta.',
    },
    sprints: {
      numberOfSprints: 4,
      text: 'Sprint details for Project Beta.',
    },
    time: {
      numberOfMonths: 8,
      text: 'Time details for Project Beta.',
    },
    technologies: ['React', 'Express'],
    industry: 'Web Development',
  },
];

const seedDatabase = async () => {
  try {

    await mongoose.connect('mongodb+srv://proshantosaha1999:W0ZsFvmK5dmk5ayU@cluster0.hwzdkym.mongodb.net/express-app?retryWrites=true&w=majority');
    console.log('Connected to MongoDB');

    await Project.deleteMany({});
    console.log('Cleared existing projects');

    await Project.insertMany(sampleProjects);
    console.log('Sample data inserted');


    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();
