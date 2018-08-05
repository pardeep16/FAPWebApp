import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  sprints_cyc = [
    {text: 'Sprint 1', color: '#30A9F4'},
    {text: 'Two', color: '#30A9F4'},
    {text: 'Three', color: '#30A9F4'},
    {text: 'Four', color: '#30A9F4'},
  ];

  sprints=["Sprint 1","Sprint 2"];

  private selectedSprint:string;
  private selectedGrid:string;

  constructor() { }

  ngOnInit() {
  }

  selectedItem(item){
    console.log(item.text);
  }

}
