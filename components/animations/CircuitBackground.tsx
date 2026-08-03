'use client';

export default function CircuitBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main horizontal rail */}
        <path
          d="M 0 200 L 200 200 L 240 160 L 600 160 L 640 120 L 900 120"
          stroke="rgba(30,136,255,0.12)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="8 4"
        />
        {/* Branch from main */}
        <path
          d="M 300 160 L 300 320 L 360 380 L 360 500"
          stroke="rgba(94,200,255,0.10)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="6 6"
        />
        {/* Right circuit */}
        <path
          d="M 1440 300 L 1200 300 L 1160 340 L 900 340 L 860 380 L 700 380"
          stroke="rgba(30,136,255,0.10)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="8 4"
        />
        {/* Bottom complex */}
        <path
          d="M 0 700 L 400 700 L 440 660 L 600 660 L 640 700 L 1000 700 L 1040 740 L 1440 740"
          stroke="rgba(94,200,255,0.08)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="10 5"
        />
        {/* Vertical connectors */}
        <path
          d="M 900 120 L 900 340"
          stroke="rgba(30,136,255,0.10)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="4 8"
        />
        <path
          d="M 700 380 L 700 700"
          stroke="rgba(94,200,255,0.08)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="4 8"
        />
        {/* Animated flowing line 1 */}
        <path
          d="M 0 200 L 200 200 L 240 160 L 600 160 L 640 120 L 900 120"
          stroke="rgba(94,200,255,0.5)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="20 980"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="1000"
            to="-1000"
            dur="8s"
            repeatCount="indefinite"
          />
        </path>
        {/* Animated flowing line 2 */}
        <path
          d="M 1440 300 L 1200 300 L 1160 340 L 900 340 L 860 380 L 700 380"
          stroke="rgba(30,136,255,0.5)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="20 980"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="-1000"
            to="1000"
            dur="10s"
            repeatCount="indefinite"
          />
        </path>
        {/* Animated flowing line 3 */}
        <path
          d="M 0 700 L 400 700 L 440 660 L 600 660 L 640 700 L 1000 700 L 1040 740 L 1440 740"
          stroke="rgba(94,200,255,0.4)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="20 1200"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="1200"
            to="-1200"
            dur="12s"
            repeatCount="indefinite"
          />
        </path>
        {/* Node dots */}
        {[
          [200, 200], [240, 160], [600, 160], [640, 120], [900, 120],
          [1200, 300], [1160, 340], [900, 340], [860, 380], [700, 380],
          [400, 700], [600, 660], [1000, 700], [300, 160], [360, 380],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="rgba(30,136,255,0.3)">
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur={`${2 + (i % 4)}s`}
              repeatCount="indefinite"
              begin={`${i * 0.3}s`}
            />
          </circle>
        ))}
        {/* Glowing node highlight */}
        {[[640, 120], [900, 340], [700, 380]].map(([cx, cy], i) => (
          <circle key={`glow-${i}`} cx={cx} cy={cy} r="6" fill="none" stroke="rgba(94,200,255,0.3)" strokeWidth="1">
            <animate
              attributeName="r"
              values="4;8;4"
              dur={`${3 + i}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.8;0.2;0.8"
              dur={`${3 + i}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
}
