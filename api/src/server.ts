import "dotenv/config";
import { bootstrap } from "./bootstrap/bootstrap";

const { app, config } = bootstrap();

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
