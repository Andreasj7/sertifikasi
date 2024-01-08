// istanbul ignore file
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: '.env.test' });
} else {
    dotenv.config();
}

let db: PrismaClient;

if (process.env.NODE_ENV === 'test') {
    db = new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL,
            },
        },
    });
} else {
    db = new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL,
            },
        },
    });
}
export default db;
