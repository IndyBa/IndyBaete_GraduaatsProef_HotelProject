package hotelproject.dl.models;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity(name="Member")
public class MemberEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private LocalDate birthDay;

    @Column
    private boolean status;

    @ManyToOne
    private CustomerEntity customer;

    public MemberEntity(Long id, String name, LocalDate birthDay, boolean status, CustomerEntity customer) {
        setId(id);
        setName(name);
        setBirthDay(birthDay);
        setStatus(status);
        setCustomer(customer);
    }

    public MemberEntity() {
        // Default constructor required by JPA
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getBirthDay() {
        return birthDay;
    }
    public void setBirthDay(LocalDate birthDay) {
        this.birthDay = birthDay;
    }

    public boolean isStatus() {
        return status;
    }
    public void setStatus(boolean status) {
        this.status = status;
    }

    public CustomerEntity getCustomer() {
        return customer;
    }
    public void setCustomer(CustomerEntity customer) {
        this.customer = customer;
    }
}
