import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  parentForm !: FormGroup;
  
  ngOnInit(): void {
    this.parentForm = this.fb.group({
      child1: this.fb.group({
        firstName: new FormControl('',Validators.required)
      }),
      child2: this.fb.group({
        lastName: ['',Validators.required]
      })
    })
    this.getData();
  }

  onSubmit() {
    console.log('submit',this.parentForm.controls['child1']);
  }

  getData() {
    of({
      firstName: 'Ngoc', 
      lastName: 'Vu'
    }).pipe(delay(2000))
    .subscribe(s => {
      this.parentForm.setValue({
        child1: {firstName: s.firstName},
        child2: {lastName: s.lastName}
      })
    })
  }
}
