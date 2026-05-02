window.PROJECT = {
  projectId: "projecte23b-ldap-lab",
  id: "projecte23b-ldap-lab",
  title: "Projecte 24 – Laboratori LDAP (CRUD i troubleshooting)",
  subtitle: "Entorn segur de manipulació LDAP",
  description: "Laboratori pràctic per crear, modificar, eliminar i recuperar usuaris LDAP, incloent detecció i resolució d’errors reals.",
  cover: "assets/portades/Portada24.svg",
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
      title: "Crear usuaris de laboratori",
      objective: "Crear usuaris LDAP independents per fer proves sense afectar el sistema real.",
      steps: [

        {
          id: "1.1",
          title: "Generar hash de password",
          evidence: "both",
          prompt: "Genera un hash segur per a la contrasenya dels usuaris.",
          tasks: [
            "Executa la comanda slappasswd.",
            "Copia el hash generat.",
            "Fes una captura del resultat.",
            "Explica per què no es guarda la contrasenya en text pla."
          ],
          codeLang: "bash",
          code: "slappasswd -s pirineus"
        },

        {
          id: "1.2",
          title: "Crear fitxer LDIF",
          evidence: "both",
          allowMultipleImages: true,
          prompt: "Crea el fitxer amb els usuaris de laboratori.",
          tasks: [
            "Crea el fitxer usuaris-lab.ldif.",
            "Defineix usuaris: luffy, zoro, nami i sanji.",
            "Assigna UID i GID únics.",
            "Substitueix el hash.",
            "Fes captures del fitxer complet.",
            "Explica per què cada usuari necessita UID i GID."
          ],
          codeLang: "bash",
          code: "nano usuaris-lab.ldif"
        },

        {
          id: "1.3",
          title: "Importar usuaris",
          evidence: "both",
          prompt: "Importa els usuaris al directori LDAP.",
          tasks: [
            "Executa ldapadd.",
            "Introdueix la contrasenya.",
            "Fes captura del resultat.",
            "Explica què indica una execució correcta."
          ],
          codeLang: "bash",
          code: "ldapadd -x -D \"cn=admin,dc=lafita,dc=local\" -W -f usuaris-lab.ldif"
        },

        {
          id: "1.4",
          title: "Verificar usuari",
          evidence: "both",
          prompt: "Comprova que els usuaris s’han creat correctament.",
          tasks: [
            "Executa ldapsearch uid=luffy.",
            "Comprova que existeix.",
            "Fes captura.",
            "Explica què confirma aquesta prova."
          ],
          codeLang: "bash",
          code: "ldapsearch -x uid=luffy"
        }
      ]
    },

    {
      id: "act2",
      tag: "Activitat 2",
      title: "Modificar usuaris",
      objective: "Aprendre a modificar atributs LDAP existents.",
      steps: [

        {
          id: "2.1",
          title: "Crear fitxer de modificació",
          evidence: "both",
          prompt: "Defineix una modificació per a l’usuari zoro.",
          tasks: [
            "Crea modificar-zoro.ldif.",
            "Defineix changetype modify.",
            "Canvia loginShell a /bin/sh.",
            "Fes captura.",
            "Explica què és changetype."
          ],
          codeLang: "bash",
          code: "nano modificar-zoro.ldif"
        },

        {
          id: "2.2",
          title: "Aplicar modificació",
          evidence: "both",
          prompt: "Aplica el canvi a LDAP.",
          tasks: [
            "Executa ldapmodify.",
            "Fes captura.",
            "Explica què indica èxit."
          ],
          codeLang: "bash",
          code: "ldapmodify -x -D \"cn=admin,dc=lafita,dc=local\" -W -f modificar-zoro.ldif"
        },

        {
          id: "2.3",
          title: "Verificar canvi",
          evidence: "both",
          prompt: "Comprova que el canvi s’ha aplicat.",
          tasks: [
            "Executa ldapsearch loginShell.",
            "Fes captura.",
            "Explica el resultat."
          ],
          codeLang: "bash",
          code: "ldapsearch -x uid=zoro loginShell"
        }
      ]
    },

    {
      id: "act3",
      tag: "Activitat 3",
      title: "Afegir atributs",
      objective: "Afegir informació addicional als usuaris LDAP.",
      steps: [

        {
          id: "3.1",
          title: "Afegir email a nami",
          evidence: "both",
          prompt: "Afegeix un atribut mail a l’usuari nami.",
          allowMultipleImages: true,
          tasks: [
            "Crea fitxer LDIF.",
            "Defineix add: mail.",
            "Aplica canvi.",
            "Fes captura abans/després.",
            "Explica què fa add."
          ],
          codeLang: "text",
          code: "dn: uid=nami,ou=usuaris,dc=lafita,dc=local\nchangetype: modify\nadd: mail\nmail: nami@lafita.local"
        }
      ]
    },

    {
      id: "act4",
      tag: "Activitat 4",
      title: "Eliminar atributs",
      objective: "Eliminar atributs LDAP.",
      steps: [

        {
          id: "4.1",
          title: "Eliminar email",
          evidence: "both",
          prompt: "Elimina l’atribut mail de nami.",
          tasks: [
            "Crea fitxer LDIF.",
            "Defineix delete: mail.",
            "Executa ldapmodify.",
            "Fes captura.",
            "Explica què fa delete."
          ],
          codeLang: "text",
          code: "dn: uid=nami,ou=usuaris,dc=lafita,dc=local\nchangetype: modify\ndelete: mail"
        }
      ]
    },

    {
      id: "act5",
      tag: "Activitat 5",
      title: "Modificar grups",
      objective: "Gestionar membres de grups LDAP.",
      steps: [

        {
          id: "5.1",
          title: "Afegir sanji al grup luffy",
          evidence: "both",
          prompt: "Afegeix un membre a un grup LDAP.",
          tasks: [
            "Crea fitxer LDIF.",
            "Defineix memberUid.",
            "Executa ldapmodify.",
            "Fes captura.",
            "Explica què és memberUid."
          ],
          codeLang: "text",
          code: "dn: cn=luffy,ou=grups,dc=lafita,dc=local\nchangetype: modify\nadd: memberUid\nmemberUid: sanji"
        }
      ]
    },

    {
      id: "act6",
      tag: "Activitat 6",
      title: "Eliminar usuaris",
      objective: "Eliminar usuaris LDAP.",
      steps: [

        {
          id: "6.1",
          title: "Eliminar sanji",
          evidence: "both",
          prompt: "Elimina un usuari LDAP.",
          tasks: [
            "Executa ldapdelete.",
            "Fes captura.",
            "Explica què ha passat."
          ],
          codeLang: "bash",
          code: "ldapdelete -x -D \"cn=admin,dc=lafita,dc=local\" -W \"uid=sanji,ou=usuaris,dc=lafita,dc=local\""
        },

        {
          id: "6.2",
          title: "Verificar eliminació",
          evidence: "both",
          prompt: "Comprova que l’usuari ja no existeix.",
          tasks: [
            "Executa ldapsearch.",
            "Fes captura.",
            "Explica el resultat."
          ],
          codeLang: "bash",
          code: "ldapsearch -x uid=sanji"
        }
      ]
    },

    {
      id: "act7",
      tag: "Activitat 7",
      title: "Errors controlats",
      objective: "Aprendre a interpretar errors LDAP.",
      steps: [

        {
          id: "7.1",
          title: "DN incorrecte",
          evidence: "both",
          prompt: "Provoca un error amb DN incorrecte.",
          tasks: [
            "Executa comanda amb DN incorrecte.",
            "Fes captura.",
            "Explica l’error."
          ],
          codeLang: "text",
          code: "ldapmodify ... ou=incorrecte"
        },

        {
          id: "7.2",
          title: "Atribut duplicat",
          evidence: "both",
          prompt: "Provoca error d’atribut duplicat.",
          tasks: [
            "Intenta afegir un atribut existent.",
            "Fes captura.",
            "Explica l’error."
          ],
          codeLang: "text",
          code: "Type or value exists"
        },

        {
          id: "7.3",
          title: "Falta changetype",
          evidence: "both",
          prompt: "Executa modificació sense changetype.",
          tasks: [
            "Executa comanda incompleta.",
            "Fes captura.",
            "Explica per què falla."
          ],
          codeLang: "text",
          code: "dn: ... (sense changetype)"
        }
      ]
    },

    {
      id: "act8",
      tag: "Activitat 8",
      title: "Recuperació",
      objective: "Recuperar usuaris eliminats.",
      steps: [

        {
          id: "8.1",
          title: "Recrear usuari",
          evidence: "both",
          prompt: "Torna a crear l’usuari sanji.",
          tasks: [
            "Executa ldapadd.",
            "Fes captura.",
            "Explica per què es pot recuperar."
          ],
          codeLang: "text",
          code: "ldapadd ..."
        }
      ]
    },

    {
      id: "act9",
      tag: "Activitat 9",
      title: "Validació final",
      objective: "Comprovar l’estat final del sistema LDAP.",
      steps: [

        {
          id: "9.1",
          title: "Verificació global",
          evidence: "both",
          prompt: "Comprova que LDAP funciona correctament.",
          tasks: [
            "Executa ldapsearch luffy.",
            "Executa ldapsearch zoro.",
            "Fes captura.",
            "Explica què confirma."
          ],
          codeLang: "bash",
          code: "ldapsearch -x \"(uid=luffy)\"\nldapsearch -x \"(uid=zoro)\""
        },

        {
          id: "9.2",
          title: "Reflexió final",
          evidence: "text",
          prompt: "Reflexiona sobre els riscos en producció.",
          tasks: [
            "Què passa si elimines un usuari real?",
            "Per què no hem tocat xavier?",
            "Quin risc hi ha en producció?"
          ],
          codeLang: "text",
          code: ""
        }
      ]
    }

  ]
};

window.QUADERN_DADES = window.PROJECT;