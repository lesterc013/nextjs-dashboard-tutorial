"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

// Client component that takes in a prop called placeholder
// useSearchParams --> Read the current URL's search params
// usePathname --> Read the current pathname eg /dashboard/invoices
// useRouter --> programatically reroute
export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((userTyped: string) => {
    console.log(`Searching... ${userTyped}`);
    // We need URLSearchParams to mutate the value of the current query params
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    // If there is something provided i.e. userTyped not null, then set the query=userTyped; else, delete the query param
    if (userTyped) {
      params.set("query", userTyped);
    } else {
      params.delete("query");
    }

    const newPathname = `${pathname}?${params.toString()}`;
    router.replace(newPathname);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
