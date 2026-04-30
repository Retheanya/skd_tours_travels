const ChooseTripSection = () => {
  return (
    <section className="relative w-full flex flex-col lg:min-h-[600px] lg:justify-center overflow-hidden bg-white">
      {/* Main Content Area - Order 1 on mobile */}
      <div className="order-1 lg:order-none container mx-auto px-6 lg:px-16 relative z-10 py-10 lg:py-0">
        <div className="max-w-[500px] lg:-translate-y-16">
          <h3 
            className="mb-4 text-[32px] md:text-[40px]"
            style={{ 
              color: "#212529", 
              fontFamily: "'Cormorant Infant', Arial, Helvetica, sans-serif", 
              fontWeight: 500,
              lineHeight: 1.2
            }}
          >
            Choose your Trip!
          </h3>
          <p 
            className="text-[16px] md:text-[18px]"
            style={{
              color: "#666666",
              fontFamily: "'Jost', sans-serif",
              lineHeight: "1.7",
              marginBottom: "16px"
            }}
          >
            Discover your dream destinations with Aspire Holidays, a trusted <strong className="font-bold">travel agency in Chennai & Coimbatore</strong> . Share your travel ideas with us & we'll handle the planning, bookings, and details for a smooth & memorable journey. Just share your idea & we will take care of everything.
          </p>
        </div>
      </div>

      {/* Image Area - Order 2 on mobile, absolute on desktop */}
      <div className="order-2 lg:order-none relative lg:absolute lg:inset-0 z-0 h-[250px] sm:h-[350px] lg:h-full">
        <img 
          src="/palace.png" 
          alt="Choose Your Trip Background" 
          className="w-full h-full object-cover object-center lg:object-right" 
        />
      </div>
    </section>
  );
};

export default ChooseTripSection;
