import { useEffect, useState } from "react";

const GymEquipment = ({ gym_id }: { gym_id: string }) => {
  const [equipment, setEquipment] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if gym_id doesn't exist, exit
    if (!gym_id) return;

    // GET() method from equipment API by gym_id
    fetch(`/api/gym-equipment/equipment-by-gym/${gym_id}`)
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
    <div className="border-black border-[1px] max-h-[200px] overflow-y-auto">
      {equipment.length !== 0 ? (
        <div className="p-3 max-w-screen-lg bg-zinc-400/75 flex flex-wrap justify-center items-center h-full">
          <div
            className="text-center text-white text-3xl font-bold"
            style={{ WebkitTextStroke: "1px black" }}
          >
            Amenities & Equipment
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-[200px] text-white">
              <div className="text-4xl font-bold ">Loading equipment...</div>
            </div>
          ) : equipment.length === 0 ? (
            <div className="flex items-center justify-center h-[200px]">
              <div className="flex items-center justify-between">
                No equipment found.
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-[95%] ml-4 mr-4 p-1 mt-2 space-y-2">
              <ul className="list-disc list-inside w-full">
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
      ) : (
        <></>
      )}
    </div>
  );
};

export default GymEquipment;
