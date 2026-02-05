const { instagramGetUrl } = require("instagram-url-direct");

module.exports = async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
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
        return res.status(500).json({ success: false, error: error.message });
    }
};
