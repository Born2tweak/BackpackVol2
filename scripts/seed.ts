import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const seedListings = [
  {
    title: 'TI-84 Plus Calculator',
    description: 'Barely used graphing calculator, perfect for calc and stats classes. Batteries included.',
    price: 45,
    owner_id: 'seed-user'
  },
  {
    title: 'Intro to Psychology Textbook',
    description: '10th edition, some highlighting but great condition. Required for PSY 101.',
    price: 35,
    owner_id: 'seed-user'
  },
  {
    title: 'North Face Backpack',
    description: 'Black Borealis model, very spacious with laptop sleeve. Minor wear.',
    price: 55,
    owner_id: 'seed-user'
  },
  {
    title: 'Wireless Noise-Canceling Headphones',
    description: 'Sony WH-1000XM4, excellent sound quality. Selling because I upgraded.',
    price: 120,
    owner_id: 'seed-user'
  },
  {
    title: 'University Hoodie - Size M',
    description: 'Official campus bookstore hoodie, barely worn. Navy blue.',
    price: 25,
    owner_id: 'seed-user'
  },
  {
    title: 'Organic Chemistry Model Kit',
    description: 'Complete molecular model set for orgo. All pieces included.',
    price: 18,
    owner_id: 'seed-user'
  },
  {
    title: 'Desk Lamp with USB Port',
    description: 'LED lamp with adjustable brightness. Great for late-night studying.',
    price: 15,
    owner_id: 'seed-user'
  },
  {
    title: 'Mini Fridge',
    description: 'Compact 3.2 cu ft fridge, perfect for dorm room. Works great!',
    price: 65,
    owner_id: 'seed-user'
  },
  {
    title: 'Calculus Early Transcendentals',
    description: 'Stewart 8th edition. Some notes in margins but all pages intact.',
    price: 40,
    owner_id: 'seed-user'
  },
  {
    title: 'Portable Phone Charger',
    description: '20000mAh power bank, charges phone 4-5 times. Like new.',
    price: 22,
    owner_id: 'seed-user'
  }
];

async function seed() {
  console.log('Seeding database...');
  
  const { data, error } = await supabase
    .from('backpacks')
    .insert(seedListings)
    .select();

  if (error) {
    console.error('Error seeding:', error);
    process.exit(1);
  }

  console.log(`Successfully seeded ${data?.length} listings`);
}

seed();
