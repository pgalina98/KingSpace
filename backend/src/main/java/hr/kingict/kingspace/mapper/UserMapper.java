package hr.kingict.kingspace.mapper;

import hr.kingict.kingspace.dto.UserDto;
import hr.kingict.kingspace.entity.User;

import java.util.List;

public interface UserMapper {

    UserDto map(User user);

    List<UserDto> map (List<User> users);
}
