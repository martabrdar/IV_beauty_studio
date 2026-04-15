const products = [
    {
        _id: '1',
        name: 'Pedikir - Klasični',
        image: 'https://www.abeauty.rs/wp-content/uploads/2023/12/abeauty-pedikirr-heder2blur-1168x463.jpg',
        description:
            'Klasični tretman pedikira koji uključuje kupku za stopala, uklanjanje kutikule, oblikovanje noktiju i lakiranje po izboru.',
        category: 'Pedikir',
        price: 2500.00,
        countInStock: 10, // broj slobodnih termina
        rating: 5.0,
        numReviews: 12,
    },
    {
        _id: '2',
        name: 'Pedikir - Spa',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFUBFFYcgoiyuG2ebrAEu2rOSJA7J9J0-dLg&s',
        description:
            'Luksuzni spa pedikir tretman sa peelingom, maskom za stopala, masažom i lakiranjem gel lakom po izboru.',
        category: 'Pedikir',
        price: 3500.00,
        countInStock: 8,
        rating: 5.0,
        numReviews: 20,
    },
    {
        _id: '3',
        name: 'Manikir - Klasični',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9LdgTYr6_UhE_ElMtAELPIgsQTnr-N6kl5w&s',
        description:
            'Klasični tretman manikira koji uključuje uklanjanje kutikule, oblikovanje noktiju i lakiranje po izboru.',
        category: 'Manikir',
        price: 1800.00,
        countInStock: 10,
        rating: 4.8,
        numReviews: 15,
    },
    {
        _id: '4',
        name: 'Manikir - Gel lak',
        image: 'https://lepotica.rs/wp-content/uploads/2022/11/gel-manikir2.png',
        description:
            'Manikir sa gel lakom koji traje do 3 nedelje. Uključuje pripremu nokta, nanošenje baze, boje i top coat-a.',
        category: 'Manikir',
        price: 2800.00,
        countInStock: 10,
        rating: 5.0,
        numReviews: 30,
    },
    {
        _id: '5',
        name: 'Spray Tan - Celo telo',
        image: 'https://bikini.co.rs/login/media/images/blog/0-95984500-1759137060.png',
        description:
            'Profesionalni spray tan tretman za celo telo. Prirodan i ravnomeran ten koji traje 7-10 dana.',
        category: 'Spray Tan',
        price: 3000.00,
        countInStock: 5,
        rating: 4.9,
        numReviews: 18,
    },
    {
        _id: '6',
        name: 'Spray Tan - Lice i dekolte',
        image: 'https://salon.co.rs/wp-content/uploads/2024/12/spray-tan-sprayten-spraytan-samopotamnjivanje-576x1024.webp',
        description:
            'Spray tan tretman samo za lice i dekolte. Idealno za brz i prirodan sjaj pre posebnih događaja.',
        category: 'Spray Tan',
        price: 1500.00,
        countInStock: 5,
        rating: 4.7,
        numReviews: 10,
    },
]

export default products