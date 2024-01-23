import { Link } from 'react-router-dom';
import { getTenant } from '@/helpers/helpers';

function Breadcrumb({ items, ...props }) {
    return (
        <nav {...props}>
            <ol className="px-3 breadcrumb">
                {
                    items.map( (item, key) => {
                        return (
                            <li key={key} className={`breadcrumb-item ${ item.active ? 'active':'' }`}>
                                {
                                    item.href
                                    ? <Link to={item.href}> {item.name} </Link> 
                                    : item.name
                                }
                            </li>
                        )
                    })
                }
            </ol>
        </nav>
    );
}

export default Breadcrumb;