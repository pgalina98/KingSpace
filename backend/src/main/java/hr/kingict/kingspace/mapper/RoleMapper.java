package hr.kingict.kingspace.mapper;

import hr.kingict.kingspace.dto.RoleDto;
import hr.kingict.kingspace.entity.Role;

public interface RoleMapper {

    RoleDto map(Role role);
}
