import React from 'react';

const Footer = () => {
    return (
        <>
            <footer className="footer-div">
            {/* <ul className="footer-links"> */}
                <div className='footer-links'><a href="https://savannahrice.github.io/">
                    <p>Savannah Rice</p>
                    </a>
                    <div className='footer-icons'>
                        <a href="https://github.com/SavannahRice"><i class="fab fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/savannah-rice/"><i class="fab fa-linkedin"></i></a>
                    </div>
                </div>
                <div className='footer-links'><a href="https://heba11-22.github.io/">
                    <p>Heba Elkasaby</p>
                    </a>
                    <div className='footer-icons'>
                        <a href="https://github.com/Heba11-22"><i class="fab fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/heba-e-3091261b5/"><i class="fab fa-linkedin"></i></a>
                    </div>
                </div>
                <div className='footer-links'><a href="https://mimike.github.io/">
                    <p>Mimi Ke</p>
                    </a>
                    <div className='footer-icons'>
                        <a href="https://github.com/mimike"><i class="fab fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/mimi-ke-a7976031/"><i class="fab fa-linkedin"></i></a>
                    </div>
                </div>
                <div className='footer-links'><a href="">
                    <p>Marc Carlson</p>
                    </a>
                    <div className='footer-icons'>
                        <a href="https://github.com/Mcarlson30"><i class="fab fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/marc-carlson/"><i class="fab fa-linkedin"></i></a>
                    </div>
                </div>
            {/* </ul> */}
            </footer>
            <div className="footer-copyright">
                        <h6>© 2021 Overshare from Marc, Savannah, Heba & Mimi</h6>
	        </div>
        </>

    )
}

export default Footer;