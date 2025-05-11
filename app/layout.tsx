import { SessionProvider } from "../components/SessionProvider";
import { getServerSession } from "next-auth";
import SideBar from "../components/SideBar";

import "../styles/globals.css";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Login from "../components/Login";
import ClientProvider from "../components/ClientProvider";
import TopBarContainer from "../components/TopBarContainer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head />
      <body className="bg-[#0a0a0a]">
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex flex-col h-screen">
              <TopBarContainer />
              
              <div className="flex flex-1 overflow-hidden">
                <div className="bg-[#121212] max-w-xs w-[260px] h-full overflow-y-auto hidden md:block border-r border-[#2a2a2a]">
                  <SideBar />
                </div>

                <ClientProvider />

                <div className="bg-[#0a0a0a] flex-1 overflow-hidden">{children}</div>
              </div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
