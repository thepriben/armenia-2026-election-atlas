# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] — 2026-06-26

### Added

- **2018 snap parliamentary election** (9 December 2018) added to the portal, at the
  same granularity and with every feature of the other views.
  - 11 ballot forces; the three that entered the 132-seat assembly: My Step Alliance
    (70.4 %, 88 seats), Prosperous Armenia (8.3 %, 26) and Bright Armenia (6.4 %, 18).
    My Step carried all eleven provinces; the Republican Party that had governed for
    two decades collapsed below the threshold and won no seats.
  - Re-aggregated to the modern consolidated communities (`consolidate_from: 2026`).
  - 100 % geocoding: 81/81 communities and 925/925 settlements located, with trilingual
    party profiles and Wikipedia/Wikidata cross-references.
  - The hemicycle and threshold copy now adapt to the 132-seat assembly automatically.
- `scripts/fetch_source.sh` now knows the 2017 and 2018 CEC `electionId`s.

## [1.1.0] — 2026-06-26

### Added

- **2017 parliamentary election** (2 April 2017) added to the portal, at the same
  granularity and with every feature of the 2021/2026 views: national results,
  105-seat hemicycle, full party table, province choropleth, ~81-community bubble
  map, settlement drill-down and OpenStreetMap audit page.
  - 9 ballot forces, incl. the four that entered parliament: Republican Party of
    Armenia (49.1 %, 58 seats), Tsarukyan Alliance (27.4 %, 31), Way Out / Yelk
    (7.8 %, 9) and the ARF–Dashnaktsutyun (6.6 %, 7).
  - Re-aggregated to the modern consolidated communities (`consolidate_from: 2026`),
    with three depopulated border villages mapped to their surviving municipalities
    (Nerkin/Verin Shorzha → Vardenis, Nor Astghaberd → Kajaran).
  - 100 % geocoding: 81/81 communities and 925/925 settlements located, with
    trilingual party profiles and Wikipedia/Wikidata cross-references.

## [1.0.0] — 2026-06-23

First public release: a trilingual (EN / HY / FR) interactive geographic atlas of
Armenia's parliamentary elections, built on official CEC data and served at
[hayntrutyun.info](https://hayntrutyun.info).

### Added

- **Multi-election portal** covering the **2021** early and **2026** parliamentary
  elections, with an interactive election switcher in the header.
- **Trilingual UI** (English, Armenian, French) with a language switcher and a
  light/dark theme toggle. Defaults to Armenian.
- **National results**: vote-share bars, a 105-seat hemicycle, and a full national
  table with per-party seats and leaders.
- **Map of the vote**: a province (marz) choropleth, per-party maps, and a clickable
  panel to inspect each province.
- **Community bubble map** built on the ~81 consolidated communities, with pixel
  clustering and a compact per-point tooltip.
- **Settlement drill-down**: click a community to reveal its individual localities;
  a real zoom-out gesture returns to the full map.
- **Geocoding pipeline** (GeoNames + an OpenStreetMap/Nominatim fallback cache) that
  locates **100 % of settlements** (930/930 in 2026, 923/923 in 2021), with
  build-time province-integrity checks.
- **Data downloads**: clean Parquet and CSV for marz, communities, settlements and
  polling stations.
- **OpenStreetMap audit page** (`verify.html`): a Leaflet view overlaying every
  community and settlement on real tiles, with a 2021/2026 switch, marz filter,
  name search and settlement→seat link layer. Cross-linked with the main atlas.
- **Overseas electronic-vote note**, shown per election when figures are available.
- Custom domain `hayntrutyun.info`.

### Changed

- Reframed the project from a single 2026 page into a multi-election portal, with
  per-election data folders (`data/<year>/`) and a shared `elections.json` index.
- Focused the experience on the vote itself, trimming earlier context, correlation
  and forensics sections in favour of clearer, sober copy.
- Re-aggregated the 2021 results to the same ~81 consolidated communities as 2026
  for consistent granularity and map naming.
- Hero title, brand and document title now reflect the currently selected election.

### Fixed

- Corrected severely mislocated 2021 communities and disambiguated same-province
  homonyms (e.g. the two "Baghramyan") using their settlements' centroid.
- Kept all map bubbles inside Armenia at every zoom level by anchoring them to their
  true projected position and bounding the declustering offset in screen pixels.
- Smoothed wheel zooming by throttling cluster re-rendering to one frame.
- Fixed the national table overflowing sideways and refreshed hero stats on language
  change.
