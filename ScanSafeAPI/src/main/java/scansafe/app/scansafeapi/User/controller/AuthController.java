package scansafe.app.scansafeapi.User.controller;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import scansafe.app.scansafeapi.PersonalIngredient.PersonalIngredientModel;
import scansafe.app.scansafeapi.Role.ERole;
import scansafe.app.scansafeapi.Role.Role;
import scansafe.app.scansafeapi.Role.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import scansafe.app.scansafeapi.User.Dto.LoginDto;
import scansafe.app.scansafeapi.User.Dto.SignUpDto;
import scansafe.app.scansafeapi.Security.jwt.JwtUtils;
import scansafe.app.scansafeapi.User.UserRepository;
import scansafe.app.scansafeapi.User.response.JwtResponse;
import scansafe.app.scansafeapi.User.response.MessageResponse;
import scansafe.app.scansafeapi.User.services.UserDetails;
import scansafe.app.scansafeapi.User.User;


import java.security.Key;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtils jwtUtils;

    @Value("${scansafe.app.jwtSecret}")
    private String jwtSecret;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsername(), loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpDto signUpDto) {

        // add check for username exists in a DB
        if (userRepository.existsByUsername(signUpDto.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        // add check for email exists in DB
        if (userRepository.existsByEmail(signUpDto.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));

        }

        // create user object
        User user = new User();
        user.setName(signUpDto.getName());
        user.setUsername(signUpDto.getUsername());
        user.setEmail(signUpDto.getEmail());
        user.setPassword(passwordEncoder.encode(signUpDto.getPassword()));

        Set<String> strRoles = signUpDto.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "influencer":
                        Role inflRole = roleRepository.findByName(ERole.ROLE_INFLUENCER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(inflRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }
        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));


    }

    @GetMapping("/all")
    public List<scansafe.app.scansafeapi.User.User> getUsers() {
        return userRepository.findAll();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        List<Role> role = roleRepository.findAll();
        User deleted = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Error: User is not found."));;
            deleted.getRoles().removeAll(deleted.getRoles());
            userRepository.deleteById(id);


        return ResponseEntity.ok(new MessageResponse("user banned"));
    }
    @PutMapping("/toInfluencer/{id}")
    public ResponseEntity<?> makeInfluencer(@PathVariable("id") Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Error: User is not found."));
        Role role = roleRepository.findByName(ERole.ROLE_INFLUENCER).orElseThrow(() -> new RuntimeException("Error: User is not found."));
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRoles(roles);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("user updated"));
    }
    @PutMapping("/toBase/{id}")
    public ResponseEntity<?> makeBase(@PathVariable("id") Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Error: User is not found."));
        Role role = roleRepository.findByName(ERole.ROLE_USER).orElseThrow(() -> new RuntimeException("Error: User is not found."));
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRoles(roles);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("user updated"));
    }


}