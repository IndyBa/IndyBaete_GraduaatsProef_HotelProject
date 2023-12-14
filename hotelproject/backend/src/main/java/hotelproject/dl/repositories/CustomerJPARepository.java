package hotelproject.dl.repositories;

import hotelproject.dl.models.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerJPARepository extends JpaRepository<CustomerEntity, Long> {
    boolean existsByIdAndStatusIsTrue(Long id);
    List<CustomerEntity> findByNameContainingAndStatusIsTrue(String name);
    CustomerEntity findByIdAndStatusIsTrue(Long id);
}