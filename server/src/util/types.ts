import { PrismaClient } from "@prisma/client";
import { ISODateString } from "next-auth";

export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
  // pubsub
}

/**
 * Users
 */
export interface CreateUsernameRequest {
  success?: boolean;
  error?: string;
}

export interface Session {
  user: User;
  expires: ISODateString;
}
export interface User {
  id: string;
  username: string;
  image: string;
<<<<<<< HEAD
=======
  email: string;
  emailVerified: boolean;
  name: string;
>>>>>>> b42569cf8653b1a675da9b7b8a9b7ef1d911de1c
}
