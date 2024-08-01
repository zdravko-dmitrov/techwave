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
      <PhonesGrid></PhonesGrid>
      </div>
      <div className='container'>
      <IphonesGrid></IphonesGrid>
      </div>

    <Footer></Footer>
    </div>
  );
}

export default App;
