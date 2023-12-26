package scansafe.app.scansafeapi.AlternativeProducts;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Robby Martin
 */
@Repository
public interface AlternativeProductsRepo extends JpaRepository<AlternativeProducts, Long> {
   
    List<AlternativeProducts> findByUsername(String username);
    List<AlternativeProducts> findByUserId(long userId);
    List<AlternativeProducts> findByUpc(String upc);
}
