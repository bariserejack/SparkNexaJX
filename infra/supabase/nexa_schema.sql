-- NexaMarket & NexaVault schema for Supabase (Postgres)
-- Run this in Supabase SQL editor to create basic tables for marketplace, booking, wallet and chat

-- Providers (service professionals)
CREATE TABLE IF NOT EXISTS providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  bio text,
  avatar_url text,
  location geometry(POINT, 4326),
  created_at timestamptz DEFAULT now()
);

-- Services offered by providers
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES providers(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  duration_minutes integer DEFAULT 60,
  created_at timestamptz DEFAULT now()
);

-- Listings (denormalized view for searching)
CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid REFERENCES services(id) ON DELETE CASCADE,
  title text,
  price numeric(10,2),
  tags text[],
  created_at timestamptz DEFAULT now()
);

-- Bookings (with escrow/deposit tracking)
CREATE TYPE IF NOT EXISTS booking_status AS ENUM ('pending','accepted','in_progress','completed','cancelled','disputed');

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  provider_id uuid REFERENCES providers(id) ON DELETE CASCADE,
  scheduled_at timestamptz,
  status booking_status DEFAULT 'pending',
  total_amount numeric(10,2) NOT NULL,
  deposit_amount numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Wallets for users (NexaVault)
CREATE TABLE IF NOT EXISTS wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  balance numeric(12,2) DEFAULT 0,
  currency text DEFAULT 'USD',
  created_at timestamptz DEFAULT now()
);

-- Transactions on wallets
CREATE TYPE IF NOT EXISTS tx_type AS ENUM ('deposit','withdrawal','escrow_hold','escrow_release','refund','payout');

CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id uuid REFERENCES wallets(id) ON DELETE CASCADE,
  booking_id uuid REFERENCES bookings(id),
  amount numeric(12,2) NOT NULL,
  type tx_type NOT NULL,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- Simple chat messages linked to bookings
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  body text,
  attachments jsonb,
  created_at timestamptz DEFAULT now()
);

-- Indexes to speed up location searches (if using PostGIS)
-- CREATE INDEX IF NOT EXISTS idx_providers_location ON providers USING GIST (location);

-- Notes:
-- - You should run appropriate migrations to add constraints and check foreign keys.
-- - Adjust currency, precision, and timezone behavior for your region.
