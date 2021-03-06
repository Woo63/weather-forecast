import React from 'react'
import './App.css'
import PastlyForecastBlock from './components/PastForecastBlock/PastForecastBlock'
import NearlyForecastBlock from './components/WeeklyForecastBlock/WeeklyForecastBlock'

function App () {
  return (
        <div className="App">
          <header className="header"><h1 className="title"> Weather <div>forecast</div></h1></header>
          <main className="main">
            <NearlyForecastBlock/>
            <PastlyForecastBlock/>
          </main>
          <footer className="footer">C ЛЮБОВЬЮ ОТ MERCURY DEVELOPMENT</footer>
        </div>
  )
}

export default App
