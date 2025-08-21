"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, Users, AlertTriangle, TrendingUp, Target, ArrowLeft, Filter } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { getCohortById, getCohortStudents, mockConcepts, getConceptMastery, getAtRiskStudents } from "@/lib/mock-data"

export default function CohortView({ params }: { params: { id: string } }) {
  const [selectedTopic, setSelectedTopic] = useState("all")
  const cohort = getCohortById(params.id)
  const students = getCohortStudents(params.id)
  const atRiskStudents = getAtRiskStudents(params.id)

  if (!cohort) {
    return <div>Cohort not found</div>
  }

  const topics = ["all", ...Array.from(new Set(mockConcepts.map((c) => c.topic)))]
  const filteredConcepts =
    selectedTopic === "all" ? mockConcepts : mockConcepts.filter((c) => c.topic === selectedTopic)

  const getMasteryColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    if (score >= 40) return "bg-orange-500"
    if (score > 0) return "bg-red-500"
    return "bg-gray-300"
  }

  const getMasteryLabel = (score: number) => {
    if (score >= 80) return "Mastered"
    if (score >= 60) return "Proficient"
    if (score >= 40) return "Developing"
    if (score > 0) return "Struggling"
    return "Not Started"
  }

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
        {/* Cohort Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">Cohort Analytics</Badge>
            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
              Active
            </Badge>
          </div>
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">{cohort.name}</h1>
          <p className="text-muted-foreground">{cohort.description}</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold text-foreground">{students.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">At-Risk Learners</p>
                  <p className="text-2xl font-bold text-red-600">{atRiskStudents.length}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Mastery</p>
                  <p className="text-2xl font-bold text-foreground">68%</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Weekly Growth</p>
                  <p className="text-2xl font-bold text-foreground">+12%</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Concept Mastery Heatmap */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 font-serif">
                    <Target className="w-5 h-5 text-primary" />
                    Concept Mastery Heatmap
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {topics.map((topic) => (
                          <SelectItem key={topic} value={topic}>
                            {topic === "all" ? "All Topics" : topic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <div className="min-w-[800px]">
                    {/* Header Row */}
                    <div className="grid grid-cols-[200px_repeat(auto-fit,minmax(120px,1fr))] gap-1 mb-2">
                      <div className="p-2 font-medium text-sm text-muted-foreground">Student</div>
                      {filteredConcepts.map((concept) => (
                        <div key={concept.id} className="p-2 text-xs text-center text-muted-foreground">
                          {concept.name}
                        </div>
                      ))}
                    </div>

                    {/* Student Rows */}
                    {students.map((student) => (
                      <div
                        key={student?.id}
                        className="grid grid-cols-[200px_repeat(auto-fit,minmax(120px,1fr))] gap-1 mb-1"
                      >
                        <div className="p-2 text-sm font-medium text-foreground">
                          <Link
                            href={`/instructor/students/${student?.id}`}
                            className="hover:text-primary transition-colors"
                          >
                            {student?.name}
                          </Link>
                        </div>
                        {filteredConcepts.map((concept) => {
                          const mastery = getConceptMastery(student?.id || "", concept.id)
                          return (
                            <div
                              key={concept.id}
                              className={`p-2 text-xs text-center text-white rounded ${getMasteryColor(mastery)}`}
                              title={`${concept.name}: ${mastery}% - ${getMasteryLabel(mastery)}`}
                            >
                              {mastery > 0 ? `${Math.round(mastery)}%` : "-"}
                            </div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 mt-4 text-xs">
                  <span className="text-muted-foreground">Mastery Level:</span>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>80%+ Mastered</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span>60-79% Proficient</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-orange-500 rounded"></div>
                    <span>40-59% Developing</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span>0-39% Struggling</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gray-300 rounded"></div>
                    <span>Not Started</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Intervention Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-lg">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Interventions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-1">Algebra Concepts</h4>
                    <p className="text-sm text-red-700 mb-2">50% of learners struggle with Linear Equations</p>
                    <Button size="sm" variant="outline" className="bg-transparent text-red-700 border-red-300">
                      Assign Remedial Module
                    </Button>
                  </div>

                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-1">Fraction Operations</h4>
                    <p className="text-sm text-yellow-700 mb-2">3 students need additional practice</p>
                    <Button size="sm" variant="outline" className="bg-transparent text-yellow-700 border-yellow-300">
                      Create Practice Set
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* At-Risk Students */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-lg">
                  <Users className="w-5 h-5 text-primary" />
                  At-Risk Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {atRiskStudents.slice(0, 5).map((studentId) => {
                    const student = students.find((s) => s?.id === studentId)
                    return (
                      <div key={studentId} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                        <Link
                          href={`/instructor/students/${studentId}`}
                          className="font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {student?.name}
                        </Link>
                        <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                          At Risk
                        </Badge>
                      </div>
                    )
                  })}
                  {atRiskStudents.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">No students currently at risk</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-lg">
                  <Target className="w-5 h-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Send Alerts
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Users className="w-4 h-4 mr-2" />
                    Message Cohort
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
