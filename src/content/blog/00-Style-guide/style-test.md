---
title: "Style test — every trick this blog can do"
description: "A living style guide: all the markdown elements this blog supports, in one post. Delete me (or keep me around as a cheat sheet)."
date: "Jul 15 2026"
draft: true
---

There is a specific kind of quiet in owning the whole thing — every tag, every margin, every word. This opening paragraph gets an automatic **drop cap**, no special syntax needed. Just start writing.

You can paint a ==violet marker== behind any phrase by wrapping it in `==double equals==`. Use it like a highlighter: ==sparingly, on the thing that matters==.
***==test==***

## Big pull quotes

Every heading you write with `##` gets an automatic violet number, like the one above. And a plain markdown quote becomes the big editorial pull quote:

> Constraints make better work. Keep it small enough to actually love.

Add an italic line at the end and it becomes the attribution:

> If something looks a bit wonky, that's a person, not a bug.
>
> *Davide, probably*

## Callouts

Quiet notes use the GitHub alert syntax — still just markdown:

> [!NOTE]
> A neutral aside. Write it as `> [!NOTE]` followed by the text on the next quoted line.

> [!IMPORTANT]
> The violet one, for things the reader really shouldn't skip.

> [!TIP]
> Green, for the "here's a shortcut" moments.

> [!WARNING]
> Amber, for "this bit me, watch out".

> [!CAUTION]
> Red, for actual danger — data loss, bricked devices, angry volleyball coaches.

## Code and data

Inline code like `pnpm build` gets a tinted chip. Fenced blocks become a full editor frame — add `title="filename"` after the language and you get the tab, the copy button (hover the block), and line numbers for free:

```js title="corner.js"
const corner = {
  trackers: 0,
  joy: Infinity,
};

export function greet(visitor) {
  return `ciao, ${visitor} — make yourself at home`;
}
```

Shell blocks render as a terminal instead, without line numbers:

```bash title="deploy.sh"
pnpm build && git push  # that's the whole pipeline
```

You can even highlight lines with `{2}` or mark diffs with `ins`/`del`:

```js title="consts.ts" {2} del={3} ins={4}
export const SITE = {
  NUM_POSTS_ON_HOMEPAGE: 3,
  FOOTER_TAGLINE: "made with a template",
  FOOTER_TAGLINE: "When in doubt, JDI !",
};
```

```go
x := "ciao GO!"
```

Tables come straight from GFM:

| Don't send this via non-E2E apps | Send it here instead |
| -------------------------------- | -------------------- |
| Photo of your ID                 | Signal, in person    |
| Passwords, bank details          | A password manager   |

And task lists get violet checkboxes:

- [x] rebuild the site
- [x] make articles less boring
- [ ] water the plants

## The small stuff

A `---` on its own line becomes a short violet rule instead of a boring full-width line:

---

External links grow a little arrow automatically — like [howtheyvote.eu](https://howtheyvote.eu). Internal links stay clean. You can also drop a footnote[^1] anywhere, and it collects itself at the bottom under a ruled "Notes" block.

Images keep their hairline frame, *and that's the whole toolbox* — everything above is plain markdown, no HTML in sight.

[^1]: Like this one. Footnotes use the `[^1]` syntax — reference in the text, definition anywhere in the file.
