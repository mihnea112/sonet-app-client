import React from 'react'

function Balls() {
  return (
    <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1 hidden lg:block"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#6ee7b7" offset="0%" />
              <stop stopColor="#059669" offset="50.402%" />
              <stop stopColor="#064e3b" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>
  )
}

export default Balls