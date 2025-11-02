import React, {useEffect, useState, useMemo} from 'react'
import simulator from '../services/simulator'
import MapView from '../components/MapView'
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

function moistureColor(status){
  if(status==='critical') return 'var(--danger)'
  if(status==='low') return 'var(--warning)'
  if(status==='high') return 'orange'
  return 'var(--success)'
}

export default function Dashboard(){
  const [sensors, setSensors] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(()=>{
    const unsub = simulator.subscribe(list => {
      setSensors(list)
      if(!selected) setSelected(list[0])
    })
    return unsub
  },[])

  const chartData = useMemo(()=>{
    if(!selected) return null
    const hist = simulator.getHistory(selected.sensorId, 288)
    return {
      labels: hist.map(h=>new Date(h.timestamp).toLocaleTimeString()),
      datasets: [
        { label: 'Soil moisture (%)', data: hist.map(h=>h.soilMoisture), borderColor:'#2D5016', tension:0.2, fill:true, backgroundColor:'rgba(45,80,22,0.08)'},
        { label: 'Temperature (°C)', data: hist.map(h=>h.temperature), borderColor:'#4A90E2', tension:0.2, yAxisID:'y1' }
      ]
    }
  },[selected, sensors])

  return (
    <div>
      <h2>Live Sensor Dashboard</h2>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:16}}>
        <div>
          <MapView markers={sensors} />
          <div style={{display:'flex',gap:12,marginTop:12}}>
            {sensors.map(s => (
              <div key={s.sensorId} className="card" style={{flex:1,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div style={{fontWeight:700}}>{s.fieldName}</div>
                  <div style={{fontSize:13,color:'#666'}}>{s.sensorId} • {new Date(s.timestamp).toLocaleString()}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontSize:18,fontWeight:700}}>{s.soilMoisture}%</div>
                  <div style={{fontSize:12,color:'#666'}}>{s.status}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="card" style={{marginTop:12}}>
            <h3>Historical trends — {selected?.fieldName}</h3>
            {chartData ? <Line data={chartData} options={{interaction:{mode:'index',intersect:false},scales:{y:{beginAtZero:true},y1:{position:'right',grid:{display:false}}}}} /> : <div>Loading...</div>}
          </div>
        </div>

        <aside>
          <div className="card">
            <h3>Selected Sensor</h3>
            {selected ? (
              <div>
                <div style={{fontWeight:700,fontSize:18}}>{selected.fieldName}</div>
                <div style={{marginTop:8}}>Moisture: <strong>{selected.soilMoisture}%</strong></div>
                <div>Temperature: {selected.temperature}°C</div>
                <div>Humidity: {selected.humidity}%</div>
                <div style={{marginTop:8}}>Status: <span style={{color:moistureColor(selected.status),fontWeight:700}}>{selected.status}</span></div>
              </div>
            ) : <div>Loading...</div>}
          </div>

          <div className="card" style={{marginTop:12}}>
            <h4>Quick Actions</h4>
            <button className="btn">Export current data</button>
            <div style={{height:10}} />
            <button className="btn">Run validation</button>
          </div>

        </aside>
      </div>
    </div>
  )
}
