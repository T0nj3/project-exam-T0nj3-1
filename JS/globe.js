import { fetchPosts } from './api-utils.js';

const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const locationMapping = {
    "Marrakech, Morocco": { lat: 31.6295, lng: -7.9811 },
    "Cairo, Egypt": { lat: 30.0444, lng: 31.2357 },
    "Zanzibar, Tanzania": { lat: -6.1659, lng: 39.2026 },
    "Victoria Falls, Zambia": { lat: -17.9244, lng: 25.8567 },
    "Fez, Morocco": { lat: 34.0331, lng: -5.0003 },
    "Kilimanjaro, Tanzania": { lat: -3.0674, lng: 37.3556 },
    "Okavango Delta, Botswana": { lat: -19.2333, lng: 23.0000 },
    "Bangkok, Thailand": { lat: 13.7563, lng: 100.5018 },
    "Tokyo, Japan": { lat: 35.6895, lng: 139.6917 },
    "Bali, Indonesia": { lat: -8.3405, lng: 115.0920 },
    "Phuket, Thailand": { lat: 7.8804, lng: 98.3923 },
    "Hanoi, Vietnam": { lat: 21.0285, lng: 105.8542 },
    "Siem Reap, Cambodia": { lat: 13.3671, lng: 103.8448 },
    "Maldives, Maldives": { lat: 3.2028, lng: 73.2207 },
    "Goa, India": { lat: 15.2993, lng: 74.1240 },
    "Kathmandu, Nepal": { lat: 27.7172, lng: 85.3240 },
    "Kuala Lumpur, Malaysia": { lat: 3.1390, lng: 101.6869 },
    "Taipei, Taiwan": { lat: 25.0330, lng: 121.5654 },
    "Seoul, South Korea": { lat: 37.5665, lng: 126.9780 },
    "Abu Dhabi, United Arab Emirates": { lat: 24.4539, lng: 54.3773 },
    "Istanbul, Turkey": { lat: 41.0082, lng: 28.9784 },
    "Rome, Italy": { lat: 41.9028, lng: 12.4964 },
    "Santorini, Greece": { lat: 36.3932, lng: 25.4615 },
    "Barcelona, Spain": { lat: 41.3851, lng: 2.1734 },
    "Geirangerfjord, Norway": { lat: 62.1008, lng: 7.2075 },
    "Lofoten, Norway": { lat: 68.2275, lng: 13.8483 },
    "Bucharest, Romania": { lat: 44.4268, lng: 26.1025 },
    "Belgrade, Serbia": { lat: 44.8176, lng: 20.4569 },
    "Mostar, Bosnia and Herzegovina": { lat: 43.3438, lng: 17.8078 },
    "Kotor, Montenegro": { lat: 42.4607, lng: 18.7712 },
    "Kraków, Poland": { lat: 50.0647, lng: 19.9450 },
    "New York City, USA": { lat: 40.7128, lng: -74.0060 },
    "Barbados, Caribbean": { lat: 13.1939, lng: -59.5432 },
    "Los Angeles, USA": { lat: 34.0522, lng: -118.2437 },
    "Cancún, Mexico": { lat: 21.1743, lng: -86.8466 },
    "Montreal, Canada": { lat: 45.4215, lng: -75.6992 },
    "Miami, USA": { lat: 25.7617, lng: -80.1918 },
    "Rio de Janeiro, Brazil": { lat: -22.9068, lng: -43.1729 },
    "Buenos Aires, Argentina": { lat: -34.6037, lng: -58.3816 },
    "Machu Picchu, Peru": { lat: -13.1631, lng: -72.5450 },
    "Cartagena, Colombia": { lat: 10.3910, lng: -75.4794 },
    "Santiago, Chile": { lat: -33.4489, lng: -70.6693 },
    "Fiji (Coral Coast), Fiji": { lat: -17.7134, lng: 178.0650 },
    "Sydney, Australia": { lat: -33.8688, lng: 151.2093 },
    "Bora Bora, French Polynesia": { lat: -16.5004, lng: -151.7415 },
    "Queenstown, New Zealand": { lat: -45.0312, lng: 168.6626 },
    "Auckland, New Zealand": { lat: -36.8485, lng: 174.7633 },
    "Uluru, Australia": { lat: -25.3444, lng: 131.0369 }
};


function normalizeTitle(title) {
    return title.replace(/[^a-zA-Z0-9, ]/g, '').toLowerCase();
}

(async function loadDestinations() {
    try {
        const posts = await fetchPosts();
        
        posts.forEach(post => {
            const normalizedTitle = normalizeTitle(post.title);

           
            let matchedLocationKey = Object.keys(locationMapping).find(key =>
                normalizeTitle(key) === normalizedTitle
            );

            if (matchedLocationKey) {
                const location = locationMapping[matchedLocationKey];
                const marker = L.marker([location.lat, location.lng], {
                    zIndexOffset: 1000  
                }).addTo(map);
                
               
                marker.bindPopup(`
                    <h3>${post.title}</h3>
                    <p>${post.shortDescription}</p>
                   <a href="/HTML/one-post.html?id=${post.id}" target="_blank">Read More</a>
                `);
            }
        });
    } catch (error) {
        console.error('Error loading destinations:', error);
    }
})();