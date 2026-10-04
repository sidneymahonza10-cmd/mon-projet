# NOVESYA — Conciergerie Airbnb Premium

Site vitrine de NOVESYA : *« Votre logement travaille. NOVESYA s'occupe du reste. »*

Construit avec **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion**.

## Lancer le site

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production
npm start          # sert le build
npm run lint       # vérification du code
```

Déploiement recommandé : [Vercel](https://vercel.com) (import du dépôt GitHub, aucune configuration requise).

## Personnaliser (placeholders)

Toutes les informations provisoires sont regroupées dans 3 fichiers :

| Fichier | Contenu |
|---|---|
| `src/config/site.ts` | **Numéro WhatsApp**, téléphone, **e-mail**, **Instagram**, **zone d'intervention**, domaine du site, message WhatsApp prérempli |
| `src/config/images.ts` | **Photos** (exemples Unsplash) — remplacez par vos photos dans `public/images/` |
| `src/data/content.ts` | Services, formules, FAQ, **statistiques**, **témoignages**, **logements de la carte** |

Autres points à compléter :

- **Logo** : `src/components/ui/Logo.tsx` (logo typographique provisoire) et `src/app/icon.svg` (favicon).
- **Simulateur** : hypothèses de calcul dans `src/lib/estimate.ts` (taux d'occupation, saisonnalité, villes à forte demande).
- **Formulaire** : les demandes arrivent sur `src/app/api/lead/route.ts` — à brancher sur un e-mail (Resend, Brevo…) ou un CRM.
- **Pages légales** : `src/app/mentions-legales` et `src/app/confidentialite` (champs entre crochets).
- **FAQ** : les réponses marquées `[À préciser par NOVESYA]`.

> Les témoignages, statistiques, logements de la carte et données du dashboard sont **fictifs** et signalés comme tels sur le site. Remplacez-les par des données réelles avant publication.

## Structure

```
src/
├── app/                 # pages, layout, SEO (sitemap, robots, Open Graph, favicon), API
├── components/
│   ├── layout/          # Header, menu mobile, Footer, WhatsApp, curseur, intro du logo
│   ├── sections/        # Hero, Calculateur, Avant/Après, Shooting, Services, Autopilote,
│   │                    # Formules, Dashboard, Chiffres, Carte, Témoignages, FAQ, CTA, Contact
│   └── ui/              # composants réutilisables (boutons magnétiques, compteurs, reveal…)
├── config/              # informations de contact et photos
├── data/                # contenus éditoriaux
└── lib/                 # modèle d'estimation, utilitaires
```

## Accessibilité & performance

- `prefers-reduced-motion` respecté partout (MotionConfig + CSS).
- Navigation clavier complète (slider avant/après, accordéons, formulaire, menu).
- Effets lourds (curseur lumineux, inclinaison 3D, magnétisme) réservés à la souris.
- Données structurées schema.org (`LocalBusiness`, `FAQPage`).
