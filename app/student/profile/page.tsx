"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, User, Target, Clock, Download, Settings, ArrowLeft, Award, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function StudentProfile() {
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
            <Link href="/student/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground">Alex Johnson</h1>
              <p className="text-muted-foreground">alex.johnson@student.edu</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">Intermediate Level</Badge>
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                  7-day streak
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Learning Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif">
                  <Settings className="w-5 h-5 text-primary" />
                  Learning Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Current Level</p>
                  <Badge variant="secondary">Intermediate</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Learning Goal</p>
                  <p className="text-foreground">Improve my algebra skills and prepare for calculus</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Daily Time Commitment</p>
                  <p className="text-foreground">30-60 minutes</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Preferred Learning Styles</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Video Lessons</Badge>
                    <Badge variant="outline">Interactive Practice</Badge>
                  </div>
                </div>
                <Button variant="outline" className="bg-transparent">
                  <Settings className="w-4 h-4 mr-2" />
                  Update Preferences
                </Button>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif">
                  <Award className="w-5 h-5 text-primary" />
                  Achievements & Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Fraction Master</h3>
                      <p className="text-sm text-muted-foreground">Completed 10 fraction problems</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Week Streak</h3>
                      <p className="text-sm text-muted-foreground">7 days of consistent learning</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Quick Learner</h3>
                      <p className="text-sm text-muted-foreground">Completed 5 modules this week</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Time Master</h3>
                      <p className="text-sm text-muted-foreground">200+ minutes of learning</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Progress Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Modules Completed</span>
                    <span className="font-semibold text-foreground">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Average Score</span>
                    <span className="font-semibold text-foreground">78%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Time This Week</span>
                    <span className="font-semibold text-foreground">193 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current Streak</span>
                    <span className="font-semibold text-foreground">7 days</span>
                  </div>
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
                    <Download className="w-4 h-4 mr-2" />
                    Download Progress Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Settings className="w-4 h-4 mr-2" />
                    Update Preferences
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/student/dashboard">
                      <Target className="w-4 h-4 mr-2" />
                      Back to Learning
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Learning Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-lg">
                  <Clock className="w-5 h-5 text-primary" />
                  This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">847</div>
                    <div className="text-sm text-muted-foreground">Total Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">23</div>
                    <div className="text-sm text-muted-foreground">Modules Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">4</div>
                    <div className="text-sm text-muted-foreground">New Badges Earned</div>
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
