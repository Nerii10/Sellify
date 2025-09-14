import UserCard from '../usercard/UserCard'
import './Navbar.css'

export default function Navbar()
{
    return(
        <section className="navbar-wrapper">
            
            <div className='navbar-left'>
                Sellify
            </div>

            <div className='navbar-right'>
                <UserCard/>
            </div>
        </section>
    )
}