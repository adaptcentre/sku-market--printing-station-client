import { inject } from 'aurelia'
import QrScanner from 'qr-scanner'
import QrScannerWorkerPath from '!!file-loader!qr-scanner/qr-scanner-worker.min.js'

QrScanner.WORKER_PATH = QrScannerWorkerPath;

@inject(Element)

export class Welcome {
  constructor(element) {
    this.element = element
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

    this.qrScanner.start().then(() => {
      this.start()
    })
  }

  tick() {
    let ctx = this.canvas.getContext('2d')

    let vw = this.videoElement.videoWidth
    let vh = this.videoElement.videoHeight

    let cw = this.canvas.width
    let ch = this.canvas.height

    ctx.drawImage(this.videoElement,
      0, 0,
      vw, vh,
      0,0,
      cw, ch
      //(cw / 2) - (vw / 2), (ch / 2) - (vh / 2),
      //vw, vh
    )

    this.animationFrame = requestAnimationFrame(() => {
      this.tick()
    })
  }

  onScan(code) {
    // @todo

    //check if valid
    //if yes then move to printing screen
    //if no then?
  }

  start() {
    this.tick()
  }

  stop() {
    cancelAnimationFrame(this.animationFrame)
  }
}