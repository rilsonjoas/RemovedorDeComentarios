import type { Metadata } from "next";
import "./globals.css"; 

export const metadata: Metadata = {
  title: "Removedor de Comentário em Código",
  description:
    "Uma ferramenta online para remover comentários de códigos em diversas linguagens de programação.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
