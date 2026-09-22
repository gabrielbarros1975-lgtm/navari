import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { courseTracks, mockCourses } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Todos");

  const categories = useMemo(
    () => ["Todos", ...courseTracks.map((track) => track.label)],
    []
  );

  const hasAvailableCourse = mockCourses.some((c) => !c.comingSoon);

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "Todos" || course.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Formações em <span className="gradient-text">Registro de Imóveis</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Formações práticas desenvolvidas sob a perspectiva do Registro de Imóveis,
              organizadas para compreender tanto o percurso dos títulos quanto a prática da
              qualificação registral.
            </p>
          </div>

          {!hasAvailableCourse && (
            <div className="glass-card p-5 md:p-6 mb-8 flex flex-col sm:flex-row items-center gap-4 justify-between text-center sm:text-left">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  A primeira formação desta jornada já está disponível.
                </p>
                <p className="text-sm text-muted-foreground">
                  Participe da Imersão prática em{" "}
                  <span className="text-foreground font-medium">
                    Incorporação Imobiliária: da Prenotação ao Registro
                  </span>
                  , uma formação online e ao vivo dedicada à incorporação imobiliária sob a
                  perspectiva do Registro de Imóveis.
                </p>
              </div>
              <a href="/#inscricao" className="shrink-0">
                <Button variant="hero" className="gap-2 w-full sm:w-auto">
                  Conhecer a Imersão
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          )}

          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar formações…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card border-border/50 h-12"
              />
            </div>
          </div>

          {/* Course Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={cat === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
          </div>

          {/* Trilhas */}
          {filteredCourses.length > 0 ? (
            <div className="space-y-16">
              {courseTracks.map((track) => {
                const coursesInTrack = filteredCourses.filter(
                  (course) => course.category === track.label
                );

                if (coursesInTrack.length === 0) return null;

                return (
                  <section key={track.id}>
                    <div className="max-w-3xl mb-8">
                      <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-2">
                        Trilha
                      </span>
                      <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                        {track.label}
                      </h2>
                      <div className="space-y-3 text-muted-foreground text-sm md:text-base leading-relaxed">
                        {track.description.map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                      {track.highlight && (
                        <div className="mt-4 inline-block bg-gradient-to-r from-gold/15 to-gold/5 border-l-4 border-gold px-4 py-2 rounded-r-xl">
                          <p className="font-display font-semibold text-gold">
                            {track.highlight}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {coursesInTrack.map((course) => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">
                Nenhuma formação encontrada
              </h3>
              <p className="text-muted-foreground">
                Tente buscar por outros termos
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
