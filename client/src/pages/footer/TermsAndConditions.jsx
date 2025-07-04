import { FiAlertTriangle, FiUser, FiLock, FiCreditCard, FiBook, FiMessageSquare, FiX } from 'react-icons/fi';

const TermsAndConditions = () => {
  const currentYear = new Date().getFullYear();
  
  const sections = [
    {
      title: "1. Acceptance of Terms",
      icon: <FiAlertTriangle className="w-6 h-6 text-accent" />,
      content: (
        <div className="space-y-4">
          <p>
            By accessing or using the SKA platform ("Service"), you agree to be bound by these Terms and Conditions ("Terms"). 
            If you disagree with any part of the terms, you may not access the Service.
          </p>
          <p>
            We reserve the right to modify these Terms at any time. Your continued use of the Service after changes constitutes 
            acceptance of the new Terms.
          </p>
        </div>
      )
    },
    {
      title: "2. User Accounts",
      icon: <FiUser className="w-6 h-6 text-accent" />,
      content: (
        <div className="space-y-4">
          <ul className="list-disc pl-5 space-y-2">
            <li>You must be at least 13 years old to use this Service</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials</li>
            <li>You are responsible for all activities that occur under your account</li>
            <li>You must provide accurate and complete information when creating an account</li>
            <li>We reserve the right to suspend or terminate accounts that violate these Terms</li>
          </ul>
        </div>
      )
    },
    {
      title: "3. Intellectual Property",
      icon: <FiLock className="w-6 h-6 text-accent" />,
      content: (
        <div className="space-y-4">
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of SKA and its licensors. 
            The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
          </p>
          <p>
            You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, 
            republish, download, store, or transmit any of the material on our Service without our prior written consent.
          </p>
        </div>
      )
    },
    {
      title: "4. Payments and Refunds",
      icon: <FiCreditCard className="w-6 h-6 text-accent" />,
      content: (
        <div className="space-y-4">
          <ul className="list-disc pl-5 space-y-2">
            <li>All fees are non-refundable except as required by law</li>
            <li>Prices for our services are subject to change without notice</li>
            <li>We use third-party payment processors for all transactions</li>
            <li>You are responsible for any taxes associated with your purchases</li>
          </ul>
          <p className="text-sm text-secondary/80 italic">
            For subscription services, you may cancel at any time, but no refunds will be provided for the current billing period.
          </p>
        </div>
      )
    },
    {
      title: "5. User Content",
      icon: <FiMessageSquare className="w-6 h-6 text-accent" />,
      content: (
        <div className="space-y-4">
          <p>
            By posting content on or through the Service, you grant us a worldwide, non-exclusive, royalty-free license to use, 
            reproduce, modify, adapt, publish, translate, distribute, and display such content.
          </p>
          <p>
            You are solely responsible for the content you post and the consequences of posting it. You represent that you own or have 
            the necessary rights to the content you post.
          </p>
        </div>
      )
    },
    {
      title: "6. Prohibited Activities",
      icon: <FiX className="w-6 h-6 text-accent" />,
      content: (
        <div className="space-y-4">
          <p>You agree not to use the Service to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Violate any laws or regulations</li>
            <li>Infringe upon the rights of others</li>
            <li>Interfere with or disrupt the Service</li>
            <li>Engage in fraudulent or deceptive activities</li>
            <li>Transmit viruses or malicious code</li>
            <li>Collect information about other users without their consent</li>
          </ul>
        </div>
      )
    },
    {
      title: "7. Limitation of Liability",
      icon: <FiAlertTriangle className="w-6 h-6 text-accent" />,
      content: (
        <div className="space-y-4">
          <p>
            In no event shall SKA, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, 
            incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
            or other intangible losses, resulting from your access to or use of or inability to use the Service.
          </p>
        </div>
      )
    },
    {
      title: "8. Governing Law",
      icon: <FiBook className="w-6 h-6 text-accent" />,
      content: (
        <div className="space-y-4">
          <p>
            These Terms shall be governed and construed in accordance with the laws of the State of [Your State], United States, 
            without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be 
            considered a waiver of those rights.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-header font-bold text-primary mb-4">Terms and Conditions</h1>
          <p className="text-lg text-secondary">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="bg-background rounded-2xl shadow-sm overflow-hidden border border-secondary/10">
          <div className="p-6 sm:p-8">
            <div className="prose max-w-none">
              <p className="text-lg text-secondary mb-8">
                Welcome to SKA. These Terms and Conditions outline the rules and regulations for the use of our platform. 
                By accessing this website, we assume you accept these terms and conditions in full.
              </p>

              <div className="space-y-12">
                {sections.map((section, index) => (
                  <section key={index} className="group">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="flex-shrink-0 p-2 bg-accent/10 rounded-lg">
                        {section.icon}
                      </div>
                      <h2 className="text-xl font-semibold text-primary">{section.title}</h2>
                    </div>
                    <div className="pl-16 text-secondary leading-relaxed">
                      {section.content}
                    </div>
                    {index < sections.length - 1 && (
                      <div className="border-t border-secondary/10 my-8"></div>
                    )}
                  </section>
                ))}
              </div>

              <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border-l-4 border-accent">
                <h3 className="text-lg font-semibold text-primary mb-3">Contact Information</h3>
                <p className="text-secondary">
                  If you have any questions about these Terms, please contact us at{' '}
                  <a href="mailto:legal@ska.com" className="text-accent hover:underline">legal@ska.com</a>.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-secondary/80">
          <p>© {currentYear} SKA. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;