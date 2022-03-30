import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EntriesService } from '../entries.service';
import { Entry } from '../entry.model';

@Component({
  selector: 'app-entry-detail',
  templateUrl: './entry-detail.component.html',
  styleUrls: ['./entry-detail.component.css']
})

export class EntryDetailComponent implements OnInit {
  id: string = "";
  entry!: Entry;

  constructor(private route: ActivatedRoute,
    private entriesService: EntriesService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params["id"];
        this.entry = this.entriesService.getEntry(this.id)
      }
    )

    this.entriesService.entryChangedEvent.subscribe(
      (entry: any) => {
        this.entry = entry[0];
      }
    )
  }

  onDelete() {
    console.log(this.entry.id)
    this.entriesService.deleteEntry(this.entry);
    this.router.navigate(['/entries']);
 }

}
