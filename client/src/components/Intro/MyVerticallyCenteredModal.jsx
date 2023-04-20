import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const MyVerticallyCenteredModal = (props) => {
  return (
    <div>
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <b>Terms & Conditions</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Video Crate</h4>
        <p>
            <ul>
                <li>By uploading any content, you agree that you are the owner of the content or have obtained all necessary permissions to upload the content.</li>
                <li>You agree that the content you upload does not violate any applicable laws or infringe any third-party rights, including but not limited to copyright, trademark, privacy, publicity, or other proprietary rights.</li>
                <li>You grant us a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use, reproduce, distribute, modify, adapt, create derivative works of, publicly display, publicly perform, and otherwise exploit the content in any and all media or distribution methods, now known or later developed.

</li>
                <li>You grant us a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use, reproduce, distribute, modify, adapt, create derivative works of, publicly display, publicly perform, and otherwise exploit the content in any and all media or distribution methods, now known or later developed.

</li>
                <li>You agree to indemnify and hold us harmless from any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to your content or any breach of these terms and conditions.</li>
                <li>We reserve the right to modify or update these terms and conditions at any time without prior notice. Any changes will be effective immediately upon posting.</li>
            </ul>
            <p>By uploading any content, you agree to be bound by these terms and conditions. If you do not agree to these terms and conditions, please do not upload any content.</p>
       
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
      
    </div>
  )
}

export default MyVerticallyCenteredModal
