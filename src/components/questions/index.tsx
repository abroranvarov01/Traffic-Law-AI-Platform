"use client";
import React, { useState } from "react";
import "./QuestionsContent.scss";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
const QuestionsContent = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const router = useRouter();
  const t = useTranslations("FAQ");
  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <main className="QuestionsContentMain">
      <button className="backButton" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("Back")}
      </button>
      <div className="container">
        <div className="QuestionsContentMainContainer">
          <div className="header">
            <h1 className="title">{t("title")}</h1>
            <div className="divider"></div>
          </div>
          <div className="sections">
            {t.raw("questions").map((section: { title: string; content: string }, index: number) => (
              <div
                key={index}
                className={`section ${openIndex === index ? "open" : ""}`}
              >
                <button
                  className="sectionHeader"
                  onClick={() => toggleSection(index)}
                >
                  <span className="icon">
                    {openIndex === index ? <Minus /> : <Plus />}
                  </span>
                  {section.title}
                </button>
                <div className="sectionContent">
                  <div>{section.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default QuestionsContent;
