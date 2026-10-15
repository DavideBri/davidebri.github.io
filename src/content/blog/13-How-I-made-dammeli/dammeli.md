---
title: I built a payment link that not even I can read
description: Why I made dammeli, what a month of building it taught me, and why the URL fragment is the coolest thing on the web.
date: "Oct 15 2026"
---

Picture this. Pizza night with friends, 8 people, one bill. Someone pays, and then the ritual begins:

- *"Do you have Satispay?"*
- *"No, Revolut."*
- *"I only have PayPal."*
- *"Just send me the IBAN"* → screenshot of the IBAN → typo in the IBAN → bank says the name doesn't match
- *Probably someone already dropped out cause it required more than 10 second of brain time and I get no money back.."*

Every. Single. Time.

So I grabbed my infinite roll of paper (yes, the one with the **923,401 brilliant unicorn app ideas**, it's still going strong) and this time I picked one on purpose.

**One link with every way you can pay me.** Send it once, the other person picks what works for them. Done.

Its name is [**dammeli**](https://damme.li). Like *"dammeli"*, "give them to me". Italian and slightly rude, exactly like asking your friends for money.


## "But that already exists"🤓👆

Yes. Linktree, Beacons, PayRequest... a "Linktree for payments" is not a new idea, and honestly it's not a defensible one either.

So I asked myself: why would anyone trust *those* service with such sensitive info ?

That's why in **dammeli** your payment methods are **encrypted in your browser** before anything leaves your phone. The server only ever receives an unreadable blob. No account, no email, no tracking. If someone steals my database, they get 4 KB of noise per user. Congrats.

That's the whole point of the project. Without privacy, dammeli is just another Linktree. With it, it's a fun crypto exercise that's actually useful.

## The coolest trick on the web: `#`

Here's the thing that blew my mind (and that I somehow never thought about in years of web dev).

A dammeli link looks like this:

```
damme.li/#1rN4pQv8Lx2Wm7Ka3Bc9Fd
```

Everything after the `#` is the **fragment**, and browsers ==never send the fragment to the server==. Never. It's not in the request, it's not in the logs, it's not anywhere.

So the key lives *inside the link itself*:

- I generate 128 random bits in your browser
- From those I derive a **read key**, a **write token** and the page **id**
- Your methods get encrypted with AES-GCM using the read key
- The server stores the blob under the id, and that's it

When your friend opens the link, their browser recomputes the id from the key, downloads the blob, decrypts it locally. The server is just a dumb locker that doesn't know what's inside.

Bonus: the read link and the edit link are different. Whoever gets the read link can see your page, but can't change it. Because the read key is derived *from* the master key, not the other way around. Hash functions baby.

## What I learned (a lot, actually)

### 1. Paranoia is a feature

I wrote down a list of **non-negotiable constraints** before writing a single line of code. Things like:

- The key never leaves the browser
- `location.hash` never ends up in a fetch, a log, or the page title. One forgotten `console.log` and the whole security model is gone
- Never `Math.random()`, only `crypto.getRandomValues`
- A new nonce on every write (reuse one with AES-GCM and you're done)
- **Zero external resources.** No CDN, no Google Fonts, no analytics. Every third party is an IP that leaks

Having them written down made every decision 10x faster. Is this allowed? Check the list. No? Next.

### 2. Even the size is information

If page A is 300 bytes and page B is 900 bytes, I can guess B has more payment methods. So **every page is padded to exactly 4096 bytes**. The server can't even tell how much stuff you have.

I would never have thought about it a month ago.

### 3. "Forever" is a scary word

There's no account and no recovery. If you lose your link, it's gone (I warn you, gently). But the opposite also holds: a link created today ==must keep working forever==.

So every format change has to stay readable for every link ever created. Version number in the link, test vectors in the test suite, and a versioning rule that only bumps the major when an old link would break. Which hopefully means never.

### 4. Strict CSP is pain (the good kind)

No `unsafe-inline`. Not in scripts, not in styles. That means no inline `style=""` anywhere, ever. I had to hunt down every single one.

It hurts. It also means that even if someone manages to inject something into the page, the browser just won't run it.

### 5. Banks are weird, payment apps are weirder

Some fun facts collected along the way:

- Since **October 2025**, SEPA transfers have **Verification of Payee**: your bank checks if the name matches the IBAN. So the field isn't "full name", it's "account holder, *exactly* as it appears at your bank". A "Close Match" warning on a payment page kills trust instantly
- **Satispay** has no public link to pay a specific person. You can only pay someone in your contacts. So dammeli generates a **vCard**: tap "Save contact", open Satispay, find the name, pay. Hacky? A bit. Works? Yes
- People paste *everything*. `https://www.paypal.me/brunoxyz?locale=it` must become `brunoxyz`. Never say "invalid format" when it's obvious what the user meant

### 6. All the crypto in one file you can check

All the cryptography lives in a single `crypto.js`, served **byte-identical** to the one in the repo. No bundler touching it. You don't have to trust me: diff it, hash it, compare.

That's the energy I want from privacy tools.

## Wait, did I vibecode again?

Kind of. But not really.

[Last time](https://davidebri.github.io/blog/09-i-vibecoded/i-tried-vibecoding/) I said yes to SQL without reading it, and the final score was:

**Skills gained:** zero <br>
**Fun level:** 1,000,000,000

This time most of the code was written with **Claude Code**, but I directed and reviewed every step. I wrote the plan, the constraints, the crypto design. When it proposed something that broke a constraint, I said no. It's even written in the README, because hiding it would be a bit ironic for a project whose whole point is *"don't trust me, check it"*.

The difference? With vibecoding I was a passenger. Here I was the driver with a very fast engine.

## Why it's so cool (I'm biased)

- One link. Every method. Done
- Nobody can read your page. Not Netlify, not Supabase, **not me**
- No account, no email, no password to forget
- QR code generated locally, share on WhatsApp in one tap
- Dark mode, Italian, English and Spanish
- Open source (AGPL), all of it

And it took about a month, ~57 commits, from blank page to [damme.li](https://damme.li) live.

---

## Final Thoughts

It's still in **private beta**: backups exist but restore hasn't been tested yet, and the only real users so far are me and my friends (sorry guys, you're beta testers now).

If you want to try it, break it, or tell me my crypto is wrong, please do:

- Try it: [damme.li](https://damme.li)
- Code: [github.com/DavideBri/dammeli](https://github.com/DavideBri/dammeli)
- Project page: [here](https://davidebri.github.io/projects/dammeli/)

**Knowledge gained:** a lot
**Fun level:** still 1,000,000,000
