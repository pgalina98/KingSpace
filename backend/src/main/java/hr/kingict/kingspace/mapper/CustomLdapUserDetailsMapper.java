package hr.kingict.kingspace.mapper;

import hr.kingict.kingspace.details.CustomLdapUserDetails;
import hr.kingict.kingspace.dto.UserDto;
import hr.kingict.kingspace.repository.CustomADRepository;
import org.springframework.ldap.core.DirContextOperations;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.ldap.userdetails.LdapUserDetails;
import org.springframework.security.ldap.userdetails.LdapUserDetailsMapper;

import java.util.Collection;

public class CustomLdapUserDetailsMapper extends LdapUserDetailsMapper {

    private final CustomADRepository customADRepository;
    private final UserMapper userMapper;

    public CustomLdapUserDetailsMapper(CustomADRepository customADRepository, UserMapper userMapper) {
        this.customADRepository = customADRepository;
        this.userMapper = userMapper;
    }

    @Override
    public UserDetails mapUserFromContext(DirContextOperations ctx, String email, Collection<? extends GrantedAuthority> authorities) {
        UserDetails details = super.mapUserFromContext(ctx, email, authorities);

        //GET User details from LDAP
        UserDto user = userMapper.map(customADRepository.findLdapUserByEmail(email));

        return new CustomLdapUserDetails((LdapUserDetails) details, user);
    }
}
