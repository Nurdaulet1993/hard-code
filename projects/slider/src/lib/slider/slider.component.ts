import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input, OnDestroy, OnInit,
  signal
} from '@angular/core';
import { Slide } from './slide.model';
import { NgStyle } from '@angular/common';

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
export class SliderComponent implements OnInit, OnDestroy  {
  _slides = input<Slide[]>([], { alias: 'slides'});
  private slides = computed(() => this._slides().sort((a, b) => b.priority -  a.priority));

  autoplay = input<boolean>(false);
  delay = input<number>(3000);
  slidesShow = input(1);
  private timerId: number | null = null;
  private currentIndex = signal(0);

  currentSlides = computed(() =>
    this.slidesShow() + this.currentIndex() > this.slides().length
      ? [...this.slides().slice(this.currentIndex()), ...this.slides().slice(0, this.slidesShow() - (this.slides().length - this.currentIndex()))]
      : this.slides().slice(this.currentIndex(), this.currentIndex() + this.slidesShow())
  );

  ngOnInit(): void {
    if (this.autoplay()) {
      this.timerId = setInterval(() => this.next(), this.delay());
    }
  }

  ngOnDestroy(): void {
    if (this.timerId) clearInterval(this.timerId);
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
