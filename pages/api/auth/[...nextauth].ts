import bcrypt from 'bcrypt'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import prisma from '@/libs/prismadb'

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'email', type: 'text' },
            },
            async authorize(credentials) {
                if (!credentials?.email || credentials?.password) {
                    throw new Error('invalid Credentials')
                }

                const user = await prisma.user.findUnique({
                    where:{
                         email: credentials.email
                    }
                })
                if(!user || !user?.hashedPassword){
                    throw new Error('Invalid Credentials');
                }
                const isCorrectPassword = await bcrypt.compare(credentials.password , user.hashedPassword)

                if(!isCorrectPassword ){
                    throw new Error('Invalid Credentials');
                }
                return user;
            }
        })
    ], 
    /* turn on debug on dev mode */
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy:'jwt'
    },
    jwt:{
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXT_AUTH_SECRET
})