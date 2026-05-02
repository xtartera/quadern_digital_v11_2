window.PROJECT = {
  projectId: "projecte22-ldap-funcional",
  id: "projecte22-ldap-funcional",
  title: "Projecte 22 – LDAP funcional preparat per integració",
  subtitle: "Quadern digital interactiu",
  description: "Implementació d’un servidor LDAP funcional amb OpenLDAP sobre Ubuntu Server 24.04, preparat per als projectes d’integració amb Linux, SSSD i perfils mòbils.",
  cover: "assets/portades/portada22.svg",
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
      title: "Instal·lació del servidor LDAP",
      objective: "Instal·lar OpenLDAP i comprovar que el servei LDAP està actiu i respon correctament.",
      steps: [
        {
          id: "1.1",
          title: "Instal·lar paquets LDAP",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Instal·la el servidor LDAP i les eines bàsiques de comprovació.",
          tasks: [
            "Executa l’actualització dels repositoris.",
            "Instal·la els paquets slapd i ldap-utils.",
            "Fes una captura on es vegi el final de la instal·lació sense errors.",
            "Explica breument la diferència entre slapd i ldap-utils."
          ],
          codeLang: "bash",
          code: "sudo apt update\nsudo apt install -y slapd ldap-utils",
          note: "slapd és el servidor LDAP. ldap-utils proporciona eines com ldapsearch, ldapadd i ldapwhoami."
        },
        {
          id: "1.2",
          title: "Configurar OpenLDAP",
          evidence: "both",
          allowMultipleImages: true,
          prompt: "Configura OpenLDAP amb el domini lafita.local i l’administrador LDAP.",
          tasks: [
            "Executa l’assistent de configuració de slapd.",
            "Configura el domini DNS com a lafita.local.",
            "Configura l’organització com a INS La Fita.",
            "Estableix la contrasenya de l’administrador com a pirineus.",
            "Fes captures de les pantalles principals de configuració.",
            "Explica quina base LDAP es crea a partir del domini lafita.local."
          ],
          codeLang: "bash",
          code: "sudo dpkg-reconfigure slapd",
          note:
            "Respostes recomanades:\n" +
            "Ometre configuració d'OpenLDAP? → No\n" +
            "Nom de domini DNS → lafita.local\n" +
            "Nom organització → INS La Fita\n" +
            "Password admin → pirineus\n" +
            "Motor → MDB\n" +
            "Eliminar base de dades → Sí\n" +
            "Moure base de dades → Sí\n" +
            "LDAPv2 → No\n\n" +
            "Aquesta configuració crea la base dc=lafita,dc=local."
        },
        {
          id: "1.3",
          title: "Comprovar el servei LDAP",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Comprova que el servei slapd està actiu.",
          tasks: [
            "Consulta l’estat del servei slapd.",
            "Verifica que apareix active (running).",
            "Fes una captura de l’estat del servei.",
            "Explica què significa que un servei estigui active (running)."
          ],
          codeLang: "bash",
          code: "systemctl status slapd"
        },
        {
          id: "1.4",
          title: "Fer una primera consulta LDAP",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Comprova que el servidor LDAP respon fent una consulta sobre la base del directori.",
          tasks: [
            "Executa una consulta ldapsearch sobre dc=lafita,dc=local.",
            "Comprova que el servidor retorna informació.",
            "Fes una captura clara del resultat.",
            "Explica què demostra aquesta consulta."
          ],
          codeLang: "bash",
          code: "ldapsearch -x -LLL -b \"dc=lafita,dc=local\"",
          note: "Si aquesta consulta retorna dades, el servidor LDAP ja respon correctament."
        }
      ]
    },

    {
      id: "act2",
      tag: "Activitat 2",
      title: "Crear estructura LDAP mínima",
      objective: "Crear les unitats organitzatives bàsiques per separar usuaris i grups dins del directori LDAP.",
      steps: [
        {
          id: "2.1",
          title: "Crear el fitxer estructura.ldif",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Crea un fitxer LDIF amb les unitats organitzatives usuaris i grups.",
          tasks: [
            "Crea el fitxer estructura.ldif.",
            "Afegeix la unitat ou=usuaris.",
            "Afegeix la unitat ou=grups.",
            "Fes una captura del contingut del fitxer.",
            "Explica per què és útil separar usuaris i grups dins LDAP."
          ],
          codeLang: "ldif",
          code:
            "dn: ou=usuaris,dc=lafita,dc=local\n" +
            "objectClass: organizationalUnit\n" +
            "ou: usuaris\n\n" +
            "dn: ou=grups,dc=lafita,dc=local\n" +
            "objectClass: organizationalUnit\n" +
            "ou: grups"
        },
        {
          id: "2.2",
          title: "Importar l’estructura LDAP",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Importa les unitats organitzatives al servidor LDAP.",
          tasks: [
            "Executa ldapadd amb el DN de l’administrador LDAP.",
            "Introdueix la contrasenya pirineus quan es demani.",
            "Comprova que les entrades s’afegeixen correctament.",
            "Fes una captura del resultat de la importació.",
            "Explica què significa que ldapadd afegeixi correctament una entrada."
          ],
          codeLang: "bash",
          code: "ldapadd -x -D \"cn=admin,dc=lafita,dc=local\" -W -f estructura.ldif\n# Password: pirineus"
        },
        {
          id: "2.3",
          title: "Verificar les unitats organitzatives",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Verifica que les unitats usuaris i grups existeixen dins del directori LDAP.",
          tasks: [
            "Executa una cerca d’objectes organizationalUnit.",
            "Comprova que apareixen ou=usuaris i ou=grups.",
            "Fes una captura del resultat.",
            "Explica com s’identifica una unitat organitzativa dins LDAP."
          ],
          codeLang: "bash",
          code: "ldapsearch -x -LLL -b \"dc=lafita,dc=local\" \"(objectClass=organizationalUnit)\" dn"
        }
      ]
    },

    {
      id: "act3",
      tag: "Activitat 3",
      title: "Crear grup POSIX",
      objective: "Crear un grup compatible amb Linux perquè l’usuari LDAP tingui un GID vàlid.",
      steps: [
        {
          id: "3.1",
          title: "Crear el fitxer del grup xavier",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Crea un grup POSIX per a l’usuari xavier.",
          tasks: [
            "Crea el fitxer grup-xavier.ldif.",
            "Defineix el DN del grup dins ou=grups.",
            "Afegeix la classe posixGroup.",
            "Assigna gidNumber 10006.",
            "Afegeix memberUid: xavier.",
            "Fes una captura del contingut del fitxer.",
            "Explica per què Linux necessita un GID per treballar amb usuaris LDAP."
          ],
          codeLang: "ldif",
          code:
            "dn: cn=xavier,ou=grups,dc=lafita,dc=local\n" +
            "objectClass: top\n" +
            "objectClass: posixGroup\n" +
            "cn: xavier\n" +
            "gidNumber: 10006\n" +
            "memberUid: xavier",
          note: "Sense gidNumber, la integració posterior amb Linux i SSSD pot fallar."
        },
        {
          id: "3.2",
          title: "Importar el grup POSIX",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Afegeix el grup xavier al directori LDAP.",
          tasks: [
            "Executa ldapadd amb el fitxer grup-xavier.ldif.",
            "Autentica’t com a administrador LDAP.",
            "Fes una captura del resultat de la importació.",
            "Explica què podria passar si el grup ja existís."
          ],
          codeLang: "bash",
          code: "ldapadd -x -D \"cn=admin,dc=lafita,dc=local\" -W -f grup-xavier.ldif"
        },
        {
          id: "3.3",
          title: "Verificar el grup xavier",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Comprova que el grup xavier existeix i té els atributs POSIX correctes.",
          tasks: [
            "Executa ldapsearch sobre ou=grups.",
            "Comprova que apareix cn=xavier.",
            "Verifica que hi ha gidNumber i memberUid.",
            "Fes una captura del resultat.",
            "Explica per què aquest grup serà important quan Linux consulti LDAP."
          ],
          codeLang: "bash",
          code: "ldapsearch -x -LLL -b \"ou=grups,dc=lafita,dc=local\" cn=xavier"
        }
      ]
    },

    {
      id: "act4",
      tag: "Activitat 4",
      title: "Crear usuari LDAP funcional",
      objective: "Crear un usuari LDAP compatible amb Linux, amb UID, GID, homeDirectory, loginShell i contrasenya funcional.",
      steps: [
        {
          id: "4.1",
          title: "Generar el hash de la contrasenya",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Genera un hash segur de la contrasenya de l’usuari xavier.",
          tasks: [
            "Executa slappasswd amb la contrasenya pirineus.",
            "Copia el hash generat.",
            "Fes una captura del resultat, ocultant parcialment el hash si ho consideres necessari.",
            "Explica per què no és recomanable guardar contrasenyes en text pla dins LDAP."
          ],
          codeLang: "bash",
          code: "slappasswd -s pirineus",
          note: "El hash generat començarà habitualment per {SSHA}. Aquest valor s’haurà d’enganxar al camp userPassword."
        },
        {
          id: "4.2",
          title: "Crear el fitxer usuari-xavier.ldif",
          evidence: "both",
          allowMultipleImages: true,
          prompt: "Crea l’entrada LDAP de l’usuari xavier amb tots els atributs necessaris per a Linux.",
          tasks: [
            "Crea el fitxer usuari-xavier.ldif.",
            "Afegeix les classes inetOrgPerson, posixAccount i shadowAccount.",
            "Defineix uidNumber 10006.",
            "Defineix gidNumber 10006.",
            "Configura homeDirectory com a /home/xavier.",
            "Configura loginShell com a /bin/bash.",
            "Substitueix {SSHA}HASH pel hash generat al pas anterior.",
            "Fes captures del fitxer complet.",
            "Explica per què uidNumber, gidNumber, homeDirectory i loginShell són imprescindibles per a Linux."
          ],
          codeLang: "ldif",
          code:
            "dn: uid=xavier,ou=usuaris,dc=lafita,dc=local\n" +
            "objectClass: top\n" +
            "objectClass: inetOrgPerson\n" +
            "objectClass: posixAccount\n" +
            "objectClass: shadowAccount\n" +
            "uid: xavier\n" +
            "cn: Xavier\n" +
            "sn: Xavier\n" +
            "uidNumber: 10006\n" +
            "gidNumber: 10006\n" +
            "homeDirectory: /home/xavier\n" +
            "loginShell: /bin/bash\n" +
            "userPassword: {SSHA}HASH",
          note: "Aquesta és l’activitat més important del projecte. Si falta algun atribut POSIX, el Projecte 24 pot fallar."
        },
        {
          id: "4.3",
          title: "Importar l’usuari xavier",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Afegeix l’usuari xavier al directori LDAP.",
          tasks: [
            "Executa ldapadd amb el fitxer usuari-xavier.ldif.",
            "Autentica’t com a administrador LDAP.",
            "Fes una captura del resultat de la importació.",
            "Explica què pot significar un error d’esquema en aquest pas."
          ],
          codeLang: "bash",
          code: "ldapadd -x -D \"cn=admin,dc=lafita,dc=local\" -W -f usuari-xavier.ldif"
        },
        {
          id: "4.4",
          title: "Verificar l’usuari xavier",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Comprova que l’usuari xavier existeix i conté els atributs necessaris.",
          tasks: [
            "Executa ldapsearch cercant uid=xavier.",
            "Comprova que apareixen uidNumber i gidNumber.",
            "Comprova que apareixen homeDirectory i loginShell.",
            "Fes una captura del resultat.",
            "Explica quin atribut relaciona l’usuari amb el seu grup principal."
          ],
          codeLang: "bash",
          code: "ldapsearch -x -LLL -b \"dc=lafita,dc=local\" uid=xavier"
        },
        {
          id: "4.5",
          title: "Validar autenticació LDAP",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Comprova que l’usuari xavier pot autenticar-se contra LDAP.",
          tasks: [
            "Executa ldapwhoami amb el DN complet de l’usuari xavier.",
            "Introdueix la contrasenya pirineus.",
            "Comprova que retorna el DN de l’usuari.",
            "Fes una captura del resultat correcte.",
            "Explica per què aquesta prova és clau abans d’integrar Linux amb SSSD."
          ],
          codeLang: "bash",
          code: "ldapwhoami -x -D \"uid=xavier,ou=usuaris,dc=lafita,dc=local\" -W\n# Password: pirineus",
          note: "Resultat esperat: dn:uid=xavier,ou=usuaris,dc=lafita,dc=local"
        }
      ]
    },

    {
      id: "act5",
      tag: "Activitat 5",
      title: "Validació final per integració",
      objective: "Assegurar que LDAP està preparat per ser utilitzat com a font d’identitat per Linux.",
      steps: [
        {
          id: "5.1",
          title: "Comprovar atributs crítics",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Fes una comprovació completa de l’usuari xavier i revisa els atributs necessaris per a Linux.",
          tasks: [
            "Executa ldapsearch cercant uid=xavier.",
            "Comprova que existeix uidNumber.",
            "Comprova que existeix gidNumber.",
            "Comprova que existeix homeDirectory.",
            "Comprova que existeix loginShell.",
            "Comprova que existeix userPassword.",
            "Fes una captura clara del resultat.",
            "Explica quin problema provocaria l’absència de cadascun d’aquests atributs."
          ],
          codeLang: "bash",
          code: "ldapsearch -x uid=xavier",
          note:
            "Atributs crítics:\n" +
            "uidNumber → UID Linux\n" +
            "gidNumber → grup principal\n" +
            "homeDirectory → directori personal\n" +
            "loginShell → shell d’entrada\n" +
            "userPassword → autenticació"
        },
        {
          id: "5.2",
          title: "Analitzar errors típics",
          evidence: "text",
          allowMultipleImages: false,
          prompt: "Analitza els errors típics que impedirien la integració posterior amb Linux.",
          tasks: [
            "Explica què passaria si falta uidNumber.",
            "Explica què passaria si falta gidNumber.",
            "Explica què passaria si la contrasenya és incorrecta.",
            "Explica què passaria si falta homeDirectory.",
            "Indica quin error consideres més greu i justifica-ho."
          ],
          codeLang: "text",
          code:
            "Error: falta uidNumber → No funcionarà amb Linux\n" +
            "Error: falta gidNumber → No hi haurà grup principal\n" +
            "Error: password incorrecte → No es podrà fer login\n" +
            "Error: falta homeDirectory → El sistema no sabrà quin directori personal assignar\n" +
            "Error: falta loginShell → Pot fallar l’entrada interactiva de l’usuari"
        },
        {
          id: "5.3",
          title: "Resum final del projecte",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Documenta l’estat final del servidor LDAP i confirma que queda preparat per als projectes següents.",
          tasks: [
            "Confirma que LDAP està instal·lat.",
            "Confirma que l’estructura usuaris/grups existeix.",
            "Confirma que l’usuari xavier està creat.",
            "Confirma que la contrasenya funciona.",
            "Confirma que l’usuari és compatible amb Linux.",
            "Fes una captura final de validació.",
            "Escriu una conclusió breu sobre per què aquest projecte és necessari abans del Projecte 24."
          ],
          codeLang: "text",
          code:
            "Resultat final esperat:\n" +
            "✔ LDAP instal·lat\n" +
            "✔ Estructura creada\n" +
            "✔ Usuari xavier creat\n" +
            "✔ Password funcional\n" +
            "✔ Usuari compatible amb Linux",
          note: "Aquest projecte és la base directa del Projecte 24, on Linux utilitzarà LDAP mitjançant SSSD."
        }
      ]
    }
  ]
};

window.QUADERN_DADES = window.PROJECT;