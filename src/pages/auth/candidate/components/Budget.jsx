import React from "react";
import { useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  TrendingUp,
  BarChart3,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

const Budget = () => {
  const outletContext = useOutletContext();
  const { showExpenseModal, setShowExpenseModal } = outletContext;

  // Calculate budget status
  const budgetLimit = 500;
  const totalSpent = 347;
  const remaining = budgetLimit - totalSpent;
  const percentageUsed = (totalSpent / budgetLimit) * 100;

  // Get budget status color and message
  const getBudgetStatus = () => {
    if (percentageUsed >= 90) {
      return {
        color: "bg-rose-100 text-rose-800",
        icon: AlertTriangle,
        message: "Budget Critical",
        description: "Very close to limit",
      };
    } else if (percentageUsed >= 70) {
      return {
        color: "bg-amber-100 text-amber-800",
        icon: Clock,
        message: "Budget Warning",
        description: "Monitor spending closely",
      };
    } else {
      return {
        color: "bg-emerald-100 text-emerald-800",
        icon: CheckCircle,
        message: "Budget Healthy",
        description: "Good spending pace",
      };
    }
  };

  const budgetStatus = getBudgetStatus();
  const StatusIcon = budgetStatus.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-purple-900">
            Campaign Budget
          </h2>{" "}
          {/* ✅ Purple title */}
          <p className="text-purple-600">
            Track and manage your campaign expenses
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={budgetStatus.color}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {budgetStatus.message}
          </Badge>
          <Button
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            onClick={() => setShowExpenseModal(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        </div>
      </div>

      {showExpenseModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowExpenseModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">Add Expense</h3>
            <div className="space-y-4">
              <Input placeholder="Item (e.g., Campaign Buttons)" />
              <Input placeholder="Amount ($)" />
              <select className="w-full p-2 border rounded">
                <option>Category</option>
                <option>Promotional Materials</option>
                <option>Event Costs</option>
                <option>Digital/Social Media</option>
                <option>Food & Refreshments</option>
              </select>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    alert("Expense added!");
                    setShowExpenseModal(false);
                  }}
                >
                  Add
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowExpenseModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
          {" "}
          {/* ✅ Purple accent */}
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">
              Budget Limit
            </CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />{" "}
            {/* ✅ Purple icon */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              ${budgetLimit}
            </div>
            <p className="text-xs text-purple-600">University limit</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-500 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">
              Total Spent
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              ${totalSpent}
            </div>
            <p className="text-xs text-purple-600">
              {percentageUsed.toFixed(1)}% of budget used
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">
              Remaining
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              ${remaining}
            </div>
            <p className="text-xs text-purple-600">
              {(100 - percentageUsed).toFixed(1)}% remaining
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress Bar */}
      <Card className="border-purple-200 hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-purple-900">
            Budget Usage Overview
          </CardTitle>
          <CardDescription className="text-purple-600">
            {budgetStatus.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-purple-700">
              <span>Budget Progress</span>
              <span>
                ${totalSpent} / ${budgetLimit}
              </span>
            </div>
            <Progress
              value={percentageUsed}
              className="h-3 bg-purple-100"
              style={{
                background: "rgb(243 232 255)", // purple-100
                "--progress-foreground":
                  percentageUsed >= 90
                    ? "rgb(244 63 94)"
                    : percentageUsed >= 70
                    ? "rgb(245 158 11)"
                    : "rgb(147 51 234)", // red/amber/purple based on usage
              }}
            />
            <div className="flex justify-between text-xs text-purple-600">
              <span>Safe Zone (0-70%)</span>
              <span>Warning (70-90%)</span>
              <span>Critical (90%+)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Breakdown */}
        <Card className="border-purple-200 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-purple-900">
              Spending Breakdown
            </CardTitle>
            <CardDescription className="text-purple-600">
              How you're using your campaign funds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  category: "Promotional Materials",
                  spent: 185,
                  budget: 200,
                  color: "from-purple-500 to-purple-600",
                },
                {
                  category: "Event Costs",
                  spent: 127,
                  budget: 150,
                  color: "from-indigo-500 to-indigo-600",
                },
                {
                  category: "Digital/Social Media",
                  spent: 35,
                  budget: 100,
                  color: "from-violet-500 to-violet-600",
                },
                {
                  category: "Food & Refreshments",
                  spent: 0,
                  budget: 50,
                  color: "from-purple-400 to-purple-500",
                },
              ].map((item, index) => {
                const percentage = (item.spent / item.budget) * 100;
                const isOverBudget = item.spent > item.budget;

                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-purple-900 font-medium">
                          {item.category}
                        </span>
                        {isOverBudget && (
                          <Badge className="bg-rose-100 text-rose-800 text-xs">
                            Over Budget
                          </Badge>
                        )}
                      </div>
                      <span className="text-purple-700">
                        ${item.spent} / ${item.budget}
                      </span>
                    </div>
                    <Progress
                      value={Math.min(percentage, 100)}
                      className="h-2 bg-purple-100"
                      style={{
                        background: "rgb(243 232 255)",
                        "--progress-foreground": isOverBudget
                          ? "rgb(244 63 94)"
                          : `rgb(147 51 234)`, // red if over budget, purple otherwise
                      }}
                    />
                    <div className="flex justify-between text-xs">
                      <span className="text-purple-600">
                        {percentage.toFixed(0)}% used
                      </span>
                      <span
                        className={`${
                          isOverBudget ? "text-rose-600" : "text-emerald-600"
                        }`}
                      >
                        $
                        {isOverBudget
                          ? item.spent - item.budget
                          : item.budget - item.spent}{" "}
                        {isOverBudget ? "over" : "left"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Expenses */}
        <Card className="border-purple-200 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-purple-900">Recent Expenses</CardTitle>
            <CardDescription className="text-purple-600">
              Your latest purchases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  item: "Campaign Buttons",
                  amount: 45,
                  date: "March 6",
                  category: "Promotional",
                },
                {
                  item: "Poster Printing",
                  amount: 67,
                  date: "March 5",
                  category: "Promotional",
                },
                {
                  item: "Instagram Promotion",
                  amount: 25,
                  date: "March 4",
                  category: "Digital",
                },
                {
                  item: "Debate Prep Snacks",
                  amount: 15,
                  date: "March 3",
                  category: "Food",
                },
                {
                  item: "Flyer Design",
                  amount: 30,
                  date: "March 2",
                  category: "Digital",
                },
              ].map((expense, index) => {
                const getCategoryColor = (category) => {
                  switch (category) {
                    case "Promotional":
                      return "bg-purple-100 text-purple-800";
                    case "Digital":
                      return "bg-indigo-100 text-indigo-800";
                    case "Food":
                      return "bg-emerald-100 text-emerald-800";
                    case "Event":
                      return "bg-violet-100 text-violet-800";
                    default:
                      return "bg-gray-100 text-gray-800";
                  }
                };

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-purple-900">
                          {expense.item}
                        </p>
                        <Badge
                          className={`${getCategoryColor(
                            expense.category
                          )} text-xs`}
                        >
                          {expense.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-purple-600">{expense.date}</p>
                    </div>
                    <div className="text-sm font-bold text-purple-900">
                      ${expense.amount}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total for recent expenses */}
            <div className="mt-4 pt-3 border-t border-purple-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-purple-600">
                  Recent total (5 items)
                </span>
                <span className="text-sm font-bold text-purple-900">$182</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Tips */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="text-purple-900">💡 Budget Tips</CardTitle>
          <CardDescription className="text-purple-600">
            Smart spending strategies for your campaign
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium text-purple-900">
                Cost-Effective Ideas:
              </h4>
              <ul className="space-y-1 text-purple-700">
                <li>• Use social media for free promotion</li>
                <li>• Partner with student organizations</li>
                <li>• Create digital flyers instead of printed</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-purple-900">
                Priority Spending:
              </h4>
              <ul className="space-y-1 text-purple-700">
                <li>• Focus on high-visibility events</li>
                <li>• Invest in quality campaign materials</li>
                <li>• Save budget for final week push</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Budget;
