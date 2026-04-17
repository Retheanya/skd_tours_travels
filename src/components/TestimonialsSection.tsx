import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Menon",
    location: "Chennai",
    text: "Our Kerala backwater trip was magical! SDK Tours planned everything perfectly — from houseboats to hill station stays. Truly unforgettable!",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    location: "Bangalore",
    text: "The Hampi and Coorg package exceeded our expectations. The guides were knowledgeable and the hotels were excellent. Highly recommended!",
    rating: 5,
  },
  {
    name: "Anitha & Vikram",
    location: "Hyderabad",
    text: "We had an amazing honeymoon in Pondicherry. Every detail was taken care of. Thank you SDK Tours for making it so special!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-2">
          Testimonials
        </h2>
        <h3 className="text-center mb-14">
          What Our Clients Say!
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-secondary-foreground/5 backdrop-blur-sm border border-secondary-foreground/10 rounded-2xl p-8 relative"
            >
              <Quote className="w-10 h-10 text-primary/30 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                ))}
              </div>
              <p className="leading-relaxed mb-6">
                "{t.text}"
              </p>
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
