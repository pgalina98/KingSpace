package hr.kingict.kingspace.details;

import hr.kingict.kingspace.dto.UserDto;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.ldap.userdetails.LdapUserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class CustomLdapUserDetails implements LdapUserDetails {

    private UserDto user;
    private LdapUserDetails userDetails;

    public CustomLdapUserDetails(LdapUserDetails userDetails, UserDto user) {
        this.user = user;
        this.userDetails = userDetails;
    }

    public boolean isEnabled() {
        return userDetails.isEnabled();
    }

    public String getDn() {
        return userDetails.getDn();
    }

    public UserDto getUser() {
        return user;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> grantedAuthorities = user
                .getAuthorities()
                .stream()
                .map(authority -> new SimpleGrantedAuthority(authority))
                .collect(Collectors.toList());

        return grantedAuthorities;
    }

    public String getPassword() {
        return null;
    }

    public String getUsername() {
        return userDetails.getUsername();
    }

    public boolean isAccountNonExpired() {
        return userDetails.isAccountNonExpired();
    }

    public boolean isAccountNonLocked() {
        return userDetails.isAccountNonLocked();
    }

    public boolean isCredentialsNonExpired() {
        return userDetails.isCredentialsNonExpired();
    }

    @Override
    public void eraseCredentials() {

    }
}
