import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = (request: Request) => {
  return NextResponse.json({ message: "Hello!", success: true });
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    // pull the fields out of the request body
    const { email, username, password } = body;

    // CHECK #1: check if the email already exists (is being used)
    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (existingUserByEmail) {
      // if email is already in use,
      // we cannot create another user with that email
      return NextResponse.json(
        {
          user: null,
          message: "A user with this email already exists"
        },
        {
          status: 409
        }
      );
    }

    // CHECK #2: check if the username already exists (is being used)
    const existingUserByUsername = await prisma.user.findUnique({
      where: {
        username: username
      }
    });

    if (existingUserByUsername) {
      // if email is already in use,
      // we cannot create another user with that email
      return NextResponse.json(
        {
          user: null,
          message: "A user with this username already exists"
        },
        {
          status: 409
        }
      );
    }

    // store new user data if we pass first 2 checks
    const newUser = await prisma.user.create({
      // use the data property to store data with prisma
      data: {
        email,
        username,
        password
      }
    });

    return NextResponse.json(body);
  } catch (error) {}
};
