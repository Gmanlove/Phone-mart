"use client";

import { MessageCircle, Phone, Mail, Users, HelpCircle, Book, MapPin, Shield, Wrench, Truck, CreditCard, RefreshCw } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat Support",
      description: "Get instant help from our mobile technology experts",
      availability: "Available 24/7",
      action: "Start Chat",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
    },
    {
      icon: Phone,
      title: "Expert Phone Support",
      description: "Speak directly with our certified mobile specialists",
      availability: "Mon-Sat 9AM-8PM WAT",
      action: "Call 0814 645 2793",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600"
    },
    {
      icon: Mail,
      title: "Technical Email Support",
      description: "Send detailed queries to our technical support team",
      availability: "Response within 4 hours",
      action: "Send Email",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600"
    },
    {
      icon: MapPin,
      title: "Visit Our Store",
      description: "Get hands-on support at 87 Ikot Ekpene Rd - 89 IKot Ekpene rd ,Uyo",
      availability: "Mon-Sat 9AM-8PM WAT",
      action: "Get Directions",
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600"
    }
  ];

  const faqCategories = [
    { id: "all", name: "All Topics", icon: HelpCircle },
    { id: "orders", name: "Orders & Delivery", icon: Truck },
    { id: "products", name: "Product Information", icon: Book },
    { id: "technical", name: "Technical Support", icon: Wrench },
    { id: "warranty", name: "Warranty & Returns", icon: Shield },
    { id: "payment", name: "Payment & Billing", icon: CreditCard }
  ];

  const faqs = [
    {
      category: "orders",
      question: "How long does delivery take in Nigeria?",
      answer: "We offer same-day delivery in 89 IKot Ekpene rd ,Uyo and Abuja for orders placed before 2PM. Other cities typically receive orders within 1-3 business days."
    },
    {
      category: "products",
      question: "Are all smartphones authentic and original?",
      answer: "Yes, we guarantee 100% authentic products. All devices come with manufacturer warranties and official documentation."
    },
    {
      category: "technical",
      question: "Do you provide device setup and data transfer services?",
      answer: "Yes, our certified technicians provide free device setup, data transfer, and basic training for all smartphone purchases."
    },
    {
      category: "warranty",
      question: "What is your return and exchange policy?",
      answer: "We offer a 30-day return policy for unopened items and 7-day exchange for defective products. All returns include free pickup service."
    },
    {
      category: "payment",
      question: "What payment methods do you accept?",
      answer: "We accept all major debit/credit cards, bank transfers, and cash on delivery. All transactions are secured with bank-level encryption."
    },
    {
      category: "technical",
      question: "Do you offer device repair services?",
      answer: "Yes, we have certified repair technicians for screen replacement, battery replacement, and other common repairs with genuine parts."
    }
  ];

  const services = [
    {
      icon: Wrench,
      title: "Device Setup & Configuration",
      description: "Professional setup and optimization of your new device"
    },
    {
      icon: RefreshCw,
      title: "Data Transfer & Migration",
      description: "Seamless transfer of your data from old to new device"
    },
    {
      icon: Shield,
      title: "Security Configuration",
      description: "Set up security features and privacy settings"
    },
    {
      icon: Book,
      title: "Device Training",
      description: "Learn to maximize your device's features and capabilities"
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    (selectedCategory === "all" || faq.category === selectedCategory) &&
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-700 rounded-2xl p-8 sm:p-12 shadow-xl mb-12 border border-blue-900">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <Image
              src="/smart.png"
              alt="Support"
              width={80}
              height={80}
              className="w-20 h-20 object-contain mb-6 sm:mb-0"
            />
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Expert Support
              </h1>
              <p className="text-blue-200 text-sm lg:text-base mt-1">
                Professional Mobile Technology Assistance
              </p>
            </div>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-6 sm:mb-8 leading-relaxed max-w-3xl">
            Get professional help from our certified mobile technology experts. We&apos;re here to ensure you get the most from your devices.
          </p>
          {/* Support Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
            <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <Users className="h-6 w-6 mx-auto text-blue-200 mb-2" />
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">24/7</div>
              <div className="text-sm sm:text-base text-blue-200 mt-1">Expert Support</div>
            </div>
            <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">4hrs</div>
              <div className="text-sm sm:text-base text-blue-200 mt-1">Response Time</div>
            </div>
            <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">★ 4.9</div>
              <div className="text-sm sm:text-base text-blue-200 mt-1">Support Rating</div>
            </div>
            <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">50K+</div>
              <div className="text-sm sm:text-base text-blue-200 mt-1">Happy Customers</div>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          {/* Support Options */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 mb-8">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                How Can We Help You Today?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {supportOptions.map((option, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer group"
                  >
                    <div className={`${option.color} ${option.hoverColor} text-white w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                      <option.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {option.description}
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                      {option.availability}
                    </div>
                    <button className={`w-full ${option.color} ${option.hoverColor} text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200`}>
                      {option.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 mb-8">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Frequently Asked Questions
              </h2>
              {/* Search Bar */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQs..."
                className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {/* FAQ Categories */}
              <div className="flex flex-wrap gap-2 mb-8">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <category.icon className="h-4 w-4 mr-2" />
                    {category.name}
                  </button>
                ))}
              </div>
              {/* FAQ Items */}
              <div className="space-y-4">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-start">
                        <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed ml-7">
                        {faq.answer}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No results found for your search.</p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 mb-8">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Professional Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
                  >
                    <div className="bg-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-2xl p-8 sm:p-12 text-center text-white border border-blue-500 dark:border-blue-600">
              <div className="flex items-center justify-center mb-4">
                <Image
                  src="/smart.png"
                  alt="Smart Communications"
                  width={48}
                  height={48}
                  className="w-10 h-10 mr-3 object-contain"
                />
                <h3 className="text-2xl sm:text-3xl font-bold">
                  Still Need Help?
                </h3>
              </div>
              <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                Our certified mobile technology experts are standing by to provide personalized assistance for all your mobile communication needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-200 border-2 border-white">
                  Contact Expert Now
                </button>
                <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200">
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
