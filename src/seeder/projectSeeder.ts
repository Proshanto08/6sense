import mongoose from "mongoose";
import Project from "../models/casestudyModel";
import TeamGallery from "../models/teamGalleryModel";
import dotenv from "dotenv";
dotenv.config();

const sampleProjects = [
  {
    id: "1",
    appName: "Baseball coaching marketplace.",
    logo: "/uploads/impromek.svg",
    slug: "impromek",
    imageSrc: "/uploads/baseball.png",
    details: {
      coloredPartTitle: "Impromek-",
      regularTitle: "Online baseball training coaching by professional mentor",
      heroInfo: [
        {
          icon: "/uploads/users.svg",
          alt: "Developers",
          title: "5 DEVELOPERS",
          subtitle: "We had three developers, one SQA and one scrum master.",
        },
        {
          icon: "/uploads/layers1.svg",
          alt: "Sprints",
          title: "13 SPRINTS",
          subtitle: "This product ran for total 13 sprints.",
        },
        {
          icon: "/uploads/clock.svg",
          alt: "Duration",
          title: "5 MONTHS",
          subtitle:
            "The total duration of the development timeline was 5 months.",
        },
      ],
      overviewParagraphs: [
        "Impromek provides a world-class online baseball coaching academy in the United States to inspire students to develop their best baseball future. This platform serves as a conduit between the Mentor and the learner. The platform's functionality is easy to grasp. To begin, students must submit lesson requests to the Mentor along with their challenges and issues. Mentor provides crucial feedback after carefully observing the Student's problem. Here are the lesson fees charged to the Student. If the Student wants a brief discussion with the Mentor, he can chat with Mentor in detail. He can give his feedback to the Mentor too.",
      ],
      overviewImage: "/uploads/overviewImpromek.webp",
      aboutParagraph:
        "Impromek is a cloud-based software. Our developers designed this software with the classroom teacher's role in mind. Our top priority is to make all software parts as user-friendly and accessible as possible. To create this app, we've upgraded to state-of-the-art development equipment. React, Node.js, Python, and the Ant Design System were some of the cutting-edge languages and tools we used to boost usability.",
      aboutInfo: [
        {
          icon: "/uploads/users.svg",
          alt: "Developers",
          subtitle: "Team Size",
          title: "5 SPECIALISTS",
        },
        {
          icon: "/uploads/clock.svg",
          alt: "Duration",
          subtitle: "Duration",
          title: "5 MONTHS",
        },
        {
          icon: "/uploads/code.svg",
          alt: "Technologies",
          subtitle: "Technologies",
          title: "NEST JS, NEXT JS, MONGODB",
        },
        {
          icon: "/uploads/layers1.svg",
          alt: "Industry",
          subtitle: "Industry",
          title: "SPORTS",
        },
      ],
      solution: {
        description:
          "We are a top app development firm because we focus on the nitty-gritty of each client's needs and then deliver the answer they were hoping for. To provide a first-rate experience, our knowledgeable staff created a platform that distributes the necessary software parts to the following three customers.",
        solutionsPoints1: [
          "This easy and adaptable platform streamlines the process of matching students with mentors.",
          "This software is flexible for both teachers and students. Both can take advantage of the software.",
          "Both the Mentor and the mentee stand to gain from this software system.",
        ],
        solutionsPoints2: [
          "Students can thoroughly brief the Mentor on their related issues and weaknesses.",
          "Mentors can anticipate a comprehensive briefing from the Student on any relevant topic and areas of weakness.",
        ],
        solutionImage: "/uploads/solutionImpromek.webp",
      },
      keyFeature: {
        description:
          "Aiming at providing reliability and feasibility, our team has developed this software intending to be both practical and easy to use. We set the software smoothly and efficiently so it is understandable without clutter or complex non-intuitive process steps.",
        keyFeaturesPoints1: [
          "There is a separate user portal for both a mentor and a student.",
          "The enhanced feature of this software is direct messaging between the Mentor and the Student.",
          "Mentors can also solicit feedback from students using a star ranking system.",
        ],
        keyFeaturesPoints2: [
          "This software is reliable and accessible to any user.",
          "The learner is entitled to a full refund if he does not receive satisfactory answers.",
        ],
        keyFeaturesImage: "/uploads/keyfuncImpromek.webp",
      },
      result: {
        description:
          "Impromek is the latest digital academy that profited numerous students. Baseball players can use this software to get a personal coach to help them hone their abilities.",
        resultsPoints1: [
          "Impromek is the latest digital academy that profited numerous students.",
          "Baseball players can use this software to get a personal coach to help them hone their abilities.",
        ],
        resultsPoints2: [
          "There are up-to-date answers to pressing issues within this application.",
        ],
      },
      clientFeedback: {
        clientNameAndDesignation: "Gabriel Sotomayor, CEO, Impromek Inc.",
        clientImage: "",
        feedback:
          "The solution 6sense Technologies came up with to the problem was truly innovative and first in class. Their strong technical skills and speed of development are super impressive.",
      },
    },
  },

  {
    id: "2",
    appName: "The Best EV Charging Solution Period.",
    logo: "/uploads/chargeonsite.svg",
    slug: "chargeon-site",
    imageSrc: "/uploads/evcharging.png",
    details: {
      coloredPartTitle: "ChargeOn Site-",
      regularTitle: "The Best EV Charging Solution Period.",
      heroInfo: [
        {
          icon: "/uploads/users.svg",
          alt: "Developers",
          title: "5 DEVELOPERS",
          subtitle: "We had three developers, one SQA and one scrum master.",
        },
        {
          icon: "/uploads/layers1.svg",
          alt: "Sprints",
          title: "30+ SPRINTS",
          subtitle: "This product ran for total 30+ sprints.",
        },
        {
          icon: "/uploads/clock.svg",
          alt: "Duration",
          title: "15+ MONTHS",
          subtitle:
            "The total duration of the development timeline was 15+ months.",
        },
      ],
      overviewParagraphs: [
        "Charge OnSite is the largest electric vehicle charging network in the world. One can find over 500+ charging locations in its app. It’s the most extensive and easy-to-use network, with charging stations for electric cars for both commercial fleets and individual drivers. It provides a vast network of charging stations throughout the United States, with the added convenience of accepting digital payments.",
      ],
      overviewImage: "/uploads/overviewChargeonsite.webp",
      aboutParagraph:
        "Our professional software development team mapped out a strategy to build a platform after thoroughly analyzing the client’s requirements through careful planning and research. To create this software, we employed state-of-the-art methods and hardware. We use cutting-edge lingo and technologies such as Node.js, React.py, and the Ant design framework.",
      aboutInfo: [
        {
          icon: "/uploads/users.svg",
          alt: "Developers",
          subtitle: "Team size",
          title: "5 SPECIALISTS",
        },
        {
          icon: "/uploads/clock.svg",
          alt: "Duration",
          subtitle: "Duration",
          title: "15+ MONTHS",
        },
        {
          icon: "/uploads/code.svg",
          alt: "Technologies",
          subtitle: "Technologies",
          title: "NEST JS, NEXT JS, PYTHON",
        },
        {
          icon: "/uploads/layers1.svg",
          alt: "Industry",
          subtitle: "Industry",
          title: "EV CHARGING",
        },
      ],
      solution: {
        description:
          "We are a top app development firm because we focus on the nitty-gritty of each client’s needs and then deliver the answer they were hoping for. To provide a first-rate experience, our knowledgeable staff created a platform that distributes the necessary software parts to the following three customers.",
        solutionsPoints1: [
          "EV Owner: The primary user of Charge OnSite is an electric vehicle owner looking to locate charging stations, schedule charging sessions, and pay using various accepted payment methods.",
          "Super Admin: An app’s top administrator has access to every setting in the program. Company, entity, property, location, billing, administrative, driver, and permit management are all under his control.",
          "Property Admin: Our talented group created the property admin choice for user comfort. The Super admin might delegate his app management responsibilities to the property admin if he cannot manage the app.",
        ],
        solutionImage: "/uploads/solutionChargeonsite.webp",
      },
      keyFeature: {
        description:
          "We devised a method that incorporates every feature needed in a Charge OnSite app. Users can use this app on both mobile and desktop devices. Electric vehicle (EV) owners and building managers can use this app to access EV charging facilities.",
        keyFeaturesPoints1: [
          "The versatility of the app is expanded through three user modules.",
          "High-quality, uncomplicated, and user-friendly user interface",
          "The app’s interface is the most straightforward and most intuitive ever created.",
          "A lightning-fast server and database support this application.",
        ],
        keyFeaturesImage: "/uploads/keyfuncChargeonsite.webp",
      },
      result: {
        description:
          "We made this app so that the charging station and the app can communicate without hiccups. The app has a lightning-fast connection time, allowing users to link up with a power source in a flash.",
        resultsPoints1: [
          "The state-of-the-art architecture of this top app is based on a Tree-Based Network.",
          "The safety of our customers is never jeopardized. This software is protected by a login and password system.",
        ],
        resultsPoints2: [
          "The ability to exercise various command options is a great plus for this app. Two people control the app at a time simply by giving access from the super admin to the property admin.",
        ],
      },
      // clientFeedback: {
      //   clientNameAndDesignation: "",
      //   clientImage: "",
      //   feedback: "",
      // },
    },
  },

  {
    id: "3",
    appName: "B2B sales automation tool with A.I.",
    logo: "/uploads/breakingmars.svg",
    slug: "breaking-mars",
    imageSrc: "/uploads/linkedinauto.png",
    details: {
      coloredPartTitle: "Breaking Mars-",
      regularTitle: "The One Stop Solution For B2B Marketing",
      heroInfo: [
        {
          icon: "/uploads/users.svg",
          alt: "Developers",
          title: "6 DEVELOPERS",
          subtitle: "We had 4 developers, one SQA and one scrum master.",
        },
        {
          icon: "/uploads/layers1.svg",
          alt: "Sprints",
          title: "16 SPRINTS",
          subtitle: "This product ran for total 16 sprints.",
        },
        {
          icon: "/uploads/clock.svg",
          alt: "Duration",
          title: "8 MONTHS",
          subtitle:
            "The total duration of the development timeline was 8 months.",
        },
      ],
      overviewParagraphs: [
        "Breaking Mars is a powerful LinkedIn Automation tool built to serve the B2B Marketplace. This tool is enriched with data that helps the sales team to increase their business growth by successfully finding their targeted customers. The system efficiently locates high-quality leads for its users, paving them to find and close more of their ideal clients in less time.",
      ],
      overviewImage: "/uploads/overviewBreakingMars.webp",
      aboutParagraph:
        "Our expert team simplifies their workflow and processes their project with cloud-based software. Cloud-based automation means users no longer need to open tabs and manually click daily. To complete this project, our experts used rapid, practical prototype tools and languages like React, Node JS, Python, and Ant Design System.",
      aboutInfo: [
        {
          icon: "/uploads/users.svg",
          alt: "Developers",
          subtitle: "Team size",
          title: "6 SPECIALISTS",
        },
        {
          icon: "/uploads/clock.svg",
          alt: "Duration",
          subtitle: "Duration",
          title: "8 MONTHS",
        },
        {
          icon: "/uploads/code.svg",
          alt: "Technologies",
          subtitle: "Technologies",
          title: "NEST JS, NEXT JS, PYTHON",
        },
        {
          icon: "/uploads/layers1.svg",
          alt: "Industry",
          title: "MARKETING",
          subtitle: "Industry",
        },
      ],
      solution: {
        description:
          "Our team offered a more convenient, structured, and scalable LinkedIn-managed service. One can generate more campaigns for their clients on breaking Mars. It helps users find and close new customers from any corner of LinkedIn. Customers can get the highest number of leads within a fraction of a second. Here is an example of how simply this powerful tool works :",
        solutionsPoints1: [
          "Create a Breaking Mars account.",
          "Create a campaign with LinkedIn search/ CSV upload/ Sales Navigation Searches/ First degree connections.",
        ],
        solutionsPoints2: [
          "Integrate LinkedIn account.",
          "A list of the targeted audience appears.",
        ],
        solutionImage: "/uploads/solutionBreakingMars.webp",
      },
      keyFeature: {
        description:
          "Our team has made the task much easier by automating functions like sending customized messages, connection requests, automated messages, and follow-ups.",
        keyFeaturesPoints1: [
          "Breaking Mars offers all the essential LinkedIn automation features and some unique ones.",
          "Due to its AI functionality, it is 100 times faster in sending messages and connections than humans.",
        ],
        keyFeaturesPoints2: [
          "Create and run campaigns with four unique ways to get up to 1000+ leads.",
          "With the Campaign Statistics feature, one can get a complete check of their LinkedIn account progress.",
        ],
        keyFeaturesImage: "/uploads/keyfuncBreakingMars.webp",
      },
      result: {
        resultsPoints1: [
          "Breaking Mars helps users grab the data and generate leads in minute.",
          "One can perform a comprehensive check of the conversion report with little effort.",
        ],
        resultsPoints2: [
          "It automatically engages with the prospects by scheduling automatic messages and follow-ups.",
          "With 1000+ connections, one can effortlessly uncover untapped opportunities for growth for their business.",
        ],
      },
      clientFeedback: {
        clientNameAndDesignation: "Sid, CEO, Breaking Mars Inc.",
        clientImage: "",
        feedback:
          "Working with LinkedIn APIs was a challenging task due to their frequent changes. Additionally, we needed to develop an algorithm that would prevent users from being banned on LinkedIn. The 6sense team embraced the challenge and successfully delivered. Their exceptional technical expertise and rapid development pace are truly impressive.",
      },
    },
  },

  {
    id: "4",
    appName: "Simplest task management platform.",
    logo: "/uploads/itcan.svg",
    slug: "itcan",
    imageSrc: "/uploads/task.png",
    details: {
      coloredPartTitle: "Itcan-",
      regularTitle: "The Best Task Management Tool In Middle East",
      heroInfo: [
        {
          icon: "/uploads/users.svg",
          alt: "Developers",
          title: "5 DEVELOPERS",
          subtitle: "We had three developers, one SQA and one scrum master.",
        },
        {
          icon: "/uploads/layers1.svg",
          alt: "Sprints",
          title: "13 SPRINTS",
          subtitle: "This product ran for total 13 sprints.",
        },
        {
          icon: "/uploads/clock.svg",
          alt: "Duration",
          title: "14 MONTHS",
          subtitle:
            "The total duration of the development timeline was 14 months.",
        },
      ],
      overviewParagraphs: [
        "Itcan is a lightweight yet powerful project management tool that provides users with a unified workspace to create tasks, projects, structured notes, run reports, and so on. It’s a one-of-a-kind resource for both small and large enterprises. It works equally well on desktop and mobile devices and experiences minimal interference. Users can benefit from project management, project tracking, sustainable communication, scalable results, consolidated portfolio work, and simple interference.",
      ],
      overviewImage: "/uploads/overviewItcan.webp",
      aboutParagraph:
        "Our Specialised team developed adaptable software for overburdened project managers to run their projects smoothly and effectively. Users save time by not switching between applications like spreadsheets, email clients, and word processors. They now have a streamlined method of creating, managing and keeping tabs on their projects using a single, easy-to-use interface.",
      aboutInfo: [
        {
          icon: "/uploads/users.svg",
          alt: "Developers",
          title: "5 SPECIALISTS",
          subtitle: "Team size",
        },
        {
          icon: "/uploads/clock.svg",
          alt: "Duration",
          title: "14 MONTHS",
          subtitle: "Duration",
        },
        {
          icon: "/uploads/code.svg",
          alt: "Technologies",
          title: "NEST JS, NEXT JS, MONGODB",
          subtitle: "Technologies",
        },
        {
          icon: "/uploads/layers1.svg",
          alt: "Industry",
          title: "PROJECT MANAGEMENT",
          subtitle: "Industry",
        },
      ],
      solution: {
        description:
          "The solution is to create a unified, multi-purpose application that can assist project managers and other stakeholders in cutting redundancy, streamlining processes, and improving overall efficiency. In particular, we aimed to furnish the user with the following amenities:",
        solutionsPoints1: [
          "Users can create project roadmaps to get a high-level overview and keep track of all of its projects",
          "We developed this tool to maintain compliance and offer all the tools necessary for users to manage access across their organization",
          "We’ve put a premium on creating a product that’s easy to use. Itcan is a user-friendly, high-tech management solution that can be picked up by anyone and put to use immediately",
          "Itcan provides real-time, actionable insights about how their team performs sprint over sprint. It’s also handy for keeping track of tasks and organizing upcoming projects.",
        ],
        solutionImage: "/uploads/solutionItcan.webp",
      },
      keyFeature: {
        description:
          "Our professional staff is dedicated to creating a reliable, user-friendly, and trustworthy platform. We’ve developed an industry-leading tool that speeds up project processing and streamlines the procedures.",
        keyFeaturesPoints1: [
          "Itcan is an all-encompassing platform that facilitates better teamwork and, in turn, a better user experience.",
          "Itcan has many helpful project management features, such as projects with sub-tasks, milestones, and deadlines",
          "An easy-to-understand tracking system for all projects helps to stay on track to hit project goals with up-to-date status.",
        ],
        keyFeaturesPoints2: [
          "It can help teams streamline their upcoming work and tasks and assign multiple tasks and milestones to the users at the same time",
          "By combining advanced features and capabilities with a clean and user-friendly interface, our knowledgeable and experienced team was able to improve the team’s ability to work together. Project management software is designed for a great user experience – a clean interface and simple functionality. Project management software designed for a great user experience–a clean interface and simple functionality.",
        ],
        keyFeaturesImage: "/uploads/keyfuncItcan.webp",
      },
      result: {
        description:
          "Our management team offers a befitting tool that is a vital bridge between a project manager and the team. Itcan provides a complete suite of social collaboration, communication, and management tools for a unit.",
        resultsPoints1: [
          "Using Itcan make for more efficient teamwork by simplifying task management and fostering more effective communication and coordination among members of interdisciplinary groups. It helps keep track of projects and stimulates lively debate amongst team members.",
          "Weekly and monthly status reports give managers and executives an in-depth look at the near and far future.",
          "The purpose of Itcan is to help organizations improve employee performance and teamwork. This tool is time-saving since the user does not need to switch between various apps to complete a task. Users can access all the essential data in one convenient place.",
          "Intriguing project management methodology is at the heart of Itcan, providing users with the added benefit of higher output.",
        ],
      },
      clientFeedback: {
        clientNameAndDesignation: "MD Alayob, CEO, Itcan Inc",
        clientImage: "",
        feedback:
          "We interviewed different providers and selected 6sense because of two main factors: their proven track record of success developing businesses, and the leaderships passion and commitment to building great products.",
      },
    },
  },
  {
    id: "5",
    appName: "A gold buying- selling marketplace.",
    logo: "/uploads/jawhargy.svg",
    slug: "gold-market-place",
    imageSrc: "/uploads/gold.png",
    details: {
      coloredPartTitle: "Gold Marketplace-",
      regularTitle: "Buy, Sell And Stock Your Gold In Vault.",
      heroInfo: [
        {
          icon: "/uploads/users.svg",
          alt: "Developers",
          title: "5 DEVELOPERS",
          subtitle: "We had three developers, one SQA and one scrum master.",
        },
        {
          icon: "/uploads/layers1.svg",
          alt: "Sprints",
          title: "5 SPRINTS",
          subtitle: "This product ran for total 5 sprints.",
        },
        {
          icon: "/uploads/clock.svg",
          alt: "Duration",
          title: "5 MONTHS",
          subtitle:
            "The total duration of the development timeline was 5 months.",
        },
      ],
      overviewParagraphs: [
        "The gold marketplace is an authentic e-commerce gold marketplace based in the Middle East that provides pure gold online. This marketplace contains gold ranging in carat weight from 18 to 20 carats. Traders can also exchange precious physical metals like silver, platinum, and gold bars. Gold can be purchased and stored safely, giving users complete control over the metal’s monetary future.",
      ],
      overviewImage: "/uploads/overviewGold.webp",
      aboutParagraph:
        "Creating a gold marketplace online is sometimes risky. Our experts that are specialized in creating secure websites, have created this platform as legal, reliable, and secure. The Gold Marketplace is the ideal option for individuals and investors to invest in physical gold without having to worry about locating a place to keep it. There is a separate portion of the vault for tracking the transaction’s history. With industry-leading security and privacy requirements, this gold-trading platform provides exceptional online trading capabilities.",
      aboutInfo: [
        {
          icon: "/uploads/users.svg",
          alt: "Developers",
          title: "5 SPECIALISTS",
          subtitle: "Team size",
        },
        {
          icon: "/uploads/clock.svg",
          alt: "Duration",
          title: "5 MONTHS",
          subtitle: "Duration",
        },
        {
          icon: "/uploads/code.svg",
          alt: "Technologies",
          title: "NEST JS, NEXT JS, MONGODB",
          subtitle: "Technologies",
        },
        {
          icon: "/uploads/layers1.svg",
          alt: "Industry",
          title: "LOGISTIC",
          subtitle: "Industry",
        },
      ],
      solution: {
        description:
          "We designed this marketplace to be adaptable and versatile for all users. Admin can quickly create an account, manage user accounts and transactions, examine the user’s vault and transaction history, view invoices, and monitor transactions. With the creation of this platform, we aim to convey the ease, swiftness, and sophistication of current internet-based buying. Our team of developers thoroughly comprehended the client’s goals, and after examining all of these factors, they provided the client with a solution that perfectly met their specifications.",
        solutionImage: "/uploads/solutionGold.webp",
      },
      keyFeature: {
        keyFeaturesPoints1: [
          "Our high-class developers made this B2B marketplace by considering the problems faced while trading gold, hence making it more secure and trustworthy.",
          "Gold Marketplace offers a secure trading platform that enables sellers to buy pure gold bars confidentially.",
          "One can easily and without reluctance keep gold bars and sell them anytime desired.",
          "Our team created this marketplace with the intention of delivering both dependability and practicability. We set the marketplace smoothly and efficiently, so it is understandable without clutter or complex non-intuitive process steps.",
        ],
        keyFeaturesImage: "/uploads/keyfuncGold.webp",
      },
      result: {
        description:
          "Users of Gold Marketplace have access to cutting-edge e-commerce technology, such as the legal and trustworthy sale and purchase of pure gold. Our professional team worked on developing a robust and adaptable identity for the variety of marketing objectives and channels, as well as the UI/ UX design for the e-commerce website, in order to make the marketplace user-friendly, simple to use, functional, consistent, and aesthetically pleasing. This platform benefits both the owner and the user. The market offers a risk-free satisfaction guarantee, allowing sellers to confidently sell their gold.",
      },
      // clientFeedback: {
      //   clientNameAndDesignation: "",
      //   clientImage: "",
      //   feedback: "",
      // },
    },
  },
  {
    id: "6",
    appName: "An one stop wholeselling marketplace.",
    logo: "/uploads/kinetic.svg",
    slug: "kinetic-marketplace",
    imageSrc: "/uploads/kinetic.png",
    details: {
      coloredPartTitle: "Kinetic Marketplace-",
      regularTitle: "A Place That Makes Buyer And Seller Business Easier",
      heroInfo: [
        {
          icon: "/uploads/users.svg",
          alt: "Developers",
          title: "8 DEVELOPERS",
          subtitle: "We had 6 developers, one SQA and one scrum master.",
        },
        {
          icon: "/uploads/layers1.svg",
          alt: "Sprints",
          title: "12 SPRINTS",
          subtitle: "This product ran for total 12 sprints.",
        },
        {
          icon: "/uploads/clock.svg",
          alt: "Duration",
          title: "12 MONTHS",
          subtitle:
            "The total duration of the development timeline was 12 months.",
        },
      ],
      overviewParagraphs: [
        "Kinetic Marketplace is a beautifully designed eCommerce website. This marketplace is a global online multinational retailer for wholesale product buying and selling. It sells an extensive selection of reasonably priced goods and provides every consumer with a personalized and engaging experience. This online market’s distinctive feature is the auction function it offers to consumers. With the best offer system, shoppers can bite on a price to receive a good deal.",
      ],
      overviewImage: "/uploads/overviewKinetic.webp",
      aboutParagraph:
        "Our skilled team has simplified and rationalized this marketplace. After opening an account and building a storefront, users can instantly begin listing items on Kinetic Marketplace to launch their enterprises. This marketplace is the most adaptable platform available. Two users have access to this marketplace. The first user is the administrator or owner, whereas the second is the buyer or seller. Sellers will control product listings, shipping charges, and return procedures automatically. It is a marketplace for innovative and unique goods and concepts. There are a variety of business methods merchants can employ to offer things on the site.",
      aboutInfo: [
        {
          icon: "/uploads/users.svg",
          alt: "Developers",
          title: "8 SPECIALISTS",
          subtitle: "Team size",
        },
        {
          icon: "/uploads/clock.svg",
          alt: "Duration",
          title: "12 MONTHS",
          subtitle: "Duration",
        },
        {
          icon: "/uploads/code.svg",
          alt: "Technologies",
          title: "REACT, NODE JS, PYTHON",
          subtitle: "Technologies",
        },
        {
          icon: "/uploads/layers1.svg",
          alt: "Industry",
          title: "ECOMERCE",
          subtitle: "Industry",
        },
      ],
      solution: {
        description:
          "Our top-tier developers created this B2B marketplace by considering the challenges associated with the exchange of commodities, and we have made the interference, image uploading time, bidding, and account creation much simpler and more convenient. We’ve developed three distinct panels and three distinct types of user modules.",
        solutionsPoints1: [
          "In this market, the administrator may easily monitor the buyer and seller. Additionally, sellers can benefit from this platform by offering opportunities like the Product lot.",
          "To bid on the opportunity (product lot), purchasers must submit a signed legal business agreement.",
          "Sellers are notified immediately when their request is accepted or deleted.",
        ],
        solutionImage: "/uploads/solutionKinetic.webp",
      },
      keyFeature: {
        description:
          "Our professional team streamlines their workflow and makes their project user-friendly and accessible to all users. We have provided the ideal solutions to their requirements.",
        keyFeaturesPoints1: [
          "There are three distinct panels for each user.",
          "Customers can peruse several product categories",
          "Our experienced developers crafted an honest and trustworthy platform brimming with legitimate commercial procedures.",
        ],
        keyFeaturesPoints2: [
          "This transparent transaction management and secure account management",
          "We created a fast chat box for quick communication between buyers and sellers for the sake of convenience. The buyer can directly communicate with the seller. This attribute prevents order cancellation, encourages purchases, and enhances comprehension.",
        ],
        keyFeaturesImage: "/uploads/keyfuncKinetic.webp",
      },
      result: {
        description:
          "A kinetic marketplace is a valuable and authentic marketplace built to serve potential buyers and sellers. It is the ideal platform for businesspeople and merchants to build their online businesses. Users can benefit from an interface that is user-friendly, readily available, and simple to use for the optimum user experience.",
        resultsPoints1: [
          "Businesses may feel safe transacting on the most trusted and secure B2B e-commerce platform.",
          "We aim to create a modern and convenient e-commerce platform empowered by all the facilities that benefit each user.",
        ],
      },
      // clientFeedback: {
      //   clientNameAndDesignation: "",
      //   clientImage: "",
      //   feedback: "",
      // },
    },
  },
  {
    id: "7",
    appName: "Personalized media sharing platform.",
    logo: "/uploads/forgetmenot.svg",
    slug: "forget-me-not",
    imageSrc: "/uploads/forgetmenot.png",
    details: {
      coloredPartTitle: "Forget Me Not-",
      regularTitle:
        "Reliable Tool For Scheduling Messages And Automatic Future Delivery",
      heroInfo: [
        {
          icon: "/uploads/users.svg",
          alt: "Developers",
          title: "6 DEVELOPERS",
          subtitle: "We had 4 developers, one SQA and one scrum master.",
        },
        {
          icon: "/uploads/layers1.svg",
          alt: "Sprints",
          title: "11 SPRINTS",
          subtitle: "This product ran for total 11 sprints.",
        },
        {
          icon: "/uploads/clock.svg",
          alt: "Duration",
          title: "4.5 MONTHS",
          subtitle:
            "The total duration of the development timeline was 4.5 months.",
        },
      ],
      overviewParagraphs: [
        "Forget Me Not is a web-based tool that lets users send messages and memories privately to their contact list today for future delivery. It preserves users’ precious memories and shares their legacy and wisdom for tomorrow. It simply completes the user’s dearest goals before drawing their last breath. It allows users to upload customized messages, pictures, surprises, memories, and greetings and schedule delivery to send them to their loved ones. With this app, users can never miss a moment to celebrate special occasions. Users can stay on top of their minds with their relationships through this timely website. They can schedule a special surprise or message for their loved one’s upcoming celebrations.",
      ],
      overviewImage: "/uploads/overviewForget.png",
      aboutParagraph:
        "Our dedicated team began their process by collecting detailed information on the user’s wants and needs. When designing this app, we kept the site’s visitors’ feelings in mind. We conducted a series of interviews to understand why some people have difficulty expressing their emotions. Most of those who took part in the interviews were patients. They didn’t want to lose touch with those who cared about them even after they passed away. So, based on the insights gained from the interviews, our team of professionals has developed a responsive and easy-to-navigate website. We tested our application after learning about the problems faced by our potential users and developing a plan to address those difficulties. The final step is to upload the website to a server that is quick, safe, and scalable. With the help of a user-centered design process, we were able to create a layout for the website that was both functional and straightforward. Through our streamlined interface and intuitive menu structure, we make it easy for visitors to complete their intended tasks.",
      aboutInfo: [
        {
          icon: "/uploads/users.svg",
          alt: "Developers",
          title: "6 SPECIALISTS",
          subtitle: "Team size",
        },
        {
          icon: "/uploads/clock.svg",
          alt: "Duration",
          title: "4.5 MONTHS",
          subtitle: "Duration",
        },
        {
          icon: "/uploads/code.svg",
          alt: "Technologies",
          title: "REACT, NODE JS, PYTHON",
          subtitle: "Technologies",
        },
        {
          icon: "/uploads/layers1.svg",
          alt: "Industry",
          title: "PRODUCTIVITY",
          subtitle: "Industry",
        },
      ],
      solution: {
        solutionsPoints1: [
          "Forget Me Not is a relationship development website that allows users to create multiple events and employ them in any way they see fit. We made helpful solutions for users’ problems by digging deep to discover their pain points. Users can associate a date with an event using the event’s date and time fields.",
          "We have provided many options for customers to communicate emotions to their loved ones. Users can add text, photos, and videos to their events after setting the message and attaching it to a date-specific contact. The recipient receives an automatic notification and can download the text or attachments.",
        ],
        solutionImage: "/uploads/solutionForget.png",
      },
      keyFeature: {
        description:
          "Forget Me Not is a one-of-a-kind web-based application that helps users keep track of memorable occasions so they never miss a special moment. Our experienced team created this website to be safe and user-friendly, with a visually appealing layout, so users can browse without confusion and search less for what they need.",
        keyFeaturesPoints1: [
          "We carefully considered the user’s feelings and emotions while designing this website.",
          "Users can edit the event at any moment to add or remove memories.",
          "Users can schedule events for the upcoming year in advance to save time and avoid duplicating efforts.",
        ],
        keyFeaturesImage: "/uploads/keyfuncForget.png",
      },
      result: {
        description:
          "Forget Me Not is an innovative tool for expressing love and concern to those who matter most in one’s life.",
        resultsPoints1: [
          "We designed this app with consideration for the users’ feelings in mind, hoping that it will bring them happiness.",
          "We developed this app so that users may zero down on their tasks and get things done quickly and efficiently.",
          "We aim to increase user happiness by making the site more user-friendly, accessible, and effective regarding how it interacts with its visitors.",
          "Through the application of cutting-edge pricing strategies, we were able to develop a competitive yet reasonable pricing plan.",
        ],
      },
      clientFeedback: {
        clientNameAndDesignation: "Chris, CTO, Forget Me Not",
        clientImage: "",
        feedback:
          "The 6sense team exceeded our expectations. Their ability to adapt and solve complex problems was outstanding. We're thrilled with the results.",
      },
    },
  },
  {
    id: "8",
    appName: "Healthcare budget management.",
    logo: "/uploads/muncalogo.png",
    slug: "munca",
    imageSrc: "/uploads/munca.png",
    details: {
      coloredPartTitle: "Munca-",
      regularTitle: "Infallible Plan Management App For Managing Funds ",
      heroInfo: [
        {
          icon: "/uploads/users.svg",
          alt: "Developers",
          title: "6 DEVELOPERS",
          subtitle: "We had 4 developers, one SQA and one scrum master.",
        },
        {
          icon: "/uploads/layers1.svg",
          alt: "Sprints",
          title: "7 SPRINTS",
          subtitle: "This product ran for total 7 sprints.",
        },
        {
          icon: "/uploads/clock.svg",
          alt: "Duration",
          title: "3 MONTHS",
          subtitle:
            "The total duration of the development timeline was 3 months.",
        },
      ],
      overviewParagraphs: [
        "Munca is a flexible plan management app that helps users log their expenses and manage their budgets. Munca takes a different approach to the budget, using intelligent algorithms to manage and track user spending. The Munca app is connected to the bank account so that users can track the expenditure of their funds and easily categorize the expenses.",
        "According to research, disability affects 4.3 million Australians. About 50,000 Australians with Short-Term Disabilities or Long-Term Disabilities will have access to the National Disability Insurance Scheme over the next five years.The Australian government provides funds to the parents of disabled children every year.Often, financial literacy leads to poor financial decisions, impulsive spending, less security, and more stress. This convenient software assists parents and fund holders in managing their insurance funds.",
        "This sustainable app helps users to track their funds, incomes, and expenditures. This app assists fund holders in monitoring their funding, budget making, and appointments. Plan managers can safely make and store the invoices in the app to fund their future expenditures and savings.",
      ],
      overviewImage: "/uploads/overviewMunca.webp",
      aboutParagraph:
        "Our experienced team started their work with a design thinking process. This process helps us to come up with the best possible solution for users to solve their problems. Then we proceed to the next step of user research. We prepared a set of questions to help us find and validate the problems that users face related to our problem statement. After successfully interviewing, we analyse the data using an affinity map method. We use this method to find patterns to help develop solutions for the problems. We designed a user flow to assist users in navigating the system. We created this app using modern technologies like Python, React, and Node.js. While developing this app, we used an Application Programme Interface(API) to add custom functionalities and enhance the app’s privacy and security. After designing, we did an on-site usability test for our application, where we showed our application to 10 users for usability tests. It turned out to be a successful and productive app.",
      aboutInfo: [
        {
          icon: "/uploads/users.svg",
          alt: "Developers",
          title: "6 SPECIALISTS",
          subtitle: "Team size",
        },
        {
          icon: "/uploads/clock.svg",
          alt: "Duration",
          title: "3 MONTHS",
          subtitle: "Duration",
        },
        {
          icon: "/uploads/code.svg",
          alt: "Technologies",
          title: "SWIFT, NODE JS",
          subtitle: "Technologies",
        },
        {
          icon: "/uploads/layers1.svg",
          alt: "Industry",
          title: "HEALTHCARE",
          subtitle: "Industry",
        },
      ],
      solution: {
        description:
          "Our focus with a solution was to give users full customization to make a budget and provide efficient information regarding their finances on the home screen so that they can save time knowing their financial situation.",
        solutionsPoints1: [
          "Users can set their funding goals by making reports and budgets.",
          "Most iOS applications lacked a single platform for report making and budget making, but our experts worked on this and made a helpful app that provides both facilities.",
          "We enhanced the app’s capabilities by adding new features like easy onboarding on the app.",
          "We conducted different interviews and collected data from various fields of work. After interviewing, we analyse the data and build the app according to the user’s demand.",
          "We have made the user journey centralized and coordinated with customer experience insights.",
        ],
        solutionImage: "/uploads/solutionMunca.webp",
      },
      keyFeature: {
        description:
          "Munca Mobile App is a robust plan management app that allows users to create and customize their budgets and track their funds and expenditures.",
        keyFeaturesPoints1: [
          "An easy onboarding process made it possible to introduce the software to the user quickly.",
          "We have created user-friendly and functional interfaces, allowing users to navigate the application efficiently.",
          "Munca is a well-designed app with an easy-to-navigate interface that doesn’t frustrate users and features that assure them their personal information is protected.",
        ],
        keyFeaturesPoints2: [
          "Munca allows users to create and generate a professional report that users can share from their iOS mobile phone with anyone.",
          "Users can easily link all their bank accounts and will track all the transactions and expenses in one place.",
          "Admin can delegate app management to an assistant so that they can focus their efforts on other tasks.",
        ],
        keyFeaturesImage: "/uploads/keyfuncMunca.webp",
      },
      result: {
        description:
          "Our experienced and dedicated team has developed a high-quality fund management app for iOS users.",
        resultsPoints1: [
          "Our experienced and dedicated team has developed a high-quality fund management app for iOS users.",
          "The Munca app is a great tool to get the whole picture of financial status. Users can examine their monetary transactions daily, weekly, monthly, or yearly. The user can then generate reports of past or current financial states and share these with others whenever they like.",
          "Munca is a flawless software that allows users to achieve their business objectives successfully.",
        ],
      },
      // clientFeedback: {
      //   clientNameAndDesignation: "",
      //   clientImage: "",
      //   feedback: "",
      // },
    },
  },
  {
    id: "9",
    appName: "Accounting for Small businesses.",
    logo: "/uploads/clouding.svg",
    slug: "cloud-accounting",
    imageSrc: "/uploads/clouding.png",
    details: {
      coloredPartTitle: "Cloud Accounting-",
      regularTitle:
        "Convenient Account Management App For Professional Accounting Solutions",
      heroInfo: [
        {
          icon: "/uploads/users.svg",
          alt: "Developers",
          title: "9 DEVELOPERS",
          subtitle: "We had 7 developers, one SQA and one scrum master.",
        },
        {
          icon: "/uploads/layers1.svg",
          alt: "Sprints",
          title: "24 SPRINTS",
          subtitle: "This product ran for total 24 sprints.",
        },
        {
          icon: "/uploads/clock.svg",
          alt: "Duration",
          title: "8 MONTHS",
          subtitle:
            "The total duration of the development timeline was 8 months.",
        },
      ],
      overviewParagraphs: [
        "Cloud Accounting is a robust account management platform that can automate financial services’ marketing operations. It is an efficient accounting tool that allows businesses to handle their transactions, payroll, debit, and credit. This practical resource allows the user to keep track of everything in one convenient location. Cloud accounting is helpful for small firms, accountants, and bookkeepers because of its powerful invoicing capabilities and accounting facilities.",
      ],
      overviewImage: "/uploads/overviewCloud.webp",
      aboutParagraph:
        "Our experienced team’s goal was to create an efficient accounting solution that assists users of all professional categories and saves them time from tedious paperwork. We researched the websites of the best accounting companies in the globe to determine where Cloud Accounting stands among accounting software. This helps us identify the most important aspects of accounting software and where they may be enhanced. Once the primary functions were determined, we began interviewing and surveying to ascertain what the end users wanted. We created a few personas based on user research and used them throughout the software development process. We separately examined and brainstormed the most effective solutions after recognizing the users’ needs, problems, and frustrations. Once we had a firm grasp of the target audience’s needs, we generated ideas for potential solutions and tested them via prototyping. All of our top-notch thinking went into the design of this software. We make it so that people can have a pleasant and adaptable experience. Once everything is flawlessly crafted, we take it to the testing phase. We were able to learn a lot from the testing and put that knowledge to good use. Thus, we created this very versatile, easy-to-use software to address all concerns.",
      aboutInfo: [
        {
          icon: "/uploads/users.svg",
          alt: "Developers",
          title: "9 SPECIALISTS",
          subtitle: "Team size",
        },
        {
          icon: "/uploads/clock.svg",
          alt: "Duration",
          title: "8 MONTHS",
          subtitle: "Duration",
        },
        {
          icon: "/uploads/code.svg",
          alt: "Technologies",
          title: "NEST JS, NEXT JS, MONGODB",
          subtitle: "Technologies",
        },
        {
          icon: "/uploads/layers1.svg",
          alt: "Industry",
          title: "FINANCE",
          subtitle: "Industry",
        },
      ],
      solution: {
        description:
          "Our skilled developers use cutting-edge tools like Node.js, Python, and React to build this flexible and adaptable software.",
        solutionsPoints1: [
          "Cloud accounting provides many sales tracking capabilities, such as an up-to-date dashboard, contact management, account charts, and sales management.",
          "The system allows firms to analyze their financial health by recording transactions and maintaining consumer databases.",
          "With its aid, users can better manage their offerings to customers. As a result, users can divide their accounts into other categories, such as inventory, non-inventory, items, and services.",
          "It streamlines managing accounts by providing access to various vendors simultaneously.",
        ],
        solutionImage: "/uploads/solutionCloud.webp",
      },
      keyFeature: {
        description:
          "Cloud accounting is an ideal accounting software platform for a service-based small business since it offers many features to potential consumers.",
        keyFeaturesPoints1: [
          "Adding a new bank account is simple and quick, and users can add as many accounts as they need to keep track of their company’s activities and cash flow.",
          "With this specialized software, users can easily handle their sales taxes and keep tabs on all their tax-related activities.",
          "With the help of multi-user access, the admin can easily create and manage new user roles based on the level of access.",
          "Our professional team developed this software based on advanced, industry-recognized security safeguards to keep financial data private and protected.",
        ],
        keyFeaturesImage: "/uploads/keyfuncCloud.webp",
      },
      result: {
        description:
          "Our specialists developed Cloud Accounting as the optimal answer for handling any sales account. Cloud accounting is a comprehensive business management software that helps the user manage everyday tasks, and lets business owners see the complete picture of the work progress. Everything related to accounting can be done in Cloud Accounting, from setting up multiple vendors to juggling various bank accounts.",
        resultsPoints1: [
          "It takes care of several issues simultaneously, such as keeping track of individual companies and transactions.",
          "This software has many helpful functions that simplify ‌ processing payroll for employees.",
          "It allows users to improve functions, manage multiple vendors and their inventory competently and keep a tab on every vendor.",
          "It is the best overall accounting software for keeping and managing the bank accounts of multiple companies in a single platform.",
          "It is a centralized platform that manages multiple companies as individual accounts on a common forum.",
        ],
      },
      clientFeedback: {
        clientNameAndDesignation: "",
        clientImage: "",
        feedback: "",
      },
    },
  },
  {
    id: "10",
    appName: "Identifying emotions via voice analysis.",
    logo: "/uploads/introspection.svg",
    slug: "introspection",
    imageSrc: "/uploads/introspection.png",
    details: {
      coloredPartTitle: "Introspection-",
      regularTitle: "Fastest Mood Tracking AI App",
      heroInfo: [
        {
          icon: "/uploads/users.svg",
          alt: "Developers",
          title: "7 DEVELOPERS",
          subtitle: "We had 5 developers, one SQA and one scrum master.",
        },
        {
          icon: "/uploads/layers1.svg",
          alt: "Sprints",
          title: "7 SPRINTS",
          subtitle: "This product ran for total 7 sprints.",
        },
        {
          icon: "/uploads/clock.svg",
          alt: "Duration",
          title: "5 MONTHS",
          subtitle:
            "The total duration of the development timeline was 5 months.",
        },
      ],
      overviewParagraphs: [
        "Introspection is a mood tracker AI app designed to help users manage their daily routines and improve their mental health. With enhanced features of recording moods by voice, users can easily record their emotions by recording their voices. This advanced AI app can immediately identify the user’s mood based on the tone of their voice. For illustration purposes, users are experiencing boredom today. They record their voice, and the screen displays the message, “you are bored today.”",
      ],
      overviewImage: "/uploads/overviewIntrospection.png",
      aboutParagraph:
        "Introspection is an AI-powered mood-tracking app that acts as an aid for those struggling with their thoughts and feelings. Using the app, people can keep track of their internal sensations and share an overview of their emotions. This app utilizes AI to help users track moods and emotional health. Our professional team initially looked into an algorithm for detecting a user’s intentions to create a user-friendly interface and give clients a better experience when using the app.",
      aboutInfo: [
        {
          icon: "/uploads/users.svg",
          alt: "Developers",
          title: "7 SPECIALISTS",
          subtitle: "Team size",
        },
        {
          icon: "/uploads/clock.svg",
          alt: "Duration",
          title: "5 MONTHS",
          subtitle: "Duration",
        },
        {
          icon: "/uploads/code.svg",
          alt: "Technologies",
          title: "REACT, NODE JS, PYTHON",
          subtitle: "Technologies",
        },
        {
          icon: "/uploads/layers1.svg",
          alt: "Industry",
          title: "EDUCATION",
          subtitle: "Industry",
        },
      ],
      solution: {
        description:
          "The goal of Introspection is to facilitate the discovery of one’s emotional state through voice recordings. Our professional team created this helpful mood-tracking software, which features a user-centered design and an approachable interface so that users will feel comfortable trusting it as a personal assistant. Even though most people stayed indoors during covid-19, keeping a daily mood journal was still essential. Thus, the Introspection app was a great boon at the right time. Users can keep a daily mood log and receive monthly reports, and In the future, you can utilize them to demonstrate to future generations what it was like to live during a pandemic.",
        solutionImage: "/uploads/solutionIntrospection.png",
      },
      keyFeature: {
        description:
          "Introspection is a specialized mood-tracking application that allows users to recognize and track their emotions without the hassle of typing words. Introspection is created by offering a simple design and many unique features to help users improve and manage their quality of life. It provides a variety of different facilities to its potential users.",
        keyFeaturesPoints1: [
          "Users do not need to write lengthy, exhausting sentences to express their emotions. The user’s emotional state can be instantly determined by simply speaking into the microphone.",
          "A high-quality voice recording function eliminates the need for users to worry about their voices changing pitch or distorting as they record.",
          "The user-friendly interface allows users to view mood reports in daily, weekly, or monthly charts to help them identify patterns in their moods.",
          "Introspection is a private and secure mood tracker that doesn’t share user data with third parties.",
          "Introspection is a mood tracker using cutting-edge AI technology that generates a monthly report detailing the user’s emotional state.",
          "Users can create daily, weekly, or monthly reports to track their moods. In Introspection, users can examine their data for the past 12 months in the form of a pie chart displaying daily or monthly patterns or a pie chart showing the category or outcome of their emotions.",
          "The app offers several ways to analyze the data. To help users better manage their mental health, we integrated a calendar into the app as a helpful tool. Users can know about the associated feelings on any given day with only a few taps. The app’s “Statistics and Calendar” section allows users to track their emotional and behavioral states across time, making it easier to see trends. When a user feels down, they can look back on their past emotions and use that information to help them manage their depression.",
        ],
        keyFeaturesImage: "/uploads/keyfuncIntrospection.png",
      },
      result: {
        description:
          "Introspection software is among the most convenient tools for maintaining mental states. This app offers a “Calendar” feature that keeps track of one’s emotional and behavioral states throughout time. Users can look back on their former emotions for insight into how to handle their current depression. They can also utilize these tools to convey to future generations how they felt or how they dealt with the emotional turmoil of a pandemic. Aside from the covid pandemic, the app also allows users to log their emotions daily, which can help maintain positive mental health.",
      },
      // clientFeedback: {
      //   clientNameAndDesignation: "",
      //   clientImage: "",
      //   feedback: "",
      // },
    },
  },
  {
    id: "11",
    appName: "Effortlessly share audio recordings.",
    logo: "/uploads/voom.svg",
    slug: "voom",
    imageSrc: "/uploads/voom.png",
    details: {
      coloredPartTitle: "Voom Now-",
      regularTitle: "To Get More Out Of Your Communication",
      heroInfo: [
        {
          icon: "/uploads/users.svg",
          alt: "Developers",
          title: "2 DEVELOPERS",
          subtitle: "We had 2 developers, one SQA and one scrum master.",
        },
        {
          icon: "/uploads/layers1.svg",
          alt: "Sprints",
          title: "2 SPRINTS",
          subtitle: "This product ran for total 2 sprints.",
        },
        {
          icon: "/uploads/clock.svg",
          alt: "Duration",
          title: "2 MONTHS",
          subtitle:
            "The total duration of the development timeline was 2 months.",
        },
      ],
      overviewParagraphs: [
        "VoomNow is an easy-to-use and portable web-based audio recording tool. Voom Now is a convenient application that works in a user’s web browser. This helpful app lets users rapidly record and share high-quality audio clips (up to five minutes long) across all major social media sites. Users of Voom can record audio and download the recorded mp3 in High Quality or upload it to the online library.",
      ],
      overviewImage: "/uploads/overviewVoom.png",
      aboutParagraph:
        "Our professional team developed a simple and minimal UI design that facilitates all the essential elements the user needs to have a cognitive experience. Our goal is to ensure that every one of our Voom Now customers are delighted with our service. Because of its clean and uncluttered user interface, this application gives off an air of professionalism and makes its use a breeze.",
      aboutInfo: [
        {
          icon: "/uploads/users.svg",
          alt: "Developers",
          title: "2 SPECIALISTS",
          subtitle: "Team size",
        },
        {
          icon: "/uploads/clock.svg",
          alt: "Duration",
          title: "2 MONTHS",
          subtitle: "Duration",
        },
        {
          icon: "/uploads/code.svg",
          alt: "Technologies",
          title: "NEST JS, NEXT JS, MONGODB",
          subtitle: "Technologies",
        },
        {
          icon: "/uploads/layers1.svg",
          alt: "Industry",
          title: "PRODUCTIVITY",
          subtitle: "Industry",
        },
      ],
      solution: {
        description:
          "Based on the results of our surveys, our knowledgeable staff has concluded that there is a significant demand for a comprehensive platform that can be used for various purposes, including recording, sharing, and securing their data. So, our developers designed a neat tool with a necessary set of instruments for recording and sharing in audio format.",
        solutionsPoints1: [
          "Our hardworking team is concerned about the user’s needs and privacy, so we created this helpful tool to secure and encrypt information so the user can only access it.",
          "In contrast to other online voice recorders that limit users to a certain amount of recordings, voom now allows users to record any audio as often as they wish.",
          "After recording the voice, the user can quickly download the HD audio and access it anytime.",
        ],
        solutionImage: "/uploads/solutionVoom.png",
      },
      keyFeature: {
        description:
          "Voom Now is an online voice recorder that can record high-quality MP3 sounds directly in a browser. It’s simple to use and allows users to capture audio using either an internal or external microphone. After that, users can download and share the audio recording in any format.",
        keyFeaturesPoints1: [
          "Voom now has one of the minimal and uncluttered user interfaces, allowing users to get started with audio recordings with just one click.",
          "This efficient tool provides a quick and easy way to record audio and share them instantly.",
          "Our professional developers have refined the tool by integrating it with Slack and other social platforms.",
          "With a recording large clips facility, this tool also provides a lifetime session to record audio.",
        ],
        keyFeaturesImage: "/uploads/keyfuncVoom.png",
      },
      result: {
        description:
          "Voom Now is a no-frills voice recorder for online use. The ease of use is a point of pride for Voom Now. There are only three easy steps involved in using this simple tool. To begin recording, users press the red button; once finished, they can play back their clip, save it, and even share it with others. There is no limit on the number of times a user can record and no waiting for the file to upload.",
        resultsPoints1: [
          "Voom now isn’t a data-selling online voice recorder. Voom Now is a quick and safe internet service that allows users to record endless voices without worrying about their personal information being made public. Users have exclusive access to all of their data.",
          "Voom now Voice Recorder is a feature-packed yet an easy-to-use app that takes sound recording to the next level. The variety of features suggests the ultimate user experience is an easy way to record voice in a high-quality format.",
          "Its multiple integrations make it miles ahead of any standard recording app.",
        ],
      },
      // clientFeedback: {
      //   clientNameAndDesignation: "",
      //   clientImage: "",
      //   feedback: "",
      // },
    },
  },

  {
    id: "12",
    appName: "All-in-one Quran app for daily guidance.",
    logo: "/uploads/quran.svg",
    slug: "quran-touch",
    imageSrc: "/uploads/quran.png",
    details: {
      coloredPartTitle: "Quran Touch-",
      regularTitle: "Convenient Number 1 iOS Islamic App",
      heroInfo: [
        {
          icon: "/uploads/users.svg",
          alt: "Developers",
          title: "7 DEVELOPERS",
          subtitle: "We had 5 developers, one SQA and one scrum master.",
        },
        {
          icon: "/uploads/layers1.svg",
          alt: "Sprints",
          title: "13 SPRINTS",
          subtitle: "This product ran for total 13 sprints.",
        },
        {
          icon: "/uploads/clock.svg",
          alt: "Duration",
          title: "7 MONTHS",
          subtitle:
            "The total duration of the development timeline was 7 months.",
        },
      ],
      overviewParagraphs: [
        "Quran Touch is a comprehensive all-in-one iOS app that offers users a real Quran reading experience. This app helps users to read the Quran anywhere without the internet and listen to the Quran in different Qari voices, qibla directions, prayer reminders, and prayer timing. The goal of our experienced team was to create an app that would enable users to listen to the Quran whenever they want without carrying around a physical copy of the holy book. Quran touch is a collection of the world’s finest Quran reciters, boasting an innovative and intuitive interface and outstanding features.",
      ],
      overviewImage: "/uploads/overviewQuran.png",
      aboutParagraph:
        "Quran Touch is a fully-featured iOS app. Reading or listening to the Quran in this format on an iOS device is a unique experience. The application has a simple and intuitive interface, so it’s incredibly easy to use. The leading Muslim lifestyle app with the most accurate prayer times, empowering and helping millions of Muslims with listening to Quran. This app provides a convenient and flexible interface for a smooth user journey. This handy tool can be customized to users reading preferences with an extensive range of available themes, each of which comes equipped with a different set of functionality and a different aesthetic.",
      aboutInfo: [
        {
          icon: "/uploads/users.svg",
          alt: "Developers",
          title: "7 SPECIALISTS",
          subtitle: "Team size",
        },
        {
          icon: "/uploads/clock.svg",
          alt: "Duration",
          title: "7 MONTHS",
          subtitle: "Duration",
        },
        {
          icon: "/uploads/code.svg",
          alt: "Technologies",
          title: "REACT, NODE JS, PYTHON",
          subtitle: "Technologies",
        },
        {
          icon: "/uploads/layers1.svg",
          alt: "Industry",
          title: "EDUCATION",
          subtitle: "Industry",
        },
      ],
      solution: {
        description:
          "Quran Touch is a mobile application available on both Android and iOS devices, which was featured in the Apple Store in 2019. Our experienced team conducted thorough market research to develop a user-friendly app that perfectly serves its purpose.",
        solutionsPoints1: [
          "To make the Quran accessible to users of all ages, Quran Touch offers a variety of Quran book volumes.",
          "The audio Quran translation accompanied by a textual one is the most helpful feature of this software. If the target audience cannot read the translation, they can readily hear it.",
        ],
        solutionsPoints2: [
          "Quran touch offers authenticity and credibility by accurately finding the Qibla direction and angles at any place or location.",
          "This reliable app provides the approximate times of Islamic prayers worldwide according to their local time zone and also notifies them at the time of each prayer.",
          "There are free and premium membership options available for anyone interested in using this helpful tool.",
        ],
        solutionImage: "/uploads/solutionQuran.png",
      },
      keyFeature: {
        description:
          "Our top-class developers built this fantastic app to help Muslims to perform daily rituals such as reading the Holy Quran, Knowing the exact timing of prayers, using Asma e Husna with translation, using an accurate Qibla locator, and connecting with a large dua community.",
        keyFeaturesPoints1: [
          "Users can quickly resume their recitation anytime by using the bookmark option, which helps them continue from where they stopped.",
          "We focus on the user’s convenience, so we added the ability to read the Quran without an internet connection. This way, if a user is not near an internet connection, they can still read the Quran offline.",
          "Hundreds of Muslims can get to know each other better through this app’s prayer community feature, which lets everyone come together on a single platform.",
          "This app has top-class Qari recitations with High-Quality audio that enables users to listen and correct their pronunciation by clearly listening to the recitations.",
          "This app is for all Muslims and practitioners of the Islamic Religion worldwide to gain free experience and take advantage of the app.",
          "The Quran touch app is the ground of all the features required by the Muslim community to perform daily spiritual tasks. Users can get the benefit of all the features under one roof.",
        ],
        keyFeaturesImage: "/uploads/keyfuncQuran.png",
      },
      result: {
        description:
          "Quran Touch is the world’s first fully-featured class app. It has many features and facilities that make it easy for users to read the Quran and do other religious tasks.",
        resultsPoints1: [
          "This app brings the large community of Muslims close together by a prayer community where everyone worldwide can participate in the dua.",
          "This app provides the most accurate Prayer timings based on user location, with prompt notifications and alarms for prayer.",
          "We developed a user-friendly interface for this app so that users can easily access all the essential features of this app.",
        ],
      },
      clientFeedback: {
        clientNameAndDesignation: "Omar Taha, CEO, Quran Touch Inc.",
        clientImage: "",
        feedback:
          "The best thing about them is their commitment to the deadlines & smooth communication. We finished everything on time. It was a great experience.",
      },
    },
  },
];

const sampleTeamGalleries = [
  {
    title: "Dedicated Department workstation",
    image: "/uploads/gallery1.jpg",
  },
  {
    title: "Cafeteria",
    image: "/uploads/gallery2.png",
  },
  {
    title: "Fun playtime",
    image: "/uploads/gallery3.jpg",
  },
  {
    title: "Workshop",
    image: "/uploads/gallery4.jpg",
  },
  {
    title: "Party & Celebration",
    image: "/uploads/gallery9.jpg",
  },
  {
    title: "Awards",
    image: "/uploads/gallery6.jpg",
  },
];

const seedDatabase = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI environment variable is not defined");
    }

    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    await Project.insertMany(sampleProjects);
    console.log("Sample projects inserted");

    await TeamGallery.insertMany(sampleTeamGalleries);
    console.log("Sample team galleries inserted");

    await mongoose.connection.close();
    console.log("Connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
