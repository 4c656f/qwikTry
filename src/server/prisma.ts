import {PrismaClient} from '@prisma/client/edge';

declare const global: Global & { prisma?: PrismaClient };

export let prisma: PrismaClient;
if (typeof window === 'undefined') {
    if (process.env['NODE_ENV'] === 'production') {
        prisma = new PrismaClient({
            datasources: {
                db: {
                    url: process.env['VITE_DATABASE_URL']
                }
            }
        });
    } else {
        if (!global.prisma) {
            global.prisma = new PrismaClient({
                datasources: {
                    db: {
                        url: process.env['VITE_DATABASE_URL']
                    }
                }
            });
        }
        prisma = global.prisma;
    }
}