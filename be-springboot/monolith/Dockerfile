# ────────────────────────────────────────────────────────────────
# 💪 Stage 1: Build the application
# ────────────────────────────────────────────────────────────────
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the parent pom.xml from the root of be-springboot
COPY pom.xml ./pom.xml

# Copy the monolith module folder entirely
COPY monolith ./monolith

# Change working directory to monolith for build commands
WORKDIR /app/monolith

# Download dependencies offline
RUN mvn dependency:go-offline

# Build the project skipping tests
RUN mvn clean package -DskipTests

# ────────────────────────────────────────────────────────────────
# 🚀 Stage 2: Runtime image
# ────────────────────────────────────────────────────────────────
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Add a healthcheck probe to monitor container health and enable automatic restart on failure
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# 📅 Copy the built jar from the build stage
COPY --from=build /app/monolith/target/*.jar ./app.jar

# 🌐 Expose the HTTP port
EXPOSE 8080

# 🌟 Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=docker"]
