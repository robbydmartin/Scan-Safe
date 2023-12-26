package scansafe.app.scansafeapi.Role;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;
import scansafe.app.scansafeapi.User.User;

import java.util.HashSet;
import java.util.Set;

import static org.hibernate.internal.util.collections.ArrayHelper.forEach;

@Setter
@Getter
@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 60)
    private ERole name;

    public Role(){

    }

}
