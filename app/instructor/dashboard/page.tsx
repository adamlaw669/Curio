"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Users,
  BookOpen,
  AlertTriangle,
  TrendingUp,
  Clock,
  Target,
  BarChart3,
  Settings,
  Bell,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"

// Mock data
const summaryStats = {
  totalStudents: 127,
  modulesAssigned: 24,
  atRiskLearners: 12,
  avgMastery: 62,
}

const alerts = [
  {
    id: 1,
    type: "at-risk",
    message: "12 learners flagged for intervention in Algebra",
    cohort: "Math Foundations",
    cohortId: "math-foundations",
    priority: "high",
  },
  {
    id: 2,
    type: "low-engagement",
    message: "Tech 101 cohort showing 30% drop in weekly engagement",
    cohort: "Tech 101",
    cohortId: "tech-101",
    priority: "medium",
  },
  {
    id: 3,
    type: "mastery",
    message: "85% of students completed Geometry fundamentals",
    cohort: "Math Foundations",
    cohortId: "math-foundations",
    priority: "low",
  },
]

const weeklyEngagementData = [
  { week: "Week 1", minutes: 2840 },
  { week: "Week 2", minutes: 3120 },
  { week: "Week 3", minutes: 2950 },
  { week: "Week 4", minutes: 3380 },
  { week: "Week 5", minutes: 3150 },
  { week: "Week 6", minutes: 2890 },
]

const conceptMasteryData = [
  { concept: "Fractions", mastery: 78 },
  { concept: "Algebra", mastery: 45 },
  { concept: "Geometry", mastery: 82 },
  { concept: "Statistics", mastery: 67 },
  { concept: "Calculus", mastery: 34 },
]

const recentActivity = [
  {
    student: "Emma Johnson",
    studentId: "emma-johnson",
    action: "Completed Geometry Fundamentals",
    time: "2 hours ago",
    score: 92,
  },
  {
    student: "Michael Chen",
    studentId: "michael-chen",
    action: "Struggling with Algebraic Expressions",
    time: "4 hours ago",
    score: 34,
  },
  {
    student: "Sarah Williams",
    studentId: "sarah-williams",
    action: "Started Linear Equations module",
    time: "6 hours ago",
    score: null,
  },
  {
    student: "David Rodriguez",
    studentId: "david-rodriguez",
    action: "Completed Fraction Operations",
    time: "1 day ago",
    score: 88,
  },
]

export default function InstructorDashboard() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
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
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/instructor/dashboard" className="text-foreground font-medium">
              Dashboard
            </Link>
            <Link href="/instructor/courses" className="text-muted-foreground hover:text-foreground transition-colors">
              Courses
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Reports
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Welcome back, Dr. Smith!</h1>
          <p className="text-muted-foreground">Here's an overview of your students' progress and key insights.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold text-foreground">{summaryStats.totalStudents}</p>
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
                  <p className="text-sm text-muted-foreground">Modules Assigned</p>
                  <p className="text-2xl font-bold text-foreground">{summaryStats.modulesAssigned}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">At-Risk Learners</p>
                  <p className="text-2xl font-bold text-red-600">{summaryStats.atRiskLearners}</p>
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
                  <p className="text-sm text-muted-foreground">Average Mastery</p>
                  <p className="text-2xl font-bold text-foreground">{summaryStats.avgMastery}%</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Alerts & Interventions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className={getPriorityColor(alert.priority)}>
                            {alert.priority}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{alert.cohort}</span>
                        </div>
                        <p className="text-sm text-foreground">{alert.message}</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/instructor/cohorts/${alert.cohortId}`}>
                          View Cohort
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Engagement Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif">
                  <Clock className="w-5 h-5 text-primary" />
                  Weekly Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyEngagementData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#6b7280" />
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
                <p className="text-sm text-muted-foreground mt-4">
                  Total learning time across all students this week: 3,150 minutes
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Concept Mastery */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-lg">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Concept Mastery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={conceptMasteryData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#6b7280" />
                      <YAxis dataKey="concept" type="category" tick={{ fontSize: 12 }} stroke="#6b7280" width={80} />
                      <Bar dataKey="mastery" fill="#164e63" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <div className="flex-1">
                        <Link
                          href={`/instructor/students/${activity.studentId}`}
                          className="font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {activity.student}
                        </Link>
                        <p className="text-sm text-muted-foreground">{activity.action}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                          {activity.score && (
                            <Badge
                              variant="outline"
                              className={
                                activity.score >= 70
                                  ? "bg-green-100 text-green-700 border-green-200"
                                  : "bg-red-100 text-red-700 border-red-200"
                              }
                            >
                              {activity.score}%
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
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
                  <Button className="w-full justify-start" asChild>
                    <Link href="/instructor/courses">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Create New Module
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/instructor/cohorts/math-foundations">
                      <Users className="w-4 h-4 mr-2" />
                      View Math Cohort
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Generate Report
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
