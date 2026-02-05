import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Praveen Jadhav",
        "url": "https://praveenjadhav.in",
        "jobTitle": "Developer",
        "sameAs": [
            "https://github.com/praveenjadhav1510",
            "https://portfolio-2-three-sooty-54.vercel.app/"
        ]
    };

    return (
        <Helmet>
            <title>Praveen Jadhav - Developer | Terminal Portfolio</title>
            <meta name="description" content="Praveen Jadhav. Developer. Stack: React, Node, MongoDB, Firebase. Projects: Mood Music App, SaveLinks Manager, TalentSleuth AI. Explore my terminal portfolio." />
            <meta name="keywords" content="Praveen Jadhav, Developer, Full Stack, React, Node.js, MongoDB, Firebase, Portfolio, Terminal Website" />
            <meta name="author" content="Praveen Jadhav" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Praveen Jadhav - Developer Portfolio" />
            <meta property="og:description" content="Interactive terminal-based portfolio of Praveen Jadhav. Type 'help' to see commands." />
            <meta property="og:url" content="https://praveenjadhav.in" />
            <meta property="og:site_name" content="Praveen Jadhav" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Praveen Jadhav - Developer Portfolio" />
            <meta name="twitter:description" content="Interactive terminal-based portfolio of Praveen Jadhav. Type 'help' to see commands." />

            <link rel="canonical" href="https://praveenjadhav.in" />

            <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
    );
}
