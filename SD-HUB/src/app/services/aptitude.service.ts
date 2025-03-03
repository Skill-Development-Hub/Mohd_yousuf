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
                { text: q.option_a, value: q.option_a }, // Line 26: Updated value to actual string
                { text: q.option_b, value: q.option_b }, // Line 27: Updated value to actual string
                ...(q.option_c ? [{ text: q.option_c, value: q.option_c }] : []) // Line 28: Updated value to actual string
              ],
              correctAnswer: q.correct_option // Line 29: Updated to match actual string value
            }))
          }],
          generalKnowledgeQuestions: [{
            section: 'General Knowledge Test',
            questions: questions.filter(q => q.section === 'General Knowledge Test').map(q => ({
              question: q.question,
              options: [
                { text: q.option_a, value: q.option_a }, // Line 34: Updated value to actual string
                { text: q.option_b, value: q.option_b }, // Line 35: Updated value to actual string
                ...(q.option_c ? [{ text: q.option_c, value: q.option_c }] : []) // Line 36: Updated value to actual string
              ],
              correctAnswer: q.correct_option // Line 37: Updated to match actual string value
            }))
          }],
          criticalThinkingQuestions: [{
            section: 'Critical Thinking Test',
            questions: questions.filter(q => q.section === 'Critical Thinking Test').map(q => ({
              question: q.question,
              options: [
                { text: q.option_a, value: q.option_a }, // Line 42: Updated value to actual string
                { text: q.option_b, value: q.option_b }, // Line 43: Updated value to actual string
                ...(q.option_c ? [{ text: q.option_c, value: q.option_c }] : []) // Line 44: Updated value to actual string
              ],
              correctAnswer: q.correct_option // Line 45: Updated to match actual string value
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
        console.log(`Question ID: ${questionId}, User Answer: ${answers[questionId]}, Correct Answer: ${q.correctAnswer}`);
        if (answers[questionId] === q.correctAnswer) { // Line 77: Updated to match actual string value
          score++;
        }
        totalQuestions++;
      });
    });
  
    console.log(`Total Questions: ${totalQuestions}, Score: ${score}`);
    return score;
  }

  submitTest(testData: any): Observable<any> {
    return this.getQuestions().pipe(
      switchMap(questions => {
        const score = this.calculateScore(testData.answers, questions);
        const submission = {
          ...testData.personalInfo,
          marksScored: `${score}/${43}`, // Assuming 40 total questions
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