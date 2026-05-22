import utils from "../utils.js";

await utils.downloadFile(
  "https://raw.githubusercontent.com/appwrite/appwrite/main/docker-compose.yml",
  "./code/docker-compose.yml"
);
await utils.downloadFile(
  "https://raw.githubusercontent.com/appwrite/appwrite/main/.env",
  "./code/.env.example"
);

await utils.removeContainerNames("./code/docker-compose.yml");
await utils.removePorts("./code/docker-compose.yml");

await utils.searchReplace(
  "./code/.env.example",
  "_APP_DOMAIN=appwrite.test",
  "_APP_DOMAIN=$(PRIMARY_DOMAIN)"
);
