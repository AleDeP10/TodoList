package io.todolist.repository;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.util.StreamUtils;

import java.nio.charset.StandardCharsets;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
public abstract class BaseRepositoryTest {

    private static final Logger logger = LoggerFactory.getLogger(BaseRepositoryTest.class);
    private static final String SCHEMA_SQL_PATH = "db/schema-h2.sql";

    @Autowired
    protected JdbcTemplate jdbcTemplate;

    @BeforeEach
    public void initializeDatabase() throws Exception {
        // Set MDC with test class name to enrich logs
        MDC.put("testClass", this.getClass().getSimpleName());

        // Execute SQL script to initialize schema
        String sql = StreamUtils.copyToString(new ClassPathResource(SCHEMA_SQL_PATH).getInputStream(), StandardCharsets.UTF_8);
        for (String statement : sql.split(";")) {
            String trimmed = statement.trim();
            if (!trimmed.isEmpty()) {
                jdbcTemplate.execute(trimmed);
            }
        }
        logger.info("Database initialized from {} (h2 only)", SCHEMA_SQL_PATH);
    }

    @AfterEach
    public void cleanupDatabase() {
        // Drop tables to ensure test isolation
        jdbcTemplate.execute("DROP TABLE IF EXISTS task.tasks");
        jdbcTemplate.execute("DROP TABLE IF EXISTS \"user\".users");

        // Clear MDC context
        MDC.clear();

        logger.info("Database cleaned up after test execution (h2 only)");
    }
}
