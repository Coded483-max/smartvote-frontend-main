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
import {
  Shield,
  Vote,
  Users,
  ArrowRight,
  Target,
  Heart,
  Lightbulb,
  Globe,
  Award,
  Mail,
  Linkedin,
  Twitter,
} from "lucide-react";

const AboutUs = () => {
  const [activeValue, setActiveValue] = useState(0);

  const coreValues = [
    {
      icon: Shield,
      title: "Security First",
      description:
        "We prioritize the highest security standards in everything we do, ensuring every vote is protected by cutting-edge blockchain technology.",
    },
    {
      icon: Heart,
      title: "Democratic Values",
      description:
        "We believe in the fundamental right of every voice to be heard and every vote to count in shaping our collective future.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We continuously push the boundaries of what's possible in digital democracy, making voting more accessible and transparent.",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description:
        "Our mission extends beyond borders, working to strengthen democratic processes worldwide through technology.",
    },
  ];

  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former blockchain architect with 10+ years in cybersecurity. Led digital transformation at Fortune 500 companies.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder",
      bio: "Cryptography expert and former government security consultant. PhD in Computer Science from MIT.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Dr. Amara Okafor",
      role: "Head of Security",
      bio: "Cybersecurity researcher with expertise in blockchain protocols. Published author on digital voting systems.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "James Thompson",
      role: "Head of Product",
      bio: "UX specialist focused on making complex technology accessible. Former design lead at major tech companies.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ];

  const milestones = [
    {
      year: "2021",
      title: "Company Founded",
      description:
        "SmartVote was born from a vision to revolutionize democratic participation through blockchain technology.",
    },
    {
      year: "2022",
      title: "First Deployment",
      description:
        "Successfully launched our first pilot program with local organizations, processing over 1,000 secure votes.",
    },
    {
      year: "2023",
      title: "Series A Funding",
      description:
        "Raised $10M to expand our platform and enhance security features, backed by leading venture capital firms.",
    },
    {
      year: "2024",
      title: "Global Expansion",
      description:
        "Now serving 500+ organizations worldwide with over 100,000 votes cast securely on our platform.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-700 hover:bg-blue-100"
              >
                <Target className="w-3 h-3 mr-1" />
                Our Mission
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Empowering Democracy Through{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Innovation
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                We're on a mission to make voting more secure, transparent, and
                accessible for everyone. By combining cutting-edge blockchain
                technology with intuitive design, we're building the future of
                democratic participation.
              </p>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 blur-3xl"></div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  SmartVote was founded in 2025 by a team of Computer Science
                  and Information Technology students, blockchain developers,
                  and democracy advocates who saw the urgent need for more
                  secure and transparent voting systems.
                </p>
                <p>
                  After witnessing concerns about election integrity and voter
                  accessibility worldwide, we knew technology could provide a
                  solution. We set out to create a platform that would combine
                  the immutable security of blockchain with the ease of use that
                  modern voters expect.
                </p>
                <p>
                  Today, we're proud to serve hundreds of organizations
                  globally, from corporate boardrooms to community associations,
                  helping them conduct secure, transparent elections that their
                  members can trust.
                </p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Learn More About Our Technology
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Our Journey
                  </h3>
                  <div className="space-y-6">
                    {milestones.map((milestone, index) => (
                      <div key={index} className="flex space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {milestone.year.slice(-2)}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-500">
                              {milestone.year}
                            </span>
                            <h4 className="font-semibold text-gray-900">
                              {milestone.title}
                            </h4>
                          </div>
                          <p className="text-gray-600">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape how we build
              technology for democratic participation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  activeValue === index ? "ring-2 ring-blue-500 shadow-lg" : ""
                }`}
                onClick={() => setActiveValue(index)}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                      activeValue === index ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    <value.icon
                      className={`w-8 h-8 ${
                        activeValue === index
                          ? "text-blue-600"
                          : "text-gray-600"
                      }`}
                    />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team of experts brings together decades of experience
              in technology, security, and democratic processes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-r from-blue-100 to-purple-100">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  <div className="flex justify-center space-x-3">
                    <Button variant="ghost" size="sm" className="p-2">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2">
                      <Twitter className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              Recognition & Trust
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="space-y-2">
                <Award className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold">
                  Security Excellence Award
                </h3>
                <p className="text-blue-100">
                  Recognized for outstanding blockchain security implementation
                </p>
              </div>
              <div className="space-y-2">
                <Shield className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold">
                  SOC 2 Type II Certified
                </h3>
                <p className="text-blue-100">
                  Independently verified security and compliance standards
                </p>
              </div>
              <div className="space-y-2">
                <Users className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold">500+ Organizations</h3>
                <p className="text-blue-100">
                  Trusted by organizations worldwide for secure voting
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Ready to Join Our Mission?</h3>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Whether you're looking to implement secure voting or join our
                team, we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Contact Us
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  View Careers
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
