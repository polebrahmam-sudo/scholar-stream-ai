import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileUpload } from "@/components/FileUpload";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { StudyRecommendations } from "@/components/StudyRecommendations";
import { AssessmentGenerator } from "@/components/AssessmentGenerator";
import { Upload, Brain, BarChart3, FileText, Target, Zap } from "lucide-react";
import heroImage from "@/assets/hero-study-bg.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("upload");

  const features = [
    {
      icon: Upload,
      title: "Smart Document Processing",
      description: "Upload PDFs, documents, and notes for AI-powered analysis and content extraction",
      color: "bg-primary"
    },
    {
      icon: Brain,
      title: "AI Assessment Generation",
      description: "Automatically generate quizzes and tests based on your study materials",
      color: "bg-secondary"
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description: "Track your learning progress with detailed analytics and insights",
      color: "bg-success"
    },
    {
      icon: Target,
      title: "Personalized Recommendations",
      description: "Get AI-driven study recommendations tailored to your learning patterns",
      color: "bg-warning"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-hero opacity-90"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay"
          }}
        />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <Badge className="mb-6 bg-primary/20 text-primary-foreground border-primary/30">
            AI-Powered Learning Platform
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Master Your Studies with
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Intelligent Analytics
            </span>
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your learning experience with AI-driven document processing, 
            automated assessments, and personalized study recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-dark text-primary-foreground shadow-academic px-8 py-4 text-lg"
              onClick={() => setActiveTab("upload")}
            >
              <Upload className="mr-2 h-5 w-5" />
              Start Learning
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-4 text-lg"
              onClick={() => setActiveTab("analytics")}
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              View Analytics
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Intelligent Study Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform provides everything you need for effective learning
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-academic transition-all duration-300 bg-gradient-card border-0">
                <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-card-shadow`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Platform Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Your Learning Dashboard
            </h2>
            <p className="text-xl text-muted-foreground">
              Access all your study tools in one place
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: "upload", label: "Upload Documents", icon: Upload },
              { id: "analytics", label: "Analytics", icon: BarChart3 },
              { id: "assessments", label: "Assessments", icon: FileText },
              { id: "recommendations", label: "Recommendations", icon: Zap }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-6 py-3"
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-6xl mx-auto">
            {activeTab === "upload" && <FileUpload />}
            {activeTab === "analytics" && <AnalyticsDashboard />}
            {activeTab === "assessments" && <AssessmentGenerator />}
            {activeTab === "recommendations" && <StudyRecommendations />}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-gradient-secondary">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center text-secondary-foreground">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-lg opacity-90">Documents Processed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-lg opacity-90">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-lg opacity-90">AI Assistant</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;