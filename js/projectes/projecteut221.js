window.PROJECT = {
  projectId: "ut2-21-ubuntu-server-preparacio",
  id: "ut2-21-ubuntu-server-preparacio",
  title: "Projecte UT2-21 Preparació del servidor Ubuntu 24.04 per serveis de xarxa",
  subtitle: "Quadern digital interactiu",
  description: "Preparació inicial d’un servidor Ubuntu 24.04 LTS per suportar serveis de xarxa com LDAP, gestió d’usuaris, SSSD i NFS.",
  cover: "assets/portades/projecteut221.svg",
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
      title: "Instal·lació del sistema",
      objective: "Instal·lar Ubuntu Server 24.04 LTS de forma mínima i neta.",
      steps: [
        {
          id: "1.1",
          title: "Instal·lació mínima del sistema",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Instal·la Ubuntu Server 24.04 LTS amb una configuració mínima adequada per a un servidor.",
          tasks: [
            "Instal·la Ubuntu Server 24.04 LTS amb instal·lació mínima.",
            "Fes una captura on es vegi el procés o la pantalla final d’instal·lació.",
            "Respon per què és recomanable fer una instal·lació mínima en un servidor."
          ],
          codeLang: "text",
          code: ""
        },
        {
          id: "1.2",
          title: "Creació de l’usuari administrador",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Crea l’usuari administrador que faràs servir per gestionar el servidor.",
          tasks: [
            "Crea un usuari administrador durant la instal·lació.",
            "Fes una captura on es vegi la configuració de l’usuari.",
            "Respon quina funció tindrà aquest usuari administrador."
          ],
          codeLang: "text",
          code: ""
        },
        {
          id: "1.3",
          title: "Activació d’OpenSSH",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Activa OpenSSH durant la instal·lació si el sistema ofereix aquesta opció.",
          tasks: [
            "Activa OpenSSH durant la instal·lació si apareix l’opció.",
            "Fes una captura on es vegi l’opció d’OpenSSH activada.",
            "Respon per què pot ser útil tenir OpenSSH activat en un servidor."
          ],
          codeLang: "text",
          code: ""
        },
        {
          id: "1.4",
          title: "Primer accés al sistema",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Inicia sessió al servidor amb l’usuari creat durant la instal·lació.",
          tasks: [
            "Inicia sessió amb l’usuari creat.",
            "Fes una captura on es vegi que has accedit correctament al sistema.",
            "Respon com pots saber que has iniciat sessió correctament."
          ],
          codeLang: "text",
          code: "login: usuari\npassword: ********"
        }
      ]
    },

    {
      id: "act2",
      tag: "Activitat 2",
      title: "Configuració de la xarxa",
      objective: "Configurar una IP fixa per a la xarxa interna del servidor.",
      steps: [
        {
          id: "2.1",
          title: "Identificació de les interfícies",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Identifica les interfícies de xarxa disponibles abans de modificar la configuració.",
          tasks: [
            "Executa la comanda per veure les interfícies de xarxa.",
            "Identifica quina interfície és externa i quina és interna.",
            "Fes una captura on es vegin clarament els noms de les interfícies.",
            "Respon quines interfícies has detectat i quina funció tindrà cadascuna."
          ],
          codeLang: "bash",
          code: "ip link",
          note: "Els noms de les interfícies poden variar. Comprova’ls abans de continuar."
        },
        {
          id: "2.2",
          title: "Edició del fitxer Netplan",
          evidence: "image",
          allowMultipleImages: false,
          prompt: "Obre el fitxer de configuració de Netplan per definir la xarxa del servidor.",
          tasks: [
            "Obre el fitxer de configuració de Netplan.",
            "Fes una captura on es vegi el fitxer obert."
          ],
          codeLang: "bash",
          code: "sudo nano /etc/netplan/01-netcfg.yaml"
        },
        {
          id: "2.3",
          title: "Configuració de la IP fixa interna",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Configura la xarxa externa amb DHCP i la xarxa interna amb IP fixa.",
          tasks: [
            "Configura la interfície externa amb DHCP.",
            "Configura la interfície interna amb la IP 192.168.100.10/24.",
            "Fes una captura on es vegi clarament la configuració completa.",
            "Respon per què una interfície utilitza DHCP i l’altra una IP fixa."
          ],
          codeLang: "yaml",
          code: "network:\n  version: 2\n  renderer: networkd\n  ethernets:\n    enp0s3:\n      dhcp4: true\n    enp0s8:\n      dhcp4: false\n      addresses:\n        - 192.168.100.10/24",
          note: "Canvia enp0s3 i enp0s8 si al teu sistema les interfícies tenen noms diferents."
        },
        {
          id: "2.4",
          title: "Aplicació de la configuració",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Genera i aplica la configuració de Netplan per activar els canvis de xarxa.",
          tasks: [
            "Genera la configuració de Netplan.",
            "Aplica la configuració de xarxa.",
            "Fes una captura on es vegi que les comandes s’han executat sense errors.",
            "Respon què indicaria que hi ha un error en la configuració de Netplan."
          ],
          codeLang: "bash",
          code: "sudo netplan generate\nsudo netplan apply"
        },
        {
          id: "2.5",
          title: "Verificació de la IP interna",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Comprova que la IP interna 192.168.100.10/24 s’ha assignat correctament.",
          tasks: [
            "Executa la comanda per veure les adreces IP.",
            "Comprova que apareix la IP 192.168.100.10/24.",
            "Fes una captura on es vegi clarament la IP assignada.",
            "Respon a quina interfície s’ha assignat la IP 192.168.100.10/24."
          ],
          codeLang: "bash",
          code: "ip a"
        }
      ]
    },

    {
      id: "act3",
      tag: "Activitat 3",
      title: "Verificació de connectivitat",
      objective: "Comprovar que el servidor té connectivitat externa, resolució DNS i xarxa interna.",
      steps: [
        {
          id: "3.1",
          title: "Prova de connexió a Internet",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Comprova que el servidor pot comunicar-se amb una IP externa.",
          tasks: [
            "Executa un ping a 8.8.8.8.",
            "Fes una captura on es vegi el resultat del ping.",
            "Respon si hi ha connectivitat a Internet.",
            "Respon què comprova exactament fer ping a 8.8.8.8."
          ],
          codeLang: "bash",
          code: "ping -c 3 8.8.8.8"
        },
        {
          id: "3.2",
          title: "Prova de resolució DNS",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Comprova que el servidor pot resoldre noms de domini mitjançant DNS.",
          tasks: [
            "Executa un ping a google.com.",
            "Fes una captura on es vegi el resultat.",
            "Respon si el DNS funciona correctament.",
            "Respon quina diferència hi ha entre fer ping a 8.8.8.8 i fer ping a google.com."
          ],
          codeLang: "bash",
          code: "ping -c 3 google.com"
        },
        {
          id: "3.3",
          title: "Prova de la xarxa interna",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Comprova que la IP interna del servidor respon correctament.",
          tasks: [
            "Executa un ping a la IP interna del servidor.",
            "Fes una captura on es vegi el resultat.",
            "Respon si la IP interna respon correctament.",
            "Respon per què és important comprovar la xarxa interna abans d’instal·lar LDAP o NFS."
          ],
          codeLang: "bash",
          code: "ping -c 3 192.168.100.10"
        }
      ]
    },

    {
      id: "act4",
      tag: "Activitat 4",
      title: "Configuració del hostname",
      objective: "Assignar un nom coherent al servidor i configurar-ne la resolució local.",
      steps: [
        {
          id: "4.1",
          title: "Assignació del nom del servidor",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Assigna un hostname identificable al servidor.",
          tasks: [
            "Assigna el hostname servidor-lafita al sistema.",
            "Fes una captura on es vegi la comanda executada.",
            "Respon per què és important que un servidor tingui un nom identificable."
          ],
          codeLang: "bash",
          code: "sudo hostnamectl set-hostname servidor-lafita"
        },
        {
          id: "4.2",
          title: "Edició del fitxer hosts",
          evidence: "image",
          allowMultipleImages: false,
          prompt: "Obre el fitxer /etc/hosts per configurar la resolució local del nom del servidor.",
          tasks: [
            "Obre el fitxer /etc/hosts.",
            "Fes una captura on es vegi el fitxer obert."
          ],
          codeLang: "bash",
          code: "sudo nano /etc/hosts"
        },
        {
          id: "4.3",
          title: "Configuració de la resolució local",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Afegeix l’entrada local que relaciona el hostname amb el servidor.",
          tasks: [
            "Afegeix la línia 127.0.1.1 servidor-lafita.",
            "Fes una captura on es vegi clarament la línia afegida.",
            "Respon per a què serveix aquesta entrada.",
            "Respon quina relació hi ha entre el hostname i el fitxer /etc/hosts."
          ],
          codeLang: "text",
          code: "127.0.1.1 servidor-lafita"
        }
      ]
    }
  ]
};

window.QUADERN_DADES = window.PROJECT;