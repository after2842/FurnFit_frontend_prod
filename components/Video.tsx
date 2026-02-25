export default function VideoPlay() {
  return (
    <div>
      <section className="relative h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-[105%]"
          style={{ objectPosition: "center 20%" }}
        >
          <source src="/landing3.mp4" type="video/mp4" />
        </video>
      </section>
    </div>
  );
}
