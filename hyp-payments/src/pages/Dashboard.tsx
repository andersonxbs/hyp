import Layout from '../Layout'
import { emitEvent, counterSubject, flagsmithSubject } from '@hyp/common'
import { useEffect, useState } from 'react'

const Dashboard = () => { 
  const [hasFlag, setHasFlag] = useState(false)

  useEffect(() => {
    flagsmithSubject.subscribe(flagsmith => {
      console.log('flagsmith called..')
      setHasFlag(flagsmith.hasFeature('show_agenda'))
    })
  }, [])

  const handleClickByCustomEvent = event => {
    emitEvent('@hyp/payments/counter/increment', { incrementalValue: 1 })
  }

  const handleClickByRxjs = event => {
    counterSubject.next(1)
  }

  return (
  <Layout>
    <section className="hero is-dark welcome is-small">
        <div className="hero-body">
            <div className="container">
                <h1 className="title">
                  Payments Dashboard
                </h1>
                <h2 className="subtitle">
                  Example text...
                </h2>                
            </div>
        </div>        
    </section>
    <h3>{hasFlag ? "true" : "false"}</h3>
    <div className="buttons mt-5">
      <button className="button is-info" onClick={handleClickByCustomEvent}>Incrementar utilizando Custom Event</button>
      <button className="button is-success" onClick={handleClickByRxjs}>Incrementar utilizando RxJS</button>
    </div>
  </Layout>
)}

export default Dashboard

function identify(arg0: string) {
  throw new Error('Function not implemented.')
}
