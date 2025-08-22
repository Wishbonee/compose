# Easypanel Plane Docker Compose

*   Easypanel uses setup.sh to install the plane docker compose. Once it is done, there is no longer a need to run the installer inside the setup.sh script, unless there is any architectural changes introduced by the original maintainers. 
*   Easypanel uses setup.sh to upgrade the plane docker compose. It will automatically check for the latest version available. 
*   Easypanel uses update.sh to change the directory structure that comes as default by installing the plane to matching it the Easypanel's convention for managing the compose services. 
*   Easypanel uses update.js to include the essential environmental variables, required for Easypanel to successfully host the application.