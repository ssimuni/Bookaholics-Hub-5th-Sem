import React from 'react'
import Base from '../components/Base.js'
export default function Home() {
  return (
    <Base>
      <div
        style={{
          height: '100vh',
          backgroundImage: "url('../background6.jpg')",
          marginTop: '-67px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div>
          <h1 style={{ fontSize: '3em', color: 'white', marginTop: '250px', marginLeft: '330px' }}>Bookaholics' Hub</h1>
          <h3 style={{ fontSize: '1.5em', color: 'white', marginTop: '50px', marginLeft: '60px' }}>Turn the Page, Trade the Book. Unleash the Magic of Reading through Exchange, Buy,and Sell</h3>
        </div>
      </div>
    </Base>
  )
}
