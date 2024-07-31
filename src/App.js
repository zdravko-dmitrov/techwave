import './App.css';
import './styles.css';
import Header from './components/Header';
import Footer from './components/Footer';
import PhonesGrid from './components/PhonesGrid';
import IphonesGrid from './components/IphonesGrid';

function App() {
  return (
    <div className="App">
      <div className='container'>
      <Header></Header>
      <h2>🔥BEST OFFERS</h2>
      <PhonesGrid></PhonesGrid>
      </div>
      <div className='container'>
      <h2>🚨NEW IN</h2>
      <IphonesGrid></IphonesGrid>
      </div>

    <Footer></Footer>
    </div>
  );
}

export default App;
