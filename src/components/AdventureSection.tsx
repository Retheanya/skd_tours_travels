import honeymoon2Img from "../assets/honeymoon_2.png";
import trendingImg from "../assets/trending.png";
import greenyImg from "../assets/greeny.png";
import thanjaiImg from "../assets/thanjai.png";
import animeVideo from "../assets/anime.mp4";

const cards = [
  { image: honeymoon2Img, name: "Honeymoon" },
  { image: trendingImg, name: "Trending" },
  { image: greenyImg, name: "Domestic" },
  { image: thanjaiImg, name: "Pilgrim" },
];

const AdventureSection = () => {
  return (
    <div className="relative w-full bg-white">
      {/* Part 1: 4 Cards */}
      <section className="relative z-20 pt-10 pb-16">
        <div className="w-full px-4 md:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {cards.map((card, idx) => (
              <div key={idx} className="group relative aspect-[10/11] rounded-[25px] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer">
                {/* Image */}
                <img 
                  src={card.image} 
                  alt={card.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Hover Overlay Screen */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <h3 className="text-white text-3xl font-bold font-display tracking-wider">
                    {card.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part 2: Video Section (Full Viewport Stretch) */}
      <section className="relative w-full h-[100vh] bg-white overflow-hidden z-10 -mt-10">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src={animeVideo} type="video/mp4" />
        </video>
      </section>
    </div>
  );
};

export default AdventureSection;
