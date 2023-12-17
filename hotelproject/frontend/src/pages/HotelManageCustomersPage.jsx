import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCustomer } from "../api/customer";
import CustomerList from "../components/CustomerList";
import CustomerAddMenu from "../components/CustomerAddMenu";
import CustomerUpdateMenu from "../components/CustomerUpdateMenu";

const HotelManageCustomersPage = () => {
  const [showAddCustomerMenu, setShowAddCustomerMenu] = useState(false);
  const handleAddCustomerClose = () => setShowAddCustomerMenu(false);
  const handleAddCustomerOpen = () => setShowAddCustomerMenu(true);

  const [updateCustomerId, setUpdateCustomerId] = useState(null);
  const [showUpdateCustomerMenu, setShowUpdateCustomerMenu] = useState(false);
  const handleUpdateCustomerClose = () => setShowUpdateCustomerMenu(false);
  const handleUpdateCustomerOpen = (customerId) => {
    setShowUpdateCustomerMenu(true);
    setUpdateCustomerId(customerId);
  }

  const { data, isLoading, error, isError, refetch} = useQuery({
    queryKey: ["getCustomer"],
    queryFn: () => getCustomer(updateCustomerId),
    retry: false,
  });

  useEffect(() => {
    refetch();
  }, [updateCustomerId])

  return (
    <>
      <CustomerList handleAddCustomerOpen={handleAddCustomerOpen} handleUpdateCustomerOpen={handleUpdateCustomerOpen} showAddCustomerMenu={showAddCustomerMenu}  showUpdateCustomerMenu={showUpdateCustomerMenu} />

      <CustomerAddMenu handleAddCustomerClose={handleAddCustomerClose} showAddCustomerMenu={showAddCustomerMenu}/>

      <CustomerUpdateMenu handleUpdateCustomerClose={handleUpdateCustomerClose} showUpdateCustomerMenu={showUpdateCustomerMenu} customer={{ customerData: data, isCustomerLoading: isLoading, isCustomerError: isError, customerError: error }}/>
    </>
  );
};

export default HotelManageCustomersPage;