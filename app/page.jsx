"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useRef } from "react";

export default function Index() {
  let steps = 0;
  let currentIndex = 0;
  let nbOfImages = 0;
  let maxNumberOfImages = 8;
  let refs = [];

  const manageMouseMove = (e) => {
    const { clientX, clientY, movementX, movementY } = e;

    steps += Math.abs(movementX) + Math.abs(movementY);

    if (steps >= currentIndex * 150) {
      moveImage(clientX, clientY);

      if (nbOfImages == maxNumberOfImages) {
        removeImage();
      }
    }

    if (currentIndex == refs.length) {
      currentIndex = 0;
      steps = -150;
    }
  };

  const moveImage = (x, y) => {
    const currentImage = refs[currentIndex].current;
    currentImage.style.left = x + "px";
    currentImage.style.top = y + "px";
    currentImage.style.display = "block";
    currentIndex++;
    nbOfImages++;
    setZIndex();
  };

  const setZIndex = () => {
    const images = getCurrentImages();
    for (let i = 0; i < images.length; i++) {
      images[i].style.zIndex = i;
    }
  };

  const removeImage = () => {
    const images = getCurrentImages();
    images[0].style.display = "none";
    nbOfImages--;
  };

  const getCurrentImages = () => {
    let images = [];
    let indexOfFirst = currentIndex - nbOfImages;
    for (let i = indexOfFirst; i < currentIndex; i++) {
      let targetIndex = i;
      if (targetIndex < 0) targetIndex += refs.length;
      images.push(refs[targetIndex].current);
    }
    return images;
  };

  return (
    <div
      onMouseMove={(e) => {
        manageMouseMove(e);
      }}
      className={styles.main}>
      {[...Array(16).keys()].map((_, index) => {
        const ref = useRef(null);

        refs.push(ref);
        return (
          <Image
            key={index}
            ref={ref}
            src={`/images/${index}.jpg`}
            width={1000}
            height={1000}
            alt="designHall-Lakshay"
            priority={true}
          />
        );
      })}

      <h1 className="text-4xl mt-10 md:ml-10 z-[100000] font-medium select-none underline underline-offset-4 md:text-left text-center left-0 right-0 absolute">
        designHall<span className="text-[#53ffa3]">.</span>
      </h1>
      <p className="text-sm font-light select-none absolute bottom-0 right-0 left-0 text-center z-[100000] md:mb-10 mb-20">
        inspired by{" "}
        <a
          href="https://bridget.pictures/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#53ffa3]">
          bridget.pictures
        </a>
      </p>
      <p className="md:text-sm font-light absolute bottom-0 right-0 md:left-auto left-0 md:mr-10 text-center z-[100000] mb-10">
        ~{" "}
        <a
          href="https://lakshb.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#53ffa3]">
          lakshaybhushan
        </a>
      </p>
      <p className="text-sm font-light select-none absolute bottom-0 left-0 ml-10 text-center z-[100000] mb-10 md:block hidden">
        ~ {maxNumberOfImages + 8} images
      </p>

      <p className="md:hidden text-center mt-[30vh] mx-10">Sorry but this site requires mouse interaction so it can't be available on <span className="text-[#53ffa3] underline underline-offset-4">mobile devices</span></p>

    </div>
  );
}
