<template>
  <div class="page-wrapper researchers-page">
    <!-- ============ HERO / DESTAQUES ============ -->
    <section class="hero">
      <v-container class="hero-container" fluid>
        <div class="hero-inner">
          <p class="hero-title">Conheça nossos pesquisadores</p>

          <v-row class="hero-row" align="stretch" justify="center">
            <!-- Cards de destaque (Eduardo / Elian) -->
            <v-col v-for="lead in leads" :key="lead.name" cols="12">
              <div class="lead-card">
                <div class="lead-avatar-shell">
                  <v-img
                    :src="lead.avatar"
                    class="lead-avatar"
                    cover
                    :alt="'Foto de ' + lead.name"
                  />
                </div>

                <div class="lead-content">
                  <p class="lead-name">{{ lead.name }}</p>
                  <p v-if="lead.role" class="lead-role">
                    {{ lead.role }}
                  </p>
                  <p class="lead-description">
                    {{ lead.bio }}
                  </p>

                  <!-- Sempre mostra os chips; desativa quando não tiver link -->
                  <div class="lead-links">
                    <!-- Lattes -->
                    <template v-if="lead.lattes">
                      <a
                        :href="lead.lattes"
                        class="link-chip"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <v-icon size="18" class="mr-1"> mdi-file-document-outline </v-icon>
                        Lattes
                      </a>
                    </template>
                    <template v-else>
                      <span class="link-chip disabled">
                        <v-icon size="18" class="mr-1"> mdi-file-document-outline </v-icon>
                        Lattes
                      </span>
                    </template>

                    <!-- ORCID -->
                    <template v-if="lead.orcid">
                      <a
                        :href="lead.orcid"
                        class="link-chip"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <v-icon size="18" class="mr-1"> mdi-identifier </v-icon>
                        ORCID
                      </a>
                    </template>
                    <template v-else>
                      <span class="link-chip disabled">
                        <v-icon size="18" class="mr-1"> mdi-identifier </v-icon>
                        ORCID
                      </span>
                    </template>

                    <!-- E-mail -->
                    <template v-if="lead.email">
                      <a :href="'mailto:' + lead.email" class="link-chip">
                        <v-icon size="18" class="mr-1"> mdi-email-outline </v-icon>
                        E-mail
                      </a>
                    </template>
                    <template v-else>
                      <span class="link-chip disabled">
                        <v-icon size="18" class="mr-1"> mdi-email-outline </v-icon>
                        E-mail
                      </span>
                    </template>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </section>

    <!-- ============ PORTUGUESES ============ -->
    <section class="section section-list">
      <v-container class="site-container">
        <p class="section-title center">Pesquisadores portugueses</p>

        <div class="researcher-list">
          <article v-for="r in ptResearchers" :key="r.name" class="researcher-card">
            <div class="researcher-header">
              <v-avatar size="96" class="researcher-avatar">
                <v-img :src="r.avatar" :alt="'Foto de ' + r.name" cover />
              </v-avatar>

              <div class="researcher-heading-text">
                <h3 class="researcher-name">{{ r.name }}</h3>
                <p v-if="r.role" class="researcher-role">
                  {{ r.role }}
                </p>
              </div>
            </div>

            <p class="researcher-bio">
              {{ r.bio }}
            </p>

            <!-- Sempre mostra CV / ORCID / Email -->
            <div class="researcher-links">
              <!-- CV -->
              <template v-if="r.cv">
                <a :href="r.cv" class="link-chip small" target="_blank" rel="noopener noreferrer">
                  <v-icon size="18" class="mr-1"> mdi-file-document-outline </v-icon>
                  CV
                </a>
              </template>
              <template v-else>
                <span class="link-chip small disabled">
                  <v-icon size="18" class="mr-1"> mdi-file-document-outline </v-icon>
                  CV
                </span>
              </template>

              <!-- ORCID -->
              <template v-if="r.orcid">
                <a
                  :href="r.orcid"
                  class="link-chip small"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <v-icon size="18" class="mr-1"> mdi-identifier </v-icon>
                  ORCID
                </a>
              </template>
              <template v-else>
                <span class="link-chip small disabled">
                  <v-icon size="18" class="mr-1"> mdi-identifier </v-icon>
                  ORCID
                </span>
              </template>

              <!-- E-mail -->
              <template v-if="r.email">
                <a :href="'mailto:' + r.email" class="link-chip small">
                  <v-icon size="18" class="mr-1"> mdi-email-outline </v-icon>
                  E-mail
                </a>
              </template>
              <template v-else>
                <span class="link-chip small disabled">
                  <v-icon size="18" class="mr-1"> mdi-email-outline </v-icon>
                  E-mail
                </span>
              </template>
            </div>
          </article>
        </div>
      </v-container>
    </section>

    <!-- ============ FRANCESAS ============ -->
    <section class="section section-list alt">
      <v-container class="site-container">
        <p class="section-title center">Pesquisadoras francesas</p>

        <div class="researcher-list">
          <article v-for="r in frResearchers" :key="r.name" class="researcher-card">
            <div class="researcher-header">
              <v-avatar size="96" class="researcher-avatar">
                <v-img :src="r.avatar" :alt="'Foto de ' + r.name" cover />
              </v-avatar>

              <div class="researcher-heading-text">
                <h3 class="researcher-name">{{ r.name }}</h3>
                <p v-if="r.role" class="researcher-role">
                  {{ r.role }}
                </p>
              </div>
            </div>

            <p class="researcher-bio">
              {{ r.bio }}
            </p>

            <div class="researcher-links">
              <!-- CV -->
              <template v-if="r.cv">
                <a :href="r.cv" class="link-chip small" target="_blank" rel="noopener noreferrer">
                  <v-icon size="18" class="mr-1"> mdi-file-document-outline </v-icon>
                  CV
                </a>
              </template>
              <template v-else>
                <span class="link-chip small disabled">
                  <v-icon size="18" class="mr-1"> mdi-file-document-outline </v-icon>
                  CV
                </span>
              </template>

              <!-- ORCID -->
              <template v-if="r.orcid">
                <a
                  :href="r.orcid"
                  class="link-chip small"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <v-icon size="18" class="mr-1"> mdi-identifier </v-icon>
                  ORCID
                </a>
              </template>
              <template v-else>
                <span class="link-chip small disabled">
                  <v-icon size="18" class="mr-1"> mdi-identifier </v-icon>
                  ORCID
                </span>
              </template>

              <!-- E-mail -->
              <template v-if="r.email">
                <a :href="'mailto:' + r.email" class="link-chip small">
                  <v-icon size="18" class="mr-1"> mdi-email-outline </v-icon>
                  E-mail
                </a>
              </template>
              <template v-else>
                <span class="link-chip small disabled">
                  <v-icon size="18" class="mr-1"> mdi-email-outline </v-icon>
                  E-mail
                </span>
              </template>
            </div>
          </article>
        </div>
      </v-container>
    </section>

    <!-- ============ PESQUISADORES BRASILEIROS ============ -->
    <section class="section section-list">
      <v-container class="site-container">
        <p class="section-title center">Pesquisadores (Brasil)</p>

        <div class="researcher-list">
          <article v-for="r in sortedBrResearchers" :key="r.name" class="researcher-card">
            <div class="researcher-header">
              <v-avatar size="96" class="researcher-avatar">
                <v-img :src="r.avatar" :alt="'Foto de ' + r.name" cover />
              </v-avatar>

              <div class="researcher-heading-text">
                <h3 class="researcher-name">{{ r.name }}</h3>
                <p v-if="r.role" class="researcher-role">
                  {{ r.role }}
                </p>
              </div>
            </div>

            <p class="researcher-bio">
              {{ r.bio }}
            </p>

            <div class="researcher-links">
              <!-- Lattes -->
              <template v-if="r.lattes">
                <a
                  :href="r.lattes"
                  class="link-chip small"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <v-icon size="18" class="mr-1"> mdi-file-document-outline </v-icon>
                  Lattes
                </a>
              </template>
              <template v-else>
                <span class="link-chip small disabled">
                  <v-icon size="18" class="mr-1"> mdi-file-document-outline </v-icon>
                  Lattes
                </span>
              </template>

              <!-- CV -->
              <template v-if="r.cv">
                <a :href="r.cv" class="link-chip small" target="_blank" rel="noopener noreferrer">
                  <v-icon size="18" class="mr-1"> mdi-file-document-outline </v-icon>
                  CV
                </a>
              </template>
              <template v-else>
                <span class="link-chip small disabled">
                  <v-icon size="18" class="mr-1"> mdi-file-document-outline </v-icon>
                  CV
                </span>
              </template>

              <!-- ORCID -->
              <template v-if="r.orcid">
                <a
                  :href="r.orcid"
                  class="link-chip small"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <v-icon size="18" class="mr-1"> mdi-identifier </v-icon>
                  ORCID
                </a>
              </template>
              <template v-else>
                <span class="link-chip small disabled">
                  <v-icon size="18" class="mr-1"> mdi-identifier </v-icon>
                  ORCID
                </span>
              </template>

              <!-- E-mail -->
              <template v-if="r.email">
                <a :href="'mailto:' + r.email" class="link-chip small">
                  <v-icon size="18" class="mr-1"> mdi-email-outline </v-icon>
                  E-mail
                </a>
              </template>
              <template v-else>
                <span class="link-chip small disabled">
                  <v-icon size="18" class="mr-1"> mdi-email-outline </v-icon>
                  E-mail
                </span>
              </template>
            </div>
          </article>
        </div>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'

  type Researcher = {
    name: string
    role?: string
    bio: string
    avatar: string
    lattes?: string
    cv?: string
    orcid?: string
    email?: string
  }

  /* ===== DESTQUES HERO ===== */
  const eduardo: Researcher = {
    name: 'Eduardo Calil',
    role: 'Pesquisador do CNPq e professor titular da Universidade Federal de Alagoas (Ufal)',
    avatar: '/imgs/researchers/no_img.png',
    bio: 'Pesquisador do CNPq e professor titular da Universidade Federal de Alagoas (Ufal), com atuação nos Programas de Pós-Graduação em Educação (PPGE) e em Linguística e Literatura (PPGLL). Coordena o Laboratório do Manuscrito Escolar (LAME) e lidera projetos de colaboração internacional com instituições da França e de Portugal. Concebeu o Sistema Ramos, metodologia original voltada ao estudo da autoria em escritas infantis, valorizando dimensões como criatividade, rasura e atividades metalinguísticas — aspectos que revelam os processos de construção do pensamento e da linguagem na infância.',
    lattes: 'http://lattes.cnpq.br/6822339713125905',
    orcid: 'https://orcid.org/0000-0002-8696-3697',
    email: 'calil@cedu.ufal.br',
  }

  const elian: Researcher = {
    name: 'Elian da Silva Santos Leite',
    role: 'Pesquisadora do Laboratório do Manuscrito Escolar (LAME)',
    avatar: '/imgs/researchers/no_img.png',
    bio: 'Doutora em Educação pela Universidade Federal de Alagoas (UFAL), com especialização em Linguagem e Práticas Sociais pelo Instituto Federal de Alagoas (IFAL). Áreas de investigação abrangem: (i) o ensino e a avaliação da produção textual em contexto escolar; (ii) a avaliação da complexidade lexical; (iii) a aplicação de tecnologia ao estudo da escrita; (iv) a formação de professores; (v) o desenvolvimento de conteúdos pedagógicos para a Educação a Distância (EAD).',
    lattes: 'https://lattes.cnpq.br/4053214001115674',
    orcid: 'https://orcid.org/0000-0002-0588-9019',
    email: 'elian.santos@cedu.ufal.br',
  }

  const leads = [eduardo, elian]

  /* ===== BRASIL ===== */
  const brResearchers = ref<Researcher[]>([
    {
      name: 'Adna de Almeida Lopes',
      avatar: '/imgs/researchers/no_img.png',
      bio: 'Professora Associada nível 03, classe D, Universidade Federal de Alagoas. Docente orientadora temporária da Coordenação de Aperfeiçoamento de Pessoal de Nível Superior (Capes) e temporária da Universidade Aberta do Brasil (UAB). Doutora em Linguística pela Universidade Federal de Alagoas. Tem experiência na área de Linguística, com ênfase em Psicolinguística, atuando principalmente nos seguintes temas: ensino de língua, escrita, ensino, gênero textual e produção de texto.',
      lattes: 'http://lattes.cnpq.br/4061859895008214',
      email: 'adnalopes@globo.com',
    },
    {
      name: 'Cristina Felipeto',
      avatar: '/imgs/researchers/no_img.png',
      bio: 'Professora Associada da Universidade Federal de Alagoas (Ufal). Atua no Programa de Pós-Graduação em Linguística e Literatura (PPGLL/Ufal). Integrante do Laboratório do Manuscrito Escolar (LAME) e do grupo de pesquisa Ensino, Texto e Criação (ET&C). Integra áreas como Linguística, Genética Textual e Psicologia Cognitiva para investigar questões relacionadas à ortografia, rasuras, metalinguagem, pausas, dentre outras, em processos de produção textual em sala de aula.',
      lattes: 'http://lattes.cnpq.br/7535091198670076',
      orcid: 'https://orcid.org/0000-0003-3729-0796',
      email: 'cristinafelipeto@fale.ufal.br',
    },
    {
      name: 'Eudes da Silva Santos',
      avatar: '/imgs/researchers/no_img.png',
      bio: 'Professor Adjunto da Universidade Federal do Agreste de Pernambuco (UFAPE) e do Programa de Pós-Graduação do Mestrado Profissional em Letras (UFAPE). Doutor em Educação pela Universidade Federal de Alagoas. Integrante do Laboratório do Manuscrito Escolar (LAME), do Grupo de Pesquisa Ensino, Texto e Criação (ET&C) e do grupo de pesquisa Texto, Escrita e Sala de Aula (TEcSA/UFAPE).',
      lattes: 'http://lattes.cnpq.br/8701527300251171',
      orcid: 'https://orcid.org/0009-0001-0482-925X',
      email: 'eudes.santos@ufape.edu.br',
    },
    {
      name: 'Janaína Ligya da Rocha Queiroz',
      avatar: '/imgs/researchers/no_img.png',
      bio: 'Doutora em Linguística pela Universidade Federal de Alagoas. Integrante do Laboratório do Manuscrito Escolar (LAME) e do Grupo de Pesquisa Ensino, Texto e Criação (ET&C). É técnica da Secretaria de Estado da Educação de Maceió (SEDUC-AL), responsável pela formação de professores. Também atua como articuladora de ensino e coordenadora pedagógica do programa “Professor Mentor”.',
      lattes: 'http://lattes.cnpq.br/7713687190528505',
      orcid: 'https://orcid.org/0000-0001-5473-4091',
      email: 'ligyajanaina@gmail.com',
    },
    {
      name: 'Kall Anne Sheyla Amorim Braga',
      avatar: '/imgs/researchers/no_img.png',
      bio: 'Professora Adjunta da Universidade Federal Rural de Pernambuco (UFRPE). Atua no Programa de Pós-Graduação em Linguística e Literatura (PPGLL/Ufal). Doutora em Educação pela Universidade Federal de Alagoas (Ufal), com estágio sanduíche na Université Cergy-Pontoise (França). Integrante do Laboratório do Manuscrito Escolar (LAME), do Grupo de Pesquisa Ensino, Texto e Criação (ET&C/Ufal) e do Grupo de Pesquisa em Linguagem e Educação (GEPLE/UFRPE).',
      lattes: 'http://lattes.cnpq.br/9420229007650053',
      orcid: 'https://orcid.org/0000-0001-7753-6696',
      email: 'kall.braga@ufrpe.br',
    },
    {
      name: 'Lidiane Evangelista Lira',
      avatar: '/imgs/researchers/no_img.png',
      bio: 'Professora Adjunta da Universidade de Pernambuco (UPE, Campus Garanhuns). Atua na Coordenação da Brinquedoteca (UPE, campus Garanhuns). Doutora em Educação pela Universidade Federal de Alagoas, com estágio sanduíche na Université Cergy-Pontoise (França). Integrante do Laboratório do Manuscrito Escolar (LAME) e do Grupo de Pesquisa Ensino, Texto e Criação (ET&C).',
      lattes: 'http://lattes.cnpq.br/7428353456925450',
      orcid: 'https://orcid.org/0000-0003-1347-3088',
      email: 'lidiane.lira@upe.br',
    },
    {
      name: 'Maria Hozanete Alves de Lima',
      avatar: '/imgs/researchers/no_img.png',
      bio: 'Professora Titular do Departamento de Letras da Universidade Federal do Rio Grande do Norte (UFRN). Realizou estágio pós-doutoral no Institut de Textes et Manuscrits Modernes (ITEM, França). Atua no Programa de Pós-Graduação em Estudos da Linguagem (UFRN). Integrante do Laboratório do Manuscrito Escolar (LAME).',
      lattes: 'http://lattes.cnpq.br/6169626776821393',
      orcid: 'https://orcid.org/0000-0001-8916-2740',
      email: 'hozanetelima@gmail.com',
    },
    {
      name: 'Mauri Célio Alves Santana',
      avatar: '/imgs/researchers/no_img.png',
      bio: 'Doutor em Linguística pela Universidade Federal de Alagoas (UFAL). Integra o Laboratório do Manuscrito Escolar (LAME). Professor efetivo de Língua Portuguesa da rede estadual de Pernambuco e da rede municipal de Orocó, PE. Atua como orientador pedagógico da área de Linguagens e colaborador em projetos educacionais.',
      lattes: 'http://lattes.cnpq.br/8051609371154376',
      orcid: 'https://orcid.org/0000-0003-0627-2042',
      email: 'maurisantana2009@hotmail.com',
    },
    {
      name: 'Mayara Cordeiro da Silva',
      avatar: '/imgs/researchers/no_img.png',
      bio: 'Doutora em Educação pela Universidade Federal de Alagoas, com estágio doutoral na Universidade de Aveiro (Portugal). Integrante do LAME e do Grupo de Pesquisa Ensino, Texto e Criação (ET&C). Técnica Pedagógica responsável pela formação de professores da Secretaria de Educação de Maceió.',
      lattes: 'http://lattes.cnpq.br/8276751675885023',
      orcid: 'https://orcid.org/0000-0002-3379-9280',
      email: 'mayaracordeiro05@gmail.com',
    },
    {
      name: 'Míriam Pessôa Marques Bezerra',
      avatar: '/imgs/researchers/no_img.png',
      bio: 'Doutora em Linguística pela Universidade Federal de Alagoas, com estágio sanduíche na Universidade do Porto (Portugal). Integrante do LAME e do Grupo de Pesquisa Ensino, Texto e Criação (ET&C). Dedica-se aos estudos sobre escrita e criatividade.',
      lattes: 'http://lattes.cnpq.br/5567406252079736',
      orcid: 'https://orcid.org/0000-0002-4797-3024',
      email: 'miriam.pess.m@gmail.com',
    },
    {
      name: 'Rosiene Omena Bispo',
      avatar: '/imgs/researchers/no_img.png',
      bio: 'Doutora em Linguística pela UFAL. Professora desde 1993, com atuação nas redes municipal e estadual. Participou da implantação do Sistema Scliar de Alfabetização em São José da Laje e hoje atua com formação continuada de professores e acompanhamento de políticas de alfabetização.',
      lattes: 'https://lattes.cnpq.br/5574816454476606',
      orcid: 'https://orcid.org/0000-0002-1822-2811',
      email: 'rosyomena31@hotmail.com',
    },
    {
      name: 'Salézia Magna de Oliveira Costa',
      avatar: '/imgs/researchers/no_img.png',
      bio: 'Doutora em Educação pela UFAL. Integrante do LAME e do grupo ET&C. Tem ampla experiência em coordenação de programas educacionais, formação de professores, construção de referenciais curriculares e atuação como professora da Educação Básica.',
      lattes: 'http://lattes.cnpq.br/6581485586875129',
      orcid: 'https://orcid.org/0000-0002-3079-1304',
      email: 'saleziamagnacosta@gmail.com',
    },
    {
      name: 'Clemilton Pinheiro',
      avatar: '/imgs/researchers/no_img.png',
      bio: '',
    },
    {
      name: 'Maria Auxiliadora da Silva',
      avatar: '/imgs/researchers/no_img.png',
      bio: '',
    },
  ])

  const sortedBrResearchers = computed(() =>
    brResearchers.value
      // só mantém quem tem descrição/bio não vazia
      .filter(r => r.bio && r.bio.trim().length > 0)
      // continua ordenando alfabeticamente
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
  )

  /* ===== PORTUGAL ===== */
  const ptResearchers = ref<Researcher[]>([
    {
      name: 'Ana Luísa Costa',
      avatar: '/imgs/researchers/no_img.png',
      bio: 'Professora Associada da Escola Superior de Educação do Instituto Politécnico de Setúbal (ESE-IPS) e pesquisadora do CLUL. Atua em Linguística Educacional, Pedagogia Gramatical, Escrita e Formação de Professores.',
      cv: 'https://www.cienciavitae.pt/portal/AE1D-FC1A-3F3D',
      orcid: 'https://orcid.org/0000-0002-2529-4135',
      email: 'ana.costa@ese.ips.pt',
    },
    {
      name: 'Luís Filipe Barbeiro',
      avatar: '/imgs/researchers/no_img.png',
      bio: 'Professor e coordenador da Escola Superior de Educação e Ciências Sociais, Politécnico de Leiria. Doutor e agregado em Educação, com foco em didática da escrita, língua materna e não materna.',
      cv: 'https://cienciavitae.pt/6616-A3B7-75C9',
      orcid: 'https://orcid.org/0000-0001-5798-2904',
      email: 'luis.barbeiro@ipleiria.pt',
    },
    {
      name: 'Luciana Graça',
      avatar: '/imgs/researchers/no_img.png',
      bio: 'Professora Adjunta na Escola Superior de Educação do Instituto Politécnico de Viana do Castelo. Atua em Didática do Português (L1 e L2), Didática da Escrita e Oralidade e Formação de Professores.',
      cv: 'https://www.cienciavitae.pt/portal/3213-8D7F-ACAB',
      orcid: 'https://orcid.org/0000-0003-1384-9540',
      email: 'lucianagraca@ese.ipvc.pt',
    },
    {
      name: 'Maria Inês Almeida Cardoso',
      avatar: '/imgs/researchers/no_img.png',
      bio: 'Professora Adjunta no Instituto Politécnico de Santarém. Doutora em Didática. Atua na formação de educadores e professores, coordena o grupo ProTextos e integra centros de investigação em qualidade de vida e didática.',
      cv: 'https://www.cienciavitae.pt/portal/F212-7DB4-E007',
      orcid: 'https://orcid.org/0000-0003-2687-2424',
      email: 'inescardoso@ua.pt',
    },
    {
      name: 'Mariana Pinto',
      avatar: '/imgs/researchers/no_img.png',
      bio: 'Professora Adjunta da Escola Superior de Educação do Instituto Politécnico de Setúbal. Doutora em Didática e Formação (língua portuguesa). Pesquisa produção textual no Ensino Básico e didática da escrita.',
      cv: 'https://www.cienciavitae.pt/portal/9B11-9FC4-C097',
      orcid: 'https://orcid.org/0000-0002-3077-3202',
      email: 'mariana.pinto@ese.ips.pt',
    },
  ])

  /* ===== FRANÇA ===== */
  const frResearchers = ref<Researcher[]>([
    {
      name: 'Florence Mauroux',
      avatar: '/imgs/researchers/no_img.png',
      bio: 'Professora Adjunta do INSPE de Toulouse Occitanie-Pyrénées (Universidade de Toulouse-Jean Jaurès). Doutora em Ciências da Linguagem e membro do laboratório CLLE. Pesquisa leitura, escrita e competências metalinguísticas no Ensino Fundamental.',
      email: 'florence.mauroux@univ-tlse2.fr',
    },
    {
      name: 'Véronique Paolacci',
      avatar: '/imgs/researchers/no_img.png',
      bio: 'Professora Adjunta do INSPE de Toulouse Occitanie-Pyrénées. Doutora em Ciências da Linguagem e membro do CLLE. Atua em produção textual de aprendizes, didática da escrita, pontuação e segmentação frasal, além da formação de professores.',
      email: 'veronique.paolacci@univ-tlse2.fr',
      cv: 'https://inspe.univ-toulouse.fr/accueil/annuaire-inspe/mme-veronique-paolacci',
      orcid: 'https://orcid.org/0009-0001-8121-8524',
    },
  ])
</script>

<style scoped>
  .researchers-page {
    background: #f5f7fa;
  }

  .site-container {
    max-width: 1200px;
    margin-inline: auto;
    padding-inline: clamp(1rem, 4vw, 2.5rem);
  }

  /* HERO */
  .hero {
    padding-top: 96px;
  }

  .hero-container {
    display: flex;
    justify-content: center;
  }

  .hero-inner {
    width: 100%;
    max-width: 1220px;
    margin-inline: auto;
    padding-inline: clamp(1rem, 4vw, 2.5rem);
  }

  .hero-title {
    font-weight: 800;
    font-size: clamp(2.4rem, 3vw + 1rem, 3.1rem);
    line-height: 1.1;
    color: #0a0e1c;
    text-align: center;
    margin: 0 0 4rem;
  }

  .lead-card {
    display: grid;
    grid-template-columns: minmax(220px, 260px) minmax(0, 1fr);
    gap: 1.75rem;
    background: #ffffff;
    border-radius: 40px;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.16);
    padding: 1.75rem 2.5rem;
    margin-bottom: 1.75rem;
  }

  .lead-avatar-shell {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lead-avatar {
    width: 100%;
    max-width: 230px;
  }

  .lead-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .lead-name {
    font-weight: 700;
    font-size: 1.4rem;
    color: #0a0e1c;
    margin-bottom: 0.8rem;
  }

  .lead-role {
    font-weight: 500;
    font-size: 0.95rem;
    color: #ff8800;
    margin-bottom: 0.5rem;
  }

  .lead-description {
    font-size: 0.95rem;
    line-height: 1.7;
    color: #003b52;
    margin-bottom: 1rem;
  }

  .lead-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  /* SEÇÕES LISTA */

  .section {
    padding-block: clamp(3rem, 6vw, 4.5rem);
  }

  .section-list {
    background: #ffffff;
  }

  .section-list.alt {
    background: #f5f7fa;
  }

  .section-title {
    font-weight: 800;
    font-size: clamp(1.9rem, 2.3vw + 0.8rem, 2.4rem);
    line-height: 1.2;
    color: #0a0e1c;
    margin: 0 0 2rem;
  }

  .section-sub {
    font-size: 0.95rem;
    color: #5b6b7a;
    margin-bottom: 2rem;
  }

  .center {
    text-align: center;
  }

  .researcher-list {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }

  .researcher-card {
    background: #f8fafc;
    border-radius: 28px;
    padding: 1.5rem 1.75rem;
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.06);
  }

  .researcher-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }

  .researcher-avatar {
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
  }

  .researcher-heading-text {
    display: flex;
    flex-direction: column;
  }

  .researcher-name {
    margin: 0;
    font-weight: 700;
    font-size: 1.1rem;
    color: #0a0e1c;
  }

  .researcher-role {
    margin: 0.15rem 0 0;
    font-size: 0.9rem;
    color: #ff8800;
  }

  .researcher-bio {
    margin: 0.4rem 0 0.9rem;
    font-size: 0.95rem;
    line-height: 1.7;
    color: #003b52;
  }

  .researcher-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  /* chips */

  .link-chip {
    display: inline-flex;
    align-items: center;
    padding: 0.4rem 0.75rem;
    border-radius: 999px;
    background: #ff8800;
    color: #ffffff;
    font-size: 0.9rem;
    font-weight: 500;
    text-decoration: none;
    transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
    box-shadow: 0 6px 14px rgba(255, 136, 0, 0.4);
    cursor: pointer;
  }

  .link-chip.small {
    background: #0a0e1c;
    box-shadow: 0 3px 9px rgba(10, 14, 28, 0.4);
  }

  .link-chip:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.35);
  }

  /* desativado */
  .link-chip.disabled {
    background: #d1d7e0;
    color: #7b8494;
    box-shadow: none;
    cursor: default;
    pointer-events: none;
    opacity: 0.85;
  }

  .link-chip.disabled:hover {
    transform: none;
    box-shadow: none;
  }

  /* RESPONSIVO */

  @media (max-width: 960px) {
    .hero {
      padding-top: 90px;
      padding-bottom: 52px;
    }

    .lead-card {
      grid-template-columns: minmax(0, 1fr);
      text-align: left;
    }

    .lead-avatar-shell {
      justify-content: flex-start;
    }

    .lead-avatar {
      max-width: 260px;
    }
  }

  @media (max-width: 600px) {
    .lead-card {
      padding: 1.5rem 1.5rem;
    }

    .hero-title {
      text-align: left;
    }

    .researcher-card {
      padding: 1.25rem 1.25rem;
    }
  }
</style>
