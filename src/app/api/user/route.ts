import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

import prisma from "@/lib/prisma";

// define a schema for input validation
const UserSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required").min(8, "Password must have than 8 characters")
});

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    // pull the fields out of the request body
    const { email, username, password } = UserSchema.parse(body);

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

    const hashedPassword = await hash(password, 10);

    // store new user data if we passed the first 2 checks
    const newUser = await prisma.user.create({
      // use the data property to store data with prisma
      data: {
        email,
        username,
        password: hashedPassword
      }
    });

    const { password: newPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        user: rest, // send back everything in the object EXCEPT the password
        message: "User created successfully!"
      },
      {
        status: 201
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong!"
      },
      {
        status: 500
      }
    );
  }
};
