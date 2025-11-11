import Logo from "@/components/atom/Logo";

export default function Hero() {
  return (
    <section className="bg-[#8d0f0f] px-4 max-md:flex max-md:flex-col max-md:items-center max-md:justify-end max-md:pt-16 md:h-screen">
      <Logo className="h-fit w-full text-[#9f1313] md:h-full" ariaLabel="Logo" />
      <Logo className="h-fit w-full text-[#9f1313] md:hidden" aria-hidden="true" />
    </section>
  )
}
