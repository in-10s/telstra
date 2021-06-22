package com.in10s.repository;

import com.in10s.entity.ModuleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModuleRepository extends JpaRepository<ModuleEntity,Integer> {
    @Query(value="select module.MR_ID, module.MR_NAME from ModuleEntity module ")
    List<Object[]> getAllModule();
}
