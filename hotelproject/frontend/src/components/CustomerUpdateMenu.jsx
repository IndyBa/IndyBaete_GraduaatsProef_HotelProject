import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateCustomer } from "../api/customer";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import MemberList from "./MemberList";
import { useQuery } from "@tanstack/react-query";
import { getMember } from "../api/member";
import MemberAddMenu from "./MemberAddMenu";
import MemberUpdateMenu from "./MemberUpdateMenu";

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
const CustomerUpdateMenu = ({handleUpdateCustomerClose, showUpdateCustomerMenu, customer}) => {
  const { customerData, isCustomerLoading, isCustomerError, customerError } =
    customer ?? {};
  const { id, name, email, phone, municipality, zipCode, street, houseNumber } =
    customerData ?? {};

  const { isError, error, mutate, isSuccess, isPending } = useMutation({
    mutationKey: ["updateCustomer"],
    mutationFn: (updateData) =>
      updateCustomer(updateData.values, updateData.id),
  });

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    submitForm,
    setValues,
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
      mutate({ values: values, id: id });
    },
    validationSchema: CustomerValidationSchema,
  });

  useEffect(() => {
    setValues({
      name: name || "",
      email: email || "",
      phone: phone || "",
      municipality: municipality || "",
      zipCode: zipCode || "",
      street: street || "",
      houseNumber: houseNumber || "",
    });
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, email, phone, municipality, zipCode, street, houseNumber]);

  const handleCancelButton = () => {
    handleUpdateCustomerClose();
  };

  useEffect(() => {
    if (isSuccess) {
      handleUpdateCustomerClose();
    } else if (isError) {
      window.alert(error);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, error]);

  const [showAddMemberMenu, setShowAddMemberMenu] = useState(false);
  const handleAddMemberClose = () => setShowAddMemberMenu(false);
  const handleAddMemberOpen = () => setShowAddMemberMenu(true);

  const [updateMemberId, setUpdateMemberId] = useState(null);
  const [showUpdateMemberMenu, setShowUpdateMemberMenu] = useState(false);
  const handleUpdateMemberClose = () => setShowUpdateMemberMenu(false);
  const handleUpdateMemberOpen = (memberId) => {
    setShowUpdateMemberMenu(true);
    setUpdateMemberId(memberId);
  };

  const {
    data: memberData,
    isLoading: isMemberLoading,
    error: memberError,
    isError: isMemberError,
    refetch: memberRefetch,
  } = useQuery({
    queryKey: ["getMember"],
    queryFn: () => getMember(id, updateMemberId),
    retry: false,
  });

  useEffect(() => {
    memberRefetch();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMemberId]);

  return (
    <div className="model_box">
      <Modal
        show={showUpdateCustomerMenu}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-dialog-centered"
        size="xl"
      >
        <Modal.Header>
          <Modal.Title>Update Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!(isCustomerError || isCustomerLoading) ? (
            <div className="row">
              <div className="col-md-12 col-lg-5 col-xl-4">
                <form onSubmit={handleSubmit}>
                  <div>
                    <label
                      className="block text-md font-medium text-gray-700 uppercase"
                      htmlFor="title"
                    >
                      Name
                    </label>
                    <input
                      className={`block border rounded shadow-sm p-1 w-72 ${
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
                      className={`block border rounded shadow-sm p-1 w-72 ${
                        errors.email != null && touched.email && "border-danger"
                      }`}
                      id="email"
                      type="text"
                      value={values.email}
                      onChange={handleChange}
                    />
                    {errors.email != null && touched.email ? (
                      <p className="text-xs text-red-600 mb-1">
                        {errors.email}
                      </p>
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
                      className={`block border rounded shadow-sm p-1 w-72 ${
                        errors.phone != null && touched.phone && "border-danger"
                      }`}
                      id="phone"
                      type="text"
                      value={values.phone}
                      onChange={handleChange}
                    />
                    {errors.phone != null && touched.phone ? (
                      <p className="text-xs text-red-600 mb-1">
                        {errors.phone}
                      </p>
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
                      className={`block border rounded shadow-sm p-1 w-72 ${
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
                      className={`block border rounded shadow-sm p-1 w-72 ${
                        errors.zipCode != null &&
                        touched.zipCode &&
                        "border-danger"
                      }`}
                      id="zipCode"
                      type="text"
                      value={values.zipCode}
                      onChange={handleChange}
                    />
                    {errors.zipCode != null && touched.zipCode ? (
                      <p className="text-xs text-red-600 mb-1">
                        {errors.zipCode}
                      </p>
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
                      className={`block border rounded shadow-sm p-1 w-72 ${
                        errors.street != null &&
                        touched.street &&
                        "border-danger"
                      }`}
                      id="street"
                      type="text"
                      value={values.street}
                      onChange={handleChange}
                    />
                    {errors.street != null && touched.street ? (
                      <p className="text-xs text-red-600 mb-1">
                        {errors.street}
                      </p>
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
                      className={`block border rounded shadow-sm p-1 w-72 ${
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
              </div>
              <div className="col-lg-6 col-xl-7">
                {id && (
                  <>
                    <MemberList
                      handleAddMemberOpen={handleAddMemberOpen}
                      handleUpdateMemberOpen={handleUpdateMemberOpen}
                      showAddMemberMenu={showAddMemberMenu}
                      showUpdateMemberMenu={showUpdateMemberMenu}
                      customerId={id}
                    />
                    <MemberAddMenu
                      handleAddMemberClose={handleAddMemberClose}
                      showAddMemberMenu={showAddMemberMenu}
                      customerId={id}
                    />
                    <MemberUpdateMenu
                      handleUpdateMemberClose={handleUpdateMemberClose}
                      showUpdateMemberMenu={showUpdateMemberMenu}
                      customerId={id}
                      member={{
                        memberData: memberData,
                        isMemberLoading: isMemberLoading,
                        isMemberError: isMemberError,
                        memberError: memberError,
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          ) : isCustomerError ? (
            <h2>Error with loading customer: {customerError.message}</h2>
          ) : (
            <h2>Loading customer...</h2>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className={"btn btn-secondary"} onClick={handleCancelButton}>
            Cancel
          </button>
          <button
            className={`btn btn-success`}
            onClick={submitForm}
            disabled={isPending || isCustomerError || isCustomerLoading}
          >
            {isPending ? "Updating..." : "Update"}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomerUpdateMenu;
