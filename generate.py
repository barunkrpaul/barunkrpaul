#!/usr/bin/env python3
"""Draws dark_mode.svg and light_mode.svg for a GitHub profile README:
ASCII art of your photo on the left, a neofetch-style info card on the right.

    python generate.py --photo me.png   # (re)build the ASCII art from a photo, then the cards
    python generate.py                  # rebuild the cards from the saved ASCII art

The art is saved to ascii_dark.txt / ascii_light.txt, so the photo itself never
has to be uploaded. A photo with a transparent background works best.
Set GH_TOKEN (or GITHUB_TOKEN) to fill in the live GitHub stats.
"""

import argparse
import calendar
import datetime
import json
import os
import urllib.request
from xml.sax.saxutils import escape

HERE = os.path.dirname(os.path.abspath(__file__))

# Characters ordered from "empty" to "full".
RAMP = " .,:;i1tfLCG08@"

CHAR_W, LINE_H = 9.7, 20  # px per character and per line at 16px monospace
PAD = 15

THEMES = {
    "dark": {"bg": "#161b22", "text": "#c9d1d9", "key": "#ffa657", "value": "#a5d6ff", "dim": "#616e7f"},
    "light": {"bg": "#f6f8fa", "text": "#24292f", "key": "#953800", "value": "#0a3069", "dim": "#c2cfde"},
}


# ---------- photo -> ASCII (needs Pillow; only used with --photo) ----------

def prepare(path, cfg):
    """Crop to the face and spread the tones out. Returns a greyscale image whose
    alpha channel marks the person (the photo's own transparency, if it has any)."""
    from PIL import Image, ImageOps

    img = ImageOps.exif_transpose(Image.open(path))
    alpha = img.getchannel("A") if "A" in img.getbands() else Image.new("L", img.size, 255)
    img = img.convert("L")
    left, top, right, bottom = cfg.get("crop", [0, 0, 1, 1])
    box = (round(left * img.width), round(top * img.height),
           round(right * img.width), round(bottom * img.height))
    img, alpha = img.crop(box), alpha.crop(box)
    img = ImageOps.equalize(img, mask=alpha.point(lambda a: 255 if a > 128 else 0))
    img.putalpha(alpha)
    return img


def to_ascii(img, width, dark, floor):
    """In dark mode bright pixels get dense characters; in light mode dark ones do.
    Every pixel of the person gets at least `floor` density so the outline shows;
    the background stays empty."""
    from PIL import Image

    rows = max(1, round(width * img.height / img.width * CHAR_W / LINE_H))
    lum, alpha = (band.tobytes() for band in img.resize((width, rows), Image.LANCZOS).split())
    lines = []
    for y in range(rows):
        chars = []
        for x in range(y * width, (y + 1) * width):
            tone = (lum[x] if dark else 255 - lum[x]) / 255
            density = (floor + (1 - floor) * tone) * alpha[x] / 255
            chars.append(RAMP[min(len(RAMP) - 1, int(density * len(RAMP)))] if alpha[x] > 25 else " ")
        lines.append("".join(chars).rstrip())
    while lines and not lines[0]:
        lines.pop(0)
    while lines and not lines[-1]:
        lines.pop()
    return lines


def art_path(theme):
    return os.path.join(HERE, f"ascii_{theme}.txt")


# ---------- GitHub stats ----------

def graphql(query, variables, token):
    req = urllib.request.Request(
        "https://api.github.com/graphql",
        data=json.dumps({"query": query, "variables": variables}).encode(),
        headers={"Authorization": f"bearer {token}", "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        body = json.load(r)
    if body.get("errors"):
        raise RuntimeError(body["errors"])
    return body["data"]["user"]


USER_QUERY = """
query($login: String!, $cursor: String) {
  user(login: $login) {
    followers { totalCount }
    contributionsCollection { contributionYears }
    contributed: repositories(ownerAffiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]) { totalCount }
    repositories(ownerAffiliations: OWNER, first: 100, after: $cursor) {
      totalCount
      pageInfo { hasNextPage endCursor }
      nodes { stargazerCount }
    }
  }
}"""

YEAR_QUERY = """
query($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) { totalCommitContributions }
  }
}"""


def fetch_stats(login, token):
    stars, cursor = 0, None
    while True:
        user = graphql(USER_QUERY, {"login": login, "cursor": cursor}, token)
        repos = user["repositories"]
        stars += sum(r["stargazerCount"] for r in repos["nodes"])
        if not repos["pageInfo"]["hasNextPage"]:
            break
        cursor = repos["pageInfo"]["endCursor"]
    commits = 0
    for year in user["contributionsCollection"]["contributionYears"]:
        yearly = graphql(YEAR_QUERY, {"login": login, "from": f"{year}-01-01T00:00:00Z",
                                      "to": f"{year}-12-31T23:59:59Z"}, token)
        commits += yearly["contributionsCollection"]["totalCommitContributions"]
    return {
        "repos": repos["totalCount"],
        "contributed": user["contributed"]["totalCount"],
        "stars": stars,
        "followers": user["followers"]["totalCount"],
        "commits": commits,
    }


# ---------- info card ----------

def uptime(birthday):
    try:
        born = datetime.date.fromisoformat(birthday)
    except ValueError:
        return "set birthday in config.json"
    today = datetime.date.today()
    months = (today.year - born.year) * 12 + today.month - born.month - (today.day < born.day)
    year, month = divmod(born.month - 1 + months, 12)
    year += born.year
    anchor = datetime.date(year, month + 1, min(born.day, calendar.monthrange(year, month + 1)[1]))
    parts = [(months // 12, "year"), (months % 12, "month"), ((today - anchor).days, "day")]
    return ", ".join(f"{n} {unit}{'' if n == 1 else 's'}" for n, unit in parts)


def field(key, value, width):
    """`key: ...... value`, padded with dots to exactly `width` characters.
    `value` is a list of (text, css class) pieces."""
    value_len = sum(len(text) for text, _ in value)
    if width - len(key) - value_len - 3 < 1:
        print(f"Warning: the {key} line is too long; shorten it or raise info_width in config.json.")
    dots = "." * max(1, width - len(key) - value_len - 3)
    return [(key, "key"), (":", None), (f" {dots} ", "dim"), *value]


def rule(label, width):
    return [(f"{label} " + "—" * max(1, width - len(label) - 1), None)]


def info_lines(cfg, stats):
    width = cfg["info_width"]
    lines = [rule(cfg["header"], width)]
    for i, section in enumerate(cfg["sections"]):
        if i:
            lines.append([])
        if section.get("title"):
            lines.append(rule(f"- {section['title']}", width))
        for key, value in section["lines"].items():
            if "{uptime}" in value:
                value = value.replace("{uptime}", uptime(cfg.get("birthday", "")))
            lines.append([(". ", "dim"), *field(key, [(value, "value")], width - 2)])

    if cfg.get("show_stats", True):
        def n(name):
            return f"{stats[name]:,}" if stats else "?"
        left = 33
        right = width - 2 - left - 3
        lines += [
            [],
            rule("- GitHub Stats", width),
            [(". ", "dim"),
             *field("Repos", [(n("repos"), "value"), (" {", None), ("Contributed", "key"),
                              (": ", None), (n("contributed"), "value"), ("}", None)], left),
             (" | ", None), *field("Stars", [(n("stars"), "value")], right)],
            [(". ", "dim"), *field("Commits", [(n("commits"), "value")], left),
             (" | ", None), *field("Followers", [(n("followers"), "value")], right)],
        ]
    return lines


# ---------- SVG ----------

def render(theme, art, info, info_width):
    c = THEMES[theme]
    art_cols = max(len(line) for line in art)
    info_x = round(PAD + art_cols * CHAR_W + 25)
    width = round(info_x + info_width * CHAR_W + PAD)
    rows = max(len(art), len(info))
    height = rows * LINE_H + 25
    art_top = (rows - len(art)) // 2
    info_top = (rows - len(info)) // 2

    out = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}px" height="{height}px" '
        f'font-family="ConsolasFallback,Consolas,Menlo,\'DejaVu Sans Mono\',monospace" font-size="16px">',
        "<style>",
        "@font-face { src: local('Consolas'), local('Consolas Bold'); font-family: 'ConsolasFallback'; "
        "font-display: swap; -webkit-size-adjust: 109%; size-adjust: 109%; }",
        f".key {{fill: {c['key']};}} .value {{fill: {c['value']};}} .dim {{fill: {c['dim']};}}",
        "text, tspan {white-space: pre;}",
        "</style>",
        f'<rect width="{width}" height="{height}" fill="{c["bg"]}" rx="15"/>',
        f'<g fill="{c["text"]}" xml:space="preserve">',
    ]
    for i, line in enumerate(art):
        out.append(f'<text x="{PAD}" y="{30 + (art_top + i) * LINE_H}">{escape(line)}</text>')
    for i, pieces in enumerate(info):
        if not pieces:
            continue
        spans = "".join(f'<tspan class="{cls}">{escape(t)}</tspan>' if cls else escape(t) for t, cls in pieces)
        out.append(f'<text x="{info_x}" y="{30 + (info_top + i) * LINE_H}">{spans}</text>')
    out += ["</g>", "</svg>", ""]
    return "\n".join(out)


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--photo", help="rebuild the ASCII art from this photo first")
    args = parser.parse_args()

    with open(os.path.join(HERE, "config.json"), encoding="utf-8") as f:
        cfg = json.load(f)

    if args.photo:
        photo = prepare(args.photo, cfg)
        for theme in THEMES:
            art = to_ascii(photo, cfg["ascii_width"], theme == "dark", cfg.get("outline", 0.15))
            with open(art_path(theme), "w", encoding="utf-8") as f:
                f.write("\n".join(art) + "\n")

    token = os.environ.get("GH_TOKEN") or os.environ.get("GITHUB_TOKEN")
    if token:
        stats = fetch_stats(cfg["github_username"], token)
    else:
        print("No GH_TOKEN set, so the GitHub stats will show '?'.")
        stats = None

    info = info_lines(cfg, stats)
    for theme in THEMES:
        with open(art_path(theme), encoding="utf-8") as f:
            art = f.read().rstrip("\n").split("\n")
        with open(os.path.join(HERE, f"{theme}_mode.svg"), "w", encoding="utf-8") as f:
            f.write(render(theme, art, info, cfg["info_width"]))
    print("Wrote dark_mode.svg and light_mode.svg", f"(stats: {stats})" if stats else "")


if __name__ == "__main__":
    main()
