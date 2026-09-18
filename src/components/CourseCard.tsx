import { Link } from "react-router-dom";
import { Course } from "@/types";
import { Clock, User, PlayCircle, Lock, Video, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CourseThumb } from "@/components/CourseThumb";
import { cn } from "@/lib/utils";
import { brl, installmentValue } from "@/lib/price";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const isFeatured = Boolean(course.externalHref);
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = course.modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.completed).length,
    0
  );

  const card = (
    <div
      className={cn(
        "glass-card-hover overflow-hidden h-full",
        isFeatured && "border-gold ring-1 ring-gold/40 shadow-lg shadow-gold/10",
        course.comingSoon ? "cursor-default" : "group"
      )}
    >
      <div className="relative">
        <CourseThumb category={course.category} className={course.comingSoon && !isFeatured ? "opacity-70" : undefined} />

        {isFeatured ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold text-gold-foreground text-xs font-bold uppercase tracking-wide shadow-md">
              <Video className="w-3.5 h-3.5" />
              {course.statusLabel}
            </span>
          </div>
        ) : course.comingSoon ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/95 border border-border text-xs font-semibold">
              <Lock className="w-3.5 h-3.5" />
              {course.statusLabel ?? "Em breve"}
            </span>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-background/15 backdrop-blur-sm flex items-center justify-center">
              <PlayCircle className="w-7 h-7 text-white" />
            </div>
          </div>
        )}

        {!course.hideMeta && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-background/90 text-xs font-medium">
            {course.modules.length} {course.modules.length === 1 ? "módulo" : "módulos"}
          </div>
        )}
      </div>

      <div className="p-5 space-y-4">
        <h3
          className={cn(
            "font-display font-semibold text-lg line-clamp-2 transition-colors",
            !course.comingSoon && "group-hover:text-primary"
          )}
        >
          {course.title}
        </h3>

        <p className="text-muted-foreground text-sm line-clamp-2">{course.description}</p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {course.instructor}
          </span>
          {!course.hideMeta && (
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration}
            </span>
          )}
        </div>

        {!course.comingSoon && course.progress !== undefined && course.progress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">
                {completedLessons}/{totalLessons} aulas
              </span>
              <span className="text-primary font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}

        {!course.comingSoon && course.price !== undefined && (
          <div className="pt-1 border-t border-border/60">
            <div className="flex items-baseline gap-1.5 pt-3">
              <span className="text-xs text-muted-foreground">
                {course.installments ?? 12}x de
              </span>
              <span className="font-display text-2xl font-bold text-primary">
                {brl(installmentValue(course.price, course.installments ?? 12))}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              ou {brl(course.price)} à vista
            </p>
          </div>
        )}

        {course.ctaLabel && course.externalHref && (
          <a href={course.externalHref} className="block pt-1">
            <Button variant="hero" className="w-full gap-2">
              {course.ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        )}
      </div>
    </div>
  );

  if (course.comingSoon) {
    return (
      <div aria-label={isFeatured ? course.title : `${course.title} (em breve)`}>{card}</div>
    );
  }

  return <Link to={`/course/${course.id}`}>{card}</Link>;
}
