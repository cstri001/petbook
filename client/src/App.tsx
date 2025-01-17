import { Container } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import LoginPage from './views/LoginPage'
import Layout from './views/Layout'
import Home from './views/Home'
import BlogArticle from './views/BlogArticle'

function App() {

  // Tässä käytetään Routesia, eli selain silleen ohjaa oikeita elementtejä näkymään osoiterivin mukaisesti. Kun käytetään Routesia, linkit ei ole "a href" vaan "Link" komponentteja
  // Tuon Layout-komponentin käytön sijaan voisi tässä tehdä myös niin, että Layoutin komponentit/sisältö on tässä App.tsx, ja sitten noi routet on vaan siinä. Mutta näinkin on ihan hyvä.

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  return (
    <Container sx={{
      width: '100vw'
    }}>
          
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/blog/:id' element={<BlogArticle articleType='blog' />} />
          <Route path='/article/:id' element={<BlogArticle articleType='article' />} />
        </Route>
      </Routes>
    </Container>
  )
}

export default App
