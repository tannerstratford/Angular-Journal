export class Entry {
    constructor (
                 public id: string,
                 public title: string,
                 public date: Date,
                 public description: string,
                 public location: string,
                 public images: string[]
    ) { }
 }