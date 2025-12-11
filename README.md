# Tenisu

Tenisu est une application de gestion et d'analyse de joueurs de tennis. Le projet est structuré en monorepo contenant une API REST et une interface utilisateur.

## 📂 Structure du Projet

- **back/** : API REST construite avec [Hono](https://hono.dev/), TypeScript et Zod. Utilise un fichier JSON comme base de données persistante.
- **front/** : Interface utilisateur construite avec [React 19](https://react.dev/), [Vite](https://vitejs.dev/) et [Tailwind CSS v4](https://tailwindcss.com/).

**URL Publique :** https://tenisu-front.pages.dev/

## 📋 Prérequis

Assurez-vous d'avoir installé les outils suivants :

* **Node.js** (v20+ recommandé)
* **pnpm** (Gestionnaire de paquets utilisé pour ce monorepo)

## 🛠️ Installation

1. Clonez le dépôt :
   ```bash
   git clone <votre-url-de-repo>
   cd tenisu
   ```

2. Installez les dépendances pour l'ensemble du projet (racine, back et front) :
   ```bash
   pnpm install
   ```

## 🚀 Démarrage

Vous devez lancer le backend et le frontend dans deux terminaux séparés.

### 1. Lancer le Backend (API)

```bash
cd back
pnpm dev
```
L'API sera accessible sur `http://localhost:3000`.

**Endpoints principaux :**
- `GET /api/players` : Liste des joueurs triés par rang.
- `GET /api/players/:id` : Détails d'un joueur spécifique.
- `GET /api/stats` : Statistiques (Pays au meilleur ratio, IMC moyen, Médiane de taille).
- `POST /api/players` : Création d'un joueur.

### 2. Lancer le Frontend

```bash
cd front
pnpm dev
```
L'application s'ouvrira généralement sur `http://localhost:5173` (vérifiez la console pour l'URL exacte).

## 💻 Technologies

* **Langage** : TypeScript
* **Backend** : Node.js, Hono, Zod, KV (Cloudflare)
* **Frontend** : React 19, Vite, Tailwind CSS 4
* **Outils** : Prettier, ESLint

## 📄 Licence

Ce projet est publique.