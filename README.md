## Search Feature

Client-side search over the menu (~150 items) — instant, offline-capable,
and free of per-keystroke Firestore reads.

**Sync:** A single persistent `onSnapshot` listener, attached once at the app
root, keeps a Zustand store (`useMenuSearchStore`) hydrated with the menu
collection. The store is a dumb cache (`setItems`, `setLoading` only); the
listener is its only writer. Offline support is automatic via
`@react-native-firebase/firestore`'s default persistence — no extra code
needed for offline reads or reconnect syncing.

**Search:** `useMenuSearch` filters the cached menu client-side via
`useMemo`, matching `name`, `category`, and `subCategory` (case-insensitive).
Empty query returns no results (search-as-you-type, not browse-by-default).

**Cost:** Firestore reads happen once on load, then only on actual menu
changes. Search itself never triggers a read.

**Scope decision:** Relevance ranking (name > subcategory > category) was
designed but deliberately skipped — at this scale, result sets are small
enough that ordering barely matters, and vague broad queries are better
served by the app's existing category-browse flow than by search.To preview components locally, navigate to the /PlaygroundMenu route while in development mode.
