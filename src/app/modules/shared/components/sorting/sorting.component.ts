import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent implements OnInit {
  @Input() sortingDesc = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
