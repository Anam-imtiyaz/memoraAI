package com.memora.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.memora.backend.auth.LoginRequest;
import com.memora.backend.auth.SignupRequest;
import com.memora.backend.model.User;
import com.memora.backend.repository.UserRepository;
import com.memora.backend.security.JwtUtil;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public String signup(SignupRequest request) {

        User existingUser = userRepository.findByEmail(request.getEmail());

        if (existingUser != null) {
            return "User already exists";
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        return "Signup successful";
    }

    public String login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail());

        if (user == null) {
            return "User not found";
        }

        boolean passwordMatches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!passwordMatches) {
            return "Wrong password";
        }

        return jwtUtil.generateToken(user.getEmail());

    }

}