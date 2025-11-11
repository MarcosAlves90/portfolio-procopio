import '@/App.css'
import { Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import ProjectPage from '@/pages/ProjectPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Home scrollTo="about" />} />
      <Route path="/projetos" element={<Home scrollTo="projects" />} />
      <Route path="/projetos/:id" element={<ProjectPage />} />
      <Route path="/contato" element={<Home scrollTo="contact" />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default App
