package hotelproject.bl.services;

import hotelproject.bl.exceptions.*;
import hotelproject.bl.models.Customer;
import hotelproject.bl.models.Member;
import hotelproject.dl.repositories.CustomerJPARepository;
import hotelproject.dl.repositories.MemberJPARepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

import static hotelproject.bl.mappers.MapToDB.MapToCustomerDB;
import static hotelproject.bl.mappers.MapToDB.MapToMemberDB;
import static hotelproject.bl.mappers.MapToDomain.*;

@Service
public class CustomerService {

    private final CustomerJPARepository customerRepository;
    private final MemberJPARepository memberRepository;

    @Autowired
    public CustomerService(CustomerJPARepository customerRepository, MemberJPARepository memberRepository ) {
        this.customerRepository = customerRepository;
        this.memberRepository = memberRepository;

    }

    public boolean existsCustomer(long id) throws CustomerServiceException {
        try {
            return customerRepository.existsByIdAndStatusIsTrue(id);
        } catch (Exception ex) {
            throw new CustomerServiceException(ex.getMessage(), ex);
        }
    }

    public List<Customer> getCustomers(String searchTerm) throws CustomerException, AddressException, ContactInfoException, MemberException, CustomerServiceException {
        try {
            if (searchTerm != null) { searchTerm = searchTerm.trim(); }
            return MapToCustomersDomain(customerRepository.findByNameContainingAndStatusIsTrue(Objects.requireNonNullElse(searchTerm, "")));
        } catch (CustomerException | ContactInfoException | AddressException | MemberException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new CustomerServiceException(ex.getMessage(), ex);
        }
    }

    public Customer getCustomer(long id) throws CustomerException, AddressException, ContactInfoException, MemberException, CustomerServiceException {
        try {
            return MapToCustomerDomain(customerRepository.findByIdAndStatusIsTrue(id));
        } catch (CustomerException | ContactInfoException | AddressException | MemberException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new CustomerServiceException(ex.getMessage(), ex);
        }
    }

    public Customer addCustomer(Customer customer) throws CustomerException, AddressException, ContactInfoException, MemberException, CustomerServiceException {
        try {
            return MapToCustomerDomain(customerRepository.save(MapToCustomerDB(customer)));
        } catch (CustomerException | ContactInfoException | AddressException | MemberException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new CustomerServiceException(ex.getMessage(), ex);
        }
    }

    public Customer updateCustomer(Customer customer) throws CustomerException, AddressException, ContactInfoException, MemberException, CustomerServiceException {
        try {
            for (Member member : MapToMembersDomain(memberRepository.findAllByCustomerIdAndStatusIsTrue(customer.getId()))) {
                customer.addMember(member);
            }

            return MapToCustomerDomain(customerRepository.save(MapToCustomerDB(customer)));
        } catch (CustomerException | ContactInfoException | AddressException | MemberException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new CustomerServiceException(ex.getMessage(), ex);
        }
    }

    public void deleteCustomer(long id) throws CustomerException, AddressException, ContactInfoException, MemberException, CustomerServiceException {
        try {
            Customer customer = getCustomer(id);
            customer.setStatus(false);

            for (Member member : customer.getMembers()) {
                member.setStatus(false);
            }

            MapToCustomerDomain(customerRepository.save(MapToCustomerDB(customer)));
        } catch (CustomerException | ContactInfoException | AddressException | MemberException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new CustomerServiceException(ex.getMessage(), ex);
        }
    }
}
