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

import { Button } from "@/components/ui/button";
import { defaultLocale } from "@/i18n/i18n";

// This is a fallback page in case middleware doesn't redirect
export default function RootPage() {
  // Return a simple page that will auto-redirect to the default locale
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`0;url=/${defaultLocale}`} />
        <title>Redirecting...</title>
      </head>
      <body>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
            fontFamily: "system-ui, sans-serif",
            gap: "1rem",
          }}
        >
          <p>Redirecting to Hijraah...</p>
          <a
            href={`/${defaultLocale}`}
            style={{
              color: "#3b82f6",
              textDecoration: "underline",
            }}
          >
            Click here if you are not redirected automatically
          </a>
        </div>
      </body>
    </html>
  );
}

// Home component can be used both directly and from locale-specific pages
export function Home({ locale = defaultLocale }: { locale?: string } = {}) {
  // Get prefix for links to ensure they have the locale
  const linkPrefix = `/${locale}`;

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
            <div className="text-left">
              <div className="inline-block px-3 py-1 mb-4 md:mb-6 text-sm font-medium rounded-full bg-blue-500/20 text-blue-200 dark:bg-blue-800/30 dark:text-blue-200">
                Simplified Immigration Solutions
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 md:mb-6 leading-tight">
                Navigate Your Immigration Journey with{" "}
                <span className="text-blue-300 dark:text-blue-300 relative">
                  AI Guidance
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 rounded-full"></span>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 dark:text-blue-100 mb-6 md:mb-8 leading-relaxed">
                Get instant, personalized immigration assistance powered by AI.
                From eligibility assessment to document preparation, we&apos;re
                here to help 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="text-lg font-medium bg-white text-blue-700 hover:bg-blue-50 dark:bg-blue-100 dark:text-blue-900 dark:hover:bg-blue-200 transition-all duration-200"
                >
                  <Link
                    href={`${linkPrefix}/chat`}
                    className="flex items-center"
                    legacyBehavior
                  >
                    <a>
                      Start Chat <MessageSquare className="ml-2 h-5 w-5" />
                    </a>
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
                    className="flex items-center"
                    legacyBehavior
                  >
                    Check Eligibility <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* Added Dashboard link for existing users */}
              <div className="mt-6 flex justify-start">
                <Button
                  asChild
                  variant="link"
                  className="text-blue-200 hover:text-white"
                >
                  <Link
                    href={`${linkPrefix}/dashboard`}
                    className="flex items-center"
                    legacyBehavior
                  >
                    <LineChart className="mr-2 h-4 w-4" /> Existing users? Go to
                    Dashboard
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
                <p className="ml-4 text-sm text-blue-100">
                  <span className="font-medium">5,000+</span> successful
                  immigration journeys
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
                    <div className="flex items-start mb-4">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-3 flex-shrink-0">
                        <MessageSquare className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-blue-800/40 p-3 rounded-lg rounded-tl-none">
                        <p className="text-sm text-blue-100">
                          How do I apply for a work visa in Canada?
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start mb-4">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-3 flex-shrink-0">
                        <svg
                          className="h-4 w-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.01 8.01 0 0 1-8 8zm-1-5h2v2h-2zm0-8h2v6h-2z" />
                        </svg>
                      </div>
                      <div className="bg-indigo-800/40 p-3 rounded-lg rounded-tl-none">
                        <p className="text-sm text-blue-100">
                          To apply for a work visa in Canada, you&apos;ll need
                          to:
                          <br />
                          <br />
                          1. Get a job offer from a Canadian employer
                          <br />
                          2. The employer must obtain an LMIA
                          <br />
                          3. Apply for a work permit
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
          <div className="text-center mb-10 md:mb-12">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 mb-3 md:mb-4">
              Why Choose Hijraah
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Simplify Your Immigration Process
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: MessageSquare,
                title: "24/7 AI Support",
                description:
                  "Get instant answers to your immigration questions anytime, anywhere.",
              },
              {
                icon: Shield,
                title: "Expert Guidance",
                description:
                  "Receive accurate, up-to-date immigration advice based on official guidelines.",
              },
              {
                icon: Clock,
                title: "Time-Saving Tools",
                description:
                  "Streamline your application process with our document checklist and timeline planner.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 md:p-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-900 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4 md:mb-6">
                  <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 md:mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 mb-3 md:mb-4">
              Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              How It Works
            </h2>
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-200 dark:bg-blue-900 transform -translate-y-1/2 hidden md:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {[
                {
                  step: "1",
                  title: "Create Account",
                  description: "Sign up in seconds with email or Google",
                  icon: User,
                },
                {
                  step: "2",
                  title: "Assessment",
                  description: "Complete our eligibility assessment",
                  icon: Search,
                },
                {
                  step: "3",
                  title: "Get Guidance",
                  description: "Receive personalized immigration advice",
                  icon: MessageSquare,
                },
                {
                  step: "4",
                  title: "Track Progress",
                  description: "Monitor your immigration journey",
                  icon: CheckCircle,
                },
              ].map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-4 md:mb-6 text-xl font-bold relative z-10 border-4 border-white dark:border-gray-800">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 md:mb-3 text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
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
            Get Started Today
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">
            Ready to Start Your Immigration Journey?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-6 md:mb-8 max-w-2xl mx-auto">
            Join thousands of others who have simplified their immigration
            process with Hijraah. Our AI-powered platform provides guidance
            every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-lg font-medium bg-white text-blue-700 hover:bg-blue-50 transition-all duration-200"
            >
              <Link
                href={`${linkPrefix}/signup`}
                className="flex items-center"
                legacyBehavior
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg font-medium border-2 border-white text-white bg-white/10 hover:bg-white/30 transition-all duration-200 shadow-md ring-1 ring-white/20"
            >
              <Link href={`${linkPrefix}/about`} className="flex items-center">
                Learn More
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
                className="flex items-center justify-center"
                legacyBehavior
              >
                <LineChart className="mr-2 h-4 w-4" /> Already have an account?
                Go to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
