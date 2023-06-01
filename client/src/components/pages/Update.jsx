import React, { useState } from 'react'
import NavEle from '../Intro/navbar';
import { useEth } from '../../contexts/EthContext';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

const Update = () => {
    const { state: { contract } } = useEth();
    const [state, setState] = useState('');
    const [ea, setEA] = useState('');
    const [re, setRE] = useState('');
    const [stateDE, setStateDE] = useState('');
    const [eaDE, setEADE] = useState('');
    const [reDE, setREDE] = useState('');
    const [vidOwners, setvidOwner] = useState('');
    const [videoName, setVideoName] = useState('');
    const [parentIpfsHash, setParentIpfsHash] = useState('');
    const [metadata, setMetaData] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [agreement, setAgreement] = useState('');
    const [foundVideoOwner, setFoundVideoOwner] = useState('');
    const [foundVideoName, setFoundVideoName] = useState('');
    const [foundVideoHash, setFoundVideHash] = useState('');
    const [foundVideoMeta, setFoundVidMeta] = useState('');
    const [foundVideotime, setFoundVidtime] = useState('');
    const [isFormFilled, setIsFormFilled] = useState(false);


    const checkRequest = async (e) => {
        e.preventDefault();
        const ipfsHash = e.target.ipfsHash.value;
        const result = await contract.methods.getRequest(ipfsHash).call();
        const state = result[0];
        const ea = result[1];
        const re = result[2];
        console.log(re);
        setState(state);
        setEA(ea);
        setRE(re);
        e.target.reset();
    }

    const checkGrantedPermissions = async (e) => {
        e.preventDefault();
        const ipfsHash = e.target.ipfsHash.value;
        const result = await contract.methods.getGrantedPermissions(ipfsHash).call();
        const state = result[0];
        const ea = result[1];
        const re = result[2];
        console.log(re);
        setState(state);
        setEA(ea);
        setRE(re);
        e.target.reset();
    }

    const checkDeniedPermissions = async (e) => {
        e.preventDefault();
        const ipfsHash = e.target.ipfsHash.value;
        const result = await contract.methods.getDeniedPermissions(ipfsHash).call();
        const stateDenied = result[0];
        const eaDenied = result[1];
        const reDenied = result[2];
        setStateDE(stateDenied);
        setEADE(eaDenied);
        setREDE(reDenied);
        e.target.reset();
    }

    const checkGrantedChildVideos = async (e) => {
        e.preventDefault();
        const ipfsHash = e.target.ipfsHash.value;
        const result = await contract.methods.getGrantedPermissionChildVideos(ipfsHash).call();
        const vidOwner = result[0];
        const videoName = result[1];
        const parentIpfsHash = result[2];
        const metadata = result[3];
        const timestamp = result[4];
        const agreement = result[5];

        setvidOwner(vidOwner);
        setVideoName(videoName);
        setParentIpfsHash(parentIpfsHash);
        setMetaData(metadata);
        setTimestamp(timestamp);
        setAgreement(agreement)

        e.target.reset();
    }

    const checkRecords = async (e) => {
        e.preventDefault();
        const ipfsHash = e.target.ipfsHash.value;
        const result = await contract.methods.getRecords(ipfsHash).call();
        const vidOwner = result[0];
        const vidName = result[1];
        const vidhash = result[2];
        const vidmeta = result[3];
        const vidtimestamp = result[4];
        console.log(vidtimestamp);
        if(vidtimestamp ==0 ){
            Swal.fire({
                icon: 'error',
                title: 'Fake Video Alert',
                text: 'Requested Video Not Found',
              });
              setIsFormFilled(false);
        }else{
            setFoundVideoOwner(vidOwner);
            setFoundVideoName(vidName);
            setFoundVideHash(vidhash);
            setFoundVidMeta(vidmeta);
            setFoundVidtime(vidtimestamp);
            setIsFormFilled(true);
            e.target.reset();
        }
        
    }




    return (
        <div>
            <NavEle />
            {/* Check requests */}
            {/* <div className='formDiv'>
                <section className="py-5">
                    <div className="container px-5">

                        <div className="bg-light rounded-3 py-5 px-4 px-md-5 mb-5" style={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}>
                            <div className="text-center mb-5">
                                <h1 className="fw-bolder">Verify Requests</h1>
                                <p className="lead fw-normal text-muted mb-0">We'd love to hear from you</p>
                            </div>
                            <div className="row gx-5 justify-content-center">
                                <div className="col-lg-8 col-xl-6">

                                    <form id="contactForm" onSubmit={checkRequest}>

                                        <div className="form-floating mb-3">
                                            <input className="form-control" id="ipfsHash" type="text" placeholder="Enter your name..."
                                                data-sb-validations="required" />
                                            <label htmlFor="ipfsHash">IPFS Hash</label>
                                            <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.
                                            </div>
                                        </div>

                                        <div className="d-none" id="submitErrorMessage">
                                            <div className="text-center text-danger mb-3">Error sending message!</div>
                                        </div>

                                        <div className="d-grid"><button className="btn btn-primary btn-lg " id="submitButton"
                                            type="submit">Submit</button></div>
                                    </form>
                                </div>
                            </div>
                        </div>


                    </div>
                </section>
                <div className='container'>
                    <div className='d-grid card card-body'>
                        <h5>{state}</h5>
                        <h5>{ea}</h5>
                        <h5>{String(re)}</h5>
                    </div>
                </div>
            </div> */}

            {/* Check granted permissions */}
            {/* <div className='formDiv'>
                <section className="py-5">
                    <div className="container px-5">

                        <div className="bg-light rounded-3 py-5 px-4 px-md-5 mb-5" style={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}>
                            <div className="text-center mb-5">
                                <h1 className="fw-bolder">Verify Granted Permissions</h1>
                                <p className="lead fw-normal text-muted mb-0">We'd love to hear from you</p>
                            </div>
                            <div className="row gx-5 justify-content-center">
                                <div className="col-lg-8 col-xl-6">

                                    <form id="contactForm" onSubmit={checkGrantedPermissions}>

                                        <div className="form-floating mb-3">
                                            <input className="form-control" id="ipfsHash" type="text" placeholder="Enter your name..."
                                                data-sb-validations="required" />
                                            <label htmlFor="ipfsHash">IPFS Hash</label>
                                            <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.
                                            </div>
                                        </div>

                                        <div className="d-none" id="submitErrorMessage">
                                            <div className="text-center text-danger mb-3">Error sending message!</div>
                                        </div>

                                        <div className="d-grid"><button className="btn btn-primary btn-lg " id="submitButton"
                                            type="submit">Submit</button></div>
                                    </form>
                                </div>
                            </div>
                        </div>


                    </div>
                </section>
                <div className='container'>
                    <div className='d-grid card card-body'>
                        <h5>{state}</h5>
                        <h5>{ea}</h5>
                        <h5>{String(re)}</h5>
                    </div>
                </div>
            </div> */}

            {/* Check denied permissions */}
            {/* <div className='formDiv'>
                <section className="py-5">
                    <div className="container px-5">

                        <div className="bg-light rounded-3 py-5 px-4 px-md-5 mb-5" style={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}>
                            <div className="text-center mb-5">
                                <h1 className="fw-bolder">Verify Denied Permissions</h1>
                                <p className="lead fw-normal text-muted mb-0">We'd love to hear from you</p>
                            </div>
                            <div className="row gx-5 justify-content-center">
                                <div className="col-lg-8 col-xl-6">

                                    <form id="contactForm" onSubmit={checkDeniedPermissions}>

                                        <div className="form-floating mb-3">
                                            <input className="form-control" id="ipfsHash" type="text" placeholder="Enter your name..."
                                                data-sb-validations="required" />
                                            <label htmlFor="ipfsHash">IPFS Hash</label>
                                            <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.
                                            </div>
                                        </div>

                                        <div className="d-none" id="submitErrorMessage">
                                            <div className="text-center text-danger mb-3">Error sending message!</div>
                                        </div>

                                        <div className="d-grid"><button className="btn btn-primary btn-lg " id="submitButton"
                                            type="submit">Submit</button></div>
                                    </form>
                                </div>
                            </div>
                        </div>


                    </div>
                </section>
                <div className='container'>
                    <div className='d-grid card card-body'>
                        <h5>{stateDE}</h5>
                        <h5>{eaDE}</h5>
                        <h5>{String(reDE)}</h5>
                    </div>
                </div>
            </div> */}

            {/* Check child videos */}
            {/* <div className='formDiv'>
                <section className="py-5">
                    <div className="container px-5">

                        <div className="bg-light rounded-3 py-5 px-4 px-md-5 mb-5" style={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}>
                            <div className="text-center mb-5">
                                <h1 className="fw-bolder">Verify Child Videos</h1>
                                <p className="lead fw-normal text-muted mb-0">We'd love to hear from you</p>
                            </div>
                            <div className="row gx-5 justify-content-center">
                                <div className="col-lg-8 col-xl-6">

                                    <form id="contactForm" onSubmit={checkGrantedChildVideos}>

                                        <div className="form-floating mb-3">
                                            <input className="form-control" id="ipfsHash" type="text" placeholder="Enter your name..."
                                                data-sb-validations="required" />
                                            <label htmlFor="ipfsHash">IPFS Hash</label>
                                            <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.
                                            </div>
                                        </div>

                                        <div className="d-none" id="submitErrorMessage">
                                            <div className="text-center text-danger mb-3">Error sending message!</div>
                                        </div>

                                        <div className="d-grid"><button className="btn btn-primary btn-lg " id="submitButton"
                                            type="submit">Submit</button></div>
                                    </form>
                                </div>
                            </div>
                        </div>


                    </div>
                </section>
                <div className='container'>
                    <div className='d-grid card card-body'>
                        <h5>{vidOwner}</h5>
                        <h5>{videoName}</h5>
                        <h5>{parentIpfsHash}</h5>
                        <h5>{metadata}</h5>
                        <h5>{timestamp}</h5>
                        <h5>{String(agreement)}</h5>
                    </div>
                </div>
            </div> */}

            {/* Check records */}

            <div className='formDiv'>

                <section className="py-5">
                    <div className="container px-5">

                        <div className="bg-light rounded-3 py-5 px-4 px-md-5 mb-5" style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
                            <div className="text-center mb-5">
                                <h1 className="fw-bolder">Verify Records</h1>
                                <p className="lead fw-normal text-muted mb-0">We'd love to hear from you</p>
                            </div>
                            <div className="row gx-5 justify-content-center">
                                <div className="col-lg-8 col-xl-6">

                                    <form id="contactForm" onSubmit={checkRecords}>

                                        <div className="form-floating mb-3">
                                            <input className="form-control" id="ipfsHash" type="text" placeholder="Enter your name..."
                                                data-sb-validations="required" />
                                            <label htmlFor="ipfsHash">IPFS Hash</label>
                                            <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.
                                            </div>
                                        </div>

                                        <div className="d-none" id="submitErrorMessage">
                                            <div className="text-center text-danger mb-3">Error sending message!</div>
                                        </div>

                                        <div className="d-grid"><button className="btn btn-primary btn-lg " id="submitButton"
                                            type="submit">Submit</button></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {isFormFilled && <div className='container text-center'>
                    <div>
                        <h1 className='text-center'>Associated Video</h1>
                    </div>
                    <Col>
                        <Card style={{ width: '24rem' }}>
                            <Card.Img variant="top" src="block.jpg" />
                            <Card.Body>
                                <Card.Title>
                                    {foundVideoOwner}
                                </Card.Title>
                                <Card.Title>{foundVideoName}</Card.Title>
                                <Card.Text>
                                    {foundVideoHash}
                                </Card.Text>
                                <Card.Text>
                                    {foundVideoMeta}
                                </Card.Text>
                                <Card.Text>
                                    {foundVideotime}
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </div>
                }
            </div>
        </div>
    )
}

export default Update