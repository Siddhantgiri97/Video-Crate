import React, { useState, useEffect } from 'react';
import { create as ipfsHttpClient } from "ipfs-http-client";
import NavEle from '../Intro/navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useEth } from '../../contexts/EthContext';
import bs58 from 'bs58';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import MyVerticallyCenteredModal from '../Intro/MyVerticallyCenteredModal';



// insert your infura project crediental you can find 
// easily these your infura account in API key management section
const projectId = "2MVQ2wILBSZ1A1V4wDYc5xzPZ1B";
const projectSecretKey = "1370df8f638b47f917e868c9c7bb3368"
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

const AddVideo = () => {
  const { state: { contract, accounts } } = useEth();
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const getVideoList = async () => {
      const videos = await contract.methods.getRegVideos().call({ from: accounts[0] });
      setVideoList(videos);
    }
    contract && getVideoList();
  }, [contract, accounts]);


  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001",
    headers: {
      authorization
    }
  })


  const [videoName, setVideoName] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');
  const [metaData, setMetaData] = useState('');
  const [agreementVal, setAgreementVal] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);


  const addNewVideo = async (e) => {
    e.preventDefault();
    const videoName = e.target.videoName.value;
    const metaData = e.target.metaData.value;
    const agreementVal = e.target.flexCheckDefault.value;


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
    if (bytes.length > 32) {
      paddedBytes.set(bytes.slice(0, 32));
    } else {
      paddedBytes.set(bytes);
    }

    const bytes32 = '0x' + Array.from(paddedBytes, function (byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
    const newPath = bytes32;
    setIpfsHash(result.path);


    await contract.methods.addVideo(videoName, newPath, metaData, agreementVal).send({ from: accounts[0] }).then(() => {
      setVideoName(videoName);
      setMetaData(metaData);
      setAgreementVal(agreementVal);
      e.target.reset();
      Swal.fire({
        icon: 'success',
        title: 'Good job !',
        text: 'Your Content is Uploaded Successfully',
      })
    }).catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'Something went Wrong',
        text: 'Check Input Credentials',
      })
    });

  }
  return (
    <>
    <div>
      <NavEle />
      <section className="py-5">
        <div className="container px-5">

          <div className="bg-light rounded-3 py-5 px-4 px-md-5 mb-5" style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
            <div className="text-center mb-5">

              <h1 className="fw-bolder">Add Your Original Content</h1>
              <p className="lead fw-normal text-muted mb-0">We'd love to hear from you</p>
            </div>
            <div className="row gx-5 justify-content-center">
              {ipfs && (
                <div className="col-lg-8 col-xl-6">

                  <form id="contactForm" onSubmit={addNewVideo}>

                    <div className="form-floating mb-3">
                      <input className="form-control" id="videoName" type="text" placeholder="Enter your name..."
                        data-sb-validations="required" />
                      <label htmlFor="videoName">Video name</label>
                      <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.
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

                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Upload Video File</Form.Label>
                      <Form.Control name='videoFile' type="file" />
                    </Form.Group>


                    <div className="form-floting mb-3">
                      <div className='form-check'>
                        <input className='form-check-input' id='flexCheckDefault' type="checkbox" value={true} required />
                        <label htmlFor="flexCheckDefault" className='form-check-label'>I agree to <Link onClick={() => setModalShow(true)}>terms</Link> of video crate and value the privacy policy</label>
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

                    <div className='d-grid'><button className="btn btn-primary btn-lg" id="submitButton"
                      type="submit">Submit</button></div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {
        <div className='container'>
          <div>
            <h1 className='mb-2'>Original Videos</h1>
          </div>
          <Row xs={1} md={2} className="g-3 mb-2">
            {videoList.map((video) => {
              return (
                <Col>
                  <Card style={{ width: '22rem',boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} key={Math.random()}>
                    <Card.Img variant="top" src="block.jpg" />
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
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    

</>
  )
}

export default AddVideo
