import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeblock',
  templateUrl: './timeblock.component.html',
  styleUrls: ['./timeblock.component.css']
})
export class TimeblockComponent implements OnInit {

  public documents: any[] = [];
  public selected: any[] = [];
  constructor() { }

  ngOnInit() {
    for (let id = 0; id < 6; id++) {
      this.documents.push({
        id,
        name: `Document ${id}`,
      });
    }
  }


}
