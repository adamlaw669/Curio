"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Brain,
  BookOpen,
  Plus,
  Settings,
  Video,
  FileText,
  Gamepad2,
  Clock,
  Target,
  Edit,
  Trash2,
  Eye,
  ArrowLeft,
  Save,
} from "lucide-react"
import Link from "next/link"

// Mock course data
const mockCourse = {
  id: "math-foundations",
  title: "Math Foundations",
  description: "Core mathematical concepts for high school students",
  status: "active",
  modules: [
    {
      id: "fractions-basics",
      title: "Understanding Fractions",
      description: "Learn the fundamentals of fractions and basic operations",
      type: "video",
      difficulty: "Beginner",
      estimatedTime: 15,
      concepts: ["Fractions", "Basic Operations"],
      contentUrl: "https://youtube.com/watch?v=example",
      status: "published",
    },
    {
      id: "algebra-intro",
      title: "Introduction to Algebra",
      description: "Basic algebraic concepts and solving simple equations",
      type: "text",
      difficulty: "Intermediate",
      estimatedTime: 20,
      concepts: ["Algebra", "Equations"],
      contentText: "Algebra is the branch of mathematics...",
      status: "draft",
    },
  ],
}

const availableConcepts = [
  "Algebra",
  "Geometry",
  "Fractions",
  "Statistics",
  "Calculus",
  "Linear Equations",
  "Quadratic Functions",
  "Polynomials",
  "Trigonometry",
  "Probability",
]

interface Module {
  id: string
  title: string
  description: string
  type: "video" | "text" | "interactive"
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  estimatedTime: number
  concepts: string[]
  contentUrl?: string
  contentText?: string
  status: "draft" | "published"
}

export default function CourseBuilder({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState(mockCourse)
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false)
  const [editingModule, setEditingModule] = useState<Module | null>(null)
  const [newModule, setNewModule] = useState<Partial<Module>>({
    title: "",
    description: "",
    type: "video",
    difficulty: "Beginner",
    estimatedTime: 10,
    concepts: [],
    contentUrl: "",
    contentText: "",
  })

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700 border-green-200"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "Advanced":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const handleConceptToggle = (concept: string, checked: boolean) => {
    if (editingModule) {
      setEditingModule({
        ...editingModule,
        concepts: checked ? [...editingModule.concepts, concept] : editingModule.concepts.filter((c) => c !== concept),
      })
    } else {
      setNewModule({
        ...newModule,
        concepts: checked
          ? [...(newModule.concepts || []), concept]
          : (newModule.concepts || []).filter((c) => c !== concept),
      })
    }
  }

  const handleSaveModule = () => {
    if (editingModule) {
      // Update existing module
      setCourse({
        ...course,
        modules: course.modules.map((m) => (m.id === editingModule.id ? editingModule : m)),
      })
      setEditingModule(null)
    } else {
      // Add new module
      const moduleId = newModule.title?.toLowerCase().replace(/\s+/g, "-") || ""
      const module: Module = {
        id: moduleId,
        title: newModule.title || "",
        description: newModule.description || "",
        type: newModule.type || "video",
        difficulty: newModule.difficulty || "Beginner",
        estimatedTime: newModule.estimatedTime || 10,
        concepts: newModule.concepts || [],
        contentUrl: newModule.contentUrl,
        contentText: newModule.contentText,
        status: "draft",
      }
      setCourse({
        ...course,
        modules: [...course.modules, module],
      })
      setNewModule({
        title: "",
        description: "",
        type: "video",
        difficulty: "Beginner",
        estimatedTime: 10,
        concepts: [],
        contentUrl: "",
        contentText: "",
      })
      setIsAddModuleOpen(false)
    }
  }

  const currentModule = editingModule || newModule
  const TypeIcon = getTypeIcon(currentModule.type || "video")

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
            <Button variant="outline" size="sm" asChild>
              <Link href="/instructor/courses">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Link>
            </Button>
            <Button size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save Course
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">Course Builder</Badge>
            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
              {course.status}
            </Badge>
          </div>
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">{course.title}</h1>
          <p className="text-muted-foreground">{course.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Modules List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 font-serif">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Course Modules ({course.modules.length})
                  </CardTitle>
                  <Dialog open={isAddModuleOpen} onOpenChange={setIsAddModuleOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Module
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{editingModule ? "Edit Module" : "Add New Module"}</DialogTitle>
                        <DialogDescription>
                          {editingModule
                            ? "Update module details and content"
                            : "Create a new learning module for your course"}
                        </DialogDescription>
                      </DialogHeader>
                      <Tabs defaultValue="details" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="details">Details</TabsTrigger>
                          <TabsTrigger value="content">Content</TabsTrigger>
                          <TabsTrigger value="preview">Preview</TabsTrigger>
                        </TabsList>
                        <TabsContent value="details" className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="module-title">Module Title</Label>
                              <Input
                                id="module-title"
                                placeholder="e.g., Introduction to Fractions"
                                value={currentModule.title || ""}
                                onChange={(e) =>
                                  editingModule
                                    ? setEditingModule({ ...editingModule, title: e.target.value })
                                    : setNewModule({ ...newModule, title: e.target.value })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="module-type">Content Type</Label>
                              <Select
                                value={currentModule.type || "video"}
                                onValueChange={(value: any) =>
                                  editingModule
                                    ? setEditingModule({ ...editingModule, type: value })
                                    : setNewModule({ ...newModule, type: value })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="video">Video Lesson</SelectItem>
                                  <SelectItem value="text">Text Content</SelectItem>
                                  <SelectItem value="interactive">Interactive Practice</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="module-description">Description</Label>
                            <Textarea
                              id="module-description"
                              placeholder="Brief description of what students will learn..."
                              value={currentModule.description || ""}
                              onChange={(e) =>
                                editingModule
                                  ? setEditingModule({ ...editingModule, description: e.target.value })
                                  : setNewModule({ ...newModule, description: e.target.value })
                              }
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="module-difficulty">Difficulty Level</Label>
                              <Select
                                value={currentModule.difficulty || "Beginner"}
                                onValueChange={(value: any) =>
                                  editingModule
                                    ? setEditingModule({ ...editingModule, difficulty: value })
                                    : setNewModule({ ...newModule, difficulty: value })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Beginner">Beginner</SelectItem>
                                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                                  <SelectItem value="Advanced">Advanced</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="module-time">Estimated Time (minutes)</Label>
                              <Input
                                id="module-time"
                                type="number"
                                min="1"
                                max="120"
                                value={currentModule.estimatedTime || 10}
                                onChange={(e) =>
                                  editingModule
                                    ? setEditingModule({
                                        ...editingModule,
                                        estimatedTime: Number.parseInt(e.target.value),
                                      })
                                    : setNewModule({ ...newModule, estimatedTime: Number.parseInt(e.target.value) })
                                }
                              />
                            </div>
                          </div>
                          <div>
                            <Label>Concepts Covered</Label>
                            <div className="grid grid-cols-2 gap-2 mt-2 max-h-32 overflow-y-auto">
                              {availableConcepts.map((concept) => (
                                <div key={concept} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={concept}
                                    checked={(currentModule.concepts || []).includes(concept)}
                                    onCheckedChange={(checked) => handleConceptToggle(concept, checked as boolean)}
                                  />
                                  <Label htmlFor={concept} className="text-sm">
                                    {concept}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="content" className="space-y-4">
                          {currentModule.type === "video" && (
                            <div>
                              <Label htmlFor="video-url">Video URL</Label>
                              <Input
                                id="video-url"
                                placeholder="https://youtube.com/watch?v=..."
                                value={currentModule.contentUrl || ""}
                                onChange={(e) =>
                                  editingModule
                                    ? setEditingModule({ ...editingModule, contentUrl: e.target.value })
                                    : setNewModule({ ...newModule, contentUrl: e.target.value })
                                }
                              />
                            </div>
                          )}
                          {currentModule.type === "text" && (
                            <div>
                              <Label htmlFor="text-content">Text Content</Label>
                              <Textarea
                                id="text-content"
                                placeholder="Enter the learning content here..."
                                className="min-h-[200px]"
                                value={currentModule.contentText || ""}
                                onChange={(e) =>
                                  editingModule
                                    ? setEditingModule({ ...editingModule, contentText: e.target.value })
                                    : setNewModule({ ...newModule, contentText: e.target.value })
                                }
                              />
                            </div>
                          )}
                          {currentModule.type === "interactive" && (
                            <div className="text-center py-8 text-muted-foreground">
                              <Gamepad2 className="w-12 h-12 mx-auto mb-4" />
                              <p>Interactive content builder coming soon!</p>
                            </div>
                          )}
                        </TabsContent>
                        <TabsContent value="preview" className="space-y-4">
                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline" className={getTypeColor(currentModule.type || "video")}>
                                      <TypeIcon className="w-3 h-3 mr-1" />
                                      {currentModule.type}
                                    </Badge>
                                    <Badge
                                      variant="outline"
                                      className={getDifficultyColor(currentModule.difficulty || "Beginner")}
                                    >
                                      {currentModule.difficulty}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {currentModule.estimatedTime} min
                                    </span>
                                  </div>
                                  <h3 className="font-semibold text-card-foreground mb-1">
                                    {currentModule.title || "Module Title"}
                                  </h3>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {currentModule.description || "Module description"}
                                  </p>
                                  {(currentModule.concepts || []).length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                      {(currentModule.concepts || []).map((concept) => (
                                        <Badge key={concept} variant="secondary" className="text-xs">
                                          {concept}
                                        </Badge>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <Button size="sm">Start</Button>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </Tabs>
                      <div className="flex gap-2 pt-4">
                        <Button onClick={handleSaveModule} className="flex-1">
                          {editingModule ? "Update Module" : "Add Module"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsAddModuleOpen(false)
                            setEditingModule(null)
                            setNewModule({
                              title: "",
                              description: "",
                              type: "video",
                              difficulty: "Beginner",
                              estimatedTime: 10,
                              concepts: [],
                              contentUrl: "",
                              contentText: "",
                            })
                          }}
                          className="bg-transparent"
                        >
                          Cancel
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.modules.map((module) => {
                    const TypeIcon = getTypeIcon(module.type)
                    return (
                      <Card key={module.id} className="hover:shadow-sm transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className={getTypeColor(module.type)}>
                                  <TypeIcon className="w-3 h-3 mr-1" />
                                  {module.type}
                                </Badge>
                                <Badge variant="outline" className={getDifficultyColor(module.difficulty)}>
                                  {module.difficulty}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className={
                                    module.status === "published"
                                      ? "bg-green-100 text-green-700 border-green-200"
                                      : "bg-yellow-100 text-yellow-700 border-yellow-200"
                                  }
                                >
                                  {module.status}
                                </Badge>
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {module.estimatedTime} min
                                </span>
                              </div>
                              <h3 className="font-semibold text-card-foreground mb-1">{module.title}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {module.concepts.map((concept) => (
                                  <Badge key={concept} variant="secondary" className="text-xs">
                                    {concept}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingModule(module)
                                  setIsAddModuleOpen(true)
                                }}
                                className="bg-transparent"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline" className="bg-transparent">
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-transparent text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                  {course.modules.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <BookOpen className="w-12 h-12 mx-auto mb-4" />
                      <p>No modules yet. Add your first module to get started!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-lg">
                  <Settings className="w-5 h-5 text-primary" />
                  Course Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="course-title">Course Title</Label>
                  <Input
                    id="course-title"
                    value={course.title}
                    onChange={(e) => setCourse({ ...course, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="course-description">Description</Label>
                  <Textarea
                    id="course-description"
                    value={course.description}
                    onChange={(e) => setCourse({ ...course, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="course-status">Status</Label>
                  <Select value={course.status} onValueChange={(value) => setCourse({ ...course, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Course Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-lg">
                  <Target className="w-5 h-5 text-primary" />
                  Course Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Modules</span>
                    <span className="font-semibold text-foreground">{course.modules.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Published</span>
                    <span className="font-semibold text-foreground">
                      {course.modules.filter((m) => m.status === "published").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Draft</span>
                    <span className="font-semibold text-foreground">
                      {course.modules.filter((m) => m.status === "draft").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Time</span>
                    <span className="font-semibold text-foreground">
                      {course.modules.reduce((sum, m) => sum + m.estimatedTime, 0)} min
                    </span>
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
                  <Button className="w-full justify-start" onClick={() => setIsAddModuleOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Module
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Course
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Target className="w-4 h-4 mr-2" />
                    Publish Course
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
