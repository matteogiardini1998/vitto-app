import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const REGEX_URL = /https?:\/\/\S+/i;

/**
 * Destinazione di `share_target` (solo Android): TikTok/Instagram/Chrome
 * condividono qui titolo/testo/url del contenuto. Il link spesso sta dentro
 * `text` (la didascalia), non nel campo `url` dedicato — si cerca in entrambi.
 */
export function CondividiScreen() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const testo = `${params.get("url") ?? ""} ${params.get("text") ?? ""}`;
    const trovato = testo.match(REGEX_URL)?.[0];
    navigate("/ricettario/importa/link", { replace: true, state: trovato ? { urlIniziale: trovato } : undefined });
  }, [params, navigate]);

  return null;
}
