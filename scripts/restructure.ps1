# Project restructure script

# Create src directory structure
$directories = @(
    "src/app/(auth)/login",
    "src/app/(auth)/register",
    "src/app/(dashboard)/overview",
    "src/app/(dashboard)/settings",
    "src/app/(api)/route",
    "src/app/_components/ui",
    "src/app/_components/forms",
    "src/app/_components/layouts",
    "src/app/_lib/utils",
    "src/app/_lib/api",
    "src/app/_lib/auth",
    "src/app/_hooks",
    "src/app/_contexts",
    "src/app/_types",
    "src/lib/api",
    "src/lib/utils",
    "src/lib/config",
    "src/hooks/api",
    "src/hooks/auth",
    "src/contexts/auth",
    "src/contexts/theme",
    "src/types/api",
    "src/types/auth",
    "src/utils/api",
    "src/utils/validation"
)

foreach ($dir in $directories) {
    New-Item -Path $dir -ItemType Directory -Force | Out-Null
}

# Move app contents to src/app
if (Test-Path "app") {
    Get-ChildItem -Path "app" -Recurse | ForEach-Object {
        $destination = $_.FullName.Replace("$PWD\app", "$PWD\src\app")
        if (!(Test-Path $destination)) {
            Copy-Item -Path $_.FullName -Destination $destination -Force -Recurse
        }
    }
}

# Move components and utilities
Move-Item -Path "components/*" -Destination "src/app/_components/" -Force -ErrorAction SilentlyContinue
Move-Item -Path "lib/*" -Destination "src/app/_lib/" -Force -ErrorAction SilentlyContinue
Move-Item -Path "hooks/*" -Destination "src/app/_hooks/" -Force -ErrorAction SilentlyContinue
Move-Item -Path "contexts/*" -Destination "src/app/_contexts/" -Force -ErrorAction SilentlyContinue
Move-Item -Path "types/*" -Destination "src/app/_types/" -Force -ErrorAction SilentlyContinue

# Create config structure
$configDirs = @(
    "config/env",
    "config/api",
    "config/development",
    "config/production"
)

foreach ($dir in $configDirs) {
    New-Item -Path $dir -ItemType Directory -Force | Out-Null
}

# Move configuration files
Move-Item -Path "*.config.js" -Destination "config/" -Force -ErrorAction SilentlyContinue
Move-Item -Path "*.config.ts" -Destination "config/" -Force -ErrorAction SilentlyContinue
Move-Item -Path ".env*" -Destination "config/env/" -Force -ErrorAction SilentlyContinue

# Move middleware to src
Move-Item -Path "middleware.ts" -Destination "src/middleware.ts" -Force -ErrorAction SilentlyContinue

# Clean up empty directories
Remove-Item -Path "app" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "components" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "lib" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "hooks" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "contexts" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "types" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Project restructure completed!" 