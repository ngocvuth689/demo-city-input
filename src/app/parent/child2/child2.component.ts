import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-child2',
  templateUrl: './child2.component.html',
  styleUrls: ['./child2.component.scss']
})
export class Child2Component implements OnInit {
  form !: FormGroup;
  constructor(private formGroup: FormGroupDirective) { }

  ngOnInit(): void {
    this.form = this.formGroup.control.get('child2') as FormGroup
  }

}
