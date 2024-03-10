import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const DeleteModal = ({ show, onHide, isLoading, id, deletionType , name, setTriggerFetch}) => {
  const handleConfirmDelete = async () => {
    onHide();
    if (id) {
      if (deletionType === "product") {
        {
          await axios.delete(`http://localhost:8081/products/${id}`);
          setTriggerFetch((current) => !current);
        }
      } else if (deletionType === "user") {
        await axios.delete(`http://localhost:8080/user/${id}`);
        setTriggerFetch((current) => !current);
      }
    } else {
      console.error("Missing ID for deletion");
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header
        closeButton
        style={{ backgroundColor: "black", color: "white" }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          {isLoading
            ? "Loading Products..."
            : "Are You Sure You Want To Delete"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        {name}
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{ backgroundColor: "black" }}
          onClick={() => handleConfirmDelete()}
        >
          Yes
        </Button>
        <Button style={{border:"2px solid black", backgroundColor:"white",color:"black"}} onClick={onHide}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
