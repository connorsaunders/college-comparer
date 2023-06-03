import '../css/Header.css';

function Header() {
    return (
        <div className="header">
            <br/>
            <h1 style={{ fontSize: '50px' }}>
                <span className="highlight">College Cost </span> 
                <span className="blue">Comparison Tool</span>
            </h1>
            <h2 className="my-subheader">Get the ROI you need from your education!</h2>
        </div>
    )
}

export default Header
