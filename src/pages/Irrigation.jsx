import React, {useEffect, useState} from 'react'
import simulator from '../services/simulator'

export default function Irrigation(){
  const [sensors, setSensors] = useState([])

  useEffect(()=>{
    const unsub = simulator.subscribe(list => setSensors(list))
    return unsub
  },[])

  return (
    <div>
      <h2>Irrigation Decision Support</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:16}}>
        <div>
          <div className="card">
            <h4>Field Recommendations</h4>
            {sensors.map(s => {
              const rec = simulator.getIrrigationRecommendation(s)
              return (
                <div key={s.sensorId} className="card" style={{marginBottom:10}}>
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <div>
                      <div style={{fontWeight:700}}>{s.fieldName}</div>
                      <div style={{fontSize:12,color:'#666'}}>{s.sensorId}</div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{fontWeight:700}}>{s.soilMoisture}%</div>
                      <div style={{fontSize:12}}>{rec.priority}</div>
                    </div>
                  </div>
                  <div style={{marginTop:8}}>
                    <div>Water deficit: <strong>{rec.waterDeficit} L</strong></div>
                    <div>Action: {rec.recommendedAction} • Est. duration: {rec.estimatedDuration}</div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="card" style={{marginTop:12}}>
            <h4>Forecast (3 days)</h4>
            <p>Predictive moisture forecast visual (mock) — shows likely trend and recommended irrigation windows.</p>
          </div>
        </div>

        <aside>
          <div className="card">
            <h4>Water savings calculator</h4>
            <div>Traditional irrigation use: 1000 L</div>
            <div>Precision irrigation estimate: 560 L</div>
            <div style={{fontWeight:700,marginTop:8}}>Savings: 44%</div>
          </div>

          <div className="card" style={{marginTop:12}}>
            <h4>Alerts</h4>
            <div>Critical moisture alerts will appear here when sensors report critical values.</div>
          </div>
        </aside>
      </div>
    </div>
  )
}
