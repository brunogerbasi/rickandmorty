import { useEffect, useState, useRef, useCallback } from "react";
import { Character, CharacterCard } from "../../components/common/Character/Character";
import { getAllCharacters } from "../../services/characterService";
import Header from "../../components/layout/Header/Header";
import Title from "../../components/layout/Title/Title";
import Footer from "../../components/layout/Footer/Footer";
import FilterBar, { Filters } from "../../components/common/FilterBar/FilterBar";
import { Modal } from "../../components/layout/Modal/Modal";


export function Home() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<Filters>({
        name: "",
        status: "",
        species: "",
        gender: "",
    });

    const observerRef = useRef<IntersectionObserver | null>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);

    const loadCharacters = useCallback(async (pageToLoad: number) => {
        setLoading(true);
        try {
            const data = await getAllCharacters(pageToLoad);
            setCharacters((prev) => [...prev, ...data.results]);
            setHasMore(Boolean(data.info.next));
        } catch (err) {
            console.error(err);
            setError("Não foi possível carregar personagens. Tente novamente mais tarde.");
          } finally {
            setLoading(false);
          }
    }, []);

    useEffect(() => {
        loadCharacters(1);
    }, [loadCharacters]);

    useEffect(() => {
        if (loading) return;
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prev) => prev + 1);
                }
            },
            { rootMargin: "200px", threshold: 0.1 }
        );

        if (sentinelRef.current) {
            observerRef.current.observe(sentinelRef.current);
        }

        return () => {
            observerRef.current?.disconnect();
        };
    }, [hasMore, loading]);


    useEffect(() => {
        if (page === 1) return;
        loadCharacters(page);
    }, [page, loadCharacters]);


    const filteredCharacters = characters.filter((char) =>
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
                    {filteredCharacters.map((char, index) => (
                        <div key={index}><CharacterCard character={char} /> </div>
                    ))}
                </div>

                <div ref={sentinelRef} />

                {loading && (
                    <div className="py-4 text-center text-gray-500">
                        Carregando mais personagens…
                    </div>
                )}
            </main>

            <Footer />
            {error && <Modal message={error} onClose={() => setError(null)} />}
        </div>
    );
}
