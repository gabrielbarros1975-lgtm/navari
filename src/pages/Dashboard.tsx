import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { mockCourses } from "@/data/mockData";
import {
  BookOpen,
  CheckCircle2,
  Award,
  PlayCircle,
  BarChart3,
  CalendarClock,
  Clock,
  Video,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth/auth-context";
import { mockNextLive } from "@/data/mockData";

const Dashboard = () => {
  const { user } = useAuth();

  const liveDate = new Date(mockNextLive.startsAt);
  const liveDateLabel = liveDate.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
  const liveTimeLabel = liveDate.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const enrolledCourses = mockCourses.filter((c) => c.progress !== undefined && c.progress > 0);
  const completedCourses = mockCourses.filter((c) => c.progress === 100);
  const inProgressCourses = mockCourses.filter(
    (c) => c.progress !== undefined && c.progress > 0 && c.progress < 100
  );
  // Cursos ainda sem matrícula (0% e sem estar "em breve" fica de fora igual).
  const enrolledIds = new Set(enrolledCourses.map((c) => c.id));
  const otherCourses = mockCourses.filter((c) => !enrolledIds.has(c.id));

  // Só conta aulas de cursos liberados: um curso "em breve" não deveria inflar
  // as estatísticas com aulas marcadas como concluídas nos dados de exemplo.
  const accessibleCourses = mockCourses.filter((c) => !c.comingSoon);
  const totalLessons = accessibleCourses.reduce(
    (acc, c) => acc + c.modules.reduce((a, m) => a + m.lessons.length, 0),
    0
  );
  const completedLessons = accessibleCourses.reduce(
    (acc, c) =>
      acc + c.modules.reduce((a, m) => a + m.lessons.filter((l) => l.completed).length, 0),
    0
  );
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const stats = [
    {
      icon: BookOpen,
      label: "Cursos Matriculados",
      value: enrolledCourses.length,
    },
    {
      icon: CheckCircle2,
      label: "Aulas Concluídas",
      value: completedLessons,
    },
    {
      icon: Award,
      label: "Certificados",
      value: completedCourses.length,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="glass-card p-6 md:p-8 mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">
              Bem-vindo, <span className="gradient-text">{user?.name}</span>!
            </h1>
            <p className="text-muted-foreground">
              Continue de onde parou e alcance seus objetivos.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card-hover p-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Overall Progress: só faz sentido se houver curso liberado */}
          {totalLessons > 0 && (
            <div className="glass-card p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <h2 className="font-display font-semibold text-lg">Progresso Geral</h2>
                </div>
                <span className="text-sm text-muted-foreground">
                  {completedLessons}/{totalLessons} aulas concluídas
                </span>
              </div>
              <Progress value={progressPercent} className="h-3" />
              <div className="mt-2 text-right text-sm text-primary font-medium">
                {progressPercent}%
              </div>
            </div>
          )}

          {/* Next Live */}
          <div className="glass-card p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                    <CalendarClock className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display font-semibold text-lg">Próxima live</h2>
                    <p className="text-sm text-muted-foreground">Ao vivo com especialista</p>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="font-semibold text-lg leading-snug">{mockNextLive.title}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {liveDateLabel} às {liveTimeLabel}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      {mockNextLive.durationMinutes} min
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      {mockNextLive.host}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                <a href={mockNextLive.joinUrl} target="_blank" rel="noreferrer">
                  <Button variant="hero" className="gap-2">
                    <Video className="w-4 h-4" />
                    Entrar na live
                  </Button>
                </a>
                <a
                  href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                    mockNextLive.title
                  )}&dates=${encodeURIComponent(
                    liveDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
                  )}/${encodeURIComponent(
                    new Date(liveDate.getTime() + mockNextLive.durationMinutes * 60000)
                      .toISOString()
                      .replace(/[-:]/g, "")
                      .split(".")[0] + "Z"
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="outline">Adicionar ao calendário</Button>
                </a>
              </div>
            </div>
          </div>

          {/* Continue Learning */}
          {inProgressCourses.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl md:text-2xl font-bold flex items-center gap-2">
                  <PlayCircle className="w-6 h-6 text-primary" />
                  Continuar Estudando
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inProgressCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </section>
          )}

          {/* Completed Courses */}
          {completedCourses.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl md:text-2xl font-bold flex items-center gap-2">
                  <Award className="w-6 h-6 text-gold" />
                  Cursos Concluídos
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </section>
          )}

          {/* Explore More */}
          {otherCourses.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl md:text-2xl font-bold">
                  Explorar Novos Cursos
                </h2>
                <Link to="/courses">
                  <Button variant="outline">Ver Todos</Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {otherCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
