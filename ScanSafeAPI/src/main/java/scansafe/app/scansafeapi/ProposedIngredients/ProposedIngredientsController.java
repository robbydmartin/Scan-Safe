package scansafe.app.scansafeapi.ProposedIngredients;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import scansafe.app.scansafeapi.User.response.MessageResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
/**
 *
 * @author Robby Martin
 */
@RestController
@RequestMapping("/api/proposedIngredients")
@CrossOrigin("http://localhost:3000")
public class ProposedIngredientsController {

    @Autowired
    private ProposedIngredientsRepo proposedIngredientsRepo;

    @Value("${scansafe.app.jwtSecret}")
    private String jwtSecret;

    @GetMapping("/all")
    @PreAuthorize("hasRole('USER') or hasRole('INFLUENCER') or hasRole('ADMIN')")
    public List<ProposedIngredients> getAllProposedIngredients(@RequestHeader("Authorization") String token) {
        String username = getUserNameFromJwtToken(token.substring(7, token.length()));
        return proposedIngredientsRepo.findByUsername(username);
    }

    @PostMapping("/save")
    @PreAuthorize("hasRole('USER') or hasRole('INFLUENCER') or hasRole('ADMIN')")
    public ProposedIngredients saveProposedIngredient(@RequestBody ProposedIngredients proposedIngredient, @RequestHeader("Authorization") String token) {
        String username = getUserNameFromJwtToken(token.substring(7, token.length()));
        proposedIngredient.setUsername(username);
        return proposedIngredientsRepo.save(proposedIngredient);
    }

    @PutMapping("/approve/{id}")
    public ResponseEntity<?> Approve(@PathVariable("id") Long id) {
        ProposedIngredients proposedIngredients = proposedIngredientsRepo.findById(id).orElseThrow(() -> new RuntimeException("Error: Proposal is not found."));
        proposedIngredients.setApproved(true);
        proposedIngredientsRepo.save(proposedIngredients);
        return ResponseEntity.ok(new MessageResponse("approved"));
    }
    
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('INFLUENCER') or hasRole('ADMIN')")
    public void deleteProposedIngredient(@PathVariable long id, @RequestHeader("Authorization") String token) {
        proposedIngredientsRepo.deleteById(id);
    }

    @GetMapping("/propIngredient/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('INFLUENCER') or hasRole('ADMIN')")
    public ProposedIngredients getProposedIngredientById(@PathVariable long id, @RequestHeader("Authorization") String token) {
        return proposedIngredientsRepo.findById(id).get();
    }

    @PutMapping("/propIngredient/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('INFLUENCER') or hasRole('ADMIN')")
    public ProposedIngredients updateProposedIngredient(@PathVariable long id, @RequestBody ProposedIngredients proposedIngredient, @RequestHeader("Authorization") String token) {
        ProposedIngredients updatedProposedIngredient = proposedIngredientsRepo.findById(id).get();

        updatedProposedIngredient.setName(proposedIngredient.getName());
        updatedProposedIngredient.setRisk(proposedIngredient.getRisk());
        updatedProposedIngredient.setWebsite(proposedIngredient.getWebsite());
        updatedProposedIngredient.setComments(proposedIngredient.getComments());

        return proposedIngredientsRepo.save(updatedProposedIngredient);
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(token).getBody().getSubject();

    }
}
