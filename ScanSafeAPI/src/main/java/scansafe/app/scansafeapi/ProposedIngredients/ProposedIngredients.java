package scansafe.app.scansafeapi.ProposedIngredients;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
@Table(name = "proposed_ingredient")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProposedIngredients {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    private long userId;
    private String name;
    private String risk;
    private String website;
    private String comments;
    private String username;
    private boolean approved;
    private boolean rejected;
    
    public ProposedIngredients(String name, String risk, String website, String comments, String username) {
        
        this.name = name;
        this.risk = risk;
        this.website =  website;
        this.comments = comments;
        this.username = username;
        this.approved = false;
        this.rejected = false;
    }
}
