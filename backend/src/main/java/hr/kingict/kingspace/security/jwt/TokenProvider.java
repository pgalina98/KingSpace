package hr.kingict.kingspace.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.ServletRequest;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class TokenProvider {

    private final Logger log = LoggerFactory.getLogger(TokenProvider.class);
    private static final String TOKEN_KEY = "token";

    private Key key;

    private Long tokenValidityInMilliseconds;
    private Long refreshTokenValidityInMilliseconds;

    @Value("${jwt.token-validity-seconds}")
    private Long tokenValiditySeconds;

    @Value("${jwt.refresh-token-validity-seconds}")
    private Long refreshTokenValiditySeconds;

    @Value("${jwt.base64-secret}")
    private String base64Secret;

    @PostConstruct
    public void init() {
        byte[] keyBytes;
        keyBytes = Decoders.BASE64.decode(base64Secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.tokenValidityInMilliseconds = 1000 * tokenValiditySeconds;
        this.refreshTokenValidityInMilliseconds = 1000 * refreshTokenValiditySeconds;
    }

    public String createToken(Authentication authentication) {
        long now = (new Date()).getTime();
        Date validity;
        validity = new Date(now + this.tokenValidityInMilliseconds);

        return Jwts
                .builder()
                .setSubject(authentication.getName())
                .claim(TOKEN_KEY, authentication)
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(validity)
                .compact();
    }

    public String createToken(String refreshToken) {
        long now = (new Date()).getTime();
        Date validity;
        validity = new Date(now + this.tokenValidityInMilliseconds);

        return Jwts
                .builder()
                .setSubject(getUsernameFromJWT(refreshToken))
                .claim(TOKEN_KEY, getAuthoritiesFromJWT(refreshToken).get(TOKEN_KEY))
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(validity)
                .compact();
    }

    public String createRefreshToken(Authentication authentication) {
        long now = (new Date()).getTime();
        Date validity;
        validity = new Date(now + this.refreshTokenValidityInMilliseconds);

        return Jwts
                .builder()
                .setSubject(authentication.getName())
                .claim(TOKEN_KEY, authentication)
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(validity)
                .compact();
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();

        Collection<? extends GrantedAuthority> authorities = Arrays
                .stream(claims.get(TOKEN_KEY).toString().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        User principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    public String getUsernameFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(base64Secret)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public Claims getAuthoritiesFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(base64Secret)
                .parseClaimsJws(token)
                .getBody();

        return claims;
    }

    public boolean validateToken(ServletRequest servletRequest, String authToken) {
        try {
            Jwts.parser().setSigningKey(key).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException ex) {
            servletRequest.setAttribute("error", "Invalid JWT signature");
            log.error("Invalid JWT signature");
            log.trace("Invalid JWT token trace.", ex);
        } catch (MalformedJwtException ex) {
            servletRequest.setAttribute("error", "Invalid JWT token");
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            servletRequest.setAttribute("error", "Expired JWT token");
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            servletRequest.setAttribute("error", "Unsupported JWT token");
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            servletRequest.setAttribute("error", "JWT claims string is empty.");
            log.error("JWT claims string is empty.");
        }
        return false;
    }
}
