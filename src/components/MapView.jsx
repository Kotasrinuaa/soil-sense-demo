import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// fix default icon issue in many bundlers
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default function MapView({markers = [], center=[16.5062,80.6480], zoom=14, height=360}){
  return (
    <div style={{height}} className="card map-card">
      <MapContainer center={center} zoom={zoom} style={{height:'100%', borderRadius:8}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map(m => (
          <Marker key={m.sensorId} position={[m.location.lat, m.location.lon]}>
            <Popup>
              <div style={{minWidth:200}}>
                <div style={{fontWeight:700}}>{m.fieldName}</div>
                <div>Moisture: {m.soilMoisture}%</div>
                <div>Temp: {m.temperature}°C</div>
                <div>Humidity: {m.humidity}%</div>
                <div style={{marginTop:6,fontSize:12,color:'#666'}}>{new Date(m.timestamp).toLocaleString()}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
