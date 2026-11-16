# Calendrier LEA — Réservation des licences

Calendrier partagé pour planifier l’utilisation du logiciel **LEA** : 2 licences flottantes + 1 PC LEA.

Comme **Diable Noir** : un seul fichier `index.html`, Firebase Realtime Database, déploiement GitHub Pages en 2 clics.

Tout le monde utilise **le même logiciel** et **la même base**. Une réservation faite sur un poste apparaît tout de suite sur les autres.

## Logiciel Windows (le plus simple à partager)

Un seul fichier à lancer, sans installation et sans droits administrateur : `dist/Calendrier-LEA.exe`.

1. Sur un PC où Node.js est installé, dans ce dossier :

```bat
npm install
npm run dist
```

2. Récupérer `dist/Calendrier-LEA.exe`, ou le télécharger ici :

**https://github.com/vicw68-bit/LEAcalendar/releases/latest/download/Calendrier-LEA.exe**

3. Le déposer sur Teams, un lecteur partagé ou une clé USB, ou laisser chacun le télécharger depuis le bouton du site.
4. Chaque personne copie le fichier (par exemple sur le Bureau) et double-clique dessus.

Le premier lancement peut prendre quelques secondes : Windows extrait le programme. Ensuite la fenêtre « Calendrier LEA » s’ouvre. Le bandeau vert « Connecté » confirme que ce poste voit les mêmes réservations que les autres.

Pour ouvrir le programme pendant le développement : `npm start`.

Le site GitHub Pages reste utilisable et affiche exactement les mêmes créneaux.

## Jouer / utiliser en ligne

Après déploiement, le lien sera :

**https://VOTRE_USER.github.io/NOM_DU_REPO/**

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
    "bookings": { ".read": true, ".write": true },
    "config": { ".read": true, ".write": true },
    "analytics": { ".read": true, ".write": true }
  }
}
```

4. Cliquez **Publier**

### Domaine autorisé (si erreur de clé API)

Firebase Console → **Paramètres du projet** → **Domaines autorisés**  
Ajoutez : `VOTRE_USER.github.io`

## Fonctionnalités

- Calendrier **jour / semaine / mois**
- Réservation avec **adresse mail** (format interne validé — sinon « interdit d'utilisation »)
- Affichage calendrier : **Prénom Nom** (dérivé de l’e-mail)
- **Licence 1** (violet), **Licence 2** (cyan), **PC LEA** (orange)
- 1 personne max par licence
- PC bloqué si les 2 licences sont prises en même temps
- Disponibilité en temps réel
- Clic sur une réservation → suppression
- **Nettoyage auto** : créneaux > 2 semaines supprimés du calendrier (stats conservées dans `analytics`)
- **Statistiques** : historique complet conservé (par jour / par mois), signalements « besoin d'une licence »
- **Licences dynamiques** : ajouter / supprimer des licences flottantes (⚙️ Licences)
- **PC LEA** : ressource indépendante, réservable même si toutes les licences sont prises

## Utilisation

1. Ouvrez le lien GitHub Pages
2. Cliquez-glissez un créneau sur le calendrier
3. Entrez votre adresse mail, choisissez la ressource, validez
4. Cliquez une réservation existante pour la supprimer

## Problèmes fréquents

| Symptôme | Solution |
|----------|----------|
| Parse error ligne 1 | Vous êtes dans Firestore → allez dans **Realtime Database** → Règles |
| PERMISSION_DENIED | Collez les règles JSON ci-dessus |
| Clé API refusée | Ajoutez `votre-user.github.io` aux domaines autorisés Firebase |
| Erreur à l'enregistrement | Vérifiez que Realtime Database est **créée** (pas seulement Firestore) |
