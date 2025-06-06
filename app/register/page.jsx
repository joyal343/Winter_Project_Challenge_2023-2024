"use client"

import { useActionState, useEffect,useContext } from "react";
import { handleRegister } from "./actions";
import { MyContext } from "@/context";  

export default function Page() {
  const { isLoggedIn, setIsLoggedIn } = useContext(MyContext); 
  
  const handleLoginRedirect= async (prevState, formData) => {
    const result = await handleRegister(prevState, formData);
    if (result.success) {
      setIsLoggedIn(true);
      window.location.href = "/admin/posts";
    }
    return result;
  }

  const [state, loginAction] = useActionState(handleLoginRedirect, undefined);

  // not sure but will fetch on change in state 
  return (
    <div className="text-2xl sm:text-lg w-full min-h-[70%] flex items-center justify-center my-5"> 
      <form action={loginAction} className="shadow-lg p-10 flex flex-col gap-5 bg-white rounded-md opacity-95">
        <input type="email" name="email" placeholder="Email" />
        {state && state.errors && state.errors.email && 
          <p className="text-red-500">{state.errors.email}</p>
        }
        <input type="text" name="name" placeholder="Name" />
        {state && state.errors && state.errors.name && 
          <p className="text-red-500">{state.errors.name}</p>
        }

        <input type="password" name="password" placeholder="Password" />
        {state && state.errors && state.errors.password && 
          <p className="text-red-500">{state.errors.password}</p>
        }
        <button type="submit" className="text-left w-[100]">Register</button>
      </form>
    </div>
  );
}




