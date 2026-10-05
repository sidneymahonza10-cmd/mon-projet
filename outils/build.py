"""Assemble outils/simulateur-rdv.html (fichier autonome, polices intégrées en base64)."""
import base64
from pathlib import Path

ROOT = Path(__file__).resolve().parent
FONTS = ROOT.parent / "plaquette" / "fonts"
faces = [("EB Garamond", "normal", "400 600", "EBGaramond.woff2"),
         ("EB Garamond", "italic", "400 600", "EBGaramond-Italic.woff2"),
         ("Geist", "normal", "300 600", "Geist.woff2")]
css = "".join(
    f'@font-face{{font-family:"{fam}";font-style:{style};font-weight:{w};font-display:swap;'
    f'src:url(data:font/woff2;base64,{base64.b64encode((FONTS / f).read_bytes()).decode()}) format("woff2")}}\n'
    for fam, style, w, f in faces)
html = (ROOT / "src" / "simulateur.template.html").read_text().replace("/*__FONTS__*/", css)
(ROOT / "simulateur-rdv.html").write_text(html)
print(f"simulateur-rdv.html : {len(html) // 1024} Ko")
