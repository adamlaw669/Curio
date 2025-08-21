"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Brain,
  BookOpen,
  Target,
  Video,
  FileText,
  Gamepad2,
  Clock,
  TrendingUp,
  Settings,
  Play,
  CheckCircle,
  Info,
} from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Mock data for different performance states
const mockRecommendations = {
  strong: [
    {
      id: "advanced-calc",
      title: "Advanced Calculus Concepts",
      type: "video",
      duration: 12,
      difficulty: "Advanced",
      concept: "Calculus",
      reason: "You've mastered algebra fundamentals. Ready for the next challenge!",
      progress: 0,
    },
    {
      id: "trig-applications",
      title: "Trigonometry Applications",
      type: "interactive",
      duration: 15,
      difficulty: "Intermediate",
      concept: "Trigonometry",
      reason: "Building on your strong geometry foundation.",
      progress: 0,
    },
    {
      id: "statistics-intro",
      title: "Introduction to Statistics",
      type: "text",
      duration: 8,
      difficulty: "Beginner",
      concept: "Statistics",
      reason: "Expanding your mathematical toolkit with data analysis.",
      progress: 0,
    },
    {
      id: "linear-systems",
      title: "Systems of Linear Equations",
      type: "interactive",
      duration: 10,
      difficulty: "Intermediate",
      concept: "Linear Algebra",
      reason: "Perfect follow-up to your equation-solving skills.",
      progress: 0,
    },
  ],
  mixed: [
    {
      id: "algebra-review",
      title: "Algebra Fundamentals Review",
      type: "video",
      duration: 10,
      difficulty: "Intermediate",
      concept: "Algebra",
      reason: "Strengthening areas where you showed some uncertainty.",
      progress: 30,
    },
    {
      id: "fraction-practice",
      title: "Fraction Operations Practice",
      type: "interactive",
      duration: 8,
      difficulty: "Beginner",
      concept: "Fractions",
      reason: "Selected due to mixed performance in recent fraction problems.",
      progress: 0,
    },
    {
      id: "geometry-basics",
      title: "Geometry Fundamentals",
      type: "text",
      duration: 12,
      difficulty: "Beginner",
      concept: "Geometry",
      reason: "Building a solid foundation before moving to advanced topics.",
      progress: 60,
    },
    {
      id: "word-problems",
      title: "Solving Word Problems",
      type: "interactive",
      duration: 15,
      difficulty: "Intermediate",
      concept: "Problem Solving",
      reason: "Applying math concepts to real-world scenarios.",
      progress: 0,
    },
  ],
  weak: [
    {
      id: "basic-arithmetic",
      title: "Basic Arithmetic Review",
      type: "interactive",
      duration: 6,
      difficulty: "Beginner",
      concept: "Arithmetic",
      reason: "Let's reinforce these fundamental skills first.",
      progress: 0,
    },
    {
      id: "fraction-basics",
      title: "Understanding Fractions",
      type: "video",
      duration: 8,
      difficulty: "Beginner",
      concept: "Fractions",
      reason: "Selected due to low accuracy in recent quiz on fractions.",
      progress: 0,
    },
    {
      id: "number-sense",
      title: "Building Number Sense",
      type: "interactive",
      duration: 10,
      difficulty: "Beginner",
      concept: "Number Sense",
      reason: "Strengthening your mathematical foundation.",
      progress: 45,
    },
    {
      id: "simple-equations",
      title: "Simple Equation Solving",
      type: "text",
      duration: 7,
      difficulty: "Beginner",
      concept: "Basic Algebra",
      reason: "Step-by-step approach to equation solving.",
      progress: 0,
    },
  ],
}

const weeklyProgressData = [
  { day: "Mon", minutes: 25 },
  { day: "Tue", minutes: 30 },
  { day: "Wed", minutes: 15 },
  { day: "Thu", minutes: 40 },
  { day: "Fri", minutes: 35 },
  { day: "Sat", minutes: 20 },
  { day: "Sun", minutes: 28 },
]

const masteryData = [
  { name: "Mastered", value: 65, color: "#22c55e" },
  { name: "In Progress", value: 25, color: "#f59e0b" },
  { name: "Not Started", value: 10, color: "#e5e7eb" },
]

export default function StudentDashboard() {
  const [performanceState, setPerformanceState] = useState<"strong" | "mixed" | "weak">("mixed")
  const recommendations = mockRecommendations[performanceState]

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

  const totalMinutesThisWeek = weeklyProgressData.reduce((sum, day) => sum + day.minutes, 0)
  const averageMinutesPerDay = Math.round(totalMinutesThisWeek / 7)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-serif font-bold text-foreground">Curio</span>
          </Link>
          <div className="flex items-center gap-4">
            {/* Demo State Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Demo Mode:</span>
              <Select value={performanceState} onValueChange={(value: any) => setPerformanceState(value)}>
                <SelectTrigger className="w-24 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strong">Strong</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                  <SelectItem value="weak">Weak</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/student/profile">
                <Settings className="w-4 h-4 mr-2" />
                Profile
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Welcome back, Alex!</h1>
          <p className="text-muted-foreground">
            Ready to continue your learning journey? Here's what we recommend for you today.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif">
                  <Target className="w-5 h-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Button className="h-auto p-4 flex flex-col items-center gap-2" asChild>
                    <Link href="/student/module/geometry-basics">
                      <Play className="w-5 h-5" />
                      <span className="text-sm">Continue Last Module</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">Take Check-in Quiz</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
                    asChild
                  >
                    <Link href="/student/profile">
                      <Settings className="w-5 h-5" />
                      <span className="text-sm">Adjust Preferences</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Learning Path */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Your Learning Path
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {recommendations.map((rec) => {
                    const TypeIcon = getTypeIcon(rec.type)
                    return (
                      <Card key={rec.id} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className={getTypeColor(rec.type)}>
                                  <TypeIcon className="w-3 h-3 mr-1" />
                                  {rec.type}
                                </Badge>
                                <Badge variant="secondary">{rec.difficulty}</Badge>
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {rec.duration} min
                                </span>
                              </div>
                              <h3 className="font-semibold text-card-foreground mb-1">{rec.title}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{rec.concept}</p>
                              {rec.progress > 0 && (
                                <div className="mb-2">
                                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                    <span>Progress</span>
                                    <span>{rec.progress}%</span>
                                  </div>
                                  <Progress value={rec.progress} className="h-1" />
                                </div>
                              )}
                            </div>
                            <Button size="sm" asChild>
                              <Link href={`/student/module/${rec.id}`}>{rec.progress > 0 ? "Continue" : "Start"}</Link>
                            </Button>
                          </div>
                          <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                            <Info className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-foreground mb-1">Why this recommendation?</p>
                              <p className="text-xs text-muted-foreground">{rec.reason}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={masteryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={60}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {masteryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-foreground">65%</div>
                          <div className="text-xs text-muted-foreground">Mastery</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {masteryData.map((item) => (
                        <div key={item.name} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-muted-foreground">{item.name}</span>
                          </div>
                          <span className="font-medium text-foreground">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-lg">
                  <Clock className="w-5 h-5 text-primary" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-foreground">{totalMinutesThisWeek}</div>
                      <div className="text-xs text-muted-foreground">Total Minutes</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">{averageMinutesPerDay}</div>
                      <div className="text-xs text-muted-foreground">Daily Average</div>
                    </div>
                  </div>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklyProgressData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#6b7280" />
                        <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                        <Line
                          type="monotone"
                          dataKey="minutes"
                          stroke="#164e63"
                          strokeWidth={2}
                          dot={{ fill: "#164e63", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-lg">
                  <Target className="w-5 h-5 text-primary" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Fraction Master</p>
                      <p className="text-xs text-muted-foreground">Completed 10 fraction problems</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Week Streak</p>
                      <p className="text-xs text-muted-foreground">7 days of consistent learning</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
