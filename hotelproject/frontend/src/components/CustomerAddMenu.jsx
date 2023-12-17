import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addCustomer } from "../api/customer";
import { useMutation } from "@tanstack/react-query";

const CustomerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, "Name can't be longer than 50 characters!")
    .required("Name is a required field!")
    .trim(),
  email: Yup.string()
    .email("Not a valid email address!")
    .required("Email is a required field!")
    .lowercase(),
  phone: Yup.string()
    .matches(/^(?:[0-9] ?){6,14}[0-9]$/, "Phone number is not valid")
    .required("Phone number is required"),
  municipality: Yup.string()
    .max(50, "Municipality can't be longer than 50 characters!")
    .required("Municipality is a required field!")
    .trim(),
  zipCode: Yup.string()
    .max(50, "Zip code can't be longer than 50 characters!")
    .required("Zip code is a required field!")
    .trim(),
  street: Yup.string()
    .max(50, "Street can't be longer than 50 characters!")
    .required("Street is a required field!")
    .trim(),
  houseNumber: Yup.string()
    .max(50, "House number can't be longer than 50 characters!")
    .required("House number is a required field!")
    .trim(),
});

// eslint-disable-next-line react/prop-types
const CustomerAddMenu = ({ handleAddCustomerClose, showAddCustomerMenu }) => {
  const { isError, error, mutate, isSuccess, isPending, reset } = useMutation({
    mutationKey: ["addCustomer"],
    mutationFn: addCustomer,
  });

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    submitForm,
    resetForm,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      municipality: "",
      zipCode: "",
      street: "",
      houseNumber: "",
    },
    onSubmit: (values) => {
      mutate(values);
    },
    validationSchema: CustomerValidationSchema,
  });

  const handleCancelButton = () => {
    handleAddCustomerClose();
    resetForm();
  };

  if (isSuccess) {
    reset();
    handleAddCustomerClose();
    resetForm();
  } else if (isError){
    reset();
    window.alert(error)
  }

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
          <form onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-md font-medium text-gray-700 uppercase"
                htmlFor="title"
              >
                Name
              </label>
              <input
                className={`block border rounded shadow-sm p-1 w-full ${
                  errors.name != null && touched.name && "border-danger"
                }`}
                id="name"
                type="text"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && touched.name != null ? (
                <p className="text-xs text-red-600 mb-1">{errors.name}</p>
              ) : (
                <p className="text-xs mb-1">&nbsp;</p>
              )}
            </div>
            <div>
              <label
                className="block text-md font-medium text-gray-700 uppercase"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`block border rounded shadow-sm p-1 w-full ${
                  errors.email != null && touched.email && "border-danger"
                }`}
                id="email"
                type="text"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email != null && touched.email ? (
                <p className="text-xs text-red-600 mb-1">{errors.email}</p>
              ) : (
                <p className="text-xs mb-1">&nbsp;</p>
              )}
            </div>
            <div>
              <label
                className="block text-md font-medium text-gray-700 uppercase"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className={`block border rounded shadow-sm p-1 w-full ${
                  errors.phone != null && touched.phone && "border-danger"
                }`}
                id="phone"
                type="text"
                value={values.phone}
                onChange={handleChange}
              />
              {errors.phone != null && touched.phone ? (
                <p className="text-xs text-red-600 mb-1">{errors.phone}</p>
              ) : (
                <p className="text-xs mb-1">&nbsp;</p>
              )}
            </div>
            <div>
              <label
                className="block text-md font-medium text-gray-700 uppercase"
                htmlFor="municipality"
              >
                Municipality
              </label>
              <input
                className={`block border rounded shadow-sm p-1 w-full ${
                  errors.municipality != null &&
                  touched.municipality &&
                  "border-danger"
                }`}
                id="municipality"
                type="text"
                value={values.municipality}
                onChange={handleChange}
              />
              {errors.municipality != null && touched.municipality ? (
                <p className="text-xs text-red-600 mb-1">
                  {errors.municipality}
                </p>
              ) : (
                <p className="text-xs mb-1">&nbsp;</p>
              )}
            </div>
            <div>
              <label
                className="block text-md font-medium text-gray-700 uppercase"
                htmlFor="zipCode"
              >
                Zip Code
              </label>
              <input
                className={`block border rounded shadow-sm p-1 w-full ${
                  errors.zipCode != null && touched.zipCode && "border-danger"
                }`}
                id="zipCode"
                type="text"
                value={values.zipCode}
                onChange={handleChange}
              />
              {errors.zipCode != null && touched.zipCode ? (
                <p className="text-xs text-red-600 mb-1">{errors.zipCode}</p>
              ) : (
                <p className="text-xs mb-1">&nbsp;</p>
              )}
            </div>
            <div>
              <label
                className="block text-md font-medium text-gray-700 uppercase"
                htmlFor="street"
              >
                Street
              </label>
              <input
                className={`block border rounded shadow-sm p-1 w-full ${
                  errors.street != null && touched.street && "border-danger"
                }`}
                id="street"
                type="text"
                value={values.street}
                onChange={handleChange}
              />
              {errors.street != null && touched.street ? (
                <p className="text-xs text-red-600 mb-1">{errors.street}</p>
              ) : (
                <p className="text-xs mb-1">&nbsp;</p>
              )}
            </div>
            <div>
              <label
                className="block text-md font-medium text-gray-700 uppercase"
                htmlFor="houseNumber"
              >
                House Number
              </label>
              <input
                className={`block border rounded shadow-sm p-1 w-full ${
                  errors.houseNumber != null &&
                  touched.houseNumber &&
                  "border-danger"
                }`}
                id="houseNumber"
                type="text"
                value={values.houseNumber}
                onChange={handleChange}
              />
              {errors.houseNumber != null && touched.houseNumber ? (
                <p className="text-xs text-red-600 mb-1">
                  {errors.houseNumber}
                </p>
              ) : (
                <p className="text-xs mb-1">&nbsp;</p>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className={"btn btn-secondary"} onClick={handleCancelButton}>
            Cancel
          </button>
          <button className={`btn ${isPending ? 'btn-secondary' : 'btn-success'}`} onClick={submitForm} disabled={isPending}>
            {isPending ? "Adding..." : "Add" }
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomerAddMenu;
