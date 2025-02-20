import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer>
            <div>
                <p>&copy; {new Date().getFullYear()} Genter Automat. All rights reserved.</p>
                <div>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;