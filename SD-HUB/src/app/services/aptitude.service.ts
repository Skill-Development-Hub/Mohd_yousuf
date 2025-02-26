import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';

interface Question {
  id: number;
  section: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  correct_option: string;
}

interface TestResult {
  email: string;
  fullName: string;
  gender: string;
  courseApplied: string;
  marksScored: string;
}

@Injectable({
  providedIn: 'root'
})
export class AptitudeService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<any> {
    return this.http.get<Question[]>(`${this.apiUrl}/aptitude`).pipe(
      map(questions => {
        const grouped = {
          aptitudeQuestions: [{
            section: 'Aptitude Test',
            questions: questions.filter(q => q.section === 'Aptitude Test').map(q => ({
              question: q.question,
              options: [
                { text: q.option_a, value: 'a' },
                { text: q.option_b, value: 'b' },
                { text: q.option_c, value: 'c' }
              ],
              correctAnswer: q.correct_option
            }))
          }],
          generalKnowledgeQuestions: [{
            section: 'General Knowledge Test',
            questions: questions.filter(q => q.section === 'General Knowledge Test').map(q => ({
              question: q.question,
              options: [
                { text: q.option_a, value: 'a' },
                { text: q.option_b, value: 'b' },
                { text: q.option_c, value: 'c' }
              ],
              correctAnswer: q.correct_option
            }))
          }],
          criticalThinkingQuestions: [{
            section: 'Critical Thinking Test',
            questions: questions.filter(q => q.section === 'Critical Thinking Test').map(q => ({
              question: q.question,
              options: [
                { text: q.option_a, value: 'a' },
                { text: q.option_b, value: 'b' },
                { text: q.option_c, value: 'c' }
              ],
              correctAnswer: q.correct_option
            }))
          }]
        };
        return [grouped];
      })
    );
  }

  calculateScore(answers: { [key: string]: string }, questions: any[]): number {
    let score = 0;
    let totalQuestions = 0;

    // Calculate score for each section
    ['aptitudeQuestions', 'generalKnowledgeQuestions', 'criticalThinkingQuestions'].forEach(section => {
      questions[0][section][0].questions.forEach((q: any, index: number) => {
        const questionId = section.split('Questions')[0] + '_' + index;
        if (answers[questionId] === q.correctAnswer) {
          score++;
        }
        totalQuestions++;
      });
    });

    return score;
  }

  submitTest(testData: any): Observable<any> {
    return this.getQuestions().pipe(
      switchMap(questions => {
        const score = this.calculateScore(testData.answers, questions);
        const submission = {
          ...testData.personalInfo,
          marksScored: `${score}/${40}`, // Assuming 40 total questions
          answers: testData.answers
        };
        return this.http.post(`${this.apiUrl}/submit-test`, submission);
      })
    );
  }

  getTestResults(): Observable<TestResult[]> {
    return this.http.get<TestResult[]>(`${this.apiUrl}/test-results`);
  }
}