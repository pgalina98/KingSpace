package hr.kingict.kingspace.mapper.impl;

import hr.kingict.kingspace.dto.UserDto;
import hr.kingict.kingspace.entity.User;
import hr.kingict.kingspace.mapper.UserMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class UserMapperImpl implements UserMapper {
    @Override
    public UserDto map(User user) {
        return Optional.ofNullable(user).map(u -> {

            UserDto userDto = new UserDto();
            userDto.setFirstName(u.getFirstName());
            userDto.setLastName(u.getLastName());
            userDto.setUsername(u.getUsername());
            userDto.setEmail(u.getEmail());
            userDto.setOrganisationalUnit(u.getOrganisationalUnit());
            userDto.setAuthorities(u.getAuthorities());

            return userDto;
        }).orElse(null);
    }

    @Override
    public List<UserDto> map(List<User> users) {
        return users
                .stream()
                .map(user->map(user)).collect(Collectors.toList());
    }
}
