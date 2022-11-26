import {PrismaClient} from '@prisma/client/edge';

declare const global: Global & { prisma?: PrismaClient };

export let prisma: PrismaClient;
if (typeof window === 'undefined') {
    if (process.env['NODE_ENV'] === 'production') {
        prisma = new PrismaClient({
            datasources: {
                db: {
                    url: "prisma://aws-us-east-1.prisma-data.com/?api_key=SDjow6WYiLL1qfy8wBXpSYuXcDGQDwcH8-JrbBq71Ez4lWXtq4zpUFwFluGff3PH"
                }
            }
        });
    } else {
        if (!global.prisma) {
            global.prisma = new PrismaClient({
                datasources: {
                    db: {
                        url: "prisma://aws-us-east-1.prisma-data.com/?api_key=SDjow6WYiLL1qfy8wBXpSYuXcDGQDwcH8-JrbBq71Ez4lWXtq4zpUFwFluGff3PH"
                    }
                }
            });
        }
        prisma = global.prisma;
    }
}