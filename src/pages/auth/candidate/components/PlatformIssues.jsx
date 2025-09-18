import React from "react";
import { useOutletContext } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
  Clock,
  Share2,
  Target,
  Lightbulb,
  TrendingUp,
  Users,
  BookOpen,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const PlatformIssues = () => {
  const { setShowIssueModal, showIssueModal } = useOutletContext();

  // Function to get status style
  const getStatusStyle = (status) => {
    switch (status) {
      case "Complete":
        return {
          className: "bg-emerald-100 text-emerald-800",
          icon: CheckCircle,
        };
      case "In Progress":
        return {
          className: "bg-amber-100 text-amber-800",
          icon: Clock,
        };
      case "Planning":
        return {
          className: "bg-indigo-100 text-indigo-800",
          icon: AlertCircle,
        };
      default:
        return {
          className: "bg-gray-100 text-gray-800",
          icon: Clock,
        };
    }
  };

  // Function to get priority style
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return "bg-purple-100 text-purple-800";
      case "Medium":
        return "bg-indigo-100 text-indigo-800";
      case "Low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to get issue category icon
  const getIssueIcon = (title) => {
    if (title.toLowerCase().includes("dining")) return "🍽️";
    if (title.toLowerCase().includes("mental")) return "🧠";
    if (title.toLowerCase().includes("study")) return "📚";
    if (title.toLowerCase().includes("safety")) return "🛡️";
    if (title.toLowerCase().includes("activity")) return "🎯";
    return "💡";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-purple-900">
            Platform & Issues
          </h2>

          <p className="text-purple-600">
            Define your campaign positions and policy priorities
          </p>
        </div>
        <Button
          onClick={() => setShowIssueModal(true)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Issue
        </Button>
        {showIssueModal && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowIssueModal(false)}
          >
            <div
              className="bg-white p-6 rounded-lg max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">Add Platform Issue</h3>
              <div className="space-y-4">
                <Input placeholder="Issue Title (e.g., Campus Safety)" />
                <textarea
                  className="w-full p-2 border rounded"
                  placeholder="Describe your position and proposed solutions..."
                  rows={3}
                ></textarea>
                <select className="w-full p-2 border rounded">
                  <option>Priority Level</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <select className="w-full p-2 border rounded">
                  <option>Status</option>
                  <option>Planning</option>
                  <option>In Progress</option>
                  <option>Complete</option>
                </select>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      alert("Issue added to platform!");
                      setShowIssueModal(false);
                    }}
                  >
                    Add Issue
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowIssueModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Issues */}
        <Card className="border-purple-200 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />{" "}
              <CardTitle className="text-purple-900">
                Your Platform Issues
              </CardTitle>
            </div>
            <CardDescription className="text-purple-600">
              Key policy positions and campaign promises
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Improve Campus Dining",
                  description:
                    "Extend dining hall hours and add more healthy options",
                  status: "Complete",
                  priority: "High",
                },
                {
                  title: "Mental Health Resources",
                  description:
                    "Increase counseling staff and add peer support programs",
                  status: "In Progress",
                  priority: "High",
                },
                {
                  title: "Study Space Expansion",
                  description: "Create 24/7 study areas in residence halls",
                  status: "Complete",
                  priority: "Medium",
                },
                {
                  title: "Campus Safety Improvements",
                  description: "Better lighting and emergency call boxes",
                  status: "Planning",
                  priority: "High",
                },
                {
                  title: "Student Activity Funding",
                  description: "Increase budget for clubs and organizations",
                  status: "Complete",
                  priority: "Medium",
                },
              ].map((issue, index) => {
                const statusInfo = getStatusStyle(issue.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <div
                    key={index}
                    className="p-4 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-lg">
                          {getIssueIcon(issue.title)}
                        </span>
                        <h4 className="font-medium text-purple-900">
                          {issue.title}
                        </h4>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityStyle(issue.priority)}>
                          {issue.priority}
                        </Badge>
                        <Badge className={statusInfo.className}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {issue.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-purple-600 mb-3">
                      {issue.description}
                    </p>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-300 text-purple-700 hover:bg-purple-50"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-rose-300 text-rose-700 hover:bg-rose-50"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
              <h5 className="font-medium text-purple-900 mb-2">
                Platform Progress
              </h5>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-lg font-bold text-emerald-600">3</div>
                  <div className="text-purple-600">Complete</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-amber-600">1</div>
                  <div className="text-purple-600">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-indigo-600">1</div>
                  <div className="text-purple-600">Planning</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Talking Points */}
        <Card className="border-purple-200 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-purple-900">Talking Points</CardTitle>
            </div>
            <CardDescription className="text-purple-600">
              Quick reference for debates and conversations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                {" "}
                {/* ✅ Purple background */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🍽️</span>
                  <h4 className="font-medium text-sm text-purple-900">
                    Campus Dining
                  </h4>
                </div>
                <ul className="text-xs space-y-1 text-purple-700">
                  <li>• Current hours end too early for night students</li>
                  <li>• 73% of students want healthier options</li>
                  <li>• Proposed: Extend hours until 11 PM</li>
                  <li>• Add salad bar and vegetarian station</li>
                </ul>
              </div>

              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🧠</span>
                  <h4 className="font-medium text-sm text-purple-900">
                    Mental Health
                  </h4>
                </div>
                <ul className="text-xs space-y-1 text-emerald-700">
                  <li>• Current wait time: 2-3 weeks for counseling</li>
                  <li>• Only 3 counselors for 8,000 students</li>
                  <li>• Proposed: Hire 2 additional counselors</li>
                  <li>• Launch peer support program</li>
                </ul>
              </div>

              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📚</span>
                  <h4 className="font-medium text-sm text-purple-900">
                    Study Spaces
                  </h4>
                </div>
                <ul className="text-xs space-y-1 text-indigo-700">
                  <li>• Library closes at midnight</li>
                  <li>• No 24/7 study options during finals</li>
                  <li>• Proposed: 24/7 study rooms in each dorm</li>
                  <li>• Partner with facilities management</li>
                </ul>
              </div>

              {/* Add quick action button */}
              <Button
                size="sm"
                variant="outline"
                className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
                onClick={() => setShowIssueModal(true)}
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Talking Points
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Summary */}
      <Card className="border-purple-200 hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-purple-900">Platform Summary</CardTitle>
          </div>
          <CardDescription className="text-purple-600">
            Your complete campaign platform for sharing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
            {" "}
            {/* ✅ Purple gradient background */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                AS
              </div>
              <div>
                <h3 className="font-semibold text-purple-900 text-lg">
                  Alex Smith for Student Body President
                </h3>
                <p className="text-sm text-purple-600">
                  Building a Better Campus Together
                </p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-purple-200">
                <span className="text-xl">🍽️</span>
                <div>
                  <strong className="text-purple-900">
                    Better Campus Dining:
                  </strong>
                  <p className="text-purple-700 mt-1">
                    Extended hours, healthier options, and more variety
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-purple-200">
                <span className="text-xl">🧠</span>
                <div>
                  <strong className="text-purple-900">
                    Mental Health Support:
                  </strong>
                  <p className="text-purple-700 mt-1">
                    More counselors, shorter wait times, peer support
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-purple-200">
                <span className="text-xl">📚</span>
                <div>
                  <strong className="text-purple-900">
                    24/7 Study Spaces:
                  </strong>
                  <p className="text-purple-700 mt-1">
                    Round-the-clock study areas in every residence hall
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-purple-200">
                <span className="text-xl">🛡️</span>
                <div>
                  <strong className="text-purple-900">Campus Safety:</strong>
                  <p className="text-purple-700 mt-1">
                    Better lighting, more emergency call boxes, safety escorts
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-purple-200">
                <span className="text-xl">🎯</span>
                <div>
                  <strong className="text-purple-900">
                    Student Activities:
                  </strong>
                  <p className="text-purple-700 mt-1">
                    Increased funding for clubs and organizations
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                <Share2 className="w-4 h-4 mr-2" />
                Share Platform
              </Button>
              <Button
                variant="outline"
                className="border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Summary
              </Button>
              <Button
                variant="outline"
                className="border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Strategy Tips */}
      <Card className="border-purple-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-purple-900">💡 Platform Tips</CardTitle>
          </div>
          <CardDescription className="text-purple-600">
            Best practices for effective campaign messaging
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium text-purple-900">Strong Positions:</h4>
              <ul className="space-y-1 text-purple-700">
                <li>• Use specific, measurable goals</li>
                <li>• Address real student concerns</li>
                <li>• Include implementation timelines</li>
                <li>• Back claims with data/surveys</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-purple-900">
                Effective Messaging:
              </h4>
              <ul className="space-y-1 text-purple-700">
                <li>• Keep talking points concise</li>
                <li>• Use emojis for visual appeal</li>
                <li>• Focus on benefits to students</li>
                <li>• Practice key phrases for debates</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformIssues;
