import { Book, LogOut, Package } from "lucide-react"
import { Button, Divider, User as UserAvatar } from "@nextui-org/react"
import { classNames } from "~/utils/classNames"
import { authClient } from "~/utils/auth/authClient"
import { useNavigate, NavLink, type NavLinkProps } from "react-router"
import type { ReactNode } from "react"

type Props = {
  className?: string
  user: typeof authClient.$Infer.Session.user
}
export function Sidebar({ className, user, ...props }: Props) {
  const navigate = useNavigate()
  return (
    <div {...props} className={classNames(className, "flex flex-col backdrop-blur")}>
      {/*upper section*/}
      <div className="grow">
        <section className="mb-6 flex relative h-[200px]">
          <div className="bg-[#fff] opacity-90 h-full w-full inset absolute" />
          <div className="h-full w-full inset absolute flex justify-center items-center">
            <p className="text-6xl tracking-widest font-bold nice-font text-black text-center">
              Book
              <br />
              store
            </p>
          </div>
        </section>

        <p className="px-6 opacity-60 uppercase text-xs">Store</p>
        <section className="px-3 mb-6 flex flex-col gap-1 mt-1">
          <SidebarItem end to="/admin/dashboard/orders" icon={<Package strokeWidth={1} />}>
            Orders
          </SidebarItem>
          <SidebarItem end to="/admin/dashboard/books" icon={<Book strokeWidth={1} />}>
            Books
          </SidebarItem>
        </section>
      </div>

      {/*bottom section*/}
      <div className="p-6">
        <Divider className="mb-6 opacity-30" />
        <div className="flex justify-between gap-3">
          <UserAvatar
            name={user.name}
            description={user.email}
            avatarProps={{
              name: user.name,
              color: "primary",
              className: "text-1xl font-light",
            }}
          />
          <Button
            variant="light"
            className="w-full mt-2"
            title="Sign out"
            isIconOnly
            onClick={async () => {
              await authClient.signOut()
              await navigate("/admin/sign-in")
            }}
          >
            <LogOut strokeWidth={1} />
          </Button>
        </div>
      </div>
    </div>
  )
}

type SidebarItemProps = {
  icon: JSX.Element
  children: ReactNode
} & NavLinkProps
function SidebarItem({ children, icon, ...navLinkProps }: SidebarItemProps) {
  return (
    <Button className="w-full flex justify-start p-0" variant="light">
      <NavLink
        {...navLinkProps}
        className={({ isActive }) =>
          classNames(
            "w-full justify-start flex items-center gap-2 p-2 font-light",
            "rounded-md hover:bg-white/10 transition-colors",
            isActive && "bg-white/10",
          )
        }
      >
        {icon}
        {children}
      </NavLink>
    </Button>
  )
}
