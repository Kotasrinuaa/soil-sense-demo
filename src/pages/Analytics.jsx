import React, {useEffect, useState} from 'react'
import simulator from '../services/simulator'
import Papa from 'papaparse'

export default function Analytics(){
  const [sensors, setSensors] = useState([])

  useEffect(()=>{
    const unsub = simulator.subscribe(list => setSensors(list))
    return unsub
  },[])

  function exportCSV(){
    const rows = []
    sensors.forEach(s => rows.push({sensorId:s.sensorId, fieldName:s.fieldName, moisture:s.soilMoisture, temp:s.temperature, humidity:s.humidity, timestamp:s.timestamp}))
    const csv = Papa.unparse(rows)
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'sensor_data.csv'; a.click(); URL.revokeObjectURL(url)
  }

  return (
    <div>
      <h2>Data Analytics & Reports</h2>
      <div className="card">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <h4>Sensor Table</h4>
            <div style={{fontSize:13,color:'#666'}}>Filter, sort and export sensor snapshots.</div>
          </div>
          <div>
            <button className="btn" onClick={exportCSV}>Export CSV</button>
          </div>
        </div>

        <table style={{width:'100%',marginTop:12}}>
          <thead><tr><th>Sensor</th><th>Field</th><th>Moisture</th><th>Temp</th><th>Humidity</th><th>Timestamp</th></tr></thead>
          <tbody>
            {sensors.map(s=> (
              <tr key={s.sensorId}><td>{s.sensorId}</td><td>{s.fieldName}</td><td>{s.soilMoisture}</td><td>{s.temperature}</td><td>{s.humidity}</td><td>{new Date(s.timestamp).toLocaleString()}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{marginTop:12}}>
        <h4>Comparative analysis</h4>
        <p>Seasonal trends and cross-field performance visualizations (mock).</p>
      </div>
    </div>
  )
}
