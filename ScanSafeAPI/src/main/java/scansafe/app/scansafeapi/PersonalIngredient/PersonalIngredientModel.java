package scansafe.app.scansafeapi.PersonalIngredient;

import jakarta.persistence.*;

@Entity
@Table(name = "personal_ingredient")
public class PersonalIngredientModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String name;

    @Column
    private long userId;

    @Column
    private String username;

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public long getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String _username) {
        username = _username;
    }
}
