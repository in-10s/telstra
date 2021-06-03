#FROM openjdk:8-jdk-alpine
#VOLUMN /tmp
#ARG JAR_FILE
#ADD ${JAR_FILE} app.jar
#ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/Kubernetes-app-1:0.0.1-SNAPSHOT"]

#FROM openjdk:8-jdk-alpine
#VOLUME /tmp
#COPY target/*.jar docker-maven-comparison:0.0.1-SNAPSHOT.jar
#ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/Kubernetes-app-1:0.0.1-SNAPSHOT"]
#EXPOSE 8080

FROM openjdk:8
ADD target/api-gateway-latest.jar api-gateway-latest.jar
EXPOSE 8087
ENTRYPOINT ["java","-jar","api-gateway-latest.jar"]

 