import Layout from "@/components/Layout";
import { Phone, Mail, MapPin, Send, Instagram } from "lucide-react";
import { useEffect, useState } from "react";

// Importing local asset files
import mapImg from "../assets/map.png";
import worldImg from "../assets/world.png";
import footerVideo from "../assets/footer.mp4";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    destination: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! Our travel specialists will get back to you soon.");
    setFormData({
      name: "",
      mobile: "",
      email: "",
      destination: "",
      message: ""
    });
  };

  return (
    <Layout>
      {/* 1. Fully Highlighted Video Banner aligned for mobile */}
      <section className="relative h-[280px] sm:h-[450px] flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
           <video 
             src={footerVideo}
             autoPlay 
             loop 
             muted 
             playsInline 
             className="w-full h-full object-contain md:object-cover opacity-100"
           />
        </div>
      </section>

      {/* 2. Uniquely Designed Contact Info Circles with #ffdfbf color */}
      <section className="py-16 bg-white -mt-16 relative z-30">
         <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               
               {/* REACH US CARD */}
               <div className="bg-[#ffdfbf] rounded-full aspect-square p-6 md:p-8 flex flex-col items-center justify-center text-center border border-orange-200 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:border-orange-500/40 hover:shadow-[0_12px_45px_rgba(249,115,22,0.15)] hover:-translate-y-1.5 transition-all duration-300 w-full max-w-[320px] mx-auto select-none">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-orange-600 mb-4 shadow-md transition-colors duration-300">
                     <MapPin className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-black mb-2 text-[#212529]" style={{ fontFamily: "'Cormorant Infant', serif" }}>
                     Reach Us
                  </h4>
                  <p className="text-sm font-bold text-gray-700 font-body leading-relaxed max-w-[220px]" style={{ fontFamily: "'Jost', sans-serif" }}>
                     123, Main Road, Near Bus Stand,<br />Chennai, Tamil Nadu 600001
                  </p>
               </div>

               {/* CALL US CARD */}
               <div className="bg-[#ffdfbf] rounded-full aspect-square p-6 md:p-8 flex flex-col items-center justify-center text-center border border-orange-200 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:border-orange-500/40 hover:shadow-[0_12px_45px_rgba(249,115,22,0.15)] hover:-translate-y-1.5 transition-all duration-300 w-full max-w-[320px] mx-auto select-none">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-orange-600 mb-4 shadow-md transition-colors duration-300">
                     <Phone className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-black mb-2 text-[#212529]" style={{ fontFamily: "'Cormorant Infant', serif" }}>
                     Call Us
                  </h4>
                  <div className="flex flex-col gap-1 text-sm font-bold text-gray-700 font-body" style={{ fontFamily: "'Jost', sans-serif" }}>
                     <a href="tel:+919894555553" className="hover:text-orange-600 transition-colors">+91 98945 55553</a>
                     <a href="tel:+919442555553" className="hover:text-orange-600 transition-colors">+91 94425 55553</a>
                     <a href="tel:+919894770505" className="hover:text-orange-600 transition-colors">+91 98947 70505</a>
                     <a href="tel:+919843051148" className="hover:text-orange-600 transition-colors">+91 98430 51148</a>
                  </div>
               </div>

               {/* MAIL US CARD */}
               <div className="bg-[#ffdfbf] rounded-full aspect-square p-6 md:p-8 flex flex-col items-center justify-center text-center border border-orange-200 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:border-orange-500/40 hover:shadow-[0_12px_45px_rgba(249,115,22,0.15)] hover:-translate-y-1.5 transition-all duration-300 w-full max-w-[320px] mx-auto select-none">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-orange-600 mb-4 shadow-md transition-colors duration-300">
                     <Mail className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-black mb-2 text-[#212529]" style={{ fontFamily: "'Cormorant Infant', serif" }}>
                     Mail Us
                  </h4>
                  <p className="text-sm font-bold text-gray-700 font-body leading-relaxed mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>
                     Write to this email for a detailed quotation:<br />
                     <a href="mailto:skttravels22@gmail.com" className="hover:text-orange-600 transition-colors">skttravels22@gmail.com</a>
                  </p>
                  <a 
                    href="https://www.instagram.com/skt_tours_and_travels_cbe?igsh=MWgzOGZxZzVtdTdxaQ==" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold text-orange-600 tracking-wider uppercase hover:text-gray-800 transition-colors mt-1"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    <Instagram className="w-4 h-4" /> View Instagram
                  </a>
               </div>

            </div>
         </div>
      </section>

      {/* 3. Form & Informational Sideboard */}
      <section className="py-16 bg-[#fafafa]">
         <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
               
               {/* Left Column: Form */}
               <div className="bg-white p-6 md:p-10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-gray-50 relative overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-36 h-36 bg-orange-400/10 rounded-full blur-3xl pointer-events-none"></div>
                  
                  <span className="text-xs uppercase font-bold text-orange-500 tracking-[0.2em] mb-2 block" style={{ fontFamily: "'Jost', sans-serif" }}>
                     Connect with Us
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold mb-8 text-[#212529]" style={{ fontFamily: "'Cormorant Infant', serif" }}>
                     Send Us a Message
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-5" style={{ fontFamily: "'Jost', sans-serif" }}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                           <label className="block text-sm font-bold text-[#212529] mb-1.5">Full Name</label>
                           <input 
                             type="text" 
                             name="name"
                             required
                             value={formData.name}
                             onChange={handleChange}
                             placeholder="Enter Name"
                             className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500 bg-gray-50 focus:bg-white transition-all" 
                           />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-[#212529] mb-1.5">Mobile Number</label>
                           <input 
                             type="tel" 
                             name="mobile"
                             required
                             value={formData.mobile}
                             onChange={handleChange}
                             placeholder="Enter Mobile"
                             className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500 bg-gray-50 focus:bg-white transition-all" 
                           />
                        </div>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                           <label className="block text-sm font-bold text-[#212529] mb-1.5">Email ID</label>
                           <input 
                             type="email" 
                             name="email"
                             required
                             value={formData.email}
                             onChange={handleChange}
                             placeholder="Enter Email"
                             className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500 bg-gray-50 focus:bg-white transition-all" 
                           />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-[#212529] mb-1.5">Destination</label>
                           <input 
                             type="text" 
                             name="destination"
                             required
                             value={formData.destination}
                             onChange={handleChange}
                             placeholder="Enter Destination"
                             className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500 bg-gray-50 focus:bg-white transition-all" 
                           />
                        </div>
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-[#212529] mb-1.5">Your Message</label>
                        <textarea 
                          name="message"
                          rows={4}
                          required
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="How can we assist you?"
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500 bg-gray-50 focus:bg-white transition-all"
                        ></textarea>
                     </div>
                     <div className="pt-2">
                        <button 
                          type="submit"
                          className="w-full md:w-auto bg-orange-500 text-white px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#222] transition-all shadow-lg hover:-translate-y-0.5"
                        >
                           <Send className="w-4 h-4"/> Send Message
                        </button>
                     </div>
                  </form>
               </div>

               {/* Right Column: Imagery Section (map & world) */}
               <div className="flex flex-col gap-8 select-none">
                  <div className="relative flex justify-center">
                     {/* Floating Graphic effects */}
                     <div className="absolute -top-10 -left-10 w-48 h-48 bg-orange-200/20 rounded-full blur-2xl z-0 pointer-events-none animate-pulse"></div>
                     <img src={worldImg} alt="World Travel Graphics" className="w-4/5 max-h-[220px] object-contain relative z-10" />
                  </div>

                  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-50 flex items-center gap-6">
                     <div className="w-20 h-20 flex-shrink-0">
                        <img src={mapImg} alt="Map Pin Representation" className="w-full h-full object-contain" />
                     </div>
                     <div>
                        <h4 className="text-lg font-bold text-[#212529] mb-1" style={{ fontFamily: "'Cormorant Infant', serif" }}>
                           Specialized in South India
                        </h4>
                        <p className="text-sm text-gray-500 font-body leading-relaxed" style={{ fontFamily: "'Jost', sans-serif" }}>
                           Discover the pristine charm of Kerala, Tamil Nadu, and Karnataka with our expert tour planners since 2006.
                        </p>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* 4. Informational Content related to South India Beauty */}
      <section className="py-16 bg-white" style={{ fontFamily: "'Jost', sans-serif" }}>
         <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#212529] mb-6 tracking-wide" style={{ fontFamily: "'Cormorant Infant', serif" }}>
               Best Travel Agency in South India
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
               As the leading <strong className="font-bold text-[#212529]">Travel Agency for South India</strong>, we understand that travel, once linked with relaxation and enjoyment, now holds greater importance in our fast-paced world. Whether you are seeking customized honeymoon getaways in the tea gardens of Munnar, family trips across the coastal towns of Kerala, or rich heritage safaris in Karnataka, we are here to ensure your holiday is truly memorable.
            </p>
            <p className="text-gray-600 mb-10 leading-relaxed">
               Nowadays, travel serves multiple purposes and provides a variety of experiences. While individuals can efficiently plan their trips, we, as the top <strong className="font-bold text-[#212529]">tour agency in Chennai and Coimbatore</strong>, offer an extensive range of travel and tourism services to ensure a smooth journey from the initial planning stages to the return trip. Embarking on a lengthy journey can feel like a daunting task, from organizing private transfers to choosing premium accommodations. Let us take care of all the details seamlessly, so you can savor your travel adventures without any worries.
            </p>

            <h3 className="text-2xl md:text-3xl font-bold text-[#212529] mb-4 tracking-wide" style={{ fontFamily: "'Cormorant Infant', serif" }}>
               How Do You Choose a Trusted Travel Agency?
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
               Choosing a reliable <strong className="font-bold text-[#212529]">travel agency</strong> has become quite a challenge nowadays, as you rely on them to create memorable experiences for your precious leisure time. However, this process doesn't have to be overly complicated. While customer reviews and pricing provide valuable insights, it's crucial to consider other aspects of a company, such as localized knowledge and dedicated support.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
               When selecting a <strong className="font-bold text-[#212529]">tour agency</strong>, it's crucial to prioritize quality over quantity. The most important factor is the level of service provided by the agency, rather than the sheer number of options they offer. <strong className="font-bold text-[#212529]">Quality should always be the top priority</strong> when choosing the right travel agency. 
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
               Read our reviews, talk to our guest relationships team, focus on the details, and you'll know all that you must know about the company. Established in 2006, it's been a significant period since <strong className="font-bold text-[#212529]">SKT Tours and Travells</strong> has been serving people to make their special time extra special. But it's more than that. We genuinely care about you! Our commitment to exceptional service is evident in our offerings, which is why people always come back for more.
            </p>
         </div>
      </section>

      {/* 5. Google Maps Iframe */}
      <section className="relative w-full h-[450px]">
         <iframe 
           title="Google Map Location"
           src="https://maps.google.com/maps?q=123%20Main%20Road%20Chennai%20Tamil%20Nadu%20600001&t=&z=13&ie=UTF8&iwloc=&output=embed"
           className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
           allowFullScreen
         />
      </section>
    </Layout>
  );
};

export default Contact;
