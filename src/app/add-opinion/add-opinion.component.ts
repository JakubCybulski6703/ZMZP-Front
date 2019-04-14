import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'zmzp-add-opinion',
  templateUrl: './add-opinion.component.html',
  styleUrls: ['./add-opinion.component.css']
})
export class AddOpinionComponent implements OnInit {
  modalTitle: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.modalTitle = data.title;
    console.log(data);
  }

  ngOnInit() {
  }

}
