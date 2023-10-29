import {  useEffect } from "react";
import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router, Routes, Route
} from 'react-router-dom';
import Update from './components/pages/Update';
import RequestPermission from './components/pages/RequestPermission';
import GrantPermission from './components/pages/GrantPermission';
import RequestAttestation from './components/pages/RequestAttestation';
import GrantAttestation from './components/pages/GrantAttestation';
import AddVideo from "./components/pages/AddVideo";
import ExploreVideos from "./components/pages/ExploreVideos";

function App() {
  useEffect(() => {
    // MetaMask detection code
    if (typeof window.ethereum === 'undefined' || typeof window.ethereum.isMetaMask === 'undefined') {
      // MetaMask is not installed, show a message or handle the case
      alert("MetaMask is not installed. Please install MetaMask to use this dApp.");
    }
  }, []);
  return (
    
      <div id="">
        <EthProvider>
      <Router>
        <Routes>
          <Route path="/" exact element={<Intro />} />
          <Route path="/addVideo" element={<AddVideo />} />
          <Route path="/update" element={<Update />} />
          <Route path="/request-permission" element={<RequestPermission />} />
          <Route path="/grant-permission" element={<GrantPermission />} />
          <Route path="/request-attestation" element={<RequestAttestation />} />
          <Route path="/grant-attestation" element={<GrantAttestation />} />
          <Route path="/explore" element={<ExploreVideos />} />
        </Routes>
      </Router>
      </EthProvider>
      </div>
    
  );
}

export default App;
