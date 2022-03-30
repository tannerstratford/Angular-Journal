import { Injectable } from '@angular/core';
import { Entry } from './entry.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {
  entries: Entry[] = [];
  entryListChangedEvent = new Subject<Entry[]>();
  entryChangedEvent = new Subject<Entry>();
  entry!: Entry;

  constructor(private http: HttpClient) { }

  getEntries(): Entry[] {
    console.log("Entry service get entries called")
    this.http.get<Entry[]>('http://localhost:3000/entries')
      .subscribe(
        // success method
        (entryList: any) => {
          console.log("get entries called")
          this.entries = entryList["allEntries"];
          this.entryListChangedEvent.next(this.entries.slice());
        },
        // error method
        (error: any) => {
          console.log(error);
        })
        console.log("entries slice " + this.entries.slice())
        
        return this.entries.slice();
  }

  getEntry(id: string): Entry {
    console.log("Entry service get entry called")
    this.http.get<Entry>('http://localhost:3000/entries/' + id)
      .subscribe(
        // success method
        (entry: any) => {
          console.log("get entry called")
          this.entry = entry["entry"];
          this.entryChangedEvent.next(this.entry);

          //console.log(this.entry);
          console.log("service entry: " + JSON.stringify(this.entry));
        },
        // error method
        (error: any) => {
          console.log(error);
        })
        
        return this.entry;
  }

  addEntry(entry: Entry) {
    if (!entry) {
      return;
    }
  
    // make sure id of the new entry is empty
    entry.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    // add to database
    this.http.post<{ message: string, entry: Entry }>('http://localhost:3000/entries',
      entry,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new entry to entries
          this.entries.push(responseData.entry);
          this.entryListChangedEvent.next(this.entries.slice());
        }
      );
  }
  
  updateEntry(originalEntry: Entry, newEntry: Entry) {
    if (!originalEntry || !newEntry) {
      return;
    }
  
    const pos = this.entries.findIndex(d => d.id === originalEntry.id);
  
    if (pos < 0) {
      return;
    }
  
    // set the id of the new entry to the id of the old entry
    newEntry.id = originalEntry.id;
    //newentry._id = originalentry._id;
  
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    // update database
    this.http.put('http://localhost:3000/entries/' + originalEntry.id,
      newEntry, { headers: headers })
      .subscribe(
        () => {
          this.entries[pos] = newEntry;
          this.entryListChangedEvent.next(this.entries.slice());
        }
      );
  }

  deleteEntry(entry: Entry) {

    if (!entry) {
      return;
    }
  
    const pos = this.entries.findIndex(d => d.id === entry.id);
  
    if (pos < 0) {
      return;
    }
  
    // delete from database
    this.http.delete('http://localhost:3000/entries/' + entry.id)
      .subscribe(
        () => {
          this.entries.splice(pos, 1);
          this.entryListChangedEvent.next(this.entries.slice());
        }
      );
  }
}
