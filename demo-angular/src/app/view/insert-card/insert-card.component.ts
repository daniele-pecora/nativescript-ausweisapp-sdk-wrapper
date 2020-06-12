import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'insert-card',
  templateUrl: './insert-card.component.html',
  styleUrls: ['./insert-card.component.css']
})
export class InsertCardViewComponent implements OnInit {

  @Output()
  onCancel: EventEmitter<any> = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }

  cancelButtonPressed(event) {
    if (this.onCancel)
      this.onCancel.emit(event)
  }
}
