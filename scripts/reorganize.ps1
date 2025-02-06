# File reorganization script
# Test files
Move-Item -Path "chat_tests.js" -Destination "__tests__/api/" -ErrorAction SilentlyContinue
Move-Item -Path "chat_security_tests.js" -Destination "__tests__/security/" -ErrorAction SilentlyContinue
Move-Item -Path "security_tests.js" -Destination "__tests__/security/" -ErrorAction SilentlyContinue
Move-Item -Path "test_script.js" -Destination "__tests__/api/" -ErrorAction SilentlyContinue
Move-Item -Path "chat_load_test.json" -Destination "__tests__/load/" -ErrorAction SilentlyContinue

# Config files
Move-Item -Path "chat_environment.json" -Destination "config/" -ErrorAction SilentlyContinue
Move-Item -Path "load_test_config.json" -Destination "config/" -ErrorAction SilentlyContinue
Move-Item -Path "chat_api_collection.json" -Destination "config/postman/" -ErrorAction SilentlyContinue
Move-Item -Path "postman_collection.json" -Destination "config/postman/" -ErrorAction SilentlyContinue

# Helper scripts
Move-Item -Path "url_helper.js" -Destination "scripts/" -ErrorAction SilentlyContinue
Move-Item -Path "migration_helper.js" -Destination "scripts/" -ErrorAction SilentlyContinue
Move-Item -Path "update_querystring.js" -Destination "scripts/" -ErrorAction SilentlyContinue
Move-Item -Path "pre_request_script.js" -Destination "scripts/" -ErrorAction SilentlyContinue
Move-Item -Path "auth_debug.js" -Destination "scripts/" -ErrorAction SilentlyContinue

Write-Host "File reorganization completed!" 