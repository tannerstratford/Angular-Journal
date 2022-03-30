import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EntryDetailComponent } from './entries/entry-detail/entry-detail.component';
import { EntryListComponent } from './entries/entry-list/entry-list.component';
import { EntryItemComponent } from './entries/entry-item/entry-item.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { EntryEditComponent } from './entries/entry-edit/entry-edit.component';
import { EntriesComponent } from './entries/entries.component';
import { HttpClientModule } from '@angular/common/http';
import { EntriesFilterPipe } from './entries/entries-filter.pipe'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EntriesComponent,
    EntryDetailComponent,
    EntryListComponent,
    EntryItemComponent,
    EntryEditComponent,
    HeaderComponent,
    EntriesFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
