package scansafe.app.scansafeapi.PersonalIngredient;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import scansafe.app.scansafeapi.Ingredient.IngredientModel;
import scansafe.app.scansafeapi.Security.jwt.JwtUtils.*;
import scansafe.app.scansafeapi.User.response.MessageResponse;

import java.security.Key;
import java.util.List;


@RestController
@RequestMapping("/api/personal-ingredients")
public class PersonalIngredientController {

    @Autowired
    private PersonalIngredientRepo personalIngredientRepo;

    @Value("${scansafe.app.jwtSecret}")
    private String jwtSecret;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/save")
    @PreAuthorize("hasRole('USER') or hasRole('INFLUENCER') or hasRole('ADMIN')")
    public ResponseEntity<?> addIngredient(@RequestBody scansafe.app.scansafeapi.PersonalIngredient.PersonalIngredientModel ingredient, @RequestHeader("Authorization") String token) {
        String username = getUserNameFromJwtToken(token.substring(7, token.length()));
        ingredient.setUsername(username);
        personalIngredientRepo.save(ingredient);
        return ResponseEntity.ok(new MessageResponse("ingredient saved."));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/all-from-user")
    @PreAuthorize("hasRole('USER') or hasRole('INFLUENCER') or hasRole('ADMIN')")
    public List<scansafe.app.scansafeapi.PersonalIngredient.PersonalIngredientModel> getPersonalIngredients(@RequestHeader("Authorization") String token) {
        String username = getUserNameFromJwtToken(token.substring(7, token.length()));
        return personalIngredientRepo.findByUsername(username);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('INFLUENCER') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteIngredient(@PathVariable("id") Long id, @RequestHeader("Authorization") String token) {
        String username = getUserNameFromJwtToken(token.substring(7, token.length()));
        PersonalIngredientModel ingredient = personalIngredientRepo.getById(id);

        if (!ingredient.getUsername().equals(username)) {
            return ResponseEntity.badRequest().body((new MessageResponse("ingredient not deleted. does not belong to calling user.")));
        }

        personalIngredientRepo.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("ingredient deleted."));
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(token).getBody().getSubject();
    }
}