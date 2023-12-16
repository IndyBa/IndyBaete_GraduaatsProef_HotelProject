import { Button, Modal } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const CustomerAddMenu = ({ handleAddCustomerClose, showAddCustomerMenu }) => {



  return (
    <div className="model_box">
      <Modal
        show={showAddCustomerMenu}
        onHide={handleAddCustomerClose}
        backdrop="static"
        keyboard={false} 
        dialogClassName="modal-dialog-centered"
      >
        <Modal.Header>
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {/* ... Your form fields */}

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddCustomerClose}>
            Cancel
          </Button>
          <Button variant="success">
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomerAddMenu;
