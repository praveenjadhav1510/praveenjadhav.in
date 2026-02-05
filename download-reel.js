const { instagramGetUrl } = require("instagram-url-direct");
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const url = process.argv[2];

if (!url) {
    console.log("Usage: node download-reel.js <instagram-reel-url>");
    console.log("Example: node download-reel.js https://www.instagram.com/reel/C8...");
    process.exit(1);
}

async function downloadReel(url) {
    try {
        console.log(`Fetching download link for: ${url}`);
        // instagram-url-direct returns a promise that resolves to the media data
        const result = await instagramGetUrl(url);

        // The API typically returns an object with `url_list` containing download links
        if (result.url_list && result.url_list.length > 0) {
            // Usually the first one is the video/image
            const mediaUrl = result.url_list[0];
            console.log("Found media URL. Downloading...");

            const response = await axios({
                method: 'GET',
                url: mediaUrl,
                responseType: 'stream'
            });

            const fileName = `reel-${Date.now()}.mp4`;
            const filePath = path.join(__dirname, fileName);

            const writer = fs.createWriteStream(filePath);
            response.data.pipe(writer);

            return new Promise((resolve, reject) => {
                writer.on('finish', () => {
                    console.log(`Successfully downloaded to: ${filePath}`);
                    resolve();
                });
                writer.on('error', reject);
            });
        } else {
            console.log("Could not find media URL. Check if the URL is correct, public, and is a Reel/Post.");
            console.log("API Response:", result);
        }
    } catch (error) {
        console.error("Error downloading reel:", error.message);
        if (error.response) {
            console.error("Status:", error.response.status);
        }
    }
}

downloadReel(url);
