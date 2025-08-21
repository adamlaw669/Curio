"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, StudentProfile, Assessment, Recommendation, Engagement } from "./mock-data"

interface AppState {
  // Current user
  currentUser: User | null
  currentStudentProfile: StudentProfile | null

  // Student state
  studentAssessments: Assessment[]
  studentRecommendations: Recommendation[]
  studentEngagement: Engagement[]

  // UI state
  performanceState: "strong" | "mixed" | "weak"

  // Actions
  setCurrentUser: (user: User | null) => void
  setStudentProfile: (profile: StudentProfile | null) => void
  addAssessment: (assessment: Assessment) => void
  updateRecommendations: (recommendations: Recommendation[]) => void
  addEngagement: (engagement: Engagement) => void
  setPerformanceState: (state: "strong" | "mixed" | "weak") => void

  // Computed values
  getAverageScore: () => number
  getTotalEngagementTime: () => number
  getWeeklyEngagement: () => number[]
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentUser: null,
      currentStudentProfile: null,
      studentAssessments: [],
      studentRecommendations: [],
      studentEngagement: [],
      performanceState: "mixed",

      // Actions
      setCurrentUser: (user) => set({ currentUser: user }),
      setStudentProfile: (profile) => set({ currentStudentProfile: profile }),

      addAssessment: (assessment) =>
        set((state) => ({
          studentAssessments: [...state.studentAssessments, assessment],
        })),

      updateRecommendations: (recommendations) =>
        set({
          studentRecommendations: recommendations,
        }),

      addEngagement: (engagement) =>
        set((state) => ({
          studentEngagement: [...state.studentEngagement, engagement],
        })),

      setPerformanceState: (performanceState) => set({ performanceState }),

      // Computed values
      getAverageScore: () => {
        const { studentAssessments } = get()
        if (studentAssessments.length === 0) return 0
        return Math.round(studentAssessments.reduce((sum, a) => sum + a.score, 0) / studentAssessments.length)
      },

      getTotalEngagementTime: () => {
        const { studentEngagement } = get()
        return studentEngagement.reduce((sum, e) => sum + e.minutes, 0)
      },

      getWeeklyEngagement: () => {
        const { studentEngagement } = get()
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date()
          date.setDate(date.getDate() - i)
          return date.toISOString().split("T")[0]
        }).reverse()

        return last7Days.map((date) =>
          studentEngagement.filter((e) => e.date === date).reduce((sum, e) => sum + e.minutes, 0),
        )
      },
    }),
    {
      name: "curio-app-storage",
      partialize: (state) => ({
        currentUser: state.currentUser,
        currentStudentProfile: state.currentStudentProfile,
        performanceState: state.performanceState,
      }),
    },
  ),
)
