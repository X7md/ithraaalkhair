
import { ReadinessBarChart } from "@/components/ReadinessChart";
export function NusukImtithal() {


  return (
    <div className="p-4">
      <h3 className="font-bold text-xl">
        جاهزية المساكن
      </h3>
      <div>
        <ReadinessBarChart />
      </div>
    </div>
  );
}

NusukImtithal.tab = "nusuk-imtithal";
