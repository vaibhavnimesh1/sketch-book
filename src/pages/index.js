import { Board } from "@/component/board";
import { Menu } from "@/component/menu";
import {Toolbox} from "@/component/toolbox";

export default function Home() {
  return (
    <>
      <Menu />
      <Toolbox />
      <Board/>
   </>
  );
}
