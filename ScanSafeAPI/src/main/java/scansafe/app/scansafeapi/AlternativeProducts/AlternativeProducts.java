package scansafe.app.scansafeapi.AlternativeProducts;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
/**
 *
 * @author Robby Martin
 */
@Data
@Entity
@Table(name = "alternative_product")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AlternativeProducts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private long userId;
    private String username;
    private String altProduct;
    private String replacesProduct;
    private String upc;
    private String notes;
    
    public AlternativeProducts(String altProduct, String replacesProduct, String upc, String notes, String username) {
        this.altProduct = altProduct;
        this.replacesProduct = replacesProduct;
        this.upc = upc;
        this.notes = notes;
        this.username = username;
    }
}
