import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html'
})
export class EntriesComponent implements OnInit {
  childRoute: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
