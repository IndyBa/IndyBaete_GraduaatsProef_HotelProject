package hotelproject.rest.mappers;

import hotelproject.bl.exceptions.*;
import hotelproject.bl.models.*;
import hotelproject.rest.exceptions.RestLayerMappingException;
import hotelproject.rest.models.CustomerInputDTO;
import hotelproject.rest.models.MemberInputDTO;

public class MapToDomain {
    public static Customer MapToCustomerDomain(CustomerInputDTO c) throws CustomerException, AddressException, ContactInfoException, RestLayerMappingException {
        try {
            return new Customer(c.getName(), new ContactInfo(c.getEmail(), c.getPhone(), new Address(c.getMunicipality(), c.getZipCode(), c.getStreet(), c.getHouseNumber())));
        } catch (CustomerException | ContactInfoException | AddressException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new RestLayerMappingException(ex.getMessage(), ex);
        }
    }

    public static Member MapToMemberDomain(MemberInputDTO m) throws MemberException, RestLayerMappingException {
        try {
            return new Member(m.getName(), m.getBirthDay());
        } catch (MemberException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new RestLayerMappingException(ex.getMessage(), ex);
        }
    }
}