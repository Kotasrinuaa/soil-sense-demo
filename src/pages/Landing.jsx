import React from 'react'
import simulator from '../services/simulator'
import { Link } from 'react-router-dom'

export default function Landing(){
  const stats = simulator.getMLValidation()
  const sensorCount = simulator.sensorsList().length
  return (
    <div>
      <div className="hero card">
        <div className="left">
          <h1 style={{margin:0}}>SoilSense — IoT Soil Moisture Monitoring & Satellite Validation</h1>
          <p style={{opacity:0.8}}>A demo precision agriculture platform integrating ground-based IoT sensors with multi-satellite imagery and machine learning to deliver irrigation recommendations and validation.</p>
          <div style={{display:'flex',gap:12,marginTop:12}}>
            <Link className="cta" to="/dashboard">View Live Dashboard</Link>
            <Link style={{padding:'10px 12px',borderRadius:8,textDecoration:'none',border:'1px solid rgba(44,62,80,0.08)'}} to="/satellite">Explore Data</Link>
            <Link style={{padding:'10px 12px',borderRadius:8,textDecoration:'none',border:'1px solid rgba(44,62,80,0.08)'}} to="/documentation">Learn More</Link>
          </div>
        </div>
        <div className="right">
          <div className="card" style={{padding:16}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div className="kpi">{sensorCount}</div>
                <div className="kpi-sub">Sensor locations</div>
              </div>
              <div>
                <div className="kpi">{stats.reduce((s,x)=>s+x.sampleSize,0)}</div>
                <div className="kpi-sub">Validation samples</div>
              </div>
            </div>
          </div>
          <div style={{height:12}} />
          <div className="card" style={{padding:12}}>
            <div style={{fontWeight:700}}>Key features</div>
            <ul>
              <li>Real-time sensor telemetry with auto-refresh</li>
              <li>Multi-satellite comparison (mock imagery)</li>
              <li>Machine Learning validation & metrics</li>
              <li>Irrigation decision support & scheduling</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginTop:18}}>
        <div className="card">
          <h3>Technology Stack</h3>
          <p>IoT sensors • React SPA • Leaflet maps • Chart.js • Simulated satellite & ML outputs</p>
        </div>
        <div className="card">
          <h3>System Capabilities</h3>
          <div className="stats-grid">
            <div className="card" style={{padding:12}}>
              <div className="kpi">Real-time</div>
              <div className="kpi-sub">Auto-refresh every 30s</div>
            </div>
            <div className="card" style={{padding:12}}>
              <div className="kpi">Multi-source</div>
              <div className="kpi-sub">Sentinel-1/2 mocks</div>
            </div>
            <div className="card" style={{padding:12}}>
              <div className="kpi">ML Validation</div>
              <div className="kpi-sub">R², RMSE, MAE</div>
            </div>
            <div className="card" style={{padding:12}}>
              <div className="kpi">Irrigation Planning</div>
              <div className="kpi-sub">Water deficit & schedule</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
