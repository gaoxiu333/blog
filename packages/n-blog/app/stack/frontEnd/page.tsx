"use client";
import { DOC, FRONTEND_TAP_MAP } from "@/prisma/_constant";
import { Tab, Tabs } from "@nextui-org/react";
import { Panel } from "../components/panel";

export default function Page() {
  return (
    <div>
      <Tabs aria-label="Options">
        {DOC.map((project) => {
          return (
            <Tab key={project.name} title={project.name}>
              <section className="grid grid-cols-4 gap-3">
                {FRONTEND_TAP_MAP.map((item, idx) => {
                  return (
                    <Panel
                      key={idx}
                      tag={`${item.key},${project.href}`}
                      name={item.name}
                    />
                  );
                })}
              </section>
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
}
