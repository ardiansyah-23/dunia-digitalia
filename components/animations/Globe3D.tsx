'use client';

import { motion } from 'framer-motion';

export default function Globe3D() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Outer glow ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: '480px',
          height: '480px',
          background: 'radial-gradient(circle at 35% 35%, rgba(30,136,255,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Main globe container */}
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ transformStyle: 'preserve-3d', perspective: 800 }}
        className="relative"
      >
        {/* Globe sphere */}
        <div
          className="relative rounded-full"
          style={{
            width: '360px',
            height: '360px',
            background: 'radial-gradient(circle at 35% 35%, rgba(30,136,255,0.25) 0%, rgba(7,17,31,0.8) 60%, rgba(0,200,255,0.08) 100%)',
            border: '1px solid rgba(30,136,255,0.25)',
            boxShadow: '0 0 80px rgba(30,136,255,0.15), inset 0 0 80px rgba(94,200,255,0.05)',
          }}
        >
          {/* Latitude lines */}
          {[0.25, 0.5, 0.75].map((pct, i) => (
            <div
              key={i}
              className="absolute left-0 right-0"
              style={{
                top: `${pct * 100}%`,
                height: '1px',
                background: 'rgba(30,136,255,0.2)',
                borderRadius: '50%',
                transform: 'scaleX(0.85)',
                boxShadow: '0 0 6px rgba(30,136,255,0.3)',
              }}
            />
          ))}

          {/* Meridian lines */}
          {[0, 30, 60, 90, 120, 150].map((deg, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full"
              style={{
                border: '1px solid rgba(30,136,255,0.12)',
                transform: `rotateY(${deg}deg)`,
              }}
            />
          ))}

          {/* Continents placeholder (abstract shapes) */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 360 360"
            style={{ opacity: 0.25 }}
          >
            <ellipse cx="130" cy="130" rx="50" ry="35" fill="rgba(30,136,255,0.5)" />
            <ellipse cx="220" cy="160" rx="60" ry="40" fill="rgba(30,136,255,0.4)" />
            <ellipse cx="180" cy="240" rx="40" ry="25" fill="rgba(30,136,255,0.35)" />
            <ellipse cx="80" cy="200" rx="25" ry="20" fill="rgba(30,136,255,0.3)" />
            <ellipse cx="280" cy="100" rx="30" ry="20" fill="rgba(30,136,255,0.35)" />
          </svg>

          {/* Shine */}
          <div
            className="absolute"
            style={{
              top: '15%',
              left: '20%',
              width: '100px',
              height: '80px',
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.12) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />
        </div>
      </motion.div>

      {/* Orbiting ring */}
      <motion.div
        className="absolute rounded-full"
        animate={{ rotateX: 70, rotateZ: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          width: '420px',
          height: '420px',
          border: '1px solid rgba(94,200,255,0.2)',
          borderTop: '2px solid rgba(94,200,255,0.6)',
          boxShadow: '0 0 20px rgba(94,200,255,0.1)',
        }}
      />

      {/* Floating nodes */}
      {[
        { top: '10%', left: '15%', delay: 0 },
        { top: '60%', left: '5%', delay: 1 },
        { top: '80%', right: '10%', delay: 0.5 },
        { top: '15%', right: '8%', delay: 1.5 },
        { top: '40%', left: '2%', delay: 0.8 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={pos as React.CSSProperties}
          animate={{ y: [0, -12, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, delay: pos.delay, ease: 'easeInOut' }}
        >
          <div
            className="rounded-full"
            style={{
              width: '8px',
              height: '8px',
              background: '#5EC8FF',
              boxShadow: '0 0 12px rgba(94,200,255,0.8)',
            }}
          />
        </motion.div>
      ))}

      {/* Connection lines to nodes */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 500 500"
        style={{ opacity: 0.3 }}
      >
        <line x1="250" y1="250" x2="80" y2="60" stroke="rgba(94,200,255,0.4)" strokeWidth="0.5" strokeDasharray="4 8" />
        <line x1="250" y1="250" x2="40" y2="310" stroke="rgba(94,200,255,0.4)" strokeWidth="0.5" strokeDasharray="4 8" />
        <line x1="250" y1="250" x2="460" y2="420" stroke="rgba(94,200,255,0.4)" strokeWidth="0.5" strokeDasharray="4 8" />
        <line x1="250" y1="250" x2="455" y2="80" stroke="rgba(94,200,255,0.4)" strokeWidth="0.5" strokeDasharray="4 8" />
      </svg>
    </div>
  );
}
