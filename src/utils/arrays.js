import { BsFillGridFill } from "react-icons/bs";
import { AiFillBell, AiFillHome, AiFillMail, AiFillNotification } from "react-icons/ai";
import { FaBook, FaBookOpen, FaDonate, FaEnvelope, FaHammer, FaHandHoldingUsd, FaHome, FaListUl, FaMailBulk, FaMoneyBill, FaNetworkWired, FaNewspaper, FaPlus, FaPlusCircle, FaSpeakerDeck, FaTv, FaUsers } from "react-icons/fa";
import { lightPrimaryColor } from "./colors";

export const menuItems = [
  { name: "Dashboard", icon: <FaHome   style={{ color:"#ffffff80" }} />, path: "dashboard",authorized:["Admin","Alumni","Moderator"] },
  { name: "Projects", icon: <FaHammer   style={{ color:"#ffffff80" }} />, path: "projects",authorized:["Alumni","Moderator"] },
  { name: "Donations", icon: <FaDonate   style={{ color:"#ffffff80" }} />, path: "donation",authorized:["Admin"] },
  { name: "General News", icon: <FaNewspaper  style={{ color:"#ffffff80" }} />, path: "general-news",authorized:["Admin"] },
  { name: "Job opportunities", icon: <FaNetworkWired   style={{ color:"#ffffff80" }} />, path: "school-job",authorized:["Alumni","Moderator"] },
  { name: "School News", icon: <FaTv   style={{ color:"#ffffff80" }} />, path: "news",authorized:["Alumni","Moderator"] },
  { name: "School Events", icon: <FaSpeakerDeck   style={{ color:"#ffffff80" }} />, path: "events",authorized:["Alumni","Moderator"] },
  { name: "Schools ", icon: <FaBookOpen   style={{ color:"#ffffff80" }} />, path: "schools",authorized:["Admin"] },
  { name: "School Alumni", icon: <FaUsers   style={{ color:"#ffffff80" }} />, path: "alumni",authorized:["Alumni","Moderator"] },
  { name: "Users", icon: <FaUsers   style={{ color:"#ffffff80" }} />, path: "users",authorized:["Admin"] },
  { name: "Inquiries", icon: <FaMailBulk   style={{ color:"#ffffff80" }} />, path: "inquiries",authorized:["Admin"] },
  { name: "In memorium", icon: <FaPlusCircle   style={{ color:"#ffffff80" }} />, path: "school-memorium",authorized:["Alumni","Moderator"]},
  { name: "Notifications", icon: <AiFillBell   style={{ color:"#ffffff80" }} />, path: "notification",authorized:["Admin","Moderator"]}
];

export const navbaritems = [
  {name:"Home",path:"/"},
  {name:"About us",path:"/about-us"},
  {name:"Leadership",path:"/leadership"},
  {name:"News & Events",path:"/news"},
  {name:"Community members",path:"/members"},
  {name:"Contact us",path:"/contact"},
];

export const whatwedo = [
  'Networking and benchmarking with other alumni organizations',
  'Opportunity to pool finances for Community activities through the Alumni Endowment Fund',
  'Establishing Alumni Organizations in Public Primary and Secondary Learning Institutions',
  'Partnership and engagement with respective Government ministries and agencies to address education-related policies',
  'Training for alumni leadership and advocacy',
  'Build and strengthen the operational and governance capacity of alumni associations'
];
export const opportunitiesArray = [
  {
    title: 'Register A School & Attract Alumni',
    description: 'Register your school today and create opportunities for alumni to connect, collaborate, and contribute to the growth of your institution.',
    link: 'Read More'
  },
  {
    title: 'Become A Member Of The Community',
    description: 'Join our vibrant community and unlock a world of opportunities for learning, networking, and personal growth.',
    link: 'Read More'
  },
  {
    title: 'Engage With Your Community And Share Opportunities, Jobs, Events And Even Stories',
    description: 'Be an active participant in your community by sharing exciting opportunities, job listings, upcoming events, and inspiring stories.',
    link: 'Read More'
  }
];
export const visionMissionValues = [
  {
    title: 'Our Vision',
    description: 'Improve the standard of education in Tanzania',
    color:"#E0EBFF"
  },
  {
    title: 'Our Mission',
    description: 'Empower the community to improve the standards of Tanzania education through digital collaboration',
    color:lightPrimaryColor
  },
  {
    title: 'Core Values',
    description: 'Service, Integrity, Community, and Education',
    color:"#EEFFE0"
  },
];

export const communityMembers = [
  {
    image:"/linda.jpg",
    name: 'Linda Riwa',
    school: 'Kibaha Secondary School',
    class: 'Class Of 2017-2018',
    designation: 'Consumer Director - Vodacom-PLC'
  },
  {
    image:"/michael.jpg",
    name: 'Michael Mungure',
    school: 'Tabora Boys School',
    class: 'Class Of 2012-2013',
    designation: 'Treasury & Trade Solutions Head-CTI'
  },
  {
    image:"/shao.jpg",
    name: 'Alfred Shao',
    school: 'Minaki Secondary School',
    class: 'Class Of 2017-2018',
    designation: 'Director - NMB BANK'
  },
  {
    image:"/anand.jpg",
    name: 'Anand Barchha',
    school: 'Elboru Secondary School',
    class: 'Class Of 2012-2013',
    designation: 'Director-Prime Regional Supplies'
  },
  {
    image:"/nsajigwa.jpg",
    name: 'Nsajigwa Kabigi',
    school: 'Musoma Technical School',
    class: 'Class Of 2017-2018',
    designation: ''
  }
];
export const contributions = [
  {
    name: 'John Doe',
    amount: 1000,
    createdAt: '2022-09-15',
  },
  {
    name: 'Jane Smith',
    amount: 500,
    createdAt: '2022-07-01',
  },
  {
    name: 'Michael Johnson',
    amount: 2500,
    createdAt: '2022-11-10',
  },
  {
    name: 'Emily Davis',
    amount: 750,
    createdAt: '2022-06-01',
  },
  {
    name: 'David Brown',
    amount: 200,
    createdAt: '2023-02-20',
  },
  // Add more contribution objects as needed...
];

export const projectsData = [
  {
    name: 'E-commerce Website',
    description: 'Developed a responsive e-commerce website with user authentication, product catalog, shopping cart functionality, and secure payment integration.',
    duration: '3 months',
    createdDate: '2022-09-15',
  },
  {
    name: 'Mobile Expense Tracker App',
    description: 'Built a mobile application that allows users to track their expenses, categorize transactions, set budgets, and generate expense reports.',
    duration: '2 months',
    createdDate: '2022-07-01',
  },
  {
    name: 'Data Analysis Dashboard',
    description: 'Created an interactive dashboard for data analysis and visualization, enabling users to explore and gain insights from large datasets.',
    duration: '4 months',
    createdDate: '2022-11-10',
  },
  {
    name: 'Social Media Marketing Campaign',
    description: 'Designed and executed a social media marketing campaign to increase brand awareness and engage with the target audience across multiple platforms.',
    duration: '1 month',
    createdDate: '2022-06-01',
  },
  {
    name: 'AI Chatbot Integration',
    description: 'Integrated an AI-powered chatbot into an existing customer support system, improving response times and enhancing the overall user experience.',
    duration: '2 weeks',
    createdDate: '2023-02-20',
  },
  // Add more project objects as needed...
];
export const cities = [
  {
    city: 'Arusha',
    region: 'Arusha',
    municipals: ['Arusha City'],
  },
  {
    city: 'Dar es Salaam',
    region: 'Dar es Salaam',
    municipals: ['Ilala', 'Kinondoni', 'Temeke', 'Kigamboni', 'Ubungo'],
  },
  {
    city: 'Dodoma',
    region: 'Dodoma',
    municipals: ['Dodoma City'],
  },
  {
    city: 'Geita',
    region: 'Geita',
    municipals: ['Geita Town', 'Bukombe'],
  },
  {
    city: 'Iringa',
    region: 'Iringa',
    municipals: ['Iringa Municipal', 'Iringa District'],
  },
  {
    city: 'Kagera',
    region: 'Kagera',
    municipals: ['Bukoba Municipal', 'Biharamulo', 'Karagwe', 'Misenyi', 'Missenyi', 'Muleba', 'Ngara'],
  },
  {
    city: 'Katavi',
    region: 'Katavi',
    municipals: ['Mpanda Town', 'Mlele'],
  },
  {
    city: 'Kigoma',
    region: 'Kigoma',
    municipals: ['Kigoma-Ujiji Municipal', 'Kasulu', 'Kakonko', 'Buhigwe', 'Uvinza'],
  },
  {
    city: 'Kilimanjaro',
    region: 'Kilimanjaro',
    municipals: ['Moshi Municipal', 'Hai', 'Siha', 'Rombo', 'Mwanga'],
  },
  {
    city: 'Lindi',
    region: 'Lindi',
    municipals: ['Lindi Municipal', 'Kilwa', 'Liwale', 'Nachingwea', 'Ruangwa'],
  },
  {
    city: 'Manyara',
    region: 'Manyara',
    municipals: ['Babati Town', 'Mbulu', 'Hanang', 'Simanjiro', 'Kiteto'],
  },
  {
    city: 'Mara',
    region: 'Mara',
    municipals: ['Musoma Municipal', 'Bunda', 'Tarime', 'Butiama', 'Serengeti', 'Rorya'],
  },
  {
    city: 'Mbeya',
    region: 'Mbeya',
    municipals: ['Mbeya City', 'Rungwe', 'Kyela', 'Mbarali', 'Chunya'],
  },
  {
    city: 'Morogoro',
    region: 'Morogoro',
    municipals: ['Morogoro Municipal', 'Kilosa', 'Gairo', 'Kilombero', 'Ulanga', 'Malinyi', 'Ifakara'],
  },
  {
    city: 'Mtwara',
    region: 'Mtwara',
    municipals: ['Mtwara Municipal', 'Masasi', 'Nanyumbu', 'Tandahimba', 'Newala'],
  },
  {
    city: 'Mwanza',
    region: 'Mwanza',
    municipals: ['Mwanza City', 'Ilemela', 'Nyamagana', 'Misungwi', 'Kwimba', 'Magu', 'Ukerewe'],
  },
  {
    city: 'Njombe',
    region: 'Njombe',
    municipals: ['Njombe Town', 'Makambako'],
  },
  {
    city: 'Pemba Kusini',
    region: 'Zanzibar Urban/West',
    municipals: ['Zanzibar City'],
  },
  {
    city: 'Pemba Kaskazini',
    region: 'Zanzibar North',
    municipals: ['Wete'],
  },
  {
    city: 'Pwani',
    region: 'Pwani',
    municipals: ['Kibaha Town', 'Kisarawe', 'Mkuranga', 'Rufiji', 'Bagamoyo'],
  },
  {
    city: 'Rukwa',
    region: 'Rukwa',
    municipals: ['Sumbawanga Town', 'Nkasi'],
  },
  {
    city: 'Ruvuma',
    region: 'Ruvuma',
    municipals: ['Songea Municipal', 'Tunduru', 'Namtumbo', 'Nyasa', 'Mbinga'],
  },
  {
    city: 'Shinyanga',
    region: 'Shinyanga',
    municipals: ['Shinyanga Municipal', 'Kahama Town', 'Kishapu', 'Shinyanga Rural', 'Maswa'],
  },
  {
    city: 'Simiyu',
    region: 'Simiyu',
    municipals: ['Bariadi Town', 'Busega', 'Itilima', 'Maswa', 'Meatu'],
  },
  {
    city: 'Singida',
    region: 'Singida',
    municipals: ['Singida Municipal', 'Ikungi', 'Manyoni', 'Singida Rural'],
  },
  {
    city: 'Tabora',
    region: 'Tabora',
    municipals: ['Tabora Municipal', 'Igunga', 'Sikonge', 'Uyui'],
  },
  {
    city: 'Tanga',
    region: 'Tanga',
    municipals: ['Tanga City', 'Korogwe Town', 'Muheza', 'Handeni', 'Pangani', 'Kilindi', 'Lushoto'],
  },
  {
    city: 'Unguja Kusini',
    region: 'Zanzibar South',
    municipals: ['Koani'],
  },
  {
    city: 'Unguja Mjini Magharibi',
    region: 'Zanzibar Urban/West',
    municipals: ['Zanzibar City'],
  },
  {
    city: 'Unguja Kaskazini',
    region: 'Zanzibar North',
    municipals: ['Mkokotoni'],
  },
];

export const newsData = [
  {
    title: 'Scientists Make Breakthrough in Cancer Research',
    description: 'Researchers at XYZ University have discovered a new method for targeting cancer cells that shows promising results in early experiments. The breakthrough could lead to more effective treatments and improved outcomes for cancer patients.',
  },
  {
    title: 'Government Announces New Education Initiatives',
    description: 'The government has unveiled a series of new education initiatives aimed at improving access to quality education for all students. The measures include increased funding for schools, teacher training programs, and scholarships for disadvantaged students.',
  },
  {
    title: 'Tech Company Launches Innovative Product',
    description: 'ABC Tech has introduced a groundbreaking new product that promises to revolutionize the industry. The device combines cutting-edge technology with sleek design, offering users a unique and enhanced experience.',
  },
  {
    title: 'Sports Team Wins Championship Title',
    description: 'The hometown team emerged victorious in the championship game, securing the title for the first time in franchise history. Fans celebrated in the streets as the players hoisted the trophy and expressed their gratitude for the incredible support.',
  },
  {
    title: 'New Study Reveals Link Between Diet and Longevity',
    description: 'A recent study conducted by researchers from XYZ Institute suggests that a healthy diet rich in fruits, vegetables, and whole grains is associated with a longer lifespan. The findings highlight the importance of nutrition in maintaining overall health and well-being.',
  },
];


export    const sampleData = [
    {
      name: 'John v Chuma',
      email: 'johnvchuma@gmail.com',
      password: 'Password1',
    },
    {
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password: 'Password2',
    },
    {
      name: 'Michael Smith',
      email: 'michaelsmith@example.com',
      password: 'Password3',
    },
    {
      name: 'Sarah Johnson',
      email: 'sarahjohnson@example.com',
      password: 'Password4',
    },
    {
      name: 'David Brown',
      email: 'davidbrown@example.com',
      password: 'Password5',
    },
  ];
  