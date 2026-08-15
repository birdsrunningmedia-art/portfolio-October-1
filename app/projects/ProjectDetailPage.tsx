"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProjectDetailPage = ({ id }: { id: string }) => {
  const router = useRouter();

  // Find index directly from the URL prop
  const projectIndex = projects.findIndex((p) => p.id === id);
  const [activeIdx, setActiveIdx] = useState(projectIndex !== -1 ? projectIndex : 0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Sync state whenever URL prop 'id' changes
  useEffect(() => {
    const newIndex = projects.findIndex((p) => p.id === id);
    if (newIndex !== -1) {
      setActiveIdx(newIndex);
    }
  }, [id]);

  const project = projects[activeIdx];
  const closeModal = () => setSelectedImage(null);

  // Fallback for invalid project IDs
  if (!project || projectIndex === -1) {
    return (
      <>
        <Navbar />
        <main className="min-h-[70vh] py-28 flex flex-col items-center justify-center gap-4 text-center px-4">
          <h1 className="text-3xl font-bold">Project Not Found</h1>
          <p className="text-gray-600">The project you are looking for does not exist.</p>
          <Link
            href="/"
            className="mt-4 bg-black text-white px-6 py-2 rounded-2xl hover:bg-black/80 transition-all"
          >
            Back to Home
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  // Circular indices for Next / Previous buttons
  const prevIdx = (activeIdx - 1 + projects.length) % projects.length;
  const nextIdx = (activeIdx + 1) % projects.length;
  const prevProject = projects[prevIdx];
  const nextProject = projects[nextIdx];

  const handleNext = () => {
    router.push(`/projects/${nextProject.id}`);
  };

  const handlePrev = () => {
    router.push(`/projects/${prevProject.id}`);
  };

  return (
    <>
      <Navbar />
      <main className="py-28 flex flex-col gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="p-4 flex flex-col gap-6 md:px-14 lg:px-20"
          >
            <h1 className="underline font-bold text-2xl md:text-4xl">
              {project.name.charAt(0).toUpperCase() + project.name.slice(1)}
            </h1>

            <p>{project.description}</p>

            <div className="flex flex-col gap-6">
              <h2 className="text-xl md:text-2xl font-bold underline">
                Description
              </h2>

              <p>{project.longDescription}</p>

              <hr />

              <h2 className="text-xl md:text-2xl font-bold underline">
                Technologies
              </h2>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((technology, index) => (
                  <div
                    key={index}
                    className="bg-brand-dark px-4 py-2 inline-block text-brand-light rounded-2xl"
                  >
                    {technology}
                  </div>
                ))}
              </div>

              <hr />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Live Project Link */}
        {project.liveLink && project.liveLink !== "#" && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group m-auto w-fit flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl hover:bg-black/90 transition-all duration-300"
          >
            Visit Project
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              &gt;
            </span>
          </a>
        )}

        {/* Next / Previous Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center mt-6">
          <button
            onClick={handlePrev}
            className="group w-fit flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-2xl hover:bg-black/90 transition-all duration-300"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">
              &lt;
            </span>
            Previous: {prevProject.name}
          </button>

          <button
            onClick={handleNext}
            className="group w-fit flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-2xl hover:bg-black/90 transition-all duration-300"
          >
            Next: {nextProject.name}
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              &gt;
            </span>
          </button>
        </div>

        {/* Screenshots Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id + "-images"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="p-4 md:px-14 lg:px-20 flex flex-col gap-8 lg:gap-10 mt-12"
          >
            <h2 className="text-xl md:text-2xl font-bold underline">
              Screenshots from {project.name.charAt(0).toUpperCase() + project.name.slice(1)}
            </h2>

            <div className="flex flex-col gap-6">
              {project.image.map((image, index) => (
                <div
                  key={index}
                  className="group cursor-pointer p-4 md:p-8 border-y-brand-dark/30 border-[1px] rounded-2xl w-full flex flex-col gap-2 transition-all duration-300 hover:border-black/50"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative w-full h-64 lg:h-[28rem] overflow-hidden rounded-2xl">
                    <Image
                      src={image}
                      alt={`${project.name} screenshot ${index + 1}`}
                      fill
                      className="rounded-2xl object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full"
          >
            <button
              onClick={closeModal}
              aria-label="Close image modal"
              className="absolute -top-10 right-0 z-50 bg-white/30 hover:bg-white/60 text-white text-2xl rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              &times;
            </button>

            <div className="relative w-full aspect-video max-h-[85vh] rounded-lg overflow-hidden bg-black/40">
              <Image
                src={selectedImage}
                alt="Selected screenshot detail"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ProjectDetailPage;