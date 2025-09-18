import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Clock, User, Send, Plus } from "lucide-react";

// Mock data - replace with real API calls
const mockDiscussions = [
  {
    id: 1,
    question: "What is your stance on healthcare reform?",
    voterName: "John D.",
    timestamp: "2 hours ago",
    status: "pending",
    candidateReplies: [],
  },
  {
    id: 2,
    question: "How do you plan to address climate change?",
    voterName: "Sarah M.",
    timestamp: "4 hours ago",
    status: "replied",
    candidateReplies: [
      {
        id: 1,
        content:
          "I believe in a comprehensive approach that includes renewable energy investments and carbon reduction policies.",
        timestamp: "3 hours ago",
        candidateName: "Jane Smith",
      },
    ],
  },
  {
    id: 3,
    question: "What are your thoughts on education funding?",
    voterName: "Mike R.",
    timestamp: "1 day ago",
    status: "pending",
    candidateReplies: [],
  },
  {
    id: 4,
    question: "How will you improve public transportation?",
    voterName: "Lisa K.",
    timestamp: "2 days ago",
    status: "replied",
    candidateReplies: [
      {
        id: 2,
        content:
          "Public transportation is crucial for reducing traffic and emissions. I plan to increase funding for bus and rail systems.",
        timestamp: "1 day ago",
        candidateName: "Jane Smith",
      },
    ],
  },
];

const VoterForum = () => {
  const [discussions, setDiscussions] = useState(mockDiscussions);
  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [voterName, setVoterName] = useState("");

  const handleSubmitQuestion = () => {
    if (!newQuestion.trim() || !voterName.trim()) return;

    const newDiscussion = {
      id: Date.now(),
      question: newQuestion,
      voterName: voterName,
      timestamp: "Just now",
      status: "pending",
      candidateReplies: [],
    };

    setDiscussions((prev) => [newDiscussion, ...prev]);
    setNewQuestion("");
    setVoterName("");
    setShowNewQuestion(false);
  };

  const pendingQuestions = discussions.filter((d) => d.status === "pending");
  const answeredQuestions = discussions.filter((d) => d.status === "replied");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold"> Forum</h2>
        <Button
          onClick={() => setShowNewQuestion(true)}
          className="text-white bg-gradient-to-r from-blue-600 to-purple-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ask Question
        </Button>
      </div>

      {/* New Question Form */}
      {showNewQuestion && (
        <Card className="border-2 border-primary w-200">
          <CardHeader>
            <CardTitle>Ask a New Question</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Your name"
              value={voterName}
              onChange={(e) => setVoterName(e.target.value)}
            />
            <Textarea
              placeholder="What would you like to ask the candidates?"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex gap-2">
              <Button
                onClick={handleSubmitQuestion}
                disabled={!newQuestion.trim() || !voterName.trim()}
                className="text-white bg-gradient-to-r from-blue-600 to-purple-600"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Question
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowNewQuestion(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{discussions.length}</div>
            <p className="text-xs text-muted-foreground">Total Questions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{answeredQuestions.length}</div>
            <p className="text-xs text-muted-foreground">Answered</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{pendingQuestions.length}</div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Discussions */}
      <section>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Recent Discussions
        </h3>

        {discussions.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No discussions yet. Be the first to ask a question!
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {discussions.map((discussion) => (
              <Card key={discussion.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{discussion.voterName}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {discussion.timestamp}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={`${
                        discussion.status === "replied"
                          ? "bg-green-400"
                          : "bg-yellow-400"
                      }`}
                    >
                      {discussion.status === "replied" ? "Answered" : "Pending"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-sm text-muted-foreground mb-1">
                        Question:
                      </p>
                      <p>{discussion.question}</p>
                    </div>

                    {discussion.candidateReplies.length > 0 && (
                      <div className="space-y-3">
                        <p className="font-medium text-sm text-muted-foreground">
                          Candidate Responses:
                        </p>
                        {discussion.candidateReplies.map((reply) => (
                          <div
                            key={reply.id}
                            className="bg-primary/5 p-4 rounded-lg border-l-4 border-l-primary"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium text-sm">
                                {reply.candidateName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {reply.timestamp}
                              </p>
                            </div>
                            <p>{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {discussion.status === "pending" && (
                      <div className="bg-muted p-3 rounded-lg text-center text-sm text-muted-foreground">
                        Waiting for candidate response...
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default VoterForum;
