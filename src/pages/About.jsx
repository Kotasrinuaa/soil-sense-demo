import React from 'react'

export default function About(){
  return (
    <div>
      <h2>About SoilSense</h2>
      <div className="card">
        <p><strong>Objective:</strong> Demonstrate integrated IoT and satellite-driven precision irrigation with ML validation.</p>
        <p><strong>Team:</strong> Jane Doe (Lead), John Smith (Data Scientist), Research Affiliate (University)</p>
        <h4>Contact</h4>
        <form onSubmit={e=>{e.preventDefault(); alert('Contact submitted (demo only)')}}>
          <div style={{display:'grid',gap:8}}>
            <input placeholder="Your name" />
            <input placeholder="Email" />
            <textarea placeholder="Message" />
            <button className="btn">Send</button>
          </div>
        </form>
      </div>

      <div className="card" style={{marginTop:12}}>
        <h4>Publications</h4>
        <p>No publications in this demo. In a real project, link technical reports and papers here.</p>
      </div>
    </div>
  )
}
