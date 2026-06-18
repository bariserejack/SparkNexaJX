#!/usr/bin/env node

/**
 * This script logs the redirect URLs that Expo generates for your app.
 * Use these URLs in your Supabase project settings.
 */

const scheme = 'sparknexajx'; // from app.json
const path = 'auth/callback';

console.log('\n=== Supabase Redirect URLs ===\n');

// For development (Expo Go / native)
console.log('1. For Expo Go (native dev):');
console.log(`   ${scheme}://${path}`);

// For web
console.log('\n2. For Web (localhost):');
console.log('   http://localhost:8081');

// For production (if building APK/IPA)
console.log('\n3. For Production (built app):');
console.log(`   ${scheme}://${path}`);

console.log('\n=== Steps to add to Supabase ===\n');
console.log('1. Go to: https://app.supabase.com → Your Project → Settings → Auth');
console.log('2. Find "Redirect URLs" section');
console.log('3. Copy and paste each URL above into a new line');
console.log('4. Click "Save"');
console.log('5. Try logging in again\n');

console.log('=== OAuth Provider Setup ===\n');
console.log('For Google/GitHub/Apple OAuth to work, also ensure:');
console.log('1. The provider is ENABLED in Supabase Auth → Providers');
console.log('2. Client ID & Secret are configured');
console.log('3. The provider\'s callback URL is set to: https://YOUR-PROJECT.supabase.co/auth/v1/callback?provider=PROVIDER_NAME\n');
