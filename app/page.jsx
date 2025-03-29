"use client"

import React, { useState, useRef, useEffect } from "react";
import Example from "@components/Modal";
import DropdownMenu_Tailwind from "@components/DropDown_Tailwind";
const page = () => {

  return <div className="h-full w-full">
    <Example></Example>
    <div className="snap-x flex w-full overflow-x-auto ">
      <div className="snap-center ">
        <DropdownMenu_Tailwind options={["op1", "op2", "op3"]} title={"btn-1"} />
      </div>
      <div className="snap-center">
        <DropdownMenu_Tailwind options={["op1", "op2", "op3"]} title={"btn-2"} />
      </div>
      <div className="snap-center">
        <DropdownMenu_Tailwind options={["op1", "op2", "op3"]} title={"btn-3"} />
      </div>
      <div className="snap-center">
        <DropdownMenu_Tailwind options={["op1", "op2", "op3"]} title={"btn-4"} />
      </div>
      <div className="snap-center">
        <DropdownMenu_Tailwind options={["op1", "op2", "op3"]} title={"btn-5"} />
      </div>
      <div className="snap-center">
        <DropdownMenu_Tailwind options={["op1", "op2", "op3"]} title={"btn-6"} />
      </div>
    </div>
  </div>
}

export default page