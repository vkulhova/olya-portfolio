import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Gallery from '@/components/Gallery'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { client } from '@/sanity/client'

async function getIllustrations() {
  return client.fetch(
    `*[_type == "illustration"] | order(order asc, _createdAt desc) {
      _id, title, image, category, description
    }`
  )
}

export default async function Home() {
  const illustrations = await getIllustrations()

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Gallery illustrations={illustrations} />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
