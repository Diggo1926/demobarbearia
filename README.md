# Demo de Agendamento — Barbearia Aurora

Demo comercial de sistema de agendamento para barbearia. Frontend puro (HTML, CSS e JavaScript vanilla, em módulos ES), sem backend, sem banco de dados e sem envio real de dados. Toda a disponibilidade de horários é simulada em memória no navegador.

## Como rodar localmente

Este projeto não tem etapa de build, mas precisa ser servido por HTTP (módulos ES e o service worker não funcionam abrindo o `index.html` direto pelo `file://`).

Com Node instalado:

```bash
npx serve .
```

Ou com Python:

```bash
python -m http.server 5500
```

Depois acesse o endereço indicado no terminal (ex.: `http://localhost:5500`).

## Como implantar no Vercel

1. Suba a pasta para um repositório Git (GitHub, GitLab ou Bitbucket).
2. Na Vercel, clique em **Add New Project** e importe o repositório.
3. Em **Framework Preset**, selecione **Other** — não há comando de build nem diretório de saída a configurar.
4. Clique em **Deploy**. Como é um site estático, a implantação é imediata.

Alternativamente, usando a CLI da Vercel dentro da pasta do projeto:

```bash
vercel --prod
```

## Como adaptar para um novo prospect

Toda a personalização fica concentrada em **`config.js`**, na raiz do projeto. Nenhum outro arquivo precisa ser alterado para uma troca de marca padrão. Edite:

| Campo em `config.js` | O que muda |
|---|---|
| `business.name`, `business.slogan`, `business.shortName` | Nome e frase de efeito exibidos em toda a página |
| `business.logo` | Caminho do arquivo de logo (SVG ou PNG) |
| `business.phone`, `business.whatsapp`, `business.instagram` | Contatos exibidos no rodapé |
| `business.address`, `business.mapUrl` | Endereço e link de mapa no rodapé |
| `colors` | Paleta de cores da marca (aplicada via variáveis CSS em tempo de execução) |
| `hours` | Horário de funcionamento por dia da semana — define também quais dias aparecem como disponíveis no agendamento |
| `services` | Lista de serviços com nome, descrição, duração (em minutos) e preço |
| `barbers` | Equipe exibida na landing page e na etapa de seleção de profissional (a foto é gerada automaticamente a partir das iniciais do nome) |
| `reviews` | Avaliações exibidas na seção de prova social |

Para trocar o logo por uma arte definitiva, substitua o arquivo apontado por `business.logo` (por padrão, `assets/logo.svg`) mantendo o mesmo nome de arquivo, ou aponte para um novo caminho dentro de `assets/`.

## Estrutura do projeto

```
config.js                 Configuração de marca (fonte única de verdade)
index.html                 Estrutura da página (landing + fluxo de agendamento)
manifest.json               Manifesto PWA
sw.js                       Service worker (estratégia network-first)
css/
  tokens.css                 Design tokens (cor, espaçamento, raio, tipografia)
  base.css                    Reset e estilos base
  layout.css                  Estrutura de seções e páginas
  components.css              Componentes (cards, botões, formulário, resumo)
  booking.css                 Estilos específicos do fluxo de agendamento
  animations.css               Keyframes e transições
js/
  app.js                       Controlador principal — estado e navegação
  theme.js                     Aplica config.js ao documento (cores, textos)
  render-home.js                Renderiza as seções da landing page
  render-booking.js             Renderiza cada etapa do agendamento
  availability.js                Gera a disponibilidade simulada
  avatar.js                       Gera avatar (iniciais) a partir do nome
  icons.js                         Ícones SVG inline
  utils.js                          Formatação, validação e utilidades
  pwa.js                             Registro do service worker
assets/
  logo.svg                     Logo placeholder
  icon-maskable.svg             Ícone do PWA
```

## Sobre o fluxo de agendamento

O fluxo é inteiramente client-side: serviço, profissional, data/horário e dados do cliente ficam apenas em memória durante a navegação. Nenhuma informação é enviada a um servidor — o formulário final é puramente ilustrativo, encerrando em uma tela de confirmação simulada.
