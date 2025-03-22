"use client"

import { useActionState } from "react";
import { handleRegister } from "./actions";

export default function Page() {
  const [state, loginAction] = useActionState(handleRegister, undefined);


  // not sure but will fetch on change in state 
  return (
    <div className="text-2xl sm:text-lg w-full min-h-[70%] flex items-center justify-center"> 
      <form action={loginAction} className="shadow-lg p-10">
        {/* <div className="text-3xl sm:text-lg text-center">Register</div> */}
        <input type="email" name="email" placeholder="Email" />
        <br />
        {state && state.errors && state.errors.email && (
          <p className="text-red-500">{state.errors.email}</p>
        )}
        <input type="password" name="password" placeholder="Password" />
        <br />
        {state && state.errors && state.errors.password && (
          <p className="text-red-500">{state.errors.password}</p>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}




