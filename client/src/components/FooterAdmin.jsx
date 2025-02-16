import React from "react";

const FooterAdmin = () => {
  return (
    <footer>
      <div className="w-screen flex flex-wrap justify-between items-center text-background text-sm mt-6 border-t border-accent p-8 bg-primary">
        <p>&copy; 2024 Shree Kalam Academy. All rights reserved.</p>
        <div>
          <span>
            Made with <span className="text-red-700">♥</span> by{" "}
            <a href="" className="text-secondary">
              Abhika Tech Solutions
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default FooterAdmin;
