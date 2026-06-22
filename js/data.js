// Data loading: JSON via fetch, polling-station table via Parquet (hyparquet),
// with a CSV fallback so the page still works if the Parquet reader can't load.

const base = new URL(".", import.meta.url).href.replace(/\/js\/$/, "/");

async function getJSON(path) {
  const r = await fetch(base + path);
  if (!r.ok) throw new Error(`fetch ${path}: ${r.status}`);
  return r.json();
}

export async function loadCore() {
  const [national, marz, parties, links, meta, geo, profiles, comGeo] = await Promise.all([
    getJSON("data/national.json"),
    getJSON("data/marz.json"),
    getJSON("data/parties.json"),
    getJSON("data/links.json"),
    getJSON("data/meta.json"),
    getJSON("data/armenia-marz.geojson"),
    getJSON("data/party_profiles.json"),
    getJSON("data/communities_geo.json"),
  ]);
  return {
    national, marz, parties, links, meta, geo,
    profiles: profiles.profiles, communitiesGeo: comGeo.communities,
    comCoverage: { located: comGeo.located, total: comGeo.total },
  };
}

async function loadCSV(path) {
  const text = await (await fetch(base + path)).text();
  const [head, ...lines] = text.trim().split("\n");
  const cols = head.split(",");
  const numeric = new Set([
    "registered", "ballots_cast", "invalid", "valid", "turnout_pct", "inaccuracy",
  ]);
  return lines.map((ln) => {
    const cells = ln.split(",");
    const o = {};
    cols.forEach((c, i) => {
      const v = cells[i];
      o[c] = numeric.has(c) || /^[\d.+-]+$/.test(v) ? Number(v) : v;
    });
    return o;
  });
}

export async function loadCommunities() {
  return loadCSV("data/clean/communities.csv");
}
