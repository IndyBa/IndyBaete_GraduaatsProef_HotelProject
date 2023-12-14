package hotelproject.bl.models;

import hotelproject.bl.exceptions.AddressException;

public class Address {
    private String municipality;
    private String zipCode;
    private String houseNumber;
    private String street;

    public Address(String municipality, String zipCode, String street, String houseNumber) throws AddressException {
        setMunicipality(municipality);
        setZipCode(zipCode);
        setStreet(street);
        setHouseNumber(houseNumber);
    }

    public Address(String addressLine) throws AddressException {
        String[] parts = addressLine.split("\\|");
        setMunicipality(parts[0]);
        setZipCode(parts[1]);
        setStreet(parts[2]);
        setHouseNumber(parts[3]);
    }

    public String getMunicipality() {
        return municipality;
    }
    public void setMunicipality(String municipality) throws AddressException {
        if (municipality == null || municipality.trim().isEmpty()) {
            throw new AddressException("Invalid municipality");
        }
        this.municipality = municipality;
    }

    public String getZipCode() {
        return zipCode;
    }
    public void setZipCode(String zipCode) throws AddressException {
        if (zipCode == null || zipCode.trim().isEmpty()) {
            throw new AddressException("Invalid zipcode");
        }
        this.zipCode = zipCode;
    }

    public String getHouseNumber() {
        return houseNumber;
    }
    public void setHouseNumber(String houseNumber) throws AddressException {
        if (houseNumber == null || houseNumber.trim().isEmpty()) {
            throw new AddressException("Invalid house number");
        }
        this.houseNumber = houseNumber;
    }

    public String getStreet() {
        return street;
    }
    public void setStreet(String street) throws AddressException {
        if (street == null || street.trim().isEmpty()) {
            throw new AddressException("Invalid street");
        }
        this.street = street;
    }

    @Override
    public String toString() {
        return municipality + "|" + zipCode + "|" + street + "|" + houseNumber;
    }
}
