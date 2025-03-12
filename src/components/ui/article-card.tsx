import { ArticleType } from "@/app/[locale]/articles/page";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import React from "react";

const ArtileCard = ({ title, date, quote, description }: ArticleType) => {
  const t = useTranslations("Articles");
  return (
    <button
      style={{ border: "1px solid #FFFFFF1A" }}
      className="hidden flex-col items-start gap-2 rounded-[8px]  p-3 text-left text-sm transition-all hover:bg-background-hover  lg:flex"
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold text-text ">{title}</div>
          </div>
          <div className="ml-auto text-xs text-muted-foreground">{date}</div>
        </div>
        <div className="text-xs font-medium text-text">
          {quote?.length > 20 ? description.slice(0, 20) + "..." : description}
        </div>
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        {description?.length > 50
          ? description.slice(0, 50) + "..."
          : description}
      </div>
      <div className="flex items-center gap-2">
        <Link
          href={"/articles"}
          className="inline-flex items-center rounded-[6px] border px-2.5 py-0.5 text-xs font-semibold transition-colors  border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
        >
          {t("go")}
        </Link>
      </div>
    </button>
  );
};

export default ArtileCard;
