import { useEffect, useState } from "react";

const GymEquipment = ({ gym_id }: { gym_id: string }) => {
  const [equipment, setEquipment] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gym_id) return;

    console.log("page.tsx gym_id type:", typeof gym_id); // Log the type of gym_id
    fetch(`/api/gym_equipment/equipment_by_gym/${gym_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched gym equipment:", data);
        setEquipment(data);

        console.log("Current equipment:", data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setEquipment([]);
      })
      .finally(() => setLoading(false));
  }, [gym_id]);

  return (
    <div>
      {equipment.length !== 0 ? (
        <div className="">
          <div className="w-[30%] h-[200px] max-w-screen-lg bg-stone-400/75 border-black border-[2px]">
            <div className="flex flex-wrap flex-col justify-center items-center h-full">
              <div
                className="text-center font-white text-3xl font-bold"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Amenities & Equipment
              </div>
              {loading ? (
                <div className="flex items-center justify-center h-[200px] text-white">
                  <div className="text-4xl font-bold ">
                    Loading equipment...
                  </div>
                </div>
              ) : equipment.length === 0 ? (
                <div className="flex items-center justify-center h-[200px]">
                  <div className="flex items-center justify-between">
                    No equipment found.
                  </div>
                </div>
              ) : (
                <div className="flex flex-col max-h-[200px] overflow-y-auto w-[95%] ml-4 mr-4 p-1 mt-2 space-y-2">
                  <ul className="list-disc list-inside">
                    {equipment.map((piece) => (
                      <li
                        key={piece.equipment_name}
                        className="text-white font-bold w-full"
                      >
                        {piece.equipment_name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default GymEquipment;
