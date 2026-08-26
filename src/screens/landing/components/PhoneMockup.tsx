import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

type PhoneMockupProps = {
  src: string;
  alt: string;
  className?: string;
  /** Il mockup centrale carica subito, i laterali in lazy. */
  prioritario?: boolean;
  /** Overlay DENTRO lo schermo, clippato dalla cornice (es. cerchio di gesso su un pulsante). */
  children?: ReactNode;
  /** Elementi che sporgono FUORI dal telefono (es. post-it sul bordo): mai clippati dalla cornice. */
  fuoriSchermo?: ReactNode;
};

/** Cornice smartphone pulita attorno a uno screenshot vero dell'app. */
export function PhoneMockup({ src, alt, className, prioritario = false, children, fuoriSchermo }: PhoneMockupProps) {
  return (
    <div className={cn("relative rounded-[2.6rem] bg-[#211d19] p-[7px] shadow-elevated", className)}>
      <div className="relative rounded-[2.15rem] overflow-hidden bg-paper-50">
        <img
          src={src}
          alt={alt}
          className="block w-full select-none"
          loading={prioritario ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
        />
        {/* Tacca altoparlante, giusto un accenno. */}
        <div className="absolute top-[9px] left-1/2 -translate-x-1/2 h-[5px] w-16 rounded-full bg-black/25" aria-hidden="true" />
        {children}
      </div>
      {fuoriSchermo}
    </div>
  );
}
