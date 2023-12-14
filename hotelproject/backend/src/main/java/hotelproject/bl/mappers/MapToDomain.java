package hotelproject.bl.mappers;

import hotelproject.bl.exceptions.*;
import hotelproject.bl.models.Address;
import hotelproject.bl.models.ContactInfo;
import hotelproject.bl.models.Customer;
import hotelproject.bl.models.Member;
import hotelproject.dl.models.CustomerEntity;
import hotelproject.dl.models.MemberEntity;

import java.util.ArrayList;
import java.util.List;

public class MapToDomain {
    public static List<Customer> MapToCustomersDomain(List<CustomerEntity> customersDB) throws CustomerException, AddressException, ContactInfoException, MemberException, BusinessLayerMappingException {
        try {
            List<Customer> customers = new ArrayList<>();
            for (CustomerEntity customerDB : customersDB) {
                customers.add(MapToCustomerDomain(customerDB));
            }
            return customers;
        } catch (CustomerException | ContactInfoException | AddressException | MemberException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new BusinessLayerMappingException(ex.getMessage(), ex);
        }
    }

    public static Customer MapToCustomerDomain(CustomerEntity c) throws AddressException, ContactInfoException, CustomerException, MemberException, BusinessLayerMappingException {
        try {
            Customer customer = new Customer(c.getId(), c.getName(), new ContactInfo(c.getEmail(), c.getPhone(), new Address(c.getAddress())));
            List<Member> members = MapToMembersDomain(c.getMembers());
            for (Member member : members) {
                customer.addMember((member));
            }
            return customer;
        } catch (CustomerException | ContactInfoException | AddressException | MemberException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new BusinessLayerMappingException(ex.getMessage(), ex);
        }
    }

    public static List<Member> MapToMembersDomain(List<MemberEntity> membersDB) throws MemberException, BusinessLayerMappingException {
        try {
            List<Member> members = new ArrayList<>();
            for (MemberEntity memberDB : membersDB) {
                if (memberDB.isStatus()) {
                    members.add(MapToMemberDomain(memberDB));
                }
            }
            return members;
        } catch (MemberException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new BusinessLayerMappingException(ex.getMessage(), ex);
        }
    }

    public static Member MapToMemberDomain(MemberEntity m) throws MemberException, BusinessLayerMappingException {
        try {
            return new Member(m.getId(), m.getName(), m.getBirthDay());
        } catch (MemberException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new BusinessLayerMappingException(ex.getMessage(), ex);
        }
    }
}
