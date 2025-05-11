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
    <html lang="en">
      <head />
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <div className="bg-zinc-900 md:w-[10rem] h-screen overflow-y-auto lg:min-w-[20rem] md:min-w-[15rem] ">
                <SideBar />
              </div>

              <ClientProvider />

              <div className="bg-gray-900 flex-1 px-3">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
