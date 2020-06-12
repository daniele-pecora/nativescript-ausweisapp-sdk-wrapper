import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'enter-number',
  templateUrl: './enter-number.component.html',
  styleUrls: ['./enter-number.component.css']
})
export class EnterNumberViewComponent implements OnInit {

  @Input()
  secure: boolean = true
  @Input()
  minLen: number = 6
  @Input()
  maxLen: number = 6
  @Input()
  textHint = 'Enter number'

  inputText

  @Output()
  onCancel: EventEmitter<any> = new EventEmitter<any>()

  @Output()
  onInputText: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  closeButtonPressed(event) {
    if (this.onCancel)
      this.onCancel.emit(event)
  }

  onButtonOK(event) {
    if (this.onInputText) {
      this.onInputText.emit(event)
    }
  }
}
