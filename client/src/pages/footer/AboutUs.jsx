import React from 'react';
import { FaGraduationCap, FaUserGraduate, FaChalkboardTeacher, FaAward } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background text-secondary p-4 md:p-8 font-body">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto text-center py-12">
        <h1 className="text-4xl md:text-5xl font-header text-primary mb-6">About Shree Kalam Academy</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          Empowering minds and shaping futures through quality education and innovative learning experiences.
        </p>
        <div className="w-24 h-1 bg-accent mx-auto mb-12"></div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 mb-16">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6 mx-auto">
            <FaGraduationCap className="text-2xl text-accent" />
          </div>
          <h2 className="text-2xl font-header text-primary text-center mb-4">Our Mission</h2>
          <p className="text-secondary/90 text-center">
            To provide accessible, high-quality education that empowers students to achieve their full potential and become responsible global citizens.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6 mx-auto">
            <FaAward className="text-2xl text-accent" />
          </div>
          <h2 className="text-2xl font-header text-primary text-center mb-4">Our Vision</h2>
          <p className="text-secondary/90 text-center">
            To be a leading educational institution that transforms lives through innovative learning and academic excellence.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-header text-primary text-center mb-8">Our Story</h2>
        <div className="prose max-w-none text-secondary/90">
          <p className="mb-4">
            Founded in 2024, Shree Kalam Academy was born out of a passion for education and a commitment to nurturing young minds. 
            What started as a small initiative has grown into a respected educational institution that serves hundreds of students annually.
          </p>
          <p>
            Our journey has been guided by the belief that every student deserves access to quality education that prepares them 
            for the challenges of tomorrow. We take pride in our student-centered approach and our dedicated team of educators 
            who go above and beyond to ensure every learner succeeds.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary text-white py-12 mb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          {[
            { icon: <FaUserGraduate className="text-4xl mb-2 mx-auto" />, number: '500+', label: 'Students Enrolled' },
            { icon: <FaChalkboardTeacher className="text-4xl mb-2 mx-auto" />, number: '25+', label: 'Expert Teachers' },
            { icon: <FaGraduationCap className="text-4xl mb-2 mx-auto" />, number: '95%', label: 'Success Rate' },
            { icon: <FaAward className="text-4xl mb-2 mx-auto" />, number: '10+', label: 'Awards Won' }
          ].map((stat, index) => (
            <div key={index} className="p-4">
              <div className="text-accent">{stat.icon}</div>
              <div className="text-3xl font-header mb-1">{stat.number}</div>
              <div className="text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Values */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-header text-primary text-center mb-8">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { 
              title: 'Excellence', 
              description: 'We strive for the highest standards in education and personal development.' 
            },
            { 
              title: 'Integrity', 
              description: 'We conduct ourselves with honesty, fairness, and respect for all.' 
            },
            { 
              title: 'Innovation', 
              description: 'We embrace creative teaching methods and new technologies.' 
            },
            { 
              title: 'Inclusivity', 
              description: 'We celebrate diversity and provide equal opportunities for all.' 
            },
            { 
              title: 'Community', 
              description: 'We foster a supportive and collaborative learning environment.' 
            },
            { 
              title: 'Lifelong Learning', 
              description: 'We inspire a passion for continuous growth and development.' 
            }
          ].map((value, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-header text-primary mb-2">{value.title}</h3>
              <p className="text-secondary/80">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto text-center py-12">
        <h2 className="text-3xl font-header text-primary mb-6">Join Our Learning Community</h2>
        <p className="text-lg mb-8 text-secondary/90">
          Discover how Shree Kalam Academy can help you achieve your educational goals.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="/app/contact-us" 
            className="bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200"
          >
            Contact Us
          </a>
          <a 
            href="/app/developers" 
            className="border-2 border-primary text-primary hover:bg-primary/5 font-semibold py-3 px-8 rounded-full transition-colors duration-200"
          >
            Our Programs
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;