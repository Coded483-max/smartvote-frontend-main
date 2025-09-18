import React from "react";
import { useOutletContext } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Plus,
  Heart,
  MessageSquare,
  TrendingUp,
  Instagram,
  Share2,
  Eye,
  ArrowUp,
  Settings,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const Social = () => {
  const {
    setShowPostModal,
    setSelectedPlatform,
    setShowSocialAccountModal,
    selectedPlatform,
    showPostModal,
    showSocialAccountModal,
    setConnectedAccounts,
  } = useOutletContext();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-purple-900">Social Media</h2>
          <p className="text-purple-600">
            Manage your campaign's online presence
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-purple-300 text-purple-700 hover:bg-purple-50"
            onClick={() => alert("Opening social media account settings...")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Account Settings
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            onClick={() => setShowPostModal(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Post
          </Button>
        </div>
      </div>

      {showPostModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowPostModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">
              Create Social Media Post
            </h3>
            <div className="space-y-4">
              <textarea
                className="w-full p-2 border rounded"
                placeholder="What's happening with your campaign?"
                rows={4}
              ></textarea>
              <select className="w-full p-2 border rounded">
                <option>Instagram</option>
                <option>TikTok</option>
                <option>Twitter</option>
                <option>All Platforms</option>
              </select>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    alert("Post created!");
                    setShowPostModal(false);
                  }}
                >
                  Post
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowPostModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSocialAccountModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowSocialAccountModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">
              Connect{" "}
              {selectedPlatform === "custom"
                ? "Social Media Account"
                : selectedPlatform.charAt(0).toUpperCase() +
                  selectedPlatform.slice(1)}
            </h3>
            <div className="space-y-4">
              {selectedPlatform === "custom" ? (
                <>
                  <Input placeholder="Platform Name (e.g., LinkedIn, YouTube)" />
                  <Input placeholder="Your Username/Handle" />
                  <Input placeholder="Profile URL (optional)" />
                </>
              ) : (
                <>
                  <Input
                    placeholder={`Your ${selectedPlatform} username or handle`}
                  />
                  <Input placeholder="Profile URL (optional)" />
                  <div className="p-3 bg-blue-50 rounded-lg text-sm">
                    <p>
                      We'll help you connect your {selectedPlatform} account
                      for:
                    </p>
                    <ul className="mt-2 space-y-1 text-xs">
                      <li>• Cross-posting content</li>
                      <li>• Analytics tracking</li>
                      <li>• Follower insights</li>
                    </ul>
                  </div>
                </>
              )}
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    alert(
                      `${selectedPlatform} account connected successfully!`
                    );
                    setConnectedAccounts((prev) => ({
                      ...prev,
                      [selectedPlatform]: {
                        connected: true,
                        username: "@newaccount",
                      },
                    }));
                    setShowSocialAccountModal(false);
                  }}
                >
                  Connect Account
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowSocialAccountModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">
              Instagram
            </CardTitle>
            <Instagram className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">847</div>
            <div className="flex items-center text-xs text-emerald-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              +23 this week
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-500 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">
              TikTok
            </CardTitle>
            <Heart className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">234</div>
            <div className="flex items-center text-xs text-emerald-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              +12 this week
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-violet-500 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">
              Twitter/X
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-violet-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">156</div>
            <div className="flex items-center text-xs text-emerald-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              +8 this week
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">
              This Week
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">12</div>
            <p className="text-xs text-purple-600">posts created</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-purple-200 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-purple-900">
                Connected Accounts
              </CardTitle>
            </div>
            <CardDescription className="text-purple-600">
              Manage your social media integrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">IG</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-900">
                      Instagram
                    </p>
                    <p className="text-xs text-purple-600">@alexsmith2024</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-emerald-100 text-emerald-800">
                    Connected
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50"
                    onClick={() =>
                      alert(
                        "Instagram settings: Post scheduling, analytics, auto-posting options"
                      )
                    }
                  >
                    Settings
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-gray-800 to-black rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">TT</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-900">
                      TikTok
                    </p>
                    <p className="text-xs text-purple-600">@alexforpresident</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-emerald-100 text-emerald-800">
                    Connected
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50"
                    onClick={() =>
                      alert(
                        "TikTok settings: Video upload preferences, hashtag suggestions"
                      )
                    }
                  >
                    Settings
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">X</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-900">
                      Twitter/X
                    </p>
                    <p className="text-xs text-purple-600">Not connected</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  onClick={() => {
                    setSelectedPlatform("twitter");
                    setShowSocialAccountModal(true);
                  }}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Connect
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">FB</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-900">
                      Facebook
                    </p>
                    <p className="text-xs text-purple-600">Not connected</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  onClick={() => {
                    setSelectedPlatform("facebook");
                    setShowSocialAccountModal(true);
                  }}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Connect
                </Button>
              </div>

              <Button
                variant="outline"
                className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
                onClick={() => {
                  setSelectedPlatform("custom");
                  setShowSocialAccountModal(true);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Platform
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-purple-900">
                Engagement Analytics
              </CardTitle>
            </div>
            <CardDescription className="text-purple-600">
              Your social media performance this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 text-center">
                  <div className="text-lg font-bold text-purple-900">2,847</div>
                  <div className="text-xs text-purple-600">Total Reach</div>
                </div>
                <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200 text-center">
                  <div className="text-lg font-bold text-purple-900">184</div>
                  <div className="text-xs text-purple-600">Engagements</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-purple-700">Instagram Stories</span>
                  <span className="text-purple-900 font-medium">
                    1,234 views
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-purple-700">TikTok Videos</span>
                  <span className="text-purple-900 font-medium">856 views</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-purple-700">Twitter Impressions</span>
                  <span className="text-purple-900 font-medium">345 views</span>
                </div>
              </div>

              <div className="pt-3 border-t border-purple-200">
                <div className="flex items-center gap-2 text-sm text-emerald-600">
                  <ArrowUp className="h-4 w-4" />
                  <span>15% increase from last week</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-purple-200 hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-purple-900">Recent Posts</CardTitle>
          </div>
          <CardDescription className="text-purple-600">
            Your latest social media content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                platform: "Instagram",
                content: "Behind the scenes at debate prep! 📚✨",
                time: "2 hours ago",
                engagement: "34 likes, 5 comments",
                color: "bg-purple-100 text-purple-800",
              },
              {
                platform: "TikTok",
                content: "Day in the life of a student candidate 🎓",
                time: "5 hours ago",
                engagement: "127 likes, 8 comments",
                color: "bg-gray-100 text-gray-800",
              },
              {
                platform: "Twitter",
                content: "Don't forget to register to vote by March 10! 🗳️",
                time: "1 day ago",
                engagement: "23 likes, 4 retweets",
                color: "bg-blue-100 text-blue-800",
              },
            ].map((post, index) => (
              <div
                key={index}
                className="p-4 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <Badge className={post.color}>{post.platform}</Badge>
                  <span className="text-xs text-purple-600">{post.time}</span>
                </div>
                <p className="text-sm text-purple-900 mb-2">{post.content}</p>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-purple-600">{post.engagement}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 px-2 text-purple-700 hover:bg-purple-100"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-purple-900">Content Ideas</CardTitle>
          </div>
          <CardDescription className="text-purple-600">
            Popular student campaign content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Behind-the-scenes campaign prep",
              "Platform issues explained simply",
              "Voter registration reminders",
              "Campus tour highlighting issues",
              "Student testimonials and endorsements",
              "Day-in-the-life content",
              "Q&A sessions with followers",
              "Event recaps and highlights",
            ].map((idea, index) => (
              <div
                key={index}
                className="p-3 bg-white border border-purple-200 rounded-lg text-sm text-purple-900 hover:bg-purple-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span>{idea}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setShowPostModal(true)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Social;
