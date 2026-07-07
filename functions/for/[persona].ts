import { proxyAppPath } from "../_seoProxy";

const ALLOWED_PERSONAS = new Set(["chro", "ceo", "managers", "leaders", "employees"]);
const PERSONA_ALIASES = new Map([["individual-contributors", "employees"]]);

// /for/:persona -> app.cadencehr.ai/for/:persona for the approved role SEO pages.
export const onRequestGet: PagesFunction<{ persona: string }> = async (context) => {
  const persona = PERSONA_ALIASES.get(context.params.persona) ?? context.params.persona;
  if (!ALLOWED_PERSONAS.has(persona)) {
    return context.next();
  }

  return proxyAppPath(`/for/${persona}`)(context);
};
