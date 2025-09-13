import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Lightbulb, 
  BookOpen, 
  Clock, 
  Target, 
  Zap, 
  TrendingUp,
  Star,
  ChevronRight
} from "lucide-react";

export const StudyRecommendations = () => {
  const recommendations = [
    {
      id: 1,
      type: "Focus Area",
      title: "Review Calculus Derivatives",
      description: "Your recent quiz scores indicate you need more practice with derivative rules",
      priority: "High",
      estimatedTime: "45 min",
      confidence: 92,
      icon: Target,
      color: "bg-destructive",
      resources: ["Khan Academy - Derivatives", "Practice Problems Set A", "Video Tutorial #12"]
    },
    {
      id: 2,
      type: "Practice",
      title: "Linear Algebra Problem Sets",
      description: "You're performing well here. Continue with advanced problems to maintain momentum",
      priority: "Medium",
      estimatedTime: "30 min",
      confidence: 85,
      icon: TrendingUp,
      color: "bg-success",
      resources: ["Advanced Problem Set", "Interactive Exercises", "Peer Study Group"]
    },
    {
      id: 3,
      type: "New Topic",
      title: "Introduction to Statistics",
      description: "Based on your math progress, you're ready to start exploring statistics",
      priority: "Low",
      estimatedTime: "60 min",
      confidence: 78,
      icon: Lightbulb,
      color: "bg-primary",
      resources: ["Statistics Basics", "Data Analysis Tutorial", "Practice Dataset"]
    },
    {
      id: 4,
      type: "Review",
      title: "Physics Momentum Concepts",
      description: "Quick review recommended before tomorrow's scheduled assessment",
      priority: "High",
      estimatedTime: "25 min",
      confidence: 88,
      icon: Clock,
      color: "bg-warning",
      resources: ["Summary Notes", "Formula Sheet", "Quick Quiz"]
    }
  ];

  const studyTips = [
    {
      tip: "Take a 10-minute break between study sessions",
      category: "Productivity"
    },
    {
      tip: "Review material within 24 hours for better retention",
      category: "Memory"
    },
    {
      tip: "Use active recall instead of passive reading",
      category: "Learning"
    },
    {
      tip: "Create visual mind maps for complex topics",
      category: "Organization"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-destructive/10 text-destructive border-destructive/20";
      case "Medium": return "bg-warning/10 text-warning border-warning/20";
      case "Low": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <div className="space-y-8">
      {/* AI Insights Header */}
      <Card className="p-6 bg-gradient-primary">
        <div className="flex items-center gap-3 text-primary-foreground">
          <div className="p-3 bg-primary-foreground/10 rounded-full">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">AI Study Recommendations</h2>
            <p className="opacity-90">
              Personalized suggestions based on your learning patterns and performance analytics
            </p>
          </div>
        </div>
      </Card>

      {/* Recommendations Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">Recommended Actions</h3>
          <Badge variant="outline" className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            4 recommendations
          </Badge>
        </div>

        <div className="grid gap-6">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="p-6 hover:shadow-academic transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 ${rec.color}/10 rounded-full`}>
                    <rec.icon className={`h-5 w-5 text-${rec.color.replace('bg-', '')}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {rec.type}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={getPriorityColor(rec.priority)}
                      >
                        {rec.priority} Priority
                      </Badge>
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {rec.title}
                    </h4>
                    <p className="text-muted-foreground mb-4">
                      {rec.description}
                    </p>
                  </div>
                </div>
                
                <div className="text-right space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {rec.estimatedTime}
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Confidence</div>
                    <Progress value={rec.confidence} className="w-20 h-2" />
                    <div className="text-xs text-right">{rec.confidence}%</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-medium text-foreground mb-2">Recommended Resources:</h5>
                  <div className="flex flex-wrap gap-2">
                    {rec.resources.map((resource, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {resource}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Materials
                  </Button>
                  <Button size="sm" className="bg-primary hover:bg-primary-dark">
                    Start Studying
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Study Tips */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb className="h-5 w-5 text-secondary" />
          <h3 className="text-xl font-semibold text-foreground">AI Study Tips</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {studyTips.map((tip, index) => (
            <div key={index} className="p-4 bg-muted/20 rounded-lg border border-border/50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-secondary/10 rounded-full mt-1">
                  <Lightbulb className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <Badge variant="outline" className="text-xs mb-2">
                    {tip.category}
                  </Badge>
                  <p className="text-sm text-foreground font-medium">
                    {tip.tip}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance Forecast */}
      <Card className="p-6 bg-gradient-secondary">
        <div className="text-secondary-foreground">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-6 w-6" />
            <h3 className="text-xl font-semibold">Performance Forecast</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">94%</div>
              <div className="text-sm opacity-90">Predicted next test score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">7 days</div>
              <div className="text-sm opacity-90">Time to master weak areas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">85%</div>
              <div className="text-sm opacity-90">Goal completion likelihood</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};