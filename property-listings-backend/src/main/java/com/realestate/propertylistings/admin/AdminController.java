package com.realestate.propertylistings.admin;

import com.realestate.propertylistings.user.User;
import com.realestate.propertylistings.user.UserRepository;
import com.realestate.propertylistings.user.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;

    @GetMapping("/test")
    public ResponseEntity<String> adminTest() {
        return ResponseEntity.ok("Masz dostęp do panelu admina!");
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/pending-agents")
    public ResponseEntity<List<User>> getPendingAgents() {
        List<User> pendingAgents = userRepository.findByRole(UserRole.PENDING_AGENT);
        return ResponseEntity.ok(pendingAgents);
    }

    @PutMapping("/users/{id}/approve")
    public ResponseEntity<String> approveAgent(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Użytkownik nie znaleziony"));

        if (user.getRole() != UserRole.PENDING_AGENT) {
            return ResponseEntity.badRequest()
                    .body("Użytkownik nie jest pending agent");
        }

        user.setRole(UserRole.AGENT);
        userRepository.save(user);

        return ResponseEntity.ok("Agent zatwierdzony: " + user.getEmail());
    }

    @DeleteMapping("/users/{id}/reject")
    public ResponseEntity<String> rejectAgent(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Użytkownik nie znaleziony"));

        userRepository.delete(user);
        return ResponseEntity.ok("Agent odrzucony i usunięty: " + user.getEmail());
    }
}
