
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Artists from './pages/Artists'
import Works from './pages/Works'
import Movements from './pages/Movements'
import ArtistShow from './pages/ArtistShow'
import WorkShow from './pages/WorkShow'
import MovementShow from './pages/MovementShow'
import WebLayout from './layouts/WebLayout'
import GlobalContext from './context/GlobalContext'
import { useState } from 'react'

function App() {

  const api_url = 'http://127.0.0.1:8000/api';

  return (
    <>
      <GlobalContext.Provider value={{ api_url }}>
        <BrowserRouter>
          <Routes>
            <Route element={<WebLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/artists'>
                <Route index element={<Artists />} />
                <Route path=':slug' element={<ArtistShow />} />
              </Route>
              <Route path='/works'>
                <Route index element={<Works />} />
                <Route path=':slug' element={<WorkShow />} />
              </Route>
              <Route path='/movements'>
                <Route index element={<Movements />} />
                <Route path=':slug' element={<MovementShow />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </>
  )
}

export default App
