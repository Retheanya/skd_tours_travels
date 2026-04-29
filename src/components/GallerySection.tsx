import birdsImg from "../assets/birds.png";
import ballonVid from "../assets/ballon.mp4";
import img1 from "../assets/image1.png";
import img2 from "../assets/image2.png";
import img3 from "../assets/image3.png";
import img4 from "../assets/image4.png";
import img5 from "../assets/image5.png";
import img6 from "../assets/image6.png";
import img7 from "../assets/image7.png";
import img8 from "../assets/image8.png";

const GallerySection = () => {
  return (
    <section className="min-h-screen pt-12 pb-20 bg-white relative overflow-hidden flex flex-col justify-center">
      {/* Background Decorative Elements */}
      <div className="absolute left-4 md:left-[8%] top-[20%] md:top-[25%] -translate-y-1/2 w-80 md:w-[600px] z-0 pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-auto"
        >
          <source src={ballonVid} type="video/mp4" />
        </video>
      </div>
      
      <div className="absolute right-4 md:right-12 top-10 md:top-20 w-48 md:w-80 z-0">
        <img src={birdsImg} alt="Birds" className="w-full h-auto opacity-80" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Headers */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="title-cursive">Explore Memories in Our Gallery</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#1f2937]">
            Happy Holidays With SKT!
          </h3>
          <p className="max-w-3xl mx-auto text-gray-500 text-lg leading-relaxed">
            <strong className="text-gray-700">SKT tours and travells</strong> provides <strong className="text-gray-700">international</strong>, <strong className="text-gray-700">domestic</strong>, and <strong className="text-gray-700">honeymoon</strong> tour packages. Explore the world, enjoy romantic trips, and discover hidden gems across India. We make every journey unforgettable!
          </p>
        </div>

        {/* Precise Pixel Gallery Grid */}
        <div className="flex flex-col gap-6 items-center">
          {/* Row 1: Top 4 */}
          <div className="flex flex-wrap justify-center items-center gap-6">
            <div className="w-[150px] h-[150px] rounded-2xl overflow-hidden shadow-lg mt-8">
              <img src={img1} className="w-full h-full object-cover" alt="Gallery 1" />
            </div>
            <div className="w-[230px] h-[220px] rounded-2xl overflow-hidden shadow-xl z-20">
              <img src={img2} className="w-full h-full object-cover" alt="Gallery 2" />
            </div>
            <div className="w-[150px] h-[150px] rounded-2xl overflow-hidden shadow-lg mt-10">
              <img src={img3} className="w-full h-full object-cover" alt="Gallery 3" />
            </div>
            <div className="w-[100px] h-[100px] rounded-2xl overflow-hidden shadow-lg mb-8">
              <img src={img4} className="w-full h-full object-cover" alt="Gallery 4" />
            </div>
          </div>

          {/* Row 2: Bottom 4 */}
          <div className="flex flex-wrap justify-center items-start gap-6 -mt-2">
            <div className="w-[150px] h-[150px] rounded-2xl overflow-hidden shadow-lg translate-y-2">
              <img src={img5} className="w-full h-full object-cover" alt="Gallery 5" />
            </div>
            <div className="w-[150px] h-[150px] rounded-2xl overflow-hidden shadow-lg -translate-y-4">
              <img src={img6} className="w-full h-full object-cover" alt="Gallery 6" />
            </div>
            <div className="w-[230px] h-[220px] rounded-2xl overflow-hidden shadow-xl translate-y-4">
              <img src={img7} className="w-full h-full object-cover" alt="Gallery 7" />
            </div>
            <div className="w-[150px] h-[150px] rounded-2xl overflow-hidden shadow-lg -translate-y-2">
              <img src={img8} className="w-full h-full object-cover" alt="Gallery 8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
