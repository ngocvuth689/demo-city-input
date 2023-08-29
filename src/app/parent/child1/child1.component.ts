import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-child1',
  templateUrl: './child1.component.html',
  styleUrls: ['./child1.component.scss']
})
export class Child1Component implements OnInit {
  form !: FormGroup;
  constructor(private formGroup: FormGroupDirective) { }

  ngOnInit(): void {
    this.form = this.formGroup.control.get('child1') as FormGroup
  }
}
