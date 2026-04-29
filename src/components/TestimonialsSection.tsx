import ghatsImg from "../assets/ghats.png";

const TestimonialsSection = () => {
  return (
    <>
      {/* Ghats Full-Screen Section */}
      <section className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={ghatsImg}
            alt="Ghats Mountains"
            className="w-full h-full object-cover"
          />
          {/* Subtle top overlay */}
          <div className="absolute inset-0 bg-black/10" />
          {/* Smokey white-blue gradient fade at the bottom into dark navy */}
          <div
            className="absolute bottom-0 left-0 w-full h-[55%] pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(180,200,240,0) 0%, rgba(160,185,230,0.25) 30%, rgba(100,130,200,0.55) 60%, rgba(26,42,94,0.88) 82%, rgba(15,29,69,1) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 text-center space-y-8 px-4">
          <h2 className="text-white text-4xl md:text-7xl font-bold font-display italic tracking-wide drop-shadow-lg">
            Life is short and the world is wide!
          </h2>
          <div>
            <button className="bg-[#f97316] hover:bg-[#ea580c] text-white px-10 py-4 rounded-md font-bold text-lg uppercase transition-all shadow-xl hover:scale-105 active:scale-95">
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Connect With Us Section - matches reference image */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, #1a2a5e 0%, #0f1d45 60%, #0d1940 100%)",
        }}
      >
        {/* Top faded mountain image blending into the dark bg */}
        <div
          className="absolute top-0 left-0 w-full h-[180px] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(30,50,100,0.55) 0%, rgba(15,29,69,0.98) 100%)",
          }}
        />

        <div className="relative z-10 px-6 md:px-14 pt-12 pb-10">
          {/* Connect With Us Row */}
          <div className="flex items-center gap-6 mb-8">
            {/* Heading */}
            <h2 className="text-white text-2xl md:text-3xl font-bold whitespace-nowrap">
              Connect With Us!
            </h2>

            {/* Hand-drawn phone squiggle SVG */}
            <svg
              viewBox="0 0 130 36"
              className="w-28 md:w-36 h-9 flex-shrink-0"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Squiggly wire */}
              <path
                d="M4 18 Q12 6 20 18 Q28 30 36 18 Q44 6 52 18 Q60 30 68 18"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              {/* Phone handset body */}
              <ellipse cx="90" cy="15" rx="13" ry="10" stroke="white" strokeWidth="1.8" fill="none" />
              {/* Speaker grill dots */}
              <circle cx="84" cy="13" r="1.5" fill="white" />
              <circle cx="90" cy="11" r="1.5" fill="white" />
              {/* Ear/mic buds */}
              <circle cx="102" cy="13" r="1.5" fill="white" />
              <circle cx="104" cy="18" r="1.5" fill="white" />
              {/* Cord tail */}
              <path
                d="M76 18 Q72 24 70 22"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* வணக்கம் Orange Cloud Bubble */}
            <div className="relative flex-shrink-0">
              {/* Left pointer tail */}
              <div
                className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-0 h-0"
                style={{
                  borderTop: "8px solid transparent",
                  borderBottom: "8px solid transparent",
                  borderRight: "12px solid #f97316",
                }}
              />
              {/* Cloud shape via border-radius */}
              <div
                className="bg-[#f97316] text-white font-bold text-base md:text-lg px-6 py-2 shadow-lg select-none"
                style={{
                  borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
                  minWidth: "100px",
                  textAlign: "center",
                }}
              >
                வணக்கம்
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;
