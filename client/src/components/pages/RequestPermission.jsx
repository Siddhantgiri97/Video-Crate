import React, { useState,useEffect } from 'react';
import NavEle from '../Intro/navbar';
import { useEth } from '../../contexts/EthContext';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';


const RequestPermission = () => {
    const { state: { contract, accounts } } = useEth();
    const [videoList, setVideoList] = useState([]);

    useEffect(() => {
        const getVideoList = async () => {
          const videos = await contract.methods.getRegVideos().call();
          setVideoList(videos);
        }
        contract && getVideoList();
      }, [contract, accounts]);


    const requestingPermission = async (e) => {
        e.preventDefault();
        const ipfsHash = e.target.ipfsHash.value;
        await contract.methods.requestPermission(ipfsHash).send({ from: accounts[0] }).then(() =>{
        e.target.reset();
        Swal.fire({
            icon: 'success',
            title: 'Good job !',
            text: 'Request sent successfully for hash' + ipfsHash,
        })
    }
    ).catch ((event) => {
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

                        <h1 className="fw-bolder">Request Permission to Edit Video</h1>
                        <p className="lead fw-normal text-muted mb-0">We'd love to hear from you</p>
                    </div>
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-8 col-xl-6">

                            <form id="contactForm" onSubmit={requestingPermission}>

                                <div className="form-floating mb-3">
                                    <input className="form-control" id="ipfsHash" type="text" placeholder="Enter IPFS hash..."
                                        data-sb-validations="required" />
                                    <label htmlFor="ipfsHash">IPFS hash</label>
                                    <div className="invalid-feedback" data-sb-feedback="name:required">A hash is required.
                                    </div>
                                </div>

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

        {
        <div className='container text-center'>
            <div>
            <h1 className='mb-5'>Explore Videos</h1>
            </div>
          <Row xs={1} md={3} className="g-3 mb-5">
            {videoList.map((video) => {
              return (
                <Col>
                  <Card key={Math.random()} style={{width: '22rem',boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}>
                    <Card.Img variant="top" src="https://images.unsplash.com/photo-1639815188546-c43c240ff4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80 1032w" />
                    <Card.Body>
                      <Card.Title>
                        {video.vid_owner}
                      </Card.Title>
                      <Card.Title>{video.info}</Card.Title>
                      <Card.Text>
                        {video.IPFS_Hash}
                      </Card.Text>
                      <Card.Text>
                        {video.metadata}
                      </Card.Text>
                      <Card.Text>
                        {video.timestamp}
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </div>
      }


    </div>
)
}

export default RequestPermission