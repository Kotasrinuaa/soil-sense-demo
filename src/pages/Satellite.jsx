import React, {useState} from 'react'
import simulator from '../services/simulator'
import MapView from '../components/MapView'

export default function Satellite(){
  const dates = simulator.listSatelliteDates()
  const [date, setDate] = useState(dates[0])
  const [sat, setSat] = useState('Sentinel-2')
  const [overlay, setOverlay] = useState(true)
  const mock = simulator.getSatelliteMock({sat,date})

  return (
    <div>
      <h2>Satellite Data Viewer</h2>
      <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}>
        <label>Date: <select value={date} onChange={e=>setDate(e.target.value)}>{dates.map(d=> <option key={d} value={d}>{d}</option>)}</select></label>
        <label style={{marginLeft:12}}>Satellite: <select value={sat} onChange={e=>setSat(e.target.value)}><option>Sentinel-2</option><option>Sentinel-1</option><option>Landsat-8</option></select></label>
        <label style={{marginLeft:12}}><input type="checkbox" checked={overlay} onChange={e=>setOverlay(e.target.checked)} /> Overlay sensor locations</label>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 420px',gap:16}}>
        <div className="card">
          <h3>{sat} — {date}</h3>
          <div dangerouslySetInnerHTML={{__html: mock.svg}} />
        </div>
        <div>
          <div className="card">
            <h4>NDVI & Soil Moisture</h4>
            <div>NDVI mean: <strong>{mock.ndviMean}%</strong></div>
            <div>Satellite soil moisture estimate: <strong>{mock.moistureEst}%</strong></div>
          </div>
          <div style={{height:12}} />
          {overlay && <MapView markers={simulator.sensorsList().map(s=> ({...s, soilMoisture: Math.round(30+Math.random()*40), temperature:20+Math.round(Math.random()*6), humidity:60+Math.round(Math.random()*20), timestamp:new Date().toISOString()}))} />}
        </div>
      </div>

      <div className="card" style={{marginTop:12}}>
        <h4>Comparison</h4>
        <div style={{display:'flex',gap:12}}>
          <div style={{flex:1}} className="card">Ground truth vs Satellite comparison visualization (interactive)</div>
          <div style={{width:240}} className="card">Preprocessing info: atmospheric correction, cloud mask, co-registration steps</div>
        </div>
      </div>
    </div>
  )
}
