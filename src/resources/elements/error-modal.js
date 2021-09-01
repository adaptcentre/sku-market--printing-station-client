import { inject, EventAggregator } from 'aurelia'
import * as bootstrap from 'bootstrap'

@inject(Element, EventAggregator)

export class ErrorModal {
  constructor(element, eventAggregator) {
    this.element = element
    this.eventAggregator = eventAggregator
    this.time = 10
    this.subs = []
  }

  attached() {
    this.modalElement = this.element.querySelector('.modal')
    this.modal = new bootstrap.Modal(this.modalElement)


    let s1 = this.eventAggregator.subscribe('error-modal:open', () => {
      this.modal.show()
    })

    let s2 = this.eventAggregator.subscribe('error-modal:close', () => {
      this.modal.hide()
    })

    this.subs.push(s1, s2)

    this.modalElement.addEventListener('shown.bs.modal', () => {
      console.log(`Hiding error model in: ${this.time}s`)

      setTimeout(() => {
        this.modal.hide()
        this.eventAggregator.publish('modal-hidden', {})
      }, 1000 * this.time)
    })
  }

  detaching() {
    this.modal.dispose()

    this.subs.forEach(sub => sub.dispose())
    this.subs = []
  }
}