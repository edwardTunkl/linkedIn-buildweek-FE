import React from "react";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import { useState } from "react";
import { ImPencil } from "react-icons/im";
import { BsCardImage } from "react-icons/bs";
import { withRouter } from "react-router-dom";

function EditBgImg({
  bgid,
  imgSrc,
  renewData,
  valueAvatar,
  title,
  postId,
  fetchPosts,
  checkProp
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const postImg = postId ? postId.image : "";

  // Loaders

  const [Loading, setLoading] = useState(false);
  const [Success, setSuccess] = useState(false);

  // NEW POST FETCHING ==================================== <<<<

  const [ImageUpld, setImageUpld] = useState({ file: null });

  const uploadF = (e) => {
    console.log(e.target.files[0]);
    setImageUpld({ file: e.target.files[0] });
  };
  
  // FETCH ===== <<<<
  const ImgUpload = async (e) => {
    e.preventDefault();
    console.log(0, "Sending!", 0);
    setLoading(true);
    const urlProfile = title === "post-img"
      ? `${process.env.REACT_APP_FETCH_BE_URL}/profiles/${bgid}/picture`
      : `${process.env.REACT_APP_FETCH_BE_URL}/profiles/${bgid}/picture`;

    const urlPosts = title === "post-img" 
      ? process.env.REACT_APP_FETCH_BE_URL + "/posts/" + postId._id + "/picture"
      : process.env.REACT_APP_FETCH_BE_URL + "/profiles/6166fec751575eba24d693f5/picture";
    
    const url = checkProp ? urlPosts : urlProfile
      
    let formData = new FormData();
    let file = ImageUpld.file;
    formData.append(checkProp === "ok" ? "post" : "profilepic", file);
   
    // ==
    try {
      let response = await fetch(url, {
        method: "POST",
        body: formData
      });
      let data = await response.json();
      if (response.ok) {
        console.log(response);
        console.log(data);
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 1500);
        setTimeout(() => {
          handleClose();
        }, 2000);
        setTimeout(() => {
          title === "post-img" ? fetchPosts() : renewData();
        }, 2000);
      } else {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //   JSX
  return (
    <>
      {title === "post-img" ? (
        <BsCardImage onClick={handleShow} size={25} className="mr-2" />
      ) : valueAvatar ? (
        <div
          className="edit-cover d-flex align-items-center justify-content-center"
          onClick={handleShow}
        >
          <ImPencil size="1rem" />
        </div>
      ) : (
        <img
          className="avatar"
          src={title === "post-img" ? postImg : imgSrc}
          alt=""
          onClick={handleShow}
          style={{ cursor: "pointer" }}
        />
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit image</Modal.Title>
        </Modal.Header>
        <Form onSubmit={ImgUpload}>
          <Modal.Body>
            <Form.Group controlId="formSurname">
              <Form.Label>Edit image</Form.Label>
              <div className="d-flex justify-content-center">
                <img
                  src={title === "post-img" ? postImg : imgSrc}
                  alt=""
                  className="avatarEdit"
                />
              </div>
              <Form.File id="fileUpload" onChange={uploadF} required />
            </Form.Group>
            {/* input */}
          </Modal.Body>
          <Modal.Footer>
            {Success && <Alert variant="success">Success</Alert>}
            {Loading && <Spinner animation="grow" />}
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default withRouter(EditBgImg);
