# Enhanced project structure script

# Define the new directory structure
$directories = @(
    # App structure
    "src/app/(auth)/login",
    "src/app/(auth)/register",
    "src/app/(dashboard)/overview",
    "src/app/(dashboard)/settings",
    "src/app/(api)/route",
    "src/app/(features)/chat",
    "src/app/(features)/analytics",

    # Atomic design components
    "src/app/_components/atoms/buttons",
    "src/app/_components/atoms/inputs",
    "src/app/_components/atoms/typography",
    "src/app/_components/molecules/forms",
    "src/app/_components/molecules/cards",
    "src/app/_components/molecules/navigation",
    "src/app/_components/organisms/layouts",
    "src/app/_components/organisms/sections",
    "src/app/_components/templates/auth",
    "src/app/_components/templates/dashboard",

    # Core functionality
    "src/app/_lib/utils/formatting",
    "src/app/_lib/utils/validation",
    "src/app/_lib/utils/helpers",
    "src/app/_lib/api/endpoints",
    "src/app/_lib/api/middleware",
    "src/app/_lib/services/auth",
    "src/app/_lib/services/data",
    "src/app/_lib/config",

    # Hooks and contexts
    "src/app/_hooks/auth",
    "src/app/_hooks/data",
    "src/app/_hooks/ui",
    "src/app/_contexts/auth",
    "src/app/_contexts/theme",
    "src/app/_contexts/app",

    # Types
    "src/app/_types/common",
    "src/app/_types/api",
    "src/app/_types/models",
    "src/app/_types/dto",
    "src/app/_types/hooks",

    # Tests
    "src/app/_components/__tests__/atoms",
    "src/app/_components/__tests__/molecules",
    "src/app/_components/__tests__/organisms",
    "src/app/_lib/__tests__/utils",
    "src/app/_lib/__tests__/services",
    "__tests__/e2e",
    "__tests__/integration",

    # Config and environment
    "config/env/development",
    "config/env/production",
    "config/env/test",
    "config/api",
    "config/features"
)

# Create directories
foreach ($dir in $directories) {
    New-Item -Path $dir -ItemType Directory -Force | Out-Null
    Write-Host "Created directory: $dir"
}

# Move and consolidate files
$moves = @(
    # Consolidate components
    @{
        Source = "src/components/*"
        Destination = "src/app/_components/atoms"
        Pattern = "*Button*,*Input*,*Text*,*Icon*"
    },
    @{
        Source = "src/components/*"
        Destination = "src/app/_components/molecules"
        Pattern = "*Card*,*Form*,*Nav*"
    },
    @{
        Source = "src/components/*"
        Destination = "src/app/_components/organisms"
        Pattern = "*Layout*,*Section*,*Header*,*Footer*"
    },
    
    # Consolidate utilities
    @{
        Source = "src/lib/utils/*"
        Destination = "src/app/_lib/utils/helpers"
    },
    @{
        Source = "src/utils/*"
        Destination = "src/app/_lib/utils/helpers"
    },

    # Consolidate API-related code
    @{
        Source = "src/lib/api/*"
        Destination = "src/app/_lib/api/endpoints"
    },
    @{
        Source = "src/api/*"
        Destination = "src/app/_lib/api/endpoints"
    },

    # Move hooks and contexts
    @{
        Source = "src/hooks/*"
        Destination = "src/app/_hooks"
    },
    @{
        Source = "src/contexts/*"
        Destination = "src/app/_contexts"
    }
)

foreach ($move in $moves) {
    if (Test-Path $move.Source) {
        if ($move.Pattern) {
            Get-ChildItem -Path $move.Source -Include $move.Pattern.Split(',') |
            ForEach-Object {
                $destination = Join-Path $move.Destination $_.Name
                Move-Item $_.FullName $destination -Force -ErrorAction SilentlyContinue
                Write-Host "Moved $($_.Name) to $destination"
            }
        } else {
            Move-Item -Path $move.Source -Destination $move.Destination -Force -ErrorAction SilentlyContinue
            Write-Host "Moved $($move.Source) to $($move.Destination)"
        }
    }
}

# Create index files for better imports
$indexLocations = @(
    "src/app/_components/atoms",
    "src/app/_components/molecules",
    "src/app/_components/organisms",
    "src/app/_lib/utils",
    "src/app/_lib/api",
    "src/app/_hooks",
    "src/app/_contexts"
)

foreach ($location in $indexLocations) {
    $indexContent = @"
// Generated index file
export * from './index.types'
"@
    $indexPath = Join-Path $location "index.ts"
    $indexTypesPath = Join-Path $location "index.types.ts"
    
    Set-Content -Path $indexPath -Value $indexContent
    Set-Content -Path $indexTypesPath -Value "// Type definitions"
    Write-Host "Created index files in $location"
}

# Move environment files
$envFiles = @(
    ".env*development*",
    ".env*production*",
    ".env*test*",
    ".env.local"
)

foreach ($pattern in $envFiles) {
    Get-ChildItem -Path $pattern -ErrorAction SilentlyContinue |
    ForEach-Object {
        $envType = if ($_.Name -match "development") { "development" }
                  elseif ($_.Name -match "production") { "production" }
                  elseif ($_.Name -match "test") { "test" }
                  else { "development" }
        
        $destination = "config/env/$envType/$($_.Name)"
        Move-Item $_.FullName $destination -Force -ErrorAction SilentlyContinue
        Write-Host "Moved $($_.Name) to $destination"
    }
}

# Clean up empty directories
$dirsToRemove = @(
    "src/components",
    "src/lib",
    "src/utils",
    "src/hooks",
    "src/contexts",
    "src/api"
)

foreach ($dir in $dirsToRemove) {
    if (Test-Path $dir) {
        Remove-Item -Path $dir -Recurse -Force
        Write-Host "Removed empty directory: $dir"
    }
}

Write-Host "Project structure enhancement completed!" 