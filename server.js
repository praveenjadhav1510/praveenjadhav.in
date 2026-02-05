const express = require('express');
const cors = require('cors');
const { instagramGetUrl } = require("instagram-url-direct");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/reel', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        console.log(`Fetching: ${url}`);
        const result = await instagramGetUrl(url);

        if (result.url_list && result.url_list.length > 0) {
            return res.json({
                success: true,
                mediaUrl: result.url_list[0]
            });
        } else {
            return res.status(404).json({ success: false, error: 'Media not found' });
        }
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/downloadProxy', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).send("URL required");

    try {
        const axios = require('axios');
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        res.setHeader('Content-Disposition', `attachment; filename="reel-${Date.now()}.mp4"`);
        res.setHeader('Content-Type', response.headers['content-type']);

        response.data.pipe(res);
    } catch (error) {
        console.error("Proxy error:", error.message);
        res.status(500).send("Error downloading file");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
