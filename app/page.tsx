'use client'

import React from 'react'
import { useRef, useMemo } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Project from '@/components/Project'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'


const Page = () => {
  const contactRef = useRef<HTMLDivElement | null>(null);

  const sectionRefs = useMemo(() => ({
    contact: contactRef,
  }), []);

  const scrollToSection = (section: keyof typeof sectionRefs) => {
    const ref = sectionRefs[section];
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Navbar />
      <main className='pt-28 flex flex-col gap-10'>
        <Hero scrollToSection={scrollToSection} />
        <About />
        <Skills />
        <Project />
        <Contact contactRef={contactRef} />
      </main>
      <Footer />
    </>
  )
}

export default Page