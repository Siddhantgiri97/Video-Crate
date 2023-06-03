// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Vid_Traceability{

address public owner;
Video public thisVideo;


//this structure is used for all videos in a chain used for provenance data
struct Video {
  address vid_owner;//Ethereum address of the video owner
  string info;//informtation about the video
  bytes32 IPFS_Hash;//IPFS hash of the uploaded video on the IPFS server
  string metadata;
  uint256 timestamp;
  bool agreement;
}

enum artistState {SentRequest,  GrantedPermission, DeniedPermission, SentAttestationRequest, GrantedAttestation, DeniedAttestation } 


//an Artist can have multiple requests each with a unique IPFS hash
struct Artist{
    artistState state;
    address EA;
    bool result;//by default false unless granted permission
}

struct RequestReg{
    address sender;
    bytes32 content;
}

RequestReg[] public requestEntries;

// bool public parent;//if true it means it has a parent and it is a child
// Video public parent_video;//parent video if any
Video[] public regVideos;
Video[] public agreeVid;

mapping (bytes32 =>Video) public Granted_Permission_ChildVideos;//for history tracking, mapping all children videos with their SC address
mapping (bytes32 => Artist) public Granted_Permissions;// EA of artists with granted permissions, maps between the EA and the IPFS hash of the video
mapping (bytes32 => Artist) public Denied_Permissions;//list of artists with denied permissions,maps between the EA and the IPFS hash of the video
mapping (bytes32=>Artist) public Requests;//all requets , EA and IPFS hash
mapping (bytes32 => bytes32) public Records;


modifier OnlyOwner(){
    require(msg.sender == owner);
    _;
} 

modifier NotOwner(){
    require(msg.sender != owner);
    _;
}
//events
event ArtistRequestingPermission(address artist);
event ArtistRequestRegistered(address artist, bytes32 IPFS_Hash);
event PermissionGranted(string info, address artist);
event PermissionDenied(string info, address artist);
event AttestationRequest(string info, bytes32 newHash);
event AttestationGranted(string info, bytes32 newHash);
event AttestationDenied(string info, bytes32 newHash);

//constructor
constructor() public{
    owner = msg.sender;
    thisVideo.vid_owner = msg.sender;
    thisVideo.IPFS_Hash = 'kkowfwjg';
    thisVideo.info = "A funny Video";
    thisVideo.metadata = "Data:18/9/2018, Time:5:57";
    thisVideo.timestamp = block.timestamp;
    thisVideo.agreement = true;
    regVideos.push(thisVideo);
    for (uint i = 0; i < regVideos.length; i++) {
            if(regVideos[i].agreement == true){
                agreeVid.push(regVideos[i]);
            }
        }

}

    //this function adds new video
    function addVideo(string memory info,bytes32 hash,string memory metadata,bool agreement) public {
        require(agreement==true, "You cannot request permission for a video that has not been agreed to");
        uint256 tp  = block.timestamp;
        Video memory new_video = Video(msg.sender,info,hash,metadata,tp,agreement);
        regVideos.push(new_video);
    }

    function checkIFVideoExists(bytes32 IPFS_Hash) public view returns(bool s){
        bool flag = false;
        for (uint i = 0; i <= regVideos.length; i++) {
            if(regVideos[i].IPFS_Hash == IPFS_Hash){
                flag = true;
                return true;
            }
        }
        
    }

     

    function getRegVideos() public view returns(Video[] memory){
        return regVideos;
    }

    function getRequestEntries() public view returns(RequestReg[] memory){
        return requestEntries;
    }

    function getAgreeVideos() public view returns(Video[] memory){
        return agreeVid;
    }


    function getVideoByHash(bytes32 ipfsHash) public view returns(Video memory v){
        for (uint i = 0; i < regVideos.length; i++) {
            if(regVideos[i].IPFS_Hash == ipfsHash){
                return regVideos[i];
            }
        }
    }

    function getRequest(bytes32 IPFShash) public view returns(Artist memory){
        Artist memory newArtist = Requests[IPFShash];
        return newArtist;
    }

    

    function getGrantedPermissions(bytes32 IPFShash) public view returns(Artist memory){
        Artist memory newArtist = Granted_Permissions[IPFShash];
        return newArtist;
    }

    function getDeniedPermissions(bytes32 IPFShash) public view returns(Artist memory){
        Artist memory newArtist = Denied_Permissions[IPFShash];
        return newArtist;
    }

    function getGrantedPermissionChildVideos(bytes32 IPFShash) public view returns(Video memory){
        Video memory newVideo = Granted_Permission_ChildVideos[IPFShash];
        return newVideo;
    }

    function getRecords(bytes32 IPFShash) public view returns(Video memory v){
        bytes32 hash = Records[IPFShash];
        if(hash[0]!= 0){
            Video memory vid = getVideoByHash(hash);
            return vid;
        }
        else{
            Video memory newVideo = getVideoByHash(IPFShash);
            return newVideo;
        }
        
    }
    

    
    //this function is called by other interested editors to create new versions of the video
    //an editor requetsing permissions indicates that they agreed to the agreement form
    function requestPermission(bytes32 IPFShash) public NotOwner{
        bool check = checkIFVideoExists(IPFShash);
        if(check == true){
            emit ArtistRequestingPermission(msg.sender);//register artist
            //false by default until granted permission
            Artist memory newArtist = Artist(artistState.SentRequest,msg.sender,false);
            Requests[IPFShash] = newArtist;
            RequestReg memory newEntry = RequestReg(msg.sender,IPFShash);
            requestEntries.push(newEntry);
            emit ArtistRequestRegistered(msg.sender, IPFShash);
        }
    }
    
    //this function is used by the owner to grant permsissions
    function grantPermission(bool result, address artist,bytes32 IPFShash) public{
        require(Requests[IPFShash].state == artistState.SentRequest);
        if(result){
            Artist memory newArtist = Artist(artistState.GrantedPermission,msg.sender,result);
            Granted_Permissions[IPFShash] = newArtist;
            Requests[IPFShash].state == artistState.GrantedPermission;
            Requests[IPFShash].result = true;
            emit PermissionGranted("Permission Granted to address ", artist);  
        }
        else {
             Artist memory newArtist = Artist(artistState.DeniedPermission,msg.sender,result);
             Denied_Permissions[IPFShash] = newArtist;
             Requests[IPFShash].state == artistState.DeniedPermission;
            emit PermissionDenied("Permission Denied to address ", artist);
        }
    }

    
    //this function is called by the artist after getting an approval and creating a child SC 
    function AttestSC(string memory infor, bytes32 hash, string memory meta,bytes32 newHash) public NotOwner{
        require(Granted_Permissions[hash].state == artistState.GrantedPermission);
        uint256 tp  = block.timestamp;
        bool agreement = false;
        Video memory new_video = Video(msg.sender,infor,newHash,meta,tp,agreement);
        regVideos.push(new_video);
        emit AttestationRequest("Address of child: " , newHash);
        Granted_Permissions[hash].state = artistState.SentAttestationRequest;
    }
    
    function GrantAttestation(bool result, string memory infor, bytes32 hash, string memory meta, bytes32 newHash) public{
    require(Granted_Permissions[hash].state == artistState.SentAttestationRequest);
        if(result){
         Video memory newVideo = Video(msg.sender,infor,newHash,meta,block.timestamp,false);
         Granted_Permission_ChildVideos[hash] = newVideo;
         Granted_Permissions[hash].state = artistState.GrantedAttestation;
         Requests[hash].state = artistState.GrantedAttestation; 
         Records[newHash] = hash;
         requestEntries.pop();
         emit AttestationGranted("Successfully Attested: ", newHash);
        }
        else
        {
         Granted_Permissions[hash].state = artistState.DeniedAttestation;//Granted permission for the request, but denied attestation
         Requests[hash].state = artistState.DeniedAttestation;
         emit AttestationDenied("Denied Attestation: ", newHash);   
        }
    }
    
}

