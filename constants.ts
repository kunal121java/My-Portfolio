import { Education, Project, SkillCategory, Certificate } from "./types";

export const PERSONAL_INFO = {
  name: "Kunal Pandey",
  headline: "Aspiring Data Scientist | AI Agent Builder | Machine Learning",
  subHeadline: "Bridging Data & Intelligence",
  location: "Bhopal, Madhya Pradesh, India",
  email: "kunalpandeykumar2004@gmail.com",
  linkedin: "linkedin.com/in/kunalpandey2004",
  profileImage: "./kunal-profile.jpg",
  summary: "I’m a B.Tech Computer Science (Data Science) student at Lakshmi Narain College of Technology Excellence, Bhopal, passionate about transforming data into actionable insights and building AI-driven solutions. I’ve gained hands-on experience in Salesforce development, machine learning, and cloud computing through internships and personal projects. Currently exploring AI integrations and cloud-based applications using AWS and Salesforce.",
};

export const PROJECTS: Project[] = [
  {
    title: "Customer Churn Prediction Model",
    description: "Developed a machine learning model to predict customer churn, helping businesses retain valuable clients. Implemented using Python and Scikit-learn with rigorous data preprocessing and model evaluation.",
    tech: ["Python", "Scikit-learn", "Pandas", "ML"],
    category: "ML/AI",
  },
  {
    title: "Online Exam Portal",
    description: "Created a full-stack Flask-based online exam portal featuring automated scoring, user management, and comprehensive dashboard analytics for performance tracking.",
    tech: ["Python", "Flask", "MySQL", "HTML/CSS", "JavaScript"],
    category: "Web Dev",
  },
];

export const EDUCATION: Education[] = [
  {
    institution: "LNCT Group of Colleges",
    degree: "Bachelor of Technology - B.Tech, Computer Science (Data Science)",
    period: "Nov 2022 - June 2026",
  },
  {
    institution: "Zero To Mastery Academy",
    degree: "Continuous Learning & Development",
    period: "Ongoing",
  },
];

export const SKILLS: SkillCategory[] = [
  {
    name: "Core Tech",
    skills: ["Python", "Machine Learning", "GenAI", "Data Science"],
  },
  {
    name: "Cloud & Platforms",
    skills: ["Amazon Web Services (AWS)", "Salesforce.com Development", "MySQL"],
  },
  {
    name: "Web Development",
    skills: ["Flask", "HTML/CSS", "JavaScript"],
  },
  {
    name: "Certifications",
    skills: [
      "AWS Cloud Fundamentals",
      "Agentic AI (MCP)",
      "Salesforce Developer (Agentblazer)",
      "Cisco Networking",
      "Python Foundation (Infosys)",
    ],
  },
];

export const CERTIFICATES: Certificate[] = [
  {
    title: "AWS Academy Graduate - Cloud Foundations",
    issuer: "AWS Academy",
    date: "June 29, 2025",
    link: "https://www.credly.com/go/qSQCEbM0",
    skills: ["Cloud Computing", "AWS Core Services"],
  },
  {
    title: "Model Context Protocol (MCP): Hands-On with Agentic AI",
    issuer: "LinkedIn Learning",
    date: "July 26, 2025",
    skills: ["Anthropic Claude", "AI Agents", "APIs"],
    credentialId: "c1c43c621f08f0dc0ca05670a01255879ceec339e434dcf6fd352ba691418b57"
  },
  {
    title: "Introduction to Artificial Intelligence",
    issuer: "LinkedIn Learning",
    date: "Oct 22, 2025",
    skills: ["AI Literacy", "Artificial Intelligence"],
    credentialId: "1b795f0e089e54f8d4f84f004b813139491333b00392338ba9bdd0b6026033de"
  },
  {
    title: "Introduction to Conversational AI",
    issuer: "LinkedIn Learning",
    date: "Oct 30, 2025",
    skills: ["Conversational AI", "Generative AI", "AI Business Strategy"],
    credentialId: "b6ee444b4c94424cdb720a3bdc4434173c2ca123e11a2bc844cb46e067cb40a2"
  },
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte (Forage)",
    date: "May 15, 2025",
    skills: ["Data Analysis", "Forensic Technology", "Tableau"],
  },
  {
    title: "Python Foundation Certification",
    issuer: "Infosys Springboard",
    date: "Feb 23, 2025",
    skills: ["Python Programming"],
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "Dec 07, 2024",
    skills: ["Cybersecurity Basics", "Network Security"],
  },
];

// Data for the visualization chart
export const SKILL_DATA = [
  { name: 'Python/ML', value: 90 },
  { name: 'Cloud (AWS)', value: 75 },
  { name: 'Salesforce', value: 80 },
  { name: 'Web Dev', value: 70 },
  { name: 'GenAI', value: 85 },
];

export const SYSTEM_INSTRUCTION = `You are an AI assistant representing Kunal Pandey. 
Use the following resume context to answer questions about him strictly. 
Do not make up facts not present in this context.
Tone: Professional, enthusiastic, and humble.

Context:
Name: ${PERSONAL_INFO.name}
Headline: ${PERSONAL_INFO.headline}
Location: ${PERSONAL_INFO.location}
Contact: ${PERSONAL_INFO.email}
Summary: ${PERSONAL_INFO.summary}

Projects:
${PROJECTS.map((p) => `- ${p.title} (${p.category}): ${p.description} (Tech: ${p.tech.join(", ")})`).join("\n")}

Education:
${EDUCATION.map((e) => `- ${e.institution}: ${e.degree} (${e.period})`).join("\n")}

Certificates:
${CERTIFICATES.map((c) => `- ${c.title} by ${c.issuer} (${c.date})`).join("\n")}

Skills:
${SKILLS.map((s) => `- ${s.name}: ${s.skills.join(", ")}`).join("\n")}

If asked about something not in the resume, suggest contacting him directly via email.`;