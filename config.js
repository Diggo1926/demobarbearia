/**
 * ============================================================================
 * CONFIG.JS — ARQUIVO ÚNICO DE MARCA
 * ============================================================================
 *
 * Este é o único arquivo que precisa ser editado para transformar este demo
 * em uma versão personalizada para outro prospect. Nenhum outro arquivo do
 * projeto deve ser tocado para uma troca de marca padrão.
 *
 * PASSO A PASSO PARA ADAPTAR A UM NOVO CLIENTE (leva poucos minutos):
 *   1. Troque "name" e "slogan" pelo nome e frase de efeito da barbearia.
 *   2. Ajuste "colors" para a paleta da marca (use ferramentas como
 *      mycolor.space ou colorhunt.co para gerar uma paleta harmônica).
 *   3. Troque "logo" pelo caminho de um SVG/PNG do logo real (ou mantenha
 *      o placeholder em assets/logo.svg enquanto não houver arte final).
 *   4. Atualize "address", "mapUrl", "phone" e "hours" com os dados reais.
 *   5. Reescreva a lista "services" com os serviços, preços e durações reais.
 *   6. Reescreva a lista "barbers" com a equipe real (nome e especialidade;
 *      a foto é gerada automaticamente a partir das iniciais, sem precisar
 *      de arquivos de imagem).
 *   7. Troque "reviews" pelas avaliações reais do negócio (ou mantenha
 *      fictícias para fins de demonstração).
 *
 * Todo o restante do site (HTML, CSS e JS) lê exclusivamente estes dados.
 * ============================================================================
 */

const CONFIG = {
  business: {
    name: "Barbearia Aurora",
    slogan: "Estilo e precisão em cada corte",
    shortName: "Aurora",
    logo: "assets/logo.svg",
    phone: "(11) 4002-8922",
    whatsapp: "5511940028922",
    instagram: "@barbeariaaurora",
    address: "Rua das Palmeiras, 482 — Vila Madalena, São Paulo",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Rua+das+Palmeiras+482+Vila+Madalena+Sao+Paulo",
  },

  colors: {
    primary: "#1c1917",
    primaryLight: "#3a3532",
    secondary: "#b08a4c",
    accent: "#d4a44c",
    background: "#faf7f2",
    surface: "#ffffff",
    text: "#211d1a",
    textMuted: "#6f6660",
    border: "#e8e1d7",
    success: "#3f7d5c",
    error: "#b3432b",
  },

  hours: [
    { day: "Segunda-feira", open: null, close: null },
    { day: "Terça-feira", open: "09:00", close: "20:00" },
    { day: "Quarta-feira", open: "09:00", close: "20:00" },
    { day: "Quinta-feira", open: "09:00", close: "20:00" },
    { day: "Sexta-feira", open: "09:00", close: "21:00" },
    { day: "Sábado", open: "08:00", close: "18:00" },
    { day: "Domingo", open: null, close: null },
  ],

  services: [
    {
      id: "corte-classico",
      name: "Corte clássico",
      description: "Corte tradicional com tesoura e máquina, acabamento na navalha.",
      duration: 40,
      price: 65,
      icon: "scissors",
    },
    {
      id: "barba",
      name: "Barba completa",
      description: "Modelagem, toalha quente e acabamento com navalha.",
      duration: 30,
      price: 50,
      icon: "razor",
    },
    {
      id: "corte-barba",
      name: "Corte e barba",
      description: "Combo completo de corte e barba com acabamento premium.",
      duration: 65,
      price: 105,
      icon: "combo",
    },
    {
      id: "sobrancelha",
      name: "Sobrancelha na navalha",
      description: "Design e alinhamento de sobrancelha com navalha.",
      duration: 15,
      price: 25,
      icon: "brow",
    },
    {
      id: "platinado",
      name: "Platinado",
      description: "Descoloração completa com tratamento hidratante pós-química.",
      duration: 100,
      price: 180,
      icon: "spark",
    },
  ],

  barbers: [
    {
      id: "rafael",
      name: "Rafael Andrade",
      specialty: "Cortes clássicos e navalha",
      color: "#b08a4c",
    },
    {
      id: "diego",
      name: "Diego Souza",
      specialty: "Barba e degradê",
      color: "#3f7d5c",
    },
    {
      id: "junior",
      name: "Júnior Lima",
      specialty: "Coloração e platinados",
      color: "#4c6fb3",
    },
    {
      id: "marcos",
      name: "Marcos Villela",
      specialty: "Cortes modernos e visagismo",
      color: "#b3432b",
    },
  ],

  reviews: [
    {
      name: "Eduardo Ramos",
      rating: 5,
      comment: "Ambiente excelente e atendimento pontual. Saio sempre satisfeito com o resultado.",
    },
    {
      name: "Thiago Nogueira",
      rating: 5,
      comment: "Melhor barbearia da região. O Rafael entende exatamente o que eu peço.",
    },
    {
      name: "Bruno Castelli",
      rating: 4,
      comment: "Ótimo custo-benefício e agenda fácil de encaixar. Recomendo o combo de corte e barba.",
    },
    {
      name: "Felipe Aragão",
      rating: 5,
      comment: "Profissionais atenciosos e resultado sempre consistente. Virei cliente fixo.",
    },
  ],
};

export default CONFIG;
