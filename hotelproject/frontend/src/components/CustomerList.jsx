import { getCustomers, deleteCustomer } from "../api/customer";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { MdDeleteOutline , MdEdit } from "react-icons/md";

// eslint-disable-next-line react/prop-types
const CustomerList = ({ handleAddCustomerOpen, handleUpdateCustomerOpen, showAddCustomerMenu, showUpdateCustomerMenu }) => {
  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ["getCustomers"],
    queryFn: () => getCustomers(searchRef.current.value),
    retry: false,
  });

  const { mutate } = useMutation({
    mutationKey: ["deleteCustomer"],
    mutationFn: deleteCustomer,
  });

  useEffect(() => {
    refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAddCustomerMenu, showUpdateCustomerMenu])

  const searchRef = useRef("");

  const handleSearch = (event) => {
    event.preventDefault();
    refetch();
  };

  const handleDelete = (customerId) => {
    const confirm = window.confirm(
      `Are your sure you want to delete this customer? (Customer Id: ${customerId})`
    );
    if (confirm) {
      mutate(customerId, {
        onSuccess: () => {
          searchRef.current.value = "";
          refetch();
        },
        onError: (error) => {
          alert(error);
          searchRef.current.value = "";
          refetch();
        },
      });
    }
  };

  return (
    <div className="container">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="row">
          <div className="col-sm-3 mt-3 mb-4 text-gred">
            <div className="search">
              <form className="form-inline" onSubmit={handleSearch}>
                <input
                  ref={searchRef}
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search Customer"
                  aria-label="Search"
                  name="search"
                />
              </form>
            </div>
          </div>
          <div className="col-sm-9 mt-3 mb-4 text-gred d-flex justify-content-end">
            <button onClick={handleAddCustomerOpen} className="btn btn-success">
              Add Customer
            </button>
          </div>
        </div>
        <div className="row">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered mb-0">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Municipality</th>
                  <th>Zip Code</th>
                  <th>Street</th>
                  <th>House Number</th>
                  <th>Members</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {!(isLoading || isError) && (
                <tbody>
                  {data &&
                    data.map((customer) => (
                      <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.municipality}</td>
                        <td>{customer.zipCode}</td>
                        <td>{customer.street}</td>
                        <td>{customer.houseNumber}</td>
                        <td>{customer.nrOfMembers}</td>
                        <td className="space-x-2">
                          <button
                            onClick={() => handleUpdateCustomerOpen(customer.id)}
                          >
                            <MdEdit fontSize="1.5em"/>
                          </button>
                          <button
                            onClick={() => handleDelete(customer.id)}
                          >
                            <MdDeleteOutline fontSize="1.5em"/>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
        {(isLoading || isError) && (
          <div className="flex items-center">
            <h2 className="text-center mx-auto">
              {isLoading
                ? "Loading..."
                : error.response == null ? "Error: Couldn't connect to the server" : 
                error.response.status === 404
                ? "No Customers Found"
                : `${error.message}`}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerList;
