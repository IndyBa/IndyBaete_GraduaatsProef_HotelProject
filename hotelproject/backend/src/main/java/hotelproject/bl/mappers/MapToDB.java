package hotelproject.bl.mappers;

import hotelproject.bl.exceptions.*;
import hotelproject.bl.models.ContactInfo;
import hotelproject.bl.models.Customer;
import hotelproject.bl.models.Member;
import hotelproject.dl.models.CustomerEntity;
import hotelproject.dl.models.MemberEntity;

import java.util.ArrayList;
import java.util.List;

public class MapToDB {
    public static CustomerEntity MapToCustomerDB(Customer c) throws BusinessLayerMappingException {
        try {
            ContactInfo ci = c.getContactInfo();
            CustomerEntity customerDB = new CustomerEntity(c.getId(), c.getName(), ci.getEmail(), ci.getPhone(), ci.getAddress().toString(), c.isStatus());
            customerDB.setMembers(MapToMembersDB(c.getMembers(), customerDB));
            return customerDB;
        } catch (Exception ex) {
            throw new BusinessLayerMappingException(ex.getMessage(), ex);
        }
    }

    public static List<MemberEntity> MapToMembersDB(List<Member> members, CustomerEntity customerDB) throws BusinessLayerMappingException {
        try {
            List<MemberEntity> membersDB = new ArrayList<>();
            for (Member member : members) {
                membersDB.add(MapToMemberDB(member, customerDB));
            }
            return membersDB;
        } catch (Exception ex) {
            throw new BusinessLayerMappingException(ex.getMessage(), ex);
        }
    }

    public static MemberEntity MapToMemberDB(Member m, CustomerEntity customerDB) throws BusinessLayerMappingException {
        try {
            return new MemberEntity(m.getId(), m.getName(), m.getBirthDay(), m.isStatus(), customerDB);
        } catch (Exception ex) {
            throw new BusinessLayerMappingException(ex.getMessage(), ex);
        }
    }
}
