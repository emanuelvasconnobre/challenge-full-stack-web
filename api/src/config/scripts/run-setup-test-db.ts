import { setupTestDB } from "@/shared/utils/setupTestDb";

setupTestDB().then(() => {
  console.log("Script finished successfully");
});
