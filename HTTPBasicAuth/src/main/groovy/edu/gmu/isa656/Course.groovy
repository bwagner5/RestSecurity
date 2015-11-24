package edu.gmu.isa656

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.query.Param

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

/**
 * Created by brandon on 11/23/15.
 */
@Entity
class Course {

    @Id
    @GeneratedValue
    Long id

    @Column
    String name

    @Column
    String section

    @Column
    Integer capacity

    @Column
    Integer enrolled


}

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByNameLike(@Param("name") String name);
}
