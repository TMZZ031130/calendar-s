import { requireUser } from "../lib/hooks";

const DashBoardPage = async () => {
  const session = await requireUser();

  return <div>DashBoardPage</div>;
};

export default DashBoardPage;
