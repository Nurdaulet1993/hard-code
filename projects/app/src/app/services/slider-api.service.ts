import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { slides } from '../slides-data';

@Injectable({
  providedIn: 'root'
})
export class SliderApiService {
  slides$ = of(slides);
}
