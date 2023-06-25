const express = require('express');
const shortid = require('shortid');
const bodyParser = require('body-parser');

const Url = require('../models/url');

const router = express();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/api/short', async (req, res) => {
    let longUrl = req.body.longUrl;

    try {
        const shortId = shortid.generate();
        const url = new Url({
            shortUrl: shortId,
            longUrl,
        });

        await url.save();
        res.status(201).json({ shortUrl: shortId, message: 'URL shortened successfully!' });
    } catch (error) {
        console.error('Error creating short URL:', error);

        if (!longUrl) {
            res.status(400).json({ error: 'Long URL is required' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

router.get('/short/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const url = await Url.findOne({ shortUrl });

        if (url) {
            res.redirect(url.longUrl);
        } else {
            res.status(404).json({ error: 'Short URL not found' });
        }
    } catch (error) {
        console.error('Error retrieving long URL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;