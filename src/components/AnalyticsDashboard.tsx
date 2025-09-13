import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Clock, 
  BookOpen, 
  Award,
  Brain,
  Calendar
} from "lucide-react";

export const AnalyticsDashboard = () => {
  const studyStats = {
    totalStudyTime: "47.5 hours",
    completedTopics: 23,
    averageScore: 87,
    streak: 12,
    weeklyGoal: 75,
    documentsProcessed: 15
  };

  const recentActivity = [
    { date: "2024-01-15", activity: "Completed Mathematics Quiz", score: 92 },
    { date: "2024-01-14", activity: "Studied Linear Algebra", duration: "2.5 hrs" },
    { date: "2024-01-13", activity: "Uploaded Physics Notes", files: 3 },
    { date: "2024-01-12", activity: "Practice Test - Calculus", score: 85 }
  ];

  const topicProgress = [
    { topic: "Mathematics", progress: 92, color: "bg-primary" },
    { topic: "Physics", progress: 78, color: "bg-secondary" },
    { topic: "Chemistry", progress: 85, color: "bg-success" },
    { topic: "Biology", progress: 67, color: "bg-warning" }
  ];

  const weeklyData = [
    { day: "Mon", hours: 3.2, completed: 2 },
    { day: "Tue", hours: 4.1, completed: 3 },
    { day: "Wed", hours: 2.8, completed: 1 },
    { day: "Thu", hours: 5.2, completed: 4 },
    { day: "Fri", hours: 3.9, completed: 2 },
    { day: "Sat", hours: 6.1, completed: 5 },
    { day: "Sun", hours: 4.3, completed: 3 }
  ];

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-card hover:shadow-academic transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Study Time</p>
              <p className="text-3xl font-bold text-foreground">{studyStats.totalStudyTime}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-full">
              <Clock className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card hover:shadow-academic transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Completed Topics</p>
              <p className="text-3xl font-bold text-foreground">{studyStats.completedTopics}</p>
            </div>
            <div className="p-3 bg-success/10 rounded-full">
              <Target className="h-6 w-6 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card hover:shadow-academic transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Average Score</p>
              <p className="text-3xl font-bold text-foreground">{studyStats.averageScore}%</p>
            </div>
            <div className="p-3 bg-secondary/10 rounded-full">
              <Award className="h-6 w-6 text-secondary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card hover:shadow-academic transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Study Streak</p>
              <p className="text-3xl font-bold text-foreground">{studyStats.streak} days</p>
            </div>
            <div className="p-3 bg-warning/10 rounded-full">
              <TrendingUp className="h-6 w-6 text-warning" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts and Progress */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Weekly Progress Chart */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">Weekly Progress</h3>
          </div>
          <div className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium text-muted-foreground">
                  {day.day}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{day.hours}h studied</span>
                    <span className="text-muted-foreground">{day.completed} topics</span>
                  </div>
                  <Progress 
                    value={(day.hours / 6) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Topic Progress */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="h-5 w-5 text-secondary" />
            <h3 className="text-xl font-semibold text-foreground">Subject Progress</h3>
          </div>
          <div className="space-y-4">
            {topicProgress.map((topic, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">{topic.topic}</span>
                  <span className="text-sm text-muted-foreground">{topic.progress}%</span>
                </div>
                <Progress value={topic.progress} className="h-3" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="h-5 w-5 text-success" />
          <h3 className="text-xl font-semibold text-foreground">Recent Activity</h3>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{activity.activity}</p>
                  <p className="text-sm text-muted-foreground">{activity.date}</p>
                </div>
              </div>
              <div className="text-right">
                {activity.score && (
                  <Badge 
                    variant="secondary" 
                    className={activity.score >= 90 ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}
                  >
                    {activity.score}%
                  </Badge>
                )}
                {activity.duration && (
                  <Badge variant="outline">{activity.duration}</Badge>
                )}
                {activity.files && (
                  <Badge variant="outline">{activity.files} files</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Weekly Goal Progress */}
      <Card className="p-6 bg-gradient-primary">
        <div className="flex items-center justify-between text-primary-foreground">
          <div>
            <h3 className="text-xl font-semibold mb-2">Weekly Goal Progress</h3>
            <p className="opacity-90 mb-4">
              You've completed {studyStats.weeklyGoal}% of your weekly study goal!
            </p>
            <Progress 
              value={studyStats.weeklyGoal} 
              className="mb-2 bg-primary-foreground/20"
            />
            <p className="text-sm opacity-75">
              {studyStats.weeklyGoal}/100% - Keep up the great work!
            </p>
          </div>
          <div className="p-4 bg-primary-foreground/10 rounded-full">
            <Target className="h-8 w-8" />
          </div>
        </div>
      </Card>
    </div>
  );
};