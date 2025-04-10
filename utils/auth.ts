import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../db/PrismaClient";
 
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
        
    }),
    socialProviders: {
        google: {
            clientId: '17678299438-jpbnql0tq9fknkg94mq71j9lsaj2ih0g.apps.googleusercontent.com',
            clientSecret: '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'
        }
    }
})