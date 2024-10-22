import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'page-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact-page.component.html',
})
export default class ContactPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  //private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    //if(isPlatformBrowser(this.platform))
    this.title.setTitle('contact page');
    this.meta.updateTag({
      name: 'description',
      content: 'this is my contact page',
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'contact Page',
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'contact,test',
    });
  }
}
