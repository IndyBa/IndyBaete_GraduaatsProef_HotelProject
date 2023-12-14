package hotelproject.rest.mappers;

import hotelproject.bl.models.*;
import hotelproject.rest.exceptions.RestLayerMappingException;
import hotelproject.rest.models.*;

import java.util.ArrayList;
import java.util.List;

public class MapFromDomain {
    public static List<CustomerOutputDTO> MapFromCustomersDomain(List<Customer> costumersDomain) throws RestLayerMappingException {
        try {
            List<CustomerOutputDTO> customers = new ArrayList<>();
            for (Customer customerDomain : costumersDomain) {
                customers.add(MapFromCustomerDomain(customerDomain));
            }
            return customers;
        } catch (Exception ex) {
            throw new RestLayerMappingException(ex.getMessage(), ex);
        }
    }

    public static CustomerOutputDTO MapFromCustomerDomain(Customer c) throws RestLayerMappingException {
        try {
            ContactInfo ci = c.getContactInfo();
            Address a = ci.getAddress();
            return new CustomerOutputDTO(c.getId(), c.getName(), ci.getEmail(), ci.getPhone(), a.getMunicipality(), a.getZipCode(), a.getStreet(), a.getHouseNumber(), c.getMembers().size());
        } catch (Exception ex) {
            throw new RestLayerMappingException(ex.getMessage(), ex);
        }
    }

    public static List<MemberOutputDTO> MapFromMembersDomain(List<Member> membersDomain) throws RestLayerMappingException {
        try {
            List<MemberOutputDTO> members = new ArrayList<>();
            for (Member memberDomain : membersDomain) {
                members.add(MapFromMemberDomain(memberDomain));
            }
            return members;
        } catch (Exception ex) {
            throw new RestLayerMappingException(ex.getMessage(), ex);
        }
    }

    public static MemberOutputDTO MapFromMemberDomain(Member m) throws RestLayerMappingException {
        try {
            return new MemberOutputDTO(m.getId(), m.getName(), m.getBirthDay());
        } catch (Exception ex) {
            throw new RestLayerMappingException(ex.getMessage(), ex);
        }
    }
}
