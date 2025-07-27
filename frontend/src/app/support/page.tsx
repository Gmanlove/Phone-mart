"use client";

import { 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText, 
  Clock, 
  Users, 
  Search,
  ChevronRight,
  HelpCircle,
  Book,
  Video,
  Download,
  ExternalLink,
  Star
} from "lucide-react";
import { useState } from "react";

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "Available 24/7",
      action: "Start Chat",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with a support specialist",
      availability: "Mon-Fri 9AM-6PM EST",
      action: "Call Now",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your questions and we'll respond within 24 hours",
      availability: "Response within 24hrs",
      action: "Send Email",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600"
    }
  ];

  const faqCategories = [
    { id: "all", name: "All Topics", count: 24 },
    { id: "account", name: "Account & Billing", count: 8 },
    { id: "technical", name: "Technical Issues", count: 6 },
    { id: "getting-started", name: "Getting Started", count: 5 },
    { id: "features", name: "Features", count: 5 }
  ];

  const faqs = [
    {
      category: "account",
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking the 'Forgot Password' link on the login page.",
      popularity: 5
    },
    {
      category: "technical",
      question: "Why is the app running slowly?",
      answer: "Check your internet connection and try clearing your browser cache.",
      popularity: 4
    },
    {
      category: "getting-started",
      question: "How do I create my first project?",
      answer: "Navigate to the dashboard and click the 'New Project' button to get started.",
      popularity: 5
    },
    {
      category: "features",
      question: "Can I export my data?",
      answer: "Yes, you can export your data in multiple formats from the Settings page.",
      popularity: 3
    },
    {
      category: "account",
      question: "How do I upgrade my plan?",
      answer: "Go to Account Settings > Billing to view and upgrade your subscription plan.",
      popularity: 4
    },
    {
      category: "technical",
      question: "What browsers are supported?",
      answer: "We support Chrome, Firefox, Safari, and Edge (latest versions).",
      popularity: 3
    }
  ];

  const resources = [
    {
      icon: Book,
      title: "Documentation",
      description: "Comprehensive guides and API references",
      link: "#"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      link: "#"
    },
    {
      icon: Download,
      title: "Downloads",
      description: "Apps, plugins, and tools",
      link: "#"
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other users",
      link: "#"
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              How can we help you?
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Get the support you need, when you need it
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles, guides, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white rounded-xl border-0 shadow-lg focus:ring-4 focus:ring-blue-300/50 outline-none transition-all text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10">
        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {supportOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
                <div className={`${option.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-3">{option.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="w-4 h-4 mr-1" />
                  {option.availability}
                </div>
                <button className={`w-full ${option.color} ${option.hoverColor} text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200`}>
                  {option.action}
                </button>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>

              {/* FAQ List */}
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <details key={index} className="group border border-gray-200 rounded-lg">
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <h3 className="font-medium text-gray-900">{faq.question}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(faq.popularity)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                      </div>
                    </summary>
                    <div className="px-4 pb-4">
                      <p className="text-gray-600 pl-8">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>

              {filteredFaqs.length === 0 && (
                <div className="text-center py-12">
                  <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No FAQs found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>

          {/* Resources Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Help Resources</h3>
              <div className="space-y-4">
                {resources.map((resource, index) => {
                  const IconComponent = resource.icon;
                  return (
                    <a
                      key={index}
                      href={resource.link}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="bg-gray-100 w-10 h-10 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <IconComponent className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{resource.title}</h4>
                        <p className="text-sm text-gray-500">{resource.description}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Still need help?</h3>
              <p className="text-gray-300 mb-4">
                Our support team is here to help you succeed.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>support@company.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-400" />
                  <span>1-800-123-4567</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}