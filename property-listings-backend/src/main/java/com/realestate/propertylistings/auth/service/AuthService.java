package com.realestate.propertylistings.auth.service;

import com.realestate.propertylistings.auth.dto.AuthResponse;
import com.realestate.propertylistings.auth.dto.LoginRequest;
import com.realestate.propertylistings.auth.dto.RegisterRequest;
import com.realestate.propertylistings.user.User;
import com.realestate.propertylistings.user.UserRepository;
import com.realestate.propertylistings.user.UserRole;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        log.info("Próba rejestracji użytkownika: {}", request.getEmail());

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Użytkownik z tym emailem już istnieje");
        }

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .role(UserRole.PENDING_AGENT)
                .enabled(true)
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        userRepository.save(user);
        log.info("Użytkownik zarejestrowany: {} z rolą {}", user.getEmail(), user.getRole());

        return buildAuthResponse(user);
    }

    public AuthResponse authenticate(LoginRequest request) {
        log.info("Próba logowania użytkownika: {}", request.getEmail());

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new BadCredentialsException("Nieprawidłowy email lub hasło"));

            if (!user.isEnabled()) {
                throw new RuntimeException("Konto nieaktywne. Skontaktuj się z administratorem.");
            }

            log.info("Użytkownik zalogowany: {} z rolą {}", user.getEmail(), user.getRole());

            return buildAuthResponse(user);

        } catch (BadCredentialsException e) {
            log.error("Błąd logowania dla użytkownika {}: {}", request.getEmail(), e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Błąd logowania dla użytkownika {}: {}", request.getEmail(), e.getMessage());
            throw new BadCredentialsException("Nieprawidłowy email lub hasło");
        }
    }

    public AuthResponse refreshToken(String refreshToken) {
        try {
            String userEmail = jwtService.extractUsername(refreshToken);
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("Użytkownik nie znaleziony"));

            if (!jwtService.isTokenValid(refreshToken, user)) {
                throw new RuntimeException("Refresh token nieprawidłowy lub wygasły");
            }

            log.info("Token odświeżony dla użytkownika: {}", user.getEmail());

            return buildAuthResponse(user);

        } catch (Exception e) {
            log.error("Błąd odświeżania tokenu: {}", e.getMessage());
            throw new RuntimeException("Nie można odświeżyć tokenu: " + e.getMessage());
        }
    }

    private AuthResponse buildAuthResponse(User user) {
        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        return AuthResponse.builder()
                .token(jwtToken)
                .refreshToken(refreshToken)
                .type("Bearer")
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole().name())
                .expiresIn(jwtService.getExpirationTime() / 1000)
                .build();
    }
}

