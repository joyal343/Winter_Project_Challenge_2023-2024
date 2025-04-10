"use client"

import { useActionState } from "react";
import { handleRegister } from "./actions";

export default function Page() {
  const [state, loginAction] = useActionState(handleRegister, undefined);


  // not sure but will fetch on change in state 
  return (
    <div className="text-2xl sm:text-lg w-full min-h-[70%] flex items-center justify-center"> 
      <form action={loginAction} className="shadow-lg p-10 flex flex-col gap-5 bg-white rounded-md opacity-95">
        <input type="email" name="email" placeholder="Email" />
        {state && state.errors && state.errors.email && (
          <p className="text-red-500">{state.errors.email}</p>
        )}
        <input type="password" name="password" placeholder="Password" />
        {state && state.errors && state.errors.password && (
          <p className="text-red-500">{state.errors.password}</p>
        )}
        <button type="submit" className="text-left w-[100]">Register</button>
      </form>
    </div>
  );
}




