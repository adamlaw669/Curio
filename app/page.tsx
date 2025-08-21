import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, BarChart3, Users, Target, Brain, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-serif font-bold text-foreground">Curio</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </Link>
            <Link href="/instructor/login" className="text-muted-foreground hover:text-foreground transition-colors">
              For Educators
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6">
            Adaptive Learning Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
            Personalized learning for every student. <span className="text-primary">Precision insights</span> for every
            educator.
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Curio adapts learning content to each student's performance while giving instructors real-time concept-level
            analytics to optimize teaching strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/student/onboarding">Start Learning</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <Link href="/instructor/login">For Educators</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Adaptive Learning That Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform combines personalized student experiences with powerful instructor analytics
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Student Features */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground">For Students</h3>
              </div>
              <div className="space-y-4">
                <Card className="p-4">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-accent mt-1" />
                      <div>
                        <h4 className="font-semibold text-card-foreground mb-1">Personalized Learning Path</h4>
                        <p className="text-sm text-muted-foreground">
                          AI-powered recommendations based on your performance and learning style
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="p-4">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-3">
                      <Brain className="w-5 h-5 text-accent mt-1" />
                      <div>
                        <h4 className="font-semibold text-card-foreground mb-1">Adaptive Content</h4>
                        <p className="text-sm text-muted-foreground">
                          Dynamic difficulty adjustment and content type based on your progress
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="p-4">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-accent mt-1" />
                      <div>
                        <h4 className="font-semibold text-card-foreground mb-1">Progress Tracking</h4>
                        <p className="text-sm text-muted-foreground">
                          Clear insights into your learning journey with detailed explanations
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Instructor Features */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-accent-foreground" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground">For Educators</h3>
              </div>
              <div className="space-y-4">
                <Card className="p-4">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-3">
                      <BarChart3 className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold text-card-foreground mb-1">Concept-Level Analytics</h4>
                        <p className="text-sm text-muted-foreground">
                          Detailed mastery heatmaps showing exactly where students struggle
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="p-4">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold text-card-foreground mb-1">Cohort Management</h4>
                        <p className="text-sm text-muted-foreground">
                          Track multiple classes with automated alerts for at-risk learners
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="p-4">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold text-card-foreground mb-1">Course Builder</h4>
                        <p className="text-sm text-muted-foreground">
                          Easy-to-use tools for creating and organizing adaptive learning content
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">How Curio Works</h2>
          <p className="text-lg text-muted-foreground mb-12">
            Three simple steps to transform your learning experience
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Assess & Onboard</h3>
              <p className="text-muted-foreground">
                Quick diagnostic quiz to understand your current level and learning preferences
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent-foreground">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Learn & Adapt</h3>
              <p className="text-muted-foreground">
                Engage with personalized content that adapts based on your performance
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Track & Improve</h3>
              <p className="text-muted-foreground">
                Monitor progress with detailed insights and continuous recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ready to Transform Learning?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of students and educators already using Curio</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link href="/student/onboarding">Start Learning Today</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              <Link href="/instructor/login">Educator Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-serif font-bold text-foreground">Curio</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Support
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2024 Curio. Personalized learning for every student. Precision insights for every educator.
          </div>
        </div>
      </footer>
    </div>
  )
}
