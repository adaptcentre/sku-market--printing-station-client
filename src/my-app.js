import { inject, EventAggregator } from 'aurelia'
import QrScanner from 'qr-scanner'
import QrScannerWorkerPath from '!!file-loader!qr-scanner/qr-scanner-worker.min.js'
import { ApiService } from './resources/services/api-service'

QrScanner.WORKER_PATH = QrScannerWorkerPath;

@inject(Element, EventAggregator, ApiService)

export class MyApp {
  constructor(element, eventAggregator, apiService) {
    this.element = element
    this.eventAggregator = eventAggregator
    this.apiService = apiService

    this.subs = []
  }

  attached() {

    this.videoElement = document.createElement('video')
    this.canvas = this.element.querySelector('canvas')

    this.qrScanner = new QrScanner(this.videoElement,
      result => {
        // @todo
        //this.qrScanner.stop()
        this.onScan(result)
      }
    )

    this.start()

    let s1 = this.eventAggregator.subscribe('modal-hidden', () => {
      this.qrScanner.start().then(() => {
        this.start()
      })
    })

    this.subs.push(s1)
  }

  tick() {
    let ctx = this.canvas.getContext('2d')

    let vw = this.videoElement.videoWidth
    let vh = this.videoElement.videoHeight

    let cw = this.canvas.width
    let ch = this.canvas.height

    let ww = cw * 2.5
    let hh = ch * 2.5

    let sx = (vw / 2) - (ww / 2)
    let sy = (vh / 2) - (hh / 2)

    let sw = ww
    let sh = hh

    ctx.drawImage(this.videoElement,
      sx, sy,
      sw, sh,
      0,0,
      cw, ch
    )

    this.animationFrame = requestAnimationFrame(() => {
      this.tick()
    })
  }

  async onScan(code) {
    let valid = this.isCodeValid(code)

    if (!valid) {
      return
    }

    console.log('Code is Valid')

    try {
      this.loading = true
      this.stop()

      let response = await this.apiService.print(code)

      if (response && response.success) {
        //open success modal
        console.log('Opening Success Modal')
        this.eventAggregator.publish('success-modal:open', {})
      } else {
        // open error modal
        console.log('Opening Error Modal')
        this.eventAggregator.publish('error-modal:open', {})
      }
    } catch (err) {
      // open error modal
      console.log('Opening Error Modal')
      this.eventAggregator.publish('error-modal:open', {})
    }

    this.loading = false
  }

  isCodeValid(code) {
    if (!code) {
      return false
    }

    if (code.length !== 36) {
      return false
    }

    let split = code.split('-')

    if (split.length !== 5) {
      return false
    }

    return true
  }

  start() {
    this.qrScanner.start().then(() => {
      this.tick()
    })
  }

  stop() {
    this.qrScanner.stop()
    cancelAnimationFrame(this.animationFrame)
  }

  detaching() {
    this.stop()
    this.subs.forEach(sub => sub.dispose())
    this.subs = []
  }
}