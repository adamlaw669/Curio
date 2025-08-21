"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Brain, BookOpen, Plus, Settings, Clock, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

// Mock courses data
const mockCourses = [
  {
    id: "math-foundations",
    title: "Math Foundations",
    description: "Core mathematical concepts for high school students",
    modules: 12,
    students: 45,
    status: "active",
    lastUpdated: "2 days ago",
    concepts: ["Algebra", "Geometry", "Fractions"],
  },
  {
    id: "advanced-algebra",
    title: "Advanced Algebra",
    description: "Complex algebraic concepts and problem solving",
    modules: 8,
    students: 23,
    status: "active",
    lastUpdated: "1 week ago",
    concepts: ["Linear Equations", "Quadratic Functions", "Polynomials"],
  },
  {
    id: "geometry-essentials",
    title: "Geometry Essentials",
    description: "Fundamental geometry principles and applications",
    modules: 6,
    students: 0,
    status: "draft",
    lastUpdated: "3 days ago",
    concepts: ["Shapes", "Area", "Volume", "Angles"],
  },
]

export default function InstructorCourses() {
  const [courses, setCourses] = useState(mockCourses)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
  })

  const handleCreateCourse = () => {
    if (newCourse.title && newCourse.description) {
      const courseId = newCourse.title.toLowerCase().replace(/\s+/g, "-")
      const course = {
        id: courseId,
        title: newCourse.title,
        description: newCourse.description,
        modules: 0,
        students: 0,
        status: "draft" as const,
        lastUpdated: "Just now",
        concepts: [],
      }
      setCourses([course, ...courses])
      setNewCourse({ title: "", description: "" })
      setIsCreateDialogOpen(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200"
      case "draft":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "archived":
        return "bg-gray-100 text-gray-700 border-gray-200"
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
            <Link
              href="/instructor/dashboard"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <Link href="/instructor/courses" className="text-foreground font-medium">
              Courses
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Reports
            </Link>
          </nav>
          <Button variant="outline" size="sm" asChild>
            <Link href="/instructor/dashboard">
              <Settings className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Course Management</h1>
            <p className="text-muted-foreground">Create and manage your learning modules</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Course
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Course</DialogTitle>
                <DialogDescription>Start building a new course with modules and learning content.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Advanced Calculus"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of what students will learn..."
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleCreateCourse} className="flex-1">
                    Create Course
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="bg-transparent">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="font-serif text-lg mb-2">{course.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                  </div>
                  <Badge variant="outline" className={getStatusColor(course.status)}>
                    {course.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-foreground">{course.modules}</div>
                      <div className="text-xs text-muted-foreground">Modules</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-foreground">{course.students}</div>
                      <div className="text-xs text-muted-foreground">Students</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-foreground">{course.concepts.length}</div>
                      <div className="text-xs text-muted-foreground">Concepts</div>
                    </div>
                  </div>

                  {/* Concepts */}
                  {course.concepts.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Key Concepts:</p>
                      <div className="flex flex-wrap gap-1">
                        {course.concepts.slice(0, 3).map((concept) => (
                          <Badge key={concept} variant="secondary" className="text-xs">
                            {concept}
                          </Badge>
                        ))}
                        {course.concepts.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{course.concepts.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Last Updated */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    Updated {course.lastUpdated}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1" asChild>
                      <Link href={`/instructor/courses/${course.id}`}>
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Eye className="w-3 h-3 mr-1" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent text-red-600 hover:text-red-700">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {courses.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No courses yet</h3>
              <p className="text-muted-foreground mb-4">Create your first course to start building learning content.</p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Course
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
