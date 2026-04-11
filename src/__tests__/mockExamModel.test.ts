import { describe, expect, it } from 'vitest'
import {
  computeMockExamResult,
  deriveSelectedCategories,
  formatClockFromSeconds,
  type MockExamSession,
} from '../exam/mockExamModel'

const baseSession: MockExamSession = {
  sessionId: 'session-1',
  createdAtMs: 0,
  startedAtMs: 0,
  currentQuestionIndex: 0,
  hintsUsed: 0,
  settings: {
    examType: 'AM EXAM',
    isTimed: true,
    durationMinutes: 90,
    questionCount: 2,
    instantAnswers: false,
    selectedTopics: ['Applied Mathematics', 'Project Management'],
  },
  questions: [
    {
      id: 'q1',
      pdfName: 'pdf-1',
      questionNumber: '1',
      questionText: 'Question 1',
      tableText: null,
      questionImagePath: null,
      options: [
        { key: 'A', text: 'A1', imagePath: null },
        { key: 'B', text: 'B1', imagePath: null },
      ],
      correctOption: 'A',
      answerExplanation: 'Because A',
      subjectCategory: 'Technology',
      subjectTopic: 'Applied Mathematics',
    },
    {
      id: 'q2',
      pdfName: 'pdf-2',
      questionNumber: '2',
      questionText: 'Question 2',
      tableText: null,
      questionImagePath: null,
      options: [
        { key: 'A', text: 'A2', imagePath: null },
        { key: 'B', text: 'B2', imagePath: null },
      ],
      correctOption: 'B',
      answerExplanation: 'Because B',
      subjectCategory: 'Management',
      subjectTopic: 'Project Management',
    },
  ],
  answers: {},
}

describe('mockExamModel', () => {
  it('formats clock values', () => {
    expect(formatClockFromSeconds(65, false)).toBe('01:05')
    expect(formatClockFromSeconds(3661, true)).toBe('01:01:01')
  })

  it('derives selected categories from selected topics', () => {
    const categories = deriveSelectedCategories(['Applied Mathematics', 'Project Management'])
    expect(categories).toEqual(['Technology', 'Management'])
  })

  it('computes result with category and wrong question breakdown', () => {
    const result = computeMockExamResult(
      baseSession,
      {
        q1: 'A',
        q2: 'A',
      },
      120,
      1,
    )

    expect(result.correctAnswers).toBe(1)
    expect(result.totalQuestions).toBe(2)
    expect(result.wrongQuestions).toHaveLength(1)
    expect(result.categoryBreakdown).toHaveLength(2)
    expect(result.hintsUsed).toBe(1)
    expect(result.averageTimePerQuestionSeconds).toBe(60)
  })
})
