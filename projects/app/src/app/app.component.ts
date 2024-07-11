import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SliderApiService } from './services/slider-api.service';
import { AsyncPipe } from '@angular/common';
import { SliderComponent } from 'slider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    SliderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private readonly sliderApiService = inject(SliderApiService);
  slides$ = this.sliderApiService.slides$;
}
