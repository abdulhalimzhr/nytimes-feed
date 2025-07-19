export default function Hero() {
  return (
    <section className="w-full py-12 sm:py-16 flex flex-col items-center text-center px-4">
      <div className="mb-4 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs sm:text-sm font-medium">
        Official News Feed
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground tracking-tight leading-tight">
        The New York Times
      </h1>
      <p className="text-base sm:text-lg text-muted-foreground max-w-md sm:max-w-lg leading-relaxed">
        Discover breaking news, in-depth analysis, and award-winning journalism
        from America{"'"}s newspaper of record.
      </p>
    </section>
  )
}
