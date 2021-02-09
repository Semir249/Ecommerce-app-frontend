import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  @Input() starId;
  @Input() rating;

  @Output() starEnter:EventEmitter<number>=new EventEmitter<number>();
  @Output() starLeave:EventEmitter<number>=new EventEmitter<number>();
  @Output() starClicked:EventEmitter<number>=new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  onStarEnter(){
    this.starEnter.emit(this.starId);
  }

  onStarLeave(){
    this.starLeave.emit();
  }

  onStarClicked(){
    this.starClicked.emit(this.starId);
  }

}
