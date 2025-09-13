import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Play, 
  RotateCcw,
  Target,
  Brain,
  Trophy
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

interface Assessment {
  id: string;
  title: string;
  topic: string;
  questions: Question[];
  timeLimit: number;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "available" | "in-progress" | "completed";
  score?: number;
}

export const AssessmentGenerator = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const { toast } = useToast();

  const sampleQuestions: Question[] = [
    {
      id: 1,
      question: "What is the derivative of f(x) = x³ + 2x² - 5x + 1?",
      options: ["3x² + 4x - 5", "x² + 4x - 5", "3x² + 2x - 5", "3x³ + 4x² - 5x"],
      correctAnswer: 0,
      explanation: "Using the power rule: d/dx[x^n] = nx^(n-1), we get 3x² + 4x - 5",
      topic: "Calculus",
      difficulty: "Medium"
    },
    {
      id: 2,
      question: "Which of the following matrices is invertible?",
      options: [
        "[[1, 2], [2, 4]]",
        "[[1, 0], [0, 1]]", 
        "[[0, 0], [1, 1]]",
        "[[1, 1], [1, 1]]"
      ],
      correctAnswer: 1,
      explanation: "A matrix is invertible if its determinant is non-zero. The identity matrix has determinant 1.",
      topic: "Linear Algebra",
      difficulty: "Easy"
    },
    {
      id: 3,
      question: "What is the limit of (sin x)/x as x approaches 0?",
      options: ["0", "1", "∞", "Does not exist"],
      correctAnswer: 1,
      explanation: "This is a fundamental limit in calculus. The limit of (sin x)/x as x→0 equals 1.",
      topic: "Calculus",
      difficulty: "Hard"
    }
  ];

  const assessments: Assessment[] = [
    {
      id: "calc-basics",
      title: "Calculus Fundamentals",
      topic: "Calculus",
      questions: sampleQuestions.filter(q => q.topic === "Calculus"),
      timeLimit: 30,
      difficulty: "Medium",
      status: "available"
    },
    {
      id: "linear-algebra",
      title: "Linear Algebra Quiz",
      topic: "Linear Algebra", 
      questions: sampleQuestions.filter(q => q.topic === "Linear Algebra"),
      timeLimit: 20,
      difficulty: "Easy",
      status: "available"
    },
    {
      id: "comprehensive",
      title: "Comprehensive Math Review",
      topic: "Mathematics",
      questions: sampleQuestions,
      timeLimit: 45,
      difficulty: "Hard",
      status: "completed",
      score: 87
    }
  ];

  const startAssessment = (assessmentId: string) => {
    setSelectedAssessment(assessmentId);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setSelectedAnswer("");
    
    toast({
      title: "Assessment Started",
      description: "Good luck! Take your time and read each question carefully."
    });
  };

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const nextQuestion = () => {
    const answerIndex = parseInt(selectedAnswer);
    setAnswers(prev => [...prev, answerIndex]);
    
    const assessment = assessments.find(a => a.id === selectedAssessment);
    if (assessment && currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer("");
    } else {
      completeAssessment();
    }
  };

  const completeAssessment = () => {
    setShowResults(true);
    const finalAnswers = [...answers, parseInt(selectedAnswer)];
    const assessment = assessments.find(a => a.id === selectedAssessment);
    
    if (assessment) {
      const correct = finalAnswers.reduce((count, answer, index) => {
        return answer === assessment.questions[index].correctAnswer ? count + 1 : count;
      }, 0);
      
      const score = Math.round((correct / assessment.questions.length) * 100);
      
      toast({
        title: "Assessment Completed!",
        description: `You scored ${score}% (${correct}/${assessment.questions.length})`
      });
    }
  };

  const resetAssessment = () => {
    setSelectedAssessment(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setSelectedAnswer("");
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success/10 text-success";
      case "Medium": return "bg-warning/10 text-warning";
      case "Hard": return "bg-destructive/10 text-destructive";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  if (selectedAssessment && !showResults) {
    const assessment = assessments.find(a => a.id === selectedAssessment);
    if (!assessment) return null;

    const question = assessment.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;

    return (
      <div className="space-y-6">
        {/* Assessment Header */}
        <Card className="p-6 bg-gradient-primary">
          <div className="flex items-center justify-between text-primary-foreground">
            <div>
              <h2 className="text-2xl font-bold mb-2">{assessment.title}</h2>
              <div className="flex items-center gap-4 text-sm opacity-90">
                <span>Question {currentQuestion + 1} of {assessment.questions.length}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {assessment.timeLimit} min limit
                </span>
              </div>
            </div>
            <Button variant="outline" onClick={resetAssessment} className="text-primary-foreground border-primary-foreground/30">
              Exit Assessment
            </Button>
          </div>
          <Progress value={progress} className="mt-4 bg-primary-foreground/20" />
        </Card>

        {/* Question Card */}
        <Card className="p-8">
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline">{question.topic}</Badge>
                  <Badge className={getDifficultyColor(question.difficulty)}>
                    {question.difficulty}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  {question.question}
                </h3>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Brain className="h-6 w-6 text-primary" />
              </div>
            </div>

            <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className="flex-1 cursor-pointer font-medium text-foreground"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <div className="flex justify-between items-center pt-6 border-t border-border">
              <div className="text-sm text-muted-foreground">
                Select an answer to continue
              </div>
              <Button 
                onClick={nextQuestion} 
                disabled={!selectedAnswer}
                className="bg-primary hover:bg-primary-dark"
              >
                {currentQuestion === assessment.questions.length - 1 ? "Complete Assessment" : "Next Question"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (showResults) {
    const assessment = assessments.find(a => a.id === selectedAssessment);
    if (!assessment) return null;

    const finalAnswers = [...answers];
    const correct = finalAnswers.reduce((count, answer, index) => {
      return answer === assessment.questions[index].correctAnswer ? count + 1 : count;
    }, 0);
    
    const score = Math.round((correct / assessment.questions.length) * 100);

    return (
      <div className="space-y-6">
        {/* Results Header */}
        <Card className="p-8 bg-gradient-secondary">
          <div className="text-center text-secondary-foreground">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-secondary-foreground/10 rounded-full">
                <Trophy className="h-8 w-8" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2">Assessment Complete!</h2>
            <p className="text-xl opacity-90 mb-4">
              You scored {score}% ({correct}/{assessment.questions.length})
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={resetAssessment}
                className="text-secondary-foreground border-secondary-foreground/30"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Take Again
              </Button>
              <Button 
                onClick={resetAssessment}
                className="bg-secondary-foreground text-secondary"
              >
                Back to Assessments
              </Button>
            </div>
          </div>
        </Card>

        {/* Detailed Results */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">Question Review</h3>
          <div className="space-y-6">
            {assessment.questions.map((question, index) => {
              const userAnswer = finalAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={index} className="border rounded-lg p-6 bg-gradient-card">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${isCorrect ? 'bg-success/10' : 'bg-destructive/10'}`}>
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-destructive" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-2">
                        Question {index + 1}: {question.question}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Your answer:</span>
                          <span className={isCorrect ? 'text-success' : 'text-destructive'}>
                            {question.options[userAnswer]}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Correct answer:</span>
                            <span className="text-success">
                              {question.options[question.correctAnswer]}
                            </span>
                          </div>
                        )}
                        <p className="text-muted-foreground italic">
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="p-6 bg-gradient-primary">
        <div className="flex items-center gap-3 text-primary-foreground">
          <div className="p-3 bg-primary-foreground/10 rounded-full">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">AI Assessment Generator</h2>
            <p className="opacity-90">
              Take personalized assessments generated from your study materials
            </p>
          </div>
        </div>
      </Card>

      {/* Available Assessments */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground">Available Assessments</h3>
        
        <div className="grid gap-6">
          {assessments.map((assessment) => (
            <Card key={assessment.id} className="p-6 hover:shadow-academic transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-lg font-semibold text-foreground">
                      {assessment.title}
                    </h4>
                    <Badge className={getDifficultyColor(assessment.difficulty)}>
                      {assessment.difficulty}
                    </Badge>
                    {assessment.status === "completed" && (
                      <Badge variant="outline" className="bg-success/10 text-success">
                        Completed - {assessment.score}%
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      {assessment.topic}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {assessment.questions.length} questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {assessment.timeLimit} minutes
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground">
                    Test your knowledge on key concepts and identify areas for improvement
                  </p>
                </div>
                
                <Button 
                  onClick={() => startAssessment(assessment.id)}
                  className="bg-primary hover:bg-primary-dark ml-6"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {assessment.status === "completed" ? "Retake" : "Start"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Assessment Features */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Assessment Features</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="p-3 bg-primary/10 rounded-full w-12 h-12 mx-auto mb-3">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h4 className="font-medium text-foreground mb-2">AI-Generated Questions</h4>
            <p className="text-sm text-muted-foreground">
              Questions automatically created from your uploaded study materials
            </p>
          </div>
          
          <div className="text-center">
            <div className="p-3 bg-secondary/10 rounded-full w-12 h-12 mx-auto mb-3">
              <Target className="h-6 w-6 text-secondary" />
            </div>
            <h4 className="font-medium text-foreground mb-2">Adaptive Difficulty</h4>
            <p className="text-sm text-muted-foreground">
              Questions adjust to your performance and learning level
            </p>
          </div>
          
          <div className="text-center">
            <div className="p-3 bg-success/10 rounded-full w-12 h-12 mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <h4 className="font-medium text-foreground mb-2">Detailed Feedback</h4>
            <p className="text-sm text-muted-foreground">
              Get explanations and learn from your mistakes
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};