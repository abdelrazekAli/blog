import { Modal, Button } from "react-bootstrap";

const PostModal = ({ showModal, hideModal, modalData }) => {
  return (
    <Modal show={showModal} size="lg" centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalData.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{modalData.body}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={hideModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostModal;
