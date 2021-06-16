import React from 'react'
import './App.css'
import PastDateForecast from './components/PastDateForecast/PastDateForecast'
import WeekForecast from './components/WeekForecast/WeekForecast'

function App () {
  return (
        <div className="App">
          <header className="header"><h1 className="title"> Weather <div>forecast</div></h1></header>
          <main className="main">
            <WeekForecast/>
            <PastDateForecast/>
          </main>
          <footer className="footer">C ЛЮБОВЬЮ ОТ MERCURY DEVELOPMENT</footer>
        </div>
  )
}

export default App
