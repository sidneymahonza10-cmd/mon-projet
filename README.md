# NOVESYA — Conciergerie Airbnb Premium

Site vitrine de NOVESYA : *« Votre logement travaille. NOVESYA s'occupe du reste. »*

Construit avec **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Lenis**.

Direction « Maison claire » : palette crème, lin, sable, caramel et vert forêt issue de la brochure ;
logo au grand N sous le toit ; intro animée du logo, arche qui s'ouvre en plein écran au scroll,
parcours « autopilote » en zigzag, services en carrousel horizontal libre, avant / après piloté par un appareil photo,
reporting mensuel, pages secteurs pour le référencement local (91, 77 sud, 94).

## Lancer le site

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production
npm start          # sert le build
npm run lint       # vérification du code
```

Déploiement recommandé : [Netlify](https://www.netlify.com) (import du dépôt GitHub, Next.js détecté automatiquement ; l'offre gratuite autorise un usage commercial).

Outils hors site : `outils/simulateur-rdv.html` (simulateur de revenus pour les rendez-vous clients), `plaquette/` (plaquette PDF), `logo/` (déclinaisons du logo).

## Personnaliser (placeholders)

Toutes les informations provisoires sont regroupées dans 3 fichiers :

| Fichier | Contenu |
|---|---|
| `src/config/site.ts` | **Numéro WhatsApp**, téléphone, **e-mail**, **Instagram**, **zone d'intervention**, domaine du site, message WhatsApp prérempli |
| `src/config/images.ts` | **Photos** avant / après du shooting (`public/images/`) ; l'accueil et la section finale utilisent des illustrations |
| `src/data/content.ts` | Services, formules, FAQ, **statistiques**, **villes de la zone d'intervention** (77 sud, 91, 94) |

Autres points à compléter :

- **Logo** : `src/components/ui/Logo.tsx` (logo typographique provisoire) et `src/app/icon.svg` (favicon).
- **Pages secteurs** (SEO local) : textes, communes et FAQ dans `src/data/secteurs.ts` → `/conciergerie-airbnb/essonne`, `/seine-et-marne-sud`, `/val-de-marne`.
- **Titre Google** de l'accueil : `seoTitle` / `seoDescription` dans `src/config/site.ts`.
- **Formulaires** : la page `/formules` (téléphone + e-mail, rappel en privé) et le formulaire d'estimation envoient vers `src/app/api/lead/route.ts`, qui transmet chaque demande par e-mail via [Resend](https://resend.com). Définissez chez l'hébergeur `RESEND_API_KEY`, `LEAD_EMAIL_TO` et `LEAD_EMAIL_FROM` (voir `.env.example`).
- **Pages légales** : `src/app/mentions-legales` et `src/app/confidentialite` (champs entre crochets).
- **FAQ** : `src/data/content.ts` (le paiement et le préavis sont volontairement traités en rendez-vous, pas sur le site).

> Les statistiques et les données du rapport mensuel d'exemple sont **fictives** et signalés comme tels sur le site. Remplacez-les par des données réelles avant publication. Aucun tarif ni pourcentage de commission n'est affiché : les conditions sont présentées en privé.

## Conformité & mise en ligne

- **Pages légales** : `/mentions-legales` (à compléter à la création de la société), `/confidentialite` (RGPD, cookies), `/cgu`.
- **Cookies & mesure d'audience** : bannière de consentement (`src/components/layout/CookieBanner.tsx`), Umami chargé seulement après « Accepter » si `NEXT_PUBLIC_UMAMI_WEBSITE_ID` est défini. Lien « Gérer les cookies » dans le pied de page.
- **Sécurité** : HTTPS forcé + HSTS, en-têtes de sécurité et CSP dans `next.config.ts`.
- **Formulaires** : validation côté navigateur et côté serveur (`src/app/api/lead/route.ts`), anti-spam (champ piège, délai minimal, limite par IP, contrôle d'origine).
- **Appel à l'action unique** : `cta` dans `src/config/site.ts` (« Demander mon estimation gratuite »).
- **Icônes & partage** : `src/app/favicon.ico`, `icon.svg`, `apple-icon.png`, `manifest.ts`, `opengraph-image.png` / `twitter-image.png`.

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
