window.PROJECT = {
  projectId: "projecte23-ldap-multiusuari-validat",
  id: "projecte23-ldap-multiusuari-validat",
  title: "Projecte 23 – LDAP ampliat, validat i preparat per multiusuari",
  subtitle: "Quadern digital interactiu",
  description: "Ampliació del servidor LDAP del Projecte 22 per suportar múltiples usuaris, validar coherència de dades i preparar la integració amb Linux, SSSD i perfils mòbils.",
  cover: "assets/portades/Portada23.svg",
  logo: "assets/logo.png",

  settings: {
    defaultEvidence: {
      text: true,
      image: true,
      multipleImages: false
    },
    exportImages: false,
    importImages: false,
    integrityControl: true
  },

  activities: [
    {
      id: "act1",
      tag: "Activitat 1",
      title: "Crear usuaris addicionals",
      objective: "Afegir usuaris LDAP reals que funcionaran després amb Linux.",
      steps: [
        {
          id: "1.1",
          title: "Generar el hash de contrasenya",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Genera un hash segur per a la contrasenya comuna dels usuaris LDAP.",
          tasks: [
            "Executa la comanda per generar el hash.",
            "Copia el hash generat.",
            "Fes una captura on es vegi el hash parcialment.",
            "Explica per què no es guarda la contrasenya en text pla dins LDAP."
          ],
          codeLang: "bash",
          code: "slappasswd -s pirineus"
        },
        {
          id: "1.2",
          title: "Crear el fitxer usuaris-multi.ldif",
          evidence: "both",
          allowMultipleImages: true,
          prompt: "Crea el fitxer LDIF amb els grups i usuaris nous.",
          tasks: [
            "Crea el fitxer usuaris-multi.ldif.",
            "Afegeix el grup POSIX d’alumne1.",
            "Afegeix l’usuari LDAP alumne1.",
            "Afegeix el grup POSIX d’alumne2.",
            "Afegeix l’usuari LDAP alumne2.",
            "Afegeix el grup POSIX de professor1.",
            "Afegeix l’usuari LDAP professor1.",
            "Substitueix {SSHA}HASH pel hash generat.",
            "Fes captures del fitxer complet.",
            "Explica per què cada usuari necessita també un grup POSIX."
          ],
          codeLang: "ldif",
          code:
            "dn: cn=alumne1,ou=grups,dc=lafita,dc=local\n" +
            "objectClass: posixGroup\n" +
            "cn: alumne1\n" +
            "gidNumber: 10007\n" +
            "memberUid: alumne1\n\n" +
            "dn: uid=alumne1,ou=usuaris,dc=lafita,dc=local\n" +
            "objectClass: inetOrgPerson\n" +
            "objectClass: posixAccount\n" +
            "objectClass: shadowAccount\n" +
            "uid: alumne1\n" +
            "cn: Alumne Un\n" +
            "sn: Un\n" +
            "uidNumber: 10007\n" +
            "gidNumber: 10007\n" +
            "homeDirectory: /home/alumne1\n" +
            "loginShell: /bin/bash\n" +
            "userPassword: {SSHA}HASH\n\n" +
            "dn: cn=alumne2,ou=grups,dc=lafita,dc=local\n" +
            "objectClass: posixGroup\n" +
            "cn: alumne2\n" +
            "gidNumber: 10008\n" +
            "memberUid: alumne2\n\n" +
            "dn: uid=alumne2,ou=usuaris,dc=lafita,dc=local\n" +
            "objectClass: inetOrgPerson\n" +
            "objectClass: posixAccount\n" +
            "objectClass: shadowAccount\n" +
            "uid: alumne2\n" +
            "cn: Alumne Dos\n" +
            "sn: Dos\n" +
            "uidNumber: 10008\n" +
            "gidNumber: 10008\n" +
            "homeDirectory: /home/alumne2\n" +
            "loginShell: /bin/bash\n" +
            "userPassword: {SSHA}HASH\n\n" +
            "dn: cn=professor1,ou=grups,dc=lafita,dc=local\n" +
            "objectClass: posixGroup\n" +
            "cn: professor1\n" +
            "gidNumber: 10009\n" +
            "memberUid: professor1\n\n" +
            "dn: uid=professor1,ou=usuaris,dc=lafita,dc=local\n" +
            "objectClass: inetOrgPerson\n" +
            "objectClass: posixAccount\n" +
            "objectClass: shadowAccount\n" +
            "uid: professor1\n" +
            "cn: Professor Un\n" +
            "sn: Un\n" +
            "uidNumber: 10009\n" +
            "gidNumber: 10009\n" +
            "homeDirectory: /home/professor1\n" +
            "loginShell: /bin/bash\n" +
            "userPassword: {SSHA}HASH",
          note: "Substitueix totes les aparicions de {SSHA}HASH pel hash generat al pas anterior."
        },
        {
          id: "1.3",
          title: "Importar els usuaris",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Importa els grups i usuaris nous al directori LDAP.",
          tasks: [
            "Executa ldapadd amb el fitxer usuaris-multi.ldif.",
            "Introdueix la contrasenya de l’administrador LDAP.",
            "Fes una captura del resultat de la importació.",
            "Explica què indica una importació correcta."
          ],
          codeLang: "bash",
          code: "ldapadd -x -D \"cn=admin,dc=lafita,dc=local\" -W -f usuaris-multi.ldif\n# Password: pirineus"
        }
      ]
    },

    {
      id: "act2",
      tag: "Activitat 2",
      title: "Verificació estructural",
      objective: "Confirmar que tots els usuaris existeixen correctament dins LDAP.",
      steps: [
        {
          id: "2.1",
          title: "Comprovar els usuaris",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Verifica que alumne1, alumne2 i professor1 existeixen dins LDAP.",
          tasks: [
            "Executa una cerca per a alumne1.",
            "Executa una cerca per a alumne2.",
            "Executa una cerca per a professor1.",
            "Fes una captura dels resultats.",
            "Explica quin atribut identifica cada usuari LDAP."
          ],
          codeLang: "bash",
          code: "ldapsearch -x uid=alumne1\nldapsearch -x uid=alumne2\nldapsearch -x uid=professor1"
        },
        {
          id: "2.2",
          title: "Comprovar atributs crítics",
          evidence: "text",
          allowMultipleImages: false,
          prompt: "Comprova que cada usuari té els atributs necessaris per funcionar amb Linux.",
          tasks: [
            "Comprova que existeix uid.",
            "Comprova que existeix uidNumber.",
            "Comprova que existeix gidNumber.",
            "Comprova que existeix homeDirectory.",
            "Comprova que existeix loginShell.",
            "Comprova que existeix userPassword.",
            "Explica per què Linux necessita aquests atributs."
          ],
          codeLang: "text",
          code:
            "Atributs crítics:\n" +
            "uid\n" +
            "uidNumber\n" +
            "gidNumber\n" +
            "homeDirectory\n" +
            "loginShell\n" +
            "userPassword",
          note: "Sense aquests atributs, Linux no podrà utilitzar correctament l’usuari amb SSSD."
        }
      ]
    },

    {
      id: "act3",
      tag: "Activitat 3",
      title: "Validació d’autenticació real",
      objective: "Comprovar que les contrasenyes dels usuaris funcionen correctament.",
      steps: [
        {
          id: "3.1",
          title: "Provar autenticació LDAP",
          evidence: "both",
          allowMultipleImages: true,
          prompt: "Valida que els usuaris nous poden autenticar-se contra LDAP.",
          tasks: [
            "Executa ldapwhoami per a alumne1.",
            "Executa ldapwhoami per a alumne2.",
            "Executa ldapwhoami per a professor1.",
            "Introdueix la contrasenya pirineus.",
            "Comprova que retorna el DN correcte.",
            "Fes captures dels resultats.",
            "Explica per què aquesta prova és imprescindible abans del Projecte 24."
          ],
          codeLang: "bash",
          code:
            "ldapwhoami -x -D \"uid=alumne1,ou=usuaris,dc=lafita,dc=local\" -W\n" +
            "ldapwhoami -x -D \"uid=alumne2,ou=usuaris,dc=lafita,dc=local\" -W\n" +
            "ldapwhoami -x -D \"uid=professor1,ou=usuaris,dc=lafita,dc=local\" -W\n" +
            "# Password: pirineus",
          note: "Resultat correcte esperat: dn:uid=alumneX,ou=usuaris,dc=lafita,dc=local"
        }
      ]
    },

    {
      id: "act4",
      tag: "Activitat 4",
      title: "Validació de coherència",
      objective: "Evitar errors que poden trencar SSSD, NFS o el funcionament multiusuari.",
      steps: [
        {
          id: "4.1",
          title: "Revisar UID duplicats",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Comprova que cada usuari té un UID únic.",
          tasks: [
            "Executa la cerca de uidNumber.",
            "Comprova que no hi ha UID duplicats.",
            "Fes una captura del resultat.",
            "Explica què passaria si dos usuaris tinguessin el mateix UID."
          ],
          codeLang: "bash",
          code: "ldapsearch -x uidNumber"
        },
        {
          id: "4.2",
          title: "Revisar GID coherents",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Comprova que els GID són coherents amb els grups dels usuaris.",
          tasks: [
            "Executa la cerca de gidNumber.",
            "Comprova que cada grup té el GID correcte.",
            "Fes una captura del resultat.",
            "Explica per què el GID ha de coincidir amb el grup principal de l’usuari."
          ],
          codeLang: "bash",
          code: "ldapsearch -x gidNumber"
        },
        {
          id: "4.3",
          title: "Revisar homeDirectory",
          evidence: "text",
          allowMultipleImages: false,
          prompt: "Comprova que els directoris personals estan definits correctament.",
          tasks: [
            "Verifica que alumne1 té /home/alumne1.",
            "Verifica que alumne2 té /home/alumne2.",
            "Verifica que professor1 té /home/professor1.",
            "Comprova que no apareix /perfils/usuari.",
            "Explica per què Linux treballa amb /home abans de muntar NFS."
          ],
          codeLang: "text",
          code:
            "Correcte:\n" +
            "/home/alumne1\n" +
            "/home/alumne2\n" +
            "/home/professor1\n\n" +
            "Incorrecte en aquesta fase:\n" +
            "/perfils/alumne1",
          note: "Els perfils NFS es muntaran posteriorment. LDAP ha d’indicar el home lògic de Linux."
        }
      ]
    },

    {
      id: "act5",
      tag: "Activitat 5",
      title: "Simulació de càrrega real",
      objective: "Comprovar que LDAP respon correctament a consultes globals i filtrades.",
      steps: [
        {
          id: "5.1",
          title: "Consulta global",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Executa una consulta global sobre tota la base LDAP.",
          tasks: [
            "Executa ldapsearch sobre dc=lafita,dc=local.",
            "Comprova que retorna usuaris i grups.",
            "Fes una captura del resultat.",
            "Explica què permet comprovar aquesta cerca."
          ],
          codeLang: "bash",
          code: "ldapsearch -x -LLL -b \"dc=lafita,dc=local\""
        },
        {
          id: "5.2",
          title: "Filtrar usuaris POSIX",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Filtra les entrades que representen usuaris Linux.",
          tasks: [
            "Executa la consulta amb objectClass=posixAccount.",
            "Comprova que apareixen els usuaris LDAP.",
            "Fes una captura del resultat.",
            "Explica per què posixAccount és important per Linux."
          ],
          codeLang: "bash",
          code: "ldapsearch -x \"(objectClass=posixAccount)\""
        },
        {
          id: "5.3",
          title: "Filtrar grups POSIX",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Filtra les entrades que representen grups compatibles amb Linux.",
          tasks: [
            "Executa la consulta amb objectClass=posixGroup.",
            "Comprova que apareixen els grups.",
            "Fes una captura del resultat.",
            "Explica per què posixGroup és important per Linux."
          ],
          codeLang: "bash",
          code: "ldapsearch -x \"(objectClass=posixGroup)\""
        }
      ]
    },

    {
      id: "act6",
      tag: "Activitat 6",
      title: "Diagnosi d’errors reals",
      objective: "Interpretar errors habituals abans de la integració amb Linux.",
      steps: [
        {
          id: "6.1",
          title: "Analitzar errors LDAP",
          evidence: "text",
          allowMultipleImages: false,
          prompt: "Analitza errors habituals que poden aparèixer en crear o validar usuaris LDAP.",
          tasks: [
            "Explica què significa ldap_add: Already exists.",
            "Explica què significa No such object.",
            "Explica què significa Invalid credentials.",
            "Explica què passa si falta uidNumber.",
            "Explica què passa si falta gidNumber.",
            "Indica quin error seria més crític per al Projecte 24."
          ],
          codeLang: "text",
          code:
            "already exists → l’entrada ja existeix\n" +
            "No such object → DN o unitat organitzativa incorrecta\n" +
            "Invalid credentials → contrasenya o DN d’accés incorrecte\n" +
            "falta uidNumber/gidNumber → Linux no podrà identificar correctament l’usuari"
        }
      ]
    },

    {
      id: "act7",
      tag: "Activitat 7",
      title: "Preparació per al Projecte 24",
      objective: "Confirmar que LDAP està llest per a la integració amb Linux mitjançant SSSD.",
      steps: [
        {
          id: "7.1",
          title: "Completar checklist final",
          evidence: "text",
          allowMultipleImages: false,
          prompt: "Revisa que LDAP compleix totes les condicions necessàries per al Projecte 24.",
          tasks: [
            "Confirma que xavier existeix.",
            "Confirma que alumne1 existeix.",
            "Confirma que alumne2 existeix.",
            "Confirma que professor1 existeix.",
            "Confirma que tots tenen uidNumber.",
            "Confirma que tots tenen gidNumber.",
            "Confirma que tots tenen homeDirectory.",
            "Confirma que tots tenen loginShell.",
            "Confirma que ldapwhoami funciona per tots.",
            "Escriu una conclusió breu sobre si LDAP està preparat per SSSD."
          ],
          codeLang: "text",
          code:
            "[ ] xavier existeix\n" +
            "[ ] alumne1 existeix\n" +
            "[ ] alumne2 existeix\n" +
            "[ ] professor1 existeix\n" +
            "[ ] Tots tenen uidNumber\n" +
            "[ ] Tots tenen gidNumber\n" +
            "[ ] Tots tenen homeDirectory\n" +
            "[ ] Tots tenen loginShell\n" +
            "[ ] ldapwhoami funciona per tots",
          note: "Aquest checklist determina si el servidor LDAP està preparat per ser utilitzat pel client Linux al Projecte 24."
        }
      ]
    }
  ]
};

window.QUADERN_DADES = window.PROJECT;