package com.project.project.dataaccess.dao;

import com.project.project.entity.Role;
import com.project.project.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface UserDao extends CrudRepository<User, String> {
}
