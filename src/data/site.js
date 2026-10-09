// Fonte única de verdade: usada pelo site (React) e pelo build (SEO: JSON-LD, sitemap, HTML estático).
// Este arquivo precisa ser JS puro (sem JSX/imports de assets) para rodar também no Node.

export const SITE = {
  name: 'Dra. Ana Flávia Ribeiro',
  shortName: 'Dra. Ana Flávia',
  title: 'Dra. Ana Flávia Ribeiro | Médica em Saúde Mental · Belo Horizonte e Online',
  description:
    'Médica com atuação em saúde mental em Belo Horizonte e online: ansiedade, humor e burnout. Consulta de cerca de 60 minutos, escuta cuidadosa e acompanhamento contínuo. Agende pelo WhatsApp.',
  phone: '+5531994442774',
  phoneDisplay: '(31) 99444-2774',
  crm: 'CRM-MG 104082',
  instagram: 'https://www.instagram.com/dra.ana.ribeiro',
  instagramHandle: '@dra.ana.ribeiro',
  city: 'Belo Horizonte',
  region: 'MG',
  whatsappMessage: 'Olá, Dra. Ana! Gostaria de agendar uma consulta.',
};

export const WHATSAPP = `https://wa.me/${SITE.phone.replace('+', '')}?text=${encodeURIComponent(SITE.whatsappMessage)}`;

export const FAQ = [
  {
    q: 'Como funciona o atendimento médico em saúde mental?',
    a: 'É uma consulta médica focada na sua saúde emocional. Avaliamos sintomas físicos e mentais para propor um plano de cuidado integral, com protocolos modernos e uma abordagem profundamente humana.',
  },
  {
    q: 'Quanto tempo dura a primeira consulta?',
    a: 'A consulta inicial é extensa e meticulosa (cerca de 60 minutos), permitindo uma compreensão profunda do seu histórico familiar, de vida e de suas necessidades atuais, sem pressa.',
  },
  {
    q: 'Quando devo procurar ajuda para a minha saúde mental?',
    a: 'Quando ansiedade, tristeza, irritação, cansaço ou alterações do sono se prolongam por semanas e começam a atrapalhar o trabalho, os estudos, os relacionamentos ou o seu bem-estar. Você não precisa esperar chegar ao limite para pedir ajuda.',
  },
  {
    q: 'O atendimento online é seguro e eficaz?',
    a: 'Sim. Utilizamos plataformas seguras e éticas, seguindo as normas do Conselho Federal de Medicina. A telemedicina tem demonstrado eficácia clínica comparável ao atendimento presencial em psiquiatria.',
  },
  {
    q: 'Qual a diferença entre o acompanhamento médico e a psicoterapia?',
    a: 'O acompanhamento médico avalia o quadro clínico como um todo e, quando indicado, inclui o manejo com medicamentos. A psicoterapia, feita por psicólogos, trabalha pensamentos, emoções e comportamentos. Os dois cuidados se complementam e podem acontecer ao mesmo tempo.',
  },
  {
    q: 'Todo tratamento envolve medicamentos?',
    a: 'Não. O plano é individual: pode incluir orientações de rotina, sono, manejo do estresse e encaminhamento para outros profissionais. Medicação só é indicada quando faz sentido para o seu caso, sempre explicada com clareza.',
  },
  {
    q: 'O que levar para a primeira consulta?',
    a: 'Se tiver, leve exames recentes, relatórios de atendimentos anteriores e a lista dos medicamentos que usa hoje. Se não tiver nada disso, não há problema: a conversa é o ponto de partida.',
  },
  {
    q: 'E se eu estiver em crise ou em risco?',
    a: 'Este site não substitui atendimento de urgência. Em situação de risco, ligue para o SAMU (192), procure o pronto-socorro mais próximo ou fale com o CVV (188), que atende 24 horas, de graça.',
  },
];

export const SIGNS = [
  'Preocupação constante, aperto no peito ou sensação de que algo ruim vai acontecer',
  'Desânimo, tristeza ou perda de interesse pelo que antes fazia sentido',
  'Dificuldade para dormir, ou sono que não descansa',
  'Cansaço mental, irritação e dificuldade de concentração',
  'Esgotamento com o trabalho e a sensação de estar sempre no limite',
  'Medo de decepcionar, autocobrança excessiva e dificuldade de desacelerar',
];

export const SERVICES = [
  { name: 'Manejo da Ansiedade', description: 'Avaliação e acompanhamento médico de quadros de ansiedade.' },
  { name: 'Suporte ao Humor', description: 'Acompanhamento clínico de desânimo, depressão e instabilidade de humor.' },
  { name: 'Burnout e Estresse', description: 'Orientação médica para esgotamento profissional e estresse crônico.' },
  { name: 'Telemedicina', description: 'Consultas por vídeo em plataformas seguras, conforme as normas do CFM.' },
];

// Páginas indexáveis (por enquanto uma landing page; adicione rotas aqui e o sitemap acompanha).
export const PAGES = [{ path: '/', priority: '1.0', changefreq: 'monthly' }];

export const buildJsonLd = (url) => {
  const base = url.replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${base}/#website`,
        url: `${base}/`,
        name: SITE.name,
        inLanguage: 'pt-BR',
        publisher: { '@id': `${base}/#physician` },
      },
      {
        '@type': ['Physician', 'MedicalBusiness'],
        '@id': `${base}/#physician`,
        name: SITE.name,
        url: `${base}/`,
        image: `${base}/og-image.jpg`,
        logo: `${base}/icon-192.png`,
        description: SITE.description,
        telephone: SITE.phone,
        identifier: SITE.crm,
        availableLanguage: 'pt-BR',
        knowsAbout: ['Saúde mental', 'Ansiedade', 'Depressão', 'Burnout', 'Telemedicina'],
        medicalSpecialty: 'https://schema.org/PrimaryCare',
        address: {
          '@type': 'PostalAddress',
          addressLocality: SITE.city,
          addressRegion: SITE.region,
          addressCountry: 'BR',
        },
        areaServed: [
          { '@type': 'City', name: SITE.city },
          { '@type': 'Country', name: 'Brasil' },
        ],
        sameAs: [SITE.instagram],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: SITE.phone,
          contactType: 'agendamento',
          availableLanguage: 'pt-BR',
        },
        makesOffer: SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'MedicalProcedure', name: s.name, description: s.description },
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${base}/#faq`,
        inLanguage: 'pt-BR',
        mainEntity: FAQ.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
};

export const whatsappLink = (message) => `https://wa.me/${SITE.phone.replace('+', '')}?text=${encodeURIComponent(message)}`;

// Check-in emocional: não é diagnóstico, só um jeito acolhedor de começar a conversa.
export const MOODS = [
  {
    id: 'ansioso',
    label: 'Ansioso(a)',
    title: 'A mente que não desliga.',
    text: 'Preocupação constante e o corpo em estado de alerta cansam muito. É comum, e existe cuidado médico para isso.',
    tip: 'Agora, tente expirar mais devagar do que inspira, três vezes.',
    feeling: 'ansioso(a)',
    tint: 'rgba(220,197,144,0.35)',
  },
  {
    id: 'desanimado',
    label: 'Desanimado(a)',
    title: 'Quando tudo pesa mais.',
    text: 'Perder a vontade do que antes fazia sentido não é frescura nem falta de força. Merece ser ouvido por alguém de confiança.',
    tip: 'Um passo pequeno conta: abrir a janela, beber água, escrever a quem confia.',
    feeling: 'desanimado(a)',
    tint: 'rgba(185,202,189,0.55)',
  },
  {
    id: 'esgotado',
    label: 'Esgotado(a)',
    title: 'Cansaço que o descanso não resolve.',
    text: 'Trabalho, cobrança e pouca pausa podem levar ao esgotamento. Reconhecer isso cedo faz diferença.',
    tip: 'Hoje, escolha uma única coisa para não fazer. Sim, isso também é cuidado.',
    feeling: 'esgotado(a)',
    tint: 'rgba(231,220,200,0.7)',
  },
  {
    id: 'sono',
    label: 'Dormindo mal',
    title: 'Noites que não descansam.',
    text: 'O sono e a saúde mental andam juntos. Quando um vai mal, o outro costuma sentir. Vale investigar com calma.',
    tip: 'Reduzir telas e luz forte na última hora do dia pode ajudar a desacelerar.',
    feeling: 'dormindo mal',
    tint: 'rgba(203,216,206,0.6)',
  },
  {
    id: 'nao-sei',
    label: 'Não sei explicar',
    title: 'Você não precisa saber nomear.',
    text: 'Muita gente chega sem palavras para o que sente. A primeira consulta existe justamente para organizar isso, sem pressa.',
    tip: 'Basta dar o primeiro passo. O resto a gente constrói junto.',
    feeling: 'sem saber explicar bem o que sinto',
    tint: 'rgba(220,197,144,0.3)',
  },
];
