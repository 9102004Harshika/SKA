import { useState, useRef, useEffect } from "react";
import {
  FiPlus,
  FiMinus,
  FiMail,
  FiPhone,
  FiMapPin,
  FiSearch,
} from "react-icons/fi";

const FAQItem = ({ question, answer, isActive, onClick }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isActive ? contentRef.current.scrollHeight : 0);
    }
  }, [isActive]);

  return (
    <div className="border border-secondary/10 rounded-lg overflow-hidden mb-3 transition-all duration-200 hover:shadow-md">
      <button
        className={`w-full px-5 py-4 text-left flex items-center justify-between transition-colors ${
          isActive ? "bg-primary/5" : "bg-white hover:bg-gray-50"
        }`}
        onClick={onClick}
      >
        <span className="font-medium text-primary text-lg">{question}</span>
        {isActive ? (
          <FiMinus className="w-5 h-5 text-primary flex-shrink-0 transition-transform duration-200" />
        ) : (
          <FiPlus className="w-5 h-5 text-primary flex-shrink-0 transition-transform duration-200" />
        )}
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: `${height}px`,
          overflow: "hidden",
          transition: "max-height 0.3s ease-in-out, opacity 0.2s ease-in-out",
          opacity: isActive ? 1 : 0.8,
        }}
        className="bg-white"
      >
        <div className="px-5 pb-5 pt-2 text-secondary/90">{answer}</div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        'You can create an account by clicking on the "Sign Up" button at the top right corner of the page and following the registration process.',
    },
    {
      question: "How can I reset my password?",
      answer:
        'Click on "Forgot Password" on the login page and enter your registered email address. You will receive a password reset link.',
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit/debit cards, UPI, and net banking. All transactions are secure and encrypted.",
    },
    {
      question: "How do I access my purchased courses?",
      answer:
        'After logging in, go to "My Courses" in your dashboard to access all your purchased courses and learning materials.',
    },
    {
      question: "Can I download course materials?",
      answer:
        "Yes, most course materials are available for download. Look for the download icon next to each resource.",
    },
    {
      question: "How do I contact support?",
      answer:
        'You can reach our support team 24/7 through the "Contact Us" page or by emailing support@yourdomain.com.',
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Yes, our mobile app is available for both iOS and Android devices. You can download it from the respective app stores.",
    },
    {
      question: "What is your refund policy?",
      answer:
        "We offer a 30-day money-back guarantee for all courses. If you're not satisfied, you can request a full refund within 30 days of purchase.",
    },
  ];

  const filteredFaqs =
    searchTerm.trim() === ""
      ? faqs
      : faqs.filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 font-header">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about our platform
          </p>
        </div>

        <div className="mb-10 relative">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent text-gray-800 placeholder-gray-400 text-base transition-all duration-200 shadow-sm"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4 mb-16">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isActive={activeIndex === index}
                onClick={() => toggleFaq(index)}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-lg">
                No results found. Try different keywords.
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-8">
            Our support team is here to help you with any questions you might
            have.
          </p>

          <div className="space-y-5">
            <a
              href="mailto:support@ska.com"
              className="flex items-center gap-4 text-gray-700 hover:text-primary transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <FiMail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email us at</p>
                <p className="font-medium">support@ska.com</p>
              </div>
            </a>

            <a
              href="tel:+1234567890"
              className="flex items-center gap-4 text-gray-700 hover:text-primary transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <FiPhone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Call us at</p>
                <p className="font-medium">+1 (234) 567-890</p>
              </div>
            </a>

            <div className="flex items-start gap-4 text-gray-700">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <FiMapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Visit us at</p>
                <p className="font-medium">
                  123 Education St, Learning City, 10001
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
