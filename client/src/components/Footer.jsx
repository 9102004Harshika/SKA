const Footer = () => {
  return (
    <footer className="mt-10 font-body flex flex-wrap text-secondary border-t-2 bg-primary border-secondary p-8 mx-2 rounded-t-3xl">
      <div className="w-full md:w-1/3 mb-6 md:mb-0">
        <h1 className="text-2xl font-highlight text-background">
          Shree Kalam Academy
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

      <div className="w-full md:w-2/3 flex flex-wrap">
        <div className="w-1/2 md:w-1/3 mb-6 text-center">
          <h2 className="text-sm text-accent">Media</h2>
          <ul className="mt-2 space-y-1">
            <li>
              <a
                href="#"
                className="text-background hover:underline underline-offset-4"
              >
                Print
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-background hover:underline underline-offset-4"
              >
                Print
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-background hover:underline underline-offset-4"
              >
                Alternative Ads
              </a>
            </li>
          </ul>
        </div>

        <div className="w-1/2 md:w-1/3 mb-6">
          <h2 className="text-sm text-accent font-light">Technology</h2>
          <ul className="mt-2 grid grid-cols-2 gap-2">
            <li>
              <a
                href="#"
                className="text-background hover:underline underline-offset-4"
              >
                Hardware Design
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-background  hover:underline underline-offset-4"
              >
                Software Design
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-background hover:underline underline-offset-4"
              >
                Digital Signage
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-background hover:underline underline-offset-4"
              >
                Automation
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-background hover:underline underline-offset-4"
              >
                Artificial Intelligence
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-background hover:underline underline-offset-4"
              >
                IoT
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/3">
          <h2 className="text-sm text-accent font-light">Legal</h2>
          <ul className="mt-2 space-y-1">
            <li>
              <a
                href="#"
                className="text-background hover:underline underline-offset-4"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-background hover:underline underline-offset-4"
              >
                Terms of Use
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-background hover:underline underline-offset-4"
              >
                Sitemap
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full flex flex-wrap justify-between items-center text-background text-sm mt-6 border-t border-accent pt-4">
        <p>&copy; 2024 Shree Kalam Academy. All rights reserved.</p>
        <div>
          <span>
            Made with <span className="text-error">♥</span> by{" "}
            <a
              href="https://abhikatechsolution.netlify.app/"
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
