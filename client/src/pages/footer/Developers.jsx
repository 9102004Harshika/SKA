import {
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaCode,
  FaMobile,
  FaServer,
  FaDatabase,
  FaPalette,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";

const Developers = () => {
  const developers = [
    {
      name: "Abhay Kumar Das",
      role: "Lead Developer & Architect",
      bio: "Spearheaded the development of Kalp Academy's learning platform, focusing on creating a scalable and performant architecture. Led the technical direction and mentored the development team.",
      image: "https://avatars.githubusercontent.com/u/120706732?v=4",
      contributions: [
        "Designed and implemented the core platform architecture",
        "Developed the course management system and user authentication",
        "Optimized application performance and database queries",
        "Implemented real-time features and WebSocket integration",
      ],
      technologies: ["React", "Node.js", "MongoDB", "GraphQL", "Docker", "AWS"],
      links: [
        { icon: <FaGithub />, url: "https://github.com/abhay" },
        { icon: <FaLinkedin />, url: "https://linkedin.com/in/abhay" },
        { icon: <FaGlobe />, url: "https://abhay.dev" },
      ],
    },
    {
      name: "Harshika Gawade",
      role: "Frontend & Backend Developer",
      bio: "Passionate about creating intuitive user interfaces and smooth user experiences. Responsible for implementing the responsive design and interactive components.",
      image: "https://avatars.githubusercontent.com/u/110835926?v=4",
      contributions: [
        "Developed the responsive user interface using React and Tailwind CSS",
        "Implemented state management and API integrations",
        "Optimized frontend performance and accessibility",
        "Created reusable component library",
      ],
      technologies: ["React", "TypeScript", "Tailwind CSS", "Redux", "Jest"],
      links: [
        { icon: <FaGithub />, url: "https://github.com/priyap" },
        { icon: <FaLinkedin />, url: "https://linkedin.com/in/priyap" },
      ],
    },
    // {
    //   name: "Rahul Verma",
    //   role: "Backend Developer",
    //   bio: "Focused on building robust and secure backend services. Ensured high availability and performance of the platform's core functionality.",
    //   contributions: [
    //     "Developed RESTful APIs and microservices",
    //     "Implemented authentication and authorization systems",
    //     "Optimized database queries and caching strategies",
    //     "Set up CI/CD pipelines and deployment workflows"
    //   ],
    //   technologies: ["Node.js", "Express", "MongoDB", "Redis", "Kubernetes", "GCP"],
    //   links: [
    //     { icon: <FaGithub />, url: "https://github.com/rahulv" },
    //     { icon: <FaLinkedin />, url: "https://linkedin.com/in/rahulv" }
    //   ]
    // },
    // {
    //   name: "Ananya Gupta",
    //   role: "UI/UX Designer & Frontend Developer",
    //   bio: "Combining design thinking with frontend development to create beautiful and functional user interfaces. Focused on creating an engaging learning experience.",
    //   contributions: [
    //     "Designed the user interface and experience",
    //     "Created design system and component library",
    //     "Implemented animations and micro-interactions",
    //     "Conducted user research and usability testing"
    //   ],
    //   technologies: ["Figma", "React", "Framer Motion", "CSS-in-JS", "Storybook"],
    //   links: [
    //     { icon: <FaGithub />, url: "https://github.com/ananyag" },
    //     { icon: <FaLinkedin />, url: "https://linkedin.com/in/ananyag" },
    //     { icon: <FaGlobe />, url: "https://ananya.design" }
    //   ]
    // }
  ];

  const techStack = [
    {
      name: "Frontend",
      icon: <FaCode className="w-5 h-5" />,
      items: ["React", "TypeScript", "Tailwind CSS", "Redux"],
    },
    {
      name: "Backend",
      icon: <FaServer className="w-5 h-5" />,
      items: ["Node.js", "Express", "NestJS", "GraphQL"],
    },
    {
      name: "Database",
      icon: <FaDatabase className="w-5 h-5" />,
      items: ["MongoDB", "PostgreSQL", "Redis"],
    },
    {
      name: "Mobile",
      icon: <FaMobile className="w-5 h-5" />,
      items: ["React Native", "Expo"],
    },
    {
      name: "Design",
      icon: <FaPalette className="w-5 h-5" />,
      items: ["Figma", "Framer Motion", "Storybook"],
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-header text-primary mb-4">
            The Team Behind Kalp Academy
          </h1>
          <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
            Meet the talented individuals who brought this platform to life
          </p>
          <div className="w-24 h-1 bg-accent mx-auto mt-6"></div>
        </div>

        {/* Developers Section */}
        <div className="space-y-20">
          {developers.map((dev, index) => (
            <section
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 items-center`}
            >
              <div className="md:w-1/3">
                <div className="bg-gradient-to-br from-accent/20 to-primary/10 p-1 rounded-2xl">
                  <img
                    src={dev.image}
                    alt={dev.name}
                    className="w-full h-auto rounded-2xl border-4 border-white"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <h2 className="text-2xl md:text-3xl font-header text-primary">
                    {dev.name}
                  </h2>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
                    {dev.role}
                  </span>
                </div>
                <p className="text-secondary/90 mb-6">{dev.bio}</p>

                <div className="mb-6">
                  <h3 className="font-medium text-primary mb-2">
                    Key Contributions:
                  </h3>
                  <ul className="space-y-2">
                    {dev.contributions.map((contribution, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-accent mr-2 mt-1">•</span>
                        <span className="text-secondary/90">
                          {contribution}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {dev.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary/5 text-primary text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {dev.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/5 text-primary hover:bg-accent/10 hover:text-accent transition-colors"
                    >
                      {link.icon}
                    </a>
                  ))}
                  <a
                    href={`mailto:${dev.name
                      .split(" ")[0]
                      .toLowerCase()}@shreekalamacademy.com`}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/5 text-primary hover:bg-accent/10 hover:text-accent transition-colors"
                  >
                    <FiMail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Tech Stack Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-header text-primary mb-4">
              Our Technology Stack
            </h2>
            <p className="text-secondary/80 max-w-2xl mx-auto">
              We use modern technologies to deliver a fast, secure, and scalable
              learning platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {techStack.map((stack, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border border-gray-100"
              >
                <div className="text-accent mb-3">{stack.icon}</div>
                <h3 className="text-lg font-medium text-primary mb-3">
                  {stack.name}
                </h3>
                <ul className="space-y-2">
                  {stack.items.map((item, j) => (
                    <li key={j} className="text-secondary/90 flex items-center">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="mt-20 bg-primary/5 p-8 md:p-12 rounded-xl border border-primary/10 text-center">
          <h2 className="text-2xl md:text-3xl font-header text-primary mb-4">
            Interested in Joining Our Team?
          </h2>
          <p className="text-secondary/90 max-w-2xl mx-auto mb-8">
            We're always looking for passionate developers and designers to help
            us build the future of education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:careers@shreekalamacademy.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white hover:bg-accent/90 rounded-full font-medium transition-colors"
            >
              <FiMail className="w-5 h-5" />
              View Open Positions
            </a>
            <a
              href="mailto:hello@shreekalamacademy.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary/20 text-primary hover:bg-white/50 rounded-full font-medium transition-colors"
            >
              <FiMail className="w-5 h-5" />
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Developers;
