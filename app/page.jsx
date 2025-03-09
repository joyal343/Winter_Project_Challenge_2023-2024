"use client"

import "@styles/mobileHorizontal.css"
import React, { useState, useRef, useEffect } from "react";
import styled from 'styled-components';
import { ChevronDown } from "lucide-react";
import Example from "@components/Modal";
 
const page = () => {
  
  return <div className="h-full w-full">
    <Example></Example>
  </div>
}

export default page