import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { addMember } from "../api/member";

const MemberValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, "Name can't be longer than 50 characters!")
    .required("Name is a required field!")
    .trim(),
  birthDay: Yup.date()
  .required("Birthday is a required field!")
  .max(new Date(), "Birthday can't be in the future!")
});

// eslint-disable-next-line react/prop-types
const MemberAddMenu = ({ handleAddMemberClose, showAddMemberMenu, customerId }) => {
  const { isError, error, mutate, isSuccess, isPending, reset } = useMutation({
    mutationKey: ["addMember"],
    mutationFn: (data) => addMember(data.values, data.customerId),
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
      birthDay: "",
    },
    onSubmit: (values) => {
      mutate({customerId: customerId, values: values});
    },
    validationSchema: MemberValidationSchema,
  });

  const handleCancelButton = () => {
    handleAddMemberClose();
    resetForm();
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      handleAddMemberClose();
      resetForm();
    } else if (isError) {
      reset();
      window.alert(error);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, error]);

  return (
    <div className="model_box">
      <Modal
        show={showAddMemberMenu}
        onHide={handleAddMemberClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-dialog-centered"
        style={{ background: 'rgba(0, 0, 0, 0.5)' }}
      >
        <Modal.Header>
          <Modal.Title>Add Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-md font-medium text-gray-700 uppercase"
                htmlFor="name"
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
                htmlFor="birthDay"
              >
                Birthday
              </label>
              <input
                className={`block border rounded shadow-sm p-1 w-full ${
                  errors.birthDay != null && touched.birthDay && "border-danger"
                }`}
                id="birthDay"
                type="date"
                value={values.birthDay}
                onChange={handleChange}
              />
              {errors.birthDay != null && touched.birthDay ? (
                <p className="text-xs text-red-600 mb-1">{errors.birthDay}</p>
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

export default MemberAddMenu;
