import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Main from './components/layout/Main'

import Home from './pages/Home'
import PostList from './components/post/PostList'
import PostWrite from './components/post/PostWrite'
import PostDetail from './components/post/PostDetail'
import PostModify from './components/post/PostModify'
import Login from './components/user/Login'
import Join from './components/user/Join'

const App = () => {

  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/list' element={<PostList />}></Route>
          <Route path='/write' element={<PostWrite />}></Route>
          <Route path='/detail/:postNum' element={<PostDetail />}></Route>
          <Route path='/modify/:postNum' element={<PostModify />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/join' element={<Join />}></Route>
        </Routes>
      </Main>
      <Footer />
    </>
  )
}

export default App