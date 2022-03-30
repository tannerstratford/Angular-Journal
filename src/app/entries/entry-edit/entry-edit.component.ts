import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EntriesService } from '../entries.service';
import { Entry } from '../entry.model';

@Component({
  selector: 'app-entry-edit',
  templateUrl: './entry-edit.component.html',
  styleUrls: ['./entry-edit.component.css']
})
export class EntryEditComponent implements OnInit {
  id!: string;
  editMode: boolean = true;
  originalEntry!: Entry
  entry!: Entry
  imagesList: string[] = []
  image!: String;

  constructor(private route: ActivatedRoute,
    private entriesService: EntriesService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id']
        if (this.id === undefined || this.id === null) {
          console.log("Params undefined or null")
          this.editMode = false
          return
        }

        console.log("Id: " + this.id)
        this.originalEntry = this.entriesService.getEntry(this.id)

        if (this.originalEntry === undefined || this.originalEntry === null) {
          console.log("Original entry undefined or null")
          return
        }
        this.editMode = true
        this.entry = this.originalEntry;
        console.log("Edit mode: " + this.editMode)
        console.log(this.entry);
      })

      this.entriesService.entryChangedEvent.subscribe(
        (entry: any) => {
          this.entry = entry[0];
          this.imagesList = this.entry.images;
          console.log(this.entry)
        }
      )
  }

  onSubmit(form: NgForm) {
    console.log("onSubmit called")
    let value = form.value // get values from form’s fields
    let newEntry = new Entry(value.id, value.title, value.date, value.description, value.location, this.imagesList);

    if (this.editMode == true) {
      this.entriesService.updateEntry(this.entry, newEntry)
    } else {
      this.entriesService.addEntry(newEntry)
    }
    this.router.navigate(['/entries'])
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.imagesList.length) {
       return;
    }
    this.imagesList.splice(index, 1);
  }

  onCancel(){
    this.router.navigate(['/entries'])

  }

  onAddImage(form: NgForm, image: string) {
    console.log("Add image called")
    console.log(form)
    console.log(image)
  
    this.imagesList.push(image)
    console.log(this.imagesList)

    form.value.images = this.imagesList;
    console.log(form.value.images);
    // this.form.push(
    //   new FormGroup({
    //     'name': new FormControl(null, Validators.required),
    //     'amount': new FormControl(null, [
    //       Validators.required,
    //       Validators.pattern(/^[1-9]+[0-9]*$/)
    //     ])
    //   })
    // )
  }

  onDeleteImage(form: NgForm, index: number) {
    this.imagesList.splice(index, 1);
    form.value.images = this.imagesList;
  }

}
