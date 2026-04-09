import Logo from '../assets/picker.svg'
import { Link } from 'react-router-dom'

export default function NavBar(){
    return (
        <>
        <div className="hidden md:flex w-[95vw] h-auto items-center border-b-1 border-black px-3 py-4 justify-between">
                <Link to="/" className="m-0 text-2xl font-bold text-black duration-300 transition-all hover:scale-110 flex items-center">
                    <img src={Logo} alt="NitPicker logo" className='h-12 w-auto' />   NitPicker
                </Link>

                <div className="flex gap-10">
                    <div className="px-2 py-1 group hover:bg-black transition-all duration-300">
                        <Link to="/notes" className="text-sm font-bold group-hover:text-white transition-all duration-300">NOTES</Link>
                    </div>
                    <div className="px-2 py-1 group hover:bg-black transition-all duration-300">

                        <Link to="/mockexam" className="text-sm font-bold group-hover:text-white transition-all duration-300">MOCK EXAM</Link>
                    </div>
                    <div className="px-2 py-1 group hover:bg-black transition-all duration-300">

                    <Link to="/previousexams" className="text-sm font-bold group-hover:text-white transition-all duration-300">PREVIOUS EXAMS</Link>
                    </div>
                </div>

            </div>
        </>
    )
}
