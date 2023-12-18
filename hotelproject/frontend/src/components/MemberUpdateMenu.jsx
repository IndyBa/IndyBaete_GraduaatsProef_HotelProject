import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateMember } from "../api/member";
import { useMutation } from "@tanstack/react-query";
import { useEffect} from "react";

const MemberValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, "Name can't be longer than 50 characters!")
    .required("Name is a required field!")
    .trim(),
  birthDay: Yup.date()
    .required("Birthday is a required field!")
    .max(new Date(), "Birthday can't be in the future!"),
});

// eslint-disable-next-line react/prop-types
const MemberUpdateMenu = ({handleUpdateMemberClose, showUpdateMemberMenu, customerId, member}) => {
  const { memberData, isMemberLoading, isMemberError, memberError } = member ?? {};
  const { id, name, birthDay} = memberData ?? {};

  const { isError, error, mutate, isSuccess, isPending } = useMutation({
    mutationKey: ["updateMember"],
    mutationFn: (updateData) =>
      updateMember( updateData.customerId, updateData.memberId, updateData.values),
  });

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    submitForm,
    setValues
  } = useFormik({
    initialValues: {
      name: "",
      birthDay: "",
    },
    onSubmit: (values) => {
      mutate({customerId: customerId, memberId: id, values: values});
    },
    validationSchema: MemberValidationSchema,
  });

  useEffect(() => {
    setValues({
      name: name || "",
      birthDay: birthDay || "",
    });
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, birthDay]);

  const handleCancelButton = () => {
    handleUpdateMemberClose();
  };

  useEffect(() => {
    if (isSuccess) {
      handleUpdateMemberClose();
    } else if (isError) {
      window.alert(error);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, error]);

  return (
    <div className="model_box">
      <Modal
        show={showUpdateMemberMenu}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-dialog-centered"
        style={{ background: 'rgba(0, 0, 0, 0.5)' }}
      >
        <Modal.Header>
          <Modal.Title>Update Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!(isMemberError || isMemberLoading) ? (
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
                    errors.birthDay != null &&
                    touched.birthDay &&
                    "border-danger"
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
          ) : isMemberError ? (
            <h2>Error with loading member: {memberError.message}</h2>
          ) : (
            <h2>Loading Member...</h2>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className={"btn btn-secondary"} onClick={handleCancelButton}>
            Cancel
          </button>
          <button
            className={`btn btn-success`}
            onClick={submitForm}
            disabled={isPending || isMemberError || isMemberLoading}
          >
            {isPending ? "Updating..." : "Update"}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MemberUpdateMenu;
