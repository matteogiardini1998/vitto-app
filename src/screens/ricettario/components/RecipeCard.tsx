import { Link } from "react-router-dom";
import { Clock3, Euro, Heart, Pin } from "lucide-react";
import { motion } from "framer-motion";
import type { Ricetta } from "../../../types";
import { Card } from "../../../components/Card";
import { StarRating } from "../../../components/StarRating";
import { PastoIcon } from "../../../components/PastoIcon";

export function RecipeCard({ ricetta }: { ricetta: Ricetta }) {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
      <Link to={`/ricettario/${ricetta.id}`}>
        <Card className="flex gap-3 relative active:bg-paper-100 transition-colors">
          <div className="h-14 w-14 shrink-0 rounded-md bg-primary-50 text-primary-700 flex items-center justify-center">
            <PastoIcon pasti={ricetta.pasto} size={24} strokeWidth={1.7} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-body-lg font-display font-semibold text-paper-900 truncate">
                {ricetta.nome}
              </h3>
              <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                {ricetta.fissata && <Pin size={14} className="text-accent-500" fill="currentColor" />}
                {ricetta.preferita && <Heart size={14} className="text-accent-500" fill="currentColor" />}
              </div>
            </div>
            <p className="text-body-sm text-paper-500 truncate mt-0.5">{ricetta.descrizione}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="inline-flex items-center gap-1 text-caption text-paper-500">
                <Clock3 size={13} /> {ricetta.tempoMin} min
              </span>
              <span className="inline-flex items-center gap-0.5 text-caption text-paper-500">
                <Euro size={13} /> {ricetta.costoStimatoPorzione.toFixed(2)}/porz.
              </span>
              {ricetta.rating > 0 && <StarRating value={ricetta.rating} readOnly size={13} />}
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
