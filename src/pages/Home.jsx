import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Vote,
  Users,
  Lock,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Globe,
  Zap,
} from "lucide-react";
import Logo from "@/UI/Logo";
import CandidateRegistrationBanner from "@/UI/CandidateRegistrationBanner";

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Shield,
      title: "Blockchain Security",
      description:
        "Every vote is cryptographically secured and immutably recorded on the blockchain, ensuring complete transparency and preventing tampering.",
    },
    {
      icon: Vote,
      title: "Easy Voting Process",
      description:
        "Intuitive interface makes voting simple for everyone, while maintaining the highest security standards behind the scenes.",
    },
    {
      icon: Users,
      title: "Multi-Stakeholder Support",
      description:
        "Support for various voting scenarios - from corporate governance to community decisions and organizational elections.",
    },
    {
      icon: BarChart3,
      title: "Real-time Results",
      description:
        "Watch results update in real-time with complete transparency, while maintaining voter privacy and anonymity.",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Secure Votes Cast" },
    { number: "500+", label: "Organizations Trust Us" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "0", label: "Security Breaches" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="sticky top-0 z-50">
        <CandidateRegistrationBanner />
      </div>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700 hover:bg-blue-100"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Powered by Blockchain Technology
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Secure Digital Voting for the{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Modern World
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Experience the future of democratic participation with
                  SmartVote's blockchain-powered voting platform. Transparent,
                  secure, and accessible voting for organizations of all sizes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  {" "}
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Start Voting Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  <Globe className="w-4 h-4 mr-2" />
                  View Demo
                </Button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">
                    End-to-end encrypted
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">
                    Immutable records
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">
                    Real-time results
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 border">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Active Election</h3>
                    <Badge className="bg-green-100 text-green-700">Live</Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Candidate A</span>
                        <span className="text-sm text-gray-500">45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: "45%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Candidate B</span>
                        <span className="text-sm text-gray-500">35%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: "35%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Candidate C</span>
                        <span className="text-sm text-gray-500">20%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: "20%" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Total Votes: 1,247</span>
                      <span>Time Left: 2d 14h</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SmartVote?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with cutting-edge blockchain technology to ensure every vote
              counts and every voice is heard.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all duration-300 ${
                    activeFeature === index
                      ? "ring-2 ring-blue-500 shadow-lg"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          activeFeature === index
                            ? "bg-blue-100"
                            : "bg-gray-100"
                        }`}
                      >
                        <feature.icon
                          className={`w-5 h-5 ${
                            activeFeature === index
                              ? "text-blue-600"
                              : "text-gray-600"
                          }`}
                        />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-semibold">
                      Blockchain Verification
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">
                        Vote encrypted and submitted
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">
                        Blockchain verification complete
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">Immutable record created</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-5 h-5 border-2 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
                      <span className="text-sm">Real-time tally updated</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-xs text-gray-500 font-mono">
                      Hash:
                      0x7f9a8b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Voting Process?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of organizations already using SmartVote for secure,
            transparent elections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Schedule Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
