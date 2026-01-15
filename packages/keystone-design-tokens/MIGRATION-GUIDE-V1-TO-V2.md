## Migrate from v1.x.x to v2.x.x

**Note: You should also do replace for both formats, e.g. for `ks.sys.color`-->`ks.color` you should also do `--ks-sys-color`-->`--ks-color`.**

### Color Only

1. Replace all `ks.sys.color` with `ks.color`.
2. Replace all `ks.color.ref.secondary` with `ks.color.ref.support`, and `ks.color.secondary` with `ks.color.support`.
3. Replace all `ks.color.neutral.border` with `ks.color.neutral.fill`.
4. Replace all `ks.ref.color.data-[1|2|3|5]` with `ks.ref.color.[indigo|blue|pink|orange]` (data-4 is permanently removed, ask Keystone designers if you are using them).
5. Replace all `ks.color.data-[success|warning|error|neutral]` with `ks.color.data.[x]`.

### Other Tokens

**Proceed with this part ONLY IF you manually introduced and used non-color tokens. Otherwise, you shouldn't need to replace this part (Keystone's TTAM color bulk migration in March 2024 only introduced color tokens).**

1. Replace all `ks.ref.transition.function.ease-[out|in-out]` with `ks.transition.easing.standard[In|InOut]`.
2. Replace all `ks.ref.typeface.[display|text]` with `ks.ref.text.fontFamily.[display|text]`.
3. Replace all `ks.ref.typeface.weight-[regular|medium]` with `ks.ref.text.weight.[regular|medium]`.
4. Replace all `ks.ref.spacing` with `ks.spacing`.
5. Replace all `ks.ref.borderRadius` with `ks.border.radius`.
6. Replace all `ks.ref.elevation.shadow.level.[x]` with `ks.elevation.shadow.level[x]`, `ks.elevation.shadow.level.5` with `ks.elevation.shadow.level.4`.
7. Replace all `ks.sys.typeface.[x]` with `ks.text.[x* converted to camelCase]` (\* x converted to camelCase).
8. Replace all `ks.ref.transition.duration.short` with `100ms`, `ks.ref.transition.duration.long` with `200ms`.

---

## Detailed Changelog

1.0.3 --> 1.0.4:

- remove ks.sys.color.data-x

  1.0.4 --> 1.0.5:

- remove ks.ref.color.data-x
- add ks.ref.transition.duration & ks.ref.transition.function
- add some colors
- fix trivial color issues
- move package to monorepo

  1.0.5, 1.0.6-alpha.1 --> 1.0.6:

- fix trivial color issues
- use static sys color values instead of ref color references

  1.0.6 --> 1.0.7:

- replace ks.sys.color.neutral.border[-x] with ks.sys.color.neutral.fill[-x]
- replace ks.color.(sys|ref).secondary with ks.color.(sys|ref).support
- add some colors
- fix trivial color issues
- support CommonJS

  1.0.7 --> 2.0.0-beta.0:

- remove ks.ref.transition.duration (short: 100ms, long 200ms)
- remove ks.ref.borderRadius.none (0)
- remove ks.ref.elevation.shadow.level.[0|5]
- replace ks.ref.transition.function.ease-(out|in-out) with ks.transition.easing.standard(In|InOut)
- replace ks.ref.typeface.(display|text) with ks.ref.text.fontFamily.(display|text)
- replace ks.ref.typeface.weight-(regular|medium) with ks.ref.text.weight.(regular|medium)
- replace ks.ref.spacing with ks.spacing
- replace ks.ref.borderRadius with ks.border.radius
- replace ks.ref.elevation.shadow.level.[x] with ks.elevation.shadow.level[x]
- replace ks.sys.typeface.[x] with ks.text.[x converted to camelCase]
- replace ks.sys.color.data-[success|warning|error|neutral] with ks.color.data.[x]
- replace ks.sys.color with ks.color
- replace removed ks.ref.color.data-[1|2|3|5] with ks.ref.color.[indigo|blue|pink|orange] (data-4 is permanently removed)
