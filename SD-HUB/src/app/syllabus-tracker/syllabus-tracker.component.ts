import { Component } from '@angular/core';
import { SyllabusService } from '../syllabus.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-syllabus-tracker',
  templateUrl: './syllabus-tracker.component.html',
  styleUrl: './syllabus-tracker.component.css'
})
export class SyllabusTrackerComponent {
  weeksPerBlock = 4;
  currentBlock = 0;
  overallProgress = 0;
  blockProgress = 0;
  isAddingTopic: number | null = null;
  newTopicText = '';

  constructor(public syllabusService: SyllabusService) {
    this.syllabusService.weeks$.subscribe(() => this.calculateProgress());
  }

  get displayedWeeks() {
    const start = this.currentBlock * this.weeksPerBlock;
    const end = start + this.weeksPerBlock;
    return this.syllabusService.allWeeks.slice(start, end);
  }

  nextBlock() {
    if (this.currentBlock === this.totalBlocks - 1) {
      this.syllabusService.addNewWeeks(this.weeksPerBlock);
    }
    this.currentBlock = Math.min(this.currentBlock + 1, this.totalBlocks - 1);
  }

  previousBlock() {
    this.currentBlock = Math.max(this.currentBlock - 1, 0);
  }

  get totalBlocks() {
    return Math.ceil(this.syllabusService.allWeeks.length / this.weeksPerBlock);
  }

  addTopic(week: number) {
    if (this.newTopicText.trim()) {
      this.syllabusService.addTopic(week, this.newTopicText);
      this.isAddingTopic = null;
      this.newTopicText = '';
    }
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data.topics,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data.topics,
        event.container.data.topics,
        event.previousIndex,
        event.currentIndex
      );
      this.syllabusService.moveTopic(
        event.item.data.id,
        event.container.data.week
      );
    }
    this.syllabusService.updateProgress();
  }

  private calculateProgress() {
    const allTopics = this.syllabusService.allTopics;
    const completedTopics = allTopics.filter(t => t.completed).length;
    
    this.overallProgress = allTopics.length > 0 
      ? Math.round((completedTopics / allTopics.length) * 100)
      : 0;

    const blockStart = this.currentBlock * this.weeksPerBlock + 1;
    const blockEnd = blockStart + this.weeksPerBlock - 1;
    const blockTopics = allTopics.filter(t => t.week >= blockStart && t.week <= blockEnd);
    
    this.blockProgress = blockTopics.length > 0
      ? Math.round((blockTopics.filter(t => t.completed).length / blockTopics.length) * 100)
      : 0;
  }
}