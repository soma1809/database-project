module.exports = {
    database: {
        connectionLimit: 10,
        host: process.env.DATABASE_HOST || 'localhost',
        user: process.env.DATABASE_USER || 'root',
        password: process.env.DATABASE_PASSWORD || 'Somaanil@64',
        database: process.env.DATABASE_NAME || 'video_rentals'
    },
    port: process.env.PORT || 4000
};
