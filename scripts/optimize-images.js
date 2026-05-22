import fs from 'fs';
import path from 'path';
import https from 'https';
import sharp from 'sharp';

const urls = [
    "https://takel.se/wp-content/uploads/2024/11/Takel-Hemma-hos-Martin-768x788.jpeg",
    "https://takel.se/wp-content/uploads/2024/09/Takel-Solceller-Avstyckningsvagen-Jarfalla-Hans.jpeg",
    "https://takel.se/wp-content/uploads/2024/09/Takel_Solceller_Mandolinvagen_1_Skrattande_Dag__Eva-1-768x512.jpeg",
    "https://takel.se/wp-content/uploads/2024/09/Takel_Solceller_Vasterskogsvagen_Tak3-600x600-1.jpeg",
    "https://takel.se/wp-content/uploads/2024/09/Takel_Solceller_Gadolinitvagen_Overblick_Med_Pool-600x600-1.jpeg",
    "https://takel.se/wp-content/uploads/2024/09/Takel_Solceller_Dalstigen_Resaro_Niclas_Marianne-600x600-1.jpeg",
    "https://takel.se/wp-content/uploads/2024/09/Takel_Solceller_Mandolinvagen_1_Skrattande_Dag__Eva-1.jpeg",
    "https://takel.se/wp-content/uploads/2024/11/Takel-Hemma-hos-Martin.jpeg"
];

const outDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const downloadImage = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
                return;
            }
            const chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => resolve(Buffer.concat(chunks)));
        }).on('error', reject);
    });
};

async function processImages() {
    console.log('Downloading and converting images to WebP...');
    for (const url of urls) {
        try {
            const buffer = await downloadImage(url);
            let filename = url.split('/').pop().replace(/\.jpeg|\.jpg|\.png/i, '.webp');
            const outPath = path.join(outDir, filename);
            
            await sharp(buffer)
                .webp({ quality: 80 })
                .toFile(outPath);
            
            console.log(`✅ Processed: ${filename}`);
        } catch (err) {
            console.error(`❌ Error processing ${url}:`, err.message);
        }
    }
    console.log('Done!');
}

processImages();
