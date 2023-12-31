import Actions from "./actions"
import Search from "../search"
import { Logo } from "./Logo"

const Navbar = () => {
  return (
    <div className='fixed top-0 w-full h-20 z-[49] bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm'>
      <Logo />

      <Search />

      <Actions />
    </div>
  )
}

export default Navbar