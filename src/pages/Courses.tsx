import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { mockCourses } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Todos");

  const categories = useMemo(
    () => ["Todos", ...new Set(mockCourses.map((c) => c.category))],
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
              Nossos <span className="gradient-text">Cursos</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cursos especializados para profissionais de cartórios de registro de imóveis,
              em fase de produção.
            </p>
          </div>

          {!hasAvailableCourse && (
            <div className="glass-card p-5 md:p-6 mb-8 flex flex-col sm:flex-row items-center gap-4 justify-between text-center sm:text-left">
              <p className="text-sm text-muted-foreground">
                Nenhum curso disponível para compra ainda. Enquanto isso, participe da{" "}
                <span className="text-foreground font-medium">imersão ao vivo</span> em
                Incorporação Imobiliária.
              </p>
              <a href="/#inscricao" className="shrink-0">
                <Button variant="hero" className="gap-2 w-full sm:w-auto">
                  Ver a imersão
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
                placeholder="Buscar cursos..."
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

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">
                Nenhum curso encontrado
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
