import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EntriesService } from '../entries.service';
import { Entry } from '../entry.model';

@Component({
  selector: 'app-entry-item',
  templateUrl: './entry-item.component.html',
  styleUrls: ['./entry-item.component.css']
})
export class EntryItemComponent implements OnInit {
  @Input()
  entry!: Entry;
  id!: string;
  editMode: boolean = false;
  originalEntry!: Entry;

  constructor(private route: ActivatedRoute,
    private entriesService: EntriesService) { }

  ngOnInit(): void {
  }

}
