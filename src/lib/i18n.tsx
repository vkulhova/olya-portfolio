'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type Lang = 'en' | 'ua'

export const translations = {
  en: {
    nav: { works: 'works', about: 'about', contact: 'contact' },
    hero: {
      tag: 'illustration portfolio',
      subtitle: 'Cozy worlds, gentle characters,\nand a little bit of magic — in every illustration.',
      cta: 'View works',
      scroll: 'scroll',
    },
    gallery: {
      tag: 'portfolio',
      heading: 'Works',
      empty: 'Illustrations coming soon ✨',
      cats: { all: 'All', characters: 'Characters', landscapes: 'Landscapes', covers: 'Covers', other: 'Other' },
    },
    about: {
      caption: 'this is me ✨',
      heading: "Hello, I’m Olya!",
      p1: "I'm an illustrator who loves creating cozy, whimsical worlds full of warm colors, folk-inspired details, and gentle storytelling.",
      p2: "My illustrations live somewhere between a fairytale and your grandmother's kitchen — a place where cats nap on houseplants and magic sparks fly from everyday moments.",
      p3: 'I work with digital tools and love collaborating on books, prints, branding, and anything with a soul.',
      instagram: '📷 Instagram',
      behance: '✦ Behance',
      linkedin: 'in LinkedIn',
      commissions: '✨ open for commissions',
    },
    contact: {
      tag: 'get in touch',
      heading: "Let's work together",
      subheading: "Have a project in mind? I'd love to hear about it.\nSend me a message and I'll get back to you.",
      labelName: 'Your name',
      placeholderName: 'Jane Doe',
      labelEmail: 'Email',
      placeholderEmail: 'jane@example.com',
      labelMessage: 'Message',
      placeholderMessage: 'Tell me about your project...',
      send: 'Send message ✉️',
      sending: 'Opening...',
      sent: 'Message ready ✓',
    },
    footer: '© {year} lolikar — all rights reserved',
  },
  ua: {
    nav: { works: 'роботи', about: 'про мене', contact: 'контакти' },
    hero: {
      tag: 'портфоліо ілюстратора',
      subtitle: 'Затишні світи, лагідні персонажі,\nі трішки магії — у кожній ілюстрації.',
      cta: 'Дивитись роботи',
      scroll: 'гортай',
    },
    gallery: {
      tag: 'портфоліо',
      heading: 'Роботи',
      empty: 'Ілюстрації незабаром з\'являться ✨',
      cats: { all: 'Всі', characters: 'Персонажі', landscapes: 'Пейзажі', covers: 'Обкладинки', other: 'Інше' },
    },
    about: {
      caption: 'це я ✨',
      heading: 'Привіт, я Оля!',
      p1: 'Я ілюстраторка, яка любить створювати затишні, казкові світи, сповнені теплих кольорів, народних мотивів і лагідних оповідей.',
      p2: 'Мої ілюстрації — десь між казкою і бабусиною кухнею: де коти дрімають на підвіконнях, а магія спалахує в буденних моментах.',
      p3: 'Працюю з цифровими інструментами і люблю співпрацювати над книжками, принтами, брендингом та всім, що має душу.',
      instagram: '📷 Instagram',
      behance: '✦ Behance',
      linkedin: 'in LinkedIn',
      commissions: '✨ відкрита до замовлень',
    },
    contact: {
      tag: 'напиши мені',
      heading: 'Працюймо разом',
      subheading: 'Є ідея для проєкту? Із задоволенням вислухаю.\nНадішли повідомлення — відповім якнайшвидше.',
      labelName: 'Твоє імʼя',
      placeholderName: 'Оленка',
      labelEmail: 'Email',
      placeholderEmail: 'olenka@example.com',
      labelMessage: 'Повідомлення',
      placeholderMessage: 'Розкажи про свій проєкт...',
      send: 'Надіслати ✉️',
      sending: 'Відкриваю...',
      sent: 'Повідомлення готове ✓',
    },
    footer: '© {year} lolikar — усі права захищені',
  },
}

type T = typeof translations.en
interface LangCtx { lang: Lang; t: T; toggle: () => void }

const LangContext = createContext<LangCtx>({
  lang: 'en',
  t: translations.en,
  toggle: () => {},
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const toggle = () => setLang(l => {
    const next = l === 'en' ? 'ua' : 'en'
    document.documentElement.lang = next
    return next
  })
  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
