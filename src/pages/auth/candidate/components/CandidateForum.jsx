import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Clock, User, Send } from "lucide-react";

import {
  useGetPendingForumQuestionsQuery,
  useAnswerPendingQuestionMutation,
  useGetAnsweredQuestionsQuery,
  useGetForumStatsQuery,
} from "@/api/candidateApi";
import Loader from "@/UI/Loader";
import { useParams } from "react-router-dom";

// Mock data - replace with real API calls
const mockQuestions = [
  {
    id: 1,
    question: "What is your stance on healthcare reform?",
    voterName: "John D.",
    timestamp: "2 hours ago",
    status: "pending",
    replies: [],
  },
  {
    id: 2,
    question: "How do you plan to address climate change?",
    voterName: "Sarah M.",
    timestamp: "4 hours ago",
    status: "replied",
    replies: [
      {
        id: 1,
        content:
          "I believe in a comprehensive approach that includes renewable energy investments and carbon reduction policies.",
        timestamp: "3 hours ago",
      },
    ],
  },
  {
    id: 3,
    question: "What are your thoughts on education funding?",
    voterName: "Mike R.",
    timestamp: "1 day ago",
    status: "pending",
    replies: [],
  },
];

const CandidateForum = () => {
  //   const [questions, setQuestions] = useState(mockQuestions);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer, setAnswer] = useState("");

  const {
    data: pendingQuestions,
    isLoading,
    refetch,
  } = useGetPendingForumQuestionsQuery();

  const [answerPendingQuestion, { isLoading: isAnswering }] =
    useAnswerPendingQuestionMutation();

  const {
    data: answeredQuestions,
    isLoading: isLoadingAnswered,
    refetch: refetchAnswered,
  } = useGetAnsweredQuestionsQuery();

  if (isLoadingAnswered) {
    console.log("Loading answered questions...");
  }

  //   console.log(answeredQuestions);

  const { data: forumStats, isLoading: isLoadingStats } =
    useGetForumStatsQuery();

  const handleReply = async (id) => {
    if (!answer.trim()) return;

    const result = await answerPendingQuestion({ questionId: id, answer });
    setAnswer("");
    setSelectedQuestion(null);

    // Only refetch if the mutation was successful
    if (!result.error) {
      refetch();
      refetchAnswered();
    }
  };

  // ✅ Ensure questions is always an array
  const questions = Array.isArray(pendingQuestions?.questions)
    ? pendingQuestions.questions
    : Array.isArray(pendingQuestions)
    ? pendingQuestions
    : [];
  // ✅ Ensure questions is always an array
  const answered = Array.isArray(answeredQuestions?.questions)
    ? answeredQuestions.questions
    : Array.isArray(answeredQuestions)
    ? answeredQuestions
    : [];

  console.log(answered, "answered in CandidateForum");

  console.log(questions, "questions in CandidateForum");

  //   const pendingQuestions = questions.filter((q) => q.status === "pending");
  const repliedQuestions = questions?.filter((q) => q.status === "answered");

  console.log(repliedQuestions, "repliedQuestions");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 space-y-6 p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-purple-500">Forum </h2>
        <div className="flex gap-4">
          <Badge className="text-sm bg-yellow-400">
            {pendingQuestions?.questions?.length} Pending Questions
          </Badge>
          <Badge className="text-sm bg-green-400">
            {answered.length} &nbsp; Replied
          </Badge>
        </div>
      </div>

      {/* Pending Questions */}
      <section>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-purple-400">
          <MessageCircle className="h-5 w-5 text-purple-400" />
          Pending Questions
        </h3>

        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : pendingQuestions?.questions?.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No pending questions at the moment.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingQuestions.questions.map((question) => (
              <Card
                key={question.id}
                className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 sm:grid-cols-4 border-l-4 border-l-yellow-400"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-purple-600">
                          {question.voterName}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {question.timeAgo}
                        </p>
                      </div>
                    </div>
                    <Badge className="text-sm bg-yellow-400">
                      {question.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-purple-500">{question.content}</p>

                  {selectedQuestion === question.id ? (
                    <div className="space-y-3">
                      <Textarea
                        placeholder="Type your response here..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleReply(question.id)}
                          disabled={!answer.trim() || isAnswering}
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          {isAnswering ? "Sending..." : "Send Reply"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedQuestion(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => setSelectedQuestion(question.id)}
                    >
                      Reply to Question
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Recent Discussions */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Recent Discussions</h3>

        {answeredQuestions?.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No discussions yet.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {answeredQuestions?.questions?.map((question) => (
              <Card key={question.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{question.voterName}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {question.timeAgo}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-500 text-white">Replied</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-sm text-muted-foreground mb-1">
                        Question:
                      </p>
                      <p>{question?.content}</p>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm">Your Response:</p>
                        <p className="text-xs text-muted-foreground">
                          {question.answeredTimeAgo}
                        </p>
                      </div>
                      <p>{question?.answer}</p>
                    </div>
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

export default CandidateForum;
