import React, { useEffect, useRef } from "react";
import { cn } from "../lib/utlis.js";
import createGlobe from "cobe";
import { motion } from "motion/react";
import { IconBuildingSkyscraper } from "@tabler/icons-react";

export  function FeaturesSectionDemo() {
  const features = [
    {
      title: "Expert Project Management",
      description:
        "From planning to execution, our project managers ensure every detail aligns with quality standards and client expectations.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-4 -b lg:-r dark:-neutral-800",
    },
    {
      title: "Modern Construction Equipment",
      description:
        "We use advanced machinery and modern tools to guarantee efficient, safe, and on-time project delivery.",
      skeleton: <SkeletonTwo />,
      className: "-b col-span-1 lg:col-span-2 dark:-neutral-800",
    },
    {
      title: "Our Ongoing Projects",
      description:
        "Explore our construction works in progress and see how we’re building the future, one project at a time.",
      skeleton: <SkeletonThree />,
      className: "col-span-1 lg:col-span-3 lg:-r dark:-neutral-800",
    },
    {
      title: "Building Beyond Boundaries",
      description:
        "From residential homes to commercial spaces, we deliver durable, aesthetic, and sustainable construction solutions across regions.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 -b lg:-none",
    },
  ];

  return (
    <div className="relative z-20  mt-10 py-10 lg:py-32 max-w-7xl mx-auto">
      <div className="px-8">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-semibold text-black dark:text-white">
          <span className="text-yellow-600">Building</span> Trust, Quality &
          Innovation
        </h4>

        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-600 dark:text-neutral-300 text-center">
          We’re more than builders — we’re creators of lasting value. From
          modern architecture to smart infrastructure, every project we take on
          reflects our commitment to precision, safety, and excellence.
        </p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl: rounded-md -neutral-200 dark:-neutral-800 overflow-hidden">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({ children, className }) => (
  <div
    className={cn(
      `p-6 sm:p-10 relative overflow-hidden bg-white dark:bg-neutral-900 transition-all duration-300 hover:bg-yellow-50 dark:hover:bg-neutral-800`,
      className
    )}
  >
    {children}
  </div>
);

const FeatureTitle = ({ children }) => (
  <p className="text-left font-semibold tracking-tight text-black dark:text-white text-xl md:text-2xl">
    {children}
  </p>
);

const FeatureDescription = ({ children }) => (
  <p className="text-sm md:text-base text-left max-w-sm mt-2 text-neutral-600 dark:text-neutral-300">
    {children}
  </p>
);

// ✅ Construction Site Images
export const SkeletonOne = () => (
  <div className="relative flex py-8 px-2 gap-10 h-full">
    <div className="w-full p-4 bg-white dark:bg-neutral-900 shadow-xl rounded-md overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1581090700227-1e37b190418e?q=80&w=1200"
        alt="Construction site"
        className="h-full w-full object-cover rounded-md"
      />
    </div>
    <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white dark:from-black to-transparent" />
  </div>
);

export const SkeletonTwo = () => {
  const images = [
    // 1 — reliable search-based image (excavator / heavy machinery)
    "https://wp-offload-media-cdn.s3.amazonaws.com/ptsworks-com/wp-content/uploads/2020/02/heavy-construction-equipment-types.jpg",

    // 2 — crane / high-rise construction (static ID kept)
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200",

    // 3 — reliable search-based image (workers / safety gear)
    "https://wp-offload-media-cdn.s3.amazonaws.com/ptsworks-com/wp-content/uploads/2025/02/parent-industry-911x1024.webp",

    // 4 — modern construction equipment (static ID kept)
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200",
  ];

  const variants = {
    whileHover: { scale: 1.1, zIndex: 100 },
  };
  return (
    <div className="relative flex flex-col items-start p-6 gap-8 h-full overflow-hidden">
      <div className="flex flex-row -ml-20">
        {images.map((img, i) => (
          <motion.div
            key={i}
            variants={variants}
            whileHover="whileHover"
            className="rounded-xl -mr-4 mt-4 p-1 bg-yellow-50  overflow-hidden"
          >
            <img
              src={img}
              alt="equipment"
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const SkeletonThree = () => (
  <a href="/projects" className="relative flex gap-10 h-full group/image">
    <div className="w-full mx-auto bg-transparent group h-full">
      <div className="flex flex-1 w-full h-full flex-col space-y-2 relative">
        <IconBuildingSkyscraper className="h-20 w-20 absolute z-10 inset-0 text-yellow-600 m-auto drop-shadow-md" />
        <img
          src="https://images.unsplash.com/photo-1590490359854-dfba19688d70?q=80&w=1200"
          alt="Project image"
          className="h-full w-full object-cover rounded-md group-hover/image:blur-sm transition-all duration-300"
        />
      </div>
    </div>
  </a>
);

export const SkeletonFour = () => (
  <div className="h-60 md:h-60 flex flex-col items-center relative bg-transparent mt-10">
    <Globe className="absolute -right-10 md:-right-10 -bottom-80 md:-bottom-72" />
  </div>
);

// 🌍 Rotating Globe with yellow glow accent
export const Globe = ({ className }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    let phi = 0;
    if (!canvasRef.current) return;
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.45, 0.35, 0.1],
      markerColor: [1, 0.8, 0.2], // yellow marker glow
      glowColor: [1, 0.85, 0.3],
      markers: [
        { location: [28.6139, 77.209], size: 0.07 }, // Delhi
        { location: [19.076, 72.8777], size: 0.05 }, // Mumbai
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01;
      },
    });
    return () => globe.destroy();
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};
