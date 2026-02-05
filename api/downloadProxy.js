const axios = require('axios');

module.exports = async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).send("URL required");

    try {
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
        res.status(500).send("Error downloading file");
    }
};
