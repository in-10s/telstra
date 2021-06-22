package com.in10s.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.in10s.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	List<User> findByUsername(String username);

	User findOneByUsername(String username);
}