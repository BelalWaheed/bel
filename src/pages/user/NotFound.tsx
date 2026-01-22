import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-lg text-center space-y-6">
        {/* 404 Icon */}
        <div className="w-32 h-32 mx-auto rounded-full bg-secondary flex items-center justify-center mb-6">
          <span className="text-6xl">🔍</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold">
          <span className="gradient-text">{t("notFound.title")}</span>
        </h1>

        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          {t("notFound.description")}
        </p>

        <Link to="/">
          <Button className="btn-premium px-8 py-4 text-white text-lg">
            {t("common.goHome")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
