package hr.kingict.kingspace.repository.implementation;

import hr.kingict.kingspace.entity.User;
import hr.kingict.kingspace.mapper.UserMapper;
import hr.kingict.kingspace.repository.CustomADRepository;
import hr.kingict.kingspace.repository.UserTeamRoleRepository;
import org.springframework.ldap.core.AttributesMapper;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.stereotype.Repository;

import javax.naming.NamingException;
import javax.naming.directory.Attributes;
import javax.naming.ldap.LdapName;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.springframework.ldap.query.LdapQueryBuilder.query;

@Repository
public class CustomADRepositoryImpl implements CustomADRepository {

    private LdapTemplate ldapTemplate;

    private final UserTeamRoleRepository userTeamRoleRepository;
    private final UserMapper userMapper;

    public CustomADRepositoryImpl(LdapTemplate ldapTemplate, UserTeamRoleRepository userTeamRoleRepository, UserMapper userMapper) {
        this.ldapTemplate = ldapTemplate;
        this.userTeamRoleRepository = userTeamRoleRepository;
        this.userMapper = userMapper;
    }

    @Override
    public User findOneByUsername(String username) {
        List<User> users = ldapTemplate.search(query().where("sAMAccountName").is(username), new UserAttributeMapper());

        return ((null != users && !users.isEmpty()) ? users.get(0) : null);
    }

    @Override
    public User findLdapUserByEmail(String email) {
        List<User> users = ldapTemplate.search(query().where("userPrincipalName").is(email), new UserAttributeMapper());

        return ((null != users && !users.isEmpty()) ? users.get(0) : null);
    }

    @Override
    public List<User> getAllUsers() {
        List<User> users = ldapTemplate.search(query().where("userPrincipalName").isPresent() ,new UserAttributeMapper());

        return users;
    }

    private class UserAttributeMapper implements AttributesMapper<User> {
        public User mapFromAttributes(Attributes attrs) throws NamingException {
            User user = new User();

            user.setUsername((String) attrs.get("sAMAccountName").get());
            user.setPassword("******");
            user.setFirstName((String) attrs.get("givenName").get());
            user.setLastName((String) attrs.get("sn").get());
            user.setEmail((String) attrs.get("userPrincipalName").get());
            user.setOrganisationalUnit(new LdapName((String) attrs.get("distinguishedName").get()).get(((String) attrs.get("distinguishedName").get()).split(",").length - 2));
            user.setAuthorities(getUserAuthorities((String) attrs.get("sAMAccountName").get()));

            return user;
        }
    }

    public Set<String> getUserAuthorities(String username) {
        Set<String> roles = userTeamRoleRepository.findAllByUser(username)
                                                  .stream().map(utr -> utr.getRole().getName())
                                                  .collect(Collectors.toSet());

        if(roles.isEmpty()) {
            roles.add(("Zaposlenik"));
        }

        return roles;
    }
}
