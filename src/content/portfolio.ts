export type NavigationItem = {
  id: string;
  label: string;
};

type ActionLink = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

type Principle = {
  title: string;
  description: string;
};

export type SkillItem = {
  name: string;
  icon?: string;
};

type SkillGroup = {
  title: string;
  label: string;
  items: SkillItem[];
};

type ExperienceItem = {
  period: string;
  title: string;
  company: string;
  summary: string;
  bullets: string[];
};

type ProjectItem = {
  name: string;
  summary: string;
  impact: string;
  stack: string[];
  href: string;
};

type ContactLink = {
  label: string;
  value: string;
  href: string;
};

export const portfolio = {
  navigation: [
    { id: "about", label: "Overview" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Journey" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" }
  ] satisfies NavigationItem[],
  hero: {
    eyebrow: "Software Engineer",
    lead: "Hi, I'm",
    name: "Toan Ngo",
    handle: "@tommitoan",
    role: "Go Developer and DevOps Engineer building scalable backend systems and cloud-native products.",
    description:
      "Based in Ho Chi Minh City, I have over 3 years of experience across Golang, RESTful APIs, AWS infrastructure, microservices architecture, and product-focused system design.",
    highlights: ["Go and gRPC", "AWS and Kubernetes", "API-first backend"],
    ctas: [
      { label: "View Projects", href: "#projects", variant: "primary" },
      { label: "Resume", href: "/ToanNgo-resume.pdf", variant: "secondary" }
    ] satisfies ActionLink[],
    metrics: [
      { value: "3+", label: "Years Experience" },
      { value: "6+", label: "Projects Delivered" },
      { value: "10+", label: "Core Technologies" }
    ]
  },
  about: {
    intro:
      "I build backend systems that are fast, observable, and maintainable. My current work spans Golang services, microservice architecture, cloud infrastructure, CI/CD, and the product thinking needed to turn technical systems into usable software.",
    points: [
      "I specialize in high-performance Go services with clean architecture, REST and gRPC APIs, and scalable communication patterns.",
      "I work comfortably across AWS, Kubernetes, Docker, GitHub Actions, and GitOps workflows to ship and operate cloud-native systems.",
      "I care about observability, documentation, and secure-by-default foundations so systems stay manageable as they grow.",
      "I also work across the stack when needed, using React and TypeScript to help deliver complete product experiences."
    ],
    actions: [
      { label: "Resume", href: "/ToanNgo-resume.pdf", variant: "primary" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/tommitoan/", variant: "primary" },
      { label: "GitHub", href: "https://github.com/tommitoan", variant: "secondary" }
    ] satisfies ActionLink[],
    principles: [
      {
        title: "Backend Engineering",
        description: "Golang, clean architecture, API-first design, and scalable service boundaries are the core of my work."
      },
      {
        title: "Cloud and Delivery",
        description: "I design deployment flows with Kubernetes, GitOps, CI/CD, and infrastructure practices that keep releases reliable."
      },
      {
        title: "Product Mindset",
        description: "I aim for systems that are technically robust and still aligned with user needs, business goals, and team velocity."
      }
    ] satisfies Principle[]
  },
  skills: [
    {
      title: "Backend and API",
      label: "<backend>",
      items: [
        { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" },
        { name: "gRPC", icon: "https://cdn.simpleicons.org/google/white" },
        { name: "REST APIs", icon: "https://cdn.simpleicons.org/fastapi/white" },
        { name: "OpenAPI", icon: "https://cdn.simpleicons.org/openapiinitiative/white" },
        { name: "Clean Arch" }
      ]
    },
    {
      title: "Cloud and DevOps",
      label: "<cloud>",
      items: [
        { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
        { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" },
        { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
        { name: "Argo CD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/argocd/argocd-original.svg" },
        { name: "Actions", icon: "https://cdn.simpleicons.org/githubactions/white" }
      ]
    },
    {
      title: "Platform and Product",
      label: "<platform>",
      items: [
        { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
        { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
        { name: "OpnTlmtry", icon: "https://cdn.simpleicons.org/opentelemetry/white" },
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" }
      ]
    }
  ] satisfies SkillGroup[],
  experience: [
    {
      period: "Now",
      title: "Software Engineer, GTG CRM",
      company: "GTG Software",
      summary: "Built GTG CRM from the ground up as a scalable Vietnam-focused CRM platform, leading major parts of its omni-channel messaging and architecture foundation.",
      bullets: [
        "Designed and developed the core omni-channel messaging service across contact, marketing, sales, and support flows",
        "Implemented OAuth2 identity management with Keycloak and WebSocket support for real-time chat",
        "Established microservices architecture with gRPC, REST gateways, CI/CD, and observability on AWS"
      ]
    },
    {
      period: "2023",
      title: "Software Engineer, Tokeet",
      company: "GTG Software",
      summary: "Rebuilt Tokeet's messaging platform in Golang, replacing a Perl-based system to improve performance, scalability, and maintainability.",
      bullets: [
        "Built the system from scratch with multi-channel messaging, centralized conversations, and OAuth2 integrations",
        "Used Amazon SQS and cloud APIs for parallel communication and efficient message processing",
        "Deployed on AWS and produced documentation so non-technical managers could operate the system"
      ]
    },
    {
      period: "2023",
      title: "Software Engineer, Trydome",
      company: "GTG Software",
      summary: "Improved a cloud database platform by optimizing data flows, integrating billing, and designing GitOps-driven CI/CD capabilities.",
      bullets: [
        "Optimized critical queries and cleaned production data to improve system responsiveness and reporting quality",
        "Designed FluxCD-based CI/CD initiatives so customers could manage databases through the platform",
        "Implemented Stripe-integrated REST APIs for invoice collection and payment automation"
      ]
    }
  ] satisfies ExperienceItem[],
  projects: [
    {
      name: "gRPC Testing Framework",
      summary: "Reusable integration testing framework for gRPC services with advanced mocking patterns and structured test data management.",
      impact: "Improved test reliability across service boundaries and helped drive 90 percent plus coverage across microservice workflows.",
      stack: ["Go", "gRPC", "testify", "gomock", "Protocol Buffers"],
      href: "https://github.com/tommitoan"
    },
    {
      name: "OpenAPI-First Backend Service",
      summary: "Contract-first backend service with OpenAPI specifications, generated server and client code, and robust validation middleware.",
      impact: "Made API delivery more predictable by aligning implementation, documentation, and validation around one source of truth.",
      stack: ["Go", "OpenAPI", "oapi-codegen", "Chi Router", "PostgreSQL"],
      href: "https://github.com/tommitoan"
    },
    {
      name: "Kubernetes GitOps Platform",
      summary: "End-to-end GitOps platform using Argo CD, Helm, and GitHub Actions for automated deployment into a k3s cluster.",
      impact: "Standardized deployment flow for multiple services and reduced operational friction by turning release steps into repeatable automation.",
      stack: ["Kubernetes", "k3s", "Argo CD", "Helm", "GitHub Actions"],
      href: "https://github.com/tommitoan"
    }
  ] satisfies ProjectItem[],
  contact: {
    heading: "Let's build something reliable",
    description:
      "I am based in Ho Chi Minh City and focused on backend engineering, cloud infrastructure, and product-oriented system design. If you want to discuss a role or a project, these are the fastest ways to reach me.",
    links: [
      {
        label: "Email",
        value: "tommitoan1995@gmail.com",
        href: "mailto:tommitoan1995@gmail.com"
      },
      {
        label: "GitHub",
        value: "github.com/tommitoan",
        href: "https://github.com/tommitoan"
      },
      {
        label: "LinkedIn",
        value: "linkedin.com/in/tommitoan",
        href: "https://www.linkedin.com/in/tommitoan/"
      }
    ] satisfies ContactLink[]
  },
  footer: {
    note: "Toan Ngo, software engineer focused on Go, cloud infrastructure, and scalable backend systems.",
    meta: "Ho Chi Minh City, Vietnam"
  }
};
