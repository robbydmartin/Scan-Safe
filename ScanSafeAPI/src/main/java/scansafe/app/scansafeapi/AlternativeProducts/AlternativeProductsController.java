package scansafe.app.scansafeapi.AlternativeProducts;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import scansafe.app.scansafeapi.User.response.MessageResponse;
import org.springframework.http.ResponseEntity;
/**
 *
 * @author Robby Martin
 */
@RestController
@RequestMapping("/api/alternativeProducts")
@CrossOrigin(origins = "*")
public class AlternativeProductsController {
    
    @Autowired
    private AlternativeProductsRepo alternativeProductRepo;
 
    @Value("${scansafe.app.jwtSecret}")
    private String jwtSecret;
        
    @GetMapping("/all")
    @PreAuthorize("hasRole('INFLUENCER') or hasRole('ADMIN')")
    public List<AlternativeProducts> getAllAlternativeProducts(@RequestHeader("Authorization") String token) {
        String username = getUserNameFromJwtToken(token.substring(7, token.length()));
        return alternativeProductRepo.findByUsername(username);
    }

    @GetMapping("/{upc}")
    @PreAuthorize("hasRole('USER') or hasRole('INFLUENCER') or hasRole('ADMIN')")
    public List<AlternativeProducts> getAlternativeProductsFromUPC(@PathVariable("upc") String upc, @RequestHeader("Authorization") String token) {
        return alternativeProductRepo.findByUpc(upc);
    }

    
    @PostMapping("/save")
    @PreAuthorize("hasRole('USER') or hasRole('INFLUENCER') or hasRole('ADMIN')")
    public AlternativeProducts saveAlternativeProducts(@RequestBody AlternativeProducts alternativeProduct, @RequestHeader("Authorization") String token) {
        String username = getUserNameFromJwtToken(token.substring(7, token.length()));
        alternativeProduct.setUsername(username);
        return alternativeProductRepo.save(alternativeProduct);
    }
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<?> deleteProduct(@PathVariable("id") Long id) {
//        AlternativeProducts alt = alternativeProductRepo.findById(id).orElseThrow(() -> new RuntimeException("Error: Product is not found."));
//        alternativeProductRepo.deleteById(id);
//        return ResponseEntity.ok(new MessageResponse("deleted"));
//    }
    
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('INFLUENCER') or hasRole('ADMIN')")
    public void deleteAlternativeProduct(@PathVariable long id, @RequestHeader("Authorization") String token) {
        alternativeProductRepo.deleteById(id);
    }
    
    @GetMapping("/altProduct/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('INFLUENCER') or hasRole('ADMIN')")
    public AlternativeProducts getAlternativeProductById(@PathVariable long id, @RequestHeader("Authorization") String token) {
        return alternativeProductRepo.findById(id).get();
    }
    
    @PutMapping("/altProduct/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('INFLUENCER') or hasRole('ADMIN')")
    public AlternativeProducts updateAlternativeProduct(@PathVariable long id, @RequestBody AlternativeProducts alternativeProduct, @RequestHeader("Authorization") String token) {
        AlternativeProducts updatedAlternativeProduct = alternativeProductRepo.findById(id).get();
        
        updatedAlternativeProduct.setAltProduct(alternativeProduct.getAltProduct());
        updatedAlternativeProduct.setReplacesProduct(alternativeProduct.getReplacesProduct());
        updatedAlternativeProduct.setUpc(alternativeProduct.getUpc());
        updatedAlternativeProduct.setNotes(alternativeProduct.getNotes());
        
        return alternativeProductRepo.save(updatedAlternativeProduct);
    }
    
    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(token).getBody().getSubject();
    }
}
