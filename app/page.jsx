import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>ShortsEngine AI</h1>
      <p>Генерирай вирусни сценарии за Reels, TikTok & Shorts за секунди</p>
      
      <div style={{ marginTop: "30px" }}>
        <SignedOut>
          <div style={{ display: "inline-block", marginRight: "10px" }}>
            <SignInButton mode="modal" />
          </div>
          <div style={{ display: "inline-block" }}>
            <SignUpButton mode="modal" />
          </div>
        </SignedOut>
        
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </main>
  );
}
