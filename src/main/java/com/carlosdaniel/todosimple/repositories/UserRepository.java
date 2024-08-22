package com.carlosdaniel.todosimple.repositories;
//para buscar um usuario atrazes de um dado neste usar_name

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.carlosdaniel.todosimple.models.User; 

@Repository
public interface  UserRepository extends JpaRepository<User, Long>{//essa estensão tem todos os metodos 

    @Transactional(readOnly = true) //
    User findByUsername(String username);


}
    

