import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input, OnInit,
  signal
} from '@angular/core';
import { Slide } from './slide.model';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'lib-slider',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnInit {
  _slides = input<Slide[]>([], { alias: 'slides'});
  private slides = computed(() => this._slides().sort((a, b) => b.priority -  a.priority));

  delay = input<number>(2000);
  slidesShow = input(1);
  private currentIndex = signal(0);

  currentSlides = computed(() => {
    if (this.slidesShow() + this.currentIndex() > this.slides().length) {
      return [...this.slides().slice(this.currentIndex()), ...this.slides().slice(0, this.slidesShow() - (this.slides().length - this.currentIndex()))];
    }
    return this.slides().slice(this.currentIndex(), this.currentIndex() + this.slidesShow());
  });

  ngOnInit(): void {
    // setInterval(() => this.next(), this.delay());
  }

  prev() {
    this.currentIndex.set(this.currentIndex() - 1);
    if (this.currentIndex() < 0) this.currentIndex.set(this.slides().length - 1);
  }

  next() {
    this.currentIndex.set(this.currentIndex() + 1);
    if (this.currentIndex() >= this.slides().length) this.currentIndex.set(0);
  }

  getSlideUrl(url: string) {
    return `url('${url}')`
  }
}
