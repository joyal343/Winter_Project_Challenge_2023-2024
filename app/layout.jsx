"use client"
import "@styles/globals.css"
import Nav from "@components/Nav"
import { MyProvider } from "@/context";
import { useEffect, useState } from "react";
import { Open_Sans } from "next/font/google"
import Loader from "@components/Loader";

const openSans = Open_Sans({
  weight: '400',
  style: 'normal',
  subsets: ['latin']
})


export default function RootLayout({ children }) {

  useEffect(() => {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (window.innerWidth <= 768) {
      drawBubblesMobile()
    } else {
      drawBubblesDesktop()
    }
  }

  function drawBubbles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 6; i++) {
      const x = Math.random() * canvas.width * 0.9 + canvas.width * 0.05;
      const y = Math.random() * canvas.height * 0.9 + canvas.height * 0.05;
      const r = Math.random() * 100 + 60; // Bigger bubbles

      // console.log("Circle", i, "X:", x, "Y:", y, "R:", r);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(56, 189, 248, ${Math.random() * 0.3 + 0.4})`; // Sky-blue with 0.4–0.7 opacity
      ctx.fill();
    }
  }

  function drawBubblesDesktop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const circles = [
      { x: 502.03796441723034, y: 547.8283407913482, r: 159.89107233109527 },
      { x: 739.1313193382807, y: 92.69142812645143, r: 136.59793456333446 },
      { x: 821.8079659568584, y: 521.2736645234667, r: 99.3635065128921 },
      { x: 175.92417198803474, y: 64.41472717996062, r: 108.81208453656613 },
      { x: 62.01968880567739, y: 176.1908962650911, r: 97.84564906604885 },
      { x: 1055.1691482834922, y: 563.6061203720831, r: 92.23181169400402 }
    ];
    for (let i = 0; i < 6; i++) {
      const x = circles[i].x
      const y = circles[i].y
      const r = circles[i].r

      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(56, 189, 248, ${Math.random() * 0.3 + 0.4})`; // Sky-blue with 0.4–0.7 opacity
      ctx.fill();
    }
  }
  function drawBubblesMobile() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("Called drawBubblesMobile")
    const circles = [
      { x: 276.12838002111545, y: 499.0187062967803, r: 110.73061805877897 },
      { x: 155.58033237781967, y: 766.8496934924018, r: 133.4102510235227 },
      { x: 359.8294632062547, y: 755.6809258105311, r: 79.68151478345278 },
      { x: 389.5163392616115, y: 147.48931200518362, r: 128.39287599648247 },
      { x: 286.7203075350194, y: 67.85863271578513, r: 102.33250433435876 },
      { x: 264.0463247583134, y: 875.0084287775348, r: 120.12123570753438 }
    ];

    for (let i = 0; i < 6; i++) {
      const x = circles[i].x
      const y = circles[i].y
      const r = circles[i].r

      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(56, 189, 248, ${Math.random() * 0.3 + 0.4})`; // Sky-blue with 0.4–0.7 opacity
      ctx.fill();
    }
  }

  // Init
  window.addEventListener('resize', resizeCanvas);
  
  resizeCanvas();
  return () => {
    window.removeEventListener('resize', resizeCanvas);
  }
  },[])

  return (
    <html lang="en" className={openSans.className}>
      <body>
        <MyProvider>
          <Nav />
        <canvas id="bgCanvas"  className="h-[100%] w-[100%] fixed top-0 left-0 z-[-20]">
        </canvas>
          {children}
        </MyProvider>
      </body>
    </html>
  )
}
