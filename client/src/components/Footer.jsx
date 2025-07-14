import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTelegramPlane,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-10 font-body text-secondary border-t-2 bg-primary border-secondary p-8 md:mx-2 mx-0 rounded-t-3xl">
      <div className="flex flex-wrap md:flex-nowrap justify-between gap-8">
        {/* Contact Section */}
        <div className="w-full md:w-1/4">
          <h1 className="text-2xl font-highlight text-background">
            Kalp Academy
          </h1>
          <h2 className="mt-4 text-sm font-light text-accent">Contact</h2>
          <address className="not-italic text-background">
            Kandivali (W), Mumbai, India 90764-87846 <br />
            <a
              href="mailto:example@gmail.com"
              className="mt-3 inline-block bg-accent font-semibold text-primary py-2 px-4 rounded-full hover:underline underline-offset-2"
            >
              Email Us
            </a>
          </address>
        </div>

        {/* About Section */}
        <div className="w-full md:w-1/4 text-left">
          <h2 className="text-sm text-accent">About</h2>
          <ul className="mt-2 space-y-1 text-background">
            {[
              { text: "About Us", link: "/app/about-us" },
              { text: "Careers", link: "/app/careers" },
              { text: "Teachers", link: "/app/teachers" },
              { text: "Developers", link: "/app/developers" },
              { text: "Contact Us", link: "/app/contact-us" },
            ].map((item) => (
              <li key={item.text}>
                {item.link.startsWith("/") ? (
                  <Link
                    to={item.link}
                    className="hover:underline hover:translate-x-1 underline-offset-4 transition-transform duration-200 inline-block"
                  >
                    {item.text}
                  </Link>
                ) : (
                  <a
                    href={item.link}
                    className="hover:underline hover:translate-x-1 underline-offset-4 transition-transform duration-200 inline-block"
                  >
                    {item.text}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Section */}
        <div className="w-full md:w-1/4 text-left">
          <h2 className="text-sm text-accent">Legal & Accessibility</h2>
          <ul className="mt-2 space-y-1 text-background">
            {[
              { text: "Privacy Policy", link: "/app/privacy-policy" },
              { text: "Terms & Conditions", link: "/app/terms-and-conditions" },
              { text: "FAQ", link: "/app/faq" },
              { text: "Refund Policy", link: "/app/refund-policy" },
              { text: "Accessibility", link: "/app/accessibility" },
            ].map((item) => (
              <li key={item.text}>
                {item.link.startsWith("/") ? (
                  <Link
                    to={item.link}
                    className="hover:underline hover:translate-x-1 underline-offset-4 transition-transform duration-200 inline-block"
                  >
                    {item.text}
                  </Link>
                ) : (
                  <a
                    href={item.link}
                    className="hover:underline hover:translate-x-1 underline-offset-4 transition-transform duration-200 inline-block"
                  >
                    {item.text}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div className="w-full md:w-1/4 text-left">
          <h2 className="text-sm text-accent">Connect Here</h2>
          <ul className="mt-2 space-y-1 text-background">
            {[
              {
                name: "Youtube",
                icon: <FaYoutube />,
                link: "https://youtube.com",
              },
              {
                name: "Instagram",
                icon: <FaInstagram />,
                link: "https://instagram.com",
              },
              {
                name: "Facebook",
                icon: <FaFacebookF />,
                link: "https://facebook.com",
              },
              {
                name: "Telegram",
                icon: <FaTelegramPlane />,
                link: "https://t.me",
              },
            ].map(({ name, icon, link }) => (
              <li key={name}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent hover:translate-x-1 transition-transform flex items-center gap-1"
                >
                  {icon} {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="w-full flex flex-wrap justify-between items-center text-background text-sm mt-6 border-t border-accent pt-4">
        <p>&copy; 2024 Kalp Academy. All rights reserved.</p>
        <div>
          <span>
            Made with <span className="text-error">♥</span> by{" "}
            <a
              href="https://abhikatechsolutions.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline underline-offset-2"
            >
              Abhika Tech Solutions
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
