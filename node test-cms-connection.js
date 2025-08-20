// test-cms-connection.js
// Run this script to test your CMS connection: node test-cms-connection.js

const axios = require('axios');

async function testCMSConnection() {
  const cmsUrl = 'https://evadigitalcmsstag.evapharma.com';
  
  console.log('🔍 Testing CMS connection...');
  console.log('CMS URL:', cmsUrl);
  
  const tests = [
    {
      name: 'Basic connectivity test',
      url: cmsUrl,
      timeout: 10000
    },
    {
      name: 'API endpoint test',
      url: `${cmsUrl}/api/home-page`,
      timeout: 15000
    },
    {
      name: 'Health check',
      url: `${cmsUrl}/_health`,
      timeout: 5000
    }
  ];
  
  for (const test of tests) {
    console.log(`\n📡 ${test.name}:`);
    console.log(`   URL: ${test.url}`);
    
    try {
      const startTime = Date.now();
      
      const response = await axios.get(test.url, {
        timeout: test.timeout,
        headers: {
          'User-Agent': 'Eva-Digital-Factory/Test',
          'Accept': 'application/json'
        },
        validateStatus: () => true // Accept any status code
      });
      
      const duration = Date.now() - startTime;
      
      console.log(`   ✅ Status: ${response.status} ${response.statusText}`);
      console.log(`   ⏱️  Duration: ${duration}ms`);
      console.log(`   📊 Response size: ${JSON.stringify(response.data).length} chars`);
      
      if (response.status >= 400) {
        console.log(`   ⚠️  Error response:`, response.data);
      }
      
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}`);
      if (error.code) {
        console.log(`   🔍 Error code: ${error.code}`);
      }
      if (error.response) {
        console.log(`   📄 Response status: ${error.response.status}`);
      }
    }
  }
  
  // Network diagnostic
  console.log('\n🔧 Network Diagnostic:');
  try {
    const response = await axios.get('https://httpbin.org/ip', { timeout: 5000 });
    console.log('   🌐 Your IP:', response.data.origin);
    console.log('   ✅ Internet connection: OK');
  } catch (error) {
    console.log('   ❌ Internet connection issue:', error.message);
  }
  
  // DNS resolution test
  console.log('\n🔍 DNS Resolution Test:');
  const dns = require('dns').promises;
  try {
    const addresses = await dns.lookup('evadigitalcmsstag.evapharma.com');
    console.log('   ✅ DNS resolved to:', addresses.address);
  } catch (error) {
    console.log('   ❌ DNS resolution failed:', error.message);
  }
  
  console.log('\n📋 Recommendations:');
  console.log('   1. Check if the CMS server is running');
  console.log('   2. Verify your internet connection');
  console.log('   3. Check if there are firewall restrictions');
  console.log('   4. Try accessing the URL in your browser');
  console.log('   5. Contact your system administrator if issues persist');
}

testCMSConnection().catch(console.error);