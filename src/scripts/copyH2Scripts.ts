/**
 * copyH2Scripts.ts
 *
 * 🔄 H2 Database Migration Scripts Copy Script
 *
 * Copies Flyway migration scripts for the H2 database from the centralized `db-backup/h2` folder
 * into the `db/migration` resource folders of the `user` and `task` Spring Boot microservices.
 *
 * ✅ Ensures that the correct H2-specific migration scripts are available for Flyway during tests
 * ✅ Avoids duplication by maintaining a single source of truth for H2 scripts
 * ✅ Intended to be run manually whenever the data model or migration scripts change
 *
 * Operations:
 * - Copies `V1__init_user.sql` to `be-springboot/user/src/main/resources/db/migration`
 * - Copies `V1__init_user.sql` and `V2__init_task.sql` to `be-springboot/task/src/main/resources/db/migration`
 *
 * Usage:
 *   Run manually with `yarn run copy-h2-scripts` after updating migration scripts
 *
 * Note: This script does not perform validation of the copied files and assumes the target directories exist.
 */

import { cp } from "fs/promises";
import { resolve } from "path";

// Source base directory (H2 scripts)
const h2Source = resolve("./db-backup/h2");

// === COPY TO user microservice ===
try {
  const h2Destination = resolve(
    "./be-springboot/user/src/main/resources/db/migration"
  );
  cp(
    resolve(h2Source, "V1__init_user.sql"),
    resolve(h2Destination, "V1__init_user.sql")
  );
} catch (err) {
  console.error("❌ Error while copying H2 scripts to user microservice:", err);
  process.exit(1);
}

// === COPY TO task microservice ===
try {
  const h2Destination = resolve(
    "./be-springboot/task/src/main/resources/db/migration"
  );
  cp(
    resolve(h2Source, "V1__init_user.sql"),
    resolve(h2Destination, "V1__init_user.sql")
  );
  cp(
    resolve(h2Source, "V2__init_task.sql"),
    resolve(h2Destination, "V1__init_task.sql")
  );
} catch (err) {
  console.error("❌ Error while copying H2 scripts to task microservice:", err);
  process.exit(1);
}
