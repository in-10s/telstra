package com.in10s.response;

public class ModuleResponse {
    private Integer moduleId;
    private String moduleName;

    public Integer getModuleId() {
        return moduleId;
    }

    public void setModuleId(Integer moduleId) {
        this.moduleId = moduleId;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    @Override
    public String toString() {
        return "ModuleResponse{" +
                "moduleId=" + moduleId +
                ", moduleName='" + moduleName + '\'' +
                '}';
    }
}
