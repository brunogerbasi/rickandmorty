import { useRef, useEffect, useState } from "react";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { CharacterCard } from "../../components/common/Character/Character";
import { getAllCharacters } from "../../services/characterService";
import Header from "../../components/layout/Header/Header";
import Title from "../../components/layout/Title/Title";
import Footer from "../../components/layout/Footer/Footer";
import FilterBar, { Filters } from "../../components/common/FilterBar/FilterBar";
import { Modal } from "../../components/layout/Modal/Modal";

export function Home() {
  const [filters, setFilters] = useState<Filters>({
    name: "",
    status: "",
    species: "",
    gender: "",
  });
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["characters", filters],
    queryFn: ({ pageParam = 1 }) => getAllCharacters(pageParam, filters),    
    placeholderData: keepPreviousData,            
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.info.next
        ? Number(new URL(lastPage.info.next).searchParams.get("page"))
        : undefined,
  });
  
  const characters = data?.pages.flatMap(page => page.results) ?? [];
  const [, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (isLoading || !hasNextPage) return;

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px", threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [fetchNextPage, hasNextPage, isLoading]);
  
  const filteredCharacters = characters.filter(char =>
    (!filters.name || char.name.toLowerCase().includes(filters.name.toLowerCase())) &&
    (!filters.status || char.status === filters.status) &&
    (!filters.species || char.species.toLowerCase().includes(filters.species.toLowerCase())) &&
    (!filters.gender || char.gender === filters.gender)
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <Title>Catálogo de personagens da série Rick and Morty</Title>

      <main className="flex-1">
        <div className="mt-6">
          <FilterBar filters={filters} onFilterChange={setFilters} />
        </div>
   
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-1">
          {filteredCharacters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
        
        <div ref={sentinelRef} />
        
        {(isLoading || isFetchingNextPage) && (
          <div className="py-4 text-center text-gray-500">
            {isLoading ? "Carregando personagens…" : "Carregando mais personagens…"}
          </div>
        )}
      </main>

      <Footer />
      
      {isError && (
        <Modal
          message={
            error instanceof Error
              ? error.message
              : "Não foi possível carregar personagens."
          }
          onClose={() => setError(null)
          }
        />
      )}
    </div>
  );
}
