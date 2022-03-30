import { Pipe, PipeTransform } from '@angular/core';
import { Entry } from './entry.model';

@Pipe({
  name: 'entriesFilter'
})
export class EntriesFilterPipe implements PipeTransform {

  transform(entries: Entry[], term: string) { 
    let filteredEntries: Entry[] = [];
    let completeFilteredEntries: Entry[] = [];
    let filteredTitles: Entry[] =[];  
    let filteredDates: Entry[] = [];
    if (term && term.length > 0) {
       filteredTitles = entries.filter(
          (entry:Entry) => entry.title.toLowerCase().includes(term.toLowerCase()));

       filteredDates = entries.filter(
          (entry:Entry) => entry.date.toString().includes(term));

       filteredEntries = filteredTitles.concat(filteredDates);
       completeFilteredEntries = [...new Set(filteredEntries)];
    }
    if (term == ""){
       return entries;
    }
    return completeFilteredEntries;
  }
}
