import "./styles/App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from './components/Header'
import Home from './routes/Home'
import Blog from './routes/Blog'
import Contact from './routes/Contact'
import BlogDetail from './routes/BlogDetail'
import NotFound from './components/NotFound'
import CategoryBlog from "./routes/CategoryBlog"

function App() {

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/blog/:id' element={<BlogDetail />} />
          <Route path='/category/:id' element={<CategoryBlog />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
