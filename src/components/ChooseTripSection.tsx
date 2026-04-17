const ChooseTripSection = () => {
  return (
    <section className="relative w-full min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/palace.png" 
          alt="Choose Your Trip Background" 
          className="w-full h-full object-cover object-right" 
        />
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="max-w-[500px] -translate-y-16">
          <h3 
            className="mb-4"
            style={{ 
              color: "#212529", 
              fontFamily: "'Cormorant Infant', Arial, Helvetica, sans-serif", 
              fontSize: "40px", 
              fontWeight: 500,
              lineHeight: 1.2
            }}
          >
            Choose your Trip!
          </h3>
          <p 
            style={{
              color: "#666666",
              fontFamily: "'Jost', sans-serif",
              fontSize: "18px",
              lineHeight: "1.7",
              marginBottom: "16px"
            }}
          >
            Discover your dream destinations with Aspire Holidays, a trusted <strong className="font-bold">travel agency in Chennai & Coimbatore</strong> . Share your travel ideas with us & we'll handle the planning, bookings, and details for a smooth & memorable journey. Just share your idea & we will take care of everything.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChooseTripSection;
