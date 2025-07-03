import { useState } from 'react';
import { FiPlus, FiMinus, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'You can create an account by clicking on the "Sign Up" button at the top right corner of the page and following the registration process.'
    },
    {
      question: 'How can I reset my password?',
      answer: 'Click on "Forgot Password" on the login page and enter your registered email address. You will receive a password reset link.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit/debit cards, UPI, and net banking. All transactions are secure and encrypted.'
    },
    {
      question: 'How do I access my purchased courses?',
      answer: 'After logging in, go to "My Courses" in your dashboard to access all your purchased courses and learning materials.'
    },
    {
      question: 'Can I download course materials?',
      answer: 'Yes, most course materials are available for download. Look for the download icon next to each resource.'
    },
    {
      question: 'How do I contact support?',
      answer: 'You can reach our support team 24/7 through the "Contact Us" page or by emailing support@yourdomain.com.'
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Yes, our mobile app is available for both iOS and Android devices. You can download it from the respective app stores.'
    },
    {
      question: 'What is your refund policy?',
      answer: 'We offer a 30-day money-back guarantee for all courses. If you\'re not satisfied, you can request a full refund within 30 days of purchase.'
    }
  ];

  const filteredFaqs = searchTerm.trim() === '' 
    ? faqs 
    : faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-header font-medium text-primary mb-2">Frequently Asked Questions</h1>
          <p className="text-secondary/80">Find answers to common questions about our platform</p>
        </div>

        <div className="mb-8">
          <input
            type="text"
            className="w-full px-4 py-3 border border-secondary/20 bg-background focus:outline-none focus:ring-1 focus:ring-primary text-primary placeholder:text-secondary/60"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* FAQ List */}
        <div className="space-y-2">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div key={index} className="border border-secondary/10">
                <button
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-background/50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-primary">
                    {faq.question}
                  </span>
                  {activeIndex === index ? (
                    <FiMinus className="w-4 h-4 text-primary" />
                  ) : (
                    <FiPlus className="w-4 h-4 text-primary" />
                  )}
                </button>
                {activeIndex === index && (
                  <div className="px-4 pb-4 pt-2 text-secondary/90 border-t border-secondary/10">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-secondary/80">No results found. Try different keywords.</p>
            </div>
          )}
        </div>

        <div className="mt-16 border-t border-secondary/10 pt-12">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-medium text-primary mb-4">Still have questions?</h2>
            <p className="mb-6 text-secondary/90">Contact our support team for assistance.</p>
            
            <div className="space-y-4">
              <a 
                href="mailto:support@ska.com" 
                className="flex items-center gap-3 text-secondary hover:text-primary transition-colors"
              >
                <FiMail className="w-4 h-4 flex-shrink-0" />
                <span>support@ska.com</span>
              </a>
              <a 
                href="tel:+1234567890" 
                className="flex items-center gap-3 text-secondary hover:text-primary transition-colors"
              >
                <FiPhone className="w-4 h-4 flex-shrink-0" />
                <span>+1 (234) 567-890</span>
              </a>
              <div className="flex items-start gap-3 text-secondary">
                <FiMapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>123 Education St, Learning City, 10001</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;