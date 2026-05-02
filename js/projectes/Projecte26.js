window.PROJECT = {
  projectId: "projecte26-perfils-mobils-multiusuari",
  id: "projecte26-perfils-mobils-multiusuari",
  title: "Projecte 26 – Perfils mòbils multiusuari",
  subtitle: "LDAP, SSSD, autofs i NFS",
  description: "Implementació d’un sistema complet de perfils mòbils multiusuari amb LDAP, SSSD, autofs i NFS, amb persistència, login real i validació multi-client.",
  cover: "assets/portades/Portada26.svg",
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
      title: "Crear usuaris LDAP multiusuari",
      objective: "Disposar de múltiples usuaris LDAP compatibles amb Linux.",
      steps: [
        {
          id: "1.1",
          title: "Crear el fitxer LDIF",
          evidence: "both",
          allowMultipleImages: true,
          prompt: "Crea el fitxer LDIF amb els usuaris multiusuari.",
          tasks: [
            "Crea el fitxer crear-usuaris.ldif.",
            "Afegeix els usuaris alumne1, alumne2 i professor1.",
            "Configura UID i GID únics per a cada usuari.",
            "Fes captures del fitxer complet.",
            "Explica per què cada usuari necessita UID i GID únics."
          ],
          codeLang: "bash",
          code: "nano crear-usuaris.ldif"
        },
        {
          id: "1.2",
          title: "Generar el hash de password",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Genera el hash de la contrasenya comuna dels usuaris.",
          tasks: [
            "Executa slappasswd.",
            "Copia el hash generat.",
            "Substitueix HASH als usuaris del fitxer LDIF.",
            "Fes una captura del hash parcialment visible.",
            "Explica per què LDAP desa un hash i no la contrasenya en text pla."
          ],
          codeLang: "bash",
          code: "slappasswd -s pirineus"
        },
        {
          id: "1.3",
          title: "Importar usuaris LDAP",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Importa els usuaris nous al directori LDAP.",
          tasks: [
            "Executa ldapadd amb el fitxer crear-usuaris.ldif.",
            "Introdueix la contrasenya de l’administrador LDAP.",
            "Fes una captura de la importació correcta.",
            "Explica què indica que ldapadd hagi funcionat correctament."
          ],
          codeLang: "bash",
          code: "ldapadd -x -D \"cn=admin,dc=lafita,dc=local\" -W -f crear-usuaris.ldif"
        }
      ]
    },

    {
      id: "act2",
      tag: "Activitat 2",
      title: "Preparar estructura de perfils NFS",
      objective: "Crear l’espai del servidor on es guardaran els perfils mòbils.",
      steps: [
        {
          id: "2.1",
          title: "Crear carpeta base de perfils",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Crea la carpeta base que contindrà els perfils dels usuaris.",
          tasks: [
            "Crea la carpeta /perfils.",
            "Aplica permisos 755.",
            "Fes una captura de ls -ld /perfils.",
            "Explica per què /perfils ha d’existir al servidor."
          ],
          codeLang: "bash",
          code: "sudo mkdir -p /perfils\nsudo chmod 755 /perfils\nls -ld /perfils"
        },
        {
          id: "2.2",
          title: "Crear carpetes de perfils",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Crea una carpeta de perfil per cada usuari LDAP.",
          tasks: [
            "Crea les carpetes dels usuaris.",
            "Comprova que existeixen dins /perfils.",
            "Fes una captura del resultat.",
            "Explica per què cada usuari necessita una carpeta pròpia."
          ],
          codeLang: "bash",
          code: "sudo mkdir -p /perfils/{alumne1,alumne2,professor1}\nls /perfils"
        },
        {
          id: "2.3",
          title: "Assignar propietaris i permisos",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Assigna UID/GID i permisos segurs a cada perfil.",
          tasks: [
            "Assigna UID/GID a cada carpeta.",
            "Aplica permisos 700.",
            "Fes una captura de ls -ld /perfils/*.",
            "Explica per què els permisos 700 protegeixen els perfils."
          ],
          codeLang: "bash",
          code:
            "sudo chown 10007:10007 /perfils/alumne1\n" +
            "sudo chown 10008:10008 /perfils/alumne2\n" +
            "sudo chown 10009:10009 /perfils/professor1\n" +
            "sudo chmod 700 /perfils/*\n" +
            "ls -ld /perfils/*"
        }
      ]
    },

    {
      id: "act3",
      tag: "Activitat 3",
      title: "Configurar NFS",
      objective: "Compartir la carpeta /perfils a la xarxa interna.",
      steps: [
        {
          id: "3.1",
          title: "Editar exports",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Configura l’exportació NFS de la carpeta /perfils.",
          tasks: [
            "Edita /etc/exports.",
            "Afegeix la línia d’exportació de /perfils.",
            "Fes una captura del fitxer configurat.",
            "Explica què fa root_squash i per què és important."
          ],
          codeLang: "bash",
          code:
            "sudo nano /etc/exports\n\n" +
            "/perfils 192.168.100.0/24(rw,sync,noatime,root_squash,no_subtree_check)"
        },
        {
          id: "3.2",
          title: "Aplicar configuració NFS",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Aplica la configuració NFS i reinicia el servei.",
          tasks: [
            "Recarrega les exportacions NFS.",
            "Reinicia nfs-kernel-server.",
            "Comprova les exportacions actives.",
            "Fes una captura de exportfs -v.",
            "Explica què indica que /perfils aparegui exportat."
          ],
          codeLang: "bash",
          code: "sudo exportfs -ra\nsudo systemctl restart nfs-kernel-server\nsudo exportfs -v"
        }
      ]
    },

    {
      id: "act4",
      tag: "Activitat 4",
      title: "Configurar autofs dinàmic",
      objective: "Permetre que qualsevol usuari LDAP tingui el seu perfil muntat automàticament.",
      steps: [
        {
          id: "4.1",
          title: "Configurar auto.master",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Configura autofs perquè gestioni muntatges dins /home.",
          tasks: [
            "Edita /etc/auto.master.",
            "Afegeix la línia per a /home.",
            "Fes una captura del fitxer configurat.",
            "Explica què fan --timeout=60 i --ghost."
          ],
          codeLang: "bash",
          code:
            "sudo nano /etc/auto.master\n\n" +
            "/home /etc/auto.home --timeout=60 --ghost"
        },
        {
          id: "4.2",
          title: "Configurar auto.home",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Crea el mapa dinàmic que relaciona /home/usuari amb /perfils/usuari.",
          tasks: [
            "Edita /etc/auto.home.",
            "Afegeix el mapa dinàmic amb * i &.",
            "Fes una captura de la configuració.",
            "Explica què signifiquen * i & en autofs."
          ],
          codeLang: "bash",
          code:
            "sudo nano /etc/auto.home\n\n" +
            "* -fstype=nfs4,rw,soft,intr 192.168.100.10:/perfils/&"
        },
        {
          id: "4.3",
          title: "Reiniciar autofs",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Reinicia autofs i comprova que el servei queda actiu.",
          tasks: [
            "Reinicia autofs.",
            "Consulta l’estat del servei.",
            "Fes una captura de l’estat.",
            "Explica què indica que autofs estigui actiu."
          ],
          codeLang: "bash",
          code: "sudo systemctl restart autofs\nsystemctl status autofs --no-pager"
        }
      ]
    },

    {
      id: "act5",
      tag: "Activitat 5",
      title: "Validar LDAP i SSSD",
      objective: "Comprovar que el client Linux reconeix els usuaris LDAP.",
      steps: [
        {
          id: "5.1",
          title: "Validar usuari amb getent i id",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Comprova que Linux veu l’usuari LDAP i els seus identificadors.",
          tasks: [
            "Executa getent passwd alumne1.",
            "Executa id alumne1.",
            "Fes una captura dels resultats.",
            "Explica què demostra getent i què demostra id."
          ],
          codeLang: "bash",
          code: "getent passwd alumne1\nid alumne1"
        }
      ]
    },

    {
      id: "act6",
      tag: "Activitat 6",
      title: "Validar autofs",
      objective: "Comprovar que el muntatge automàtic dels perfils funciona.",
      steps: [
        {
          id: "6.1",
          title: "Comprovar muntatge del perfil",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Verifica que /home/alumne1 activa el muntatge NFS corresponent.",
          tasks: [
            "Consulta /home/alumne1.",
            "Comprova els muntatges amb findmnt.",
            "Fes una captura del muntatge actiu.",
            "Explica com autofs munta el perfil només quan cal."
          ],
          codeLang: "bash",
          code: "ls -ld /home/alumne1\nfindmnt | grep perfils"
        }
      ]
    },

    {
      id: "act7",
      tag: "Activitat 7",
      title: "Login multiusuari",
      objective: "Validar que un usuari LDAP pot iniciar sessió i escriure al seu perfil.",
      steps: [
        {
          id: "7.1",
          title: "Entrar amb alumne1",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Inicia sessió per terminal amb l’usuari alumne1.",
          tasks: [
            "Executa su - alumne1.",
            "Comprova el directori amb pwd.",
            "Fes una captura de la sessió activa.",
            "Explica quin perfil s’ha muntat."
          ],
          codeLang: "bash",
          code: "su - alumne1\npwd"
        },
        {
          id: "7.2",
          title: "Crear fitxer al perfil",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Crea un fitxer dins el perfil de l’usuari.",
          tasks: [
            "Crea el fitxer prova.txt.",
            "Comprova que s’ha creat.",
            "Fes una captura del fitxer.",
            "Explica què demostra aquesta prova."
          ],
          codeLang: "bash",
          code: "echo \"soc alumne1\" > ~/prova.txt\nls -l ~/prova.txt"
        }
      ]
    },

    {
      id: "act8",
      tag: "Activitat 8",
      title: "Validació al servidor",
      objective: "Comprovar que el fitxer creat al client apareix realment al servidor.",
      steps: [
        {
          id: "8.1",
          title: "Llegir fitxer des del servidor",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Verifica al servidor que el fitxer de l’usuari s’ha desat a /perfils.",
          tasks: [
            "Executa cat sobre el fitxer del perfil.",
            "Comprova que mostra el text esperat.",
            "Fes una captura del resultat.",
            "Explica què demostra aquesta verificació."
          ],
          codeLang: "bash",
          code: "cat /perfils/alumne1/prova.txt"
        }
      ]
    },

    {
      id: "act9",
      tag: "Activitat 9",
      title: "Prova multi-client",
      objective: "Validar que el perfil mòbil funciona des de més d’un client.",
      steps: [
        {
          id: "9.1",
          title: "Validar roaming entre clients",
          evidence: "both",
          allowMultipleImages: true,
          prompt: "Comprova que un segon client veu el mateix perfil d’usuari.",
          tasks: [
            "Configura un segon client amb SSSD i autofs.",
            "Inicia sessió amb alumne1.",
            "Llegeix el fitxer creat al primer client.",
            "Fes captures dels dos clients si és possible.",
            "Explica per què això confirma el roaming real."
          ],
          codeLang: "bash",
          code: "su - alumne1\ncat ~/prova.txt"
        }
      ]
    },

    {
      id: "act10",
      tag: "Activitat 10",
      title: "Seguretat entre usuaris",
      objective: "Comprovar que un usuari no pot accedir al perfil d’un altre.",
      steps: [
        {
          id: "10.1",
          title: "Provar accés a un altre perfil",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Verifica que els permisos impedeixen accedir al perfil d’un altre usuari.",
          tasks: [
            "Entra com alumne1.",
            "Intenta listar /home/alumne2.",
            "Comprova que apareix Permission denied.",
            "Fes una captura de l’error.",
            "Explica per què aquest resultat és correcte."
          ],
          codeLang: "bash",
          code: "ls /home/alumne2\n# Resultat esperat: Permission denied"
        }
      ]
    },

    {
      id: "act11",
      tag: "Activitat 11",
      title: "Login gràfic",
      objective: "Comprovar que el login gràfic funciona amb usuaris LDAP i perfils mòbils.",
      steps: [
        {
          id: "11.1",
          title: "Iniciar sessió gràfica",
          evidence: "both",
          allowMultipleImages: true,
          prompt: "Inicia sessió gràfica amb diferents usuaris LDAP.",
          tasks: [
            "Fes login gràfic amb alumne1.",
            "Fes login gràfic amb alumne2.",
            "Obre un terminal dins la sessió.",
            "Executa whoami i pwd.",
            "Fes captures dels resultats.",
            "Explica què confirma el login gràfic."
          ],
          codeLang: "bash",
          code: "whoami\npwd"
        }
      ]
    },

    {
      id: "act12",
      tag: "Activitat 12",
      title: "Persistència del perfil",
      objective: "Comprovar que els fitxers es conserven després de reiniciar o canviar de sessió.",
      steps: [
        {
          id: "12.1",
          title: "Crear fitxer persistent",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Crea un fitxer dins el perfil de l’usuari.",
          tasks: [
            "Crea el fitxer fitxer.txt.",
            "Fes una captura del fitxer creat.",
            "Explica on es desa realment el fitxer."
          ],
          codeLang: "bash",
          code: "echo \"persistent\" > ~/fitxer.txt\nls -l ~/fitxer.txt"
        },
        {
          id: "12.2",
          title: "Reiniciar i verificar",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Reinicia el sistema i comprova que el fitxer encara existeix.",
          tasks: [
            "Reinicia el client.",
            "Torna a iniciar sessió amb el mateix usuari.",
            "Llegeix el fitxer persistent.",
            "Fes una captura del resultat.",
            "Explica què demostra la persistència."
          ],
          codeLang: "bash",
          code: "sudo reboot\ncat ~/fitxer.txt"
        }
      ]
    },

    {
      id: "act13",
      tag: "Activitat 13",
      title: "Diagnosi d’errors",
      objective: "Relacionar errors habituals amb la seva causa i possible solució.",
      steps: [
        {
          id: "13.1",
          title: "Analitzar errors típics",
          evidence: "text",
          allowMultipleImages: false,
          prompt: "Explica errors habituals del sistema i com els diagnosticaries.",
          tasks: [
            "Explica què revisaries si LDAP no respon.",
            "Explica què faries si SSSD dona error.",
            "Explica què faries si NFS és lent.",
            "Explica què revisaries si apareix Permission denied.",
            "Relaciona cada error amb una eina de diagnosi."
          ],
          codeLang: "text",
          code:
            "LDAP no respon → revisar ldapsearch\n" +
            "SSSD error → revisar sssctl config-check\n" +
            "NFS lent → revisar opcions noatime\n" +
            "Permisos incorrectes → revisar chown i chmod"
        }
      ]
    },

    {
      id: "act14",
      tag: "Activitat 14",
      title: "Checklist final",
      objective: "Validar que tot el sistema de perfils mòbils funciona correctament.",
      steps: [
        {
          id: "14.1",
          title: "Completar checklist final",
          evidence: "text",
          allowMultipleImages: false,
          prompt: "Revisa tots els elements necessaris per donar el sistema per complet.",
          tasks: [
            "Confirma que el multiusuari LDAP funciona.",
            "Confirma que NFS funciona.",
            "Confirma que autofs dinàmic funciona.",
            "Confirma que el login funciona.",
            "Confirma que la persistència funciona.",
            "Confirma que el multi-client funciona.",
            "Confirma que la seguretat entre usuaris és correcta.",
            "Escriu una conclusió breu del projecte."
          ],
          codeLang: "text",
          code:
            "[ ] Multiusuari LDAP funciona\n" +
            "[ ] NFS funciona\n" +
            "[ ] autofs dinàmic funciona\n" +
            "[ ] Login funciona\n" +
            "[ ] Persistència funciona\n" +
            "[ ] Multi-client funciona\n" +
            "[ ] Seguretat correcta"
        }
      ]
    }
  ]
};

window.QUADERN_DADES = window.PROJECT;