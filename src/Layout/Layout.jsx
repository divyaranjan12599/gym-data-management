import './Layout.css';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import Join from './components/Join/Join';
import Plans from './components/Plans/Plans';
import Programs from './components/Programs/Programs';
import Reasons from './components/Reasons/Reasons';
import Testimonials from './components/Testimonials/Testimonials';
function Layout() {
  const appStyle = {
    // mixBlendMode: 'overlay',
    backgroundColor: 'var(--appColor)',
    display: 'flex',
    flexDirection: 'column',
    gap: '6rem',
    overflow: 'hidden'
  };
  
  return (
    <div className="Layout" style={appStyle} > 
        <Hero/>
        <Programs/>
        <Reasons/>
        <Plans/>
        <Testimonials/>
        <Join/>
        <Footer/>
    </div>
  );
}

export default Layout;
