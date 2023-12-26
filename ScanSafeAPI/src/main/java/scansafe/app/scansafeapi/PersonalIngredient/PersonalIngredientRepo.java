package scansafe.app.scansafeapi.PersonalIngredient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import scansafe.app.scansafeapi.Ingredient.IngredientModel;

import java.util.List;

@Repository
public interface PersonalIngredientRepo extends JpaRepository<PersonalIngredientModel, Long> {
    List<PersonalIngredientModel> findByUsername(String username);
    PersonalIngredientModel findById(long id);
}
