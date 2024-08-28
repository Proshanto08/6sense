import mongoose from 'mongoose';
import Project from '../models/casestudyModel';

const sampleProjects = [
  {
    appName: 'Baseball coaching marketplace.',
    logo: '/images/works/images/logos/impromek.svg',
    slug: 'impromek',
    imageSrc: '/images/works/images/baseball.png',
    details:{
    coloredPartTitle: 'Impromek-',
    regularTitle: 'Online baseball training coaching by professional mentor',
    team: {
      icon: '/images/case-studies/developers.svg',
      alt: 'Developers', 
      numberOfMembers: 5,
      description: 'We had three developers, one SQA and one scrum master.',
    },
    sprints: {
      icon: '/images/case-studies/sprints.svg', 
      alt: 'Sprints',
      numberOfSprints: 13,
      description: 'This product ran for total 13 sprints.',
    },
    time: {
      icon: '/images/case-studies/duration.svg',
      alt: 'Duration',
      numberOfMonths: 5,
      description: 'The total duration of the development timeline was 5 months.',
    },
    overviewParagraphs: "Impromek provides a world-class online baseball coaching academy in the United States to inspire students to develop their best baseball future. This platform serves as a conduit between the Mentor and the learner. The platform's functionality is easy to grasp. To begin, students must submit lesson requests to the Mentor along with their challenges and issues. Mentor provides crucial feedback after carefully observing the Student's problem. Here are the lesson fees charged to the Student. If the Student wants a brief discussion with the Mentor, he can chat with Mentor in detail. He can give his feedback to the Mentor too.",
    overviewImage: 'images/case-studies/overviewImpromek.webp',
    aboutParagraph: "Impromek is a cloud-based software. Our developers designed this software with the classroom teacher's role in mind. Our top priority is to make all software parts as user-friendly and accessible as possible. To create this app, we've upgraded to state-of-the-art development equipment. React, Node.js, Python, and the Ant Design System were some of the cutting-edge languages and tools we used to boost usability.",
    technologies: {
      icon: '/images/case-studies/code.svg',
      alt: 'technologies', 
      title: 'Technologies', 
      technologies: 'React, node js, Python', 
    },
    industry: {
      icon: '/images/case-studies/sprints.svg',
      alt: 'Industry',
      title: 'Industry',
      industryName: 'Sports',
    },
    solution: {
      description: "We are a top app development firm because we focus on the nitty-gritty of each client's needs and then deliver the answer they were hoping for. To provide a first-rate experience, our knowledgeable staff created a platform that distributes the necessary software parts to the following three customers.",
      solutionsPoints1: [
        "This easy and adaptable platform streamlines the process of matching students with mentors.", 
        "This software is flexible for both teachers and students. Both can take advantage of the software.",
        "Both the Mentor and the mentee stand to gain from this software system."],
        solutionsPoints2: [
          "Students can thoroughly brief the Mentor on their related issues and weaknesses.", 
          "Mentors can anticipate a comprehensive briefing from the Student on any relevant topic and areas of weakness."],
      solutionImage: '/images/case-studies/solutionImpromek.webp',
    },
    keyFeature: {
      description: "Aiming at providing reliability and feasibility, our team has developed this software intending to be both practical and easy to use. We set the software smoothly and efficiently so it is understandable without clutter or complex non-intuitive process steps",
      keyFeaturesPoints1: [
        "There is a separate user portal for both a mentor and a student.",
        "The enhanced feature of this software is direct messaging between the Mentor and the Student.",
        "Mentors can also solicit feedback from students using a star ranking system.",
      ],
      keyFeaturesPoints2: [
        "This software is reliable and accessible to any user.",
        "The learner is entitled to a full refund if he does not receive satisfactory answers.",
      ],
      keyImage: '/images/case-studies/keyfuncImpromek.webp',
    },
    result: {
      // description: "",
      resultsPoints1: [
        "Impromek is the latest digital academy that profited numerous students.",
        "Baseball players can use this software to get a personal coach to help them hone their abilities.",],
      resultsPoints2: [
        "There are up-to-date answers to pressing issues within this application.",
      ],
      // resultImage: "", 
    },
    // clientFeedback: {
    //   clientName: "",
    //   clientImage: "",
    //   clientDesignation: "",
    //   feedback: "",
    // },
  },
}

];


const seedDatabase = async (): Promise<void> => {
  try {

    await mongoose.connect('mongodb+srv://proshantosaha1999:W0ZsFvmK5dmk5ayU@cluster0.hwzdkym.mongodb.net/express-app?retryWrites=true&w=majority');
    console.log('Connected to MongoDB');

    await Project.insertMany(sampleProjects);
    console.log('Sample data inserted');


    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();
