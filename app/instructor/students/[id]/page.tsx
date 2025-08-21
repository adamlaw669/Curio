"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, User, TrendingUp, AlertTriangle, Target, ArrowLeft, BookOpen, Clock } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
import {
  getStudentById,
  getStudentProfile,
  getStudentAssessments,
  getStudentEngagement,
  mockConcepts,
  getConceptMastery,
} from "@/lib/mock-data"

export default function StudentDetail({ params }: { params: { id: string } }) {
  const student = getStudentById(params.id)
  const profile = getStudentProfile(params.id)
  const assessments = getStudentAssessments(params.id)
  const engagement = getStudentEngagement(params.id)

  if (!student) {
    return <div>Student not found</div>
  }

  // Generate performance timeline data
  const timelineData = assessments.slice(-7).map((assessment, index) => ({
    assessment: `Quiz ${index + 1}`,
    score: assessment.score,
    date: new Date(assessment.date).toLocaleDateString(),
  }))

  // Generate concept breakdown data
  const conceptData = mockConcepts.slice(0, 6).map((concept) => ({
    concept: concept.name,
    mastery: getConceptMastery(params.id, concept.id),
  }))

  // Calculate weak areas
  const weakAreas = conceptData.filter((c) => c.mastery < 60 && c.mastery > 0).slice(0, 3)
  const strongAreas = conceptData.filter((c) => c.mastery >= 80).slice(0, 3)

  const averageScore =
    assessments.length > 0 ? Math.round(assessments.reduce((sum, a) => sum + a.score, 0) / assessments.length) : 0

  const totalEngagement = engagement.reduce((sum, e) => sum + e.minutes, 0)

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
          <Button variant="outline" size="sm" asChild>
            <Link href="/instructor/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Student Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground">{student.name}</h1>
              <p className="text-muted-foreground">{student.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">{profile?.level || "Unknown"} Level</Badge>
                <Badge
                  variant="outline"
                  className={
                    averageScore >= 70
                      ? "bg-green-100 text-green-700 border-green-200"
                      : averageScore >= 50
                        ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                        : "bg-red-100 text-red-700 border-red-200"
                  }
                >
                  {averageScore}% Avg Score
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Assessments</p>
                  <p className="text-2xl font-bold text-foreground">{assessments.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Score</p>
                  <p className="text-2xl font-bold text-foreground">{averageScore}%</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Time Spent</p>
                  <p className="text-2xl font-bold text-foreground">{totalEngagement}m</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Weak Areas</p>
                  <p className="text-2xl font-bold text-red-600">{weakAreas.length}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Performance Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Performance Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="assessment" tick={{ fontSize: 12 }} stroke="#6b7280" />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#6b7280" />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#164e63"
                        strokeWidth={2}
                        dot={{ fill: "#164e63", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Concept Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif">
                  <Target className="w-5 h-5 text-primary" />
                  Concept Mastery Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={conceptData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#6b7280" />
                      <YAxis dataKey="concept" type="category" tick={{ fontSize: 12 }} stroke="#6b7280" width={120} />
                      <Bar dataKey="mastery" fill="#164e63" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Student Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-lg">
                  <User className="w-5 h-5 text-primary" />
                  Student Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Learning Goal</p>
                    <p className="text-sm text-foreground">{profile?.goals || "No goal set"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time Commitment</p>
                    <p className="text-sm text-foreground">
                      {profile?.preferences.timePerDay || "Not specified"} minutes/day
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Learning Styles</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profile?.preferences.style.map((style) => (
                        <Badge key={style} variant="secondary" className="text-xs">
                          {style}
                        </Badge>
                      )) || <span className="text-sm text-muted-foreground">Not specified</span>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weak Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-lg">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weakAreas.map((area) => (
                    <div key={area.concept} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-1">{area.concept}</h4>
                      <p className="text-sm text-red-700 mb-2">{Math.round(area.mastery)}% mastery</p>
                      <Button size="sm" variant="outline" className="bg-transparent text-red-700 border-red-300">
                        Assign Practice
                      </Button>
                    </div>
                  ))}
                  {weakAreas.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No significant weak areas identified
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Strong Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-lg">
                  <Target className="w-5 h-5 text-primary" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {strongAreas.map((area) => (
                    <div
                      key={area.concept}
                      className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <span className="text-sm font-medium text-green-800">{area.concept}</span>
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                        {Math.round(area.mastery)}%
                      </Badge>
                    </div>
                  ))}
                  {strongAreas.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">Building foundational strengths</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recommended Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-lg">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Recommended Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Assign Module
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Send Alert
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Schedule Check-in
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
