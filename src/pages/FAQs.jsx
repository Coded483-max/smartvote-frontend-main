import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Vote,
  Search,
  Shield,
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  Globe,
  Smartphone,
  CreditCard,
  Settings,
} from "lucide-react";

const FAQs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Questions", icon: HelpCircle },
    { id: "general", name: "General", icon: Vote },
    { id: "security", name: "Security", icon: Shield },
    { id: "technical", name: "Technical", icon: Settings },
    { id: "pricing", name: "Pricing", icon: CreditCard },
    { id: "support", name: "Support", icon: MessageCircle },
  ];

  const faqs = [
    {
      category: "general",
      question: "What is SmartVote and how does it work?",
      answer:
        "SmartVote is a blockchain-powered online voting platform that ensures secure, transparent, and tamper-proof elections. When you cast a vote, it's encrypted and recorded on the blockchain, creating an immutable record that can be verified but maintains voter privacy. The system uses advanced cryptography to ensure that votes cannot be altered, deleted, or duplicated.",
    },
    {
      category: "general",
      question: "Who can use SmartVote?",
      answer:
        "SmartVote is designed for organizations of all sizes including corporations for board elections and shareholder voting, educational institutions for student government elections, non-profit organizations for member voting, community associations for decision-making, and government entities for public consultations. Any organization that needs secure, transparent voting can benefit from our platform.",
    },
    {
      category: "general",
      question: "What types of elections can I run on SmartVote?",
      answer:
        "You can run various types of elections including single-choice voting, multiple-choice voting, ranked-choice voting, approval voting, and custom ballot formats. Our platform supports everything from simple yes/no questions to complex multi-candidate elections with different voting methods.",
    },
    {
      category: "security",
      question: "How secure is blockchain voting?",
      answer:
        "Blockchain voting provides unprecedented security through cryptographic hashing, distributed ledger technology, and immutable record-keeping. Each vote is encrypted before being recorded, and the decentralized nature of blockchain makes it virtually impossible to hack or manipulate results. Our platform uses enterprise-grade security protocols and has undergone extensive third-party security audits.",
    },
    {
      category: "security",
      question: "Can my vote be traced back to me?",
      answer:
        "No, SmartVote uses advanced cryptographic techniques to ensure voter privacy. While every vote is recorded on the blockchain for transparency and verification, the connection between your identity and your specific vote is protected through zero-knowledge proofs and anonymous credentials. Election administrators can verify that you voted, but cannot see how you voted.",
    },
    {
      category: "security",
      question: "What happens if there's a technical issue during voting?",
      answer:
        "SmartVote has multiple redundancy systems in place. Our platform runs on distributed infrastructure with 99.9% uptime guarantee. If there's a technical issue, voters can resume voting once the system is restored, and all previously cast votes remain secure and intact. We also provide 24/7 technical support during active elections.",
    },
    {
      category: "technical",
      question: "Do I need special software to vote?",
      answer:
        "No special software is required. SmartVote works through any modern web browser on computers, tablets, or smartphones. The platform is designed to be user-friendly and accessible, requiring only an internet connection and a device with a web browser. We also offer mobile apps for iOS and Android for enhanced convenience.",
    },
    {
      category: "technical",
      question: "What blockchain technology does SmartVote use?",
      answer:
        "SmartVote utilizes a hybrid blockchain approach, combining the security of public blockchain networks with the performance of private consortium chains. We primarily use Ethereum-compatible networks for smart contract execution, with additional layers for scalability and privacy. Our architecture is designed to handle high-volume elections while maintaining security and transparency.",
    },
    {
      category: "technical",
      question: "Can I integrate SmartVote with my existing systems?",
      answer:
        "Yes, SmartVote offers comprehensive APIs and integration options. We can integrate with your existing user management systems, authentication providers (like Active Directory or SAML), and notification systems. Our technical team works with you to ensure seamless integration with your current infrastructure.",
    },
    {
      category: "pricing",
      question: "How much does SmartVote cost?",
      answer:
        "SmartVote offers flexible pricing based on the size and complexity of your elections. We have plans starting from $99 for small organizations (up to 100 voters) to enterprise solutions for large-scale elections. Pricing includes setup, support, and all security features. Contact our sales team for a customized quote based on your specific needs.",
    },
    {
      category: "pricing",
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a 30-day free trial that includes access to all features for elections with up to 50 voters. This allows you to test the platform, run practice elections, and ensure it meets your needs before committing to a paid plan. No credit card is required to start your trial.",
    },
    {
      category: "pricing",
      question: "Are there any hidden fees?",
      answer:
        "No, SmartVote has transparent pricing with no hidden fees. Our quoted price includes platform access, security features, customer support, and basic customization. Additional services like advanced branding, custom integrations, or dedicated support may incur additional costs, but these are clearly outlined in your agreement.",
    },
    {
      category: "support",
      question: "What kind of support do you provide?",
      answer:
        "We provide comprehensive support including 24/7 technical support during active elections, dedicated customer success managers for enterprise clients, extensive documentation and tutorials, live chat support, email support with guaranteed response times, and phone support for urgent issues. We also offer training sessions for election administrators.",
    },
    {
      category: "support",
      question: "How do I set up my first election?",
      answer:
        "Setting up an election is straightforward: 1) Create your SmartVote account, 2) Use our election wizard to configure your ballot, voting rules, and timeline, 3) Import or add your voter list, 4) Test your election with our preview mode, 5) Launch your election and monitor results in real-time. Our support team is available to guide you through each step.",
    },
    {
      category: "support",
      question: "Can you help with election administration?",
      answer:
        "We offer managed election services where our team handles the technical aspects of your election. This includes setup, voter communication, technical support during voting, and results reporting. This service is particularly popular with organizations running their first blockchain election or those with complex requirements.",
    },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-700 hover:bg-blue-100"
              >
                <HelpCircle className="w-3 h-3 mr-1" />
                Help Center
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Frequently Asked{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Questions
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Find answers to common questions about SmartVote's blockchain
                voting platform, security features, and how to get started with
                secure digital elections.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 blur-3xl"></div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Category Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                  <CardDescription>Browse questions by topic</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeCategory === category.id
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "hover:bg-gray-100 text-gray-600"
                      }`}
                    >
                      <category.icon className="w-4 h-4" />
                      <span>{category.name}</span>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* FAQ List */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {activeCategory === "all"
                      ? "All Questions"
                      : categories.find((c) => c.id === activeCategory)?.name}
                  </h2>
                  <Badge variant="secondary">
                    {filteredFAQs.length} questions
                  </Badge>
                </div>

                {filteredFAQs.length === 0 ? (
                  <Card className="text-center py-12">
                    <CardContent>
                      <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No questions found
                      </h3>
                      <p className="text-gray-600">
                        Try adjusting your search terms or browse a different
                        category.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <Accordion type="single" collapsible className="space-y-4">
                    {filteredFAQs.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border border-gray-200 rounded-lg px-6 bg-white shadow-sm hover:shadow-md transition-shadow"
                      >
                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600 py-6">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Still Have Questions?
              </h2>
              <p className="text-xl text-gray-600">
                Our support team is here to help you get the most out of
                SmartVote.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>Live Chat</CardTitle>
                  <CardDescription>
                    Get instant answers from our support team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Chat</Button>
                  <p className="text-sm text-gray-500 mt-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Available 24/7
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>Email Support</CardTitle>
                  <CardDescription>
                    Send us a detailed message about your question
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Send Email
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Response within 2 hours
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>Phone Support</CardTitle>
                  <CardDescription>
                    Speak directly with our technical experts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Schedule Call
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Mon-Fri 9AM-6PM EST
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Resources */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Resources
            </h2>
            <p className="text-xl text-gray-600">
              Additional resources to help you get started with SmartVote
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Globe className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Getting Started Guide</CardTitle>
                <CardDescription>
                  Step-by-step tutorial for your first election
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Shield className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Security Whitepaper</CardTitle>
                <CardDescription>
                  Technical details about our blockchain security
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Smartphone className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Mobile App Guide</CardTitle>
                <CardDescription>
                  How to vote using our mobile applications
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Settings className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">API Documentation</CardTitle>
                <CardDescription>
                  Integration guides for developers
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQs;
