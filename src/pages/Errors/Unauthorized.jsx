import { Link } from 'react-router-dom';
import Logo from '@/assets/images/logo.png'
import './Errors.scss';

export const Unauthorized = () => {
  return (
    <div className='container pt-7 text-center'>
        <div className="d-block text-center mb-5">
            <Link to="/">
                <img src={Logo} alt=''/>
            </Link>
        </div>
        <div className="row container">
            <h1> Error 403 </h1>
            <h5> Unauthorized page :( </h5>
        </div>
    </div>
    
  )
}
