package hr.kingict.kingspace.mapper.impl;

import hr.kingict.kingspace.dto.RoleDto;
import hr.kingict.kingspace.entity.Role;
import hr.kingict.kingspace.mapper.RoleMapper;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class RoleMapperImpl implements RoleMapper {
    @Override
    public RoleDto map(Role role) {
        return Optional.ofNullable(role).map(r -> {

            RoleDto roleDto = new RoleDto();

            roleDto.setId(r.getId());
            roleDto.setName(r.getName());

            return roleDto;
        }).orElse(null);
    }
}
