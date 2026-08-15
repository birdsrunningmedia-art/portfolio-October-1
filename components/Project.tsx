"use client";
import React from "react";
import { projects } from "@/data/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { easeIn } from "framer-motion";

const Project = () => {
  const router = useRouter();

  const sectionVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.4, // wait before starting children
        staggerChildren: 0.3, // animate children one after another
      },
    },
  };
  const childrenVariants = {
    hidden: { y: 30, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: easeIn,
      },
    },
  };
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ margin: "-200px 0px -200px 0px", once: true }}
      className="p-4 flex flex-col gap-6 mb-10"
    >
      <h2 className="md:text-2xl text-xl underline font-bold">Pet Projects</h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.map((project) => {
          return (
            <motion.div
              variants={childrenVariants}
              key={project.name}
              className="p-4 border-[1px] cursor-pointer border-brand-dark/20 rounded-2xl w-full flex flex-col gap-2"
            >
              <div className="relative cursor-pointer w-full h-60 overflow-hidden rounded-2xl hover:shadow-xl">
                <Image
                  src={project.image[0]}
                  alt={project.name}
                  fill
                  className="rounded-2xl object-cover transition-transform duration-500 ease-out hover:scale-110 hover:shadow-lg hover:shadow-gray-400"
                />
              </div>
              <h3 className="text-xl font-semibold">{`${(project?.name).charAt(0).toUpperCase() + (project?.name).slice(1)}`}</h3>
              <p className="text-brand-dark/85">{project.description}</p>

              <button
                className="group w-fit flex items-center gap-2 bg-brand-dark text-white px-4 py-2 rounded-2xl transition-all duration-300"
                onClick={() => router.push(`/projects/${project.id}`)}
              >
                View Project
                <span className="group-hover:pl-4 transition-all duration-300">
                  {">"}
                </span>
              </button>
            </motion.div>
          );
        })}
      </div>

      <button
        className="group m-auto w-fit flex items-center gap-2 bg-brand-dark text-white px-4 py-2 rounded-2xl"
        onClick={() => router.push("/projects")}
      >
        View More
        <span className="group-hover:pl-4 transition-all duration-300">
          {">"}
        </span>
      </button>
    </motion.section>
  );
};

export default Project;
