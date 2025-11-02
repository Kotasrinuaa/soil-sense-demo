import React from 'react'

export default function Footer(){
  return (
    <footer className="footer">
      <div style={{maxWidth:1200,margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap'}}>
          <div>© {new Date().getFullYear()} SoilSense — Precision Agriculture Demo</div>
          <div style={{opacity:0.7}}>Built with simulated IoT data • Satellite mockups • ML validation</div>
        </div>
      </div>
    </footer>
  )
}
