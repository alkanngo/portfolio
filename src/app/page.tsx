"use client";

import { FloatingPolygons } from "@/components/floating-polygons";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle initial load
  const currentTheme = theme === 'system' ? systemTheme : theme;
  
  // Don't render the image until we know what theme we're using
  const imageSrc = mounted ? (currentTheme === 'dark' ? '/me-dark.svg' : '/me-light.svg') : null;

  return (
    <main className="relative flex flex-col min-h-[100dvh] space-y-10 overflow-hidden">
      <FloatingPolygons />
      <section id="hero" className="relative md:pt-20 w-full">
        <div className="mx-auto w-full max-w-6xl">
          <div className="section-blur">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="flex-col flex w-full md:flex-1 space-y-3 text-center md:text-left items-start">
                <BlurFadeText
                  delay={BLUR_FADE_DELAY}
                  className="text-6xl font-bold tracking-tighter sm:text-7xl xl:text-8xl/none font-le-murmure"
                  yOffset={8}
                  text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
                />
                <BlurFadeText
                  className="max-w-[600px] mx-auto md:mx-0 text-lg md:text-2xl"
                  delay={BLUR_FADE_DELAY}
                  text={DATA.description}
                />
              </div>
              <BlurFade delay={BLUR_FADE_DELAY}>
                <div className="relative w-full h-[250px] sm:h-[300px] md:w-[400px] md:h-[400px]">
                  {imageSrc && (
                    <img 
                      src={imageSrc}
                      alt={DATA.name}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              </BlurFade>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-4xl">
        <section id="about" className="section-blur mb-10">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-4xl font-bold font-le-murmure mb-4">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
              {DATA.summary}
            </Markdown>
          </BlurFade>
        </section>

        <section id="work" className="section-blur mb-10">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <h2 className="text-4xl font-bold font-le-murmure mb-4">Work Experience</h2>
            </BlurFade>
            {DATA.work.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
              >
                <ResumeCard
                  key={work.company}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  badges={work.badges}
                  period={`${work.start} - ${work.end ?? "Present"}`}
                  description={work.description}
                />
              </BlurFade>
            ))}
          </div>
        </section>

        <section id="education" className="section-blur mb-10">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <h2 className="text-4xl font-bold font-le-murmure mb-4">Education</h2>
            </BlurFade>
            {DATA.education.map((education, id) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + id * 0.05}
              >
                <ResumeCard
                  key={education.school}
                  href={education.href}
                  altText={education.school}
                  title={education.school}
                  subtitle={education.degree}
                  period={`${education.start} - ${education.end}`}
                  description={education.description}
                />
              </BlurFade>
            ))}
          </div>
        </section>

        <section id="skills" className="section-blur mb-10">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <h2 className="text-4xl font-bold font-le-murmure mb-4">Skills</h2>
            </BlurFade>
            <div className="flex flex-wrap gap-1">
              {DATA.skills.map((skill, id) => (
                <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                  <Badge key={skill}>{skill}</Badge>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section-blur mb-10">
          <div className="space-y-12 w-full py-12">
            <BlurFade delay={BLUR_FADE_DELAY * 11}>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                    My Projects
                  </div>
                  <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl font-le-murmure">
                    Check out my latest work
                  </h2>
                  <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    I&apos;ve worked on a variety of projects, from simple
                    websites to complex web applications. Here are a few of my
                    favorites.
                  </p>
                </div>
              </div>
            </BlurFade>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
              {DATA.projects.map((project, id) => (
                <BlurFade
                  key={project.title}
                  delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                >
                  <ProjectCard
                    href={project.href}
                    key={project.title}
                    title={project.title}
                    description={project.description}
                    dates={project.dates}
                    tags={project.technologies}
                    image={project.image}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-blur">
          <div className="grid items-center justify-center gap-4 text-center w-full">
            <BlurFade delay={BLUR_FADE_DELAY * 16}>
              <div className="space-y-3">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Contact
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-le-murmure">
                  Get in Touch
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Want to chat? Feel free to{" "}
                  <Link
                    href={`mailto:${DATA.contact.email}`}
                    className="text-blue-500 hover:underline"
                  >
                    send me an email
                  </Link>{" "}
                  and I&apos;ll respond whenever I can. I will ignore all
                  soliciting.
                </p>
              </div>
            </BlurFade>
          </div>
        </section>
      </div>
    </main>
  );
}
