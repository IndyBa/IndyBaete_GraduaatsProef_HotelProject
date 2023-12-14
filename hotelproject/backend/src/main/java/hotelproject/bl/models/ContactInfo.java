package hotelproject.bl.models;

import hotelproject.bl.exceptions.ContactInfoException;

public class ContactInfo {
    private String email;
    private String phone;
    private Address address;

    public ContactInfo(String email, String phone, Address address) throws ContactInfoException {
        setEmail(email);
        setPhone(phone);
        setAddress(address);
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) throws ContactInfoException {
        if (email == null || !email.contains("@")) {
            throw new ContactInfoException("Invalid email");
        }
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) throws ContactInfoException {
        if (phone == null || phone.trim().isEmpty()) {
            throw new ContactInfoException("Invalid phone");
        }
        this.phone = phone;
    }

    public Address getAddress() {
        return address;
    }
    public void setAddress(Address address) throws ContactInfoException {
        if (address == null) {
            throw new ContactInfoException("Address is null");
        }
        this.address = address;
    }
}
