import { Link } from 'react-router-dom';

function Breadcrumb({ items, ...props }) {
    return (
        <nav {...props}>
            <ol className="breadcrumb">
                {
                    items.map( (item, key) => {
                        return (
                            <li key={key} className={`breadcrumb-item ${ item.active ? 'active':'' }`}>
                                {
                                    item.href
                                    ? <Link to={item.href}> {item.name} </Link> 
                                    : item.name
                                }
                                <a href="/admin">  </a>
                            </li>
                        )
                    })
                }
            </ol>
        </nav>
    );
}

export default Breadcrumb;