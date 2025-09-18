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
  Calendar,
  MapPin,
  Clock,
  Users,
  Megaphone,
  BookOpen,
  Coffee,
  Gamepad2,
  UserPlus,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const Events = () => {
  const { setShowEventModal, showEventModal } = useOutletContext();

  // Function to get event type color and icon
  const getEventTypeStyle = (type) => {
    switch (type) {
      case "Debate":
        return {
          color: "bg-rose-100 text-rose-800",
          icon: Megaphone,
        };
      case "Tabling":
        return {
          color: "bg-indigo-100 text-indigo-800",
          icon: Users,
        };
      case "Registration":
        return {
          color: "bg-emerald-100 text-emerald-800",
          icon: UserPlus,
        };
      case "Meet & Greet":
        return {
          color: "bg-purple-100 text-purple-800",
          icon: Coffee,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: Calendar,
        };
    }
  };

  // Function to get status badge style
  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-100 text-emerald-800";
      case "Pending":
        return "bg-amber-100 text-amber-800";
      case "Cancelled":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-purple-900">Campus Events</h2>{" "}
          {/* ✅ Purple title */}
          <p className="text-purple-600">
            Manage your campaign activities and events
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
          onClick={() => setShowEventModal(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Schedule Event
        </Button>
      </div>
      {showEventModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowEventModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">Schedule New Event</h3>
            <div className="space-y-4">
              <Input placeholder="Event Title (e.g., Dining Hall Tabling)" />
              <Input placeholder="Date & Time" />
              <Input placeholder="Location" />
              <select className="w-full p-2 border rounded">
                <option>Event Type</option>
                <option>Tabling</option>
                <option>Meet & Greet</option>
                <option>Debate</option>
                <option>Voter Registration</option>
                <option>Other</option>
              </select>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    alert("Event scheduled!");
                    setShowEventModal(false);
                  }}
                >
                  Schedule
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowEventModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card className="border-purple-200 hover:shadow-md transition-shadow">
          {" "}
          {/* ✅ Purple border */}
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />{" "}
              {/* ✅ Purple icon */}
              <CardTitle className="text-purple-900">Upcoming Events</CardTitle>
            </div>
            <CardDescription className="text-purple-600">
              Your scheduled campaign activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Student Debate",
                  date: "March 8, 7:00 PM",
                  location: "Student Union Auditorium",
                  type: "Debate",
                  status: "Confirmed",
                  attendees: "200+ expected",
                },
                {
                  title: "Dining Hall Tabling",
                  date: "March 9, 11:00 AM - 2:00 PM",
                  location: "Commons Dining Hall",
                  type: "Tabling",
                  status: "Confirmed",
                  attendees: "300+ students",
                },
                {
                  title: "Voter Registration Drive",
                  date: "March 10, 12:00 PM - 4:00 PM",
                  location: "Library Quad",
                  type: "Registration",
                  status: "Confirmed",
                  attendees: "50+ registrations",
                },
                {
                  title: "Freshman Meet & Greet",
                  date: "March 11, 6:00 PM",
                  location: "Johnson Hall Lounge",
                  type: "Meet & Greet",
                  status: "Confirmed",
                  attendees: "40+ freshmen",
                },
              ].map((event, index) => {
                const typeStyle = getEventTypeStyle(event.type);
                const TypeIcon = typeStyle.icon;

                return (
                  <div
                    key={index}
                    className="p-4 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-purple-900">
                            {event.title}
                          </h4>
                          <Badge className={getStatusStyle(event.status)}>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {event.status}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-purple-700">
                            <Clock className="w-4 h-4" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-purple-700">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-purple-700">
                            <Users className="w-4 h-4" />
                            {event.attendees}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={`${typeStyle.color} text-xs`}>
                          <TypeIcon className="w-3 h-3 mr-1" />
                          {event.type}
                        </Badge>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 w-7 p-0 border-purple-300 text-purple-700 hover:bg-purple-50"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 w-7 p-0 border-rose-300 text-rose-700 hover:bg-rose-50"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Summary Stats */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                <h5 className="font-medium text-purple-900 mb-2">
                  This Week's Summary
                </h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-900">4</div>
                    <div className="text-purple-600">Events Scheduled</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-900">
                      590+
                    </div>
                    <div className="text-purple-600">Students Reached</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Event Ideas */}
        <Card className="border-purple-200 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-purple-900">Event Ideas</CardTitle>
            </div>
            <CardDescription className="text-purple-600">
              Popular student campaign activities to consider
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  activity: "Dining Hall Tabling",
                  description: "Meet students during meal times",
                  icon: Users,
                  difficulty: "Easy",
                  impact: "High",
                },
                {
                  activity: "Dorm Floor Visits",
                  description: "Door-to-door in residence halls",
                  icon: Users,
                  difficulty: "Medium",
                  impact: "High",
                },
                {
                  activity: "Library Study Breaks",
                  description: "Free snacks during finals",
                  icon: Coffee,
                  difficulty: "Easy",
                  impact: "Medium",
                },
                {
                  activity: "Quad Activities",
                  description: "Games and giveaways on campus",
                  icon: Gamepad2,
                  difficulty: "Medium",
                  impact: "High",
                },
                {
                  activity: "Club Presentations",
                  description: "Speak at student organization meetings",
                  icon: Megaphone,
                  difficulty: "Easy",
                  impact: "Medium",
                },
                {
                  activity: "Voter Registration Drives",
                  description: "Help students register to vote",
                  icon: UserPlus,
                  difficulty: "Easy",
                  impact: "High",
                },
              ].map((idea, index) => {
                const IdeaIcon = idea.icon;

                const getDifficultyColor = (difficulty) => {
                  switch (difficulty) {
                    case "Easy":
                      return "bg-emerald-100 text-emerald-800";
                    case "Medium":
                      return "bg-amber-100 text-amber-800";
                    case "Hard":
                      return "bg-rose-100 text-rose-800";
                    default:
                      return "bg-gray-100 text-gray-800";
                  }
                };

                const getImpactColor = (impact) => {
                  switch (impact) {
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

                return (
                  <div
                    key={index}
                    className="p-3 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-200 rounded-lg">
                        <IdeaIcon className="w-4 h-4 text-purple-700" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-purple-900">
                            {idea.activity}
                          </p>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity text-purple-700 hover:bg-purple-200"
                            onClick={() => setShowEventModal()}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add
                          </Button>
                        </div>
                        <p className="text-xs text-purple-600 mb-2">
                          {idea.description}
                        </p>
                        <div className="flex gap-2">
                          <Badge
                            className={`${getDifficultyColor(
                              idea.difficulty
                            )} text-xs`}
                          >
                            {idea.difficulty}
                          </Badge>
                          <Badge
                            className={`${getImpactColor(idea.impact)} text-xs`}
                          >
                            {idea.impact} Impact
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Tips */}
            <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-purple-200">
              <h5 className="font-medium text-purple-900 mb-2">
                💡 Event Tips
              </h5>
              <ul className="text-xs text-purple-700 space-y-1">
                <li>• Book popular venues early (Student Union, Library)</li>
                <li>• Coordinate with dining services for meal time events</li>
                <li>• Get approval from residence hall coordinators</li>
                <li>• Bring sign-up sheets and campaign materials</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Calendar Overview */}
      <Card className="border-purple-200 hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-purple-900">Weekly Schedule</CardTitle>
          </div>
          <CardDescription className="text-purple-600">
            Your campaign events at a glance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
              (day, index) => (
                <div key={day} className="text-center">
                  <div className="text-xs font-medium text-purple-700 mb-2">
                    {day}
                  </div>
                  <div className="space-y-1">
                    {index === 1 && ( // Tuesday - Debate
                      <div className="bg-rose-100 text-rose-800 text-xs p-1 rounded">
                        Debate 7PM
                      </div>
                    )}
                    {index === 2 && ( // Wednesday - Tabling
                      <div className="bg-indigo-100 text-indigo-800 text-xs p-1 rounded">
                        Tabling 11AM
                      </div>
                    )}
                    {index === 3 && ( // Thursday - Registration
                      <div className="bg-emerald-100 text-emerald-800 text-xs p-1 rounded">
                        Registration 12PM
                      </div>
                    )}
                    {index === 4 && ( // Friday - Meet & Greet
                      <div className="bg-purple-100 text-purple-800 text-xs p-1 rounded">
                        Meet & Greet 6PM
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Events;
