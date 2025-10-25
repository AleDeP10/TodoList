# ────────────────────────────────────────────────────────────────
# 💪 Stage 1: Build the application
# ────────────────────────────────────────────────────────────────
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app

# ⬇️ Copy the pom.xml and restore dependencies
COPY pom.xml ./
RUN mvn dependency:go-offline

# 📆 Copy all source files and build the app
COPY src ./src
RUN mvn clean package -DskipTests

# ────────────────────────────────────────────────────────────────
# 🚀 Stage 2: Runtime image
# ────────────────────────────────────────────────────────────────
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# 📅 Copy the built jar from the build stage
COPY --from=build /app/target/*.jar ./app.jar

# 🌐 Expose the HTTP port
EXPOSE 8080

# 🌟 Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=docker"]

