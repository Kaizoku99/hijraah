"use client";

import {
  ArrowRight,
  MessageSquare,
  Shield,
  Clock,
  CheckCircle,
  Globe,
  Compass,
  Search,
  User,
  LineChart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HomeClient({ locale }: { locale: string }) {
  const t = useTranslations();
  const linkPrefix = `/${locale}`;
  // Determine if current locale is RTL
  const isRTL = locale === "ar";

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 py-16 md:py-20 lg:py-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500 filter blur-3xl"></div>
          <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-indigo-500 filter blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-60 h-60 rounded-full bg-sky-500 filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className={cn("text-left", isRTL && "text-right")}>
              <div className="inline-block px-3 py-1 mb-4 md:mb-6 text-sm font-medium rounded-full bg-blue-500/20 text-blue-200 dark:bg-blue-800/30 dark:text-blue-200">
                {t("Home.simplifiedSolutions")}
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 md:mb-6 leading-tight">
                {t("Home.titleStart")}{" "}
                <span className="text-blue-300 dark:text-blue-300 relative">
                  {t("Home.titleHighlight")}
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 rounded-full"></span>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 dark:text-blue-100 mb-6 md:mb-8 leading-relaxed">
                {t("Home.description")}
              </p>
              <div
                className={cn(
                  "flex flex-col sm:flex-row gap-4",
                  isRTL && "sm:flex-row-reverse"
                )}
              >
                <Button
                  asChild
                  size="lg"
                  className="text-lg font-medium bg-white text-blue-700 hover:bg-blue-50 dark:bg-blue-100 dark:text-blue-900 dark:hover:bg-blue-200 transition-all duration-200"
                >
                  <Link
                    href={`${linkPrefix}/chat`}
                    className={cn(
                      "flex items-center",
                      isRTL && "flex-row-reverse"
                    )}
                  >
                    <>
                      {t("Home.startChat")}
                      <MessageSquare
                        className={cn("h-5 w-5", isRTL ? "mr-2" : "ml-2")}
                      />
                    </>
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-lg font-medium border-white text-white hover:bg-white/10 dark:border-blue-300 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-all duration-200"
                >
                  <Link
                    href={`${linkPrefix}/assessment`}
                    className={cn(
                      "flex items-center",
                      isRTL && "flex-row-reverse"
                    )}
                  >
                    <>
                      {t("Home.checkEligibility")}
                      <ArrowRight
                        className={cn("h-5 w-5", isRTL ? "mr-2" : "ml-2")}
                      />
                    </>
                  </Link>
                </Button>
              </div>

              {/* Added Dashboard link for existing users */}
              <div
                className={cn(
                  "mt-6 flex",
                  isRTL ? "justify-end" : "justify-start"
                )}
              >
                <Button
                  asChild
                  variant="link"
                  className="text-blue-200 hover:text-white"
                >
                  <Link
                    href={`${linkPrefix}/dashboard`}
                    className={cn(
                      "flex items-center",
                      isRTL && "flex-row-reverse"
                    )}
                  >
                    <>
                      <LineChart
                        className={cn("h-4 w-4", isRTL ? "ml-2" : "mr-2")}
                      />
                      {t("Home.existingUsers")}
                    </>
                  </Link>
                </Button>
              </div>

              <div className="mt-6 md:mt-8 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:bg-gray-700 dark:border-blue-900"
                    ></div>
                  ))}
                </div>
                <p
                  className={cn("ml-4", isRTL && "mr-4 ml-0")}
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  <span className="font-medium">5,000+</span>{" "}
                  {t("Home.successfulJourneys")}
                </p>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="w-full h-[500px] relative bg-gradient-to-tr from-blue-400/20 to-blue-600/20 rounded-lg backdrop-blur-sm p-6 border border-white/10">
                <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-blue-500/30 backdrop-blur-xl"></div>
                <div className="absolute -left-6 -bottom-6 w-16 h-16 rounded-full bg-indigo-500/30 backdrop-blur-xl"></div>

                <div className="h-full w-full rounded-md bg-white/5 backdrop-blur-sm border border-white/10 p-4 flex flex-col">
                  <div className="h-10 w-full bg-blue-900/40 rounded-md mb-4 flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>

                  <div className="flex-1 bg-blue-900/30 rounded-md p-4 backdrop-blur-sm">
                    <div
                      className={cn(
                        "flex items-start mb-4",
                        isRTL && "flex-row-reverse"
                      )}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0",
                          isRTL ? "ml-3" : "mr-3"
                        )}
                      >
                        <MessageSquare className="h-4 w-4 text-white" />
                      </div>
                      <div
                        className={cn(
                          "bg-blue-800/40 p-3 rounded-lg",
                          isRTL ? "rounded-tr-none" : "rounded-tl-none"
                        )}
                      >
                        <p
                          className={cn(
                            "text-sm text-blue-100",
                            isRTL && "text-right"
                          )}
                          dir={isRTL ? "rtl" : "ltr"}
                        >
                          {t("Home.chatExample.question")}
                        </p>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "flex items-start mb-4",
                        isRTL && "flex-row-reverse"
                      )}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0",
                          isRTL ? "ml-3" : "mr-3"
                        )}
                      >
                        <svg
                          className="h-4 w-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.01 8.01 0 0 1-8 8zm-1-5h2v2h-2zm0-8h2v6h-2z" />
                        </svg>
                      </div>
                      <div
                        className={cn(
                          "bg-indigo-800/40 p-3 rounded-lg",
                          isRTL ? "rounded-tr-none" : "rounded-tl-none"
                        )}
                      >
                        <p
                          className={cn(
                            "text-sm text-blue-100",
                            isRTL && "text-right"
                          )}
                          dir={isRTL ? "rtl" : "ltr"}
                        >
                          {t("Home.chatExample.answer")}
                          <br />
                          <br />
                          1. {t("Home.chatExample.step1")}
                          <br />
                          2. {t("Home.chatExample.step2")}
                          <br />
                          3. {t("Home.chatExample.step3")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className={cn("text-center mb-10 md:mb-12", isRTL && "rtl")}>
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 mb-3 md:mb-4">
              {t("Home.features.subtitle")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              {t("Home.features.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: MessageSquare,
                titleKey: "aiSupport",
                descriptionKey: "aiSupportDesc",
              },
              {
                icon: Shield,
                titleKey: "expertGuidance",
                descriptionKey: "expertGuidanceDesc",
              },
              {
                icon: Clock,
                titleKey: "timeSaving",
                descriptionKey: "timeSavingDesc",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 md:p-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-900 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4 md:mb-6">
                  <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3
                  className={cn(
                    "text-xl font-semibold mb-2 md:mb-3 text-gray-900 dark:text-white",
                    isRTL && "text-right"
                  )}
                >
                  {t(`Home.features.${feature.titleKey}`)}
                </h3>
                <p
                  className={cn(
                    "text-gray-600 dark:text-gray-300",
                    isRTL && "text-right"
                  )}
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  {t(`Home.features.${feature.descriptionKey}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className={cn("text-center mb-10 md:mb-12", isRTL && "rtl")}>
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 mb-3 md:mb-4">
              {t("Home.process.subtitle")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              {t("Home.process.title")}
            </h2>
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-200 dark:bg-blue-900 transform -translate-y-1/2 hidden md:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {[
                {
                  step: "1",
                  titleKey: "createAccount",
                  descriptionKey: "createAccountDesc",
                  icon: User,
                },
                {
                  step: "2",
                  titleKey: "assessment",
                  descriptionKey: "assessmentDesc",
                  icon: Search,
                },
                {
                  step: "3",
                  titleKey: "getGuidance",
                  descriptionKey: "getGuidanceDesc",
                  icon: MessageSquare,
                },
                {
                  step: "4",
                  titleKey: "trackProgress",
                  descriptionKey: "trackProgressDesc",
                  icon: CheckCircle,
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className={cn("text-center relative", isRTL && "rtl")}
                >
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-4 md:mb-6 text-xl font-bold relative z-10 border-4 border-white dark:border-gray-800">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 md:mb-3 text-gray-900 dark:text-white">
                    {t(`Home.process.${step.titleKey}`)}
                  </h3>
                  <p
                    className="text-gray-600 dark:text-gray-300"
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    {t(`Home.process.${step.descriptionKey}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/patterns/pattern.svg')] bg-repeat opacity-20"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white mb-4 md:mb-6">
            {t("Home.cta.subtitle")}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">
            {t("Home.cta.title")}
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-6 md:mb-8 max-w-2xl mx-auto">
            {t("Home.cta.description")}
          </p>
          <div
            className={cn(
              "flex flex-col sm:flex-row gap-4 justify-center",
              isRTL && "sm:flex-row-reverse"
            )}
          >
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-lg font-medium bg-white text-blue-700 hover:bg-blue-50 transition-all duration-200"
            >
              <Link
                href={`${linkPrefix}/signup`}
                className={cn("flex items-center", isRTL && "flex-row-reverse")}
              >
                <>
                  {t("Home.cta.getStarted")}
                  <ArrowRight
                    className={cn("h-5 w-5", isRTL ? "mr-2" : "ml-2")}
                  />
                </>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg font-medium border-2 border-white text-white bg-white/10 hover:bg-white/30 transition-all duration-200 shadow-md ring-1 ring-white/20"
            >
              <Link href={`${linkPrefix}/about`} className="flex items-center">
                {t("Home.cta.learnMore")}
              </Link>
            </Button>
          </div>

          {/* Added Dashboard link for existing users */}
          <div className="mt-6">
            <Button
              asChild
              variant="link"
              className="text-blue-200 hover:text-white"
            >
              <Link
                href={`${linkPrefix}/dashboard`}
                className={cn(
                  "flex items-center justify-center",
                  isRTL && "flex-row-reverse"
                )}
              >
                <>
                  <LineChart
                    className={cn("h-4 w-4", isRTL ? "ml-2" : "mr-2")}
                  />
                  {t("Home.cta.existingAccount")}
                </>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
