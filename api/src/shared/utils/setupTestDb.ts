import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import makeLoggerInstance from "@/shared/infrastructure/logger";

const root = process.cwd();
const originalSchema = path.join(root, "prisma", "schema.prisma");
const testRelativePath = "tmp/schema.test.prisma";
const testSchema = path.join(root, testRelativePath);

const logger = makeLoggerInstance("setupTestDB");

export async function setupTestDB() {
  const schemaContent = fs.readFileSync(originalSchema, "utf-8");

  const testSchemaContent = schemaContent
    .replace(/provider\s*=\s*"postgresql"/, 'provider = "sqlite"')
    .replace(/url\s*=\s*env\("DATABASE_URL"\)/, 'url = "file:./test.db?mode=memory&cache=shared"')
    .replace(/output\s*=\s*".*"/, 'output = "../node_modules/@prisma-test/client"');

  fs.writeFileSync(testSchema, testSchemaContent, "utf-8");

  try {
    execSync(`npx prisma generate --schema=${testRelativePath}`, { stdio: "inherit" });
    execSync(`npx prisma db push --schema=${testRelativePath}`, { stdio: "inherit" });

    logger.log("Prisma test client generated!");
  } catch (e: any) {
    logger.error("An error occured when trying to setup db test environment");
    logger.error(e);
    throw e;
  }

  fs.existsSync(testSchema);

  return Promise.resolve();
}
