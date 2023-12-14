package hotelproject.rest.models;


public class CustomerInputDTO {
    public CustomerInputDTO(String name, String email, String phone, String municipality, String zipCode, String street, String houseNumber) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.municipality = municipality;
        this.zipCode = zipCode;
        this.street = street;
        this.houseNumber = houseNumber;
    }

    private String name;
    private String email;
    private String phone;
    private String municipality;
    private String zipCode;
    private String street;
    private String houseNumber;

    // Getters
    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getMunicipality() {
        return municipality;
    }

    public String getZipCode() {
        return zipCode;
    }

    public String getStreet() {
        return street;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    // Setters
    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setMunicipality(String municipality) {
        this.municipality = municipality;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }
}
