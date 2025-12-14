import { HiArrowRightOnRectangle } from "react-icons/hi2";

import SpinnerMini from "../../ui/SpinnerMini"
import ButtonIcon from "../../ui/ButtonIcon";

import { useLogout } from "./useLogout";

export default function Logout() {
    const {logout, isPending} = useLogout();
  return (
      <ButtonIcon disabled={isPending} onClick={logout}>
        {isPending ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
      </ButtonIcon>
  );
}
