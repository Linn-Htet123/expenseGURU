import { ExitIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLogout } from "@/hooks/useLogout";

const Logout = () => {
  const { logout } = useLogout();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div>
            <DotsHorizontalIcon fontSize={30} />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-24 mr-4 py-2 px-2">
          <div
            className="flex items-center text-red-700"
            onClick={handleLogout}
          >
            <span>Logout</span>
            <div>
              <ExitIcon width={30} />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Logout;
