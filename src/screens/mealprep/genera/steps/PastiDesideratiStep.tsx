import { Chip } from "../../../../components/Chip";
import { TAG_PREFERENZA_LABEL, type TagPreferenza } from "../../../../lib/generator";

type PastiDesideratiStepProps = {
  value: TagPreferenza[];
  onChange: (value: TagPreferenza[]) => void;
};

const TAGS = Object.keys(TAG_PREFERENZA_LABEL) as TagPreferenza[];

export function PastiDesideratiStep({ value, onChange }: PastiDesideratiStepProps) {
  const toggle = (tag: TagPreferenza) => {
    onChange(value.includes(tag) ? value.filter((t) => t !== tag) : [...value, tag]);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {TAGS.map((tag) => (
        <Chip key={tag} selected={value.includes(tag)} onClick={() => toggle(tag)}>
          {TAG_PREFERENZA_LABEL[tag]}
        </Chip>
      ))}
    </div>
  );
}
