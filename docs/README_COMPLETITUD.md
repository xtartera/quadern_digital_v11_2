# README_COMPLETITUD – Estat qualitatiu del dossier (v11.2)

## Objectiu

La v11.2 incorpora un sistema de **completitud formal** del dossier. Aquest sistema no posa nota i no avalua si les respostes són correctes: només comprova si l’alumne ha aportat els elements que el quadern demana.

La finalitat és ajudar el professor a fer una revisió ràpida del dossier imprès.

---

## Què es calcula?

El motor revisa tots els passos del projecte i compta els elements requerits:

- si un pas demana text, compta 1 element
- si un pas demana imatge, compta 1 element
- si un pas demana text i imatge, compta 2 elements

Exemple:

```text
Pas 1.1 → text + imatge → 2 elements
Pas 1.2 → només imatge → 1 element
Pas 1.3 → només text → 1 element
```

---

## Llindars establerts

Els percentatges es calculen internament, però no es mostren com una nota.

```text
≥ 80%      → ✔ Complert
70% - 79%  → ⚠ Revisar
< 70%      → ✖ Incomplert
```

---

## Significat dels estats

### ✔ Complert

El dossier ha arribat al mínim formal establert. Això vol dir que la majoria d’evidències i respostes sol·licitades han estat aportades.

No implica que el contingut sigui necessàriament correcte.

### ⚠ Revisar

El dossier està en una franja intermèdia. Pot estar prou avançat, però requereix una mirada ràpida del professor abans de decidir si és apte o no.

### ✖ Incomplert

El dossier no arriba al mínim formal. Falten massa elements requerits.

---

## On es mostra?

El resultat apareix a la pàgina **“Visió general del quadern”**, tant en pantalla com en impressió.

El quadre mostra:

```text
Estat formal del dossier
Estat: ✔ Complert / ⚠ Revisar / ✖ Incomplert
Elements aportats: X de Y
Passos pendents: 3.1, 4.2, ...
```

---

## Important

Aquest indicador és només una ajuda de revisió.

No substitueix la mirada del professor i no valora:

- qualitat tècnica de les captures
- veracitat del resultat
- coherència de les comandes
- qualitat de les respostes escrites

---

## Relació amb l’avaluació

El sistema està pensat per facilitar una decisió ràpida del tipus:

```text
Apte / No apte / Revisar
```

No està pensat per generar una nota numèrica.

---

## Personalització futura

Els llindars es poden canviar al motor si el professor vol un criteri més exigent o més flexible.

Valors actuals recomanats:

```text
complert: 80
revisar: 70
```
