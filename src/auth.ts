import NextAuth from "next-auth"
import EntraIDProvider from "next-auth/providers/microsoft-entra-id"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        EntraIDProvider({
            clientId: process.env.ENTRA_ID_CLIENT_ID,
            clientSecret: process.env.ENTRA_ID_CLIENT_SECRET,
            tenantId: process.env.ENTRA_ID_TENANT_ID,
      }),
    ]
})