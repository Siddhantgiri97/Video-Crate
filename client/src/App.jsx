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

function App() {
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
        </Routes>
      </Router>
      </EthProvider>
      </div>
    
  );
}

export default App;
