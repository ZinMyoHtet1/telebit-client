import { useNavigate } from "react-router-dom";
import "./../styles/breadcrump.css";
import { useContext, useEffect, useState } from "react";
import { directoryContext } from "../contexts/DirectoryContext";

function Breadcrump() {
  const [breadcrumps, setBreadcrumps] = useState([]);
  const { state } = useContext(directoryContext);
  const navigate = useNavigate();

  const mainDirectory = state.currentDirectory;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const parentDirectories = state.parentDirectories || [];

  useEffect(() => {
    if (!mainDirectory?.id) return;
    setBreadcrumps([]);

    const crumbs = [
      ...parentDirectories.map((dir) => ({
        name: dir.name,
        dirId: dir.id,
      })),
      { name: mainDirectory.name, dirId: mainDirectory.id },
    ];
    setBreadcrumps(crumbs);
  }, [parentDirectories, mainDirectory]); // full object here

  const updatedBreadcrumps = [{ name: "Home", dirId: "root" }, ...breadcrumps];

  return (
    <div id="breadcrump">
      {updatedBreadcrumps.map((brcr, index) => (
        <span
          key={brcr.dirId + index}
          className="breadcrump_item btn"
          onClick={() =>
            navigate(`/${brcr.dirId === "root" ? "" : brcr.dirId}`, {
              replace: true,
            })
          }
        >
          {brcr.name}
          {breadcrumps.at(-1)?.dirId !== "root" &&
            index < updatedBreadcrumps.length - 1 && (
              <span className="breadcump_divider"> &gt; </span>
            )}
        </span>
      ))}
    </div>
  );
}

export default Breadcrump;
