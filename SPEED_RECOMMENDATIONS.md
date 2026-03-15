# Speed Optimization Recommendations

## Implemented in This Session

### 1. **Parallel Data Fetching**
- **Homepage**: All 4 Shopify API calls (new arrivals, dogs, cats, fallback) now run in parallel via `Promise.all()` instead of sequentially—reduces load time by ~3–4x for data.
- **Product page**: Product and related products fetch in parallel instead of waterfall.

### 2. **React.cache() for API Deduplication**
- `getProducts`, `getProductByHandle`, `getCollectionProducts`, and `getNewArrivals` are wrapped with `React.cache()`.
- Duplicate calls in the same request reuse the cached result.

### 3. **Dynamic Imports for Below-the-Fold Content**
- `SocialVideos`, `BlogSection`, and `EmailCapture` are loaded via `next/dynamic`.
- Their JavaScript is code-split into separate chunks, reducing initial bundle size.

### 4. **Resource Hints**
- `dns-prefetch` for cdn.shopify.com, images.unsplash.com, videos.pexels.com.
- `preconnect` for cdn.shopify.com to speed up image and API requests.

### 5. **Image Optimization** (from earlier work)
- Next.js Image optimization with AVIF/WebP.
- `priority` on above-the-fold images.
- Responsive `sizes` on all images.
- Video preload on hero.

---

## Additional Recommendations

### High Impact

1. **Enable Vercel Speed Insights**
   - Add `@vercel/speed-insights` to track real user metrics (LCP, FID, CLS).
   - Use data to find remaining bottlenecks.

2. **Reduce Hero Video Size**
   - Current hero video is UHD (2560×1440). Consider a smaller resolution (e.g. 1280×720) or lower bitrate for faster load.
   - Use a poster image so content appears before the video loads.

3. **Lazy Load TikTok Iframes**
   - SocialVideos embeds 3 TikTok iframes. Use `loading="lazy"` (already present) and consider loading iframes only when the section is in view (Intersection Observer).

4. **Add `fetchPriority="high"` to Critical Images**
   - Next.js Image with `priority` already handles this; ensure no other large images compete for bandwidth on first load.

### Medium Impact

5. **Reduce Font Weights**
   - Inter is loaded with 4 weights (400, 500, 700, 800). If not all are used, remove unused weights to shrink the font payload.

6. **Defer Analytics**
   - Vercel Analytics loads on every page. Consider loading it after `requestIdleCallback` or when the user interacts.

7. **Static Generation Where Possible**
   - Collections, About, Pet News, Contact: evaluate if they can be statically generated at build time or with longer revalidation.

8. **Shopify API Response Caching**
   - Add `unstable_cache` or similar for product/collection data with a short TTL (e.g. 60s) to avoid repeated Shopify calls across requests.

### Lower Impact

9. **Reduce Third-Party Scripts**
   - Audit scripts (Analytics, Toaster, etc.) and ensure they’re loaded asynchronously or deferred.

10. **Use `loading="lazy"` for Below-the-Fold Images**
    - Next.js Image does this by default when `priority` is not set.

11. **Consider Edge Runtime**
    - For API routes or server components that only need edge capabilities, `export const runtime = 'edge'` can reduce cold starts in some regions.

12. **Bundle Analysis**
    - Run `@next/bundle-analyzer` to find large dependencies and opportunities for tree-shaking or replacement.

---

## Quick Wins Checklist

- [ ] Add Vercel Speed Insights
- [ ] Compress or downscale hero video
- [ ] Add poster image to hero video
- [ ] Remove unused Inter font weights
- [ ] Add `unstable_cache` to Shopify fetches (60–300s TTL)
- [ ] Run Lighthouse and fix any remaining issues
