export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container max-w-screen-xl px-4 py-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Made with ❤️ for creators.</p>
        </div>
      </div>
    </footer>
  )
}
