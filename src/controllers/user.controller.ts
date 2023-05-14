import { Request, Response, NextFunction } from "express";
import { getAllUser, createUser, getUserById } from "../services/user.services";
import { Prisma } from "@prisma/client";

export async function infoAllUser(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await getAllUser();
    res.status(200).json({ data: users });
    return;
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error });
    return;
  }
}

export async function infoUserByiD(req: Request, res: Response, next: NextFunction) {
  const userId = parseInt(req.params.id);
  try {
    const user = await getUserById({
      where: {
        id: userId,
      },
    });
    res.status(200).json({ data: user });
    return;
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e });
    return;
  }
}

export async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const createdUser = await createUser(req.body);
    res.status(200).json({ data: createdUser });
    return;
  } catch (e) {
    console.log("err");
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        res.status(400).json({ status: "Error", msg: "email is exist" });
        return;
      }
    }
  }
}
