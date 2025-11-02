import React from 'react'
import simulator from '../services/simulator'
import { generateValidationPDF } from '../utils/report'

export default function Validation(){
  const results = simulator.getMLValidation()

  return (
    <div>
      <h2>ML Model Validation</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:16}}>
        <div>
          <div className="card">
            <h4>Model comparison</h4>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead>
                <tr><th style={{textAlign:'left'}}>Satellite</th><th>R²</th><th>RMSE</th><th>MAE</th><th>Samples</th></tr>
              </thead>
              <tbody>
                {results.map(r=> (
                  <tr key={r.satellite}><td>{r.satellite}</td><td>{r.r_squared}</td><td>{r.rmse}</td><td>{r.mae}</td><td>{r.sampleSize}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card" style={{marginTop:12}}>
            <h4>Correlation</h4>
            <p>Interactive scatter plot showing ground truth vs satellite estimates (mock). Use for insights and to compute R², RMSE.</p>
          </div>
        </div>
        <div>
          <div className="card">
            <h4>Feature importance</h4>
            <p>Top features: backscatter (SAR), NDVI, surface temperature, soil texture (mock).</p>
          </div>
          <div style={{height:12}} />
          <div className="card">
            <h4>Reports</h4>
            <div>Last training: {results[0].lastUpdated}</div>
            <div style={{display:'flex',gap:8,marginTop:8}}>
              <button className="btn" onClick={()=>generateValidationPDF(results)}>Download validation report (PDF)</button>
              <button className="btn" onClick={()=>{
                // also provide CSV export
                const csv = results.map(r=>`${r.satellite},${r.r_squared},${r.rmse},${r.mae},${r.sampleSize},${r.lastUpdated}`).join('\n')
                const blob = new Blob([`Satellite,R2,RMSE,MAE,Samples,LastUpdated\n${csv}`], {type:'text/csv'})
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a'); a.href = url; a.download = 'validation_metrics.csv'; a.click(); URL.revokeObjectURL(url)
              }}>Download CSV</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
