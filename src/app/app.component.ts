import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { forkJoin, of, timer } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cities: City[];
  provinces: City[] = [];
  communes: City[] = [];

  selectedCityCode: string = '';
  selectedProvinceCode: string = '';
  selectedCommuneCode: string = '';
  form = this.fb.group({
    "city": new FormControl("",[Validators.required]),
    "province": new FormControl("",[Validators.required]),
    "commune": new FormControl("",[Validators.required])
  })

  constructor(private fb: FormBuilder) {
    this.cities = [
      {name: 'Hà Nội', code: 'HN'},
      {name: 'Thái Bình', code: 'TB'},
      {name: 'Sài gòn', code: 'SG'}
    ];
    this.onChange();
    this.test();
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
          if (city !== null && city !== '') {
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
          if (province !== null && province !== '') {
            this.getDatas(province.code)
          } else {
            this.selectedCommuneCode = '';
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
  }

  resetCity() {
    this.selectedProvinceCode = '';
    this.selectedCommuneCode = '';
    this.provinces = [];
    this.communes = [];
  }
}
