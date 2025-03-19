"use client";
import React, { useState } from "react";
import "./index.scss";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";
import { useCookies } from "react-cookie";
import { useMainContext } from "@/providers/contextProvider";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher";
import {
  Icon,
  ScanText,
  Images,
  Newspaper,
  CirclePlus,
  CircleHelp,
  MessagesSquare,
  Sparkles,
  LogOut,
  ImagePlus,
} from "lucide-react";

import { featherText } from "@lucide/lab";
import { planet } from "@lucide/lab";
import ThemeToggle from "@/components/theme-toggle/theme-toggle";
import ArtileCard from "@/components/ui/article-card";
import { title } from "process";
import axios from "axios";

const MobileMenu = () => {
  const t2 = useTranslations("Articles");
  const Articles = t2.raw("products");
  const router = useRouter();
  const t = useTranslations("Dashboard");
  const locale = useLocale();
  const [user, setUser] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies(
    "secretToken",
    "isActiveUser",
    "subscriptionDate"
  );
  const { openLogoMenu, setOpenLogoMenu, openUserMenu, setOpenUserMenu } =
    useMainContext();
  const [activeUser, setActiveUser] = React.useState(false);

  React.useEffect(() => {
    setActiveUser(cookies.isActiveUser);
  }, [cookies]);
  const [cookiesTheme] = useCookies(["theme"]);
  const [theme, setTheme] = React.useState("dark");

  React.useEffect(() => {
    setTheme(cookiesTheme.theme || "dark");
  }, [cookiesTheme]);

  React.useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
  }, [theme]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/profile`,
          {
            headers: { Authorization: `Bearer ${cookies.secretToken}` },
          }
        );
        const data = response.data;
        setUser(data);
      } catch (error) {
        console.error("Ошибка при запросе:", error);
        removeCookie("secretToken");
        router.push("/signin");
      }
    };

    fetchData();
  }, []);
  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "";

    const matches = name.match(/[A-Z]/g);
    return matches
      ? matches.slice(0, 2).join("")
      : name.slice(0, 2).toUpperCase();
  };

  const initialName = getInitials(user?.fullname);
  return (
    <div
      className="downMenuShadow"
      onClick={() => setOpenLogoMenu(!openLogoMenu)}
    >
      <div className="downMenu" onClick={(e) => e.stopPropagation()}>
        <div
          className={`userDownMenuHeader ${theme === "light" ? "light" : ""}`}
        >
          <div className="userDownMenuHeaderWrapper">
            <h3 className="userDownMenuHeaderLabel">{t("profile")}</h3>
          </div>

          <button name="close" onClick={() => setOpenLogoMenu(!openLogoMenu)}>
            <Image
              src="/images/closeIcon.svg"
              alt="close"
              width="15"
              height="15"
            />
          </button>
        </div>
        <div className="mobileMenu">
          <Link
            className={`sideBarLink ${theme === "light" ? "light" : ""}`}
            href={"/dashboard"}
            onClick={(e) => {
              e.preventDefault();
              setOpenLogoMenu(!openLogoMenu);
              router.replace("/dashboard");
            }}
          >
            <CirclePlus color="white" size={25} />
            <h3 className="sideBarLinkLabel">{t("newChat")}</h3>
            <div className="hoverEffectIcon">
              <Image
                src="/images/arrow-forward-circle.svg"
                alt="website"
                width="20"
                height="20"
              />
            </div>
          </Link>
          <Link
            className={`sideBarLink ${theme === "light" ? "light" : ""}`}
            href={"https://enix.uz/"}
            onClick={() => setOpenLogoMenu(!openLogoMenu)}
          >
            <Icon iconNode={planet} color="white" size={25} />
            <h3 className="sideBarLinkLabel">{t("sideBar.title")}</h3>
            <div className="hoverEffectIcon">
              <Image
                src="/images/arrow-forward-circle.svg"
                alt="website"
                width="20"
                height="20"
              />
            </div>
          </Link>
          <Link
            className={`sideBarLink ${theme === "light" ? "light" : ""}`}
            href={"/questions"}
            onClick={() => setOpenLogoMenu(!openLogoMenu)}
          >
            <CircleHelp color="white" size={25} />
            <h3 className="sideBarLinkLabel">FAQ</h3>
            <div className="hoverEffectIcon">
              <Image
                src="/images/arrow-forward-circle.svg"
                alt="website"
                width="20"
                height="20"
              />
            </div>
          </Link>
          <Link
            className={`sideBarLink ${theme === "light" ? "light" : ""}`}
            href={"/articles"}
            onClick={() => setOpenLogoMenu(!openLogoMenu)}
          >
            <Newspaper color="white" size={25} />
            <h3 className="sideBarLinkLabel">{t("sideBar.articles")}</h3>
            <div className="hoverEffectIcon">
              <Image
                src="/images/arrow-forward-circle.svg"
                alt="website"
                width="20"
                height="20"
              />
            </div>
          </Link>
          <LanguageSwitcher />
          <ThemeToggle />
          <div className="sidebarDivider"></div>
          <Link
            className={`sideBarLink ${theme === "light" ? "light" : ""}`}
            href={"/dashboard/text"}
            onClick={() => setOpenLogoMenu(!openLogoMenu)}
          >
            <MessagesSquare color="white" size={25} />
            <h3 className="sideBarLinkLabel">{t("sideBar.text")}</h3>
            <div className="hoverEffectIcon">
              <Image
                src="/images/arrow-forward-circle.svg"
                alt="website"
                width="20"
                height="20"
              />
            </div>
          </Link>
          <Link
            className={`sideBarLink ${theme === "light" ? "light" : ""}`}
            href={"/dashboard/image"}
            onClick={() => setOpenLogoMenu(!openLogoMenu)}
          >
            <ImagePlus color="white" size={25} />
            <h3 className="sideBarLinkLabel">{t("sideBar.text2")}</h3>
            <div className="hoverEffectIcon imageGenerateIcon">
              <Image
                src="/images/arrow-forward-circle.svg"
                alt="website"
                width="20"
                height="20"
              />
            </div>
          </Link>
        </div>

        <div className="mobileMenuFunctions">
          <div className="grid col-1 gap-2">
            {Articles.slice(0, 3).map((product) => (
              <ArtileCard
                key={product.id}
                title={product.title}
                description={product.description}
                quote={product.quote}
              />
            ))}
          </div>
          <div className="bottomWrapper">
            {!activeUser && (
              <div className="planInfo">
                <h3 className="planInfoTitle">Текущий план</h3>
                <p className="planInfoText">
                  Вы использовали 80% бесплатных сообщений. Нужно больше?
                </p>
                <button
                  name="upgrade"
                  onClick={() => router.push("/prices")}
                  className="planUpgradeButton"
                >
                  Расширить лимит
                </button>
              </div>
            )}

            {/* <button
              className="mobileExitButton"
              title="Yangi so'rov yarating"
              onClick={() => {
                removeCookie("secretToken");
                window.location.href = `${locale}/signin`;
              }}
            >
              {t("sideBar.exit")}
              <LogIn color="#ce3737" size={25} />
            </button> */}
            <div className="userInfo">
              <div className="userInfoWrapper">
                <div className="userIcon">
                  <span className="spanIcon">{initialName}</span>
                </div>
                <div>
                  <h3 className="userInfoTitle">{user.fullname}</h3>
                  <p className="userInfoText">{user.phone_number}</p>
                </div>
              </div>
              <button
                name="exit"
                onClick={() => {
                  removeCookie("secretToken");
                  window.location.href = `/${locale}/signin`;
                }}
                className="cursor-pointer w-8 h-8"
              >
                <LogOut color="#ce3737" className="text-text " size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
