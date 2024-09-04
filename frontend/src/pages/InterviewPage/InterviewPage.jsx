import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import "./InterviewPage.css";

const InterviewPage = () => {
  const [speaking, setSpeaking] = useState(0); // 0 shows that the computer is speaking, and 1 for listening
  const svgRef = useRef(null);

  useEffect(() => {
    let tl;

    if (speaking === 0) {
      const waveTl = gsap.timeline({ repeat: -1 });

      waveTl.fromTo(
        ".c1",
        4,
        {
          scale: 1,
          opacity: 1,
        },
        {
          scale: 4,
          opacity: 0,
        },
        "-=1"
      );
      waveTl.to(
        ".c2",
        4,
        {
          scale: 4,
          opacity: 0,
        },
        0.5
      );

      waveTl.fromTo(
        ".c3",
        4,
        {
          opacity: 0,
          scale: 1,
        },
        {
          opacity: 1,
          scale: 4,
        },
        1
      );

      console.log(document.querySelector(".c1"));
    } else {
    }

    return () => {
      if (tl) {
        tl.kill();
      }
    };
  }, [speaking]);

  const generateRandomPath = () => {
    const x1 = Math.random() * 360;
    const y1 = 80 + Math.random() * 20 - 10;
    const x2 = Math.random() * 360;
    const y2 = 80 + Math.random() * 20 - 10;
    return `M 10 80 C 40 10, 65 10, 200 80 S 150 150, 400 80`;
  };

  let height = window.innerHeight;
  // ref={svgRef}
  return (
    <div className="interview-page" style={{ height }}>
      <div className="interview-body">
        <h1>{speaking==0?"hello!!":"Please Speak"}</h1>
        <div class="box">
          <svg
            class="circle c1"
            width="225"
            height="254"
            viewBox="0 0 225 254"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_ddf)">
              <circle
                cx="112.692"
                cy="128.125"
                r="57.7504"
                transform="rotate(-38.4475 112.692 128.125)"
                stroke="#283618"
                stroke-width="8"
              />
            </g>
            <defs>
              <filter
                id="filter0_ddf"
                x="0.934082"
                y="0.367432"
                width="223.516"
                height="253.516"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy="14" />
                <feGaussianBlur stdDeviation="12.5" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.486275 0 0 0 0 0.458824 0 0 0 0 0.435294 0 0 0 0.45 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy="-16" />
                <feGaussianBlur stdDeviation="12.5" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"
                />
                <feBlend
                  mode="normal"
                  in2="effect1_dropShadow"
                  result="effect2_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect2_dropShadow"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="7.5"
                  result="effect3_foregroundBlur"
                />
              </filter>
            </defs>
          </svg>

          <svg
            class="circle c2"
            width="225"
            height="254"
            viewBox="0 0 225 254"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_ddf)">
              <circle
                cx="112.692"
                cy="128.125"
                r="57.7504"
                transform="rotate(-38.4475 112.692 128.125)"
                stroke="#283618"
                stroke-width="8"
              />
            </g>
            <defs>
              <filter
                id="filter0_ddf"
                x="0.934082"
                y="0.367432"
                width="223.516"
                height="253.516"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy="14" />
                <feGaussianBlur stdDeviation="12.5" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.486275 0 0 0 0 0.458824 0 0 0 0 0.435294 0 0 0 0.45 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy="-16" />
                <feGaussianBlur stdDeviation="12.5" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"
                />
                <feBlend
                  mode="normal"
                  in2="effect1_dropShadow"
                  result="effect2_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect2_dropShadow"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="7.5"
                  result="effect3_foregroundBlur"
                />
              </filter>
            </defs>
          </svg>

          <svg
            class="circle c3"
            width="225"
            height="254"
            viewBox="0 0 225 254"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_ddf)">
              <circle
                cx="112.692"
                cy="128.125"
                r="57.7504"
                transform="rotate(-38.4475 112.692 128.125)"
                stroke="#283618"
                stroke-width="8"
              />
            </g>
            <defs>
              <filter
                id="filter0_ddf"
                x="0.934082"
                y="0.367432"
                width="223.516"
                height="253.516"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy="14" />
                <feGaussianBlur stdDeviation="12.5" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.486275 0 0 0 0 0.458824 0 0 0 0 0.435294 0 0 0 0.45 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy="-16" />
                <feGaussianBlur stdDeviation="12.5" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"
                />
                <feBlend
                  mode="normal"
                  in2="effect1_dropShadow"
                  result="effect2_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect2_dropShadow"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="7.5"
                  result="effect3_foregroundBlur"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
