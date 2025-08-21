"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Brain, BookOpen, Target, Video, FileText, Gamepad2, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface OnboardingData {
  level: string
  goal: string
  timePerDay: string
  learningStyle: string[]
  diagnosticAnswers: Record<string, string>
}

const diagnosticQuestions = [
  {
    id: "algebra1",
    concept: "Basic Algebra",
    question: "Solve for x: 2x + 5 = 13",
    options: [
      { value: "x = 4", correct: true },
      { value: "x = 6", correct: false },
      { value: "x = 9", correct: false },
      { value: "x = 3", correct: false },
    ],
  },
  {
    id: "fractions",
    concept: "Fractions",
    question: "What is 3/4 + 1/8?",
    options: [
      { value: "7/8", correct: true },
      { value: "4/12", correct: false },
      { value: "1/2", correct: false },
      { value: "5/6", correct: false },
    ],
  },
  {
    id: "geometry",
    concept: "Geometry",
    question: "What is the area of a rectangle with length 8 and width 5?",
    options: [
      { value: "40", correct: true },
      { value: "26", correct: false },
      { value: "13", correct: false },
      { value: "35", correct: false },
    ],
  },
  {
    id: "percentages",
    concept: "Percentages",
    question: "What is 25% of 80?",
    options: [
      { value: "20", correct: true },
      { value: "25", correct: false },
      { value: "15", correct: false },
      { value: "30", correct: false },
    ],
  },
  {
    id: "equations",
    concept: "Linear Equations",
    question: "Which point lies on the line y = 2x + 1?",
    options: [
      { value: "(2, 5)", correct: true },
      { value: "(1, 4)", correct: false },
      { value: "(3, 6)", correct: false },
      { value: "(0, 2)", correct: false },
    ],
  },
]

export default function StudentOnboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    level: "",
    goal: "",
    timePerDay: "",
    learningStyle: [],
    diagnosticAnswers: {},
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    // In a real app, this would save to backend/state management
    console.log("Onboarding completed:", data)
    router.push("/student/dashboard")
  }

  const handleLearningStyleToggle = (style: string) => {
    setData((prev) => ({
      ...prev,
      learningStyle: prev.learningStyle.includes(style)
        ? prev.learningStyle.filter((s) => s !== style)
        : [...prev.learningStyle, style],
    }))
  }

  const handleDiagnosticAnswer = (questionId: string, answer: string) => {
    setData((prev) => ({
      ...prev,
      diagnosticAnswers: {
        ...prev.diagnosticAnswers,
        [questionId]: answer,
      },
    }))
  }

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return data.level && data.goal && data.timePerDay
      case 2:
        return data.learningStyle.length > 0
      case 3:
        return Object.keys(data.diagnosticAnswers).length === diagnosticQuestions.length
      case 4:
        return true
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-serif font-bold text-foreground">Curio</span>
          </Link>
          <Badge variant="secondary">Student Onboarding</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-serif">
                <Target className="w-5 h-5 text-primary" />
                Tell us about yourself
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-3 block">What's your current level?</Label>
                <RadioGroup
                  value={data.level}
                  onValueChange={(value) => setData((prev) => ({ ...prev, level: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner">Beginner - Just getting started</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate - Some experience</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced">Advanced - Looking to master concepts</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="goal" className="text-base font-medium mb-3 block">
                  What's your learning goal?
                </Label>
                <Textarea
                  id="goal"
                  placeholder="e.g., Improve my algebra skills, prepare for calculus, master geometry..."
                  value={data.goal}
                  onChange={(e) => setData((prev) => ({ ...prev, goal: e.target.value }))}
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <Label className="text-base font-medium mb-3 block">How much time can you dedicate per day?</Label>
                <RadioGroup
                  value={data.timePerDay}
                  onValueChange={(value) => setData((prev) => ({ ...prev, timePerDay: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="15-30" id="time1" />
                    <Label htmlFor="time1">15-30 minutes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="30-60" id="time2" />
                    <Label htmlFor="time2">30-60 minutes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="60+" id="time3" />
                    <Label htmlFor="time3">More than 1 hour</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Learning Style */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-serif">
                <BookOpen className="w-5 h-5 text-primary" />
                How do you prefer to learn?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Select all that apply. We'll personalize your content accordingly.
              </p>
              <div className="grid gap-4">
                {[
                  {
                    id: "video",
                    label: "Video Lessons",
                    icon: Video,
                    description: "Watch explanations and demonstrations",
                  },
                  {
                    id: "text",
                    label: "Reading & Text",
                    icon: FileText,
                    description: "Learn through written content and examples",
                  },
                  {
                    id: "interactive",
                    label: "Interactive Practice",
                    icon: Gamepad2,
                    description: "Hands-on exercises and simulations",
                  },
                ].map((style) => {
                  const Icon = style.icon
                  const isSelected = data.learningStyle.includes(style.id)
                  return (
                    <Card
                      key={style.id}
                      className={`cursor-pointer transition-all ${
                        isSelected ? "ring-2 ring-primary bg-card" : "hover:bg-muted/50"
                      }`}
                      onClick={() => handleLearningStyleToggle(style.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-card-foreground">{style.label}</h3>
                            <p className="text-sm text-muted-foreground">{style.description}</p>
                          </div>
                          {isSelected && <CheckCircle className="w-5 h-5 text-primary" />}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Diagnostic Quiz */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-serif">
                <Brain className="w-5 h-5 text-primary" />
                Quick Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Answer these questions to help us understand your current knowledge level. Don't worry if you don't know
                some answers!
              </p>
              <div className="space-y-6">
                {diagnosticQuestions.map((question, index) => (
                  <div key={question.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline">{question.concept}</Badge>
                      <span className="text-sm text-muted-foreground">Question {index + 1}</span>
                    </div>
                    <h3 className="font-medium text-foreground mb-4">{question.question}</h3>
                    <RadioGroup
                      value={data.diagnosticAnswers[question.id] || ""}
                      onValueChange={(value) => handleDiagnosticAnswer(question.id, value)}
                    >
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`${question.id}-${optionIndex}`} />
                          <Label htmlFor={`${question.id}-${optionIndex}`}>{option.value}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Completion */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-serif text-center">
                <CheckCircle className="w-6 h-6 text-primary mx-auto" />
                You're all set!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Welcome to your personalized learning journey!
                </h3>
                <p className="text-muted-foreground">
                  Based on your responses, we've created a customized learning path just for you. Your dashboard is
                  ready with personalized recommendations.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-left">
                <h4 className="font-semibold text-card-foreground mb-2">Your Profile Summary:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Level: {data.level}</li>
                  <li>• Daily commitment: {data.timePerDay} minutes</li>
                  <li>• Preferred styles: {data.learningStyle.join(", ")}</li>
                  <li>• Assessment completed: {Object.keys(data.diagnosticAnswers).length}/5 questions</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={handleNext} disabled={!isStepComplete()} className="flex items-center gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleComplete} className="flex items-center gap-2">
              Start Learning
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
