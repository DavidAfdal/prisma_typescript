import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type User = {
  id: number;
  email: string;
  username?: string;
  password?: string;
};

export function getAllUser(): Promise<Omit<User, "id" | "password">[] | undefined> {
  return prisma.user.findMany({
    select: {
      email: true,
      name: true,
      username: true,
    },
  });
}

export function createUser(body: Omit<User, "id">, options?: any): Promise<User> {
  return prisma.user.create({
    data: body,
    ...options,
  });
}

export function getUserById(options: any): Promise<User> {
  return prisma.user.findUnique({ ...options });
}

export function getUserByEmail(email: string): Promise<User> {
  return prisma.user.findUnique({
    where: { email: email },
  });
}

export function createUserGoogle(body: Omit<User, "id" | "password">) {
  return prisma.user.create({ data: body });
}
