import { Subject } from 'rxjs'
import { createFlagsmithInstance, IFlagsmith } from 'flagsmith'

export function emitEvent(name, data) {
  dispatchEvent(new CustomEvent(name, {
    detail: data,
  }))
}

export function listenEvent(name, cb) {
  window.addEventListener(name, cb)
}

export const counterSubject = new Subject<number>()

const flagsmithSubject = new Subject<IFlagsmith>()

const key = localStorage.getItem("ek");
const flagsmith = createFlagsmithInstance()
flagsmith.init({
  environmentID: key,
  api:"http://localhost:8000/api/v1/",
  onChange: () => {
    flagsmithSubject.next(flagsmith)
    flagsmith.hasFeature
  }
});

flagsmith.startListening(1000)

export { flagsmithSubject };

