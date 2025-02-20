import React from 'react';
import Header from './Header';
import Footer from './Footer';

const App: React.FC = () => {
    return (
        <div>
            <Header />
            <main>
                {/* Other components or routes can be added here */}
            </main>
            <Footer />
        </div>
    );
};

export default App;