import { Subject } from 'rxjs'
import { createFlagsmithInstance } from 'flagsmith'

export function emitEvent(name, data) {
  dispatchEvent(new CustomEvent(name, {
    detail: data,
  }))
}

export function listenEvent(name, cb) {
  window.addEventListener(name, cb)
}

export const counterSubject = new Subject<number>()

// const key = localStorage.getItem("fek") || "AzTqDA3W7XiaDLPZkfeNtg";
// const flagsmith = createFlagsmithInstance()
// flagsmith.init({
//   environmentID: key,
//   api:"http://localhost:8000/api/v1/", // set this if you are self hosting, and point it to your API
//   cacheFlags: true, // stores flags in localStorage cache
//   enableAnalytics: true, // See https://docs.flagsmith.com/flag-analytics/ for more info,
// });

// export { flagsmith };

