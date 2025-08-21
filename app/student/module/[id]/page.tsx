"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Brain,
  BookOpen,
  Clock,
  Video,
  FileText,
  Gamepad2,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  Target,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock module data
const moduleData: Record<string, any> = {
  "geometry-basics": {
    id: "geometry-basics",
    title: "Geometry Fundamentals",
    type: "text",
    difficulty: "Beginner",
    estimatedTime: 12,
    concepts: ["Geometry", "Shapes", "Area"],
    description: "Learn the basic principles of geometry including shapes, angles, and area calculations.",
    content: {
      type: "text",
      sections: [
        {
          title: "What is Geometry?",
          content:
            "Geometry is the branch of mathematics that deals with shapes, sizes, positions, angles, and dimensions of objects. It's all around us - from the rectangular screen you're reading this on to the circular wheels on cars.",
        },
        {
          title: "Basic Shapes",
          content:
            "Let's start with the most fundamental shapes:\n\n• **Rectangle**: A four-sided shape with opposite sides equal and all angles 90°\n• **Circle**: A round shape where every point is the same distance from the center\n• **Triangle**: A three-sided shape with three angles that always add up to 180°\n• **Square**: A special rectangle where all sides are equal",
        },
        {
          title: "Calculating Area",
          content:
            "Area tells us how much space a shape covers:\n\n• **Rectangle Area**: length × width\n• **Circle Area**: π × radius²\n• **Triangle Area**: (base × height) ÷ 2\n• **Square Area**: side × side",
        },
      ],
    },
    quiz: [
      {
        question: "What is the area of a rectangle with length 8 and width 5?",
        options: ["40", "26", "13", "35"],
        correct: 0,
        explanation: "Area of rectangle = length × width = 8 × 5 = 40 square units",
      },
      {
        question: "In a triangle, the three angles always add up to:",
        options: ["90°", "180°", "270°", "360°"],
        correct: 1,
        explanation: "The sum of angles in any triangle is always 180°. This is a fundamental property of triangles.",
      },
      {
        question: "Which shape has all sides equal and all angles 90°?",
        options: ["Rectangle", "Circle", "Square", "Triangle"],
        correct: 2,
        explanation: "A square is a special type of rectangle where all four sides are equal and all angles are 90°.",
      },
    ],
  },
  "fraction-practice": {
    id: "fraction-practice",
    title: "Fraction Operations Practice",
    type: "interactive",
    difficulty: "Beginner",
    estimatedTime: 8,
    concepts: ["Fractions", "Addition", "Subtraction"],
    description: "Master fraction operations through interactive practice problems.",
    content: {
      type: "interactive",
      sections: [
        {
          title: "Understanding Fractions",
          content:
            "A fraction represents a part of a whole. The top number (numerator) tells us how many parts we have, and the bottom number (denominator) tells us how many parts make up the whole.",
        },
        {
          title: "Adding Fractions",
          content:
            "To add fractions with the same denominator, simply add the numerators:\n\n3/8 + 2/8 = 5/8\n\nFor different denominators, find a common denominator first:\n\n1/4 + 1/6 = 3/12 + 2/12 = 5/12",
        },
      ],
    },
    quiz: [
      {
        question: "What is 1/4 + 1/4?",
        options: ["1/8", "2/8", "2/4", "1/2"],
        correct: 2,
        explanation: "1/4 + 1/4 = 2/4, which can be simplified to 1/2",
      },
      {
        question: "What is 3/8 + 1/8?",
        options: ["4/16", "4/8", "3/16", "1/2"],
        correct: 1,
        explanation: "When denominators are the same, add the numerators: 3/8 + 1/8 = 4/8 = 1/2",
      },
      {
        question: "In the fraction 3/7, what is the numerator?",
        options: ["7", "3", "10", "4"],
        correct: 1,
        explanation: "The numerator is the top number in a fraction. In 3/7, the numerator is 3.",
      },
    ],
  },
  "algebra-review": {
    id: "algebra-review",
    title: "Algebra Fundamentals Review",
    type: "video",
    difficulty: "Intermediate",
    estimatedTime: 10,
    concepts: ["Algebra", "Equations", "Variables"],
    description: "Review key algebraic concepts including solving equations and working with variables.",
    content: {
      type: "video",
      videoUrl: "https://www.youtube.com/embed/NybHckSEQBI", // Sample math video
      sections: [
        {
          title: "Key Concepts Covered",
          content:
            "This video covers:\n\n• What are variables and how to use them\n• Solving simple equations\n• The balance method for equation solving\n• Checking your answers",
        },
        {
          title: "Practice Tips",
          content:
            "After watching the video:\n\n• Try solving equations step by step\n• Always check your answer by substituting back\n• Remember: what you do to one side, do to the other\n• Start with simple equations and build complexity",
        },
      ],
    },
    quiz: [
      {
        question: "Solve for x: 2x + 3 = 11",
        options: ["x = 4", "x = 7", "x = 5", "x = 3"],
        correct: 0,
        explanation: "2x + 3 = 11\n2x = 11 - 3\n2x = 8\nx = 4",
      },
      {
        question: "What is a variable in algebra?",
        options: [
          "A number that never changes",
          "A letter that represents an unknown number",
          "Always equal to zero",
          "The answer to an equation",
        ],
        correct: 1,
        explanation:
          "A variable is a letter (like x or y) that represents an unknown number that we're trying to find.",
      },
      {
        question: "If x = 5, what is 3x - 2?",
        options: ["13", "17", "15", "11"],
        correct: 0,
        explanation: "Substitute x = 5: 3(5) - 2 = 15 - 2 = 13",
      },
    ],
  },
}

export default function ModulePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizResults, setQuizResults] = useState<Record<number, boolean>>({})

  const module = moduleData[params.id]

  useEffect(() => {
    if (!module) {
      router.push("/student/dashboard")
    }
  }, [module, router])

  if (!module) {
    return <div>Loading...</div>
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video
      case "text":
        return FileText
      case "interactive":
        return Gamepad2
      default:
        return BookOpen
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "text":
        return "bg-green-100 text-green-700 border-green-200"
      case "interactive":
        return "bg-purple-100 text-purple-700 border-purple-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const handleNextSection = () => {
    if (currentSection < module.content.sections.length - 1) {
      setCurrentSection(currentSection + 1)
    } else {
      setShowQuiz(true)
    }
  }

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }))
  }

  const handleQuizSubmit = () => {
    const results: Record<number, boolean> = {}
    module.quiz.forEach((question: any, index: number) => {
      results[index] = quizAnswers[index] === question.correct
    })
    setQuizResults(results)
    setQuizSubmitted(true)
  }

  const correctAnswers = Object.values(quizResults).filter(Boolean).length
  const totalQuestions = module.quiz.length
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100)

  const progress = showQuiz ? (quizSubmitted ? 100 : 90) : ((currentSection + 1) / module.content.sections.length) * 80

  const TypeIcon = getTypeIcon(module.type)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/student/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-serif font-bold text-foreground">Curio</span>
          </Link>
          <Button variant="outline" size="sm" asChild>
            <Link href="/student/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Module Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className={getTypeColor(module.type)}>
              <TypeIcon className="w-3 h-3 mr-1" />
              {module.type}
            </Badge>
            <Badge variant="secondary">{module.difficulty}</Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {module.estimatedTime} min
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">{module.title}</h1>
          <p className="text-muted-foreground mb-4">{module.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {module.concepts.map((concept: string) => (
              <Badge key={concept} variant="outline">
                {concept}
              </Badge>
            ))}
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {!showQuiz ? (
          /* Content Sections */
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="font-serif">{module.content.sections[currentSection].title}</span>
                <span className="text-sm text-muted-foreground">
                  {currentSection + 1} of {module.content.sections.length}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {module.type === "video" && currentSection === 0 && module.content.videoUrl && (
                <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-6">
                  <iframe
                    src={module.content.videoUrl}
                    title={module.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              )}

              <div className="prose prose-sm max-w-none">
                {module.content.sections[currentSection].content.split("\n").map((paragraph: string, index: number) => {
                  if (paragraph.trim() === "") return <br key={index} />

                  // Handle bullet points
                  if (paragraph.startsWith("• ")) {
                    const content = paragraph.substring(2)
                    if (content.includes("**")) {
                      const parts = content.split("**")
                      return (
                        <div key={index} className="flex items-start gap-2 mb-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}</span>
                        </div>
                      )
                    }
                    return (
                      <div key={index} className="flex items-start gap-2 mb-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{content}</span>
                      </div>
                    )
                  }

                  // Handle bold text
                  if (paragraph.includes("**")) {
                    const parts = paragraph.split("**")
                    return (
                      <p key={index} className="mb-4 text-foreground leading-relaxed">
                        {parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
                      </p>
                    )
                  }

                  return (
                    <p key={index} className="mb-4 text-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Quiz Section */
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-serif">
                <Target className="w-5 h-5 text-primary" />
                Knowledge Check
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!quizSubmitted ? (
                <div className="space-y-6">
                  <p className="text-muted-foreground">
                    Test your understanding with these questions. Take your time and think through each answer.
                  </p>
                  {module.quiz.map((question: any, questionIndex: number) => (
                    <div key={questionIndex} className="border border-border rounded-lg p-4">
                      <h3 className="font-medium text-foreground mb-4">
                        {questionIndex + 1}. {question.question}
                      </h3>
                      <RadioGroup
                        value={quizAnswers[questionIndex]?.toString() || ""}
                        onValueChange={(value) => handleQuizAnswer(questionIndex, Number.parseInt(value))}
                      >
                        {question.options.map((option: string, optionIndex: number) => (
                          <div key={optionIndex} className="flex items-center space-x-2">
                            <RadioGroupItem value={optionIndex.toString()} id={`q${questionIndex}-${optionIndex}`} />
                            <Label htmlFor={`q${questionIndex}-${optionIndex}`}>{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ))}
                  <Button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length < module.quiz.length}
                    className="w-full"
                  >
                    Submit Quiz
                  </Button>
                </div>
              ) : (
                /* Quiz Results */
                <div className="space-y-6">
                  <div className="text-center p-6 bg-muted/50 rounded-lg">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                        scorePercentage >= 70 ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {scorePercentage >= 70 ? <CheckCircle className="w-8 h-8" /> : <TrendingUp className="w-8 h-8" />}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {scorePercentage >= 70 ? "Great job!" : "Good effort!"}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      You scored {correctAnswers} out of {totalQuestions} ({scorePercentage}%)
                    </p>
                    {scorePercentage >= 70 ? (
                      <p className="text-sm text-green-700">
                        You've mastered this concept! Ready for the next challenge.
                      </p>
                    ) : (
                      <p className="text-sm text-yellow-700">
                        Consider reviewing the material and trying similar problems for better understanding.
                      </p>
                    )}
                  </div>

                  {/* Detailed Results */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Detailed Results:</h4>
                    {module.quiz.map((question: any, questionIndex: number) => {
                      const isCorrect = quizResults[questionIndex]
                      const userAnswer = quizAnswers[questionIndex]
                      return (
                        <div key={questionIndex} className="border border-border rounded-lg p-4">
                          <div className="flex items-start gap-3 mb-3">
                            {isCorrect ? (
                              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <h5 className="font-medium text-foreground mb-2">{question.question}</h5>
                              <p className="text-sm text-muted-foreground mb-2">
                                Your answer:{" "}
                                <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                                  {question.options[userAnswer]}
                                </span>
                              </p>
                              {!isCorrect && (
                                <p className="text-sm text-muted-foreground mb-2">
                                  Correct answer:{" "}
                                  <span className="text-green-600">{question.options[question.correct]}</span>
                                </p>
                              )}
                              <p className="text-sm text-muted-foreground">{question.explanation}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex gap-4">
                    <Button asChild className="flex-1">
                      <Link href="/student/dashboard">Back to Dashboard</Link>
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Review Material
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        {!showQuiz && (
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevSection}
              disabled={currentSection === 0}
              className="flex items-center gap-2 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button onClick={handleNextSection} className="flex items-center gap-2">
              {currentSection === module.content.sections.length - 1 ? "Take Quiz" : "Next"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
