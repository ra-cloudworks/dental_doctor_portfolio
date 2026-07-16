import Hero from './components/Hero';
import Stats from './components/Stats';
import CoreSpecialties from './components/CoreSpecialties';
import Credentials from './components/Credentials';
import SuccessStories from './components/SuccessStories';
import CTA from './components/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <CoreSpecialties />
      <Credentials />
      <SuccessStories />
      <CTA />
    </>
  );
}
