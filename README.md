# NOVESYA — Conciergerie Airbnb Premium

Site vitrine de NOVESYA : *« Votre logement travaille. NOVESYA s'occupe du reste. »*

Construit avec **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Lenis**.

Direction « Maison claire » : palette crème, lin, sable, caramel et vert forêt issue de la brochure ;
logo au grand N sous le toit ; intro animée du logo, arche qui s'ouvre en plein écran au scroll,
orbite « autopilote », services en défilement horizontal, curseur personnalisé (maison sur le simulateur).

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
| `src/config/images.ts` | **Photos** — à déposer dans `public/images/` (voir `public/images/LISEZ-MOI.md`, liens Canva inclus) |
| `src/data/content.ts` | Services, formules, FAQ, **statistiques**, **témoignages**, **villes de la zone d'intervention** (77 sud, 91, 94) |

Autres points à compléter :

- **Logo** : `src/components/ui/Logo.tsx` (logo typographique provisoire) et `src/app/icon.svg` (favicon).
- **Simulateur** : hypothèses de calcul dans `src/lib/estimate.ts` (taux d'occupation, saisonnalité, villes à forte demande).
- **Formulaires** : la page `/formules` (téléphone + e-mail, rappel en privé) et le formulaire d'estimation envoient vers `src/app/api/lead/route.ts` — à brancher sur un e-mail (Resend, Brevo…) ou un CRM.
- **Pages légales** : `src/app/mentions-legales` et `src/app/confidentialite` (champs entre crochets).
- **FAQ** : les réponses marquées `[À préciser par NOVESYA]`.

> Les témoignages, statistiques et données du dashboard sont **fictifs** et signalés comme tels sur le site. Remplacez-les par des données réelles avant publication. Aucun tarif ni pourcentage de commission n'est affiché : les conditions sont présentées en privé.

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
