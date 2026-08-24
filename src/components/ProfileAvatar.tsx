import type { AvatarId } from "../types";
import { AVATAR_OPZIONI, AvatarGlyph } from "./AvatarGlyph";
import { cn } from "../lib/cn";

type ProfileAvatarProps = {
  avatarId: AvatarId | null;
  nome: string;
  cognome: string;
  size?: number;
  onClick?: () => void;
};

export function ProfileAvatar({ avatarId, nome, cognome, size = 88, onClick }: ProfileAvatarProps) {
  const opzione = AVATAR_OPZIONI.find((a) => a.id === avatarId);
  const iniziali = `${nome.trim().charAt(0)}${cognome.trim().charAt(0)}`.toUpperCase() || "🙂";

  const Wrapper = onClick ? "button" : "div";

  return (
    <Wrapper
      type={onClick ? "button" : undefined}
      onClick={onClick}
      aria-label={onClick ? "Cambia avatar" : undefined}
      className={cn(
        "relative shrink-0 rounded-full flex items-center justify-center shadow-elevated border-4 border-paper-0",
        opzione ? opzione.bg : "bg-primary-600",
        onClick && "active:scale-95 transition-transform",
      )}
      style={{ width: size, height: size }}
    >
      {opzione ? (
        <AvatarGlyph id={opzione.id} size={size * 0.52} className="text-primary-900" />
      ) : (
        <span className="text-paper-50 font-display font-semibold" style={{ fontSize: size * 0.36 }}>
          {iniziali}
        </span>
      )}
    </Wrapper>
  );
}
