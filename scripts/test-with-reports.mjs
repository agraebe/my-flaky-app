#!/usr/bin/env node

/**
 * Test runner script that generates XML reports for Trunk Flaky Tests
 * Usage: node scripts/test-with-reports.js
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🧪 Running Jasmine tests with XML report generation...\n');

try {
  // Ensure test-reports directory exists
  const testReportsDir = path.join(process.cwd(), 'test-reports');
  if (!fs.existsSync(testReportsDir)) {
    fs.mkdirSync(testReportsDir, { recursive: true });
    console.log('📁 Created test-reports directory');
  }

  // Run tests
  execSync('npm test', { stdio: 'inherit' });

  // Check for generated XML reports
  const xmlFiles = fs.readdirSync(testReportsDir).filter(file => file.endsWith('.xml'));
  
  if (xmlFiles.length > 0) {
    console.log('\n✅ XML test reports generated:');
    xmlFiles.forEach(file => {
      const filePath = path.join(testReportsDir, file);
      const stats = fs.statSync(filePath);
      console.log(`   📄 ${file} (${stats.size} bytes)`);
    });
    
    console.log('\n📊 Report Summary:');
    xmlFiles.forEach(file => {
      const content = fs.readFileSync(path.join(testReportsDir, file), 'utf8');
      const testMatch = content.match(/tests="(\d+)"/);
      const failureMatch = content.match(/failures="(\d+)"/);
      const errorMatch = content.match(/errors="(\d+)"/);
      
      const tests = testMatch ? testMatch[1] : '0';
      const failures = failureMatch ? failureMatch[1] : '0';
      const errors = errorMatch ? errorMatch[1] : '0';
      
      console.log(`   ${file}: ${tests} tests, ${failures} failures, ${errors} errors`);
    });
    
    console.log('\n🔗 For Trunk integration, use the glob pattern: test-reports/*.xml');
  } else {
    console.log('\n⚠️  No XML reports found in test-reports directory');
  }

} catch (error) {
  console.error('\n❌ Test execution failed:', error.message);
  process.exit(1);
}
