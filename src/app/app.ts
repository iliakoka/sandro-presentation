import { Component, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface VideoSlide {
  id: string;
  title: string;
  label: string;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(private sanitizer: DomSanitizer) {}

  videos: VideoSlide[] = [
    {
      id: '-cTJqNWwmf0',
      title: 'Mitsubishi Lancer Evolution VI — ვიდეო 1',
      label: 'EVO VI · სარბოლო ტრასა'
    },
    {
      id: 'WeLm7wHvdxQ',
      title: 'Mitsubishi Lancer Evolution VI — ვიდეო 2',
      label: 'EVO VI · სიჩქარე და ხმა'
    }
  ];

  activeIndex = signal(0);

  prev() {
    this.activeIndex.update(i => (i - 1 + this.videos.length) % this.videos.length);
  }

  next() {
    this.activeIndex.update(i => (i + 1) % this.videos.length);
  }

  goTo(index: number) {
    this.activeIndex.set(index);
  }

  getEmbedUrl(id: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`
    );
  }
}
