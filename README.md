# Calendrier LEA — Réservation des licences

Calendrier partagé pour planifier l’utilisation du logiciel **LEA** : 2 licences flottantes + 1 PC LEA.


## Jouer / utiliser en ligne

Après déploiement, le lien sera :

(https://vicw68-bit.github.io/LEAcalendar/)

## Mettre sur GitHub

1. Poussez **uniquement** `index.html` (et ce README) sur la branche `main`
2. GitHub → **Settings → Pages**
3. Source : **Deploy from a branch**
4. Branch : `main` → dossier **`/ (root)`**
5. Attendez 1–2 minutes → ouvrez le lien

Aucun build, aucun secret, aucune GitHub Action.

## Firebase — règles (IMPORTANT)

L’erreur *« Parse error ligne 1 »* arrive si vous collez les règles **Firestore** dans **Realtime Database**. Ce projet utilise **Realtime Database** (comme Diable Noir).

Dans [Firebase Console](https://console.firebase.google.com/project/leaplanning-ae6d7/database) :

1. Menu **Realtime Database** (pas Firestore)
2. Onglet **Règles**
3. Collez exactement ceci :

```json
{
  "rules": {
    "bookings": {
      ".read": true,
      ".write": true
    }
  }
}
```

4. Cliquez **Publier**

### Domaine autorisé (si erreur de clé API)

Firebase Console → **Paramètres du projet** → **Domaines autorisés**  
Ajoutez : `VOTRE_USER.github.io`

## Fonctionnalités

- Calendrier **jour / semaine / mois**
- Réservation avec **nom obligatoire**
- **Licence 1** (violet), **Licence 2** (cyan), **PC LEA** (orange)
- 1 personne max par licence
- PC bloqué si les 2 licences sont prises en même temps
- Disponibilité en temps réel
- Clic sur une réservation → suppression

## Utilisation

1. Ouvrez le lien GitHub Pages
2. Cliquez-glissez un créneau sur le calendrier
3. Entrez votre nom, choisissez la ressource, validez
4. Cliquez une réservation existante pour la supprimer

## Problèmes fréquents

| Symptôme | Solution |
|----------|----------|
| Parse error ligne 1 | Vous êtes dans Firestore → allez dans **Realtime Database** → Règles |
| PERMISSION_DENIED | Collez les règles JSON ci-dessus |
| Clé API refusée | Ajoutez `votre-user.github.io` aux domaines autorisés Firebase |
| Erreur à l'enregistrement | Vérifiez que Realtime Database est **créée** (pas seulement Firestore) |
