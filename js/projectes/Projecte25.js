window.PROJECT = {
  projectId: "projecte24-integracio-ldap-linux-sssd",
  id: "projecte24-integracio-ldap-linux-sssd",
  title: "Projecte 25 – Integració LDAP amb Linux mitjançant SSSD",
  subtitle: "Quadern digital interactiu",
  description: "Integració d’un servidor LDAP amb un client Ubuntu Desktop 24.04 mitjançant SSSD, NSS i PAM.",
  cover: "assets/portades/projecte25.svg",
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
      title: "Verificació de connexió",
      objective: "Assegurar que el client pot comunicar-se amb el servidor LDAP.",
      steps: [
        {
          id: "1.1",
          title: "Comprovar connexió amb ping",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Comprova que el client veu el servidor LDAP.",
          tasks: [
            "Executa el ping al servidor LDAP.",
            "Fes una captura del resultat.",
            "Explica si hi ha resposta i si hi ha pèrdua de paquets."
          ],
          codeLang: "bash",
          code: "ping -c 3 192.168.100.10",
          note: "Adapta-ho segons la teva IP assignada."
        },
        {
          id: "1.2",
          title: "Fer una consulta LDAP directa",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Comprova que el client pot consultar LDAP directament.",
          tasks: [
            "Executa ldapsearch contra el servidor.",
            "Comprova que retorna l’usuari xavier.",
            "Fes una captura del resultat.",
            "Explica per què no s’ha de continuar si aquesta prova falla."
          ],
          codeLang: "bash",
          code: "ldapsearch -x -H ldap://192.168.100.10 -LLL -b \"dc=lafita,dc=local\" uid=xavier",
          note: "Si ldapsearch falla, el problema és de xarxa, servei LDAP o Base DN."
        }
      ]
    },

    {
      id: "act2",
      tag: "Activitat 2",
      title: "Instal·lació de SSSD",
      objective: "Instal·lar els paquets necessaris perquè Linux pugui utilitzar LDAP.",
      steps: [
        {
          id: "2.1",
          title: "Instal·lar paquets SSSD",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Instal·la SSSD i les eines necessàries per integrar LDAP amb Linux.",
          tasks: [
            "Actualitza els repositoris.",
            "Instal·la els paquets indicats.",
            "Fes una captura del final de la instal·lació.",
            "Explica quina funció té SSSD en aquesta integració."
          ],
          codeLang: "bash",
          code: "sudo apt update\nsudo apt install -y sssd sssd-ldap sssd-tools libnss-sss libpam-sss ldap-utils"
        }
      ]
    },

    {
      id: "act3",
      tag: "Activitat 3",
      title: "Configuració de SSSD",
      objective: "Definir com el client Ubuntu es comunica amb el servidor LDAP.",
      steps: [
        {
          id: "3.1",
          title: "Crear el fitxer sssd.conf",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Crea el directori i el fitxer de configuració de SSSD.",
          tasks: [
            "Crea el directori /etc/sssd.",
            "Obre el fitxer sssd.conf.",
            "Fes una captura del fitxer obert.",
            "Explica per què aquest fitxer és crític per a SSSD."
          ],
          codeLang: "bash",
          code: "sudo mkdir -p /etc/sssd\nsudo nano /etc/sssd/sssd.conf"
        },
        {
          id: "3.2",
          title: "Afegir la configuració LDAP",
          evidence: "both",
          allowMultipleImages: true,
          prompt: "Configura SSSD perquè utilitzi LDAP com a font d’identitat i autenticació.",
          tasks: [
            "Copia la configuració al fitxer sssd.conf.",
            "Revisa ldap_uri i ldap_search_base.",
            "Revisa les bases d’usuaris i grups.",
            "Fes captures del fitxer complet.",
            "Explica quin paràmetre indica la base LDAP principal."
          ],
          codeLang: "ini",
          code:
            "[sssd]\n" +
            "services = nss, pam\n" +
            "config_file_version = 2\n" +
            "domains = LDAP\n\n" +
            "[domain/LDAP]\n" +
            "id_provider = ldap\n" +
            "auth_provider = ldap\n" +
            "chpass_provider = ldap\n" +
            "access_provider = permit\n" +
            "ldap_uri = ldap://192.168.100.10\n" +
            "ldap_search_base = dc=lafita,dc=local\n" +
            "ldap_default_bind_dn = cn=admin,dc=lafita,dc=local\n" +
            "ldap_default_authtok_type = password\n" +
            "ldap_default_authtok = pirineus\n" +
            "ldap_user_search_base = ou=usuaris,dc=lafita,dc=local\n" +
            "ldap_group_search_base = ou=grups,dc=lafita,dc=local\n" +
            "ldap_user_object_class = posixAccount\n" +
            "ldap_group_object_class = posixGroup\n" +
            "ldap_user_name = uid\n" +
            "ldap_user_uid_number = uidNumber\n" +
            "ldap_user_gid_number = gidNumber\n" +
            "ldap_user_home_directory = homeDirectory\n" +
            "ldap_user_shell = loginShell\n" +
            "ldap_group_name = cn\n" +
            "ldap_group_gid_number = gidNumber\n" +
            "ldap_group_member = memberUid\n" +
            "cache_credentials = true\n" +
            "enumerate = true\n" +
            "fallback_homedir = /home/%u\n" +
            "default_shell = /bin/bash",
          note: "No afegeixis ldap_auth_disable_tls_never_use_in_production = true. Pot fer que SSSD no arrenqui."
        },
        {
          id: "3.3",
          title: "Aplicar permisos obligatoris",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Aplica permisos segurs al fitxer sssd.conf.",
          tasks: [
            "Canvia els permisos a 600.",
            "Canvia el propietari a root.",
            "Comprova els permisos.",
            "Fes una captura del resultat.",
            "Explica per què SSSD exigeix permisos estrictes."
          ],
          codeLang: "bash",
          code: "sudo chmod 600 /etc/sssd/sssd.conf\nsudo chown root:root /etc/sssd/sssd.conf\nls -l /etc/sssd/sssd.conf"
        }
      ]
    },

    {
      id: "act4",
      tag: "Activitat 4",
      title: "Integració amb NSS",
      objective: "Fer que Linux consulti SSSD com a font d’usuaris i grups.",
      steps: [
        {
          id: "4.1",
          title: "Modificar nsswitch.conf",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Configura NSS perquè Linux consulti SSSD.",
          tasks: [
            "Obre /etc/nsswitch.conf.",
            "Modifica les línies passwd, group i shadow.",
            "Fes una captura del fitxer modificat.",
            "Explica què significa afegir sss en aquestes línies."
          ],
          codeLang: "text",
          code: "passwd:         files systemd sss\ngroup:          files systemd sss\nshadow:         files sss"
        }
      ]
    },

    {
      id: "act5",
      tag: "Activitat 5",
      title: "Reinici i validació de SSSD",
      objective: "Arrencar SSSD i comprovar que funciona correctament.",
      steps: [
        {
          id: "5.1",
          title: "Fer un reinici net",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Reinicia SSSD eliminant la memòria cau anterior.",
          tasks: [
            "Atura SSSD.",
            "Elimina la memòria cau.",
            "Inicia i habilita SSSD.",
            "Fes una captura del procés.",
            "Explica per què pot ser útil esborrar la memòria cau."
          ],
          codeLang: "bash",
          code: "sudo systemctl stop sssd || true\nsudo rm -rf /var/lib/sss/db/*\nsudo rm -rf /var/lib/sss/mc/*\nsudo systemctl start sssd\nsudo systemctl enable sssd"
        },
        {
          id: "5.2",
          title: "Validar la configuració",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Comprova que la configuració de SSSD és correcta.",
          tasks: [
            "Executa sssctl config-check.",
            "Revisa si mostra errors.",
            "Fes una captura del resultat.",
            "Explica què indica una configuració vàlida."
          ],
          codeLang: "bash",
          code: "sudo sssctl config-check"
        },
        {
          id: "5.3",
          title: "Comprovar estat del servei",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Comprova que SSSD està actiu.",
          tasks: [
            "Consulta l’estat de SSSD.",
            "Verifica que apareix active (running).",
            "Fes una captura del resultat.",
            "Explica què significa active (running)."
          ],
          codeLang: "bash",
          code: "sudo systemctl status sssd --no-pager"
        }
      ]
    },

    {
      id: "act6",
      tag: "Activitat 6",
      title: "Validar usuaris LDAP al sistema",
      objective: "Comprovar que Linux veu els usuaris LDAP com a usuaris del sistema.",
      steps: [
        {
          id: "6.1",
          title: "Validar amb getent",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Comprova que NSS retorna els usuaris LDAP.",
          tasks: [
            "Executa getent passwd per als usuaris indicats.",
            "Comprova que apareixen UID, GID, home i shell.",
            "Fes una captura del resultat.",
            "Explica què demostra getent passwd."
          ],
          codeLang: "bash",
          code: "getent passwd xavier\ngetent passwd alumne1\ngetent passwd alumne2\ngetent passwd professor1"
        },
        {
          id: "6.2",
          title: "Validar amb id",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Comprova els UID i GID dels usuaris LDAP.",
          tasks: [
            "Executa id per a cada usuari.",
            "Comprova que retorna UID i GID.",
            "Fes una captura del resultat.",
            "Explica d’on provenen aquests valors."
          ],
          codeLang: "bash",
          code: "id xavier\nid alumne1\nid alumne2\nid professor1"
        }
      ]
    },

    {
      id: "act7",
      tag: "Activitat 7",
      title: "Prova d’autenticació real",
      objective: "Comprovar que un usuari LDAP pot iniciar sessió al sistema.",
      steps: [
        {
          id: "7.1",
          title: "Fer login per terminal",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Inicia sessió amb l’usuari xavier.",
          tasks: [
            "Executa su - xavier.",
            "Introdueix la contrasenya pirineus.",
            "Fes una captura de la sessió.",
            "Explica com saps que has entrat amb un usuari LDAP."
          ],
          codeLang: "bash",
          code: "su - xavier\n# Password: pirineus"
        },
        {
          id: "7.2",
          title: "Verificar la sessió",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Comprova l’usuari actiu i el directori home.",
          tasks: [
            "Executa whoami.",
            "Executa pwd.",
            "Fes una captura del resultat.",
            "Explica quin directori home s’ha assignat."
          ],
          codeLang: "bash",
          code: "whoami\npwd"
        },
        {
          id: "7.3",
          title: "Crear un fitxer de prova",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Crea un fitxer dins la sessió LDAP.",
          tasks: [
            "Crea el fitxer prova.txt.",
            "Comprova que s’ha creat.",
            "Fes una captura del resultat.",
            "Explica què demostra aquesta prova."
          ],
          codeLang: "bash",
          code: "echo \"login LDAP funciona\" > prova.txt\nls -l prova.txt\nexit"
        }
      ]
    },

    {
      id: "act8",
      tag: "Activitat 8",
      title: "Validació multiusuari",
      objective: "Confirmar que diversos usuaris LDAP poden autenticar-se.",
      steps: [
        {
          id: "8.1",
          title: "Provar altres usuaris",
          evidence: "both",
          allowMultipleImages: true,
          prompt: "Repeteix el login amb altres usuaris LDAP.",
          tasks: [
            "Prova l’entrada amb alumne1.",
            "Prova l’entrada amb alumne2.",
            "Prova l’entrada amb professor1.",
            "Fes captures dels resultats.",
            "Explica si tots tenen UID i GID diferents."
          ],
          codeLang: "bash",
          code: "su - alumne1\nwhoami\nid\nexit\n\nsu - alumne2\nwhoami\nid\nexit\n\nsu - professor1\nwhoami\nid\nexit"
        }
      ]
    },

    {
      id: "act9",
      tag: "Activitat 9",
      title: "Login gràfic",
      objective: "Comprovar que Ubuntu Desktop permet login gràfic amb LDAP.",
      steps: [
        {
          id: "9.1",
          title: "Reiniciar el client",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Reinicia el client abans de provar el login gràfic.",
          tasks: [
            "Executa el reinici.",
            "Accedeix a la pantalla de login.",
            "Fes una captura si és possible.",
            "Explica per què convé provar després d’un reinici."
          ],
          codeLang: "bash",
          code: "sudo reboot"
        },
        {
          id: "9.2",
          title: "Entrar amb alumne1",
          evidence: "both",
          allowMultipleImages: true,
          prompt: "Inicia sessió gràfica amb un usuari LDAP.",
          tasks: [
            "Introdueix l’usuari alumne1.",
            "Introdueix la contrasenya pirineus.",
            "Comprova que l’escriptori carrega.",
            "Fes captures del procés o resultat.",
            "Explica què indica que el login gràfic funciona."
          ],
          codeLang: "text",
          code: "Usuari: alumne1\nPassword: pirineus"
        },
        {
          id: "9.3",
          title: "Validar dins la sessió gràfica",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Comprova la identitat de l’usuari dins la sessió gràfica.",
          tasks: [
            "Obre un terminal.",
            "Executa whoami.",
            "Executa pwd.",
            "Fes una captura del resultat.",
            "Explica quin usuari està actiu."
          ],
          codeLang: "bash",
          code: "whoami\npwd"
        }
      ]
    },

    {
      id: "act10",
      tag: "Activitat 10",
      title: "Diagnosi d’errors",
      objective: "Interpretar errors habituals de SSSD, NSS, PAM i LDAP.",
      steps: [
        {
          id: "10.1",
          title: "Diagnosticar SSSD",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Consulta l’estat i els logs de SSSD.",
          tasks: [
            "Consulta l’estat de SSSD.",
            "Consulta els últims logs.",
            "Fes una captura del resultat.",
            "Explica quin tipus d’error podria aparèixer."
          ],
          codeLang: "bash",
          code: "sudo systemctl status sssd --no-pager\nsudo journalctl -u sssd -n 50"
        },
        {
          id: "10.2",
          title: "Relacionar errors i causes",
          evidence: "text",
          allowMultipleImages: false,
          prompt: "Relaciona símptomes habituals amb la seva causa probable.",
          tasks: [
            "Explica què pot passar si getent no retorna usuaris.",
            "Explica què pot passar si ldapsearch funciona però el login no.",
            "Explica per què SSSD pot no arrencar.",
            "Explica per què encara pot no existir /home/usuari."
          ],
          codeLang: "text",
          code: "getent no retorna usuaris → problema SSSD o LDAP\nldapsearch funciona però login no → problema NSS o PAM\nSSSD no arrenca → error de configuració o permisos\n/home/usuari no existeix → encara no hi ha NFS/autofs"
        }
      ]
    }
  ]
};

window.QUADERN_DADES = window.PROJECT;