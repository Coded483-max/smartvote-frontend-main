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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, FileText, Vote, ArrowUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

const Overview = () => {
  const {
    setShowEventModal,
    setShowExpenseModal,
    setShowPostModal,
    setShowIssueModal,
    setShowSocialAccountModal,

    showIssueModal,
  } = useOutletContext();

  // console.log("setShowEventModal:", setShowEventModal);
  // console.log("setShowExpenseModal:", setShowExpenseModal);
  // console.log("setShowPostModal:", setShowPostModal);
  // console.log("setShowIssueModal:", setShowIssueModal);
  // console.log("setShowSocialAccountModal:", setShowSocialAccountModal);
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">
              Days to Election
            </CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />{" "}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">12</div>
            <div className="text-xs text-purple-600">March 15, 2024</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-500 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">
              Campaign Team
            </CardTitle>
            <Users className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">23</div>
            <div className="flex items-center text-xs text-emerald-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              +5 volunteers this week
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-400 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">
              Platform Issues
            </CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">8</div>
            <div className="text-xs text-purple-600">Key policy positions</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-400 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">
              Students Reached
            </CardTitle>
            <Users className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">1,247</div>
            <div className="text-xs text-purple-600">15.6% of student body</div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-purple-200 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-purple-900">Campaign Goals</CardTitle>{" "}
            <CardDescription className="text-purple-600">
              Track your key milestones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2 text-purple-700">
                <span>Dorm Visits</span>
                <span>8 / 12 residence halls</span>
              </div>
              <Progress
                value={67}
                className="h-2 bg-purple-100"
                style={{
                  background: "rgb(243 232 255)", // purple-100
                  "--progress-foreground": "rgb(147 51 234)", // purple-600
                }}
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2 text-purple-700">
                <span>Student Orgs Met</span>
                <span>15 / 20 organizations</span>
              </div>
              <Progress
                value={75}
                className="h-2 bg-purple-100"
                style={{
                  background: "rgb(243 232 255)",
                  "--progress-foreground": "rgb(147 51 234)",
                }}
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2 text-purple-700">
                <span>Platform Development</span>
                <span>8 / 10 key issues</span>
              </div>
              <Progress
                value={80}
                className="h-2 bg-purple-100"
                style={{
                  background: "rgb(243 232 255)",
                  "--progress-foreground": "rgb(147 51 234)",
                }}
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2 text-purple-700">
                <span>Social Media Followers</span>
                <span>1,234 / 2,000 goal</span>
              </div>
              <Progress
                value={62}
                className="h-2 bg-purple-100"
                style={{
                  background: "rgb(243 232 255)",
                  "--progress-foreground": "rgb(147 51 234)",
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-purple-900">Recent Updates</CardTitle>
            <CardDescription className="text-purple-600">
              Latest campaign activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>{" "}
                <div className="flex-1">
                  <p className="text-sm font-medium text-purple-900">
                    Debate Tomorrow
                  </p>
                  <p className="text-xs text-purple-600">
                    Student Union - 7:00 PM
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-purple-900">
                    New Platform Issue Added
                  </p>
                  <p className="text-xs text-purple-600">
                    Mental Health Resources - 2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-purple-900">
                    Voter Registration Drive
                  </p>
                  <p className="text-xs text-purple-600">
                    Registered 47 new students
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-purple-200 hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-purple-900">Quick Actions</CardTitle>
          <CardDescription className="text-purple-600">
            Common campaign tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              className="h-16 flex-col space-y-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white" /* ✅ Purple gradient */
              onClick={() => setShowEventModal(true)}
            >
              <Plus className="h-4 w-4" />
              <span className="text-xs">Schedule Event</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex-col space-y-1 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400" /* ✅ Purple outline */
              onClick={() => setShowIssueModal(true)}
            >
              <FileText className="h-4 w-4" />
              <span className="text-xs">Add Issue</span>
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
                  <h3 className="text-lg font-semibold mb-4">
                    Add Platform Issue
                  </h3>
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
            <Button
              variant="outline"
              className="h-16 flex-col space-y-1 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400"
              onClick={() => alert("Voter Info")}
            >
              <Vote className="h-4 w-4" />
              <span className="text-xs">Voter Info</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex-col space-y-1 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400"
              onClick={() => setShowPostModal(true)}
            >
              <Share2 className="h-4 w-4" />
              <span className="text-xs">Post Update</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* This Week's Schedule */}
      <Card className="border-purple-200 hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-purple-900">
            This Week's Schedule
          </CardTitle>
          <CardDescription className="text-purple-600">
            Your upcoming campaign events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-purple-900">
                    Student Debate
                  </p>
                  <p className="text-xs text-purple-600">
                    Tomorrow, 7:00 PM - Student Union
                  </p>
                </div>
              </div>
              <Badge className="bg-rose-100 text-rose-800">High Priority</Badge>{" "}
            </div>
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center space-x-3">
                <Users className="h-4 w-4 text-emerald-600" />
                <div>
                  <p className="text-sm font-medium text-purple-900">
                    Dining Hall Tabling
                  </p>
                  <p className="text-xs text-purple-600">
                    March 8, 11:00 AM - Commons
                  </p>
                </div>
              </div>
              <Badge className="bg-amber-100 text-amber-800">Medium</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg border border-indigo-200">
              <div className="flex items-center space-x-3">
                <Vote className="h-4 w-4 text-indigo-600" />
                <div>
                  <p className="text-sm font-medium text-purple-900">
                    Voter Registration Drive
                  </p>
                  <p className="text-xs text-purple-600">
                    March 9, 12:00 PM - Library Quad
                  </p>
                </div>
              </div>
              <Badge className="bg-slate-100 text-slate-800">Medium</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
