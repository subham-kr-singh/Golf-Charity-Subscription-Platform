import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen relative bg-bg">
      <Navbar />
      <main className="flex-1 flex flex-col pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
