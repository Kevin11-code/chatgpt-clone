import { SessionProvider } from "../components/SessionProvider";
import { getServerSession } from "next-auth";
import SideBar from "../components/SideBar";

import "../styles/globals.css";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Login from "../components/Login";
import ClientProvider from "../components/ClientProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  console.log(session);
  return (
    <html>
      <head />
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto lg:min-w-[20rem] md:min-w-[15rem] min-w-max">
                <SideBar />
              </div>

              <ClientProvider />

              <div className="bg-[#343541] flex-1 px-3">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
