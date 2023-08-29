import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { forkJoin, of, timer } from 'rxjs';
import { delay, filter, map, switchMap, take } from 'rxjs/operators';

interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-dropdownlist',
  templateUrl: './dropdownlist.component.html',
  styleUrls: ['./dropdownlist.component.scss']
})
export class DropdownlistComponent implements OnInit {
  cities: City[] = [];
  provinces: City[] = [];
  communes: City[] = [];

  form = this.fb.group({
    "city": new FormControl("",[Validators.required]),
    "province": new FormControl("",[Validators.required]),
    "commune": new FormControl("",[Validators.required])
  })

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.cities = [
      {name: 'Hà Nội', code: 'HN'},
      {name: 'Thái Bình', code: 'TB'},
      {name: 'Sài gòn', code: 'SG'}
    ];
    this.onChange();
    this.test();
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log('changes',changes);
  }
  onSubmit() {
    
  }
  observable = forkJoin({
    foo: of(1, 2, 3, 4),
    bar: Promise.resolve(8),
    baz: timer(4000)
  });
  test() {
    // this.observable.subscribe({
    //   next: value => console.log(value),
    //   complete: () => console.log('This is how it ends!'),
    //  });
  }
  onChange() {
    this.form.get('city')?.valueChanges
    .pipe(
        switchMap(city => {
          console.log('x',city);
          if (city) {
            this.getDatas(city.code)
          } else {
            this.resetCity();
          }
          return of(city);
        })
    )
    .subscribe((value) => {
      console.log('city',value);
    });

    this.form.get('province')?.valueChanges
    .pipe(
        switchMap(province => {
          console.log('x',province);
          if (province) {
            this.getDatas(province.code)
          } else {
          this.form.patchValue({
            commune: ''
          })
          this.communes = [];
          }
          return of(province);
        })
    )
    .subscribe((value) => {
      console.log('province',value);
    });
    
    
  }

  getDatas(code: string) {
    setTimeout(() => {
      let res: City[] = [];
      switch (code) {
        case 'HN': 
          this.provinces = [
            {name: 'Cầu Giấy', code: 'CG'},
            {name: 'Hoàng Mai', code: 'HM'},
            {name: 'Tây Hồ', code: 'TH'}
          ];
          break;
        case 'TB':
          this.provinces = [
            {name: 'Tiền Hải', code: 'TH'},
            {name: 'Thái Thụy', code: 'TT'},
            {name: 'Kiến Xương', code: 'KX'}
          ];
        break;
        case 'TH':
          this.communes = [
            {name: 'An Ninh', code: 'AN'},
            {name: 'Thị Trấn', code: 'TT'},
            {name: 'Tây Giang', code: 'TG'}
          ];
        break;
        default:
          break;
      }
      return res;
    },2000);
  }

  getDetail() {
    of({
      city: {name: 'Thái Bình', code: 'TB'},
      province: {name: 'Tiền Hải', code: 'TH'},
      commune: {name: 'An Ninh', code: 'AN'}
    }).pipe(delay(2000)).subscribe(s => {
      console.log('detail',s);
      this.form.setValue({
        city: s.city,
        province: s.province,
        commune: s.commune
      })
    })
  }

  resetCity() {
    this.form.patchValue({
      province: '',
    })
    this.provinces = [];
  }
}
