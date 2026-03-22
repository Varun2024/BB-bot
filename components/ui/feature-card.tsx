import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
  iconClass?: string; // e.g. "bg-amber-50 text-amber-600"
  badge?: ReactNode;
};

export function FeatureCard({ icon, title, description, iconClass = "bg-amber-50 text-amber-600", badge }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/8 backdrop-blur-sm p-6 shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-4">
        <div className={`rounded-lg p-3 ${iconClass}`}>{icon}</div>
        <div>
          <h3 className="text-md font-medium">{title}</h3>
          <p className="mt-1 text-sm text-stone-600">{description}</p>
        </div>
      </div>
      {badge && <div className="absolute right-3 top-3">{badge}</div>}
    </div>
  );
}

export default FeatureCard;
