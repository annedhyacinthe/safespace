import React, { useState, createRef } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "semantic-ui-react";
import { colorPallet } from "./Theme";
import WritePostForm from "./WritePostForm";
import { Navbar } from "react-bootstrap";
import { Redirect } from "react-router-dom";
function NewPostModal(props: any) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const contextRef = createRef();
  return (
    <div>
      <Navbar fixed="bottom">
        <Button
          label="Write Post"
          labelPosition="left"
          size="massive"
          color="black"
          style={{ backgroundColor: colorPallet.marvel }}
          circular
          icon="edit"
          onClick={handleShow}
        />

        <Modal
          show={show}
          onHide={() => <Redirect to={`/news/member/${props.id}`} />}
          animation={false}
        >
          <Modal.Header closeButton>New Post</Modal.Header>
          <Modal.Body>
            <WritePostForm
              setShow={setShow}
              show={show}
              setChange={props.setChange}
              id={props.id}
            />
          </Modal.Body>
        </Modal>
      </Navbar>
    </div>
  );
}

export default NewPostModal;
