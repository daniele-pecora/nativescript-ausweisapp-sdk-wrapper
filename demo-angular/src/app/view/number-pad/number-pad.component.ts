import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'number-pad',
  templateUrl: './number-pad.component.html',
  styleUrls: ['./number-pad.component.css']
})
export class NumberPadComponent implements OnInit, OnChanges {

  @Input()
  minLen: number
  @Input()
  maxLen: number

  @Input()
  inputText
  @Output()
  inputTextChange: EventEmitter<string> = new EventEmitter<string>()

  text = ''

  enableClear = true
  enableBackspace = true
  enableOK = true
  enableNumbers = true

  @Output()
  onButtonOK = new EventEmitter<string>()

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.inputText) {
      if (changes.inputText.currentValue !== changes.inputText.previousValue) {
        this.text = changes.inputText.currentValue || ''
      }
    }
  }

  ngOnInit(): void {
    setTimeout(this.updateState, 0)
  }

  onTap(event: any, buttonId: string) {
    console.log('onTAP', buttonId)
    if ('OK' === buttonId) {
      this.numOk(buttonId)
    } else if ('Del' === buttonId) {
      this.numBackspace(buttonId)
    } else if ('Clear' === buttonId) {
      this.numClear(buttonId)
    } else {
      this.numAddValue(buttonId)
    }

  }

  updateState() {
    let enableOK = false

    this.enableBackspace = this.text.length > 0
    this.enableClear = this.text.length > 0

    if (-1 == this.minLen && -1 == this.maxLen) {
      enableOK = this.text.length > 0
    } else if (-1 !== this.minLen && -1 !== this.maxLen) {
      enableOK = this.text.length <= this.maxLen && this.text.length >= this.minLen
    } else if (-1 === this.minLen) {
      enableOK = this.text.length <= this.maxLen
    } else if (-1 === this.maxLen) {
      enableOK = this.text.length >= this.minLen
    }
    this.enableOK = enableOK

    this.enableNumbers = (-1 === this.maxLen || `${this.text}`.length < this.maxLen)

    console.log('this.text (before)', this.text)
    if (this.inputTextChange)
      this.inputTextChange.emit(this.text)

    console.log('this.text', this.text)
  }

  numAddValue(buttonId: string) {
    if (-1 !== this.maxLen && `${this.text}`.length >= this.maxLen) {
      return
    }
    this.text = this.text + buttonId
    this.updateState()
  }

  numOk(buttonId: string) {
    this.updateState()
    if (this.onButtonOK)
      this.onButtonOK.emit(this.text)
  }

  numClear(buttonId: string) {
    this.text = ""
    this.updateState()
  }

  numBackspace(buttonId: string) {
    if (this.text.length > 0) {
      this.text = this.text.substring(0, this.text.length - 1)
      this.updateState()
    }
  }
}