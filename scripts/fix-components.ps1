# Fix component structure script

# Create component directories
$componentPaths = @(
    "src/app/_components/ui",
    "src/app/_components/cases",
    "src/app/_components/documents",
    "src/app/_components/chat",
    "src/app/_lib/supabase",
    "src/app/_components"
)

foreach ($path in $componentPaths) {
    New-Item -Path $path -ItemType Directory -Force | Out-Null
}

# Create UI components
$uiComponents = @(
    "loading",
    "button",
    "card",
    "select",
    "use-toast",
    "tabs",
    "dropdown-menu",
    "badge",
    "alert-dialog",
    "input",
    "label",
    "avatar",
    "form",
    "textarea",
    "calendar",
    "accordion"
)

foreach ($component in $uiComponents) {
    $componentPath = "src/app/_components/ui/$component.tsx"
    if (!(Test-Path $componentPath)) {
        @"
'use client'

import React from 'react'

export const $($component.Replace('-', ' ').Split(' ') | ForEach-Object { (Get-Culture).TextInfo.ToTitleCase($_) } | Join-String) = ({ children, ...props }) => {
  return (
    <div {...props}>
      {children}
    </div>
  )
}

export default $($component.Replace('-', ' ').Split(' ') | ForEach-Object { (Get-Culture).TextInfo.ToTitleCase($_) } | Join-String)
"@ | Out-File -FilePath $componentPath -Encoding UTF8
    }
}

# Create case components
$caseComponents = @(
    "CaseTimeline",
    "CaseForm"
)

foreach ($component in $caseComponents) {
    $componentPath = "src/app/_components/cases/$component.tsx"
    if (!(Test-Path $componentPath)) {
        @"
'use client'

import React from 'react'

export const $component = () => {
  return (
    <div>
      {/* Add $component implementation */}
    </div>
  )
}

export default $component
"@ | Out-File -FilePath $componentPath -Encoding UTF8
    }
}

# Create document components
$documentComponents = @(
    "DocumentList",
    "DocumentForm"
)

foreach ($component in $documentComponents) {
    $componentPath = "src/app/_components/documents/$component.tsx"
    if (!(Test-Path $componentPath)) {
        @"
'use client'

import React from 'react'

export const $component = () => {
  return (
    <div>
      {/* Add $component implementation */}
    </div>
  )
}

export default $component
"@ | Out-File -FilePath $componentPath -Encoding UTF8
    }
}

# Create chat components
$chatComponents = @(
    "ChatMessage",
    "ChatInput",
    "TypingIndicator",
    "MessageStatus",
    "SessionManager",
    "DocumentContext",
    "ChatAnalytics"
)

foreach ($component in $chatComponents) {
    $componentPath = "src/app/_components/chat/$component.tsx"
    if (!(Test-Path $componentPath)) {
        @"
'use client'

import React from 'react'

export const $component = () => {
  return (
    <div>
      {/* Add $component implementation */}
    </div>
  )
}

export default $component
"@ | Out-File -FilePath $componentPath -Encoding UTF8
    }
}

# Create shared components
$sharedComponents = @(
    "ErrorBoundary"
)

foreach ($component in $sharedComponents) {
    $componentPath = "src/app/_components/$component.tsx"
    if (!(Test-Path $componentPath)) {
        @"
'use client'

import React from 'react'

export class $component extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default $component
"@ | Out-File -FilePath $componentPath -Encoding UTF8
    }
}

# Create Supabase client
$supabaseClientPath = "src/app/_lib/supabase/client.ts"
if (!(Test-Path $supabaseClientPath)) {
    @"
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
"@ | Out-File -FilePath $supabaseClientPath -Encoding UTF8
}

# Create layout components
$layoutComponents = @(
    "DashboardLayout"
)

foreach ($component in $layoutComponents) {
    $componentPath = "src/app/_components/layout/$component.tsx"
    if (!(Test-Path $componentPath)) {
        @"
'use client'

import React from 'react'

export const $component = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Add sidebar/navigation here */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default $component
"@ | Out-File -FilePath $componentPath -Encoding UTF8
    }
}

Write-Host "All components and utilities structure fixed!" 