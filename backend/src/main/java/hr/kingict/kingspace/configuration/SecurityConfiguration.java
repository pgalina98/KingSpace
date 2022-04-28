package hr.kingict.kingspace.configuration;

import hr.kingict.kingspace.mapper.CustomLdapUserDetailsMapper;
import hr.kingict.kingspace.mapper.UserMapper;
import hr.kingict.kingspace.repository.CustomADRepository;
import hr.kingict.kingspace.security.jwt.JwtAuthenticationEntryPoint;
import hr.kingict.kingspace.security.jwt.JwtFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.ldap.userdetails.UserDetailsContextMapper;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true,
                            securedEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final CustomADRepository customADRepository;
    private final UserMapper userMapper;

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtFilter jwtFilter;

    public SecurityConfiguration(CustomADRepository customADRepository, UserMapper userMapper, JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint, JwtFilter jwtFilter) {
        this.customADRepository = customADRepository;
        this.userMapper = userMapper;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtFilter = jwtFilter;
    }

    @Value("${spring.ldap.urls}")
    private String ldapUrl;

    @Value("${spring.ldap.username}")
    private String username;

    @Value("${spring.ldap.password}")
    private String password;

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception
    {
        httpSecurity
                .csrf()
                    .disable()
                .cors()
                    .disable()
                .exceptionHandling()
                    .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .and()
                .authorizeRequests()
                    .antMatchers("/api/users/login").permitAll()
                    .antMatchers("/api/users/refreshToken").permitAll()
                    .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                    .anyRequest().authenticated()
                .and()
                    .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        httpSecurity.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception
    {
        authenticationManagerBuilder
                .ldapAuthentication()
                .userSearchFilter("(userPrincipalName={0})")
                .userSearchBase("ou=Development Users,ou=Domain Custom Users,dc=demo,dc=king")
                .groupSearchBase("OU=Domain Custom Users,DC=demo,DC=king")
                .groupSearchFilter("(member={0})")
                .contextSource()
                .managerDn(username)
                .managerPassword(password)
                .root("DC=demo,DC=king")
                .url(ldapUrl)
                .and()
                .userDetailsContextMapper(userDetailsContextMapper());
    }

    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception
    {
        return super.authenticationManagerBean();
    }

    @Bean
    public UserDetailsContextMapper userDetailsContextMapper() {
        return new CustomLdapUserDetailsMapper(customADRepository, userMapper);
    }
}
