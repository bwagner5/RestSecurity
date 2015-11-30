package edu.gmu.isa656

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Configuration
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.data.jpa.repository.config.JpaRepositoryConfigExtension
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

import javax.annotation.PostConstruct

@SpringBootApplication
class BasicAuthIsa656Application {
    static void main(String[] args) {
        SpringApplication.run BasicAuthIsa656Application, args
    }
}

@Configuration
@EnableWebSecurity
class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    protected void configure(HttpSecurity http) {
        http.authorizeRequests().antMatchers("/", "/index").permitAll()
                .anyRequest().authenticated().and().httpBasic()
    }

    @Autowired
    void configureGlobal(AuthenticationManagerBuilder auth){
        auth.inMemoryAuthentication().withUser("isa656").password("password").roles("USER")
    }

}


@Configuration
@EnableJpaRepositories
class PersistenceConfiguration extends JpaRepositoryConfigExtension {

    @Autowired
    private CourseRepository courseRepository

    @PostConstruct
    private void addCourses(){
        Course isa656 = new Course(name: 'ISA656', section: '001', capacity: 45, enrolled: 45)
        courseRepository.save(isa656)
    }
}

@Controller
class MainController{

    @RequestMapping('/secured')
    String secHome(){
        'secured'
    }
}
