"use client";
import { UserCircleIcon } from "lucide-react";
import { Button } from "../ui/button";

const AuthButton = () => {
  //TODO:Auth State
  return (
    <Button
      variant={"outline"}
      className="px-4 py-2 text-sm font-medium hover:text-blue-500 text-blue-600 border-blue-500/20 rounded-full shadow-none "
    >
      <UserCircleIcon />
      Sign In
    </Button>
  );
};
export default AuthButton;
