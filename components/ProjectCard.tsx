/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
    project: Project;
    onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation (max 10 degrees)
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        setTiltStyle({ rotateX, rotateY });
    };

    const handleMouseLeave = () => {
        setTiltStyle({ rotateX: 0, rotateY: 0 });
    };

    return (
        <motion.div
            ref={cardRef}
            className="group relative h-[400px] md:h-[500px] w-full overflow-hidden border-b md:border-r border-white/10 bg-black cursor-pointer"
            style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
            }}
            initial="rest"
            whileHover="hover"
            whileTap="hover"
            animate="rest"
            data-hover="true"
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* 3D Tilt Container */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    rotateX: tiltStyle.rotateX,
                    rotateY: tiltStyle.rotateY,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Image Background with Zoom */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.img
                        src={project.image}
                        alt={project.name}
                        loading="lazy"
                        className="h-full w-full object-cover grayscale will-change-transform"
                        variants={{
                            rest: { scale: 1, opacity: 0.6, filter: 'grayscale(100%)' },
                            hover: { scale: 1.05, opacity: 0.9, filter: 'grayscale(0%)' }
                        }}
                        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-[#637ab9]/20 transition-colors duration-500" />

                    {/* Shine Effect on Hover */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        variants={{
                            rest: { opacity: 0 },
                            hover: { opacity: 1 }
                        }}
                        style={{
                            background: `linear-gradient(
                                ${105 + tiltStyle.rotateY * 2}deg,
                                transparent 40%,
                                rgba(168, 251, 211, 0.1) 50%,
                                transparent 60%
                            )`
                        }}
                    />
                </div>

                {/* Overlay Info */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between pointer-events-none" style={{ transform: 'translateZ(30px)' }}>
                    <div className="flex justify-between items-start">
                        <span className="text-xs font-mono border border-white/30 px-2 py-1 rounded-full backdrop-blur-md bg-black/20">
                            {project.category}
                        </span>
                        <motion.div
                            variants={{
                                rest: { opacity: 0, x: 20, y: -20 },
                                hover: { opacity: 1, x: 0, y: 0 }
                            }}
                            className="bg-white text-black rounded-full p-2 will-change-transform shadow-lg shadow-white/20"
                        >
                            <ArrowUpRight className="w-6 h-6" />
                        </motion.div>
                    </div>

                    <div>
                        <div className="overflow-hidden">
                            <motion.h3
                                className="font-heading text-3xl md:text-4xl font-bold uppercase text-white mix-blend-difference will-change-transform"
                                variants={{
                                    rest: { y: 0 },
                                    hover: { y: -5 }
                                }}
                                transition={{ duration: 0.4 }}
                            >
                                {project.name}
                            </motion.h3>
                        </div>
                        <motion.p
                            className="text-sm font-medium uppercase tracking-widest text-[#4fb7b3] mt-2 will-change-transform"
                            variants={{
                                rest: { opacity: 0, y: 10 },
                                hover: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            {project.tech}
                        </motion.p>
                    </div>
                </div>
            </motion.div>

            {/* Bottom Glow on Hover */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#4fb7b3] to-transparent"
                variants={{
                    rest: { opacity: 0, scaleX: 0 },
                    hover: { opacity: 1, scaleX: 1 }
                }}
                transition={{ duration: 0.4 }}
            />
        </motion.div>
    );
};

export default ProjectCard;
