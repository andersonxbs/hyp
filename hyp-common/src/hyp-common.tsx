import { Subject } from 'rxjs'

export function emitEvent(name, data) {
  dispatchEvent(new CustomEvent(name, {
    detail: data,
  }))
}

export function listenEvent(name, cb) {
  window.addEventListener(name, cb)
}

export const counterSubject = new Subject<number>()
