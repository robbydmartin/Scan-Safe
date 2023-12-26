package scansafe.app.scansafeapi.Ingredient;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepo extends JpaRepository<IngredientModel, Long> {
    IngredientModel findByName(String name);
}
