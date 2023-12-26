package scansafe.app.scansafeapi.Ingredient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/ingredients")
public class IngredientController {

    @Autowired
    private IngredientRepo ingredientRepo;

    @GetMapping("/")
    public String getPage() {
        return "welcome!";
    }

    @CrossOrigin
    @GetMapping("/all")
    @PreAuthorize("hasRole('USER') or hasRole('INFLUENCER') or hasRole('ADMIN')")
    public List<scansafe.app.scansafeapi.Ingredient.IngredientModel> getIngredients() {
        return ingredientRepo.findAll();
    }

    @CrossOrigin
    @PostMapping("/save")
    @PreAuthorize("hasRole('ADMIN')")
    public String saveIngredient(@RequestBody scansafe.app.scansafeapi.Ingredient.IngredientModel ingredient) {
        ingredientRepo.save(ingredient);
        return "ingredient saved";
    }
    
    @CrossOrigin
    @GetMapping("/findByName/{name}")
    @PreAuthorize("hasRole('INFLUENCER')")
    public boolean getIngredientByName(@PathVariable String name) {
        if (ingredientRepo.findByName(name) != null) {
            if (name.toLowerCase().equals(ingredientRepo.findByName(name).getName().toLowerCase())) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
}
