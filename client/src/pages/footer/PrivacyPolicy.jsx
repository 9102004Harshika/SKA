import React from 'react';
import { FaShieldAlt, FaLock, FaUsers, FaServer, FaEyeSlash, FaExclamationCircle } from 'react-icons/fa';

const PrivacyPolicy = () => {
  const currentDate = new Date().getFullYear();
  
  const sections = [
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: "Information We Collect",
      content: (
        <ul className="list-disc pl-5 space-y-2 text-secondary/90">
          <li>Personal information (name, email, contact details) provided during account creation</li>
          <li>Payment and billing information for premium services</li>
          <li>Usage data including pages visited, time spent, and features used</li>
          <li>Device information and browser details for analytics</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
      )
    },
    {
      icon: <FaLock className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: (
        <ul className="list-disc pl-5 space-y-2 text-secondary/90">
          <li>To provide and maintain our services</li>
          <li>To process transactions and send related information</li>
          <li>To send administrative and promotional communications</li>
          <li>To improve our platform and user experience</li>
          <li>To monitor and analyze usage and trends</li>
          <li>To detect, prevent, and address technical issues</li>
        </ul>
      )
    },
    {
      icon: <FaUsers className="w-6 h-6" />,
      title: "Information Sharing",
      content: (
        <div className="space-y-4">
          <p className="text-secondary/90">We do not sell or rent your personal information to third parties. We may share information with:</p>
          <ul className="list-disc pl-5 space-y-2 text-secondary/90">
            <li>Service providers who assist in operating our platform</li>
            <li>Business partners for co-branded services</li>
            <li>Legal authorities when required by law</li>
            <li>In connection with a merger, sale, or asset transfer</li>
          </ul>
        </div>
      )
    },
    {
      icon: <FaServer className="w-6 h-6" />,
      title: "Data Security",
      content: (
        <div className="space-y-4">
          <p className="text-secondary/90">We implement appropriate technical and organizational measures to protect your personal information, including:</p>
          <ul className="list-disc pl-5 space-y-2 text-secondary/90">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments and updates</li>
            <li>Access controls and authentication mechanisms</li>
            <li>Regular data backups</li>
          </ul>
        </div>
      )
    },
    {
      icon: <FaEyeSlash className="w-6 h-6" />,
      title: "Your Privacy Rights",
      content: (
        <div className="space-y-4">
          <p className="text-secondary/90">Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-5 space-y-2 text-secondary/90">
            <li>Access and receive a copy of your personal data</li>
            <li>Rectify or update your information</li>
            <li>Request deletion of your data</li>
            <li>Object to or restrict processing of your data</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </div>
      )
    },
    {
      icon: <FaExclamationCircle className="w-6 h-6" />,
      title: "Changes to This Policy",
      content: (
        <p className="text-secondary/90">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
          on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
        </p>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background text-secondary p-4 md:p-8 font-body">
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-header text-primary mb-4">Privacy Policy</h1>
          <p className="text-lg text-secondary/80">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <div className="w-24 h-1 bg-accent mx-auto mt-4"></div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-8">
            <p className="text-lg text-secondary/90 mb-8">
              At Kalp Academy, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you use our platform and services. Please read this policy carefully.
            </p>

            <div className="space-y-12">
              {sections.map((section, index) => (
                <section key={index} className="group">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="flex-shrink-0 p-2 bg-accent/10 rounded-lg text-accent">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-header text-primary mt-1">{section.title}</h2>
                  </div>
                  <div className="pl-16 space-y-4">
                    {section.content}
                  </div>
                  {index < sections.length - 1 && (
                    <div className="border-t border-gray-100 my-8"></div>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
              <h3 className="text-xl font-header text-primary mb-3">Contact Us</h3>
              <p className="text-secondary/90">
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@shreekalamacademy.com" className="text-accent hover:underline font-medium">
                  privacy@shreekalamacademy.com
                </a>.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-secondary/60">
          <p>© {currentDate} Kalp Academy. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;