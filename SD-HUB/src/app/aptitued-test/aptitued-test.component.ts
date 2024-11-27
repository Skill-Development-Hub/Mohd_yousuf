import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AptitudeService } from '../services/aptitude.service';
import { error } from 'console';

@Component({
  selector: 'app-aptitued-test',
  templateUrl: './aptitued-test.component.html',
  styleUrl: './aptitued-test.component.css'
})
export class AptituedTestComponent implements OnInit {
  personalInfoForm: FormGroup;
  isLinear = true;
  aptitudeQuestions: any = [];
  generalKnowledgeQuestions: any = [];
  criticalThinkingQuestions: any = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private AptitudeService: AptitudeService
  ) {
    this.personalInfoForm = this.formBuilder.group({
      email: ['',],
      fullName: [''],
      gender: [''],
      phoneNumber: [''],
      courseApplied: ['']
    });
  }

  ngOnInit() {
    this.AptitudeService.getQuestions().subscribe({
      next: (value) => {
        // console.log(value);
        this.aptitudeQuestions = value.filter((each: any) => { return each.aptitudeQuestions })[0]['aptitudeQuestions'];
        this.generalKnowledgeQuestions = value.filter((each: any) => { return each.generalKnowledgeQuestions })[0]['generalKnowledgeQuestions'];
        this.criticalThinkingQuestions = value.filter((each: any) => { return each.criticalThinkingQuestions})[0]['criticalThinkingQuestions'];

        // console.log(
        //   "AptitudeQuestions: ",this.aptitudeQuestions,
        //   "GeneralQuestions: ", this.generalKnowledgeQuestions,
        //   "CriticalThinking: ", this.criticalThinkingQuestions
        // )

      },
      error: (err) => {
        console.log(err);
        
      },
      complete: () => {
        console.log("Successfully fetched Questions");
      },
    })
  }

  onSubmit() {
    if (this.personalInfoForm.valid) {
      const testData = {
        ...this.personalInfoForm.value,
      };
    }
  }
}