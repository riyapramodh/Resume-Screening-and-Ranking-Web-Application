import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ReactStars from "react-rating-stars-component";
import './index.css'; // Import your CSS file
import  logo from './LOGO.jpeg';
import Checkboxes from './components/checkbos';
import JSZip from 'jszip';
import SwappingAnimation from './components/loading';
import {Link} from 'react-router-dom'
const ResumeUpload = () => {
  const [showRequirements, setShowRequirements] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [showOtherEducation, setShowOtherEducation] = useState(false);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showAddInternship, setShowAddInternship] = useState(false);
  const [showAddCertification, setShowAddCertification] = useState(false);
  const [showAddTechnicalInterest, setShowAddTechnicalInterest] = useState(false);
  const [showAddLanguage, setShowAddLanguage] = useState(false);
  const [showAddDegree, setShowAddDegree] = useState(false);
  const [showAddBranch, setShowAddBranch] = useState(false);
  const [showAddStars, setShowAddStars] = useState(false);
  const [skills, setSkills] = useState([]);
  const [internships, setInternships] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [technicalInterests, setTechnicalInterests] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [branches, setBranches] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [newInternship, setNewInternship] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [newTechnicalInterest, setNewTechnicalInterest] = useState("");
  const [newLanguage,setNewLanguage] = useState("");
  const [newDegree, setNewDegree] = useState("");
  const [newBranch, setNewBranch] = useState("");
  const [skillPriorities, setSkillPriorities] = useState({});
  const [internshipPriorities, setInternshipPriorities] = useState({});
  const [certificationPriorities, setCertificationPriorities] = useState({});
  const [technicalInterestPriorities, setTechnicalInterestPriorities] = useState({});
  const [languagePriorities, setLanguagePriorities] = useState({});


  const [isManualEntry, setIsManualEntry] = useState(false);
  const [invalidInputs, setInvalidInputs] = useState([]);
  const [degreeChecked, setDegreeChecked] = React.useState(false);
  const [branchChecked, setBranchChecked] = React.useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [recruiterId, setRecruiterId] = useState(null); // Initialize with null
  const [rankedResumes, setRankedResumes] = useState(null);
  const allSkills =  ['Python', 'Java', 'C', 'C++', 'C#', 'Kotlin', 'HTML', 'Go', 'R', 'Perl', 'Bash', 'Rust', 'PHP',
  'Swift', 'Scala', 'typeScript', 'Ruby', 'Fortran', 'JavaScript', 'Jquery', '.NET', 'VBscript',
  'PyTorch', 'TensorFlow', 'JIRA', 'Linux OS', 'DSA', 'SQL', 'Python', 'Spark', 'Oracle', 'MongoDB',
  'Hadoop', 'NoSQL', 'Agile', 'Wireshark', 'SIEM', 'EDR', 'IDS', 'Winpcp', 'sysmon', 'Autoruns',
  'ProcMan', 'RegMon', 'diskMon', 'NIST CSF', 'CIS', 'UI/UX', 'DevOps', 'Scala', 'Pega', 'Angular',
  'React', 'Node', 'Cassandra', 'memSQL', 'Tableau', 'ETL', 'Selenium', 'Appium', 'SpecFlw', 'UFT',
  'MS Access', 'Google Suite', 'Bootstrap', 'Material-UI', 'Cypress', 'NPM', 'GraphQL', 'Amplify',
  'Serverless', 'DynamoDB', 'CloudFormation']

  const allIntersts = ['Cyber Security',
    'Computer Networks',
    'Machine Learning',
    'Artificial Intelligence',
    'Deep Learning',
    'DBMS',
    'Operating Systems',
    'Ethical Hacking',
    'DevOps',
    'Computer Vision',
    'Image Processing',
    'Data Science',
    'Data Analytics',
    'OOPS',
    'Cloud Computing']

    const allCertifications = [
      'PCI-DSS',
      'ISO 27001',
      'CCNA',
      'Programming',
      'Full-stack web development',
      'DevNet',
      'Ethical Hacking',
      'Microsoft Azure',
      'AWS',
      'Google']
      const allLanguages = [
        'Afrikaans',
        'Albanian',
        'Amharic',
        'Arabic',
        'Armenian',
        'Assamese',
        'Azerbaijani',
        'Basque',
        'Belarusian',
        'Bengali',
        'Bosnian',
        'Bulgarian',
        'Burmese',
        'Catalan',
        'Cebuano',
        'Chichewa',
        'Chinese (Simplified)',
        'Chinese (Traditional)',
        'Corsican',
        'Croatian',
        'Czech',
        'Danish',
        'Dutch',
        'English',
        'Esperanto',
        'Estonian',
        'Filipino',
        'Finnish',
        'French',
        'Frisian',
        'Galician',
        'Georgian',
        'German',
        'Greek',
        'Gujarati',
        'Haitian Creole',
        'Hausa',
        'Hawaiian',
        'Hebrew',
        'Hindi',
        'Hmong',
        'Hungarian',
        'Icelandic',
        'Igbo',
        'Indonesian',
        'Irish',
        'Italian',
        'Japanese',
        'Javanese',
        'Kannada',
        'Kazakh',
        'Khmer',
        'Korean',
        'Kurdish',
        'Kyrgyz',
        'Lao',
        'Latin',
        'Latvian',
        'Lithuanian',
        'Luxembourgish',
        'Macedonian',
        'Malagasy',
        'Malay',
        'Malayalam',
        'Maltese',
        'Maori',
        'Marathi',
        'Mongolian',
        'Nepali',
        'Norwegian',
        'Odia (Oriya)',
        'Pashto',
        'Persian',
        'Polish',
        'Portuguese',
        'Punjabi',
        'Romanian',
        'Russian',
        'Samoan',
        'Scots Gaelic',
        'Serbian',
        'Sesotho',
        'Shona',
        'Sindhi',
        'Sinhala',
        'Slovak',
        'Slovenian',
        'Somali',
        'Spanish',
        'Sundanese',
        'Swahili',
        'Swedish',
        'Tajik',
        'Tamil',
        'Telugu',
        'Thai',
        'Turkish',
        'Turkmen',
        'Ukrainian',
        'Urdu',
        'Uzbek',
        'Vietnamese',
        'Welsh',
        'Xhosa',
        'Yiddish',
        'Yoruba',
        'Zulu'
      ];
      const allInternships = [
        'Adobe',
        'Accenture',
        'Amazon',
        'American Express',
        'Apple',
        'Applied Materials',
        'Atlassian',
        'Axis Bank',
        'Bajaj Auto',
        'Bajaj Finserv',
        'Bharat Petroleum',
        'Biocon',
        'Bosch',
        'Cadbury',
        'Capgemini',
        'Cognizant',
        'Conduent',
        'Dell',
        'Deloitte',
        'Directi',
        'Dr. Reddy\'s Laboratories',
        'Flipkart',
        'Ford',
        'Genpact',
        'Goldman Sachs',
        'Google',
        'HCL Technologies',
        'Hero MotoCorp',
        'Hewlett Packard Enterprise',
        'Honda',
        'Hyundai',
        'IBM',
        'ICICI Bank',
        'Indian Oil',
        'Infosys',
        'Intel',
        'ITC Limited',
        'Jindal Steel',
        'Johnson & Johnson',
        'JSW Steel',
        'L&T',
        'Larsen & Toubro Infotech',
        'Mahindra & Mahindra',
        'Microsoft',
        'Mindtree',
        'Mphasis',
        'Mu Sigma',
        'Nestle',
        'Nissan',
        'NTPC',
        'Oracle',
        'Pfizer',
        'Philips',
        'PwC',
        'Qualcomm',
        'Reliance Industries',
        'Samsung',
        'SAP',
        'Siemens',
        'Sony',
        'State Bank of India',
        'Steel Authority of India',
        'Tata Consultancy Services (TCS)',
        'Tata Motors',
        'Tata Power',
        'Tata Steel',
        'Tech Mahindra',
        'Texas Instruments',
        'The Oberoi Group',
        'Thermax',
        'Uber',
        'UltraTech Cement',
        'Unilever',
        'Vedanta',
        'Vodafone Idea',
        'Wipro',
        'Zomato',
        'Airbnb',
        'Alphabet',
        'AMD (Advanced Micro Devices)',
        'American Airlines',
        'American Eagle Outfitters',
        'Amgen',
        'Analog Devices',
        'Aon',
        'AppFolio',
        'Asana',
        'ASUS',
        'Autodesk',
        'Avaya',
        'Baidu',
        'Baker Hughes',
        'BASF',
        'Baxter International',
        'Becton Dickinson',
        'BHP',
        'Biogen',
        'BlackRock',
        'Boehringer Ingelheim',
        'BorgWarner',
        'Bristol Myers Squibb',
        'Broadcom',
        'Caterpillar',
        'Celgene',
        'Charles Schwab',
        'Chevron',
        'Chipotle Mexican Grill',
        'Cisco Systems',
        'Citrix Systems',
        'Clorox',
        'Comcast',
        'Comerica',
        'Constellation Brands',
        'Coty',
        'Cubic Corporation',
        'Cummins', 
        'DaVita',
        'Dean Foods',
        'Deere & Company',
        'DISH Network',
        'DowDuPont',
        'Dropbox',
        'DTE Energy',
        'Dunkin\' Brands',
        'eBay',
        'Electronic Arts',
        'Emerson Electric',
        'Entergy',
        'Equifax',
        'Etsy',
        'Exelon',
        'Expedia Group',
        'ExxonMobil',
        'Facebook',
        'Fidelity Investments',
        'First Data',
        'Fiserv',
        'Fitbit',
        'Fortive',
        'Fortune Brands Home & Security',
        'Fossil Group',
        'Freddie Mac',
        'Garmin',
        'Gartner',
        'General Dynamics',
        'General Electric',
        'General Mills',
        'General Motors',
        'Gilead Sciences',
        'GlaxoSmithKline',
        'Goodyear Tire & Rubber',
        'Halliburton',
        'Harley-Davidson',
        'Harris Corporation',
        'Hasbro',
        'HCA Healthcare',
        'Henry Schein',
        'Hess Corporation',
        'Hilton',
        'HollyFrontier',
        'Honeywell International',
        'HP (Hewlett Packard)',
        'Huntington Ingalls Industries',
        'IAC (InterActiveCorp)',
        'Idexx Laboratories',
        'Illumina',
        'Ingersoll Rand',
        'Ingredion',
        'Inmarsat',
        'Intel Corporation',
        'Intuit',
        'Intuitive Surgical',
        'IQVIA',
        'J.B. Hunt Transport Services',
        'Jacobs Engineering Group',
        'JetBlue Airways',
        'Johnson Controls',
        'Juniper Networks',
        'KLA Corporation',
        'Kraft Heinz',
        'Kroger',
        'L Brands',
        'Lam Research',
        'Lamb Weston',
        'Lear Corporation',
        'Leggett & Platt',
        'Leidos Holdings',
        'Lennar',
        'Lenovo',
        'Linde',
        'Lockheed Martin',
        'Lowe\'s',
        'Lumentum',
        'Lyft',
        'Marathon Oil',
        'Marathon Petroleum',
        'Marriott International',
        'Marsh & McLennan',
        'Masco',
        'Mastercard',
        'Mattel',
        'McDonald\'s',
        'McKesson',
        'Medtronic',
        'MercadoLibre',
        'Merck',
        'MetLife',
        'Micron Technology',
        'Microsemi',
        'Microsoft Corporation',
        'Molson Coors Brewing',
        'Monster Beverage',
        'Morgan Stanley',
        'Motorola Solutions',
        'MSCI',
        'Nasdaq',
        'National Instruments',
        'NetApp',
        'Netflix',
        'Newell Brands',
        'Newmont Goldcorp',
        'News Corp',
        'Nielsen',
        'Nike',
        'Noble Energy',
        'Nokia',
        'Norfolk Southern',
        'Northrop Grumman',
        'NVIDIA',
        'Occidental Petroleum',
        'Omnicom Group',
        'ON Semiconductor',
        'Oracle Corporation',
        'Otis Elevator',
        'PACCAR',
        'Palo Alto Networks',
        'Pandora Media',
        'Paychex',
        'PayPal',
        'Pegasystems',
        'PepsiCo',
        'PerkinElmer',
        'Phillips 66',
        'Pinnacle West Capital',
        'Pioneer Natural Resources',
        'Pitney Bowes',
        'PPL Corporation',
        'Principal Financial Group',
        'Procter & Gamble',
        'Progressive Corporation',
        'Prudential Financial',
        'Public Service Enterprise Group',
        'PulteGroup',
        'Qualcomm',
        'Quest Diagnostics',
        'Ralph Lauren Corporation',
        'Raytheon',
        'Realty Income Corporation',
        'Red Hat',
        'Regeneron Pharmaceuticals',
        'Regions Financial Corporation',
        'Regis Corporation',
        'Republic Services',
        'ResMed',
        'Robert Half International',
        'Rockwell Automation',
        'Roper Technologies',
        'Ross Stores',
        'Royal Caribbean Cruises',
        'Salesforce',
        'S&P Global',
        'Sanmina Corporation',
        'SAP',
        'Schlumberger',
        'Seagate Technology',
        'Sempra Energy',
        'ServiceNow',
        'Sherwin-Williams',
        'Siemens',
        'Simon Property Group',
        'Skyworks Solutions',
        'Snap',
        'Snap-on',
        'Southern Company',
        'Southwest Airlines',
        'Stanley Black & Decker',
        'Starbucks',
        'State Street Corporation',
        'Stericycle',
        'Stryker Corporation',
        'SunTrust Banks',
        'Symantec',
        'Synopsys',
        'Sysco',
        'Tableau Software',
        'Tapestry, Inc.',
        'Target Corporation',
        'TE Connectivity',
        'TechnipFMC',
        'Teledyne Technologies',
        'Teleflex',
        'Texas Instruments',
        'Textron',
        'Thermo Fisher Scientific',
        'Tiffany & Co.',
        'Time Warner',
        'TJX Companies',
        'T-Mobile',
        'Total System Services',
        'Tractor Supply Company',
        'TransDigm Group',
        'Twitter',
        'Tyler Technologies',
        'Tyson Foods',
        'UDR, Inc.',
        'Ulta Beauty',
        'Union Pacific Corporation',
        'United Airlines',
        'UnitedHealth Group',
        'Universal Display Corporation',
        'Unum Group',
        'Valero Energy',
        'Vanguard Group',
        'Verisign',
        'Verizon Communications',
        'VF Corporation',
        'Viacom',
        'Visa Inc.',
        'Vishay Intertechnology',
        'VMware',
        'Vornado Realty Trust',
        'Vulcan Materials',
        'Walgreens Boots Alliance',
        'Walmart',
        'Walt Disney Company',
        'Waste Management, Inc.',
        'Waters Corporation',
        'Wells Fargo',
        'Westinghouse Electric Corporation',
        'Western Digital',
        'Western Union',
        'WestRock',
        'Weyerhaeuser',
        'Whirlpool Corporation',
        'Williams Companies',
        'Willis Towers Watson',
        'Workday',
        'Wyndham Destinations',
        'Wynn Resorts',
        'Xerox',
        'Xilinx',
        'XPO Logistics',
        'Xylem',
        'Yum! Brands',
        'Zebra Technologies',
        'Zendesk',
        'Zimmer Biomet',
        'Zions Bancorporation',
        'Zoetis',
        'Zoom Video Communications',
        'Zscaler',
        'ZTE Corporation',
        'Zynga',
      ];
            
  const allDegrees = ["B.Tech", "M.Sc", "B.Sc", "B.E"]
  const allBranches = [
    "Aerospace Engineering",
    "Artificial Intelligence and Data Science",
    "Automation and Robotics Engineering",
    "Chemical Engineering",
    "Civil Engineering",
    "Computer Science and Engineering (Artificial Intelligence)",
    "Computer Science and Engineering(Cyber Security)",
    "Computer Science and Engineering",
    "Computer and Communication Engineering",
    "Electrical and Communication Engineering",
    "Electrical and Electronics Engineering",
    "Electronics and Communication Engineering",
    "Electronics and Computer Engineering",
    "Electronics and Instrumentation Engineering",
    "Mechanical Engineering",
    "Robotics and Artificial Intelligence"
]

  const filteredSkills = allSkills
    .filter(skill => skill.toLowerCase().includes(newSkill.toLowerCase()))
    .map(skill => ({ value: skill, label: skill }));

    const filteredInterests = allIntersts
    .filter(interest => interest.toLowerCase().includes(newTechnicalInterest.toLowerCase()))
    .map(interest => ({ value: interest, label: interest }));

    const filteredCertifications = allCertifications
    .filter(certifications => certifications.toLowerCase().includes(newCertification.toLowerCase()))
    .map(certifications => ({ value: certifications, label: certifications }));

    const filteredInternships = allInternships 
      .filter(internship => internship.toLowerCase().includes(newInternship.toLowerCase()))
    .map(internship => ({ value: internship, label: internship }));

    const filteredLanguages = allLanguages
    .filter(language => language.toLowerCase().includes(newLanguage.toLowerCase()))
    .map(language => ({ value: language, label: language }));

    const filteredDegrees = allDegrees
    .filter(degree => degree.toLowerCase().includes(newDegree.toLowerCase()))
    .map(degree => ({ value: degree, label: degree }));

    const filteredBranches = allBranches
    .filter(branch => branch.toLowerCase().includes(newBranch.toLowerCase()))
    .map(branch => ({ value: branch, label: branch }));


    const handleKeyDown = (event, isManualEntry) => {
      if (event.key === 'Enter') {
        // Check if the entered value is valid
        const enteredValue = event.target.value;
        const isValidInput = filteredSkills.some((skill) => skill.value === enteredValue);
    
        if (!isValidInput) {
          // Prevent the default behavior (e.g., pressing ENTER)
          event.preventDefault();
          console.log("Invalid input detected. Pressing ENTER is not allowed.");
          setIsManualEntry(true);
        }
      }
    };

    const handleSkillChange = (selectedOption, { key }) => {
      console.log('Handling skill change:', selectedOption);
    
      if (key === 'Backspace') {
        // Handle the case when backspace is pressed (selectedOption is null)
        console.log("Backspace pressed or invalid input");
        setIsManualEntry(false);
      } else if (selectedOption) {
        const selectedSkill = selectedOption.value;
    
        // Check if the selected skill is in the filteredSkills list
        if (filteredSkills.some((skill) => skill.value === selectedSkill)) {
          // Check if the selected skill is already in the skills list
          if (!skills.includes(selectedSkill)) {
            // Add the selected skill to the skills array
            setSkills((prevSkills) => [...prevSkills, selectedSkill]);
            setSkillPriorities((prev) => ({
              ...prev,
              [selectedSkill]: skillPriorities[selectedSkill] || 1,
            }));
            setShowAddStars(true);
            setIsManualEntry(false);
          }
        } else {
          // Handle the case of an invalid input
          console.log("Invalid input");
          setInvalidInputs((prev) => [...prev, selectedSkill]);
          setIsManualEntry(false);
        }
    
        setShowAddSkill(false);
      }
    };

    const handleInternshipChange = (selectedOption) => {
      if(selectedOption) {
        const selectedInternship = selectedOption.value;
        if(!internships.includes(selectedInternship)){
          setInternships((prevInternships) => [...prevInternships, selectedInternship]);
          setInternshipPriorities((prev) => ({
            ...prev,
            [selectedInternship]: internshipPriorities[selectedInternship] || 1,
          }));
          setShowAddStars(true);
        }
        setShowAddInternship(false);
        setNewInternship('');
      }

    };

    const handleCertificationChange = (selectedOption) => {
      if (selectedOption) {
        const selectedCertification = selectedOption.value;
        if (!certifications.includes(selectedCertification)) {
          setCertifications((prevCertifications) => [...prevCertifications, selectedCertification]);
          setCertificationPriorities((prev) => ({
            ...prev,
            [selectedCertification]: certificationPriorities[selectedCertification] || 1,
          }));
          setShowAddStars(true);
        }
        setShowAddCertification(false);
        setNewCertification('');
      }
    };
    const handleInterestChange = (selectedOption) => {
      if (selectedOption) {
        const selectedInterest = selectedOption.value;
        if (!technicalInterests.includes(selectedInterest)) {
          setTechnicalInterests((prevInterests) => [...prevInterests, selectedInterest]);
          setTechnicalInterestPriorities((prev) => ({
            ...prev,
            [selectedInterest]: technicalInterestPriorities[selectedInterest] || 1,
          }));
          setShowAddStars(true);
        }
        setShowAddTechnicalInterest(false);
        setNewTechnicalInterest('');
      }
    };
    const handleLanguageChange = (selectedOption) => {
      if(selectedOption) {
        const selectedLanguage = selectedOption.value;
        if(!languages.includes(selectedLanguage)){
          setLanguages((prevLanguages) => [...prevLanguages, selectedLanguage]);
          setLanguagePriorities((prev) => ({
            ...prev,
            [selectedLanguage]: languagePriorities[selectedLanguage] || 1,
          }));
          setShowAddStars(true);
        }
        setShowAddLanguage(false);
        setNewLanguage('');
      }
    };
    const handleDegreeChange = (selectedOption, status) => {
      if (status === "Checked") {
        // If checkbox is checked, populate degrees with allDegrees
        setDegrees(allDegrees);
      }
      else if(status === "Unchecked"){
        setDegrees([]);
      }
      else {
        // If checkbox is unchecked, and selectedOption is provided
        if (selectedOption) {
          const selectedDegree = selectedOption.value;
          if (!degrees.includes(selectedDegree)) {
            setDegrees((prevDegrees) => [...prevDegrees, selectedDegree]);
          }
          setShowAddDegree(false);
          setNewDegree('');
        }
      }
    }

    const handleBranchChange = (selectedOption, status) => {
      if (status === "Checked") {
        // If checkbox is checked, populate degrees with allDegrees
        setBranches(allBranches);
      }
      else if(status === "Unchecked"){
        setBranches([]);
      }
      else {
        // If checkbox is unchecked, and selectedOption is provided
        if (selectedOption) {
          const selectedBranch = selectedOption.value;
          if (!branches.includes(selectedBranch)) {
            setBranches((prevBranches) => [...prevBranches, selectedBranch]);
          }
          setShowAddBranch(false);
          setNewBranch('');
        }
      }
    }

const isSkillInvalid = (skill) => invalidInputs.includes(skill);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: 400, // customize the width
      
    }),
  };

  const handleDomainSelection = (domain) => {
    setSelectedDomain(domain);
    setShowRequirements(true);
  };


  const [uploadError, setUploadError] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.zip')) {
      try {
        setIsLoading(true); // Show loading animation
        // Send the zip file to the backend
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('http://localhost:5000/api/resumes', {
          method: 'POST',
          body: formData,
        });
          setFileUploaded(true);
        if (response.ok) {
          const data = await response.json();
          const recruiterId = data.recruiter_id;
          setFileUploaded(true);
          setRecruiterId(recruiterId);  // Store the recruiter_id in a state variable
          console.log(recruiterId)
          setIsLoading(false);
         showRequirementsForm();
        } else {
          setFileUploaded(false);
          const error = await response.text();
          setUploadError(error);
        }
      } catch (error) {
        setUploadError('Error uploading file');
      } finally {
        setIsLoading(false); // Hide loading animation
      }
    } else {
      alert('Please upload a .zip file.');
    }
  };


  const showRequirementsForm = () => {
    setShowRequirements(true);
  };

  const hideRequirementsForm = () => {
    setShowRequirements(false);
  };

  const showOtherEducationForm = () => {
    setShowOtherEducation(true);
  };

  const hideOtherEducationForm = () => {
    setShowOtherEducation(false);
  };


  const handleAddWithPriority = (input, setInput, setPriority, priorities, setInputFlag) => (e) => {
    if (e.key === 'Enter' && e.target.value) {
      e.preventDefault();
      const addedItem = e.target.value;
      const addedPriority = priorities[addedItem] || 1;
      
        setInput((prev) => [...prev, addedItem]);
        setPriority((prev) => {
          return {
            ...prev,
            [addedItem]: addedPriority,
          };
        });
        setInputFlag(true);
        setNewSkill('');
        setNewCertification('');
        setNewInternship('');
        setNewTechnicalInterest('');
        setNewLanguage('');
    }
  };

  const handlePriorityChange = (e, setPriority) => {
    const { name, value } = e.target;
    setPriority((prev) => {
      return {
        ...prev,
        [name]: parseInt(value),
      };
    });
  };

  const handleRemove = (index, setCategory, setPriorities) => {
    // Check if the index is within the bounds of the array
    
    if (index >= 0) {
      setCategory((prevCategory) => {
        const itemToRemove = prevCategory[index];
        // Remove the item from the category
        const newCategory = prevCategory.filter((_, i) => i !== index);
        // Remove the item's priority
        if(setPriorities){
          setPriorities((prevPriorities) => {
            const newPriorities = { ...prevPriorities };
            delete newPriorities[itemToRemove];
            return newPriorities;
          });
        }
        return newCategory;
      });
    }
    
  };


  async function fetchRankedResumes(recruiterId) {
    try {
        const response = await fetch(`http://localhost:5000/api/ranked_resumes?recruiter_id=${recruiterId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        data.forEach(resume => {
            // Convert base64 string back to a Blob
            const byteCharacters = atob(resume.file);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], {type: 'application/pdf'});
            
            // Create a new object URL for the blob and add it to the resume object
            const fileUrl = URL.createObjectURL(blob);
            resume.fileUrl = fileUrl;
        });
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
function displayRankedResumes() {
  // Get the container element
  setIsSubmitting(false);
  let container = document.getElementById('pdfContainer');
  let results = document.getElementById('Results');

  // Clear the container
  container.innerHTML = '';
  
  // For each ranked resume, create a new row in the table and append it to the container
  if (rankedResumes) {  
      results.style.display = 'inline-block';
      container.style.display = 'block';
      const zip = new JSZip();
           const downloadButton = document.createElement('button');
            downloadButton.textContent = 'Download All Resumes';
            downloadButton.style.backgroundColor = 'rgb(32, 33, 52)';
            downloadButton.style.color = 'rgb(227, 213, 202)';
            downloadButton.style.display = 'inline-block';
            downloadButton.style.padding = "5px 20px";
            downloadButton.style.cursor = 'pointer';
            downloadButton.style.position = 'relative';
            downloadButton.style.fontsize = '16px';
            downloadButton.style.borderRadius = '7px';
            downloadButton.style.border = 'none';
            downloadButton.style.margin = '10px';
            downloadButton.onclick = () => {
                zip.generateAsync({ type: 'blob' })
                    .then(content => {
                        // Initiate download
                        const url = window.URL.createObjectURL(content);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'resumes.zip';
                        document.body.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(url);
                    });
            };
            results.appendChild(downloadButton);
      document.getElementById('submitNumResumes').addEventListener('click', () => {
          let numResumes = parseInt(document.getElementById('numResumes').value);
          if(numResumes < 1){
              alert("Please Provide a valid number");
              return;
          }
          if (numResumes > rankedResumes.length) {
              numResumes = rankedResumes.length;  // Now you can reassign numResumes
          }

          if (container) {  // Check if container is not null
              while (container.firstChild) {
                  container.removeChild(container.firstChild);
              }
          }
          let p = document.getElementById('resumesScreened');
            if (!p) {  // If the paragraph doesn't exist, create it
                p = document.createElement('p');
                p.id = 'resumesScreened';  // Give the paragraph an id so you can find it later
                results.appendChild(p);  // Add the paragraph to the container
            }
            p.textContent = `Number of resumes shortlisted: ${rankedResumes.length}`;

           // Create a table
           let table = document.createElement('table');

           // Create a header row and cells
           let headerRow = document.createElement('tr');
           let headerCell1 = document.createElement('th');
           let headerCell2 = document.createElement('th');
           let headerCell3 = document.createElement('th');

           // Add the headings to the cells
           headerCell1.textContent = 'Rank';
           headerCell2.textContent = 'PDFs';
           headerCell3.textContent = 'Scores';

           // Add the cells to the header row
           headerRow.appendChild(headerCell1);
           headerRow.appendChild(headerCell2);
           headerRow.appendChild(headerCell3);
            table.style.color = "black"
            table.style.borderCollapse = 'separate'
            table.style.borderSpacing = '40px 5px'
           // Add the header row to the table
           table.appendChild(headerRow);

           // Loop through the resumes up to numResumes
           for (let i = 0; i < numResumes; i++) {
               let resume = rankedResumes[i];
               if (resume.fileUrl) {  // Check if fileUrl is not null
                   // Create a new row and cells
                   let row = document.createElement('tr');
                   let cell1 = document.createElement('td');
                   let cell2 = document.createElement('td');
                   let cell3 = document.createElement('td');

                   // Create the button
                   let button = document.createElement('button');
                   button.className = 'pdf-button';  // Add the class to the button
                   button.innerHTML =  resume.Name;  
                   button.onclick = () => window.open(resume.fileUrl, '_blank');  // Open in a new tab
                  button.style.borderRadius = "7px";
                  button.style.backgroundColor = "#422d20";
                  button.style.padding = "10px";
                  button.style.color = "#e3d5ca";
                  
                  
                   // Add the rank, button, and score to the cells
                   cell1.textContent = i + 1;  // Rank is index + 1
                   cell2.appendChild(button);
                   cell3.textContent = resume.Score;

                   // Add the cells to the row
                   row.appendChild(cell1);
                   row.appendChild(cell2);
                   row.appendChild(cell3);

                   // Add the row to the table
                   table.appendChild(row);
               }
              }
           // Add the table to the container
           container.appendChild(table);
           
        });
    }
}

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const Class10 = document.getElementById('educationPercentage10').value;
  const Class12 = document.getElementById('educationPercentage12').value;
  const CGPA = document.getElementById('cgpaInput').value;  // Extract the value from CGPA input field
  const degree = degrees.join(', ');
  const branch = branches.join(', ');
  const skillsValue = skills.join(', '); // or however you want to format it
  const internshipsValue = internships.join(', ');
  const certificationsValue = certifications.join(', ');
  const technicalInterestsValue = technicalInterests.join(', ');
  const languagesValue = languages.join(', ');
    
    if (
  
      degree ||
      branch ||
      skillsValue ||
      internshipsValue ||
      certificationsValue ||
      technicalInterestsValue ||
      languagesValue
    ) {
      console.log("Recruiter Requirements:");
      console.log("Degree:", degree);
      console.log("Branch:", branch);
      console.log("Skills:", skillsValue);
      console.log("Skill Priorities:", skillPriorities);
      console.log("Internships:", internshipsValue);
      console.log("Internship Priorities:", internshipPriorities);
      console.log("Certifications:", certificationsValue);
      console.log("Certification Priorities:", certificationPriorities);
      console.log("Technical Interests:", technicalInterestsValue);
      console.log("Technical Interest Priorities:", technicalInterestPriorities);
      console.log("Languages:", languagesValue);
      console.log("Language Priorities:", languagePriorities);
    } else {
      console.error('One or more required elements are missing');
    }
    
    const requestData = {
      'CGPA': CGPA,
      'Class 12': Class12,
      'Class 10': Class10,
      'Degree': degrees,
      'Specialization': branches,
      user_input: {
        
        'TechnicalInterests': technicalInterests, 
        'Projects': skills,  
        'Internship': internships, 
        'TechnicalSkills': skills, 
        'Certifications': certifications,  
        'Languages': languages, 
      },
      user_input_weights: {
        'TechnicalInterests': technicalInterestPriorities, 
        'Projects': skillPriorities, 
        'Internship': internshipPriorities, 
        'TechnicalSkills': skillPriorities, 
        'Certifications': certificationPriorities,  
        'Languages': languagePriorities, 
      },
      recruiter_id: recruiterId,
    };
    try {
      const response = await fetch('http://localhost:5000/requirements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
      console.log('Requirements submitted successfully!');
      // Fetch the ranked resumes
      const rankedResumes = await fetchRankedResumes(recruiterId);
      setRankedResumes(rankedResumes);
      console.log(rankedResumes)
      setShowRequirements(false);
      
      
    } else {
      setIsSubmitting(false);
      console.error('Error submitting requirements');
    }
  } catch (error) {
    setIsSubmitting(false);
    console.error('Error:', error);
  }
};


useEffect(() => {
  if (rankedResumes) {
      displayRankedResumes();
  }
}, [rankedResumes]);

  const [cgpa, setCGPA] = useState('');
  const [isValid, setIsValid] = useState(true); // Track validation state

  const handleChange = (event) => {
    const value = event.target.value;
    setCGPA(value);

    const cgpaValue = parseFloat(value);
    setIsValid(
      !isNaN(cgpaValue) && cgpaValue >= 0 && cgpaValue <= 10.009
    ); 
  };

  function handleDegreeCheckBoxChange(isChecked) {
    if(isChecked){
      handleDegreeChange(null, "Checked")
    }
    else{
        handleDegreeChange(null, "Unchecked")
    }
  }
function handleBranchCheckBoxChange(isChecked){
  if(isChecked){
    handleBranchChange(null, "Checked")
  }
  else{
    handleBranchChange(null, "Unchecked")
  }
}
function SelectAndCheckboxes({ label, options, selectedItems, handleRemove, handleItemChange, handleCheckBoxChange, setItem, field, checked, setChecked }) {
  return (
    <div>
      <label htmlFor={label}>{label}:</label>
      <Select
        value={null}
        isClearable
        isSearchable
        onChange={handleItemChange}
        options={options}
        placeholder="Enter a skill"
        styles={customStyles}
        onKeyDown={(event) => handleKeyDown(event, isManualEntry)}
      /> 
      {selectedItems.map((item, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center' }}>
          <button type="button" id="InternTag" onClick={() => {
             handleRemove(index, setItem)
            setChecked(false);
            }
             }>
            {item} X
          </button>
        </div>
      ))}
   <Checkboxes text={label} onChange={handleCheckBoxChange} checkboxName={field} checked={checked} setChecked={setChecked} />
    </div>
  );
}
const openHelpPage = () => {
  // Replace 'help_page_url' with the actual URL of your help page
  const helpPageUrl = 'https://example.com/help';
  window.open(helpPageUrl, '_blank');
};
  return (
    <div>
      <header>
                <nav>
                    <img src={logo} className="logo" alt="Logo" />
                    <i className="fas fa-bars" id="ham-menu"></i>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                    <ul id="nav-bar">
                        <li>
                            <Link to="/">Home</Link> {/* Use Link component for internal navigation */}
                        </li>
                        <li>
                            <Link to="/help">Help</Link> {/* Use Link component for internal navigation */}
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link> {/* Assuming you have a Contact page */}
                        </li>
                    </ul>
                </nav>
            </header>
      <div id="page-wrapper">
        <section id="file-upload">
        {!fileUploaded && (
      <>
        <div>
          {isLoading ? (
            <SwappingAnimation /> // Show loading animation
          ) : (
            <>
              <label htmlFor="zipFileInput" className="upload-button">
                <i className="fas fa-cloud-upload-alt"></i> Upload ZIP File
              </label>
              <input
                type="file"
                id="zipFileInput"
                accept=".zip"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              {uploadError && <div style={{marginTop : "50px", fontSize : "30px", color : "red"}}>Error: {uploadError}. Please try again.</div>}
              {/* Add additional logic based on file upload state */}
            </>
          )}
        </div>
      </>
    )}
  </section>
  {isSubmitting ? (
    <SwappingAnimation /> // Show loading animation
  ) : (
        showRequirements && (
          <div id="requirementsContainer">
            <div className="requirements-content">
              <h1>Recruiter Requirements</h1>
              
              <form id="requirementsForm" onSubmit={handleFormSubmit}>
              <h2>Education</h2>
                <div id="edu-info">
                <div>
                    <label htmlFor="educationPercentage10">10th Percentage:</label>
                    <input type="number" id="educationPercentage10" name="educationPercentage10" min="0" max="100" />
                </div>
                <div>
                      <label htmlFor="educationPercentage12">12th Percentage:</label>
                      <input type="number" id="educationPercentage12" name="educationPercentage12" min="0" max="100" />
                </div>
                  <div>
                  <SelectAndCheckboxes
                    label="Degree"
                    options={filteredDegrees}
                    selectedItems={degrees}
                    handleRemove={handleRemove}
                    handleItemChange={handleDegreeChange}
                    handleCheckBoxChange={handleDegreeCheckBoxChange}
                    setItem={setDegrees}
                    field="degree"
                    checked={degreeChecked}
                    setChecked={setDegreeChecked} // Pass the setChecked function as a prop
                  />

                  <SelectAndCheckboxes
                    label="Branch"
                    options={filteredBranches}
                    selectedItems={branches}
                    handleRemove={handleRemove}
                    handleItemChange={handleBranchChange}
                    handleCheckBoxChange={handleBranchCheckBoxChange}
                    setItem={setBranches}
                    field="branch"
                    checked={branchChecked}
                    setChecked={setBranchChecked} // Pass the setChecked function as a prop
                  />
                  </div>
                </div>
                <div>
                <div>
                <label htmlFor="CGPA">CGPA</label>
      <input
        type="number"
        id="cgpaInput"
        step="0.01"
        min="0"
        max="10"
        placeholder="Enter CGPA (0-10)"
        value={cgpa}
        onChange={handleChange}
        alert={!isValid}
      />
      {!isValid && (
        <p className="error-message">Please enter a value between 0 and 10 (up to two decimal places).</p>
      )}
    </div>
</div>
                  
    <div className="resume-upload-container">
      <div >
        <h2>Skills</h2>
        <div>
          <button id="add-skill-btn" type="button" onClick ={() => setShowAddSkill(true)}>
            Add Skill
          </button>
          {showAddSkill &&(
            
          <div >
           <Select
           
              value={null}
              isClearable
              isSearchable
              onChange={handleSkillChange}
              options={filteredSkills}
              placeholder="Enter a skill"
              styles={customStyles}
              onKeyDown={(event) => handleKeyDown(event, isManualEntry)}
            />
          
          {showAddStars && skills.includes(newSkill) && allSkills.includes(newSkill) && (
  <ReactStars
    id="ReactStars"
    count={5}
    value={skillPriorities[newSkill] || 1}
    onChange={(newRating) => handlePriorityChange({ target: { name: newSkill, value: newRating } }, setSkillPriorities)}
    size={24}
    isHalf={false}
    emptyIcon={<i className="star-icon far fa-star"></i>}
    halfIcon={<i className="star-icon fa fa-star-half-alt"></i>}
    fullIcon={<i className="star-icon fa fa-star"></i>}
    activeColor="#ffd700"
    key={newSkill}
  />
)}
          </div>
           
            
          )}
           <br></br>
        {skills.map((skill, index) => (
  <div key={index} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center' }}>
    <br />
    <button id="remove-skill-btn" onClick={() => handleRemove(index, setSkills, setSkillPriorities)} disabled={invalidInputs.includes(skill)}>
      {skill} X
    </button>

    <ReactStars
      id="ReactStars"
      count={5}
      value={skillPriorities[skill]}
      onChange={(newRating) => handlePriorityChange({ target: { name: skill, value: newRating } }, setSkillPriorities)}
      size={24}
      isHalf={false}
      emptyIcon={<i className="star-icon far fa-star"></i>}
      halfIcon={<i className="star-icon fa fa-star-half-alt"></i>}
      fullIcon={<i className="star-icon fa fa-star"></i>}
      activeColor="#ffd700"
    />
  </div>
))}
        </div>
      </div>
      <div>
      <div>
  <h2>Internships</h2>
  <button id="Intern" type="button" onClick={() => setShowAddInternship(true)}>
    Add Internship
  </button>
  {showAddInternship && (
    <div>
      <Select
        value={null}
        isClearable
        isSearchable
        onChange={(selectedOption) => handleInternshipChange(selectedOption)}
        options={filteredInternships}
        placeholder="Enter an internship"
        styles={customStyles}
        onKeyDown={(event) => handleKeyDown(event, isManualEntry)}
      />
      {showAddStars && internships.includes(newInternship) && (
        <ReactStars
          className="ReactStars"
          count={5}
          value={internshipPriorities[newInternship] || 1}
          onChange={(newRating) => handlePriorityChange({ target: { name: newInternship, value: newRating } }, setInternshipPriorities)}
          size={24}
          isHalf={false}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
          key={newInternship}
        />
      )}
    </div>
  )}
  {/* Display added internships with corresponding priority */}
  {internships.map((internship, index) => (
      <div key={index} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center' }}>
        <button type="button" id="InternTag" onClick={() => handleRemove(index, setInternships, setInternshipPriorities)}>
  {internship} X
</button>
        <ReactStars
        className="ReactStars"
          count={5}
          value={internshipPriorities[internship]}
          onChange={(newRating) => handlePriorityChange({ target: { name: internship, value: newRating } }, setInternshipPriorities)}
          size={24}
          isHalf={false}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
        />
      </div>
    ))}
  </div>

</div>
<div>
  <div>
    <h2>Certifications</h2>
    <button id="Certification" type="button" onClick={() => setShowAddCertification(true)}>
      Add Certification
    </button>
    {showAddCertification && (
      <div>
        <Select
          value={null}
          isClearable
          isSearchable
          onChange={(selectedOption) => handleCertificationChange(selectedOption, 'Certifications')}
          options={filteredCertifications}
          placeholder="Enter a certification"
          styles={customStyles}
          onKeyDown={(event) => handleKeyDown(event, isManualEntry)}
        />
        {showAddStars && certifications.includes(newCertification) && (
          <ReactStars
            className="ReactStars"
            count={5}
            value={certificationPriorities[newCertification] || 1}
            onChange={(newRating) => handlePriorityChange({ target: { name: newCertification, value: newRating } }, setCertificationPriorities)}
            size={24}
            isHalf={false}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
            key={newCertification}
          />
        )}
      </div>
    )}
    {/* Display added certifications with corresponding priority */}
    {certifications.map((certification, index) => (
      <div key={index} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center' }}>
        <button type="button" id="CertificationTag" onClick={() => handleRemove(index, setCertifications, setCertificationPriorities)}>
          {certification} X
        </button>
        <div class="input-wrapper">
          <span class="star-icon far fa-star"></span>
          <ReactStars
            className="ReactStars"
            count={5}
            value={certificationPriorities[certification]}
            onChange={(newRating) => handlePriorityChange({ target: { name: certification, value: newRating } }, setCertificationPriorities)}
            size={24}
            isHalf={false}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />
        </div>
      </div>
    ))}
  </div>
</div>
<div>
  <h2>Technical Interests</h2>
  <button id="Interests" type="button" onClick={() => setShowAddTechnicalInterest(true)}>
    Add Technical Interest
  </button>
  {showAddTechnicalInterest && (
    <div>
      <Select
        value={null}
        isClearable
        isSearchable
        onChange={(selectedOption) => handleInterestChange(selectedOption, 'Technical Interests')}
        options={filteredInterests}
        placeholder="Enter a technical interest"
        styles={customStyles}
        onKeyDown={(event) => handleKeyDown(event, isManualEntry)}
      />
      {showAddStars && technicalInterests.includes(newTechnicalInterest) && (
        <ReactStars
          className="ReactStars"
          count={5}
          value={technicalInterestPriorities[newTechnicalInterest] || 1}
          onChange={(newRating) => handlePriorityChange({ target: { name: newTechnicalInterest, value: newRating } }, setTechnicalInterestPriorities)}
          size={24}
          isHalf={false}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
          key={newTechnicalInterest}
        />
      )}
    </div>
  )}
  {/* Display added technical interests with corresponding priority */}
  {technicalInterests.map((interest, index) => (
    <div key={index} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center' }}>
      <button type="button" id="InterestsTag" onClick={() => handleRemove(index, setTechnicalInterests, setTechnicalInterestPriorities)}>
        {interest} X
      </button>
      <ReactStars
        className="ReactStars"
        count={5}
        value={technicalInterestPriorities[interest]}
        onChange={(newRating) => handlePriorityChange({ target: { name: interest, value: newRating } }, setTechnicalInterestPriorities)}
        size={24}
        isHalf={false}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
      />
    </div>
  ))}
</div>

<div>
  <h2>Languages</h2>
  <button id="Languages" type="button" onClick={() => setShowAddLanguage(true)}>
    Add Language
  </button>
  {showAddLanguage && (
    <div>
      <Select
        value={null}
        isClearable
        isSearchable
        onChange={(selectedOption) => handleLanguageChange(selectedOption)}
        options={filteredLanguages}
        placeholder="Enter a language"
        styles={customStyles}
        onKeyDown={(event) => handleKeyDown(event, isManualEntry)}
      />
      {showAddStars && languages.includes(newLanguage) && (
        <ReactStars
          className="ReactStars"
          count={5}
          value={languagePriorities[newLanguage] || 1}
          onChange={(newRating) => handlePriorityChange({ target: { name: newLanguage, value: newRating } }, setLanguagePriorities)}
          size={24}
          isHalf={false}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
          key={newLanguage}
        />
      )}
    </div>
  )}
  {/* Display added languages with corresponding priority */}
  {languages.map((language, index) => (
    <div key={index} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center' }}>
      <button type="button" id="LanguagesTag" onClick={() => handleRemove(index, setLanguages, setLanguagePriorities)}>
        {language} X
      </button>
      <ReactStars
        className="ReactStars"
        count={5}
        value={languagePriorities[language]}
        onChange={(newRating) => handlePriorityChange({ target: { name: language, value: newRating } }, setLanguagePriorities)}
        size={24}
        isHalf={false}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
      />
    </div>
  ))}
</div>
    </div>
    <div>
                  <button  id="submit">
                    <span>Submit</span>
                  </button>
                </div>
              </form>
              
            </div>
          </div>
  ))}
        <div id="Results"style={{
          display:'none',
          width: '200px', 
          height: '300px', 
          position: 'absolute', 
          top: '180px', 
          left: '50%', 
          transform: 'translateX(-50%)'
        }}>
          <h1>RESULTS</h1>
          <br></br>
          <br></br>
          <p id='resumesScreened' style={{"font-family": 'Arial', 
    "font-size": "1.5em"}}></p>
    <br></br>
    <br></br>
        <label for="numResumes" style={{"font-family": 'Arial', 
    "font-size": "1.5em"}}>Enter the number of resumes to be displayed:</label>
            <input type="number" id="numResumes" name="numResumes" min="1" style={{padding: "5px 5px", fontSize: '15px'}}></input>
            <button id="submitNumResumes"style={{display: 'inline-block',
            padding: "5px 20px",
            "backgroundColor":"#202134",
            color:'#E3D5CA',
            border:"none",
            "border-radius": "5px",
            "text-align": "left",
            cursor: "pointer",
            "font-size": "16px",
            "transition: background-color": "0.3s ease",
            
          }}>Submit</button>
        
            

      </div>
      <div id="pdfContainer" style={{
    display: 'none',  
    overflow: 'auto', 
    width: '500px', 
    height: 'auto', 
    position: 'absolute', 
    top: '400px', 
    left: '50%', 
    borderRadius :'5px',
    paddingLeft : '50px',
    paddingRight : '50px',
    paddingBottom : '50px',
    paddingTop : '20px',
    width : 'fit-content',
    transform: 'translateX(-50%)',
    "font-family": 'Arial', 
    "font-size": "2.4em"
}}>
</div>
</div>
    </div>
    );
  };
  
export default ResumeUpload;