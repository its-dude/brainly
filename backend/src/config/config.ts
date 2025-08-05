import dotenv from "dotenv";

dotenv.config();

const config = {
    jwt: {
         secret: process.env.JWT_SECRET,
         expiresIn: process.env.EXPIRES_IN
    },
    db: {
        uri: process.env.MONGO_URI,
    },
    port: process.env.PORT,
}

export default config;