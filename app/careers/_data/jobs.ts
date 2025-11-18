export type JobType = "full-time" | "part-time" | "contract" | "remote";
export type JobDepartment = "Engineering" | "Design" | "Marketing" | "Sales" | "Operations" | "Product";
export type JobLocation = "Tehran" | "Remote" | "Hybrid";

export interface JobPosting {
  id: string;
  slug: string;
  title: string;
  department: JobDepartment;
  location: JobLocation;
  type: JobType;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  postedDate: Date;
  applicationUrl?: string;
}

// Mock job data
export const mockJobs: JobPosting[] = [
  {
    id: "1",
    slug: "senior-frontend-engineer",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Tehran",
    type: "full-time",
    description:
      "We're looking for an experienced Frontend Engineer to join our team and help build the next generation of AI-powered business management tools.",
    requirements: [
      "5+ years of experience with React and TypeScript",
      "Strong understanding of modern frontend architecture",
      "Experience with Next.js and server-side rendering",
      "Proficiency in Tailwind CSS and responsive design",
      "Experience with state management (Redux, Zustand, etc.)",
      "Strong problem-solving and communication skills",
    ],
    responsibilities: [
      "Build and maintain high-quality React components",
      "Collaborate with designers to implement pixel-perfect UIs",
      "Optimize application performance and user experience",
      "Write clean, maintainable, and well-tested code",
      "Mentor junior developers and conduct code reviews",
      "Participate in architectural decisions and technical planning",
    ],
    benefits: [
      "Competitive salary and equity",
      "Flexible working hours",
      "Health insurance",
      "Learning and development budget",
      "Modern office in Tehran",
    ],
    postedDate: new Date("2024-01-15"),
  },
  {
    id: "2",
    slug: "ai-ml-engineer",
    title: "AI/ML Engineer",
    department: "Engineering",
    location: "Hybrid",
    type: "full-time",
    description:
      "Join our AI team to develop cutting-edge machine learning models that power our business intelligence platform.",
    requirements: [
      "3+ years of experience in machine learning and AI",
      "Strong Python programming skills",
      "Experience with TensorFlow, PyTorch, or similar frameworks",
      "Understanding of NLP and computer vision",
      "Experience with cloud platforms (AWS, GCP, or Azure)",
      "Strong mathematical and statistical background",
    ],
    responsibilities: [
      "Design and implement machine learning models",
      "Train and optimize AI algorithms for business applications",
      "Collaborate with product team to identify AI opportunities",
      "Monitor and improve model performance in production",
      "Research and implement state-of-the-art ML techniques",
      "Document technical approaches and findings",
    ],
    benefits: [
      "Competitive salary and equity",
      "Hybrid work arrangement",
      "Access to latest AI tools and resources",
      "Conference and research paper budget",
      "Collaborative research environment",
    ],
    postedDate: new Date("2024-01-20"),
  },
  {
    id: "3",
    slug: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "Tehran",
    type: "full-time",
    description:
      "We're seeking a talented Product Designer to create beautiful, intuitive experiences for our AI-powered platform.",
    requirements: [
      "4+ years of product design experience",
      "Strong portfolio demonstrating UX/UI skills",
      "Proficiency in Figma and design systems",
      "Experience designing complex B2B applications",
      "Understanding of user research and usability testing",
      "Excellent communication and collaboration skills",
    ],
    responsibilities: [
      "Design user interfaces for web and mobile applications",
      "Create and maintain design systems and component libraries",
      "Conduct user research and usability testing",
      "Collaborate with engineers to ensure design quality",
      "Create prototypes and interactive mockups",
      "Present design concepts to stakeholders",
    ],
    benefits: [
      "Competitive salary",
      "Creative and collaborative environment",
      "Latest design tools and software",
      "Professional development opportunities",
      "Flexible working hours",
    ],
    postedDate: new Date("2024-01-10"),
  },
  {
    id: "4",
    slug: "backend-engineer",
    title: "Backend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "full-time",
    description:
      "Build scalable backend systems that power our AI-driven business management platform.",
    requirements: [
      "4+ years of backend development experience",
      "Strong knowledge of Node.js or Python",
      "Experience with PostgreSQL and Redis",
      "Understanding of microservices architecture",
      "Experience with Docker and Kubernetes",
      "Knowledge of API design and RESTful services",
    ],
    responsibilities: [
      "Design and implement scalable backend services",
      "Build and maintain RESTful APIs",
      "Optimize database queries and performance",
      "Implement security best practices",
      "Write comprehensive tests and documentation",
      "Collaborate with frontend team on API contracts",
    ],
    benefits: [
      "Competitive salary and equity",
      "Fully remote position",
      "Flexible working hours",
      "Health insurance",
      "Learning budget",
    ],
    postedDate: new Date("2024-01-25"),
  },
  {
    id: "5",
    slug: "marketing-manager",
    title: "Marketing Manager",
    department: "Marketing",
    location: "Tehran",
    type: "full-time",
    description:
      "Lead our marketing efforts to grow Karanova's presence in the Iranian market and beyond.",
    requirements: [
      "5+ years of marketing experience in tech industry",
      "Strong understanding of digital marketing channels",
      "Experience with content marketing and SEO",
      "Excellent Persian and English writing skills",
      "Data-driven approach to marketing decisions",
      "Experience with marketing automation tools",
    ],
    responsibilities: [
      "Develop and execute marketing strategies",
      "Manage content creation and distribution",
      "Oversee social media and community engagement",
      "Analyze marketing metrics and ROI",
      "Coordinate with sales team on lead generation",
      "Manage marketing budget and campaigns",
    ],
    benefits: [
      "Competitive salary",
      "Creative freedom and autonomy",
      "Marketing tools and resources",
      "Professional development budget",
      "Collaborative team environment",
    ],
    postedDate: new Date("2024-01-18"),
  },
  {
    id: "6",
    slug: "devops-engineer",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Hybrid",
    type: "full-time",
    description:
      "Help us build and maintain robust infrastructure for our growing platform.",
    requirements: [
      "3+ years of DevOps experience",
      "Strong knowledge of AWS or GCP",
      "Experience with Kubernetes and Docker",
      "Proficiency in Infrastructure as Code (Terraform, CloudFormation)",
      "Understanding of CI/CD pipelines",
      "Strong scripting skills (Bash, Python)",
    ],
    responsibilities: [
      "Manage cloud infrastructure and deployments",
      "Implement and maintain CI/CD pipelines",
      "Monitor system performance and reliability",
      "Automate operational tasks and processes",
      "Ensure security and compliance standards",
      "Collaborate with development teams on infrastructure needs",
    ],
    benefits: [
      "Competitive salary and equity",
      "Hybrid work arrangement",
      "Latest DevOps tools and platforms",
      "Certification and training budget",
      "On-call compensation",
    ],
    postedDate: new Date("2024-01-22"),
  },
];

// Bilingual job content
export const jobTranslations = {
  en: {
    departments: {
      Engineering: "Engineering",
      Design: "Design",
      Marketing: "Marketing",
      Sales: "Sales",
      Operations: "Operations",
      Product: "Product",
    },
    locations: {
      Tehran: "Tehran",
      Remote: "Remote",
      Hybrid: "Hybrid",
    },
    types: {
      "full-time": "Full-time",
      "part-time": "Part-time",
      contract: "Contract",
      remote: "Remote",
    },
    labels: {
      openPositions: "Open Positions",
      filterBy: "Filter by",
      department: "Department",
      location: "Location",
      type: "Type",
      allDepartments: "All Departments",
      allLocations: "All Locations",
      allTypes: "All Types",
      apply: "Apply Now",
      viewDetails: "View Details",
      postedOn: "Posted on",
      requirements: "Requirements",
      responsibilities: "Responsibilities",
      benefits: "Benefits",
      noJobs: "No positions available at the moment",
      checkBackSoon: "Check back soon for new opportunities",
    },
  },
  fa: {
    departments: {
      Engineering: "مهندسی",
      Design: "طراحی",
      Marketing: "بازاریابی",
      Sales: "فروش",
      Operations: "عملیات",
      Product: "محصول",
    },
    locations: {
      Tehran: "تهران",
      Remote: "دورکاری",
      Hybrid: "ترکیبی",
    },
    types: {
      "full-time": "تمام‌وقت",
      "part-time": "پاره‌وقت",
      contract: "قراردادی",
      remote: "دورکاری",
    },
    labels: {
      openPositions: "موقعیت‌های شغلی باز",
      filterBy: "فیلتر بر اساس",
      department: "بخش",
      location: "موقعیت",
      type: "نوع",
      allDepartments: "همه بخش‌ها",
      allLocations: "همه موقعیت‌ها",
      allTypes: "همه انواع",
      apply: "درخواست",
      viewDetails: "مشاهده جزئیات",
      postedOn: "تاریخ انتشار",
      requirements: "الزامات",
      responsibilities: "مسئولیت‌ها",
      benefits: "مزایا",
      noJobs: "در حال حاضر موقعیت شغلی موجود نیست",
      checkBackSoon: "به زودی برای فرصت‌های جدید مراجعه کنید",
    },
  },
};
