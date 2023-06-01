import React, { useState,useEffect } from 'react';
import NavEle from '../Intro/navbar';
import { useEth } from '../../contexts/EthContext';
import Form from 'react-bootstrap/Form';
import bs58 from 'bs58';
import { create as ipfsHttpClient } from "ipfs-http-client";
import Swal from 'sweetalert2';
import Alert from 'react-bootstrap/Alert';

const projectId = "2MVQ2wILBSZ1A1V4wDYc5xzPZ1B";
const projectSecretKey = "1370df8f638b47f917e868c9c7bb3368"
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);


const RequestAttestation = () => {
    const { state: { contract, accounts } } = useEth();
    const [videoName, setVideoName] = useState('');
    const [ipfsHash, setIpfsHash] = useState('');
    const [metaData, setMetaData] = useState('');
    const [newIpfsHash, setnewIpfsHash] = useState('');
    const [requests, setRequests] = useState([]);


    useEffect(() => {
        const getRequestList = async () => {
            const entries = await contract.methods.getRequestEntries().call({ from: accounts[0] });
            setRequests(entries);
        }
        contract && getRequestList();
    }, [contract, accounts]);


    const ipfs = ipfsHttpClient({
        url: "https://ipfs.infura.io:5001",
        headers: {
          authorization
        }
      })

    const requestingAttestation = async (e) => {
        e.preventDefault();
        const videoName = e.target.videoName.value;
        const ipfsHash = e.target.ipfsHash.value;
        const metaData = e.target.metaData.value;
        const files = e.target.videoFile.files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];
    // upload files
    const result = await ipfs.add(file);


    const hash = result.path;
    const bytes = new Uint8Array(bs58.decode(hash));

    // Pad with zeroes to make it 32 bytes long
    const paddedBytes = new Uint8Array(32);
    if(bytes.length >32){
      paddedBytes.set(bytes.slice(0,32));
    }else{
      paddedBytes.set(bytes);
    }

    const bytes32 = '0x' + Array.from(paddedBytes , function(byte){
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
    const newPath = bytes32;
    setIpfsHash(result.path);

        await contract.methods.AttestSC(videoName, ipfsHash, metaData,newPath).send({ from: accounts[0] }).then(()=>{
            setVideoName(videoName);
            setIpfsHash(ipfsHash);
            setMetaData(metaData);
            setnewIpfsHash(newPath);
            e.target.reset();

        Swal.fire({
            icon: 'success',
            title: 'Good job !',
            text: 'Attestation Request Sent' ,
          })
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

                            <h1 className="fw-bolder">Request Attestation</h1>
                            <p className="lead fw-normal text-muted mb-0">We'd love to hear from you</p>
                        </div>
                        <div className="row gx-5 justify-content-center">
                            <div className="col-lg-8 col-xl-6">

                                <form id="contactForm" onSubmit={requestingAttestation}>

                                    <div className="form-floating mb-3">
                                        <input className="form-control" id="videoName" type="text" placeholder="Enter your name..."
                                            data-sb-validations="required" />
                                        <label htmlFor="videoName">Video name (New)</label>
                                        <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.
                                        </div>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" id="ipfsHash" type="text" placeholder="Enter your name..."
                                            data-sb-validations="required" />
                                        <label htmlFor="ipfsHash">IPFS hash of Original Video</label>
                                        <div className="invalid-feedback" data-sb-feedback="name:required">A hash is required.
                                        </div>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <textarea className="form-control" id="metaData" type="text"
                                            placeholder="Enter your message here..."
                                            data-sb-validations="required"></textarea>
                                        <label htmlFor="metaData">Meta Data (New)</label>
                                        <div className="invalid-feedback" data-sb-feedback="message:required">A value is
                                            required.</div>
                                    </div>

                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Upload Edited Video File</Form.Label>
                                        <Form.Control name='videoFile' type="file" />
                                    </Form.Group>



                                    <div className="d-none" id="submitSuccessMessage">
                                        <div className="text-center mb-3">
                                            <div className="fw-bolder">Form submission successful!</div>
                                        </div>
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

export default RequestAttestation