const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const TOKEN = process.env.SANITY_WRITE_TOKEN;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

if (!PROJECT_ID || !TOKEN) {
    console.error('❌ Missing required environment variables');
    console.error('PROJECT_ID:', PROJECT_ID);
    console.error('TOKEN:', TOKEN ? '***' : 'MISSING');
    process.exit(1);
}

const client = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: '2024-03-01',
    token: TOKEN,
    useCdn: false,
});

const ICON_MAPPING = {
    'coffre': 'Lock',
    'safe': 'Lock',
    'portail': 'DoorOpen',
    'gate': 'DoorOpen',
    'ventilateur': 'Fan',
    'fan': 'Fan',
    'bureau': 'Briefcase',
    'office': 'Briefcase',
    'desk': 'Briefcase',
    'bébé': 'Baby',
    'baby': 'Baby',
    'lit bébé': 'Baby',
    'chaise haute': 'Baby',
    'jeux': 'Gamepad2',
    'game': 'Gamepad2',
    'console': 'Gamepad2',
    'ps4': 'Gamepad2',
    'xbox': 'Gamepad2',
    'douche': 'ShowerHead',
    'shower': 'ShowerHead',
    'climatisation': 'Wind',
    'ac': 'Wind',
    'air cond': 'Wind',
    'piscine': 'Droplets',
    'pool': 'Droplets',
    'parking': 'Car',
    'car': 'Car',
    'voiture': 'Car',
    'cuisine': 'ChefHat',
    'kitchen': 'ChefHat',
    'chef': 'ChefHat',
    'jardin': 'Flower2',
    'garden': 'Flower2',
    'wifi': 'Wifi',
    'internet': 'Wifi',
    'tv': 'Tv',
    'télé': 'Tv',
    'barbecue': 'Utensils',
    'bbq': 'Utensils',
    'plage': 'Waves',
    'beach': 'Waves',
    'sonos': 'Speaker',
    'enceinte': 'Speaker',
    'music': 'Music',
    'musique': 'Music',
    'frigo': 'Coffee',
    'nespresso': 'Coffee',
    'café': 'Coffee',
    'sport': 'Dumbbell',
    'fitness': 'Dumbbell',
    'gym': 'Dumbbell',
    'alarme': 'Shield',
    'sécurité': 'Shield',
    'security': 'Shield',
};

async function fixMissingIcons() {
    console.log('🔍 Searching for equipment without icons...');

    // Fetch all equipment documents
    const equipmentList = await client.fetch('*[_type == "equipment"]');

    let updatedCount = 0;

    for (const item of equipmentList) {
        if (item.icon) {
            // Check if icon is 'Safe' and replace with 'Lock'
            if (item.icon === 'Safe') {
                console.log(`🔄 Updating "${item.name}" (Safe -> Lock)`);
                await client.patch(item._id).set({ icon: 'Lock' }).commit();
                updatedCount++;
            }
            continue;
        }

        const nameLower = (item.name || '').toLowerCase();
        let matchedIcon = 'Star'; // Default

        // Find match
        for (const [key, icon] of Object.entries(ICON_MAPPING)) {
            if (nameLower.includes(key)) {
                matchedIcon = icon;
                break;
            }
        }

        console.log(`🛠️ Fixing "${item.name}" -> Assigning icon: ${matchedIcon}`);

        try {
            await client.patch(item._id)
                .set({ icon: matchedIcon })
                .commit();
            updatedCount++;
        } catch (err) {
            console.error(`❌ Failed to update ${item.name}:`, err.message);
        }
    }

    console.log(`\n✅ Finished! Updated ${updatedCount} equipment items.`);
}

fixMissingIcons().catch(console.error);
