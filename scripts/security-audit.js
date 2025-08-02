#!/usr/bin/env node

/**
 * Security audit script for dependency vulnerability scanning
 * This script runs comprehensive security checks and generates reports
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUDIT_REPORT_PATH = path.join(__dirname, '..', 'security-audit-report.json');
const AUDIT_SUMMARY_PATH = path.join(__dirname, '..', 'security-audit-summary.md');

function runCommand(command, options = {}) {
  try {
    return execSync(command, { 
      encoding: 'utf8', 
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options 
    });
  } catch (error) {
    if (!options.allowFailure) {
      throw error;
    }
    return error.stdout || '';
  }
}

function generateAuditReport() {
  console.log('🔍 Running comprehensive security audit...');
  
  const results = {
    timestamp: new Date().toISOString(),
    pnpmAudit: null,
    outdatedPackages: null,
    summary: {
      totalVulnerabilities: 0,
      criticalVulnerabilities: 0,
      highVulnerabilities: 0,
      moderateVulnerabilities: 0,
      lowVulnerabilities: 0,
      outdatedPackages: 0
    }
  };

  // Run pnpm audit
  console.log('📦 Checking for dependency vulnerabilities...');
  try {
    const auditOutput = runCommand('pnpm audit --json', { silent: true, allowFailure: true });
    if (auditOutput) {
      try {
        results.pnpmAudit = JSON.parse(auditOutput);
        
        // Parse audit results
        if (results.pnpmAudit.advisories) {
          Object.values(results.pnpmAudit.advisories).forEach(advisory => {
            results.summary.totalVulnerabilities++;
            switch (advisory.severity) {
              case 'critical':
                results.summary.criticalVulnerabilities++;
                break;
              case 'high':
                results.summary.highVulnerabilities++;
                break;
              case 'moderate':
                results.summary.moderateVulnerabilities++;
                break;
              case 'low':
                results.summary.lowVulnerabilities++;
                break;
            }
          });
        }
      } catch (parseError) {
        console.warn('⚠️  Could not parse audit JSON output');
        results.pnpmAudit = { error: 'Failed to parse audit output', output: auditOutput };
      }
    }
  } catch (error) {
    console.warn('⚠️  pnpm audit failed:', error.message);
    results.pnpmAudit = { error: error.message };
  }

  // Check for outdated packages
  console.log('📅 Checking for outdated packages...');
  try {
    const outdatedOutput = runCommand('pnpm outdated --json', { silent: true, allowFailure: true });
    if (outdatedOutput) {
      try {
        results.outdatedPackages = JSON.parse(outdatedOutput);
        if (results.outdatedPackages && typeof results.outdatedPackages === 'object') {
          results.summary.outdatedPackages = Object.keys(results.outdatedPackages).length;
        }
      } catch (parseError) {
        console.warn('⚠️  Could not parse outdated packages output');
        results.outdatedPackages = { error: 'Failed to parse outdated output', output: outdatedOutput };
      }
    }
  } catch (error) {
    console.warn('⚠️  pnpm outdated failed:', error.message);
    results.outdatedPackages = { error: error.message };
  }

  // Save detailed report
  fs.writeFileSync(AUDIT_REPORT_PATH, JSON.stringify(results, null, 2));
  console.log(`📄 Detailed report saved to: ${AUDIT_REPORT_PATH}`);

  // Generate summary report
  generateSummaryReport(results);

  return results;
}

function generateSummaryReport(results) {
  const summary = results.summary;
  let report = `# Security Audit Summary\n\n`;
  report += `**Generated:** ${new Date(results.timestamp).toLocaleString()}\n\n`;
  
  report += `## 🔒 Vulnerability Summary\n\n`;
  report += `- **Total Vulnerabilities:** ${summary.totalVulnerabilities}\n`;
  report += `- **Critical:** ${summary.criticalVulnerabilities} 🔴\n`;
  report += `- **High:** ${summary.highVulnerabilities} 🟠\n`;
  report += `- **Moderate:** ${summary.moderateVulnerabilities} 🟡\n`;
  report += `- **Low:** ${summary.lowVulnerabilities} 🟢\n\n`;
  
  report += `## 📦 Package Status\n\n`;
  report += `- **Outdated Packages:** ${summary.outdatedPackages}\n\n`;

  // Add recommendations
  report += `## 🎯 Recommendations\n\n`;
  
  if (summary.criticalVulnerabilities > 0) {
    report += `- ⚠️  **URGENT:** ${summary.criticalVulnerabilities} critical vulnerabilities found. Run \`pnpm audit fix\` immediately.\n`;
  }
  
  if (summary.highVulnerabilities > 0) {
    report += `- 🔴 **HIGH PRIORITY:** ${summary.highVulnerabilities} high-severity vulnerabilities found. Address as soon as possible.\n`;
  }
  
  if (summary.moderateVulnerabilities > 0) {
    report += `- 🟡 **MODERATE:** ${summary.moderateVulnerabilities} moderate vulnerabilities found. Plan to address in next sprint.\n`;
  }
  
  if (summary.outdatedPackages > 0) {
    report += `- 📅 **MAINTENANCE:** ${summary.outdatedPackages} packages are outdated. Consider updating with \`pnpm update\`.\n`;
  }
  
  if (summary.totalVulnerabilities === 0 && summary.outdatedPackages === 0) {
    report += `- ✅ **EXCELLENT:** No vulnerabilities or outdated packages found!\n`;
  }

  report += `\n## 📋 Next Steps\n\n`;
  report += `1. Review the detailed report: \`${path.basename(AUDIT_REPORT_PATH)}\`\n`;
  report += `2. Run \`pnpm audit fix\` to auto-fix vulnerabilities\n`;
  report += `3. Manually review and update packages that cannot be auto-fixed\n`;
  report += `4. Re-run this audit after making changes\n\n`;
  
  report += `---\n`;
  report += `*This report was generated automatically. For more details, see the full JSON report.*\n`;

  fs.writeFileSync(AUDIT_SUMMARY_PATH, report);
  console.log(`📋 Summary report saved to: ${AUDIT_SUMMARY_PATH}`);
  
  // Display summary in console
  console.log('\n' + report);
}

function main() {
  const args = process.argv.slice(2);
  const isCI = process.env.CI === 'true';
  const failOnVulnerabilities = args.includes('--fail-on-vulnerabilities') || isCI;
  
  try {
    const results = generateAuditReport();
    
    // In CI or when explicitly requested, fail the build if vulnerabilities are found
    if (failOnVulnerabilities) {
      const { criticalVulnerabilities, highVulnerabilities } = results.summary;
      
      if (criticalVulnerabilities > 0) {
        console.error(`❌ Build failed: ${criticalVulnerabilities} critical vulnerabilities found`);
        process.exit(1);
      }
      
      if (highVulnerabilities > 0) {
        console.error(`❌ Build failed: ${highVulnerabilities} high-severity vulnerabilities found`);
        process.exit(1);
      }
    }
    
    console.log('✅ Security audit completed successfully');
    
  } catch (error) {
    console.error('❌ Security audit failed:', error.message);
    process.exit(1);
  }
}

// Run main function if this script is executed directly
if (process.argv[1] && import.meta.url === `file://${path.resolve(process.argv[1])}`) {
  main();
} else {
  // Fallback: always run main when script is executed
  main();
}

export { generateAuditReport, generateSummaryReport };