import React from 'react';
import { motion } from 'framer-motion';
import './Section.css';

const Section = ({ id, title, children, image, reversed, linkText, linkUrl }) => {
    return (
        <section id={id} className={`section ${reversed ? 'section-reversed' : ''}`}>
            <div className="section-container">
                <motion.div
                    className="section-content"
                    initial={{ opacity: 0, x: reversed ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    {title && <h2>{title}</h2>}
                    <div className="section-text">
                        {children}
                    </div>
                    {linkText && linkUrl && (
                        <a href={linkUrl} className="btn-link">{linkText} &rarr;</a>
                    )}
                </motion.div>

                {image && (
                    <motion.div
                        className="section-image"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <img src={image} alt={title} />
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Section;
