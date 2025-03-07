import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface SyllabusTopic {
  id: number;
  title: string;
  week: number;
  completed: boolean;
}

interface WeekColumn {
  week: number;
  topics: SyllabusTopic[];
  completionPercentage: number;
}

@Injectable({ providedIn: 'root' })
export class SyllabusService {
  private weeks = new BehaviorSubject<WeekColumn[]>(this.generateWeeks(4));
  weeks$ = this.weeks.asObservable();

  get allWeeks() { return this.weeks.value; }
  get allTopics() { return this.weeks.value.flatMap(w => w.topics); }

  private generateWeeks(count: number) {
    return Array.from({length: count}, (_, i) => ({
      week: i + 1,
      topics: [],
      completionPercentage: 0
    }));
  }

  addNewWeeks(count: number) {
    const lastWeek = this.weeks.value[this.weeks.value.length - 1].week;
    const newWeeks = Array.from({length: count}, (_, i) => ({
      week: lastWeek + i + 1,
      topics: [],
      completionPercentage: 0
    }));
    this.weeks.next([...this.weeks.value, ...newWeeks]);
  }

  addTopic(week: number, title: string) {
    const newTopic: SyllabusTopic = {
      id: Date.now(),
      title,
      week,
      completed: false
    };
    const updatedWeeks = this.weeks.value.map(w => 
      w.week === week ? { ...w, topics: [...w.topics, newTopic] } : w
    );
    this.updateWeeks(updatedWeeks);
  }

  deleteTopic(topicId: number) {
    const updatedWeeks = this.weeks.value.map(week => ({
      ...week,
      topics: week.topics.filter(t => t.id !== topicId)
    }));
    this.updateWeeks(updatedWeeks);
  }

  moveTopic(topicId: number, newWeek: number) {
    const updatedWeeks = this.weeks.value.map(week => ({
      ...week,
      topics: week.topics.filter(t => t.id !== topicId)
    }));
    
    const topic = this.allTopics.find(t => t.id === topicId);
    if (topic) {
      const targetWeek = updatedWeeks.find(w => w.week === newWeek);
      if (targetWeek) {
        targetWeek.topics.push({ ...topic, week: newWeek });
      }
    }
    this.updateWeeks(updatedWeeks);
  }

  toggleComplete(topicId: number) {
    const updatedWeeks = this.weeks.value.map(week => ({
      ...week,
      topics: week.topics.map(t => 
        t.id === topicId ? { ...t, completed: !t.completed } : t
      )
    }));
    this.updateWeeks(updatedWeeks);
  }

  updateProgress() {
    const updatedWeeks = this.weeks.value.map(week => ({
      ...week,
      completionPercentage: this.calculateWeekCompletion(week.topics)
    }));
    this.weeks.next(updatedWeeks);
  }

  private updateWeeks(weeks: WeekColumn[]) {
    const withCompletion = weeks.map(week => ({
      ...week,
      completionPercentage: this.calculateWeekCompletion(week.topics)
    }));
    this.weeks.next(withCompletion);
  }

  private calculateWeekCompletion(topics: SyllabusTopic[]): number {
    if (topics.length === 0) return 0;
    const completed = topics.filter(t => t.completed).length;
    return Math.round((completed / topics.length) * 100);
  }
}