import CallToAction from "@/Container/CallToAction";
import Features from "@/Container/Features";
import Footer from "@/Container/Footer";
import Hero from "@/Container/Hero";
import Navbar from "@/Container/Navbar";
import Pricing from "@/Container/Pricing";
import Stats from "@/Container/Stats";

export function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink">
      <Navbar />
      <main>
        <Hero />
        <Pricing />
        <Stats />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default App;
