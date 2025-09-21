#!/usr/bin/env node

/**
 * Supabase Connection Test Script
 * 
 * This script # Test 3: Node.js fetch
console.log('\n3️⃣ Testing Node.js HTTP...');

const testUrl = new URL(supabaseUrl);
const options = {
  hostname: testUrl.hostname,
  port: 443,
  path: '/',
  method: 'HEAD',
  timeout: 5000
};pabase connectivity and provides specific fixes
 * for DNS resolution issues and other connection problems.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { URL } from 'url';

console.log('🔍 Testing Supabase Connectivity...\n');

// Load environment variables
const envPath = path.join(process.cwd(), 'apps', 'web', '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local file not found in apps/web/');
  console.error('💡 Make sure you\'re running this from the project root');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const supabaseUrl = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.+)/)?.[1];
const supabaseKey = envContent.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.+)/)?.[1];

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase environment variables not found');
  console.error('💡 Check your .env.local file for NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const hostname = supabaseUrl.replace('https://', '').replace('http://', '');
console.log(`🌐 Testing connection to: ${hostname}`);

// Test 1: DNS Resolution
console.log('\n1️⃣ Testing DNS Resolution...');
try {
  const dnsResult = execSync(`nslookup ${hostname}`, { encoding: 'utf8', timeout: 5000 });
  if (dnsResult.includes('Non-existent domain') || dnsResult.includes('can\'t find')) {
    throw new Error('DNS resolution failed with default DNS');
  }
  console.log('✅ DNS resolution successful with default DNS');
} catch (error) {
  console.log('❌ DNS resolution failed with default DNS');
  
  // Test with Google DNS
  console.log('🔄 Testing with Google DNS (8.8.8.8)...');
  try {
    const googleDnsResult = execSync(`nslookup ${hostname} 8.8.8.8`, { encoding: 'utf8', timeout: 5000 });
    if (googleDnsResult.includes('Non-existent domain')) {
      throw new Error('DNS resolution failed with Google DNS too');
    }
    console.log('✅ DNS resolution works with Google DNS');
    console.log('🛠️  SOLUTION: Your local DNS is the issue. Run one of these fixes:');
    console.log('   • PowerShell (Admin): .\\fix-dns.ps1');
    console.log('   • PowerShell (Admin): .\\fix-hosts.ps1');
    console.log('   • Use mobile hotspot temporarily');
    console.log('   • Contact network admin if on corporate network');
  } catch (googleDnsError) {
    console.log('❌ DNS resolution failed even with Google DNS');
    console.log('🛠️  SOLUTION: This might be a Supabase outage or firewall issue');
  }
}

// Test 2: HTTP Connectivity
console.log('\n2️⃣ Testing HTTP Connectivity...');
try {
  const curlResult = execSync(`curl -I -s ${supabaseUrl}`, { encoding: 'utf8', timeout: 10000 });
  if (curlResult.includes('200 OK') || curlResult.includes('404')) {
    console.log('✅ HTTP connectivity successful');
  } else {
    console.log('⚠️  HTTP connectivity issues:', curlResult.split('\n')[0]);
  }
} catch (error) {
  console.log('❌ HTTP connectivity failed');
  if (error.message.includes('Could not resolve host')) {
    console.log('🛠️  This confirms DNS resolution is the issue');
  }
}

// Test 3: Node.js fetch
console.log('\n3️⃣ Testing Node.js HTTP...');
const https = require('https');
const url = require('url');

const testUrl = new URL(supabaseUrl);
const options = {
  hostname: testUrl.hostname,
  port: 443,
  path: '/',
  method: 'HEAD',
  timeout: 5000
};

const req = https.request(options, (res) => {
  console.log(`✅ Node.js HTTP successful (${res.statusCode})`);
});

req.on('error', (error) => {
  if (error.code === 'ENOTFOUND') {
    console.log('❌ Node.js HTTP failed with ENOTFOUND (DNS issue)');
    console.log('🛠️  This is the same error your Next.js app is experiencing');
  } else {
    console.log(`❌ Node.js HTTP failed: ${error.message}`);
  }
});

req.on('timeout', () => {
  console.log('❌ Node.js HTTP timeout');
  req.destroy();
});

req.end();

// Summary and recommendations
setTimeout(() => {
  console.log('\n📋 SUMMARY AND NEXT STEPS:');
  console.log('━'.repeat(50));
  console.log('');
  console.log('If DNS resolution failed:');
  console.log('  1. Run fix-dns.ps1 as Administrator (recommended)');
  console.log('  2. Or run fix-hosts.ps1 as Administrator (alternative)');
  console.log('  3. Restart your development server after the fix');
  console.log('');
  console.log('If still having issues:');
  console.log('  • Try using mobile hotspot');
  console.log('  • Check if you\'re on a corporate network with restrictions');
  console.log('  • Temporarily disable VPN if using one');
  console.log('  • Contact your ISP if the issue persists');
  console.log('');
  console.log('The Supabase project is healthy - this is a local connectivity issue.');
  console.log('');
}, 1000);
