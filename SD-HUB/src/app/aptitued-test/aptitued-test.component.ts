import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aptitued-test',
  templateUrl: './aptitued-test.component.html',
  styleUrl: './aptitued-test.component.css'
})
export class AptituedTestComponent implements OnInit {
  personalInfoForm: FormGroup;
  isLinear = true;
  
  aptitudeQuestions = [
    {
      section: 'Logical Reasoning',
      questions: [
        {
          id: 'lr1',
          question: 'Complete the series: 2, 5, 10, 17, ?',
          options: [
            { value: 'a', text: '24' },
            { value: 'b', text: '25' },
            { value: 'c', text: '26' }
          ],
          correctAnswer: 'c'
        },
        {
          id: 'lr2',
          question: 'If all Bays are Lakes and some Lakes are Rivers, then all Bays are definitely Rivers. (True/False)',
          options: [
            { value: 'a', text: 'TRUE' },
            { value: 'b', text: 'FALSE' },
          ],
          correctAnswer: 'b'
        },
      ]
    },
    {
      section: 'Problem-solving',
      questions: [
        {
          id: 'ps1',
          question: 'If a population of rabbits doubles every year and starts with 100 rabbits, how many rabbits will there be after 5 years?',
          options: [
            { value: 'a', text: '800' },
            { value: 'b', text: '1600' },
            { value: 'c', text: '3200' }
          ],
          correctAnswer: 'c'
        },
        {
          id: 'ps2',
          question: 'A bird flies 10 miles south, then 5 miles east, and finally 8 miles north. How far is it from its starting point?',
          options: [
            { value: 'a', text: '3 miles' },
            { value: 'b', text: '11.18 miles' },
            { value: 'c', text: '17 miles' },
          ],
          correctAnswer: 'b'
        },
      ]
    },
    {
      section: 'Numerical Aptitude',
      questions: [
        {
          id: 'np1',
          question: 'What is 35% of 240?',
          options: [
            { value: 'a', text: '84' },
            { value: 'b', text: '96' },
            { value: 'c', text: '120' }
          ],
          correctAnswer: 'c'
        },
        {
          id: 'np2',
          question: 'If a car travels at a speed of 60 miles per hour, how far will it travel in 3.5 hours?',
          options: [
            { value: 'a', text: '180 miles' },
            { value: 'b', text: '210 miles' },
            { value: 'c', text: '240 miles' },
          ],
          correctAnswer: 'b'
        },
      ]
    },
    {
      section: 'Pattern Recognition:',
      questions: [
        {
          id: 'pr1',
          question: '8, 13, 21, 34, ? (What comes next?)',
          options: [
            { value: 'a', text: '44' },
            { value: 'b', text: '55' },
            { value: 'c', text: '59' }
          ],
          correctAnswer: 'c'
        },
      ]
    },
    {
      section: 'Verbal Reasoning:',
      questions: [
        {
          id: 'vr1',
          question: 'Choose the word that is most similar in meaning to "abundant":',
          options: [
            { value: 'a', text: 'Sparse' },
            { value: 'b', text: 'Plentiful' },
            { value: 'c', text: 'Scarce' }
          ],
          correctAnswer: 'c'
        },
        {
          id: 'vr2',
          question: ' If all cats are mammals and all mammals are animals, then all cats are animals. (True/False)',
          options: [
            { value: 'a', text: 'True' },
            { value: 'b', text: 'False' },
          ],
          correctAnswer: 'b'
        },
      ]
    },
    {
      section: ' Logical Deduction :',
      questions: [
        {
          id: 'ld1',
          question: 'All apples are fruits. Some fruits are oranges. Therefore, some oranges are apples. (True/False)?',
          options: [
            { value: 'a', text: 'True' },
            { value: 'b', text: 'False' },
          ],
          correctAnswer: 'b'
        },
        {
          id: 'ld2',
          question: 'If all cats are animals and some animals are dogs, then some cats are dogs. (True/False)',
          options: [
            { value: 'a', text: 'True' },
            { value: 'b', text: 'False' },
          ],
          correctAnswer: 'b'
        },
      ]
    },
    {
      section: 'Coding-Decoding:',
      questions: [
        {
          id: 'cd1',
          question: 'If "APPLE" is coded as "CRRNG", what is "ORANGE" coded as?',
          options: [
            { value: 'a', text: 'QTPJKI' },
            { value: 'b', text: 'QTPKJI' },
            { value: 'c', text: 'QTCPIG' },
          ],
          correctAnswer: 'b'
        }
      ]
      },
    {
      section: 'Direction Sense:',
      questions: [
        {
          id: 'ds1',
          question: 'If you start walking north and then turn right, which direction are you facing now?',
          options: [
            { value: 'a', text: 'East' },
            { value: 'b', text: 'South' },
            { value: 'c', text: 'West' },
          ],
          correctAnswer: 'b'
        },
        {
          id: 'ds2',
          question: 'If you start facing east and then turn 90 degrees to your right, what direction are you facing now?',
          options: [
            { value: 'a', text: 'North' },
            { value: 'b', text: 'South' },
            { value: 'c', text: 'West' },
          ],
          correctAnswer: 'b'
        },
      ]
    },
    {
      section: 'Analogies:',
      questions: [
        {
          id: 'a1',
          question: 'Hand is to glove as foot is to ___.',
          options: [
            { value: 'a', text: 'Sock' },
            { value: 'b', text: 'Shoe' },
            { value: 'c', text: 'Sandal' },
          ],
          correctAnswer: 'b'
        },
        {
          id: 'a2',
          question: 'Water is to ice as milk is to ___.',
          options: [
            { value: 'a', text: 'Butter' },
            { value: 'b', text: 'Cream' },
            { value: 'c', text: 'Cheese' },
          ],
          correctAnswer: 'b'
        },
      ]
    },
    {
      section: 'Series Completion:',
      questions: [
        {
          id: 'sc1',
          question: 'Fill in the missing number in the series: 3, 6, 9, 12, ?',
          options: [
            { value: 'a', text: '15' },
            { value: 'b', text: '16' },
            { value: 'c', text: '18' },
          ],
          correctAnswer: 'b'
        },
      ]
    }
  ];

  generalKnowledgeQuestions = [
    {
      section: 'Famous Scientists',
      questions: [
        {
          id: 'fs1',
          question: 'Who is credited with discovering the theory of relativity?',
          options: [
            { value: 'a', text: 'Isaac Newton' },
            { value: 'b', text: 'Albert Einstein' },
            { value: 'c', text: 'Marie Curie' }
          ],
          correctAnswer: 'b'
        },
        {
          id: 'fs2',
          question: 'Who developed the first successful polio vaccine?',
          options: [
            { value: 'a', text: 'Jonas Salk' },
            { value: 'b', text: 'Alexander Fleming' },
            { value: 'c', text: 'Louis Pasteur' }
          ],
          correctAnswer: 'b'
        },
      ]
    },
    {
      section: 'Geography:',
      questions: [
        {
          id: 'g1',
          question: 'What is the capital city of Australia?',
          options: [
            { value: 'a', text: 'Sydney' },
            { value: 'b', text: 'Canberra' },
            { value: 'c', text: 'Melbourne' }
          ],
          correctAnswer: 'b'
        },
        {
          id: 'g2',
          question: 'Which River is the longest in the world?',
          options: [
            { value: 'a', text: 'Nile' },
            { value: 'b', text: 'Amazon' },
            { value: 'c', text: 'Mississippi' }
          ],
          correctAnswer: 'b'
        },
      ]
    },
    {
      section: 'History:',
      questions: [
        {
          id: 'h1',
          question: 'In which year did World War II end?',
          options: [
            { value: 'a', text: '1943' },
            { value: 'b', text: '1945' },
            { value: 'c', text: '1950' }
          ],
          correctAnswer: 'b'
        },
        {
          id: 'h2',
          question: 'Who was the first woman to win a Nobel Prize?',
          options: [
            { value: 'a', text: 'Marie Curie' },
            { value: 'b', text: 'Mother Teresa' },
            { value: 'c', text: 'Florence Nightingale' }
          ],
          correctAnswer: 'b'
        },
      ]
    },
    {
      section: 'Famous Inventions:',
      questions: [
        {
          id: 'fi1',
          question: 'Who invented the telephone?',
          options: [
            { value: 'a', text: 'Alexander Graham Bell' },
            { value: 'b', text: 'Thomas Edison' },
            { value: 'c', text: 'Nikola Tesla' }
          ],
          correctAnswer: 'b'
        },
        {
          id: 'fi2',
          question: 'What year was the first computer invented?',
          options: [
            { value: 'a', text: '1950' },
            { value: 'b', text: '1975' },
            { value: 'c', text: '1945' }
          ],
          correctAnswer: 'b'
        },
      ]
    },
    {
      section: 'Famous Landmarks:',
      questions: [
        {
          id: 'fl1',
          question: 'Where is the Eiffel Tower located?',
          options: [
            { value: 'a', text: 'London, UK' },
            { value: 'b', text: 'Paris, France' },
            { value: 'c', text: 'Rome, Italy' }
          ],
          correctAnswer: 'b'
        },
        {
          id: 'fl2',
          question: 'What is the name of the famous ancient monument located in Egypt?',
          options: [
            { value: 'a', text: 'Colosseum b.' },
            { value: 'b', text: 'Taj Mahal' },
            { value: 'c', text: 'Pyramids of Giza' }
          ],
          correctAnswer: 'b'
        },
      ]
    },
    {
      section: 'Sports:',
      questions: [
        {
          id: 's1',
          question: 'In which sport would you perform a slam dunk?',
          options: [
            { value: 'a', text: 'Basketball' },
            { value: 'b', text: 'Tennis' },
            { value: 'c', text: 'Soccer' }
          ],
          correctAnswer: 'b'
        },
        {
          id: 's2',
          question: 'Who won the FIFA World Cup in 2018?',
          options: [
            { value: 'a', text: 'Brazil' },
            { value: 'b', text: 'France' },
            { value: 'c', text: 'Germany' }
          ],
          correctAnswer: 'b'
        },
      ]
    },
    {
      section: 'Technology:',
      questions: [
        {
          id: 't1',
          question: 'What does "www" stand for in a website address? ',
          options: [
            { value: 'a', text: 'World War Web' },
            { value: 'b', text: 'World Wide Web' },
            { value: 'c', text: 'Web World Wide' }
          ],
          correctAnswer: 'b'
        },
        {
          id: 't2',
          question: 'Who founded Microsoft Corporation?',
          options: [
            { value: 'a', text: 'Bill Gates' },
            { value: 'b', text: 'Steve Jobs' },
            { value: 'c', text: 'Mark Zuckerberg' }
          ],
          correctAnswer: 'b'
        },
      ]
    },
    {
      section: 'Current Affairs:',
      questions: [
        {
          id: 'ca1',
          question: 'Who is the current president of the United States?',
          options: [
            { value: 'a', text: 'Joe Biden' },
            { value: 'b', text: 'Donald Trump' },
            { value: 'c', text: 'Barack Obama' }
          ],
          correctAnswer: 'b'
        },
        {
          id: 'ca2',
          question: 'What is the name of the current Secretary-General of the United Nations?',
          options: [
            { value: 'a', text: 'Angela Merkel' },
            { value: 'b', text: 'Ban Ki-moon' },
            { value: 'c', text: 'António Guterres' }
          ],
          correctAnswer: 'b'
        },
      ]
    },
  ];

  criticalThinkingQuestions = [
    {
      section: 'Analyzing Arguments',
      questions: [
        {
          id: 'aa1',
          question: 'In an argument about the benefits of recycling, what is the main point being made?',
          options: [
            { value: 'i', text: 'Recycling reduces pollution.' },
            { value: 'ii', text: 'Recycling helps conserve natural resources.' },
            { value: 'iii', text: 'Recycling is inconvenient.' }
          ],
          correctAnswer: 'ii'
        },
      ]
    },
    {
      section: 'Identifying Logical Fallacies:',
      questions: [
        {
          id: 'ilf1',
          question: `What logical fallacy is present in the statement: "If you don't like the movie, you must not have good taste in films."`,
          options: [
            { value: 'i', text: 'Ad hominem' },
            { value: 'ii', text: 'Straw man' },
            { value: 'iii', text: 'False cause' }
          ],
          correctAnswer: 'ii'
        },
      ]
    },
    {
      section: 'Valuating Evidence:',
      questions: [
        {
          id: 've1',
          question: 'Which Evidence statement best evaluates the reliability of the claim: "Studies show that people who eat breakfast are more productive throughout the day"?',
          options: [
            { value: 'i', text: 'The claim is reliable because it is based on scientific studies.' },
            { value: 'ii', text: 'The claim is unreliable because it lacks specific evidence or sources.' },
            { value: 'iii', text: 'The claim is unreliable because it is based on personal anecdotes.' }
          ],
          correctAnswer: 'ii'
        },
      ]
    },
    {
      section: 'Problem-solving:',
      questions: [
        {
          id: 'prso1',
          question: 'What is the best way to transport a fragile item safely across town?',
          options: [
            { value: 'i', text: 'Wrap it in bubble wrap and place it in a sturdy box.' },
            { value: 'ii', text: "Carry it in your hands to ensure it doesn't break." },
            { value: 'iii', text: 'Place it loosely in a bag to prevent damage.' }
          ],
          correctAnswer: 'ii'
        },
      ]
    },
    {
      section: 'Analogical Reasoning:',
      questions: [
        {
          id: 'ar1',
          question: '"Books are to knowledge as exercise is to _____."',
          options: [
            { value: 'i', text: 'Fitness' },
            { value: 'ii', text: 'Learning' },
            { value: 'iii', text: 'Health' }
          ],
          correctAnswer: 'ii'
        },
      ]
    },
    {
      section: 'Interpreting Data:',
      questions: [
        {
          id: 'td1',
          question: "The temperatures for a week in a city are as follows:-  Day Temperature (in Degree Celsius)Monday: 42Tuesday: 40Wednesday: 41Thursday: 39Friday: 35Saturday: 38Sunday: 37On how many days is the temperature higher than the average temperature for the week?",
          options: [
            { value: 'i', text: '3' },
            { value: 'ii', text: '4' },
            { value: 'iii', text: '5' }
          ],
          correctAnswer: 'ii'
        },
      ]
    },
    {
      section: 'Identifying Assumptions:',
      questions: [
        {
          id: 'ia1',
          question: ' You read an article claiming that all students who study computer science end up with high-paying jobs. What assumption might the author be making in this statement?',
          options: [
            { value: 'i', text: 'That all students study computer science.' },
            { value: 'ii', text: 'That high-paying jobs are available for computer science graduates.' },
            { value: 'iii', text: 'That studying computer science guarantees a high-paying job.' }
          ],
          correctAnswer: 'ii'
        },
      ]
    },
    {
      section: 'Constructing Arguments:',
      questions: [
        {
          id: 'car1',
          question: 'Should schools have longer recess periods? What is a possible reason to support this idea?',
          options: [
            { value: 'i', text: 'Longer recess periods allow students to socialize and refresh their minds.' },
            { value: 'ii', text: 'Longer recess periods disrupt the school day.' },
            { value: 'iii', text: 'Longer recess periods make students lazy.' }
          ],
          correctAnswer: 'ii'
        },
      ]
    },
    {
      section: 'Predicting Outcomes:',
      questions: [
        {
          id: 'po1',
          question: 'Suppose you leave your umbrella at home on a cloudy day. What do you predict will happen?',
          options: [
            { value: 'i', text: 'It will rain heavily.' },
            { value: 'ii', text: 'It will be sunny.' },
            { value: 'iii', text: 'It will remain cloudy but not rain.' }
          ],
          correctAnswer: 'ii'
        },
      ]
    },
    {
      section: 'Ethical Reasoning:',
      questions: [
        {
          id: 'er1',
          question: 'Your friend asks you to lie to their parents about where they were last night. What would you do in this situation?',
          options: [
            { value: 'i', text: 'Lie to the parents to protect your friend' },
            { value: 'ii', text: 'Refuse to lie and encourage your friend to tell the truth.' },
            { value: 'iii', text: 'Lie to the parents to avoid conflict with your friend.' }
          ],
          correctAnswer: 'ii'
        },
      ]
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
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
  }

  onSubmit() {
    if (this.personalInfoForm.valid) {
      const testData = {
        ...this.personalInfoForm.value,
      };
    }
  }
}