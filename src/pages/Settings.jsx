import React, {useEffect, useState} from 'react'

const DEFAULTS = { targetMoisture:55, irrigationEfficiency:70, scheduleWindowHours:24, baselineUseLiters:1000 }

export default function Settings(){
  const [cfg, setCfg] = useState(() => {
    try{
      const raw = localStorage.getItem('soilSettings')
      return raw ? JSON.parse(raw) : DEFAULTS
    }catch(e){ return DEFAULTS }
  })

  useEffect(()=>{
    localStorage.setItem('soilSettings', JSON.stringify(cfg))
  },[cfg])

  function update(k,v){ setCfg(prev=>({...prev,[k]:v})) }

  const estimatedPrecisionUse = Math.round(cfg.baselineUseLiters * (cfg.irrigationEfficiency/100))
  const savings = Math.round(100*(1 - (estimatedPrecisionUse/cfg.baselineUseLiters)))

  return (
    <div>
      <h2>Settings & Irrigation Policy</h2>
      <div className="card">
        <label>Target soil moisture (%):</label>
        <input type="number" value={cfg.targetMoisture} onChange={e=>update('targetMoisture', Number(e.target.value))} />
        <div style={{height:8}} />
        <label>Irrigation efficiency (% of water delivered to root zone):</label>
        <input type="number" value={cfg.irrigationEfficiency} onChange={e=>update('irrigationEfficiency', Number(e.target.value))} />
        <div style={{height:8}} />
        <label>Scheduling window (hours):</label>
        <input type="number" value={cfg.scheduleWindowHours} onChange={e=>update('scheduleWindowHours', Number(e.target.value))} />
        <div style={{height:8}} />
        <label>Baseline water use for comparison (liters):</label>
        <input type="number" value={cfg.baselineUseLiters} onChange={e=>update('baselineUseLiters', Number(e.target.value))} />

        <div style={{marginTop:12}}>
          <h4>Estimated impact</h4>
          <div>Estimated precision irrigation use: <strong>{estimatedPrecisionUse} L</strong></div>
          <div>Estimated water savings vs baseline: <strong>{savings}%</strong></div>
        </div>
      </div>

      <div className="card" style={{marginTop:12}}>
        <h4>Policy preview</h4>
        <p>When target moisture falls below <strong>{cfg.targetMoisture}%</strong>, the system will schedule irrigation within <strong>{cfg.scheduleWindowHours} hours</strong> and aim for <strong>{cfg.irrigationEfficiency}%</strong> efficiency.</p>
      </div>
    </div>
  )
}
