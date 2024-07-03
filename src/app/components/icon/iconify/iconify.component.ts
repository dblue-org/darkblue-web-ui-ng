import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'iconify',
  standalone: true,
  imports: [],
  templateUrl: './iconify.component.html',
  styleUrl: './iconify.component.css'
})
export class IconifyComponent implements OnInit {

  @Input('size') size: number = 32;

  @Input()
  set icon(icon: string) {
    const sections = icon.split(':');
    if (sections.length == 2) {
      this.prefix = sections[0];
      this.name = sections[1];
    }
  }

  @Input('color') color!: string;
  raw?: string
  prefix?: string;
  name?: string;

  ngOnInit(): void {
    this.loadSvgRaw();
  }

  constructor(private http: HttpClient, private el: ElementRef, private render: Renderer2) {
  }

  loadSvgRaw() {
    const url = `https://api.iconify.design/${this.prefix}/${this.name}.svg?&width=${this.size}`

    this.http.get(url, {responseType: 'text'}).subscribe(text => {
      this.raw = text;
      const hostElement = this.el.nativeElement;
      this.render.setProperty(hostElement, 'innerHTML', this.raw);
      if (this.color) {
        this.render.setStyle(hostElement, 'color', this.color);
      }
      this.render.setStyle(hostElement, 'height', this.size + 'px' );
      this.render.setStyle(hostElement, 'width', this.size + 'px' );
    })
  }
}
