import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Certificate } from "@/components/Certificate";
import { mockCourses } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Clock,
  User,
  PlayCircle,
  CheckCircle,
  Lock,
  ArrowLeft,
  BookOpen,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/auth/auth-context";

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const course = mockCourses.find((c) => c.id === id);
  const [activeLesson, setActiveLesson] = useState(course?.modules[0]?.lessons[0] || null);

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="glass-card p-10 text-center">
              <h1 className="font-display text-2xl font-bold mb-4">Curso não encontrado</h1>
              <Link to="/courses">
                <Button variant="gradient">Voltar aos Cursos</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Curso ainda não liberado: bloqueia o acesso direto pela URL.
  if (course.comingSoon) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="glass-card p-10 text-center max-w-lg mx-auto">
              <div className="w-12 h-12 mx-auto rounded-full bg-secondary flex items-center justify-center mb-5">
                <Lock className="w-5 h-5 text-muted-foreground" />
              </div>
              <h1 className="font-display text-2xl font-bold mb-3">{course.title}</h1>
              <p className="text-muted-foreground mb-6">
                Este curso ainda não foi liberado. Em breve o conteúdo estará disponível na
                plataforma.
              </p>
              <Link to="/courses">
                <Button variant="default">Voltar aos cursos</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = course.modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.completed).length,
    0
  );
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);
  const isCompleted = progressPercent === 100;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar aos Cursos
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Player */}
              {activeLesson && (
                <VideoPlayer videoUrl={activeLesson.videoUrl} title={activeLesson.title} />
              )}

              {/* Course Info */}
              <div className="glass-card p-6 space-y-4">
                <h1 className="font-display text-2xl md:text-3xl font-bold">
                  {course.title}
                </h1>

                <p className="text-muted-foreground">{course.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-4 h-4 text-primary" />
                    {course.instructor}
                  </span>
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <BookOpen className="w-4 h-4 text-primary" />
                    {course.modules.length} módulos
                  </span>
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <PlayCircle className="w-4 h-4 text-primary" />
                    {totalLessons} aulas
                  </span>
                </div>

                {/* Progress */}
                <div className="space-y-2 pt-4 border-t border-border/50">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {completedLessons}/{totalLessons} aulas concluídas
                    </span>
                    <span className="text-primary font-medium">{progressPercent}%</span>
                  </div>
                  <Progress value={progressPercent} className="h-2" />
                </div>

                {/* Certificate Button */}
                {isCompleted && (
                  <div className="pt-4">
                    <Certificate
                      courseName={course.title}
                      studentName={user?.name || "Aluno"}
                      completionDate={new Date().toLocaleDateString("pt-BR")}
                      instructorName={course.instructor}
                    />
                  </div>
                )}
              </div>

              {/* Current Lesson Info */}
              {activeLesson && (
                <div className="glass-card p-6">
                  <h2 className="font-display font-semibold text-lg mb-2">
                    {activeLesson.title}
                  </h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Duração: {activeLesson.duration}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar - Modules */}
            <div className="lg:col-span-1">
              <div className="glass-card p-4 sticky top-24">
                <h3 className="font-display font-semibold text-lg mb-4 px-2">
                  Conteúdo do Curso
                </h3>

                <Accordion type="multiple" defaultValue={["m1"]} className="space-y-2">
                  {course.modules.map((module, moduleIndex) => {
                    const moduleCompleted = module.lessons.every((l) => l.completed);
                    const moduleLessonsCompleted = module.lessons.filter(
                      (l) => l.completed
                    ).length;

                    return (
                      <AccordionItem
                        key={module.id}
                        value={module.id}
                        className="border-border/50"
                      >
                        <AccordionTrigger className="px-3 py-3 rounded-lg hover:bg-secondary/50 [&[data-state=open]]:bg-secondary/30">
                          <div className="flex items-center gap-3 text-left">
                            <div
                              className={cn(
                                "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold",
                                moduleCompleted
                                  ? "bg-gold/20 text-gold"
                                  : "bg-primary/20 text-primary"
                              )}
                            >
                              {moduleIndex + 1}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{module.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {moduleLessonsCompleted}/{module.lessons.length} aulas
                              </p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-2 pt-2">
                          <div className="space-y-1">
                            {module.lessons.map((lesson) => (
                              <button
                                key={lesson.id}
                                onClick={() => setActiveLesson(lesson)}
                                className={cn(
                                  "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all",
                                  activeLesson?.id === lesson.id
                                    ? "bg-primary/20 border border-primary/50"
                                    : "hover:bg-secondary/50"
                                )}
                              >
                                <div className="flex-shrink-0">
                                  {lesson.completed ? (
                                    <CheckCircle className="w-5 h-5 text-gold" />
                                  ) : activeLesson?.id === lesson.id ? (
                                    <PlayCircle className="w-5 h-5 text-primary" />
                                  ) : (
                                    <Lock className="w-5 h-5 text-muted-foreground" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p
                                    className={cn(
                                      "text-sm truncate",
                                      lesson.completed && "text-muted-foreground"
                                    )}
                                  >
                                    {lesson.title}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {lesson.duration}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetail;
