package hotelproject.bl.services;

import hotelproject.bl.exceptions.*;
import hotelproject.bl.models.Customer;
import hotelproject.bl.models.Member;
import hotelproject.dl.models.MemberEntity;
import hotelproject.dl.repositories.CustomerJPARepository;
import hotelproject.dl.repositories.MemberJPARepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static hotelproject.bl.mappers.MapToDB.*;
import static hotelproject.bl.mappers.MapToDomain.*;

@Service
public class MemberService {

    private final CustomerJPARepository customerRepository;
    private final MemberJPARepository memberRepository;

    @Autowired
    public MemberService(CustomerJPARepository customerRepository, MemberJPARepository memberRepository ) {
        this.customerRepository = customerRepository;
        this.memberRepository = memberRepository;
    }

    public boolean existsMember(long memberId, long customerId) throws MemberServiceException {
        try {
            return memberRepository.existsByCustomerIdAndIdAndStatusIsTrue(memberId, customerId);
        } catch (Exception ex) {
            throw new MemberServiceException(ex.getMessage(), ex);
        }
    }

    public List<Member> getMembers(long customerId) throws MemberException, MemberServiceException {
        try {
            return MapToMembersDomain(memberRepository.findAllByCustomerIdAndStatusIsTrue(customerId));
        } catch (MemberException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new MemberServiceException(ex.getMessage(), ex);
        }
    }

    public Member getMember(long memberId) throws MemberException, MemberServiceException {
        try {
            return MapToMemberDomain(memberRepository.findByIdAndStatusIsTrue(memberId));
        } catch (MemberException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new MemberServiceException(ex.getMessage(), ex);
        }
    }

    public Member addMember(Member member, long customerId) throws MemberException, CustomerException, AddressException, ContactInfoException, MemberServiceException {
        try {
            Customer customer = MapToCustomerDomain(customerRepository.findByIdAndStatusIsTrue(customerId));
            customer.addMember(member);

            MemberEntity memberDB = MapToMemberDB(member, MapToCustomerDB(customer));
            return MapToMemberDomain(memberRepository.save(memberDB));
        } catch (MemberException | CustomerException | AddressException | ContactInfoException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new MemberServiceException(ex.getMessage(), ex);
        }
    }

    public Member updateMember(Member member, long customerId) throws CustomerException, AddressException, ContactInfoException, MemberException, MemberServiceException {
        try {
            Customer customer = MapToCustomerDomain(customerRepository.findByIdAndStatusIsTrue(customerId));
            customer.updateMember(member);

            MemberEntity memberDB = MapToMemberDB(member, MapToCustomerDB(customer));
            return MapToMemberDomain(memberRepository.save(memberDB));
        } catch (CustomerException | ContactInfoException | AddressException | MemberException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new MemberServiceException(ex.getMessage(), ex);
        }
    }

    public void deleteMember(long memberId, long customerId) throws CustomerException, AddressException, ContactInfoException, MemberException, MemberServiceException {
        try {
            Member member = MapToMemberDomain(memberRepository.findByIdAndStatusIsTrue(memberId));
            member.setStatus(false);

            Customer customer = MapToCustomerDomain(customerRepository.findByIdAndStatusIsTrue(customerId));
            customer.updateMember(member);

            memberRepository.save(MapToMemberDB(member, MapToCustomerDB(customer)));
        } catch (CustomerException | ContactInfoException | AddressException | MemberException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new MemberServiceException(ex.getMessage(), ex);
        }
    }
}
