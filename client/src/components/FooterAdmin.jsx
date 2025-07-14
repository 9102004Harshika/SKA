import React from "react";

const FooterAdmin = () => {
  return (
    <footer>
      <div className="w-screen flex flex-wrap justify-between items-center text-background text-sm border-t border-accent p-8 bg-primary">
        <p>&copy; 2024 Kalp Academy. All rights reserved.</p>
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

export default FooterAdmin;
