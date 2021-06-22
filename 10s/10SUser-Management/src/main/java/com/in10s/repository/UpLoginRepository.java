package com.in10s.repository;

import com.in10s.entity.UpLoginInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UpLoginRepository extends JpaRepository<UpLoginInfo,Integer> {
}
