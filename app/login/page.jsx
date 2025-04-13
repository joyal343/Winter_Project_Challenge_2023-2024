"use client"

import { useActionState, useContext } from "react";
import { handleLogin } from "@/app/login/actions";
import { MyContext } from "@/context"; 

export default function Page() {
  const { isLoggedIn, setIsLoggedIn } = useContext(MyContext);
  
  const handleLoginRedirect= async (prevState, formData) => {
    const result = await handleLogin(prevState, formData);
    if (result.success) {
      setIsLoggedIn(true);
      window.location.href = "/admin/posts";
    }
    return result;
  }
  const [state, loginAction] = useActionState(handleLoginRedirect, undefined);
  
  return (
    <div className="text-left m-5 text-2xl sm:text-lg w-full min-h-[70%] flex items-center justify-center "> 
      <form action={loginAction} className="shadow-lg p-10 flex flex-col gap-5 bg-white rounded-md opacity-95">
        <input type="email" name="email" placeholder="Email" />
        {state && state.errors && state.errors.email && (
          <p className="text-red-500">{state.errors.email}</p>
        )}
        <input type="password" name="password" placeholder="Password" />
        {state && state.errors && state.errors.password && (
          <p className="text-red-500">{state.errors.password}</p>
        )}
        <button type="submit" className="text-left w-[100]">Login</button>
      </form>
    </div>
  );
}




