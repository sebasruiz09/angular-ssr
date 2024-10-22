import { Component, OnInit, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: 'page-pricing',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
})
export default class PricingPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('pricing page');
    this.meta.updateTag({
      name: 'description',
      content: 'this is my pricing page',
    });

    this.meta.updateTag({
      name: 'og:title',
      content: 'pricing Page',
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'pricing,test',
    });
  }
}
