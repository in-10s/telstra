package com.in10s.repository;

import com.in10s.entity.UpRoleMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepository extends JpaRepository<UpRoleMaster,Integer> {
    @Query(value="select r.ROLE_ID,r.ROLE_NAME from UpRoleMaster r")
    List<Object[]> findRoleIdAndRoleName();
}
