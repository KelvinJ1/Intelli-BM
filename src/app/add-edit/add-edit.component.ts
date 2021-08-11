import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

close=true;


  constructor() { }

  ngOnInit(): void {
  }


closeModal(){

return this.close=!this.close;


}



}
