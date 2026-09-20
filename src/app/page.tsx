import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Floating from "@/components/Floating";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import Services from "@/components/Services";
import { aggregate, visibleTestimonials } from "@/lib/data";

export default function Home() {
  const hasReviews = visibleTestimonials.length > 0;
  return (
    <>
      <Nav hasReviews={hasReviews} />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Portfolio />
        {hasReviews && <Reviews reviews={visibleTestimonials} aggregate={aggregate()} />}
        <Process />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer hasReviews={hasReviews} />
      <Floating />
    </>
  );
}
