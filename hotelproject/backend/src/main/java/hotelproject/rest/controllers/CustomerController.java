package hotelproject.rest.controllers;

import hotelproject.bl.exceptions.*;
import hotelproject.bl.models.Customer;
import hotelproject.bl.models.Member;
import hotelproject.bl.services.*;
import hotelproject.rest.exceptions.CustomBadRequestException;
import hotelproject.rest.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

import static hotelproject.rest.mappers.MapFromDomain.*;
import static hotelproject.rest.mappers.MapToDomain.*;

@RestController
@RequestMapping("/api")
public class CustomerController {

    private final CustomerService customerService;
    private final MemberService memberService;

    @Autowired
    public CustomerController(CustomerService customerService, MemberService memberService) {
        this.customerService = customerService;
        this.memberService = memberService;
    }

    @GetMapping("/customer")
    public ResponseEntity<List<CustomerOutputDTO>> getCustomers(@RequestParam(name = "searchTerm", required = false) String searchTerm) {
        try {
            List<CustomerOutputDTO> customers = MapFromCustomersDomain(customerService.getCustomers(searchTerm));
            if (customers.isEmpty()) { return ResponseEntity.notFound().build(); }

            return ResponseEntity.ok(customers);
        } catch (Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/customer")
    public ResponseEntity<CustomerOutputDTO> postCustomer(@RequestBody CustomerInputDTO customerInput) {
        try {
            CustomerOutputDTO createdCustomer = MapFromCustomerDomain(customerService.addCustomer(MapToCustomerDomain(customerInput)));

            URI location = URI.create("/customer/" + createdCustomer.getId());

            return ResponseEntity.created(location).body(createdCustomer);
        } catch (CustomerException | ContactInfoException | AddressException | MemberException ex) {
            throw new CustomBadRequestException(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/customer/{id}")
    public ResponseEntity<CustomerOutputDTO> getCustomer(@PathVariable long id) {
        try {
            if (!customerService.existsCustomer(id)) { return ResponseEntity.notFound().build(); }

            return ResponseEntity.ok(MapFromCustomerDomain(customerService.getCustomer(id)));
        } catch (Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping ("/customer/{id}")
    public ResponseEntity<CustomerOutputDTO> putCustomer(@PathVariable long id, @RequestBody CustomerInputDTO customerInput) {
        try {
            if (!customerService.existsCustomer(id)) { return ResponseEntity.notFound().build(); }

            Customer updatedCustomer = MapToCustomerDomain(customerInput);
            updatedCustomer.setId(id);

            CustomerOutputDTO updatedCustomerOutputDto = MapFromCustomerDomain(customerService.updateCustomer(updatedCustomer));

            return ResponseEntity.ok().body(updatedCustomerOutputDto);
        } catch (CustomerException | ContactInfoException | AddressException | MemberException ex) {
            throw new CustomBadRequestException(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping ("/customer/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable long id) {
        try {
            if (!customerService.existsCustomer(id)) { return ResponseEntity.notFound().build(); }

            customerService.deleteCustomer(id);

            return ResponseEntity.noContent().build();
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping ("/customer/{id}/member")
    public ResponseEntity<List<MemberOutputDTO>> getMembers(@PathVariable long id) {
        try {
            if (!customerService.existsCustomer(id)) { return ResponseEntity.notFound().build(); }

            List<MemberOutputDTO> members = MapFromMembersDomain(memberService.getMembers(id));
            if (members.isEmpty()) { return ResponseEntity.notFound().build(); }

            return ResponseEntity.ok(members);
        } catch (Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping ("/customer/{id}/member")
    public ResponseEntity<MemberOutputDTO> postMembers(@PathVariable long id, @RequestBody MemberInputDTO memberInput) {
        try {
            if (!customerService.existsCustomer(id)) { return ResponseEntity.notFound().build(); }

            MemberOutputDTO createdMember = MapFromMemberDomain(memberService.addMember(MapToMemberDomain(memberInput), id));

            URI location = URI.create("/customer/" + id + "/" + createdMember.getId());

            return ResponseEntity.created(location).body(createdMember);
        } catch (CustomerException | ContactInfoException | AddressException | MemberException ex) {
            throw new CustomBadRequestException(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping ("/customer/{customerId}/member/{memberId}")
    public ResponseEntity<MemberOutputDTO> getMembers(@PathVariable long customerId, @PathVariable long memberId) {
        try {
            if (!memberService.existsMember(customerId, memberId)) { return ResponseEntity.notFound().build(); }

            return ResponseEntity.ok(MapFromMemberDomain(memberService.getMember(memberId)));
        } catch (Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping ("/customer/{customerId}/member/{memberId}")
    public ResponseEntity<MemberOutputDTO> putCustomer(@PathVariable long customerId, @PathVariable long memberId, @RequestBody MemberInputDTO memberInput) {
        try {
            if (!memberService.existsMember(customerId, memberId)) { return ResponseEntity.notFound().build(); }

            Member member = MapToMemberDomain(memberInput);
            member.setId(memberId);

            MemberOutputDTO updatedMemberOutputDto = MapFromMemberDomain(memberService.updateMember(member, customerId));

            return ResponseEntity.ok().body(updatedMemberOutputDto);
        } catch (CustomerException | ContactInfoException | AddressException | MemberException ex) {
            throw new CustomBadRequestException(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping ("/customer/{customerId}/member/{memberId}")
    public ResponseEntity<Void> putCustomer(@PathVariable long customerId, @PathVariable long memberId) {
        try {
            if (!memberService.existsMember(customerId, memberId)) { return ResponseEntity.notFound().build(); }

            memberService.deleteMember(memberId, customerId);

            return ResponseEntity.noContent().build();
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }
}
