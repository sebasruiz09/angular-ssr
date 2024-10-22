import { Component, inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'page-about',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
})
export default class AboutPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('about page');
    this.meta.updateTag({
      name: 'description',
      content: 'this is my about page',
    });

    this.meta.updateTag({
      name: 'og:title',
      content: 'About Page',
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'about,test',
    });
  }
}
