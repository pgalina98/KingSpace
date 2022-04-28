package hr.kingict.kingspace.repository;

import hr.kingict.kingspace.dto.UserDto;
import hr.kingict.kingspace.entity.User;

import java.util.List;

public interface CustomADRepository {

    User findOneByUsername(String username);
    User findLdapUserByEmail(String email);
    List<User> getAllUsers();
}
