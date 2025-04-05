"use client";
import { ClapperboardIcon, UserCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
const AuthButton = () => {
  //TODO:Auth State
  return (
    <>
      <SignedIn>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link
              label="Studio"
              href="/studio"
              labelIcon={<ClapperboardIcon className="size-4" />}
            />
          </UserButton.MenuItems>
        </UserButton>
        {/**Menu Items for studio and user profile */}
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            variant={"outline"}
            className="px-4 py-2 text-sm font-medium hover:text-blue-500 text-blue-600 border-blue-500/20 rounded-full shadow-none "
          >
            <UserCircleIcon />
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};
export default AuthButton;
