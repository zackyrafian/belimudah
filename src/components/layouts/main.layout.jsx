import { Footer } from "../footer";
import { Header } from "../header";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="max-w-7xl w-full mx-auto flex-1 lg:py-8 pb-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}