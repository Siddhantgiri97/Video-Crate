import React from 'react';
import { useState, useEffect,CSSProperties} from 'react';
import NavEle from '../Intro/navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useEth } from '../../contexts/EthContext';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";




const ExploreVideos = () => {

  const { state: { contract, accounts } } = useEth();
  const [videoList, setVideoList] = useState([]);
  const [loading, setloading] = useState(false);

  const override = {
    display: "flex",
    justifyContent:"center",
    alignItems:"center",
  };

  useEffect(() => {
    setloading(true);
    setTimeout(() =>{
        setloading(false);
    },5000)
    const getVideoList = async () => {
      const videos = await contract.methods.getRegVideos().call({ from: accounts[0] });
      setVideoList(videos);
    }
    contract && getVideoList();
  }, [contract, accounts]);
  return (
    <>
    <NavEle />
    {
      loading ? <><ClimbingBoxLoader size={30} color="#36d7b7" loading={loading} cssOverride={override} style={{display:"flex",just
      :"center",alignItems:"center"
      }} /></> : <div className='container'>
      <div className='text-center'>
        <h1 className='mb-5 mt-3'>Original Videos</h1>
      </div>
      <Row xs={1} sm={1} md={3} className="g-3 mb-2" style={{display:"flex",justifyItems:"center",alignItems:"center"
      }}>
        {videoList.map((video) => {
          return (
            <Col>
              <Card style={{ width: '22rem',boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} key={Math.random()}>
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
        
      
    </>
  )
}

export default ExploreVideos
