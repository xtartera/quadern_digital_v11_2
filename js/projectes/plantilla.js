// Plantilla de projecte per al motor v10.1.
// Copia aquest fitxer, canvia'n el nom i edita només les dades.
// Després carrega'l des de index.html abans dels fitxers del motor.

window.PROJECT = {
  projectId: 'nou-projecte-id',
  id: 'nou-projecte-id',
  title: 'Títol del projecte',
  subtitle: 'Quadern digital interactiu',
  brandLabel: 'Quadern digital',
  institution: 'Nom del centre',
  eyebrow: 'Projecte educatiu',
  description: 'Descripció breu del dossier.',
  logo: 'assets/logo.png',
  cover: 'assets/portades/ldap.svg',
  coverBadgeTitle: 'PROJECTE',
  coverBadgeText: 'Configurar · Verificar · Analitzar',
  printFooter: 'Quadern digital · Centre / Projecte',
  exportPolicyMessage: 'Les evidències visuals no s’exporten ni s’importen; han de romandre al dispositiu original de l’alumne.',
  activities: [
    {
      title: 'Nom de l’activitat',
      objective: 'Objectiu breu de l’activitat.',
      steps: [
        {
          id: '1.1',
          title: 'Títol del pas',
          evidence: 'both', // 'text', 'image', 'both' o 'none'
          allowMultipleImages: false,
          prompt: 'Instruccions del pas.',
          tasks: ['Tasca 1', 'Tasca 2'],
          codeLang: 'bash',
          code: 'echo "exemple"',
          note: 'Orientació opcional.'
        }
      ]
    }
  ]
};

window.QUADERN_DADES = window.PROJECT;
