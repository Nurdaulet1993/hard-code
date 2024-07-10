import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal
} from '@angular/core';
import { Slide } from './slide.model';

@Component({
  selector: 'lib-slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent {
  delay = input<number>(3000);
  _slides = input<Slide[]>([], { alias: 'slides'});
  slides = computed(() => this._slides().sort((a, b) => b.priority -  a.priority));
  currentIndex = signal(0);
  currentSlide = computed(() => this.slides()[this.currentIndex()]);

  prev() {
    this.currentIndex.set(this.currentIndex() - 1);
    if (this.currentIndex() < 0) this.currentIndex.set(this.slides().length - 1);
  }

  next() {
    this.currentIndex.set(this.currentIndex() + 1);
    if (this.currentIndex() >= this.slides().length) this.currentIndex.set(0);
  }
}
