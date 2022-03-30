import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntriesService } from '../entries.service';
import { Entry } from '../entry.model';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {
  entries: Entry[] = []
  subscription: Subscription = new Subscription;
  term: string = "";

  constructor(private entriesService: EntriesService) { }

  ngOnInit(): void {
    console.log("contacts list called")
    this.entries = this.entriesService.getEntries();
    this.subscription = this.entriesService.entryListChangedEvent.subscribe(
      (entriesList: Entry[]) => {
        this.entries = entriesList;
      }
    )
  }

  search(value: string){
    this.term = value;
  }

}
