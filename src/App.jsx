import './App.css';
import { Footer, Hero, Navbar, Quote } from './components';
import { About, Privacy, Quiz, Reflection, Seerah, Support, Timeline } from './Pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path='/seerah' element={<Seerah />} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/reflection' element={<Reflection />} />
        <Route path='/timeline' element={<Timeline />} />
        <Route path='/about' element={<About />} />
        <Route path='/support' element={<Support />} />
        <Route path='/privacy' element={<Privacy/>} />
        <Route
          path='/'
          element={
            <>
              <Hero />
              <Quote />
            </>
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
