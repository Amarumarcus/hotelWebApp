import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Galleries from './components/Galleries/Galleries'
import Map from './components/Map/Map'
import Footer from './components/Footer/Footer'
import './App.css'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Galleries />
        <Map />
      </main>
      <Footer />
    </>
  )
}
