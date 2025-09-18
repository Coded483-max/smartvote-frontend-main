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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Vote,
  Shield,
  Clock,
  Users,
  CheckCircle,
  AlertTriangle,
  Info,
  BookOpen,
  Smartphone,
  Wifi,
  Lock,
  Eye,
  HelpCircle,
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
  Download,
  Calendar,
  User,
  FileText,
  Globe,
  Zap,
} from "lucide-react";

const VotersGuidelines = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "Overview", icon: BookOpen },
    { id: "eligibility", title: "Eligibility", icon: Users },
    { id: "how-to-vote", title: "How to Vote", icon: Vote },
    { id: "security", title: "Security", icon: Shield },
    { id: "technical", title: "Technical Requirements", icon: Smartphone },
    { id: "rules", title: "Voting Rules", icon: FileText },
    { id: "troubleshooting", title: "Troubleshooting", icon: HelpCircle },
    { id: "support", title: "Support", icon: MessageCircle },
  ];

  const votingSteps = [
    {
      step: 1,
      title: "Access the Platform",
      description: "Log in to SmartVote using your student credentials",
      details: [
        "Use your student ID and password",
        "Ensure you're on the official SmartVote platform",
        "Check for the secure connection (HTTPS)",
      ],
    },
    {
      step: 2,
      title: "Review Election Information",
      description: "Read about the election, positions, and candidates",
      details: [
        "Check election deadlines and important dates",
        "Review candidate profiles and manifestos",
        "Understand the positions you're voting for",
      ],
    },
    {
      step: 3,
      title: "Select Your Candidates",
      description: "Choose your preferred candidates for each position",
      details: [
        "Navigate through different position tabs",
        "Read candidate information carefully",
        "You can vote for some or all positions",
      ],
    },
    {
      step: 4,
      title: "Review Your Choices",
      description: "Confirm your selections before submitting",
      details: [
        "Double-check all your candidate selections",
        "Read the blockchain security notice",
        "Remember: votes cannot be changed once submitted",
      ],
    },
    {
      step: 5,
      title: "Cast Your Vote",
      description: "Submit your votes to the blockchain",
      details: [
        "Confirm your final decision in the dialog",
        "Wait for blockchain processing to complete",
        "Do not close your browser during this process",
      ],
    },
    {
      step: 6,
      title: "Get Your Receipt",
      description: "Save your voting receipt for your records",
      details: [
        "Download or screenshot your vote receipt",
        "Note your transaction hash for verification",
        "Keep this for your records",
      ],
    },
  ];

  const importantDates = [
    {
      date: "December 15, 2024",
      event: "Candidate Registration Closes",
      status: "completed",
    },
    {
      date: "December 18, 2024",
      event: "Candidate List Published",
      status: "completed",
    },
    {
      date: "December 20, 2024",
      event: "Voting Period Opens",
      status: "active",
    },
    {
      date: "December 25, 2024",
      event: "Voting Period Closes (11:59 PM)",
      status: "upcoming",
    },
    {
      date: "December 26, 2024",
      event: "Results Announcement",
      status: "upcoming",
    },
  ];

  const faqs = [
    {
      question: "Can I change my vote after submitting?",
      answer:
        "No, once your vote is submitted to the blockchain, it cannot be changed or deleted. This ensures the integrity and immutability of the voting process. Please review your choices carefully before confirming.",
    },
    {
      question: "What if I don't want to vote for all positions?",
      answer:
        "You can choose to vote for some positions and skip others. There's no requirement to vote for every position. Your votes for the positions you do select will still be counted.",
    },
    {
      question: "How do I know my vote was counted?",
      answer:
        "After voting, you'll receive a receipt with a unique transaction hash. This hash can be used to verify that your vote was recorded on the blockchain. You can also check the voter turnout statistics to see if the total count has increased.",
    },
    {
      question: "What happens if I lose internet connection while voting?",
      answer:
        "If you lose connection before submitting your vote, you can log back in and start over. If you lose connection during the blockchain submission process, wait for your connection to restore and check if you received a receipt. If not, you may need to vote again.",
    },
    {
      question: "Can I vote from my mobile phone?",
      answer:
        "Yes, SmartVote is fully responsive and works on mobile devices. However, we recommend using a stable internet connection and ensuring your device is charged during the voting process.",
    },
    {
      question: "Who can see how I voted?",
      answer:
        "Your vote is completely private. While the blockchain records that you voted, it uses advanced cryptography to ensure that your specific choices remain anonymous. No one, including administrators, can see how you voted.",
    },
  ];

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 mb-4">
            <BookOpen className="w-3 h-3 mr-1" />
            Voter Guidelines
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Your Guide to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Secure Voting
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about participating in student
            government elections using our blockchain-powered voting platform.
          </p>
        </div>

        {/* Quick Navigation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Quick Navigation
            </CardTitle>
            <CardDescription>Jump to the section you need</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "outline"}
                  className="justify-start h-auto p-4"
                  onClick={() => setActiveSection(section.id)}
                >
                  <section.icon className="w-4 h-4 mr-2" />
                  <span className="text-sm">{section.title}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Contents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    <section.icon className="w-4 h-4" />
                    <span className="text-sm">{section.title}</span>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Overview Section */}
            {activeSection === "overview" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Welcome to SmartVote
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    SmartVote is our secure, blockchain-powered voting platform
                    designed specifically for student government elections. This
                    guide will help you understand how to participate in
                    elections safely and effectively.
                  </p>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Important:</strong> All votes are final once
                    submitted to the blockchain. Please read these guidelines
                    carefully before voting.
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-blue-600" />
                        Secure & Transparent
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Every vote is encrypted and recorded on the blockchain,
                        ensuring complete transparency while maintaining voter
                        privacy.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-purple-600" />
                        Easy to Use
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Our intuitive interface makes voting simple, while
                        powerful blockchain technology handles the security
                        behind the scenes.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Important Dates */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Important Dates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {importantDates.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{item.event}</p>
                            <p className="text-sm text-gray-600">{item.date}</p>
                          </div>
                          <Badge
                            variant={
                              item.status === "completed"
                                ? "secondary"
                                : item.status === "active"
                                ? "default"
                                : "outline"
                            }
                          >
                            {item.status === "completed" && (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            )}
                            {item.status === "active" && (
                              <Clock className="w-3 h-3 mr-1" />
                            )}
                            {item.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Eligibility Section */}
            {activeSection === "eligibility" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Voter Eligibility
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    To participate in student government elections, you must
                    meet the following requirements:
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-green-600 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Eligible Voters
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span className="text-sm">
                          Currently enrolled students
                        </span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span className="text-sm">
                          Valid student ID and credentials
                        </span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span className="text-sm">Good academic standing</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span className="text-sm">
                          No disciplinary actions pending
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-red-600 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Ineligible Voters
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span className="text-sm">
                          Suspended or expelled students
                        </span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span className="text-sm">
                          Students on academic probation
                        </span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span className="text-sm">
                          Graduated or withdrawn students
                        </span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span className="text-sm">
                          Faculty and staff members
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Alert>
                  <User className="h-4 w-4" />
                  <AlertDescription>
                    If you're unsure about your eligibility status, please
                    contact the Student Affairs Office or check your student
                    portal before attempting to vote.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* How to Vote Section */}
            {activeSection === "how-to-vote" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    How to Vote
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Follow these step-by-step instructions to cast your vote
                    securely on the SmartVote platform.
                  </p>
                </div>

                <div className="space-y-6">
                  {votingSteps.map((step, index) => (
                    <Card key={step.step} className="overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {step.step}
                          </div>
                          <div>
                            <CardTitle className="text-xl">
                              {step.title}
                            </CardTitle>
                            <CardDescription className="text-base">
                              {step.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <ul className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <li
                              key={detailIndex}
                              className="flex items-start space-x-2"
                            >
                              <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Time Limit:</strong> There's no time limit once you
                    start voting, but the election closes at 11:59 PM on
                    December 25, 2024. Plan accordingly!
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Security Section */}
            {activeSection === "security" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Security & Privacy
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    SmartVote uses advanced blockchain technology to ensure your
                    vote is secure, private, and tamper-proof.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Lock className="w-5 h-5 mr-2 text-green-600" />
                        Vote Encryption
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        Your vote is encrypted before being recorded on the
                        blockchain, ensuring complete privacy.
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>End-to-end encryption</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Zero-knowledge proofs</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Anonymous credentials</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-blue-600" />
                        Blockchain Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        Blockchain technology makes vote tampering virtually
                        impossible through distributed verification.
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Immutable records</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Distributed verification</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Transparent auditing</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Alert>
                  <Eye className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Privacy Guarantee:</strong> While your vote is
                    recorded on the blockchain for transparency, your specific
                    choices remain completely anonymous and cannot be traced
                    back to you.
                  </AlertDescription>
                </Alert>

                <Card>
                  <CardHeader>
                    <CardTitle>Security Best Practices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-green-600 mb-3">
                          ✅ Do This
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Use your own device and internet connection</li>
                          <li>
                            • Verify you're on the official SmartVote platform
                          </li>
                          <li>• Log out completely after voting</li>
                          <li>• Keep your vote receipt secure</li>
                          <li>• Report any suspicious activity immediately</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-600 mb-3">
                          ❌ Don't Do This
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Don't vote on public computers</li>
                          <li>• Don't share your login credentials</li>
                          <li>• Don't vote over public Wi-Fi</li>
                          <li>• Don't let others influence your vote</li>
                          <li>• Don't share your vote receipt publicly</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Technical Requirements */}
            {activeSection === "technical" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Technical Requirements
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Ensure your device and internet connection meet these
                    requirements for a smooth voting experience.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Globe className="w-5 h-5 mr-2" />
                        Browser Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Chrome 90+</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Firefox 88+</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Safari 14+</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Edge 90+</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Wifi className="w-5 h-5 mr-2" />
                        Internet Connection
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Stable broadband connection</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Minimum 1 Mbps speed</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <AlertTriangle className="w-3 h-3 text-yellow-500" />
                          <span>Avoid public Wi-Fi</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Mobile data acceptable</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Smartphone className="w-5 h-5 mr-2" />
                        Device Compatibility
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Desktop computers</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Laptops</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Tablets</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Smartphones</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Alert>
                  <Smartphone className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Recommendation:</strong> For the best experience,
                    use a desktop or laptop computer with a stable internet
                    connection. Mobile devices work well but may have smaller
                    screens for reviewing candidate information.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Voting Rules */}
            {activeSection === "rules" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Voting Rules & Regulations
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Please familiarize yourself with these important rules and
                    regulations governing the election process.
                  </p>
                </div>

                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="general">General Rules</TabsTrigger>
                    <TabsTrigger value="conduct">Conduct</TabsTrigger>
                    <TabsTrigger value="violations">Violations</TabsTrigger>
                    <TabsTrigger value="appeals">Appeals</TabsTrigger>
                  </TabsList>

                  <TabsContent value="general" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>General Voting Rules</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-blue-600">
                                1
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold">
                                One Vote Per Student
                              </h4>
                              <p className="text-gray-600 text-sm">
                                Each eligible student may cast only one vote per
                                position. Multiple voting attempts will be
                                detected and prevented.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-blue-600">
                                2
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold">Voting Period</h4>
                              <p className="text-gray-600 text-sm">
                                Voting is only allowed during the official
                                voting period: December 20-25, 2024.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-blue-600">
                                3
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold">Secret Ballot</h4>
                              <p className="text-gray-600 text-sm">
                                All votes are secret. No one can see how you
                                voted, and you should not reveal your choices to
                                others.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-blue-600">
                                4
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold">Final Votes</h4>
                              <p className="text-gray-600 text-sm">
                                Once submitted to the blockchain, votes cannot
                                be changed, deleted, or revoked.
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="conduct" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Voter Conduct Guidelines</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-green-600 mb-3">
                              Acceptable Behavior
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li>• Vote independently and privately</li>
                              <li>• Respect other voters' choices</li>
                              <li>• Report technical issues promptly</li>
                              <li>• Follow all platform guidelines</li>
                              <li>• Maintain confidentiality of your vote</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-red-600 mb-3">
                              Prohibited Behavior
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li>• Vote buying or selling</li>
                              <li>• Coercing others to vote a certain way</li>
                              <li>• Attempting to vote multiple times</li>
                              <li>• Sharing login credentials</li>
                              <li>• Disrupting the voting process</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="violations" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Election Violations</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            Violations of election rules may result in
                            disqualification from voting and disciplinary
                            action.
                          </AlertDescription>
                        </Alert>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-red-600">
                              Serious Violations
                            </h4>
                            <ul className="text-sm text-gray-600 mt-2 space-y-1">
                              <li>
                                • Attempting to hack or manipulate the system
                              </li>
                              <li>• Vote buying, selling, or coercion</li>
                              <li>• Identity fraud or impersonation</li>
                              <li>• Organized disruption of the election</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-yellow-600">
                              Minor Violations
                            </h4>
                            <ul className="text-sm text-gray-600 mt-2 space-y-1">
                              <li>• Sharing login credentials</li>
                              <li>• Voting on behalf of others</li>
                              <li>• Inappropriate use of the platform</li>
                              <li>• Failure to follow voting procedures</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="appeals" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Appeals Process</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-600">
                          If you believe there has been an error or violation in
                          the election process, you may file an appeal.
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-purple-600">
                                1
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold">Submit Appeal</h4>
                              <p className="text-gray-600 text-sm">
                                Submit your appeal in writing within 48 hours of
                                the incident or election close.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-purple-600">
                                2
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold">Review Process</h4>
                              <p className="text-gray-600 text-sm">
                                The Election Committee will review your appeal
                                within 72 hours.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-purple-600">
                                3
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold">Decision</h4>
                              <p className="text-gray-600 text-sm">
                                You will be notified of the committee's decision
                                via email.
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {/* Troubleshooting */}
            {activeSection === "troubleshooting" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Troubleshooting
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Common issues and solutions to help you vote successfully.
                  </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <Card>
                  <CardHeader>
                    <CardTitle>Still Having Issues?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      If you're still experiencing problems, try these general
                      troubleshooting steps:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold">Quick Fixes</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Refresh your browser</li>
                          <li>• Clear browser cache and cookies</li>
                          <li>• Try a different browser</li>
                          <li>• Check your internet connection</li>
                          <li>• Disable browser extensions</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">If Problems Persist</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Contact technical support</li>
                          <li>• Try voting from a different device</li>
                          <li>• Use mobile data instead of Wi-Fi</li>
                          <li>• Visit a computer lab on campus</li>
                          <li>• Report the issue immediately</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Support */}
            {activeSection === "support" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Get Support
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Need help with voting? Our support team is here to assist
                    you during the election period.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <CardTitle>Live Chat</CardTitle>
                      <CardDescription>
                        Get instant help from our support team
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <Button className="w-full mb-2">Start Chat</Button>
                      <p className="text-sm text-gray-500">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Available during voting hours
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <CardTitle>Email Support</CardTitle>
                      <CardDescription>
                        Send us your questions or issues
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <Button variant="outline" className="w-full mb-2">
                        Send Email
                      </Button>
                      <p className="text-sm text-gray-500">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Response within 1 hour
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <CardTitle>Phone Support</CardTitle>
                      <CardDescription>
                        Call us for urgent technical issues
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <Button variant="outline" className="w-full mb-2">
                        Call Now
                      </Button>
                      <p className="text-sm text-gray-500">
                        <Clock className="w-4 h-4 inline mr-1" />
                        24/7 during election period
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Contacts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Technical Issues</h4>
                        <div className="space-y-2 text-sm">
                          <p>
                            <strong>IT Help Desk:</strong> +1 (555) 123-4567
                          </p>
                          <p>
                            <strong>Email:</strong> tech-support@smartvote.edu
                          </p>
                          <p>
                            <strong>Hours:</strong> 24/7 during election period
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Election Issues</h4>
                        <div className="space-y-2 text-sm">
                          <p>
                            <strong>Election Committee:</strong> +1 (555)
                            987-6543
                          </p>
                          <p>
                            <strong>Email:</strong> elections@university.edu
                          </p>
                          <p>
                            <strong>Hours:</strong> 8 AM - 10 PM during voting
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Important:</strong> If you encounter any issues that
                    prevent you from voting, contact support immediately. We're
                    committed to ensuring every eligible student can participate
                    in the election.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Vote?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Now that you understand the process, head to your dashboard to
              participate in the student government elections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Guidelines PDF
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VotersGuidelines;
