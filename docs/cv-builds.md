# CV builds: public vs private

There are two builds of the same CV. They share one source of truth (`content/`,
`cv/cv.config.ts`); the only difference is the phone number.

| | Public | Private |
|---|---|---|
| Build | `npm run build:cv` | `npm run build:cv:private` |
| Output | `public/cv.pdf` (**committed**) | `private.cv.pdf` (**gitignored**) |
| Phone | no | yes |
| Where it goes | GitHub + <https://ekaynac.github.io/cv.pdf> | job applications / ATS uploads only |
| ATS lint | `npm run lint:ats` | `npm run lint:ats:private` |

The phone is deliberately **not** in `content/`: that dataset feeds the public repo,
the live site, the README and the LinkedIn pack. The private build reads it from
`CV_PHONE`, or from `cv/private.contact.ts` — both gitignored via `private.*`.

If `cv/private.contact.ts` is missing (fresh clone, another machine), recreate it:

```ts
export const phone = "+90 ...";
```

Two guards keep the number out of the public artefacts, and both run in CI:
`content/__tests__/content.test.ts` rejects phone-shaped strings in the dataset, and
`scripts/ats-lint.ts` fails the public PDF on a `no-pii` finding. The private lint
passes `allowPhone`, so only that one build is permitted to carry it.
