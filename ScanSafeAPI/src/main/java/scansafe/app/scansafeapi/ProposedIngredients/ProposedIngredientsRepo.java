package scansafe.app.scansafeapi.ProposedIngredients;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Robby Martin
 */
@Repository
public interface ProposedIngredientsRepo extends JpaRepository<ProposedIngredients, Long>{
    
    List<ProposedIngredients> findByUsername(String username);
}
