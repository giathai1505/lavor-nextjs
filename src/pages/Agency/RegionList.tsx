import Each from "@/lib/Each";
import { IRegion } from "@/types/type";

type TRegionItem = {
  region: IRegion;
  activeRegion: IRegion | undefined;
  setActiveRegion: (region: IRegion | undefined) => void;
};

const RegionItem = ({ region, activeRegion, setActiveRegion }: TRegionItem) => {
  return (
    <p
      className={`text-white px-5 py-2  mb-2 cursor-pointer rounded ${
        region.region_id === activeRegion?.region_id ? "bg-primary" : ""
      }`}
      onClick={() => setActiveRegion(region)}
      key={region.region_id}
    >
      {region.region_name}
    </p>
  );
};

type TListAgency = {
  agencies: IRegion[];
  activeRegion: IRegion | undefined;
  setActiveRegion: (region: IRegion | undefined) => void;
};

const ListRegion = ({
  agencies,
  activeRegion,
  setActiveRegion,
}: TListAgency) => {
  return (
    <div className="col-span-1 border-r-0 border-solid border-[#80808038] pr-5 h-fit  md:border-r md:col-span-1">
      <Each
        of={agencies}
        render={(item) => (
          <RegionItem
            activeRegion={activeRegion}
            region={item}
            setActiveRegion={setActiveRegion}
          />
        )}
      />
    </div>
  );
};

export default ListRegion;
