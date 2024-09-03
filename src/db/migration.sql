-- Migrations will appear here as you chat with AI

create type public.app_role as enum('admin', 'moderator', 'user');

create schema if not exists auth;

create table auth.users (
  id uuid primary key,
  role public.app_role not null,
  email text not null,
  password text not null
);

create table profile (
  id bigint primary key generated always as identity,
  user_id uuid unique not null,
  name text,
  role public.app_role not null,
  email text not null,
  phone text,
  created_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  updated_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  deleted_at bigint,
  foreign key (user_id) references auth.users (id) on delete cascade
);

create table permissions (
  id bigint primary key generated always as identity,
  name text unique not null,
  description text,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);

create table role_permission (
  role public.app_role not null,
  permission_id bigint not null,
  permission_name text not null,
  primary key (role, permission_id),
  foreign key (permission_id) references permissions (id) on delete cascade,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);

create table countries (
  id bigint primary key generated always as identity,
  code text unique not null,
  name text not null,
  created_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  updated_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000
);

create table currencies (
  id bigint primary key generated always as identity,
  code text not null unique,
  numeric_code int not null,
  decimals int not null,
  name text not null,
  symbol text not null
);

create table continents (
  id bigint primary key generated always as identity,
  code text not null unique,
  name text not null,
  deleted_at bigint,
  created_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  updated_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000
);

create table nations (
  id bigint primary key generated always as identity,
  code text not null unique,
  continent_codes text[0],
  region_codes text[0],
  name text not null,
  deleted_at bigint,
  created_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  updated_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000
);

create table regions (
  id bigint primary key generated always as identity,
  code text not null unique,
  continent_codes text[0],
  name text not null,
  deleted_at bigint,
  created_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  updated_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000
);

create table languages (
  id bigint primary key generated always as identity,
  language text not null,
  alphabetic_code char(2) not null,
  three_letter_code char(3) not null
);

create type product_type as enum('SIMPLE', 'GROUPED');

create table products (
  id bigint primary key generated always as identity,
  name text not null,
  description text not null,
  type product_type not null default 'SIMPLE',
  price numeric(10, 2) default 0.00,
  sale_price numeric(10, 2) default 0.00,
  media_ids bigint[0],
  quantity bigint default 1,
  deleted_at bigint,
  created_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  updated_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000
);

create table grouped_products (
  id bigint primary key generated always as identity,
  group_id bigint not null,
  product_id bigint not null,
  deleted_at bigint,
  created_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  updated_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  foreign key (product_id) references products (id) on delete cascade,
  foreign key (group_id) references products (id) on delete cascade
);

create type payment_modes as enum('ONLINE', 'OFFLINE');

create table orders (
  id bigint primary key generated always as identity,
  profile_id uuid not null,
  amount numeric(10, 2) default 0.00,
  currency text not null,
  shipping_cost numeric(10, 2) default 0.00,
  shipping_address jsonb,
  primary_contact_name text not null,
  primay_contact_email text not null,
  primary_contact_phone text not null,
  tags text[0] default '{}',
  payment_referece text,
  payment_mode payment_modes default 'OFFLINE',
  payment_details jsonb,
  coupon text,
  unique_id text unique not null,
  deleted_at bigint default null,
  created_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  updated_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  foreign key (profile_id) references profile (user_id) on delete cascade
);

create table order_line_items (
  id bigint primary key generated always as identity,
  order_id bigint not null,
  product_id bigint not null,
  product_name text not null,
  product_description text,
  quantity int default 1,
  price numeric(10, 2) not null,
  currency text not null,
  total_price numeric(10, 2) generated always as (quantity * price) stored,
  deleted_at bigint default null,
  created_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  updated_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  foreign key (product_id) references products (id) on delete cascade,
  foreign key (order_id) references orders (id) on delete cascade
);

create table order_invoices (
  id bigint primary key generated always as identity,
  order_id bigint not null,
  eft_bank text,
  eft_swift_code text,
  eft_account_name text,
  eft_account_number text,
  eft_account_type text,
  eft_branch_code text,
  eft_tax_code text,
  vat_number text,
  invoice_number int default 10001,
  deleted_at bigint default null,
  created_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  updated_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000
);

create table registrations (
  id bigint primary key generated always as identity,
  hotel_name text default '',
  spa_name text default '',
  restaurant_name text default '',
  agency_name text default '',
  country text default '',
  primary_contact_name text not null,
  primay_contact_email text not null,
  primary_contact_phone text not null,
  billing_name text,
  billing_address text,
  title text,
  order_id bigint,
  unique_id text unique not null,
  approval_state boolean default false,
  deleted_at bigint default null,
  created_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  updated_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  foreign key (order_id) references orders (id) on delete cascade
);

create table forms (
  id bigint primary key generated always as identity,
  title text not null default '',
  tags text[0],
  slug text,
  attributes jsonb default '{}',
  unique_id text not null,
  deleted_at bigint,
  created_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  updated_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000
);

create table media (
  id bigint primary key generated always as identity,
  tags text[0],
  attributes jsonb default '{}',
  key text not null default '',
  resource_type text not null default '',
  resource_id text not null default '',
  url_short_id text,
  originalname text,
  encoding text,
  mimetype text,
  content_type text,
  size bigint,
  location text,
  unique_id text not null,
  deleted_at bigint default null,
  created_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  updated_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  "position" bigint null
);

create table nomination_categories (
  id bigint primary key generated always as identity,
  name text not null,
  parent_unique_id text null,
  for_resource_type text not null,
  "position" int default 0,
  slug text not null,
  unique_id text unique not null,
  deleted_at bigint,
  created_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  updated_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000
);

create table press_releases (
  id bigint primary key generated always as identity,
  title text default '',
  description text default '',
  date bigint default 0,
  slug text not null,
  unique_id text unique not null,
  deleted_at bigint,
  created_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  updated_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  media_ids bigint[0]
);

create type address_type as enum('BILLING', 'SHIPPING');

create table address (
  id bigint primary key generated always as identity,
  entity_type text not null,
  entity_id bigint not null,
  address_type address_type not null,
  street text not null,
  city text not null,
  state text,
  postal_code text,
  country text not null,
  deleted_at bigint,
  created_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  updated_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000
);

create type restaurant_type as enum('RESTAURANT', 'BAR');

create type hotel_type as enum(
  'HOTEL',
  'RETREAT',
  'RESORT',
  'VILLA',
  'SELF CATERING',
  'LODGE',
  'SANCTUARY',
  'SERVICED APARTMENT',
  'CAMP',
  'TENTED CAMP',
  'GAME RESERVE',
  'BOUTIQUE HOTEL'
);

create table properties (
  id bigint primary key generated always as identity,
  name text not null,
  checkin_time text, -- hotel
  checkout_time text, -- hotel
  number_of_rooms int, -- hotel
  hotel_type hotel_type default 'HOTEL',
  restaurant_type restaurant_type null,
  is_company boolean default null,
  want_to_learn_more boolean default null,
  property_type text not null,
  legal_name text default '',
  tagline text default '',
  basic_info_description text default '',
  price_range text default '',
  amenity_feature text[0],
  amenity_feature_description text default '',
  description text default '',
  email text not null,
  location text,
  media_ids bigint[0],
  nomination_category_ids bigint[0],
  social_links jsonb default '{}',
  featured boolean default false,
  visibility text default 'PUBLIC',
  overlay_mask boolean default false,
  is_font_color_black boolean default true,
  linked_property text default '',
  global_location_number text default '',
  star_rating int,
  maximum_attendee_capacity int,
  address_id bigint references address (id) on delete cascade,
  voting_eligible_years int[0],
  voting_division_id bigint references nations (id),
  winner_ids bigint[0],
  slug text not null,
  unique_id text not null,
  deleted_at timestamp default null,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);

create table aggregate_ratings (
  id bigint primary key generated always as identity,
  property_id bigint unique references properties (id) on delete cascade,
  review_count int default 0,
  rating_value numeric(3, 2) default 0.0,
  category_name text not null default 'over_all'
);

create table booking_links (
  id bigint primary key generated always as identity,
  property_id bigint unique references properties (id) on delete cascade,
  phone_number text,
  whatsapp_number text,
  booking_url text
);

create table notifications (
  id bigint primary key generated always as identity,
  property_id bigint unique references properties (id) on delete cascade,
  review_email text
);

create type review_status as enum('PENDING', 'ACTIVE', 'DISCARDED');

create type resource_type as enum('HOTEL', 'RESTAURANT', 'SPA', 'AGENCY');

create table review_category (
  id bigint primary key generated always as identity,
  name text not null unique,
  description text
);

create table reviews (
  id bigint primary key generated always as identity,
  resource_type resource_type,
  resource_id text default '',
  profile_id uuid,
  reviewer_name text,
  reviewer_email text,
  reviewer_note text,
  overall_rating numeric check (
    overall_rating >= 1
    and overall_rating <= 5
  ),
  verified boolean default false,
  verification_code text default '',
  status review_status default 'PENDING',
  unique_id text unique not null default '',
  deleted_at bigint default null,
  created_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  updated_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  foreign key (profile_id) references profile (user_id)
);

create table sub_reviews (
  id bigint primary key generated always as identity,
  review_id bigint not null,
  review_category_name text not null,
  rating int not null check (rating between 1 and 5),
  deleted_at bigint default null,
  created_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  updated_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  foreign key (review_id) references reviews (id)
);

create table votes (
  id bigint primary key generated always as identity,
  voter_name text not null,
  voter_email text not null,
  property_name text not null,
  property_unique_id text not null,
  property_slug text not null,
  property_id bigint not null,
  property_type text not null,
  property_media jsonb,
  nomination_category_name text,
  nomination_category_unique_id text,
  nomination_category_id bigint,
  division_nation_name text,
  division_nation_code text,
  division_region_name text,
  division_region_code text,
  division_continent_name text,
  division_continent_code text,
  is_verified boolean default false,
  verification_code text,
  verification_mail_sent_at bigint default null,
  verified_at bigint default null,
  verified_via text,
  voting_year int,
  meta jsonb default '{}',
  unique_id text unique not null,
  deleted_at bigint default null,
  created_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  updated_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  foreign key (nomination_category_id) references nomination_categories (id)
);

create type fingerprint_provider as enum('fingerprintjs', 'fingerprintjsPro');

create table email_fingerprints (
  id bigint primary key generated always as identity,
  email text not null,
  visitor_id text not null,
  provider fingerprint_provider not null,
  fingerprint jsonb default '{}',
  is_verified boolean default false,
  verified_at bigint default null,
  verification_reference_unique_id text,
  verification_reference_type text,
  unique_id text not null unique,
  index_key text unique,
  deleted_at bigint default null,
  created_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000,
  updated_at bigint not null default extract(
    'epoch'
    from
      now()
  ) * 1000
);