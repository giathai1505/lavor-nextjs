import Each from "@/lib/Each";
import { IAgency } from "@/types/type";
import { Empty } from "antd";

const AgencyItem = ({ agency }: { agency: IAgency }) => {
  return (
    <div className="mb-5 ml-5" key={agency.agency_id}>
      <p className="font-bold text-primary">{agency.agency_name}</p>
      <p className="text-white">{agency.agency_address}</p>
    </div>
  );
};

type TListAgency = {
  agencies: IAgency[];
};

const ListAgency = ({ agencies }: TListAgency) => {
  if (!(Array.isArray(agencies) && agencies.length > 0)) {
    return (
      <div className="flex flex-col items-center my-5">
        <Empty
          description={
            <p className="text-primary italic">(Chưa có đại lý nào)</p>
          }
          imageStyle={{ opacity: 0.5, width: "80px" }}
        />
      </div>
    );
  }

  return (
    <div>
      <Each of={agencies} render={(item) => <AgencyItem agency={item} />} />
    </div>
  );
};

export default ListAgency;
