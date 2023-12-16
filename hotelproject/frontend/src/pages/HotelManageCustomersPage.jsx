import {  useState } from "react";
import CustomerList from "../components/CustomerList";
import CustomerAddMenu from "../components/CustomerAddMenu";
import CustomerUpdateMenu from "../components/CustomerUpdateMenu";

const HotelManageCustomersPage = () => {
  const [showAddCustomerMenu, setShowAddCustomerMenu] = useState(false);
  const handleAddCustomerClose = () => setShowAddCustomerMenu(false);
  const handleAddCustomerShow = () => setShowAddCustomerMenu(true);

  const [showUpdateCustomerMenu, setShowUpdateCustomerMenu] = useState(false);
  const handleUpdateCustomerClose = () => setShowUpdateCustomerMenu(false);
  const handleUpdateCustomerShow = () => setShowUpdateCustomerMenu(true);

  return (
    <>
      <CustomerList handleAddCustomerShow={handleAddCustomerShow} handleUpdateCustomerShow={handleUpdateCustomerShow} />

      <CustomerAddMenu handleAddCustomerClose={handleAddCustomerClose} showAddCustomerMenu={showAddCustomerMenu}/>

      <CustomerUpdateMenu handleUpdateCustomerClose={handleUpdateCustomerClose} showUpdateCustomerMenu={showUpdateCustomerMenu}/>
    </>
  );
};

export default HotelManageCustomersPage;