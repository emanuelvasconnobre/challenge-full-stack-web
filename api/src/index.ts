import { app } from "@/app/server";
import envSettings from "@/config/env"

app.listen(envSettings.port, () => {
  console.log(`Server running on port ${envSettings.port}`);
});
