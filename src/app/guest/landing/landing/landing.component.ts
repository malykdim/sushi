import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StorageGourmetService } from 'src/app/services/gourmet/storage-gourmet.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  title = `we deliver delight`;
  gif = `assets/images/home.mp4`;

  constructor(
    private storage: StorageGourmetService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.storage.fetchItems();
  }

  onBrowseMenu() {
    this.router.navigate(['menu'], { relativeTo: this.route});
  }
}
