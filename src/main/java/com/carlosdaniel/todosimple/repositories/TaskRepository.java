package com.carlosdaniel.todosimple.repositories;
//buscar qualquer dado isso dentro de task
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carlosdaniel.todosimple.models.Task;
import com.carlosdaniel.todosimple.models.projection.TaskProjection;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<TaskProjection> findByUser_Id(Long id);

    // @Query(value = "SELECT t FROM Task t WHERE t.user.id = :id")
    // List<Task> findByUser_Id(@Param("id") Long id);

    // @Query(value = "SELECT * FROM task t WHERE t.user_id = :id", nativeQuery =
    // true)
    // List<Task> findByUser_Id(@Param("id") Long id);

}