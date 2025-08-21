// Mock Data for Curio Adaptive Learning Platform

export interface User {
  id: string
  name: string
  role: "student" | "instructor"
  email: string
}

export interface StudentProfile {
  userId: string
  level: "beginner" | "intermediate" | "advanced"
  preferences: {
    style: string[]
    timePerDay: string
  }
  goals: string
}

export interface Concept {
  id: string
  name: string
  topic: string
  subtopic?: string
}

export interface Module {
  id: string
  title: string
  contentType: "video" | "text" | "interactive"
  contentURL?: string
  textContent?: string
  concepts: string[]
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  estTimeMins: number
  description: string
}

export interface Course {
  id: string
  title: string
  description: string
  modules: string[]
  instructorId: string
}

export interface Assessment {
  id: string
  studentId: string
  conceptId: string
  score: number
  date: string
  moduleId?: string
}

export interface Recommendation {
  id: string
  studentId: string
  moduleId: string
  reason: string
  createdAt: string
  priority: number
}

export interface Cohort {
  id: string
  name: string
  studentIds: string[]
  instructorId: string
  description: string
}

export interface Engagement {
  studentId: string
  date: string
  minutes: number
  moduleId?: string
}

// Mock Users
export const mockUsers: User[] = [
  // Instructors
  { id: "inst-1", name: "Dr. Sarah Smith", role: "instructor", email: "sarah.smith@curio.edu" },
  { id: "inst-2", name: "Prof. Michael Johnson", role: "instructor", email: "michael.johnson@curio.edu" },

  // Students
  { id: "std-1", name: "Emma Johnson", role: "student", email: "emma.j@student.edu" },
  { id: "std-2", name: "Michael Chen", role: "student", email: "michael.c@student.edu" },
  { id: "std-3", name: "Sarah Williams", role: "student", email: "sarah.w@student.edu" },
  { id: "std-4", name: "David Rodriguez", role: "student", email: "david.r@student.edu" },
  { id: "std-5", name: "Lisa Thompson", role: "student", email: "lisa.t@student.edu" },
  { id: "std-6", name: "James Wilson", role: "student", email: "james.w@student.edu" },
  { id: "std-7", name: "Maria Garcia", role: "student", email: "maria.g@student.edu" },
  { id: "std-8", name: "Robert Brown", role: "student", email: "robert.b@student.edu" },
  { id: "std-9", name: "Jennifer Davis", role: "student", email: "jennifer.d@student.edu" },
  { id: "std-10", name: "Christopher Miller", role: "student", email: "chris.m@student.edu" },
  { id: "std-11", name: "Amanda Taylor", role: "student", email: "amanda.t@student.edu" },
  { id: "std-12", name: "Daniel Anderson", role: "student", email: "daniel.a@student.edu" },
]

// Mock Student Profiles
export const mockStudentProfiles: StudentProfile[] = [
  {
    userId: "std-1",
    level: "advanced",
    preferences: { style: ["video", "interactive"], timePerDay: "30-60" },
    goals: "Master calculus concepts",
  },
  {
    userId: "std-2",
    level: "intermediate",
    preferences: { style: ["text", "video"], timePerDay: "15-30" },
    goals: "Improve algebra skills",
  },
  {
    userId: "std-3",
    level: "beginner",
    preferences: { style: ["video"], timePerDay: "30-60" },
    goals: "Build strong math foundation",
  },
  {
    userId: "std-4",
    level: "intermediate",
    preferences: { style: ["interactive"], timePerDay: "60+" },
    goals: "Excel in geometry",
  },
  {
    userId: "std-5",
    level: "beginner",
    preferences: { style: ["video", "text"], timePerDay: "15-30" },
    goals: "Understand fractions better",
  },
  {
    userId: "std-6",
    level: "advanced",
    preferences: { style: ["text", "interactive"], timePerDay: "60+" },
    goals: "Prepare for advanced mathematics",
  },
  {
    userId: "std-7",
    level: "intermediate",
    preferences: { style: ["video"], timePerDay: "30-60" },
    goals: "Master linear equations",
  },
  {
    userId: "std-8",
    level: "beginner",
    preferences: { style: ["interactive"], timePerDay: "15-30" },
    goals: "Learn basic arithmetic",
  },
  {
    userId: "std-9",
    level: "intermediate",
    preferences: { style: ["text"], timePerDay: "30-60" },
    goals: "Improve problem solving",
  },
  {
    userId: "std-10",
    level: "advanced",
    preferences: { style: ["video", "interactive"], timePerDay: "60+" },
    goals: "Advanced algebra mastery",
  },
  {
    userId: "std-11",
    level: "beginner",
    preferences: { style: ["video"], timePerDay: "15-30" },
    goals: "Basic geometry understanding",
  },
  {
    userId: "std-12",
    level: "intermediate",
    preferences: { style: ["text", "interactive"], timePerDay: "30-60" },
    goals: "Statistics fundamentals",
  },
]

// Mock Concepts
export const mockConcepts: Concept[] = [
  { id: "algebra-basic", name: "Basic Algebra", topic: "Algebra" },
  { id: "algebra-linear", name: "Linear Equations", topic: "Algebra", subtopic: "Equations" },
  { id: "algebra-quadratic", name: "Quadratic Functions", topic: "Algebra", subtopic: "Functions" },
  { id: "geometry-shapes", name: "Basic Shapes", topic: "Geometry" },
  { id: "geometry-area", name: "Area Calculations", topic: "Geometry", subtopic: "Measurement" },
  { id: "geometry-volume", name: "Volume Calculations", topic: "Geometry", subtopic: "Measurement" },
  { id: "fractions-basic", name: "Understanding Fractions", topic: "Fractions" },
  { id: "fractions-operations", name: "Fraction Operations", topic: "Fractions", subtopic: "Operations" },
  { id: "statistics-intro", name: "Introduction to Statistics", topic: "Statistics" },
  { id: "statistics-probability", name: "Basic Probability", topic: "Statistics", subtopic: "Probability" },
  { id: "calculus-limits", name: "Limits", topic: "Calculus" },
  { id: "calculus-derivatives", name: "Derivatives", topic: "Calculus", subtopic: "Differentiation" },
  { id: "arithmetic-basic", name: "Basic Arithmetic", topic: "Arithmetic" },
  { id: "trigonometry-basic", name: "Basic Trigonometry", topic: "Trigonometry" },
]

// Mock Modules
export const mockModules: Module[] = [
  {
    id: "geometry-basics",
    title: "Geometry Fundamentals",
    contentType: "text",
    textContent: "Learn the basic principles of geometry...",
    concepts: ["geometry-shapes", "geometry-area"],
    difficulty: "Beginner",
    estTimeMins: 12,
    description: "Learn the basic principles of geometry including shapes, angles, and area calculations.",
  },
  {
    id: "fraction-practice",
    title: "Fraction Operations Practice",
    contentType: "interactive",
    concepts: ["fractions-basic", "fractions-operations"],
    difficulty: "Beginner",
    estTimeMins: 8,
    description: "Master fraction operations through interactive practice problems.",
  },
  {
    id: "algebra-review",
    title: "Algebra Fundamentals Review",
    contentType: "video",
    contentURL: "https://www.youtube.com/embed/NybHckSEQBI",
    concepts: ["algebra-basic", "algebra-linear"],
    difficulty: "Intermediate",
    estTimeMins: 10,
    description: "Review key algebraic concepts including solving equations and working with variables.",
  },
  {
    id: "linear-equations",
    title: "Solving Linear Equations",
    contentType: "text",
    textContent: "Linear equations are fundamental to algebra...",
    concepts: ["algebra-linear"],
    difficulty: "Intermediate",
    estTimeMins: 15,
    description: "Master the techniques for solving linear equations step by step.",
  },
  {
    id: "quadratic-intro",
    title: "Introduction to Quadratic Functions",
    contentType: "video",
    contentURL: "https://www.youtube.com/embed/example",
    concepts: ["algebra-quadratic"],
    difficulty: "Advanced",
    estTimeMins: 20,
    description: "Explore quadratic functions, their graphs, and real-world applications.",
  },
  {
    id: "statistics-basics",
    title: "Statistics Fundamentals",
    contentType: "interactive",
    concepts: ["statistics-intro"],
    difficulty: "Beginner",
    estTimeMins: 18,
    description: "Learn basic statistical concepts including mean, median, and mode.",
  },
  {
    id: "probability-intro",
    title: "Introduction to Probability",
    contentType: "text",
    textContent: "Probability is the study of chance...",
    concepts: ["statistics-probability"],
    difficulty: "Intermediate",
    estTimeMins: 14,
    description: "Understand probability concepts and how to calculate simple probabilities.",
  },
  {
    id: "calculus-limits",
    title: "Understanding Limits",
    contentType: "video",
    contentURL: "https://www.youtube.com/embed/example2",
    concepts: ["calculus-limits"],
    difficulty: "Advanced",
    estTimeMins: 25,
    description: "Introduction to limits and their role in calculus.",
  },
  {
    id: "trigonometry-basics",
    title: "Basic Trigonometry",
    contentType: "interactive",
    concepts: ["trigonometry-basic"],
    difficulty: "Intermediate",
    estTimeMins: 16,
    description: "Learn sine, cosine, and tangent functions.",
  },
  {
    id: "arithmetic-review",
    title: "Arithmetic Review",
    contentType: "text",
    textContent: "Review basic arithmetic operations...",
    concepts: ["arithmetic-basic"],
    difficulty: "Beginner",
    estTimeMins: 8,
    description: "Strengthen your foundation with basic arithmetic operations.",
  },
]

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: "math-foundations",
    title: "Math Foundations",
    description: "Core mathematical concepts for high school students",
    modules: ["arithmetic-review", "fraction-practice", "geometry-basics", "algebra-review"],
    instructorId: "inst-1",
  },
  {
    id: "advanced-algebra",
    title: "Advanced Algebra",
    description: "Complex algebraic concepts and problem solving",
    modules: ["linear-equations", "quadratic-intro"],
    instructorId: "inst-1",
  },
  {
    id: "statistics-course",
    title: "Introduction to Statistics",
    description: "Basic statistical concepts and probability",
    modules: ["statistics-basics", "probability-intro"],
    instructorId: "inst-2",
  },
]

// Mock Cohorts
export const mockCohorts: Cohort[] = [
  {
    id: "math-foundations",
    name: "Math Foundations",
    studentIds: ["std-1", "std-2", "std-3", "std-4", "std-5", "std-6"],
    instructorId: "inst-1",
    description: "High school students building foundational math skills",
  },
  {
    id: "tech-101",
    name: "Tech 101",
    studentIds: ["std-7", "std-8", "std-9", "std-10", "std-11", "std-12"],
    instructorId: "inst-2",
    description: "Introduction to technology and mathematical applications",
  },
]

// Mock Assessments
export const mockAssessments: Assessment[] = [
  // Strong performers
  {
    id: "assess-1",
    studentId: "std-1",
    conceptId: "algebra-basic",
    score: 92,
    date: "2024-01-15",
    moduleId: "algebra-review",
  },
  {
    id: "assess-2",
    studentId: "std-1",
    conceptId: "geometry-shapes",
    score: 88,
    date: "2024-01-14",
    moduleId: "geometry-basics",
  },
  {
    id: "assess-3",
    studentId: "std-6",
    conceptId: "algebra-linear",
    score: 95,
    date: "2024-01-13",
    moduleId: "linear-equations",
  },

  // Mixed performers
  {
    id: "assess-4",
    studentId: "std-2",
    conceptId: "algebra-basic",
    score: 67,
    date: "2024-01-15",
    moduleId: "algebra-review",
  },
  {
    id: "assess-5",
    studentId: "std-2",
    conceptId: "fractions-basic",
    score: 45,
    date: "2024-01-12",
    moduleId: "fraction-practice",
  },
  {
    id: "assess-6",
    studentId: "std-4",
    conceptId: "geometry-area",
    score: 78,
    date: "2024-01-14",
    moduleId: "geometry-basics",
  },

  // Struggling performers
  {
    id: "assess-7",
    studentId: "std-3",
    conceptId: "arithmetic-basic",
    score: 34,
    date: "2024-01-16",
    moduleId: "arithmetic-review",
  },
  {
    id: "assess-8",
    studentId: "std-5",
    conceptId: "fractions-basic",
    score: 28,
    date: "2024-01-13",
    moduleId: "fraction-practice",
  },
  {
    id: "assess-9",
    studentId: "std-8",
    conceptId: "algebra-basic",
    score: 41,
    date: "2024-01-15",
    moduleId: "algebra-review",
  },

  // Additional assessments for analytics
  {
    id: "assess-10",
    studentId: "std-7",
    conceptId: "statistics-intro",
    score: 82,
    date: "2024-01-14",
    moduleId: "statistics-basics",
  },
  {
    id: "assess-11",
    studentId: "std-9",
    conceptId: "probability-basic",
    score: 76,
    date: "2024-01-13",
    moduleId: "probability-intro",
  },
  {
    id: "assess-12",
    studentId: "std-10",
    conceptId: "calculus-limits",
    score: 89,
    date: "2024-01-12",
    moduleId: "calculus-limits",
  },
]

// Mock Recommendations
export const mockRecommendations: Recommendation[] = [
  {
    id: "rec-1",
    studentId: "std-1",
    moduleId: "quadratic-intro",
    reason: "You've mastered algebra fundamentals. Ready for the next challenge!",
    createdAt: "2024-01-16T10:00:00Z",
    priority: 1,
  },
  {
    id: "rec-2",
    studentId: "std-2",
    moduleId: "fraction-practice",
    reason: "Selected due to mixed performance in recent fraction problems.",
    createdAt: "2024-01-16T09:30:00Z",
    priority: 2,
  },
  {
    id: "rec-3",
    studentId: "std-3",
    moduleId: "arithmetic-review",
    reason: "Let's reinforce these fundamental skills first.",
    createdAt: "2024-01-16T09:00:00Z",
    priority: 3,
  },
  {
    id: "rec-4",
    studentId: "std-4",
    moduleId: "geometry-basics",
    reason: "Building on your strong geometry foundation.",
    createdAt: "2024-01-16T08:30:00Z",
    priority: 1,
  },
  {
    id: "rec-5",
    studentId: "std-5",
    moduleId: "fraction-practice",
    reason: "Selected due to low accuracy in recent quiz on fractions.",
    createdAt: "2024-01-16T08:00:00Z",
    priority: 3,
  },
]

// Mock Engagement Data
export const mockEngagement: Engagement[] = [
  // Recent week data for multiple students
  { studentId: "std-1", date: "2024-01-15", minutes: 45, moduleId: "algebra-review" },
  { studentId: "std-1", date: "2024-01-14", minutes: 32, moduleId: "geometry-basics" },
  { studentId: "std-1", date: "2024-01-13", minutes: 28, moduleId: "quadratic-intro" },

  { studentId: "std-2", date: "2024-01-15", minutes: 23, moduleId: "fraction-practice" },
  { studentId: "std-2", date: "2024-01-14", minutes: 18, moduleId: "algebra-review" },
  { studentId: "std-2", date: "2024-01-13", minutes: 35, moduleId: "geometry-basics" },

  { studentId: "std-3", date: "2024-01-15", minutes: 15, moduleId: "arithmetic-review" },
  { studentId: "std-3", date: "2024-01-14", minutes: 12, moduleId: "fraction-practice" },
  { studentId: "std-3", date: "2024-01-13", minutes: 20, moduleId: "arithmetic-review" },

  // More engagement data for analytics
  { studentId: "std-4", date: "2024-01-15", minutes: 38, moduleId: "geometry-basics" },
  { studentId: "std-5", date: "2024-01-15", minutes: 22, moduleId: "fraction-practice" },
  { studentId: "std-6", date: "2024-01-15", minutes: 52, moduleId: "calculus-limits" },
  { studentId: "std-7", date: "2024-01-15", minutes: 41, moduleId: "statistics-basics" },
  { studentId: "std-8", date: "2024-01-15", minutes: 16, moduleId: "arithmetic-review" },
  { studentId: "std-9", date: "2024-01-15", minutes: 33, moduleId: "probability-intro" },
  { studentId: "std-10", date: "2024-01-15", minutes: 47, moduleId: "linear-equations" },
]

// Helper functions
export const getStudentById = (id: string) => mockUsers.find((user) => user.id === id && user.role === "student")
export const getInstructorById = (id: string) => mockUsers.find((user) => user.id === id && user.role === "instructor")
export const getModuleById = (id: string) => mockModules.find((module) => module.id === id)
export const getConceptById = (id: string) => mockConcepts.find((concept) => concept.id === id)
export const getCohortById = (id: string) => mockCohorts.find((cohort) => cohort.id === id)
export const getStudentProfile = (userId: string) => mockStudentProfiles.find((profile) => profile.userId === userId)
export const getStudentAssessments = (studentId: string) =>
  mockAssessments.filter((assessment) => assessment.studentId === studentId)
export const getStudentRecommendations = (studentId: string) =>
  mockRecommendations.filter((rec) => rec.studentId === studentId)
export const getStudentEngagement = (studentId: string) => mockEngagement.filter((eng) => eng.studentId === studentId)
export const getCohortStudents = (cohortId: string) => {
  const cohort = getCohortById(cohortId)
  return cohort ? cohort.studentIds.map((id) => getStudentById(id)).filter(Boolean) : []
}

// Analytics helper functions
export const getConceptMastery = (studentId: string, conceptId: string) => {
  const assessments = mockAssessments.filter((a) => a.studentId === studentId && a.conceptId === conceptId)
  if (assessments.length === 0) return 0
  return assessments.reduce((sum, a) => sum + a.score, 0) / assessments.length
}

export const getAtRiskStudents = (cohortId: string) => {
  const cohort = getCohortById(cohortId)
  if (!cohort) return []

  return cohort.studentIds.filter((studentId) => {
    const assessments = getStudentAssessments(studentId)
    const lowScores = assessments.filter((a) => a.score < 50)
    return lowScores.length >= 2
  })
}

export const getCohortConceptMastery = (cohortId: string) => {
  const cohort = getCohortById(cohortId)
  if (!cohort) return {}

  const conceptMastery: Record<string, Record<string, number>> = {}

  cohort.studentIds.forEach((studentId) => {
    const student = getStudentById(studentId)
    if (!student) return

    conceptMastery[studentId] = {}
    mockConcepts.forEach((concept) => {
      conceptMastery[studentId][concept.id] = getConceptMastery(studentId, concept.id)
    })
  })

  return conceptMastery
}
