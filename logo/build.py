"""Génère les déclinaisons du logo NOVESYA (SVG vectorisés, texte en tracés).

Usage : python3 logo/build.py   (nécessite fonttools + brotli)
Monogramme repris du site (src/components/ui/Logo.tsx), polices EB Garamond + Geist.
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

ROOT = Path(__file__).resolve().parent
FONTS = ROOT.parent / "plaquette" / "fonts"
OUT = ROOT / "svg"
OUT.mkdir(exist_ok=True)

C = dict(cream="#f6f1e9", porcelain="#fdfbf7", sand="#dcc9a8", caramel="#b8874a",
         caramel_deep="#8a5d28", espresso="#2a201a", cocoa="#4a3328", taupe="#6b5f55",
         forest="#24321f", black="#1a1714", white="#ffffff")


def load(name, wght):
    f = TTFont(FONTS / name)
    return instantiateVariableFont(f, {"wght": wght}) if "fvar" in f else f


SERIF = load("EBGaramond.woff2", 500)
SERIF_IT = load("EBGaramond-Italic.woff2", 420)
SANS = load("Geist.woff2", 500)


def text(font, s, size, tracking=0.0):
    """Renvoie (d, largeur, hauteur de capitale) — origine sur la ligne de base, à gauche."""
    upm = font["head"].unitsPerEm
    cmap, gs = font.getBestCmap(), font.getGlyphSet()
    k = size / upm
    pen = SVGPathPen(gs)
    x = 0.0
    for i, ch in enumerate(s):
        g = cmap[ord(ch)]
        gs[g].draw(TransformPen(pen, (k, 0, 0, -k, x, 0)))
        x += gs[g].width * k + (tracking * size if i < len(s) - 1 else 0)
    cap = getattr(font["OS/2"], "sCapHeight", 0) or 0.7 * upm
    return pen.getCommands(), x, cap * k


def mark(roof, n, s=1.0, x=0.0, y=0.0):
    """Monogramme (toit + N), boîte 48×46 mise à l'échelle s."""
    return f'''<g transform="translate({x:.2f} {y:.2f}) scale({s:.4f})">
  <path d="M3 19.5 24 3l21 16.5" fill="none" stroke="{roof}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  <g fill="{n}"><rect x="12.2" y="17" width="2.2" height="25.5"/><rect x="33.6" y="17" width="2.2" height="25.5"/><path d="M12.2 17h4.4l19.2 25.5h-4.4z"/><rect x="9.6" y="17" width="7.3" height="1.6"/><rect x="9.6" y="40.9" width="7.3" height="1.6"/><rect x="31.1" y="17" width="7.3" height="1.6"/></g>
</g>'''


def svg(w, h, body, bg=None, rx=0):
    back = f'<rect width="{w:.2f}" height="{h:.2f}" rx="{rx}" fill="{bg}"/>' if bg else ""
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {h:.2f}" width="{w:.0f}" height="{h:.0f}">{back}{body}</svg>\n'


def horizontal(roof, n, name, sub, pad=8):
    # Proportions du header du site : monogramme 36 px, NOVESYA 23,2 px (+0,12em), CONCIERGERIE 8,8 px (+0,42em)
    ms = 40 / 46
    dn, wn, cn = text(SERIF, "NOVESYA", 26, 0.12)
    ds, ws, cs = text(SANS, "CONCIERGERIE", 9.6, 0.42)
    gap = 6.5
    block = cn + gap + cs
    mtop, mbot = 3 * ms, 42.5 * ms           # étendue visuelle du monogramme
    cy = (mtop + mbot) / 2
    ty = cy - block / 2
    tx = 48 * ms + 13
    w, h = tx + max(wn, ws) + pad * 2, 46 * ms + pad * 2
    body = mark(roof, n, ms, pad, pad)
    body += f'<path transform="translate({tx + pad:.2f} {pad + ty + cn:.2f})" fill="{name}" d="{dn}"/>'
    body += f'<path transform="translate({tx + pad + 1:.2f} {pad + ty + block:.2f})" fill="{sub}" d="{ds}"/>'
    return w, h, body


def vertical(roof, n, name, sub, slogan=None, slogan_c=None, pad=12):
    ms = 72 / 46
    dn, wn, cn = text(SERIF, "NOVESYA", 40, 0.14)
    ds, ws, cs = text(SANS, "CONCIERGERIE", 11, 0.5)
    parts = [(dn, wn, cn, name, 18), (ds, ws, cs, sub, 11)]
    if slogan:
        dl, wl, cl = text(SERIF_IT, slogan, 19, 0.0)
        parts.append((dl, wl, cl, slogan_c, 20))
    W = max(48 * ms, *(p[1] for p in parts))
    y = 42.5 * ms
    body = mark(roof, n, ms, pad + (W - 48 * ms) / 2, pad)
    for d, wd, cap, col, gap in parts:
        y += gap + cap
        body += f'<path transform="translate({pad + (W - wd) / 2:.2f} {pad + y:.2f})" fill="{col}" d="{d}"/>'
    if slogan:
        y += 5  # jambages de l'italique
    return W + pad * 2, y + pad * 2, body


def save(name, w, h, body, bg=None, rx=0):
    (OUT / f"{name}.svg").write_text(svg(w, h, body, bg, rx))


# 1 · Logo horizontal
save("novesya-horizontal-couleur", *horizontal(C["caramel"], C["cocoa"], C["cocoa"], C["taupe"]))
save("novesya-horizontal-clair", *horizontal(C["sand"], C["porcelain"], C["porcelain"], C["sand"]))
save("novesya-horizontal-noir", *horizontal(C["black"], C["black"], C["black"], C["black"]))
save("novesya-horizontal-blanc", *horizontal(C["white"], C["white"], C["white"], C["white"]))
w, h, b = horizontal(C["sand"], C["porcelain"], C["porcelain"], C["sand"], pad=26)
save("novesya-horizontal-fond-foret", w, h, b, C["forest"], 14)
w, h, b = horizontal(C["caramel"], C["cocoa"], C["cocoa"], C["taupe"], pad=26)
save("novesya-horizontal-fond-creme", w, h, b, C["cream"], 14)

# 2 · Logo vertical
save("novesya-vertical-couleur", *vertical(C["caramel"], C["cocoa"], C["cocoa"], C["taupe"]))
save("novesya-vertical-clair", *vertical(C["sand"], C["porcelain"], C["porcelain"], C["sand"]))
save("novesya-vertical-noir", *vertical(C["black"], C["black"], C["black"], C["black"]))
save("novesya-vertical-blanc", *vertical(C["white"], C["white"], C["white"], C["white"]))

# 3 · Avec signature
save("novesya-signature-couleur", *vertical(C["caramel"], C["cocoa"], C["cocoa"], C["taupe"], "Nous gérons. Vous encaissez.", C["caramel_deep"]))
w, h, b = vertical(C["sand"], C["porcelain"], C["porcelain"], C["sand"], "Nous gérons. Vous encaissez.", C["sand"], pad=40)
save("novesya-signature-fond-foret", w, h, b, C["forest"], 20)

# 4 · Monogramme seul
for nm, roof, n in [("couleur", C["caramel"], C["cocoa"]), ("clair", C["sand"], C["porcelain"]),
                    ("caramel", C["caramel"], C["caramel"]), ("noir", C["black"], C["black"]), ("blanc", C["white"], C["white"])]:
    save(f"novesya-monogramme-{nm}", 52, 48, mark(roof, n, 1, 2, 1))

# 5 · Icônes (réseaux sociaux, favicon, avatar)
def icon(name, bg, roof, n, round_=False):
    S = 512
    s = S * 0.62 / 48
    body = mark(roof, n, s, (S - 48 * s) / 2, (S - 46 * s) / 2 - S * 0.012)
    back = f'<circle cx="{S/2}" cy="{S/2}" r="{S/2}" fill="{bg}"/>' if round_ else f'<rect width="{S}" height="{S}" rx="{S*0.22:.0f}" fill="{bg}"/>'
    (OUT / f"{name}.svg").write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {S} {S}" width="{S}" height="{S}">{back}{body}</svg>\n')

icon("novesya-icone-foret", C["forest"], C["sand"], C["porcelain"])
icon("novesya-icone-creme", C["cream"], C["caramel"], C["cocoa"])
icon("novesya-icone-caramel", C["caramel"], C["porcelain"], C["porcelain"])
icon("novesya-avatar-rond-foret", C["forest"], C["sand"], C["porcelain"], round_=True)
icon("novesya-avatar-rond-creme", C["cream"], C["caramel"], C["cocoa"], round_=True)

print("\n".join(sorted(p.name for p in OUT.glob("*.svg"))))
