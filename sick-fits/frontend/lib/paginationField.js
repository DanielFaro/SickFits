import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells Apollo we will take care of everything
    read(existing = [], { args, cache }) {
      // first thing it does it asks the read function for those items
      const { skip, first } = args;

      // Read the number of items on the page from cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x); // filter only returns defined items
      // If
      // There are itmes
      // AND there aren't enough items to satisfy how many were required. e.g. only have one item but require 2 for a page
      // AND we are on the first page
      // THEN JUST SEND IT

      if (items.length && items.length !== first && page === pages) {
        console.log('Inside first if ==', items);
        return items;
      }
      if (items.length !== first) {
        // we don't have any items, we must fetch them from the network
        console.log('inside second if');
        return false;
      }

      // if there are items, just return them from the cache, don't need to go to the network
      if (items.length) {
        console.log(
          `There are ${items.length} items in the cache! Gonna send them to apollo`
        );
        return items;
      }

      return false; // fallback to network

      // Second thing is to return false from here, (network request)
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // this runs when the Apollo client comes back from the network with our product
      console.log(`Merging items from the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      // eslint-disable-next-line no-plusplus
      for (let i = skip; i < skip + incoming.length; i++) {
        merged[i] = incoming[i - skip];
      }
      console.log(merged);
      // finally we return the merged items from the cache
      return merged;
    },
  };
}
