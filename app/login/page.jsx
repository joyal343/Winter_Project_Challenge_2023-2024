"use client"

import { useActionState } from "react";
import { handleLogin } from "@/app/login/actions";

export default function Page() {
  const [state, loginAction] = useActionState(handleLogin, undefined);


  // not sure but will fetch on change in state 
  return (
    <section>
      <form action={loginAction} >
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
        <button type="submit">Login</button>
      </form>
    </section>
  );
}




