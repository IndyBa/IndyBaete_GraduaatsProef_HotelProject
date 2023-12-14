package hotelproject.bl.models;

import java.util.ArrayList;
import java.util.List;
import hotelproject.bl.exceptions.CustomerException;

public class Customer {
    private String name;
    private long id;
    private ContactInfo contactInfo;
    private boolean status;
    private final List<Member> members = new ArrayList<>();

    public Customer(long id, String name, ContactInfo contactInfo) throws CustomerException {
        setId(id);
        setName(name);
        setContactInfo(contactInfo);
        setStatus(true);
    }

    public Customer(String name, ContactInfo contactInfo) throws CustomerException {
        setName(name);
        setContactInfo(contactInfo);
        setStatus(true);
    }

    public long getId() {
        return id;
    }
    public void setId(long id) throws CustomerException {
        if (id <= 0) {
            throw new CustomerException("Invalid id");
        }
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) throws CustomerException {
        if (name == null || name.trim().isEmpty()) {
            throw new CustomerException("Invalid name");
        }
        this.name = name;
    }

    public ContactInfo getContactInfo() {
        return contactInfo;
    }
    public void setContactInfo(ContactInfo contactInfo) throws CustomerException {
        if (contactInfo == null) {
            throw new CustomerException("ContactInfo is null");
        }
        this.contactInfo = contactInfo;
    }

    public boolean isStatus() {
        return status;
    }
    public void setStatus(boolean status) {
        this.status = status;
    }

    public List<Member> getMembers() {
        return members;
    }
    public void addMember(Member member) throws CustomerException {
        if (!members.contains(member) && member != null) {
            members.add(member);
        } else {
            throw new CustomerException("Couldn't add the member");
        }
    }
    public void updateMember(Member updatedMember) throws CustomerException {
        if (updatedMember != null) {
            for (Member member : members) {
                if (member.getId() == updatedMember.getId()) {
                    members.remove(member);
                    members.add(updatedMember);
                    break;
                }
            }
        } else {
            throw new CustomerException("Couldn't update the member");
        }
    }
}
