import Layout from '../Layout'
import { emitEvent, counterSubject } from '@hyp/common'

const Dashboard = () => { 
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

    <div className="buttons mt-5">
      <button className="button is-info" onClick={handleClickByCustomEvent}>Incrementar utilizando Custom Event</button>
      <button className="button is-success" onClick={handleClickByRxjs}>Incrementar utilizando RxJS</button>
    </div>
  </Layout>
)}

export default Dashboard