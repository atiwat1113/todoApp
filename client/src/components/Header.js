import PropTypes from 'prop-types'
import {useLocation} from 'react-router-dom'
import Button from './Button'

const Header = ({title, onAdd, showAdd}) => {
    const location = useLocation()

    return (
        <header className='header'>
            {/* <h1 style={{color: 'red', backgroundColor: 'black'}}>{title}</h1> */}
            {/* <h1 style = {headingStyle}>{title}</h1> */}
            <h1>{title}</h1>
            {location.pathname === '/' && <Button color={showAdd ? 'darkred' : 'darkgreen'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>}
        </header>
    )
}

Header.defaultProps = {
    title: 'Todo List',
}

Header.propTypes = {
    title: PropTypes.string, //title must be string
    //PropTypes.string.isRequired = title must not be empty
}

//CSS in JS
// const headingStyle = {
//     color: 'red', backgroundColor: 'black'
// }

export default Header
