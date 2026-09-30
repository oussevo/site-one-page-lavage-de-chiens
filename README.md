# PawSpa — Site one-page toilettage canin

> "Parce que votre chien mérite le meilleur."
> Site vitrine statique pour PawSpa, salon de toilettage fictif basé à Lyon.

## Contenu du projet

```
site-one-page-lavage-de-chiens/
├── index.html   — Structure HTML sémantique (Hero, À propos, Prix, Contact, Footer)
├── style.css    — Styles complets : palette, typographie, responsive, animations
├── script.js    — Scroll, nav active, reveal, formulaire, scroll-to-top
└── README.md    — Ce fichier
```

## Lancement

Aucune dépendance, aucune installation requise. Site 100 % statique.

**Option 1 — Ouvrir directement dans le navigateur**
Double-cliquez sur `index.html` ou glissez-le dans votre navigateur.

**Option 2 — Serveur local (recommandé)**

Avec Python :
```bash
python -m http.server 8080
# Ouvrir : http://localhost:8080
```

Avec Node.js :
```bash
npx serve .
```

Avec VS Code : clic droit sur `index.html` → Open with Live Server.

## Fonctionnalités

- Navigation fixe avec lien actif et menu hamburger mobile
- Scroll fluide CSS + fallback JS
- Sections : Hero · À propos (3 valeurs) · Nos prix (5 prestations) · Contact · Footer
- Animations au scroll via IntersectionObserver (désactivées si prefers-reduced-motion)
- Formulaire avec validation JS et confirmation simulée
- Bouton scroll-to-top injecté dynamiquement
- Responsive : mobile (600 px), tablette (900 px), desktop (1160 px)
- Accessibilité : aria-label, aria-required, aria-invalid, role="alert", contrastes WCAG AA

## Images

Images libres de droits via Unsplash (URL directes, aucun téléchargement) :
- Hero : photo-1587300003388-59208cc962cb (golden retriever)
- À propos : photo-1534361960057-19f4434a4b5c (chien chez toiletteur)

## Palette de couleurs

| Rôle               | Variable CSS         | Valeur    |
|--------------------|----------------------|-----------|
| Primaire           | --color-primary      | #4A7C9E   |
| Accent / CTA       | --color-accent       | #C9714A   |
| Fond principal     | --color-bg           | #F9F6F1   |
| Fond alterné       | --color-bg-alt       | #EDE8DF   |
| Texte courant      | --color-text         | #3A3A3A   |

## Tests

19 / 19 PASS sur la checklist statique (structure HTML, CSS, JS, accessibilité).

## Choix techniques

| Décision | Justification |
|---|---|
| 3 fichiers séparés | Maintenabilité, séparation des responsabilités |
| Vanilla JS uniquement | Zéro dépendance, chargement instantané |
| Google Fonts (Playfair Display) | Seule dépendance réseau ; remplaçable par Georgia hors ligne |
| Images Unsplash via URL | Droits libres ; remplaçables par fichiers locaux |
| Formulaire simulé | Backend hors périmètre MVP |
| Mentions légales href="#" | Contenu légal hors périmètre MVP |

## Hors périmètre MVP

- Backend / envoi réel d'emails
- Prise de rendez-vous en ligne
- SEO avancé (Open Graph, schema.org)
- Déploiement (Netlify, Vercel…)

---

*Projet fictif réalisé par Jarvis — Claude Sonnet 4.6*
