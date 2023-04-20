import React,{useState,useEffect} from 'react';
import NavEle from '../Intro/navbar';
import { useEth } from '../../contexts/EthContext';
import Swal from 'sweetalert2';
import Alert from 'react-bootstrap/Alert';

const GrantAttestation = () => {
    const {state:{contract,accounts}} = useEth();
    const [result,setResult] = useState(false);
    const [videoName, setVideoName] = useState('');
    const [ipfsHash,setIpfsHash] = useState('');
    const [metaData, setMetaData] = useState('');
    const [newHash,setNewHash] = useState('');
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const getRequestList = async () => {
            const entries = await contract.methods.getRequestEntries().call({ from: accounts[0] });
            setRequests(entries);
        }
        contract && getRequestList();
    }, [contract, accounts]);

    const grantingAttestation = async (e) =>{
        e.preventDefault();

        const result = e.target.result.value;
        const videoName = e.target.videoName.value;
        const ipfsHash = e.target.ipfsHash.value;
        const metaData = e.target.metaData.value;
        const newHash = e.target.newHash.value;

        await contract.methods.GrantAttestation(result,videoName,ipfsHash,metaData,newHash).send({from:accounts[0]}).then(()=>{
            setResult(result);
        setVideoName(videoName);
        setIpfsHash(ipfsHash);
        setMetaData(metaData);
        setNewHash(newHash);
        Swal.fire({
            icon: 'success',
            title: 'Good job !',
            text: 'Attestation Granted successfully to '+ newHash,
          })
        e.target.reset();
        }).catch(() =>{
            Swal.fire({
                icon: 'error',
                title: 'Something went Wrong',
                text: 'Check Input Credentials',
            })
        });
        
    }

  return (
    <div>
      <NavEle />
      <section className="py-5">
            <div className="container px-5">
                
                <div className="bg-light rounded-3 py-5 px-4 px-md-5 mb-5" style={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}>
                    <div className="text-center mb-5">
                        
                        <h1 className="fw-bolder">Grant Attestation</h1>
                        <p className="lead fw-normal text-muted mb-0">We'd love to hear from you</p>
                    </div>
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-8 col-xl-6">
                        
                            <form id="contactForm" onSubmit={grantingAttestation}>

                                <div className="form-floting mb-3">
                                    <select className="form-select form-select-lg" id='result' defaultValue={true}>
                                        <option value={true}>True</option>
                                        <option value={false}>False</option>
                                    </select>
                                </div>
                                
                                <div className="form-floating mb-3">
                                    <input className="form-control" id="videoName" type="text" placeholder="Enter your name..."
                                        data-sb-validations="required" />
                                    <label htmlFor="videoName">Video name</label>
                                    <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.
                                    </div>
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control" id="ipfsHash" type="text" placeholder="Enter your name..."
                                        data-sb-validations="required" />
                                    <label htmlFor="ipfsHash">IPFS hash of Parent Video</label>
                                    <div className="invalid-feedback" data-sb-feedback="name:required">A hash is required.
                                    </div>
                                </div>
                               
                                <div className="form-floating mb-3">
                                    <textarea className="form-control" id="metaData" type="text"
                                        placeholder="Enter your message here..."
                                        data-sb-validations="required"></textarea>
                                    <label htmlFor="metaData">Meta Data</label>
                                    <div className="invalid-feedback" data-sb-feedback="message:required">A value is
                                        required.</div>
                                </div>

                                <div className="form-floating mb-3">
                                    <input className="form-control" id="newHash" type="text" placeholder="Enter your name..."
                                        data-sb-validations="required" />
                                    <label htmlFor="newHash">New IPFS Hash</label>
                                    <div className="invalid-feedback" data-sb-feedback="name:required">A address is
                                        required.</div>
                                </div>
                                
                                <div className="d-none" id="submitErrorMessage">
                                    <div className="text-center text-danger mb-3">Error sending message!</div>
                                </div>
                                
                                <div className="d-grid"><button className="btn btn-primary btn-lg" id="submitButton"
                                        type="submit">Submit</button></div>
                            </form>
                        </div>
                    </div>
                </div>
               
                
            </div>
        </section>


        <div className='container'>
                <h1>Reuested Videos</h1>
                {requests.map((request) => {
                    return (<Alert variant="success" key={Math.random()} className='mb-2' style={{overflowWrap: 'break-word'}}>
                        <Alert.Heading>Sender: {request.sender} -&gt; Content Hash:  {request.content}</Alert.Heading>
                    </Alert>
                    )

                })
                }
            </div>
    </div>
  )
}

export default GrantAttestation