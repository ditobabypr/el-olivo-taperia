"""
Genera public/brand/olivo-raices.png a partir del árbol limpio public/brand/olivo-marca.png.

  1. Prolonga el tronco (solo la franja B0–B1, donde el tronco está sin ramas) con suavizado.
  2. Dibuja raíces desde el contorno de la base, sin pintar nunca dentro del árbol.
  3. Colorea: oliva sobre crema por encima de la fila 900 (borde de la sección verde) y
     crema sobre verde por debajo.

Uso:  python tools/generar-raices.py        (requiere Pillow)
Si cambias DELTA o R, actualiza en src/styles/madera.css: aspect-ratio, height (×CH/900)
y translateY ((CH-900)/CH).
"""
import math
from PIL import Image, ImageDraw, ImageChops

SRC = 'public/brand/olivo-marca.png'
OUT = 'public/brand/olivo-raices.png'
B0, B1 = 700, 815      # franja de tronco que se alarga
DELTA = 110            # px que se alarga el tronco
R = 360                # px de lienzo para las raíces
SEED_WAVE = 5.2        # frecuencia de la ondulación de las raíces

tree = Image.open(SRC).convert('RGBA')
W, H = tree.size
assert (W, H) == (883, 900)
LB = B1 - B0
LOUT = LB + DELTA
K = 2 * (1 - LB / LOUT)
TREEH = H + DELTA
CH = TREEH + R

# ── 1. tronco prolongado ──
tr = Image.new('RGBA', (W, TREEH), (0, 0, 0, 0))
tr.paste(tree.crop((0, 0, W, B0)), (0, 0))
def s_of(v):
    return LOUT * (v - K * (v / 2 - math.sin(2 * math.pi * v) / (4 * math.pi)))
for yo in range(LOUT):
    ys = min(max(s_of((yo + .5) / LOUT), 0), LB - 1.001)
    y0 = int(ys); f = ys - y0
    a = tree.crop((0, B0 + y0, W, B0 + y0 + 1)); b = tree.crop((0, B0 + y0 + 1, W, B0 + y0 + 2))
    tr.paste(Image.blend(a, b, f), (0, B0 + yo))
tr.paste(tree.crop((0, B1, W, H)), (0, B0 + LOUT))
ta = tr.split()[3]

low = {}
for x in range(W):
    for y in range(TREEH - 1, TREEH - 220, -1):
        if ta.getpixel((x, y)) > 40:
            low[x] = y
            break

# ── 2. raíces ──
S = 3
mask = Image.new('L', (W * S, CH * S), 0); d = ImageDraw.Draw(mask)
vein = Image.new('L', (W * S, CH * S), 0); dv = ImageDraw.Draw(vein)

def bez(p0, p1, p2, p3, t):
    u = 1 - t
    return (u**3 * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t**3 * p3[0],
            u**3 * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t**3 * p3[1])

def stroke(p0, p1, p2, p3, w0, amp, ph, veined, kids=()):
    n = 900
    pts = []
    for i in range(n + 1):
        t = i / n
        x, y = bez(p0, p1, p2, p3, t)
        xa, ya = bez(p0, p1, p2, p3, min(1, t + .002))
        tx, ty = xa - x, ya - y
        l = math.hypot(tx, ty) or 1
        off = amp * math.sin(ph + t * SEED_WAVE) * math.sin(t * math.pi)
        x += -ty / l * off; y += tx / l * off
        pts.append((t, x, y, tx / l, ty / l))
        w = w0 * (1 - t) ** 1.1 + 1.3; r = w / 2
        d.ellipse([(x - r) * S, (y - r) * S, (x + r) * S, (y + r) * S], fill=255)
        if veined and .06 < t < .55:
            rv = max(.9, .05 * w)
            dv.ellipse([(x - rv) * S, (y - rv) * S, (x + rv) * S, (y + rv) * S], fill=255)
    # ramificaciones finas: (t donde nacen, lado ±1, longitud, grosor)
    for (tk, side, L, wk) in kids:
        t, x, y, tx, ty = pts[int(tk * n)]
        a = math.atan2(ty, tx) + side * .62
        q0 = (x, y)
        q1 = (x + math.cos(a) * L * .35, y + math.sin(a) * L * .35)
        q3 = (x + math.cos(a) * L * .65, y + math.sin(a) * L * .65 + L * .55)
        q2 = (q3[0], q3[1] - L * .3)
        stroke(q0, q1, q2, q3, wk * (1 - tk * .4), 4, ph + 1.7, False)

def root(x0, ang, dx, dy, w0, k1, k2, amp, ph, kids=()):
    y0 = low[x0] - 6
    p0 = (x0, y0)
    p1 = (x0 + math.cos(ang) * k1, y0 + math.sin(ang) * k1)
    p3 = (x0 + dx, y0 + dy)
    p2 = (p3[0] - dx * .15, p3[1] - k2)
    stroke(p0, p1, p2, p3, w0, amp, ph, w0 > 16, kids)

PI = math.pi
# (x de nacimiento, ángulo inicial, desplazamiento final dx, dy, grosor, tensores k1,k2, ondulación, fase, ramificaciones)
root(300, PI - .30, -270, 175, 26, 160, 120, 12, 0.4, kids=[(.5, 1, 90, 10)])
root(342, PI - .85, -200, 295, 30, 140, 150, 14, 1.3, kids=[(.38, -1, 110, 11), (.62, 1, 80, 9)])
root(392, PI / 2 + .85, -120, 335, 22, 100, 150, 10, 2.2, kids=[(.45, 1, 95, 9)])
root(440, PI / 2 + .30, -62, 245, 20, 90, 130, 9, 3.1)
root(488, PI / 2 - .02, -8, 345, 26, 80, 170, 10, 4.0, kids=[(.5, -1, 100, 10), (.7, 1, 70, 8)])
root(532, PI / 2 - .25, 48, 270, 20, 90, 140, 9, 4.9)
root(574, PI / 2 - .50, 105, 350, 32, 110, 190, 16, 5.8, kids=[(.4, 1, 110, 11)])
root(622, .90, 195, 290, 24, 130, 150, 12, 6.4, kids=[(.55, -1, 85, 9)])
root(664, .32, 218, 190, 22, 150, 110, 10, 7.2)

big = mask.resize((W, CH), Image.LANCZOS)
big = ImageChops.subtract(big, vein.resize((W, CH), Image.LANCZOS))
allow = Image.new('L', (W, CH), 255); ad = ImageDraw.Draw(allow)
for x, ly in low.items():
    ad.line([(x, 0), (x, ly - 9)], fill=0)   # no pintar dentro del árbol
big = ImageChops.multiply(big, allow)

# ── 3. color por zona ──
alpha = Image.new('L', (W, CH), 0); alpha.paste(ta, (0, 0)); alpha = ImageChops.lighter(alpha, big)
out = Image.new('RGBA', (W, CH), (0, 0, 0, 0))
top = Image.new('RGBA', (W, H), (47, 53, 26, 0)); top.putalpha(alpha.crop((0, 0, W, H))); out.alpha_composite(top, (0, 0))
bot = Image.new('RGBA', (W, CH - H), (247, 238, 219, 0)); bot.putalpha(alpha.crop((0, H, W, CH))); out.alpha_composite(bot, (0, H))
out.save(OUT, optimize=True)
print('canvas', out.size)

# vista previa (sobre crema / verde)
prev = Image.new('RGB', (W, CH), (244, 238, 223)); prev.paste(Image.new('RGB', (W, CH - H), (47, 53, 26)), (0, H))
o2 = out.copy(); o2.putalpha(o2.split()[3].point(lambda v: int(v * .9))); prev.paste(o2, (0, 0), o2)
prev.crop((0, 600, W, CH)).save('tools/vista-previa-raices.png')
