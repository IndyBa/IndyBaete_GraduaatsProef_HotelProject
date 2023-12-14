package hotelproject.dl.repositories;

import hotelproject.dl.models.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberJPARepository extends JpaRepository<MemberEntity, Long> {
    boolean existsByCustomerIdAndIdAndStatusIsTrue(Long customerId, Long id);
    List<MemberEntity> findAllByCustomerIdAndStatusIsTrue(Long customerId);
    MemberEntity findByIdAndStatusIsTrue(Long id);
}

